# McGill Private Capital — CMS-ready website

This is the editable version of the MPC website. The public site remains a lightweight static website, but its routine content is stored in JSON files and configured for visual editing with **Pages CMS**.

There is no paid backend, database, or website-builder subscription.

## Public pages
- `index.html` — Home
- `about.html` — About
- `team.html` — Team
- `placements.html` — Placements
- `events.html` — Events
- `applications.html` — Applications
- `admin/index.html` — Editor launch page

## Visual editing
After the one-time GitHub + Pages CMS setup in `CMS_SETUP.md`, editors can update the site without touching code.

Editable content lives in:
- `content/site.json` — site settings, applications, stats and values
- `content/team.json` — leadership, senior analysts and junior analysts
- `content/events.json` — upcoming events, past events, speaker photos and event galleries
- `content/placements.json` — placement firms and logos

`.pages.yml` defines the visual editor fields and media folders.

## Photos
Team headshots can be uploaded through the CMS into `assets/team/`.

Speaker and event photos can be uploaded through the CMS into `assets/events/`. Past events support galleries of up to 20 photos. The public site renders these as clickable thumbnails with a lightbox.

## Application form
The current application URL is already stored in `content/site.json`. It can be changed visually under **Site & Applications** in the CMS.

## Deployment model
For automatic publishing, use a Git-integrated Cloudflare Pages project connected to the GitHub repository. Every CMS save creates a GitHub commit; Cloudflare then redeploys automatically.

The earlier drag-and-drop Cloudflare project can remain live while the Git-integrated version is tested. See `CMS_SETUP.md` for the cutover process.

## Fallback
`js/site-data.js` is retained only as a bundled emergency fallback if the JSON content cannot be fetched. Routine edits should be made through the CMS, not in that file.

## Guides
- `CMS_SETUP.md` — one-time setup
- `EDITOR_GUIDE.md` — everyday editing
- `DEPLOYMENT.md` — general deployment notes
- `ASSET_SOURCES.md` — asset provenance
