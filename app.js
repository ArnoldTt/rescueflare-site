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
let amount='0.05';
const input=$('custom-amount'),send=$('donate-action'),check=$('donor-consent'),copy=$('copy-wallet');
function updateAmount(v){const n=Number(v);if(!Number.isFinite(n)||n<0.001||n>100){amount=null;}else{amount=String(Number(n.toFixed(9)));}}
function updateSend(){const allowed=cfg.projectWalletSupportEnabled===true&&validAddress(wallet)&&check.checked&&amount!==null;if(!allowed){send.removeAttribute('href');send.setAttribute('aria-disabled','true');send.classList.add('disabled');send.textContent=!check.checked?'Read and accept terms to open wallet':amount===null?'Enter a valid SOL amount':'Transfer unavailable';return;}
 const params=new URLSearchParams({amount,label:'RescueFlare project support',message:'Voluntary project support. NOT a direct registered charity donation.'});
 send.href='solana:'+wallet+'?'+params.toString();send.removeAttribute('aria-disabled');send.classList.remove('disabled');send.textContent='Open wallet to send '+amount+' SOL ↗';
}
input.addEventListener('input',()=>{updateAmount(input.value);for(const b of document.querySelectorAll('[data-amount]')) b.classList.toggle('selected',Number(b.dataset.amount)===Number(input.value));updateSend();});
for(const b of document.querySelectorAll('[data-amount]'))b.addEventListener('click',()=>{input.value=b.dataset.amount;input.dispatchEvent(new Event('input',{bubbles:true}));});
check.addEventListener('change',updateSend);send.addEventListener('click',e=>{if(send.getAttribute('aria-disabled')==='true'){e.preventDefault();}});updateSend();
copy.disabled=!validAddress(wallet);copy.textContent=validAddress(wallet)?'Copy address':'Address unavailable';
copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(wallet);copy.textContent='Copied ✓';setTimeout(()=>copy.textContent='Copy address',2600);}catch{const sel=window.getSelection(),range=document.createRange();range.selectNodeContents($('wallet-address'));sel.removeAllRanges();sel.addRange(range);copy.textContent='Select address and copy';}});
setText('year',new Date().getFullYear());
async function checkChainBalance(){const e=$('onchain-balance');if(!e||!validAddress(wallet))return;
 const url='https://api.mainnet-beta.solana.com';const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),9000);
 try{const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getBalance',params:[wallet,{commitment:'finalized'}]}),signal:controller.signal});if(!r.ok)throw Error('RPC unavailable');const j=await r.json();if(typeof j?.result?.value!=='number')throw Error('No reliable balance');const balance=j.result.value/1e9;
 e.innerHTML='<strong>Live SOL wallet balance:</strong> '+balance.toLocaleString('en-US',{maximumFractionDigits:9})+' SOL (finalized, from public Solana RPC). <strong>This is NOT a donation total or proof of charitable impact.</strong>';
 }catch{e.innerHTML='<strong>Live balance unavailable.</strong> Public Solana RPC could not be reached from this browser. <a href="https://solscan.io/account/'+wallet+'" target="_blank" rel="noopener noreferrer" style="color:#c8fc7f;text-decoration:underline">Check the wallet independently on Solscan ↗</a>. No donations have been independently verified.';}finally{clearTimeout(timer);}}
checkChainBalance();
