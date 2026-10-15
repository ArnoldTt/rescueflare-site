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
  creatorFeeRecipientText: 'Pending selection and disclosure',
  operatorDisclosure: 'RescueFlare is an independent Solana meme community. Transfers to the disclosed project wallet support the project, not a registered animal-rescue nonprofit directly. No independent nonprofit beneficiary or charity affiliation has been established. Token purchases are separate speculative transactions, not donations.',
  reportUrl: '',      // optional link to publicly accessible grant/payment reports
};
