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

**Deploy:**

```bash
npx shopify hydrogen deploy
```

This will build and deploy your project to Cloudflare Workers automatically.

Alternatively, you can build and deploy separately using Wrangler directly:

```bash
npm run build
npx wrangler deploy --config dist/ssr/wrangler.json
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
