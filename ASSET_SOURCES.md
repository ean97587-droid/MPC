# MPC and team assets

- MPC logo — user-supplied official mark, stored locally in `assets/logos/`.
- Team portraits — cropped from user-supplied roster screenshots and stored locally in `assets/team/`; no face generation or retouching was used.
- Historical event photography — where still present, legacy Google Sites-hosted URLs are used with an editorial fallback if unavailable.

# Placement logo sources

All firm marks remain the property of their respective owners. They are used only to identify selected placement firms. The site includes a non-affiliation disclaimer on the Placements page.

- Evercore — Wikimedia Commons file `Evercore_logo.svg`, sourced from Evercore.
- Lazard — Wikimedia Commons file `Lazard_wordmark.svg`, sourced from Lazard.
- Goldman Sachs — Wikimedia Commons file `Goldman_Sachs_logo.svg`, sourced from Goldman Sachs' public CDN.
- J.P. Morgan — Wikimedia Commons file `JPMorgan_logo.svg`.
- Morgan Stanley — Wikimedia Commons file `Morgan_Stanley_Logo_2024.svg`, sourced from Morgan Stanley's 2024 media resources.
- RBC Capital Markets — Wikimedia Commons file `RBC_Capital_Markets_Logo.svg`, sourced from RBC Capital Markets.
- Barclays — Wikimedia Commons file `Barclays_wordmark.svg`, sourced from Barclays.
- BMO — Wikimedia Commons file `BMO_Logo.svg`, sourced from BMO.
- CIBC Capital Markets — Wikimedia Commons file `CIBC_CM.png`, sourced from CIBC Capital Markets.
- UBS — Wikimedia Commons file `UBS_Logo.png`, sourced from UBS.
- Ontario Teachers’ Pension Plan — public Ontario Teachers’ brand asset served by its Scene7 image CDN.
- CDPQ — Wikimedia Commons file `Caisse_de_dépôt_et_placement_du_Québec_logo.svg`, sourced from CDPQ.
- CPP Investments — Wikimedia Commons file `CPP_Investment_Board_Logo.svg`, sourced from CPP Investments.
- PSP Investments — Wikimedia Commons file `PSP_Investments_Logo.svg`, sourced from PSP Investments.

For maximum durability, download approved copies of these assets into `assets/logos/` and switch the URLs in `js/site-data.js` to local paths after reviewing each firm's brand-use requirements.


## Speaker portraits added September 2026
- Marco Cianflone — user-supplied image, bundled as `assets/events/marco-cianflone.webp`.
- Nicholas Moritsugu — user-supplied image, bundled as `assets/events/nicholas-moritsugu.webp`.
- Michael Korzinstone — user-supplied image, bundled as `assets/events/michael-korzinstone.webp`.

## Skyline photography
The website uses CC0/public-domain-dedicated skyline photography from Wikimedia Commons:
- New York & Jersey City skyline panorama — Pierre Blaché, CC0.
- London skyline from Horniman Gardens — Poliphilo, CC0.
- Hong Kong skyline from Victoria Peak — Robster1983, CC0.
These are referenced from Wikimedia's image CDN.

## v4 image reliability update
Team and speaker headshots are bundled locally as JPEG files for broad browser/static-host compatibility. Skyline photography uses direct Wikimedia Commons file URLs that were checked against the corresponding Commons file pages; each skyline also has a bundled local SVG fallback so the layout never renders a broken-image box if a third-party image request is blocked.
