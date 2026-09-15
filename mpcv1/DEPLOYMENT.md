# Deployment and domain cutover

The website is a normal static site. The existing Google Site can remain live until the replacement has been deployed to a preview URL and fully checked.

## Recommended: Cloudflare Pages — $0/month

### A. Deploy the replacement first — do not touch DNS yet
1. Create a GitHub repository and upload the contents of this folder to the repository root.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Use **Framework preset: None**. This site has no compilation step. Use `exit 0` as the build command if Cloudflare requires a command; if the field can be left empty, that is also fine. Set the output directory to the **repository root** (`.`) because `index.html` lives there. Leave the root directory at its default/repository root.
5. Deploy. Cloudflare gives the project a temporary hostname such as `<your-project>.pages.dev`.
6. Open the preview and test all pages before changing any DNS:
   - `/`
   - `/about.html`
   - `/team.html`
   - `/placements.html`
   - `/events.html`
   - `/applications.html`

### B. Prepare the domain without breaking existing services
Cloudflare Pages requires the **apex/root domain** (`mcgillprivatecapital.ca`) to be on a Cloudflare DNS zone. If the domain already uses Cloudflare nameservers, skip to section C.

If DNS is currently hosted somewhere else:
1. Add `mcgillprivatecapital.ca` to a free Cloudflare account as a website/zone.
2. Compare Cloudflare's imported DNS records against the records at the current DNS provider **before changing nameservers**.
3. Make sure every non-web record is present in Cloudflare, especially MX, SPF, DKIM, DMARC, verification TXT records and any other subdomains you use.
4. Keep the current Google Sites web record(s) in the Cloudflare zone during this preparation step so the old website continues to resolve after the nameserver change.
5. At the registrar, replace the existing authoritative nameservers with the two Cloudflare nameservers assigned to the zone.
6. Wait until Cloudflare shows the zone as active. Confirm that email and the existing website still work before changing the website mapping.

Changing nameservers does **not** transfer or cancel the domain registration. It only changes which DNS provider is authoritative.

### C. Cut over the website only after the preview is verified
1. In the Pages project, open **Custom domains → Set up a custom domain**.
2. Add `mcgillprivatecapital.ca` first. Because the apex is now in the Cloudflare zone, Pages can create/manage the required DNS mapping.
3. Add `www.mcgillprivatecapital.ca` as a second custom domain if you want both hostnames.
4. Use the Pages custom-domain workflow **before** manually creating a CNAME. Cloudflare needs to associate the hostname with the Pages project, not merely point DNS at a `pages.dev` address.
5. Remove or replace only the old Google Sites **web-hosting** record(s) that conflict with the Pages mapping. Leave unrelated MX/TXT/email records untouched.
6. Wait until Cloudflare reports the custom domain as **Active** and the HTTPS certificate is issued.
7. Test both `https://mcgillprivatecapital.ca` and `https://www.mcgillprivatecapital.ca` (if configured), plus every page and mobile navigation.
8. Keep one hostname canonical. This project uses `https://www.mcgillprivatecapital.ca/` in its canonical/OG metadata. Configure the bare apex to redirect to `www` once both hostnames are active.
9. Only after successful testing should you remove any remaining Google Sites mapping. The Google Site itself can stay intact as a rollback copy.

### What Cloudflare ultimately creates
Once the custom domain is associated in Pages, the website hostnames resolve to the Pages project. A `www` hostname typically appears as a CNAME to the assigned `<your-project>.pages.dev` address. For the apex, Cloudflare handles the root-domain mapping inside its zone.

Do not hard-code a guessed Pages hostname. Copy the exact project hostname that Cloudflare assigns.

## Alternative: GitHub Pages — $0/month

GitHub Pages is a good alternative if you want to keep the domain's current DNS provider instead of moving authoritative DNS to Cloudflare.

1. Create a GitHub repository and upload these files to the repository root. The included `CNAME` file contains `www.mcgillprivatecapital.ca`, matching the site's canonical URLs.
2. Go to **Repository Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then choose `main` and `/ (root)`.
3. Wait for the `github.io` preview to deploy and verify all pages before touching DNS.
4. In **Settings → Pages → Custom domain**, enter `www.mcgillprivatecapital.ca` and save. Configure the apex DNS records too; GitHub can then redirect the apex to `www`.
5. At the current DNS provider, use the **current GitHub Pages DNS values shown in GitHub's documentation/dashboard**. For the apex, GitHub publishes A/AAAA targets (or supported ALIAS/ANAME configuration); `www` is normally a CNAME to `<your-github-username>.github.io`.
6. Remove only the web record(s) that currently send the domain to Google Sites. Preserve MX, SPF, DKIM, DMARC, verification TXT records and unrelated subdomains.
7. After GitHub verifies the DNS, enable **Enforce HTTPS**.
8. Test both the apex and `www` hostnames and all six pages before considering the migration finished.

## Which option should you use?
Use **Cloudflare Pages** if you are comfortable moving authoritative DNS to Cloudflare; it gives you a clean static deployment and Cloudflare-managed custom-domain setup. Use **GitHub Pages** if preserving the current DNS provider is more important and you want the smallest possible DNS migration.

## Rollback
Before any DNS change, take a screenshot or export of the current DNS zone. If the cutover fails, restore the previous web-hosting record(s). DNS changes do not delete the existing Google Site, so it can remain available as a rollback source until the replacement is proven in production.
