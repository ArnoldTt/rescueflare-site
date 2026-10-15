'use strict';
const cfg = window.RESCUEFLARE_CONFIG || {};
const $ = (id) => document.getElementById(id);
const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };
function looksLikeSolanaAddress(s) {
  return typeof s === 'string' && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(s);
}
function safeHttpUrl(raw) {
  try { const url = new URL(raw); return /^https?:$/.test(url.protocol) ? url.href : ''; }
  catch { return ''; }
}
function setLink(id, url, labelWhenMissing) {
  const el = $(id);
  if (!el) return;
  const safe = safeHttpUrl(url);
  if (safe) { el.href = safe; el.removeAttribute('aria-disabled'); el.classList.remove('disabled'); el.target = '_blank'; el.rel = 'noopener noreferrer'; }
  else { el.removeAttribute('href'); el.setAttribute('aria-disabled','true'); el.classList.add('disabled'); if(labelWhenMissing) el.textContent = labelWhenMissing; }
}
const hasWallet = looksLikeSolanaAddress(cfg.donationWallet);
const canDonate = hasWallet && cfg.beneficiaryConfirmed === true && cfg.donationsEnabled === true;
setText('brand-name', cfg.tokenName || 'RescueFlare');
setText('token-name', cfg.tokenName || 'RescueFlare');
setText('token-ticker', '$' + (cfg.ticker || 'RFLARE'));
setText('hero-ticker', '$' + (cfg.ticker || 'RFLARE'));
setText('footer-ticker', '$' + (cfg.ticker || 'RFLARE'));
setText('wallet-address', hasWallet ? cfg.donationWallet : 'Not configured — donations disabled');
setText('fee-recipient', cfg.creatorFeeRecipientText || 'Pending selection and disclosure');
setText('operator-disclosure', cfg.operatorDisclosure || 'Independent project.');
setText('ngo-status', cfg.beneficiaryConfirmed && cfg.beneficiaryName ? 'Confirmed: ' + cfg.beneficiaryName : 'Recipient not yet confirmed');
setText('contract-status', looksLikeSolanaAddress(cfg.tokenMint) ? cfg.tokenMint : 'Token not launched');
const tokenLaunched = looksLikeSolanaAddress(cfg.tokenMint);
if (tokenLaunched) { $('token-pill').textContent='TOKEN LIVE'; $('token-pill').classList.add('live'); }
setLink('pump-link', cfg.pumpUrl && tokenLaunched ? cfg.pumpUrl : '', 'Pump.fun — launch pending');
setLink('x-link', cfg.xUrl || '', 'X profile — coming soon');
setLink('social-x', cfg.xUrl || '', 'X / Twitter — coming soon');
setLink('report-link', cfg.reportUrl || '', 'Public disbursement reports — pending');
setLink('ngo-link', cfg.beneficiaryConfirmed ? cfg.beneficiaryUrl : '', 'Beneficiary — pending confirmation');
if (hasWallet) {
  $('wallet-explorer').href = 'https://solscan.io/account/' + cfg.donationWallet;
  $('wallet-explorer').classList.remove('disabled');
  $('wallet-explorer').removeAttribute('aria-disabled');
} else {
  $('wallet-explorer').classList.add('disabled');
  $('wallet-explorer').setAttribute('aria-disabled', 'true');
  $('wallet-explorer').removeAttribute('href');
}
let amount = '0.05';
for (const btn of document.querySelectorAll('[data-amount]')) {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-amount]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    amount = btn.dataset.amount;
    updatePaymentLink();
  });
}
function updatePaymentLink() {
  const donate = $('donate-action');
  if (!canDonate) {
    donate.removeAttribute('href'); donate.classList.add('disabled'); donate.setAttribute('aria-disabled', 'true');
    donate.textContent='Donations open after beneficiary verification';
    return;
  }
  const query = new URLSearchParams({ amount, label: cfg.tokenName || 'RescueFlare', message: 'Voluntary donation for animal welfare. Not a token purchase.' });
  donate.href = 'solana:' + cfg.donationWallet + '?' + query.toString();
  donate.classList.remove('disabled'); donate.removeAttribute('aria-disabled');
  donate.textContent='Donate ' + amount + ' SOL via wallet ↗';
}
updatePaymentLink();
$('copy-wallet').disabled = !canDonate;
$('copy-wallet').textContent = canDonate ? 'Copy address' : 'Copy disabled until verification';
$('copy-wallet').addEventListener('click', async () => {
  if (!canDonate) return;
  try {
    await navigator.clipboard.writeText(cfg.donationWallet);
    $('copy-wallet').textContent = 'Copied ✓';
  } catch {
    const el = $('wallet-address');
    const range = document.createRange(); range.selectNodeContents(el);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    $('copy-wallet').textContent='Select and copy the address';
  }
});
const year = new Date().getFullYear(); setText('year', year);
