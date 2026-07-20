---
name: Anggie Irawan — A Monograph
description: An editorial monograph portfolio — typography-forward, grain-textured, restrained use of ink on paper-like canvas
colors:
  bg: "#F4F1EA"
  surface: "#F4F1EA"
  ink: "#111111"
  ink-muted: "#444444"
  ink-faint: "#777777"
  accent: "#111111"
  accent-hover: "#000000"
  border: "rgba(0, 0, 0, 0.12)"
  border-strong: "rgba(0, 0, 0, 0.25)"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontWeight: 800
    lineHeight: 1.05–1.1
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.95rem"
    lineHeight: 1.6
  mono:
    fontFamily: "Space Mono, Courier New, monospace"
    fontSize: "0.6–0.7rem"
    letterSpacing: "0.08–0.12em"
    textTransform: "uppercase"
spacing:
  section-pad-y: "5rem (mobile) / 6rem (desktop)"
  section-pad-x: "1.5rem (mobile) / 5rem (desktop) / 8rem (wide)"
  content-max: "72ch"
---

# Design System: Anggie Irawan — A Monograph

## 1. Overview

**Creative North Star: "The Printed Monograph"**

A light, textured editorial surface — part art book, part lab notebook. The page reads like a well-printed monograph on uncoated paper: cream body, high-contrast ink, strong serif display type, and a subtle grain texture that gives the digital surface a tactile feel.

The aesthetic rejects the typical dark-mode dev portfolio, the corporate SaaS landing, and the "creative agency" hero. Instead it leans into print-era restraint — typography does the work, spacing creates the rhythm, and the grain overlay is the only texture.

