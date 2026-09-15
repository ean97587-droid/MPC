# QA — McGill Private Capital CMS-ready v5

Checked September 15, 2026.

- Six public pages plus custom 404 remain present.
- `/admin/` editor launch page added.
- Existing visual design, MPC logo, team headshots and speaker headshots retained.
- Public content migrated from hard-coded JavaScript data into four JSON content files.
- Site loads CMS-managed content from `/content/*.json` with a bundled fallback.
- Pages CMS configuration (`.pages.yml`) parses successfully.
- Team headshot uploads are configured for `assets/team/`.
- Speaker/event photo uploads are configured for `assets/events/`.
- Past events support up to 20 gallery images per event.
- Event galleries render on the live Events page with clickable lightbox viewing.
- Application URL remains set to the supplied Google Form.
- Michael Korzinstone / Altas Partners remains listed for October 2, 2026 at 11:30 AM.
- Local image references currently present in JSON content resolve successfully.
- `js/main.js` passes JavaScript syntax checking.
- `content/*.json` parse successfully.
- Local HTTP checks return 200 for the homepage, JSON content and `/admin/`.
- No DNS or production-domain changes were made by this package.
