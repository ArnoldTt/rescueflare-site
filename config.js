/*
 * RESCUEFLARE PUBLIC CONFIGURATION
 * Only publish PUBLIC Solana addresses. NEVER paste seed phrases/private keys.
 * All placeholders must be replaced before the related button is enabled.
 */
window.RESCUEFLARE_CONFIG = {
  tokenName: 'RescueFlare',
  ticker: 'RFLARE',
  donationWallet: 'GjcXBfnS8FT1XFtjQ8Tu3pRHzVsiTM62Q5TGhbt5p2Es', // Project-supplied wallet; independent control not verified
  tokenMint: '',      // Fill after token is created on Pump.fun
  pumpUrl: '',        // Fill after launch using the official token page
  xUrl: 'https://x.com/RFLareSol', // Public branding seen Oct 15 2026; no authenticated access
  beneficiaryName: '', // Verified intended recipient's legal name when selected
  beneficiaryUrl: '',
  beneficiaryConfirmed: false,
  donationsEnabled: false, // Not offering verified charitable donations.\n  projectTransfersEnabled: true, // Only voluntary SOL transfers directly to operator-identified wallet, with disclosures and user acknowledgement
  creatorFeeRecipientText: 'Pending selection and disclosure',
  operatorDisclosure: 'Independent Solana meme community. The organizer reports 500 SOL toward an 8,000 SOL project target; that figure, its provenance, and wallet ownership are not independently verified. SOL payments go to a project-supplied wallet, NOT directly to a confirmed animal-rescue nonprofit. No beneficiary agreement or charitable disbursements have been established. Token purchases are not donations. No affiliation with the rescue organizations featured in independent news reports is claimed.',
  reportUrl: '',      // optional link to publicly accessible grant/payment reports
};
