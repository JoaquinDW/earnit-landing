---
name: Earnit
description: Forest-dark iPhone app identity with cobalt actions and expressive serif headlines.
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
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(70px,7.4vw,96px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-.025em"
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
components:
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

Earnit pairs a nearly black forest ground with cobalt actions, pale leaf text, and serif headlines. Instrument Serif supplies the wordmark and expressive statements; Figtree keeps explanations and controls direct. The implementation uses open sections, fine dividers, and a single dimensional product device rather than pervasive floating cards.

This captures the implemented web identity. Page composition and acquisition mechanics live in `.impeccable/surfaces/landing.md`; the compact type within the phone belongs to its illustrative screen, not the website reading scale.

**Key Characteristics:**
- Forest tonal surfaces and pale leaf typography.
- Cobalt actions, blue emphasis, and moss functional icons.
- Serif statements with restrained sans-serif controls.
- Flat editorial sections with a physical phone silhouette.

## Colors

The palette reads as a quiet forest at night, interrupted by clear blue actions and small moss signals. The frontmatter preserves the source values and names.

### Primary

- **Cobalt:** the illustrated earning action, brand dot, and text selection.
- **Periwinkle blue:** emphasized hero and closing headline phrases, text links, and visible focus outlines.
- **Cobalt hover:** declared in the source but currently unused; it is not the implemented download hover treatment.

### Secondary

- **Moss:** functional line icons and earned-time signals.

### Neutral

- **Forest ground:** body and opaque sticky header.
- **Forest surface:** alternate section bands and the exchange example.
- **Forest panel:** declared in the source but currently unused.
- **Pale leaf text:** primary reading color and the navigation download fill.
- **Soft leaf text:** descriptive copy and secondary navigation.
- **Muted sage text:** supporting metadata and unselected controls.
- **Forest divider:** section, list, and control boundaries.
- **Black / white / store border:** the App Store badge and desktop QR treatment.
- **Download hover / demo selected:** the observed navigation hover fill and chosen demo-stage fill.

## Typography

**Display Font:** Instrument Serif, with Georgia and serif fallback. Regular and italic are loaded.

**Body Font:** Figtree, with sans-serif fallback. The loaded weights are regular, medium, and semibold (400, 500, 600).

Large statements use tightly set serif type with italic color emphasis. Supporting copy stays in Figtree; interface labels use medium or semibold only where hierarchy requires it. Major headlines use balanced wrapping and paragraphs use pretty wrapping.

### Hierarchy

- **Display:** the frontmatter display role is the desktop hero. At medium widths it becomes a fixed (78px); mobile uses (clamp(62px,12vw,84px)); the smallest breakpoint uses (61px).
- **Headline:** section headings use the headline role; mobile uses (clamp(42px,8vw,56px)). The closing statement has a separate larger scale (clamp(64px,7vw,88px)), becoming (clamp(58px,11vw,76px)) on mobile.
- **Title:** step titles use the title role. Benefit titles are smaller (18px).
- **Body:** the body role is the default; supporting section copy commonly uses (15px), while the hero lead uses the lead role with a (440px) desktop measure.
- **Navigation:** links and the navigation download use the navigation role; the download is semibold (600). Language labels are (12px, 600), with an underline for the selected language.
- **Supporting labels:** illustration caption, copyright, privacy facts, compatibility copy, and mobile product facts are (12px). Compact labels within the illustrated device retain their smaller product-screen scale.
- **Brand:** the brand role is reduced to (32px) on mobile, then (29px) at the narrowest breakpoint. The footer wordmark is (32px).

## Layout

The centered content container is capped at (1160px), with (48px) desktop side gutters. At the mobile breakpoint the gutters become (24px), then (18px) at the narrowest breakpoint. Wide compositions use unequal columns rather than a uniform card grid. Standard sections use generous vertical breathing room, then tighten to (72px) on mobile.

The actual breakpoints are (1450px minimum), (1050px maximum), (760px maximum), and (380px maximum). On mobile, content stacks in reading order, navigation links move into a disclosure menu, and the direct download remains visible. The landing surface brief records exact hero and device dimensions.

## Elevation & Depth

The website is flat by default: forest tonal bands, fine borders, and spacing separate information. The single illustrated device supplies the physical depth. Its screen uses an existing landscape photograph behind a dark gradient; the page background remains a solid forest ground.

### Shadow Vocabulary

- **Phone depth** (`0 28px 64px -20px #000`): the implemented device shadow. There is no general-purpose card shadow.

The device arrives once from (18px) below over (1s), using the source easing curve. Controls use short color/background transitions (0.2s). Reduced motion disables transitions and animation and changes smooth scrolling to automatic scrolling.

## Shapes

Controls have modest rounded corners; store badges and the exchange example use slightly broader rounding. Device and screen radii are much larger to establish a recognizable iPhone silhouette. Dividers are thin (1px); the phone has a physical border (2px). Circular privacy rings frame a small line-drawn device. Rounded pill shapes occur inside the illustrative phone, not as a universal website button style.

## Components

### Download actions

The navigation download is a pale filled rectangle with dark text, a compact arrow, and a minimum height (44px). Its hover fill is the extracted download-hover token. The App Store badge is black with a pale border, a white Apple mark, and two lines of text; it has a minimum height (62px), changes to a dark forest fill on hover, and retains the common focus outline.

### Navigation and language

The header stays at the top with an opaque ground fill and a bottom divider. Desktop navigation uses muted links that brighten and underline on hover. EN and ES are real buttons; `aria-pressed` and a blue-underlined label communicate selection. A bordered menu button appears on mobile; expanded links are placed beneath the header.

### Demonstration controls

Walk, Earn, and Unlock are a small button group with (44px) minimum targets. The selected button uses the extracted dark selected fill and primary text. Hover uses the surface fill and primary text. The shared focus outline is blue (2px), offset (5px). The phone's action-shaped element is an illustration, not a clickable download control.

### Exchange container

A flat forest-surface band contains the steps-to-minutes example. It has the extracted exchange radius and padding, becoming a centered vertical arrangement on mobile. It explicitly labels its rate as an example.

### FAQ disclosure

Native `details` and `summary` elements form the FAQ. Thin dividers separate questions, a plus becomes a minus when open, question hover turns blue, and supporting text remains soft leaf. Questions retain native keyboard and no-JavaScript behavior. Multiple answers can stay open together.

### Line illustration

Functional SVG icons share rounded stroke ends and joins, commonly at a (24px) base size and (1.6) stroke width. The privacy medallion uses concentric divider-colored circles and a small moss device motif. There are no website form inputs in this surface.

## Do's and Don'ts

### Do:
- **Do** use the existing forest, cobalt, blue, and moss roles.
- **Do** reserve Instrument Serif for the brand, major headlines, and illustrated balance numerals.
- **Do** preserve visible keyboard focus and reduced-motion behavior.
- **Do** keep instructional illustrations distinguishable from real product evidence.

### Don't:
- **Don't** replace the established forest and cobalt identity with the reference site's purple palette.
- **Don't** use a cinematic background video on this landing.
- **Don't** turn the illustrated screen into evidence of an exact production screenshot.
- **Don't** invent ratings, customer testimonials, or fixed pricing.
