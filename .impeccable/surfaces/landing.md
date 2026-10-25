# Earnit landing

Mode: persuade.

## Scope and authority

Implemented surface: `index.html`, the English/Spanish static marketing homepage. Visual tokens are in root `DESIGN.md`; extensions and component previews are in `.impeccable/design.json`. The user's approved direction is a visible iPhone, direct proposition, App Store acquisition, and an illustrative interface inspired by Vaultaire's clarity. Earnit's forest/cobalt identity and serif/sans pairing remain its own.

## Visitor path

Sticky navigation → proposition with App Store badge and desktop QR → illustrative phone with Walk / Earn / Unlock controls → iPhone / Apple Health / Apple Screen Time facts → three-step explanation and labeled example exchange → benefits → privacy → FAQ → closing App Store badge → legal/support footer.

All App Store actions and the QR lead to `https://apps.apple.com/app/id6804905841`. Compatibility is iPhone with iOS 18 or later. Current pricing is delegated to the App Store. Legal/support paths remain `privacy.html`, `terms.html`, and `support/`.

## Composition

Desktop hero: unequal (1.1fr / 1fr) columns, (48px) gap, current vertical padding (56px 48px), and copy bottom padding (18px). At medium width the gap tightens to (24px). At widths at least (1450px), hero vertical padding becomes (76px 60px). The base phone is (290 × 594px), widening to (310 × 634px) at that wide breakpoint.

At (760px) and below, the hero stacks copy before the phone with a (38px) gap and (48px 36px) vertical padding. The phone becomes (276 × 568px); the QR is hidden and the App Store badge stays available. At (380px) and below the hero top padding is (36px) and the phone is (266 × 552px). Desktop header height is (84px); mobile is (72px). Anchor scroll clearance changes from (112px) to (90px).

The three how-it-works columns become a numbered vertical list on mobile. Privacy copy precedes its decorative device illustration on mobile. FAQ remains in normal document flow. No cinematic background video, scroll-jacking, or motion-dependent content is implemented.

## Illustrative phone

The existing `assets/home-evening.jpg` photograph appears only inside the phone, with a dark gradient. The screen is explicitly labeled as an illustrative look inside Earnit. Small labels inside it reproduce a scaled product UI; they do not define the website's reading typography.

Default state is Earn: (10) available minutes, (2,000) steps, and apps ready. Walk shows (0) available minutes, (800) steps, and locked apps; the app icons reduce to opacity (.45). Unlock maps to internal stage `use`: (5) session minutes remain, session copy replaces balance copy, and the illustrated action fill changes to green. Controls update `aria-pressed`, the phone's `data-stage`, text labels, and a polite live note. There is no timer or automatic stage progression. The action and tabs within the phone are illustrative elements.

The exchange (1,000 steps / 5 minutes) is explicitly labeled an example, with a configurable in-app rate. The phone's streak and selected apps are demonstration content, not customer evidence.

## Language and navigation mechanics

English is present in static HTML for no-JavaScript reading. JavaScript initially selects Spanish when the browser language starts with `es`, otherwise English; a valid saved `earnit-language` value takes precedence. EN/ES selection updates the document language/title, visible copy, meta copy, alt text, accessible labels, and current demo state, then persists the preference when local storage is available.

Mobile navigation toggles `hidden`, `aria-expanded`, and its translated label. Selecting a menu link, clicking outside the header, pressing Escape, or returning above the mobile breakpoint closes it. Escape returns focus to the menu button. Native FAQ disclosures operate without JavaScript and allow multiple open answers. A skip link appears on focus; shared blue outlines expose keyboard focus. Reduced-motion settings disable animation/transitions and smooth scrolling.

## Content guardrails

Preserve the illustrative label, example-rate qualification, working acquisition/legal/support paths, and bilingual controls. Use product facts from `PRODUCT.md`; do not reintroduce placeholder ratings, testimonials, stale prices, or a cinematic background video. This surface documents a walking-led narrative rather than expanding the marketing into other earning modes.
