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
setText('contract-status',validAddress(cfg.tokenMint)?cfg.tokenMint:(cfg.launchInProgress?'Launch in progress · CA pending':'Token not launched'));
const live=validAddress(cfg.tokenMint);if(live){$('token-pill').textContent='TOKEN LIVE';$('token-pill').classList.add('live');}else if(cfg.launchInProgress){const pill=$('token-pill');if(pill)pill.textContent='LAUNCH IN PROGRESS';}
setLink('pump-link',live&&cfg.pumpUrl?cfg.pumpUrl:'',cfg.launchInProgress?'Pump.fun — launching now; CA pending':'Pump.fun — launch pending');
setLink('x-link',cfg.xUrl||'','X profile — coming soon');setLink('social-x',cfg.xUrl||'','X profile — coming soon');
setLink('report-link',cfg.reportUrl||'','Public disbursement reports — pending');
setLink('ngo-link',cfg.beneficiaryConfirmed?cfg.beneficiaryUrl:'','Beneficiary — pending confirmation');
setLink('wallet-explorer',validAddress(wallet)?'https://solscan.io/account/'+wallet:'','Explorer unavailable');
// Organizer-reported project progress. This is intentionally NOT a live on-chain balance.
const reported = Number(cfg.projectReportedSol);
const target = Number(cfg.projectGoalSol);
if (Number.isFinite(reported) && reported >= 0 && Number.isFinite(target) && target > 0) {
  const percent = Math.max(0, Math.min(100, (reported / target) * 100));
  const amountText = amount => amount.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' SOL';
  setText('project-reported-sol', amountText(reported));
  setText('project-target-sol', 'of ' + target.toLocaleString('en-US') + ' SOL');
  setText('project-percent', percent.toFixed(2) + '% of goal');
  const rail = $('project-progress-rail');
  if (rail) {
    rail.style.width = percent.toFixed(6) + '%';
    rail.parentElement?.setAttribute('aria-valuenow', percent.toFixed(2));
    rail.parentElement?.setAttribute('aria-valuetext', amountText(reported) + ' reported by project organizer out of ' + target.toLocaleString('en-US') + ' SOL goal');
  }
}

// Address and Solscan explorer are displayed without opening a wallet or requesting a specific amount.
setText('year', new Date().getFullYear());
