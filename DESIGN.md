---
name: Earnit
description: Forest and cobalt identity with an abstract sage landscape and dimensional app previews on the homepage.
colors:
  ground: "#070e0d"
  surface: "#0c1814"
  panel: "#12221b"
  text: "#ecf3ee"
  soft: "#b9ccc2"
  muted: "#96ada0"
  accent: "#2e5ce6"
  accent-hover: "#426cf0"
  blue: "#8caaff"
  moss: "#a4c78e"
  line: "#293930"
  black: "#000"
  white: "#fff"
  store-border: "#9aa69f"
  download-hover: "#cdded2"
  demo-selected: "#1c2c24"
  sage: "#bedfa6"
  ink: "#12271b"
  home-header: "#07110d"
  home-scene: "#07150e"
  home-preview: "#08160ee0"
  home-preview-text: "#c0d3c3"
  home-preview-selected-text: "#152d1d"
  home-preview-hover: "#29432f"
  home-preview-selected-hover: "#d1eabc"
  home-crew: "#07130d"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(70px,7.4vw,96px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-.025em"
  home-display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(76px,8.3vw,132px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-.025em"
  home-lead:
    fontFamily: "Figtree, sans-serif"
    fontSize: "clamp(18px,1.6vw,22px)"
    fontWeight: 400
    lineHeight: 1.5
  home-benefit:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-.02em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(44px,4.8vw,64px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-.02em"
  title:
    fontFamily: "Figtree, sans-serif"
    fontSize: "21px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.015em"
  body:
    fontFamily: "Figtree, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Figtree, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.65
  navigation:
    fontFamily: "Figtree, sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  brand:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-.035em"
rounded:
  control: "8px"
  demo-control: "7px"
  store-badge: "10px"
  exchange: "12px"
  phone: "46px"
  phone-screen: "37px"
  circle: "50%"
  pill: "999px"
  home-phone: "47px"
  home-phone-screen: "38px"
  home-callout: "16px"
  home-crew: "16px"
spacing:
  icon-gap: "10px"
  control-gap: "12px"
  compact-gap: "16px"
  download-gap: "18px"
  block-gap: "24px"
  copy-gap: "28px"
  grid-gap: "40px"
  hero-gap: "48px"
  section-gap: "64px"
  section-padding: "112px"
  home-section-padding: "86px"
  home-mobile-section-padding: "62px"
  home-hero-gap: "18px"
  home-friends-gap: "80px"
components:
  home-navigation-download:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    typography: "{typography.navigation}"
  home-navigation-download-hover:
    backgroundColor: "{colors.accent-hover}"
  home-preview-control:
    backgroundColor: "transparent"
    textColor: "{colors.home-preview-text}"
    rounded: "{rounded.pill}"
    padding: "7px 17px"
    height: "40px"
  home-preview-control-selected:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.home-preview-selected-text}"
  home-crew:
    backgroundColor: "{colors.home-crew}"
    rounded: "{rounded.home-crew}"
    padding: "30px"
  navigation-download:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
    typography: "{typography.navigation}"
  navigation-download-hover:
    backgroundColor: "{colors.download-hover}"
  store-badge:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.store-badge}"
    padding: "9px 17px 10px 15px"
  demo-control:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.demo-control}"
    padding: "7px 12px"
  demo-control-selected:
    backgroundColor: "{colors.demo-selected}"
    textColor: "{colors.text}"
  exchange:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.exchange}"
    padding: "22px 26px"
  faq-summary:
    textColor: "{colors.text}"
    padding: "22px 36px 22px 0"
---

# Design System: Earnit

## Overview

**Creative North Star: "Forest and cobalt"**

Earnit combines nearly black forest surfaces, pale leaf text, cobalt actions, and expressive serif headlines. The approved homepage adds a sculpted sage/forest/cobalt landscape, three dimensional iPhones, and a light sage benefit strip. Its visual authority is `.impeccable/mocks/approved-vibrant-friends.png`, approved by the user on 2026-10-26.

