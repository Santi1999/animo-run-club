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
```

**Deploy:**

```bash
npx shopify hydrogen deploy
```

This will build and deploy your project to Cloudflare Workers automatically.

Alternatively, you can build and deploy separately using Wrangler directly:

```bash
npm run build && npx wrangler deploy
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
