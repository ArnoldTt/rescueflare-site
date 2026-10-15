'use strict';
/* RescueFlare public website.
 * SOL transfers are voluntary contributions to a project-supplied wallet.
 * Charitable status, wallet ownership, and 500 SOL reported figure are unverified.
 * No site functionality signs, submits, or simulates a payment.
 */
const cfg = window.RESCUEFLARE_CONFIG || {};
const byId = (id) => document.getElementById(id);
const put = (id, value) => { const node = byId(id); if (node) node.textContent = value; };
function solanaAddressSyntax(s) { return typeof s === 'string' && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(s); }
function safeHttpUrl(raw) {
  try { const u = new URL(raw); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; }
  catch { return ''; }
}
function link(id, raw, disabledLabel) {
  const el = byId(id); if (!el) return;
  const url = safeHttpUrl(raw);
  if (url) {
    el.href = url; el.rel = 'noopener noreferrer'; el.target = '_blank';
    el.classList.remove('disabled'); el.removeAttribute('aria-disabled');
  } else {
    el.removeAttribute('href'); el.classList.add('disabled');
    el.setAttribute('aria-disabled','true');
    if (disabledLabel) el.textContent = disabledLabel;
  }
}
const wallet = cfg.donationWallet;
const walletFormatLooksValid = solanaAddressSyntax(wallet);
const isTokenLive = solanaAddressSyntax(cfg.tokenMint) && Boolean(safeHttpUrl(cfg.pumpUrl));
put('brand-name', cfg.tokenName || 'RescueFlare');
put('token-name', cfg.tokenName || 'RescueFlare');
put('token-ticker', '$' + (cfg.ticker || 'RFLARE'));
put('hero-ticker', '$' + (cfg.ticker || 'RFLARE'));
put('footer-ticker', '$' + (cfg.ticker || 'RFLARE'));
put('wallet-address', walletFormatLooksValid ? wallet : 'Address unavailable');
put('ngo-status', cfg.beneficiaryConfirmed && cfg.beneficiaryName ? 'Confirmed: ' + cfg.beneficiaryName : 'Recipient not yet confirmed');
put('fee-recipient', cfg.creatorFeeRecipientText || 'Pending selection and disclosure');
put('operator-disclosure', cfg.operatorDisclosure || 'Operator disclosures pending.');
put('contract-status', isTokenLive ? cfg.tokenMint : 'Token not launched');
if (isTokenLive) { byId('token-pill')?.classList.add('live'); put('token-pill','TOKEN LIVE'); }
link('pump-link', isTokenLive ? cfg.pumpUrl : '', 'Pump.fun — launch pending');
link('x-link', cfg.xUrl, 'X profile — coming soon');
link('social-x', cfg.xUrl, 'X project profile — coming soon');
link('report-link', cfg.reportUrl, 'Public disbursement reports — pending');
link('ngo-link', cfg.beneficiaryConfirmed ? cfg.beneficiaryUrl : '', 'Beneficiary — pending confirmation');
link('wallet-explorer', walletFormatLooksValid ? 'https://solscan.io/account/' + wallet : '', 'Wallet explorer unavailable');
const canOpenWallet = walletFormatLooksValid && cfg.projectTransfersEnabled === true;
const qr = byId('wallet-qr');
if (qr && walletFormatLooksValid) {
  // Only a public wallet address goes to a third-party QR endpoint. Independently verify scans.
  qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=' + encodeURIComponent('solana:' + wallet);
  qr.onerror = () => { qr.style.display='none'; };
} else if (qr) { qr.hidden = true; }
let selected = '0.05';
const custom = byId('custom-sol');
const approve = byId('risk-ack');
const donate = byId('donate-action');
const hint = byId('transfer-hint');
function checkedAmount() {
  const raw = String(custom?.value ?? selected).trim();
  const amount = Number(raw);
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw) || !Number.isFinite(amount) || amount <= 0 || amount > 8000) return null;
  return raw;
}
function refreshTransfer() {
  if (!donate) return;
  const amount = checkedAmount();
  const ready = canOpenWallet && approve?.checked === true && amount !== null;
  if (ready) {
    const params = new URLSearchParams({amount, label:'RescueFlare project wallet', message:'Voluntary project contribution. Not a verified charitable donation.'});
    donate.href = 'solana:' + wallet + '?' + params;
    donate.classList.remove('disabled'); donate.removeAttribute('aria-disabled');
    donate.textContent='Open wallet to send ' + amount + ' SOL ↗';
    if (hint) hint.textContent='Your wallet must confirm any transaction. Verify the full address and amount before sending. If this link cannot open a wallet, copy the address and send manually.';
  } else {
    donate.removeAttribute('href'); donate.classList.add('disabled');
    donate.setAttribute('aria-disabled','true');
    donate.textContent = !canOpenWallet ? 'Project wallet transfers unavailable' : !amount ? 'Enter a valid SOL amount' : 'Accept disclosures to open wallet transfer';
    if (hint) hint.textContent='No transfer is initiated by this site. Read the disclosures first. QR scanning or copying a public wallet address does not verify who controls that wallet.';
  }
}
for (const btn of document.querySelectorAll('[data-amount]')) {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-amount]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selected = btn.dataset.amount || selected;
    if (custom) custom.value=selected;
    refreshTransfer();
  });
}
custom?.addEventListener('input', () => {
  document.querySelectorAll('[data-amount]').forEach(b=>b.classList.toggle('selected',b.dataset.amount===custom.value));
  refreshTransfer();
});
approve?.addEventListener('change',refreshTransfer);
refreshTransfer();
const copy = byId('copy-wallet');
if (copy) {
  copy.disabled=!walletFormatLooksValid;
  copy.textContent=walletFormatLooksValid ? 'Copy wallet address' : 'Address unavailable';
  copy.addEventListener('click', async () => {
    if (!walletFormatLooksValid) return;
    try {
      await navigator.clipboard.writeText(wallet);
      copy.textContent='Address copied ✓';
    } catch {
      const target=byId('wallet-address');
      if (target) {
        const range=document.createRange(); range.selectNodeContents(target);
        const selection=window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      }
      copy.textContent='Select address and copy manually';
    }
  });
}
put('year', new Date().getFullYear());