This is a generated static site. Homepage sources are `src/home.html`, `content/home.json`, `assets/home.css`, and `assets/home.js`; `scripts/build.mjs` produces `public/index.html` and `public/es/index.html`. Shared `assets/site.css` remains the editorial baseline for guides and reading pages. Only the homepage loads `assets/home.css`. The baseline tokens remain above alongside explicitly prefixed homepage roles; a homepage override is not an instruction to restyle editorial pages.

**Key Characteristics:**

- Forest tones, cobalt actions, and sage emphasis.
- User-pinned Instrument Serif and Figtree typography rendered as real text.
- An abstract, non-botanical image plate with semantic HTML app previews.
- Compact lower sections, fine dividers, and selective dimensional depth.

## Colors

The frontmatter records source CSS values. Shared primary colors are cobalt for actions and periwinkle blue for links and keyboard focus. Moss supports functional icons. Forest ground, surface, panel, line, pale text, soft text, and muted text retain their shared meanings.

On the homepage, **sage** fills the four-benefit band, selected preview control, and earned-time callout; it also colors italic headline emphasis. **Ink** is the dark benefit-band reading color. The sticky header uses home-header; the hero's underlying fill is home-scene. The homepage navigation download is cobalt with white text and uses accent-hover on hover. Editorial navigation keeps the pale filled download and download-hover background from `site.css`.

Black, white, and store-border remain the App Store badge palette. Homepage preview controls and the squad board use their dedicated home-prefixed surface roles. The image plate contributes visual color variation; it does not replace the CSS text or interaction tokens.

## Typography

**Display Font:** Instrument Serif, Georgia, serif; regular and italic. **Body Font:** Figtree, sans-serif; 400, 500, and 600. This source pairing is user-pinned.

The homepage hero uses home-display, with tight tracking and sage italic emphasis. Its lead uses home-lead with a 450px maximum measure. On widths up to 1100px and above 760px, the hero uses `clamp(68px,7vw,78px)` (Spanish: 72px); up to 900px it is 67px. Mobile uses `clamp(61px,12.5vw,84px)`, then 61px at 380px and below. The homepage benefit labels use home-benefit, adjusted at the recorded breakpoints.

Shared headings retain `clamp(44px,4.8vw,64px)` and a 1.05 line height; body text is 17px/1.6. Step titles are 21px/1.3 and medium weight. Navigation is 14px; language anchors are 12px and semibold. Brand typography is 36px/1 on desktop, 32px on mobile, then 29px at the narrow breakpoint. The homepage Friends headline has its own `clamp(44px,4.5vw,62px)` scale.

Small labels inside the devices reproduce a scaled illustrative app interface; they do not define website reading sizes. Major headings use balanced wrapping and paragraphs use pretty wrapping.

## Layout

Shared editorial containers remain capped at 1160px with 48px desktop gutters, 24px mobile gutters, and 18px narrow gutters. Homepage hero/navigation/benefits use a 1440px cap and 56px desktop gutters. The hero uses `.8fr / 1.2fr` columns, an 18px gap, and 26px/16px vertical padding; its copy rises 20px. Detailed device geometry and adaptive layout live in `.impeccable/surfaces/landing.md`.

The homepage adds breakpoints at 1700, 1320, 1100, and 900px, alongside the shared 1450, 1050, 760, and 380px rules. Below 761px, hero copy leads a compact three-phone arrangement and the benefit strip changes from four columns to two. Standard homepage sections use 86px vertical padding, becoming 62px on mobile. The closing image band uses 74px, becoming 60px. Friends changes from two columns with an 80px gap to a single column with a 38px gap.

Guide links, legal/support destinations, English and Spanish routes, metadata, structured data, crawler outputs, and the existing analytics contract remain part of the generated site. Redesign work must preserve those integrations.

## Elevation & Depth

The homepage hero, device screens, and closing acquisition band share `assets/earnit-waves.webp`: abstract matte waves with sage/forest/cobalt color, no foliage. Dark gradients preserve text contrast. The artwork is an independent background plate; phones, chart, squad, and text are semantic HTML rather than one flattened composition.

