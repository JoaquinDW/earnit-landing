# Earnit website

Static English and Spanish website for Earnit. Node 20+ and Python 3 are enough; there are no package dependencies.

```sh
npm run build
npm run check
npm test
npm run preview
```

Preview: <http://127.0.0.1:4173/>. Spanish: `/es/`. Guides: `/guides/` and `/es/guides/`.

## Authoring

- `src/home.html`: homepage template; `content/home.json`: its English/Spanish copy.
- `content/guides.json`: article metadata, localized slugs, table of contents, and editorial dates.
- `content/guides/<id>.<lang>.html`: article bodies. Use `{{home}}`, `{{appStore}}`, `{{guide:walking}}` and `{{guide:instagram}}` for localized links.
- `assets/site.css`: existing forest/cobalt identity and the reading layouts. `assets/home.js` owns the illustrative phone; `assets/site.js` owns navigation and outbound-click events.
- `scripts/build.mjs`: writes complete, localized HTML to `public/`. That directory is disposable and gitignored; never edit it as source.
- Existing legal pages, support and 404 remain source files at the project root. Only the deployment allowlist is copied into `public/`; prototypes, documentation and private data are excluded.

To add a guide, add its metadata and both language bodies, then build and check. Give each new intent its own page. Improve an existing guide if it already answers the same question. Keep modification dates tied to real editorial changes rather than updating them on every build.

## Hosting

The existing project is hosted on Vercel. `vercel.json` builds and checks the site, then publishes `public/`. It preserves existing legal/support URLs and gives every language its own canonical URL. No framework, rewrite fallback, or database is needed.

Production origin is configured in `site.config.json`. Updating it changes canonical URLs, alternate-language links, the sitemap and the analytics production-host guard together.

## SEO and measurement

See [the operating instructions](docs/SEO-WORKFLOW.md) for Search Console, sitemap submission, CSV/API analysis, PostHog events and acquisition limits. See [the original strategy](SEO-PLAN.md) for the video analysis.

Optional analytics uses `.env.local` locally and hosting environment variables in production. See `.env.example`. Only public browser ingestion configuration may be exposed in the generated client file. Personal API keys and GSC OAuth tokens must never be included in the build.

## Scheduled listicles

The October 26–November 4 campaign covers 20 Applyra keywords in 10 bilingual listicles. See [the calendar](docs/seo/CALENDAR-2026-10-26.md). Future articles stay in source but are excluded from the static output until their publication day in Córdoba. The daily chat automation rebuilds and deploys; a date change alone does not update a static deployment. Run `npm run verify:published` after deployment.
