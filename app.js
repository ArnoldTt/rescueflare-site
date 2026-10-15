'use strict';
const cfg = window.RESCUEFLARE_CONFIG || {};
const $ = id => document.getElementById(id);
const setText = (id, value) => {const el=$(id);if(el)el.textContent=value;};
const wallet = cfg.donationWallet || '';
function validAddress(s) {return typeof s==='string' && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(s);}
function safeHttpUrl(raw){try{const u=new URL(raw);return /^https?:$/.test(u.protocol)?u.href:'';}catch{return '';}}
function setLink(id,url,missing){const e=$(id);if(!e)return;const u=safeHttpUrl(url);if(u){e.href=u;e.removeAttribute('aria-disabled');e.classList.remove('disabled');e.target='_blank';e.rel='noopener noreferrer';}else{e.removeAttribute('href');e.setAttribute('aria-disabled','true');e.classList.add('disabled');if(missing)e.textContent=missing;}}
setText('brand-name',cfg.tokenName||'RescueFlare');setText('token-name',cfg.tokenName||'RescueFlare');
for(const k of ['token-ticker','hero-ticker','footer-ticker'])setText(k,'$'+(cfg.ticker||'RFLARE'));
setText('wallet-address',validAddress(wallet)?wallet:'Not configured — no transfers');
setText('fee-recipient',cfg.creatorFeeRecipientText||'Pending selection and disclosure');
setText('operator-disclosure',cfg.operatorDisclosure||'Independent project.');
setText('ngo-status',cfg.beneficiaryConfirmed&&cfg.beneficiaryName?'Confirmed: '+cfg.beneficiaryName:'Recipient not yet independently confirmed');
setText('contract-status',validAddress(cfg.tokenMint)?cfg.tokenMint:'Token not launched');
const live=validAddress(cfg.tokenMint);if(live){$('token-pill').textContent='TOKEN LIVE';$('token-pill').classList.add('live');}
setLink('pump-link',live&&cfg.pumpUrl?cfg.pumpUrl:'','Pump.fun — launch pending');
setLink('x-link',cfg.xUrl||'','X profile — coming soon');setLink('social-x',cfg.xUrl||'','X profile — coming soon');
setLink('report-link',cfg.reportUrl||'','Public disbursement reports — pending');
setLink('ngo-link',cfg.beneficiaryConfirmed?cfg.beneficiaryUrl:'','Beneficiary — pending confirmation');
setLink('wallet-explorer',validAddress(wallet)?'https://solscan.io/account/'+wallet:'','Explorer unavailable');
// Live blockchain wallet balance — never confuse holdings with donations received.
const liveGoal = Number(cfg.projectGoalSol) > 0 ? Number(cfg.projectGoalSol) : 8000;
const solEndpoints = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-rpc.publicnode.com'
];
const formatSol = value => value.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:9});
async function rpcBalance(endpoint) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const resp = await fetch(endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getBalance',params:[wallet,{commitment:'finalized'}]}),
      cache:'no-store',signal:controller.signal
    });
    if (!resp.ok) throw Error('RPC unavailable');
    const payload = await resp.json();
    const lamports = payload?.result?.value;
    if (!Number.isSafeInteger(lamports) || lamports < 0) throw Error('Invalid on-chain response');
    return lamports/1e9;
  } finally { clearTimeout(timer); }
}
let updatingBalance = false;
async function updatePublicBalance(){
  const total = $('live-wallet-sol');
  const status = $('live-wallet-status');
  const rail = $('live-wallet-rail');
  const details = $('live-wallet-details');
  if (!total || !status || !rail || updatingBalance) return;
  if (!validAddress(wallet)) {
    total.textContent='—';
    status.textContent='Address not configured';
    rail.style.width='0%';
    return;
  }
  updatingBalance=true;
  status.textContent='Checking Solana mainnet…';
  try {
    let balance;
    for (const endpoint of solEndpoints) {
      try { balance=await rpcBalance(endpoint); break; }
      catch (_) { /* Public RPC providers may throttle; try backup. */ }
    }
    if (balance===undefined) throw Error('No available RPC');
    const percent=Math.max(0,Math.min(100,(balance/liveGoal)*100));
    total.textContent=formatSol(balance)+' SOL';
    rail.style.width=percent.toFixed(5)+'%';
    rail.setAttribute('aria-label','Live wallet SOL balance equals '+percent.toFixed(2)+'% of project goal');
    status.textContent='Live wallet balance · '+percent.toFixed(2)+'% of goal';
    if (details) details.textContent='Current on-chain wallet holdings, not a confirmed donation total. Checked '+new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})+'.';
  } catch (_) {
    total.textContent='— SOL';
    rail.style.width='0%';
    status.textContent='Live balance temporarily unavailable';
    if (details) details.textContent='The public Solana network could not be reached. View the project wallet on Solscan for current holdings.';
  } finally {
    updatingBalance=false;
  }
}
updatePublicBalance();
setInterval(() => { if (!document.hidden) updatePublicBalance(); }, 120000);

// Address and Solscan explorer are displayed without opening a wallet or requesting a specific amount.
setText('year', new Date().getFullYear());
