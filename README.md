# RescueFlare — GitHub Pages deployment

This repository publishes a **pre-launch informational website** for $RFLARE. It contains only public site files.

## Setup (public GitHub repo required)

1. Create a **public** GitHub repository named `rescueflare-site`. Do not initialize with a README if the assistant will upload the files through GitHub integration.
2. Upload the files at repository root, including `index.html`, `config.js`, `app.js`, and `favicon.svg`. The other assets are optional for the landing page.
3. On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, then choose **main** and **/(root)** and click **Save**.
4. Wait until GitHub announces a deployed Pages URL. Typical format: `https://<github-user>.github.io/rescueflare-site/` (do not presume it is live until it responds successfully).
5. Open the URL in a browser. Verify X and Solscan links. Leave donations disabled until verifications are complete.

## Site configuration

All public settings live in `config.js`.

- X: `https://x.com/RFLareSol`.
- Separate public SOL wallet address: `GjcXBfnS8FT1XFtjQ8Tu3pRHzVsiTM62Q5TGhbt5p2Es` (ownership unverified).
- `tokenMint: ''` and `pumpUrl: ''` until deployment is confirmed.
- `beneficiaryConfirmed: false` and `donationsEnabled: false`; site links **must remain disabled** until recipient, custody, disclosures, and legal requirements have been checked.

**Token purchases are not charitable donations. No partner charity has authorized endorsement or acceptance.** Never put seed phrases, passwords or private keys in this repository.

## External citations published on the website

- [Reuters on relocation of eight orangutans, Oct 11, 2026](https://www.reuters.com/business/environment/indonesia-moves-8-endangered-orangutans-safety-after-borneo-fires-2026-10-11/)
- [Associated Press on relocation, Oct 13, 2026](https://apnews.com/article/677ea800733334d3d2e45cbfcd9e4861)

Assets have their source in original project materials. This repository is not endorsed by news publishers, animal-rescue organizations, or Pump.fun.