**Key Characteristics:**
- Cream paper-like background with subtle grain texture
- High-contrast black ink (#111) for body and accent
- Monochrome palette — all emphasis comes from weight, size, and spacing, not color
- Editorial serif display (Playfair Display 800) paired with utilitarian system-ui body and mono labels (Space Mono)
- Dropcap first-letter treatment on project descriptions
- Border-first structural model — all depth via hairline borders and background tints, no shadows
- Fixed grain overlay for tactile feel, positioned beneath the navigation stacking context

## 2. Colors

A restrained monochrome palette — true monochrome, not warm-tinted neutrals. The cream background provides warmth; everything else is black, near-black, or transparent.

### Primary
- **Paper** (#F4F1EA): Body background. A warm off-white, the uncoated page. All surfaces sit on this color.
- **Ink** (#111111): Primary text, display headings, accent (buttons, borders, interactive elements), icons. The single voice of the interface.
- **Ink Muted** (#444444): Secondary/descriptive text, project descriptions, body copy.
- **Ink Faint** (#777777): Tertiary text, metadata, mono labels, footer text, subtle labels.

### Structural
- **Border** (rgba(0,0,0,0.12)): Hairlines — section dividers, card outlines, light structural separators.
- **Border Strong** (rgba(0,0,0,0.25)): Emphasized borders — section meta underlines, visual frame edges, strong structural lines.

### Named Rules

**The Monochrome Rule.** Ink is the only accent. Black (#111) is used for buttons, borders, interactive elements, and display headings. There is no secondary accent color — visual hierarchy comes from weight, size, spacing, and case.

**The Paper Constancy Rule.** All surfaces share the same background (#F4F1EA). Depth is communicated through borders, spacing, and the grain overlay, not through color shifts. Cards use the same background as the page, differentiated by border and padding.

## 3. Typography

**Display Font:** Playfair Display (with Georgia / Times New Roman fallback)
**Body Font:** System UI stack (with Segoe UI / Roboto fallback)
**Mono Label Font:** Space Mono (with Courier New fallback)

**Character:** The pair is deliberate contrast — a serif voice for headings and a neutral sans body for reading. Playfair Display at 800 weight carries the gravitas of a printed monograph; the system-ui body stays out of the way for reading comfort. Space Mono anchors structural navigation and metadata in a technical, lab-notebook register.

### Hierarchy
- **Display Hero** (800, clamp(2.8rem, 12vw, 12rem), 1.1): Hero name treatment. The largest text on the page; appears once. Uppercase in source.
- **Section Title Large** (800, clamp(2rem, 7vw, 6rem), 1.05): Project names and major section titles.
- **Section Title Medium** (800, clamp(1.5rem, 5vw, 3rem), 1.05): Section headings within content.
- **Body** (400, 0.95rem, 1.7): All paragraph text. Max line length 72ch.
- **Body Small** (400, 0.85rem, 1.6): Supporting text, hero description, capability descriptions.
- **Mono Label** (400, 0.6–0.7rem, letter-spacing 0.08–0.12em): Navigation items, section meta, project metadata, tags, status indicators, buttons. Always uppercase.
- **Mono Small** (400, 0.5–0.55rem, letter-spacing 0.2em): Footer notes, colophon, hero scroll indicator. Always uppercase.

### Named Rules

**The 2+1 Rule.** Two font families are active for content (Playfair Display + system-ui), plus one outlier (Space Mono) for structural labels only. Playfair Display appears only on headings and the dropcap initial — never on body text. Space Mono appears only on nav, meta, tags, status, buttons, footer — never in prose.

**The Upright Display Rule.** All headings and display type are roman (`font-style: normal`). Italic appears only as body-copy emphasis in running paragraphs (the manifesto `em`, the tagline, the lesson blockout).

**The Dropcap Rule.** Project descriptions use a 3.5rem Playfair Display 800 dropcap for the first letter — a deliberate print-era flourish. The dropcap is the only decorated element per project entry.

## 4. Elevation

Flat. No shadows. All depth is expressed through 1px borders at two strengths (standard / strong) and background tint shifts on interactive elements. The grain overlay is a fixed texture, not a shadow.

### Interaction Feedback
- **Button hover:** Ink background fills the button, text inverts to Paper. No lift, no shadow.
- **Nav link hover:** Color shifts from Faint to Ink, subtle background tint (rgba(0,0,0,0.04)).
- **Active/pressed:** Opacity reduces to 0.8.
- **Focus-visible:** 2px solid Ink outline with 2px offset.

### Named Rules

**The Border-First Rule.** Every structural grouping — sections, cards, project entries, visual frames — uses 1px borders rather than background shifts or shadows. Sections are separated by bottom borders; cards use full perimeters; visual frames use strong borders.

## 5. Components

### Navigation
- **Desktop:** Fixed top bar (56px), backdrop-filter blur, wordmark left + inline links right. Wordmark is mono uppercase. Links are mono uppercase in Faint with hover → Ink color shift.
- **Mobile:** Same bar + hamburger toggle (44×44px). Links collapse into a full-width column drawer with slide transition. Active state via `.nav-active` class with background tint.
- **Skip link:** Hidden off-canvas, slides in on focus. Keyboard-only bypass.

### Buttons
- **Shape:** Sharp corners (2px radius). No rounding — consistent with the monograph's structured grid.
- **Structure:** 2px solid Ink border, mono uppercase text, 44px min-height.
- **Primary:** Ink fill with Paper text. Hover: deeper fill (Hover #000).
- **Secondary:** Transparent fill with Ink text. Hover: Ink fill with Paper text.
- **Copy Button:** Ghost style, 1px border, mono uppercase. On click shows Copied state.

### Cards (Capability cards, Project highlights)
- **Style:** Full 1px border (Border Strong), same background as page.
- **Padding:** 1.5rem.
- **Nested cards:** None. Capability cards and highlight tags are flat, not nested.
- **Project highlights:** Inline mono tags with border, small (0.6rem).

### Project Entries
- **Signature Component.** Two-column grid on desktop (editorial copy + visual frame), single column on mobile.
- **Status badge:** Inline mono tag with dot indicator and border.
- **Dropcap:** First letter of description rendered at 3.5rem display weight.
- **Lesson blockout:** Top-accented bar (3px Ink) with italic text and tinted background.
- **Highlights:** Flex-wrap row of mono tags with border.

### Visual Frames
- **Aspect ratio:** 4/3.
- **Border:** 1px Border Strong.
- **Background:** Slightly darker cream (#E8E3D6).
- **Images:** Cover fit, 20% grayscale + 110% contrast for a unified archival look.
- **Fallback:** Hidden image → centered mono placeholder text.

## 6. Typographic Details

### Dropcap
The `.dropcap::first-letter` is Playfair Display 800 at 3.5rem, floated left with 0.8 line-height and 0.4rem padding. Applied to the first paragraph of each project description. This is the single decorative element per project — no other ornamentation competes.

### Section Meta
Each section begins with a thin row of mono metadata: a left-hand label (numbered section, e.g. "01 / Selected Work") and a right-hand contextual tag (e.g. "Build Log"). The row is separated from content by a 1px Border Strong rule.

### Lesson Blockouts
Blockquote-style callouts with italic body text, 3px top Ink accent bar, and tinted background (rgba(0,0,0,0.03)). Used once per project entry.

### Scroll Reveal
Sections fade in with a 30px upward slide on scroll (IntersectionObserver at 15% threshold). Transition: 0.6s ease-out for both opacity and transform. Respects `prefers-reduced-motion`.

## 7. Responsive Behavior

### Breakpoints
- **Mobile:** < 640px — single column layouts, left-aligned hero text
- **Tablet:** 640–767px — capabilities and process grids activate
- **Desktop:** 768px+ — two-column project grids, larger spacing
- **Wide:** 1200px+ — increased horizontal padding

### Mobile Nav
- Hamburger toggle (44×44px) with animated bar-to-X transition
- Links collapse into vertical stack with max-height animation
- Body scroll locked (position: fixed) when menu open — iOS-safe
- 44px min-height on all touch targets

### Touch Targets
All interactive elements (buttons, links, nav items, copy button) meet 44×44px minimum touch target size.

## 8. Accessibility

- Skip link with keyboard-only reveal
- ARIA labels on nav toggle (expanded state), project links, copy button
- Focus-visible outlines (2px Ink, 2px offset) on all interactive elements
- Reduced-motion media query disables all animations and transitions
- Screen-reader-only headings for sections with visual meta-only labels
- `-webkit-tap-highlight-color` set to subtle black

## 9. Do's and Don'ts

### Do:
- **Do** use Ink (#111) as the single accent for all interactive elements — buttons, links, borders, focus rings. Restraint is the brand.
- **Do** reserve Playfair Display for headings and the dropcap initial only — never use it for body text.
- **Do** keep Space Mono confined to structural/navigation labels — nav, meta, tags, status, buttons, footer text.
- **Do** use the grain overlay as the only texture — it is the paper surface, not an effect.
- **Do** maintain high contrast: Ink (#111) on Paper (#F4F1EA) exceeds 14:1 for body text.
- **Do** left-align hero text on mobile to break symmetry and create visual tension.

### Don't:
- **Don't** introduce a second accent color — the palette is intentionally monochrome. All emphasis comes from weight, size, spacing, and case.
- **Don't** use gradient text, side-stripe borders, or glassmorphism — these are anti-patterns for the monograph aesthetic.
- **Don't** add shadows to cards, buttons, or containers. The system is border-first.
- **Don't** wrap nav links or CTA buttons on two lines at any viewport.
- **Don't** use italic on display/heading type. Headings are roman; italic lives only in body-copy emphasis.
- **Don't** nest cards — the flat depth model doesn't support it.

## 10. Anti-references

- Dark-mode dev portfolio with GitHub contribution graphs, star counts, tech-stack laundry lists
- Corporate SaaS landing page with hero-metric gradients, identical card grids, and accent color fills
- "Creative agency" portfolio with oversized hero text, stock photography, and gradient accents
- Anything that uses color as the primary differentiator — this system differentiates through typography and space
