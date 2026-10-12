# Animo Run Club - Shopify Hydrogen

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Deploying to Cloudflare

**First-time setup:**

1. Authenticate with Cloudflare:

```bash
npx wrangler login
```

2. Link your Hydrogen storefront:

```bash
npx shopify hydrogen link
```

3. Load secrets to the worker:

```bash
echo "<value>" | npx wrangler secret put PUBLIC_STOREFRONT_API_TOKEN --name animo-run-club
echo "<value>" | npx wrangler secret put PUBLIC_STORE_DOMAIN --name animo-run-club
echo "<value>" | npx wrangler secret put PUBLIC_STOREFRONT_ID --name animo-run-club
echo "<value>" | npx wrangler secret put PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID --name animo-run-club
echo "<value>" | npx wrangler secret put PUBLIC_CUSTOMER_ACCOUNT_API_URL --name animo-run-club
echo "<value>" | npx wrangler secret put SHOP_ID --name animo-run-club
echo "<value>" | npx wrangler secret put PRIVATE_STOREFRONT_API_TOKEN --name animo-run-club
echo "<value>" | npx wrangler secret put SESSION_SECRET --name animo-run-club
echo "<value>" | npx wrangler secret put RESEND_API_KEY --name animo-run-club
echo "<value>" | npx wrangler secret put RESEND_FROM_EMAIL --name animo-run-club
echo "<value>" | npx wrangler secret put RESEND_TO_EMAIL --name animo-run-club
echo "<value>" | npx wrangler secret put TURNSTILE_SITE_KEY --name animo-run-club
echo "<value>" | npx wrangler secret put TURNSTILE_SECRET_KEY --name animo-run-club
```

The same variable names go in `.env` for local work. Both `npm run dev` and `npm run preview:cloudflare` read it.

**Deploy to production:**

```bash
npm run deploy
```

This builds the project and runs `wrangler deploy`.

> `npx shopify hydrogen deploy` deploys to Shopify Oxygen, **not** Cloudflare. Don't use it for this project.

### Previewing on Cloudflare

There are three ways to preview, and they are not the same thing:

| Command | What it runs | Use it for |
| --- | --- | --- |
| `npm run preview` | `shopify hydrogen preview`, which uses MiniOxygen (Shopify's local emulation of Oxygen) | Quick local check. It does **not** use `wrangler.jsonc`, and it uses the compatibility date in `dist/server/oxygen.json` (2025-04-01) instead of ours. |
| `npm run preview:cloudflare` | Builds, then `wrangler dev`: the built Worker with our real `wrangler.jsonc` on a local workerd (http://localhost:8787) | Checking the Worker config and `.env` secrets work like they will in production. |
| `npm run deploy:preview` | Builds, then `wrangler versions upload`: uploads a new Worker version **without** making it live and prints a preview URL (`<version>-animo-run-club.<subdomain>.workers.dev`) | Sharing a real URL for review or device testing. |

### Automatic deploys (Workers Builds)

This project is a Worker with static assets, not a Cloudflare Pages project. The equivalent of Pages' git integration is **Workers Builds**. To deploy automatically from GitHub:

1. Cloudflare dashboard → Workers & Pages → `animo-run-club` → Settings → Builds → connect the GitHub repo.
2. Production branch: `main`.
3. Build command: `npm run build`.
4. Deploy command: `npx wrangler deploy`. This runs on pushes to `main`.
5. Non-production branch deploy command: `npx wrangler versions upload`. This gives every other branch and PR its own preview URL without touching production.

`npm run deploy` and `npm run deploy:preview` do the same thing by hand from a laptop.

### Caveats for preview URLs (read before sharing one)

- **Previews use production secrets and data.** A preview version belongs to the same Worker, so it uses the same secrets and talks to the real Shopify store. Submitting the contact form on a preview sends a real email through Resend to `RESEND_TO_EMAIL`.
- **`/account` login won't work on an unregistered URL.** The Customer Account API only accepts callback and origin URLs registered in Shopify. A new `workers.dev` preview hostname isn't registered, so login fails there. See "Setup for using Customer Account API" below.
- **Turnstile may reject preview hostnames.** If the Turnstile widget has a hostname allowlist, the preview hostname has to be added to it or the contact form's captcha won't load.
- **Preview URLs are public.** They're unguessable but not private. Put Cloudflare Access in front of them if the content shouldn't be seen.
- **Preview URLs have to be enabled for the Worker.** Check this in the dashboard under Settings → Domains & Routes. `wrangler.jsonc` doesn't set `workers_dev` or `preview_urls`.
- **Secrets are per Worker, not per environment.** There's no separate staging Worker or staging secret set. If previews ever need isolated data or a test email recipient, that means a second Worker (or a wrangler `env`) with its own secrets.

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
