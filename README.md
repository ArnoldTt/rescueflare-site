# RescueFlare — transparent prerelease website

Static HTML/CSS/JavaScript website for GitHub Pages; no backend or wallet custody. Public address: `GjcXBfnS8FT1XFtjQ8Tu3pRHzVsiTM62Q5TGhbt5p2Es`.

## Important disclosures
- The project is NOT a verified registered charity. Voluntary transfers go to its stated project-controlled wallet, NOT directly to a verified animal rescue NGO.
- The organizer reports 500 SOL. **This has NOT been independently verified and is NOT displayed as verified fundraising.** The 500/8000 graphic is marked illustrative. A public balance is not the same as cumulative donations.
- The live wallet balance requests `getBalance` from Solana's mainnet RPC, and displays an unavailable state when the request fails.
- A transfer is enabled only when a user checks an explicit acknowledgment; the Solana Pay link opens their own wallet and never sends funds automatically. Some wallets don't support Solana Pay. The QR carries the address only.
- No Pump.fun token mint has been provided; the trading link remains disabled. Mint address, creator fee donations, and NGO affiliation must not be claimed without proof.

## Files
- `index.html` landing page
- `config.js` public configuration (no private keys)
- `app.js` payment-link UX, disclaimer and RPC wallet balance
- `golden-orangutan.webp` website illustration
- `pumpfun-token-image.jpg` artwork to be used when permitted by Pump.fun requirements
- `wallet-qr.png` QR of the public project-controlled wallet (no amount)

## Deployment
Upload the files to the root of public repo `ArnoldTt/rescueflare-site` via GitHub's file upload UI. GitHub Pages settings: Deploy from a branch → `main` → `/(root)`. Wait for the active page at https://arnoldtt.github.io/rescueflare-site/. This ZIP itself has **not** been pushed to GitHub.

Use a verifiable, agreed beneficiary and proof of wallet control before calling collected funds charitable donations.
