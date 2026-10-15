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
// Address and Solscan explorer are displayed without opening a wallet or requesting a specific amount.
setText('year', new Date().getFullYear());
