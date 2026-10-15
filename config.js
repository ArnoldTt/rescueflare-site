/*
 * RESCUEFLARE PUBLIC CONFIGURATION
 * Only publish PUBLIC Solana addresses. NEVER paste seed phrases/private keys.
 * All placeholders must be replaced before the related button is enabled.
 */
window.RESCUEFLARE_CONFIG = {
  tokenName: 'RescueFlare',
  ticker: 'RFLARE',
  donationWallet: 'GjcXBfnS8FT1XFtjQ8Tu3pRHzVsiTM62Q5TGhbt5p2Es', // Supplied public wallet address; format validated, control not verified
  tokenMint: '',      // Fill after token is created on Pump.fun
  pumpUrl: '',        // Fill after launch using the official token page
  xUrl: 'https://x.com/RFLareSol', // Public branding seen Oct 15 2026; no authenticated access
  beneficiaryName: '', // Verified intended recipient's legal name when selected
  beneficiaryUrl: '',
  beneficiaryConfirmed: false,
  donationsEnabled: false, // direct nonprofit donations NOT enabled
  projectWalletSupportEnabled: true, // voluntary transfers to independently disclosed project wallet; charity use NOT verified
  donationGoalSol: 8000,
  organizerReportedSol: 429.09, // explicitly unverified; illustrative only // Set to true ONLY after recipient, operator, disclosures, and fundraising compliance are verified
  creatorFeeRecipientText: 'Pending selection and disclosure',
  operatorDisclosure: 'Independent community project. Donation wallet address was supplied by the organizer, but control of the wallet and any nonprofit beneficiary have not yet been verified. Direct donations are not being solicited until required checks are complete. No affiliation with news publishers, animal rescue NGOs, or Pump.fun is claimed.',
  reportUrl: '',      // optional link to publicly accessible grant/payment reports
};
