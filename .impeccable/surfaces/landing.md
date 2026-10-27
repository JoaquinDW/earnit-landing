# Earnit landing

Mode: persuade.

## Scope and authority

The final visual authority is `.impeccable/mocks/approved-vibrant-friends.png`, approved by the user on 2026-10-26 and requested for implementation in code. The homepage is a generated static surface at `/` and `/es/`. Edit `src/home.html`, localized `content/home.json`, homepage-only `assets/home.css`, and `assets/home.js`; `scripts/build.mjs` generates `public/index.html` and `public/es/index.html`. Use the repository's `npm run build`, `npm run check`, and `npm test` validation commands. Root legacy HTML is not the homepage source of truth.

`assets/site.css` remains the shared editorial/reader baseline, inherited unchanged by guide pages. `assets/site.js` handles shared navigation. Only homepages load `assets/home.css`. Root `DESIGN.md` owns visual primitives; `.impeccable/design.json` carries extensions and component previews. Product facts remain in `PRODUCT.md`.

## Visitor path

Sticky navigation → large left-hand proposition, App Store badge and optional desktop QR → Progress / Today / Friends trio at right → immediate sage four-benefit strip → compact three-step explanation and interactive exchange example → Friends feature with example squad → rationale → Apple Health/Screen Time explanation → native FAQ → locale guide links → image-backed acquisition → guides/legal/support footer.

All acquisition and QR links target `https://apps.apple.com/app/id6804905841`. Compatibility is iPhone with iOS 18 or later; current pricing belongs to the App Store. Existing privacy, terms, and support paths stay available.

## Approved composition

The hero and closing band use `assets/earnit-waves.webp`, an independent abstract matte landscape plate with sculpted sage/forest/cobalt waves. The same plate appears inside the devices. There are no botanical elements or background video. Typography, chart bars, app icons, balance, Friends rows, and controls are HTML/SVG rather than flattened art.

The hero is capped at 1440px with 56px desktop gutters; columns are `.8fr / 1.2fr`, gap 18px, and vertical padding 26px/16px. The copy rises 20px and the hero headline is `clamp(76px,8.3vw,132px)`. Instrument Serif and Figtree are user-pinned. The sage benefit strip touches the hero and contains four items: Move more, Earn time, Unlock your apps, Move together.

Base devices are 310 × 640px, with a 47px shell radius and 38px screen radius. The trio is 662px high; Today starts central at scale 1, side phones at .9 scale, 54px drop, and ±9° tilt. Base spread is 270px. The final desktop readability adjustment applies above 760px: all phone centers sit at `calc(50% - 12px)` and Friends uses `calc(var(--spread) + 32px)`, including the displaced Today phone when Friends is selected. Preserve that adjustment so the Friends title and rows remain exposed.

At 1700px and above, gap becomes 40px, hero padding 40px/24px, and spread 284px. At 1320px and below (desktop), trio height is 594px, spread 242px, center/side scales .9/.81. At 1100px and below (desktop), gutters are 36px, trio height 526px, spread 205px, scales .78/.69. At 900px and below (desktop), height is 478px, spread 178px, scales .69/.59.

At 760px and below, hero copy stacks first; hero padding is 36px/20px, copy gutters 24px, and the desktop QR disclosure is hidden. The trio stays visible: height 562px, spread 142px, scales .84/.7, side drop 60px. At 380px and below, copy gutters are 20px, trio height 528px, spread 122px, scales .79/.64, side drop 62px. The benefits become two columns. Lower homepage sections tighten to 62px vertical padding (86px desktop); closing acquisition uses 60px (74px desktop). Friends stacks with a 38px gap. Guide rows, rationale, privacy and FAQ retain the shared reading structure with homepage spacing adjustments.

## Preview and earning controls

The trio's semantic order is Progress, Friends, Today in source markup, while its visible default arrangement is Progress / Today / Friends. Native buttons below the phones read Progress / Today / Friends. `data-preview="home"` selects Today by default. Selecting a button updates the figure's `data-preview` and the group's `aria-pressed` states, bringing the corresponding device centrally forward. No automatic rotation occurs. Hardware transforms transition over .65s and stop under reduced motion.

Progress shows a weekly chart and an illustrative steps/earned-minutes ledger. Today contains the balance, selected apps, and session states. Friends contains Ana's nudge, the Park crew weekly active-day squad, and a friend's step progress, following the user-supplied Friends reference. Example names, numbers, charts, and standings are explicitly labeled illustrative. In-device tabs, add-friend symbol, Walk/Nudge shapes, period labels, and goal celebrations are visual content; they do not send real nudges or invoke app actions.

Walk / Earn / Unlock controls live in the lower exchange demonstration. Initial Earn shows 2,000 steps, 10 available minutes, and ready apps. Walk shows 800 steps, 0 minutes, and locked apps; Unlock maps to `use` and shows 5 session minutes. Changes update Today's `data-stage`, localized labels, lower numeric result, selected `aria-pressed`, and polite live note. There is no timer or automatic stage progression. The 1,000 steps → 5 minutes exchange is labeled an example with an in-app configurable rate.

## Routes, navigation, and preservation

English and Spanish are complete generated HTML pages with localized visible copy, metadata, accessible labels, and illustration text. EN/ES are reciprocal anchors with `aria-current="page"`; shared JavaScript carries the active fragment. Language comes from the URL without a browser-language redirect or saved preference. Guides link to the matching locale's index. Preserve the existing canonical/hreflang, social metadata, structured-data, sitemap/crawler, internal-link, and analytics generation contracts.

The mobile menu progressively enhances native links: without JavaScript the links remain visible and the toggle stays hidden. With JavaScript it uses `hidden`, `aria-expanded`, and localized toggle labels. Link selection, outside click, Escape, and resizing above the breakpoint close it; Escape returns focus to the toggle. Native FAQ and desktop QR disclosures work without JavaScript. FAQ items may remain open independently. The skip link appears on focus; shared focus outlines are blue, 2px with a 5px offset. Reduced motion disables animation/transitions and smooth scrolling.

## Content guardrails

Keep the walking-led explanation, explicit example-rate qualification, illustration labels, and working download/legal/support/guide routes. Friends examples describe nudges, squads, progress, and celebrations without inferring backend data-sharing guarantees. Use `PRODUCT.md` for facts; do not reintroduce ratings, testimonials, stale fixed prices, foliage, or cinematic video. This document records the final approved implementation and adds no workflow preferences or new audit requirements.
