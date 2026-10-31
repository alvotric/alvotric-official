# alvotric-website

Official corporate website of **Alvotric**. Next.js (App Router) + TypeScript + Tailwind CSS v4, built as a **static export**.
Separate from the Alvo application; it shares no code with it.

## Run locally

```bash
nvm use            # Node 22 (see .nvmrc); any current LTS works
npm install
npm run dev        # http://localhost:3000
```

## Checks and build

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # static export to ./out
npm run check      # all three
```

`npm run build` warns if `NEXT_PUBLIC_SITE_URL` is unset locally and **fails** on Cloudflare/Netlify/CI builds,
so a localhost URL can never reach canonical tags, Open Graph tags, or the sitemap.
Without the variable, `robots.txt` blocks indexing.

## Configuration (nothing is hard-coded in components)

| What | Where |
|---|---|
| Production domain | env `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`, no trailing slash) |
| Contact email | env `NEXT_PUBLIC_CONTACT_EMAIL` (empty = `/contact` shows "not available yet") |
| Alvo destination and verified flag | `content/site.config.ts` (`alvo.url`, `alvo.urlVerified`) or env `NEXT_PUBLIC_ALVO_URL` |
| Social links | `content/site.config.ts` `social` array. Rendered only when `official: true` |
| Founder section | `features.showFounder` (not implemented in v1) |
| Product and capability status | `content/products.ts` (all Alvo capabilities are `in-development`) |
| Colors, radii | CSS variables at the top of `app/globals.css` |

"Visit Alvo" falls back to "Learn more" (internal page) if `alvo.urlVerified` is false or the URL is empty.

## Structure

```
app/            routes, layout, metadata files (sitemap, robots, icon, OG image)
components/ui/        Button, Badge, Container, Section, PageHeader, JsonLd, DraftNotice
components/layout/    SiteHeader (mobile menu), SiteFooter, Logo, SkipLink
components/sections/  Hero, FocusAreas, AlvoFeature, Principles, FutureEcosystem, CtaBand
content/        site.config.ts, products.ts (all copy-adjacent facts and statuses)
lib/            cn, metadata helper
public/_headers security + cache headers (Cloudflare Pages / Netlify)
scripts/        check-env.mjs (pre-build guard)
```

## Deploy to Cloudflare Pages (free plan)

Option A, Git-connected:
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Framework preset: none. Build command: `npm run build`. Build output directory: `out`.
4. Environment variables (Production): `NEXT_PUBLIC_SITE_URL`, `NODE_VERSION=22`. Optional: `NEXT_PUBLIC_CONTACT_EMAIL`.
5. Deploy, then add the custom domain under the project's Custom domains tab.

Option B, direct upload (no Git):
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
npx wrangler pages deploy out --project-name alvotric-website
```

Other hosts: upload `out/`. Convert `public/_headers` to that host's header configuration.

## Known limits of the static export

No API routes, no middleware, no on-demand image optimization. Images must be optimized before commit.
The contact form is deferred until a monitored email address and a delivery provider exist; when added it
will be a separate Cloudflare Pages Function or external service, not a Next.js route.

## Accessibility and contrast

Text/background pairs measured (WCAG 2.2): primary text 17.9:1, secondary 8.5:1, subtle (#8a92a6) 6.3:1 on the base background;
accent #6e7bff on base 5.6:1; button label (dark on accent) 5.6:1. Borders (#232838, #323951) are decorative; no
control relies on a border alone for identification. Keyboard focus ring, skip link, reduced-motion support, and a
focus-trapped mobile menu are implemented.

## Content rules

No invented statistics, customers, testimonials, partnerships, or certifications. Every Alvo capability is
"In development" until individually verified. Legal pages are drafts and say so.
