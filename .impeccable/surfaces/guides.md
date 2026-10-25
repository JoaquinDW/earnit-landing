# Earnit guides

Mode: read. Primary targets: `content/guides/`, `content/guides.json`, `scripts/build.mjs`, `assets/site.css`, and shared navigation in `assets/site.js`. Built output: `/guides/`, `/es/guides/`, and the walking/Instagram article pairs beneath those routes in `public/`.

Extends the established forest/cobalt world in DESIGN.md. No new visual identity. Instrument Serif carries titles; Figtree carries explanations, metadata, navigation and controls. Flat rows and thin dividers organize the index; article measure and a desktop contents rail organize reading. A native contents disclosure replaces the rail on smaller viewports.

Reader path: question in the title → direct answer → sourced explanation and setup → contextual product link → closing App Store action → related guide. Readers can follow the built-in iPhone instructions without downloading Earnit.

Content is rendered as complete HTML in English and Spanish, including metadata. EN/ES anchors lead to the reciprocal localized index or article, with `aria-current=page` identifying the current locale; JavaScript carries the current fragment because article section IDs match between locales. Language comes from the URL without automatic browser-language rewriting or stored preference. The source screenshot is the supplied App Store image, converted to WebP and captioned as an example. Illustrative exchange rates remain qualified. No invented ratings, testimonials, prices, or claimed outcomes.

The index and articles use the homepage's header, footer, visible focus, reduced-motion treatment, and brand palette. The index gives each guide a wide editorial row; articles have a 720px main column and a 240px sticky contents rail on desktop. At 900px the rail becomes a native disclosure. At 760px the header, type and spacing adapt to a single reading column.

Verification: static link/fragment and locale checks, structured-data parsing, acquisition-event privacy tests, and visual checks on desktop and mobile. No comp or replacement visual world was requested; the approved SEO plan supplies the structure.
