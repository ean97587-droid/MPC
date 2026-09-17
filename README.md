# MPC event-image hardening patch

This package keeps the editable Pages CMS / GitHub / Cloudflare architecture, but embeds the three supplied speaker headshots directly in JavaScript as a fallback for the existing events. This makes Marco Cianflone, Nicholas Moritsugu, and Michael Korzinstone render even if an asset path is missing or a static image request fails. Normal CMS-uploaded images continue to work for future events.


## September 17 update
- Added Daniel Maev (Managing Director, M&A, CIBC Capital Markets) as an upcoming event for November 13, 2026 at 11:30 AM.
- Daniel is intentionally excluded from the homepage Selected Events module and appears on the Events page alongside other upcoming speakers.
- Updated the homepage hero with a locally bundled New York skyline visual.

## Real NYC hero photo update
- Replaced the AI-generated NYC hero artwork with a real photograph of Manhattan at sunset featuring the Empire State Building.
- Source: Wikimedia Commons, "Empire State Building during sunset" by Michael Discenza.
- License: CC0 1.0 / public-domain dedication. No attribution is required, but the source is documented here for provenance.
- The real photograph is loaded from Wikimedia Commons; the former AI hero asset has been removed from this package.
