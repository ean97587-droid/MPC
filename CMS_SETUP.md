# MPC Visual Editor — one-time setup

This version of the site is CMS-ready. After the one-time setup below, routine updates are made in a visual editor — no HTML/CSS/JavaScript editing and no ZIP redeploys.

## What the editor controls

- Team members, roles, LinkedIn links and headshots
- Upcoming events and speaker headshots
- Past events and photo galleries (up to 20 photos per event)
- Application status, deadline text and application form link
- Placement firms and logos
- Homepage stats and MPC values

The editor is powered by **Pages CMS**, an open-source Git-backed CMS. Content and uploaded images remain in your own GitHub repository; there is no separate CMS database.

## 1. Put the site in GitHub

1. Create a GitHub repository called `mcgill-private-capital` (private is fine).
2. Upload the **contents** of this website folder to the repository root. `.pages.yml` must be at the root.
3. Use `main` as the default branch.

## 2. Connect Pages CMS

1. Go to https://app.pagescms.org
2. Sign in with GitHub.
3. Install/authorize the Pages CMS GitHub App for the `mcgill-private-capital` repository.
4. Open the repository in Pages CMS.
5. The editor will automatically read `.pages.yml` and show four sections:
   - Site & Applications
   - Team
   - Events
   - Placements

The site also includes `/admin/`, which is a simple launch page for the editor.

## 3. Create a Git-integrated Cloudflare Pages project

The current drag-and-drop Cloudflare project is a **Direct Upload** project. Cloudflare does not let Direct Upload projects be converted to Git integration later, so create one new Pages project for the editable version.

1. Cloudflare → Workers & Pages → Create application.
2. Choose **Pages / Connect to Git**.
3. Connect GitHub and select `mcgill-private-capital`.
4. Framework preset: **None**.
5. Build command: leave blank.
6. Build output directory: `/` (repository root).
7. Production branch: `main`.
8. Deploy.

After that, every Pages CMS save creates a GitHub commit, and Cloudflare automatically redeploys the website.

## 4. Move the official domain only after previewing

Keep the current official site/project in place until the new Git-integrated Cloudflare preview looks correct.

When ready:
1. Remove `mcgillprivatecapital.ca` / `www.mcgillprivatecapital.ca` from the old deployment if attached there.
2. Add them as Custom Domains on the new Git-integrated Pages project.
3. Test both `https://mcgillprivatecapital.ca` and `https://www.mcgillprivatecapital.ca`.

## Everyday workflow after setup

1. Open `https://mcgillprivatecapital.ca/admin/` or https://app.pagescms.org.
2. Sign in with GitHub.
3. Choose the section you want to edit.
4. Upload photos directly where needed.
5. Save.
6. Cloudflare deploys the change automatically.

For a past event photo gallery, open **Events → Past events → [event] → Event photo gallery**, upload/select the photos, and save. No code changes are required.
