# McGill Private Capital website

- `public/` is the website Cloudflare serves.
- `.pages.yml` configures Pages CMS and edits files inside `public/`.
- `wrangler.jsonc` tells Cloudflare to deploy only `public/` as static assets.

Routine edits should be made through Pages CMS. Cloudflare deploys changes from the `main` branch automatically.