Depth is concentrated in the overlapping phones, tilted earned-time callout, and slightly rotated squad board. Other sections use tonal backgrounds and thin dividers. Homepage phone shadow is `0 22px 30px -14px #000c`; callout shadow is `0 14px 25px -16px #000a`; squad-board shadow is `0 24px 40px -22px #000b`. The baseline phone shadow remains `0 28px 64px -20px #000` in shared CSS.

Homepage phones have no entrance animation. Preview selection transitions transforms over `.65s` with `cubic-bezier(.16,1,.3,1)`; shared controls use `.2s` transitions. Reduced motion disables animations/transitions and smooth scrolling.

## Shapes

The homepage acquisition action and preview selector use pill rounding. The App Store badge keeps its 10px radius; the joined exchange/demo container uses 12px outer rounding. Callout and squad board use 16px. Homepage phone shells use 47px and screens 38px, with a 2px hardware border. Circular icon frames and avatars support the benefit and Friends illustrations. Shared editorial controls retain their existing 8px corners.

## Components

### Download actions

The sticky homepage header has a cobalt pill action with a 44px minimum height. The hero and closing section use the shared black App Store badge with white Apple mark and two-line label. The badge is at least 62px high on desktop and 58px in the mobile hero. A native desktop `details` disclosure opens a QR panel; it is hidden at 760px and below. Acquisition links target `https://apps.apple.com/app/id6804905841`.

### Navigation and language

EN/ES are real reciprocal locale anchors with `aria-current="page"`, translated accessible names, and a blue underline for the active page. Shared JavaScript carries the section fragment when switching locales. The URL determines language. The mobile menu uses a native button, `hidden`, and `aria-expanded`; shared behavior handles Escape, outside clicks, selected links, and resizing. Native navigation remains available without JavaScript.

### Semantic three-phone showcase

Progress, Today, and Friends are separate HTML devices. Progress contains a weekly chart and earned-minute ledger; Today shows the interactive balance/session example; Friends shows a nudge, weekly squad standings, and friend progress. Native buttons below the trio use `aria-pressed` and bring the selected preview forward through `data-preview`. The default is Today (`home`). Device tabs, nudge-shaped elements, and in-screen actions are illustrative; they do not send messages or navigate the real app.

### Benefit strip and Friends board

The light sage strip follows the hero immediately: Move more, Earn time, Unlock your apps, Move together. Circular line icons accompany serif labels. The lower Friends section pairs concise squad/nudge copy with a readable example board. Names, active days, step counts, and goal celebrations are illustrative data, labeled as such.

### Steps-to-minutes example

The three-step explanation ends in a joined exchange band and Walk / Earn / Unlock button group. These controls use `aria-pressed`, update Today, update the lower number, and announce a localized note through a polite live region. Earn is the initial state: 2,000 steps and 10 minutes. Walk shows 800 steps and 0 minutes; Unlock (`use`) shows a 5-minute session. There is no timer or automatic progression. The 1,000-steps/5-minutes rate is explicitly an example configurable in the app.

### FAQ and supporting illustrations

Native `details`/`summary` FAQ items retain dividers, plus/minus affordances, keyboard behavior, and independent open states. Shared line SVGs use rounded ends and joins, commonly 24px with a 1.6 stroke. The privacy medallion remains a decorative line illustration. No website form inputs are implemented.

## Do's and Don'ts

### Do:

- **Do** preserve the approved abstract landscape, semantic trio, and immediate sage benefit strip on the homepage.
- **Do** retain Instrument Serif/Figtree and the shared editorial baseline.
- **Do** keep visible keyboard focus, reduced-motion support, and localized example labels.
- **Do** preserve generated locale routes, acquisition links, guides, SEO, and analytics behavior.

### Don't:

- **Don't** add botanical imagery or a cinematic background video to this approved homepage.
- **Don't** flatten app previews into an image or imply they are exact production screenshots.
- **Don't** present example people/numbers as customer evidence or send real social nudges from illustrations.
- **Don't** invent ratings, testimonials, fixed pricing, or unsupported Friends privacy guarantees.
