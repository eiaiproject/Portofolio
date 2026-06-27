---
name: Anggie's Build Lab
description: A digital lab notebook and build journal — learn by building with AI
colors:
  bg: "#070A0F"
  surface: "#0D1117"
  surface-raised: "#111827"
  border: "#263241"
  ink: "#E5E7EB"
  muted: "#9CA3AF"
  faint: "#6B7280"
  accent: "#7DD3FC"
  accent-dim: "#164E63"
  accent-muted: "#0E7490"
  warn: "#FBBF24"
  warn-dim: "#78350F"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.05em"
rounded:
  sm: "2px"
spacing:
  section: "6rem"
  card: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-muted}1F"
    textColor: "{colors.accent}"
    border: "1px solid {colors.accent-dim}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.sm}"
    padding: "{spacing.card}"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  nav-item-active:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
---

# Design System: Anggie's Build Lab

## 1. Overview

**Creative North Star: "The Build Journal"**

A dark, structured surface for documenting real experiments — not a showcase reel, but a working notebook. Every section is an entry: the idea, what was built, what broke, what was learned. The aesthetic is restrained and functional: near-black pages, muted structural borders, cyan ink for interactive elements, amber for highlighted lessons.

The system rejects the typical dev portfolio (GitHub contribution graphs, star counts, tech-stack laundry lists) and the corporate SaaS landing page (hero-metric gradients, identical card grids). Instead it leans into documentary honesty — failures are features, process is visible, capability is proven through shipped work.

**Key Characteristics:**
- Near-black body with layered dark surfaces for depth
- Cyan accent used sparingly — interactive elements and status indicators only
- Amber reserved exclusively for lessons learned and callouts
- Monospaced labels for structural/navigation elements
- Flat depth model — borders and background shifts, not shadows

## 2. Colors

A restrained palette anchored by near-black neutrals with a single cyan accent and a purpose-specific amber.

### Primary
- **Lab Cyan** (#7DD3FC): Interactive elements — links, buttons, active indicators, icons. The primary voice of the interface; rare enough to draw attention, consistent enough to signal "this is actionable."
- **Deep Teal** (#164E63): Accent borders, hover states, focus rings. The structural counterpart to Lab Cyan — present but never competing.
- **Muted Teal** (#0E7490): Subtle accent backgrounds — tinted button fills, chip backgrounds at low opacity. Adds warmth to interactive surfaces without overwhelming.

### Secondary
- **Amber Highlight** (#FBBF24): Lessons learned, callout text, warning states. Purpose-specific — never used as a general accent. Its singularity is the point.
- **Deep Amber** (#78350F): Amber borders and structural counterparts. Mirrors the Lab Cyan / Deep Teal relationship.

### Neutral
- **Void** (#070A0F): Body background. Near-black with a cool undertone — the page itself.
- **Surface** (#0D1117): Card and container backgrounds. One step above Void, creating subtle layering.
- **Raised** (#111827): Elevated surfaces — active nav items, header bars, hover states. The top of the neutral stack.
- **Border** (#263241): Structural dividers, card borders, section separators. Visible but never dominant.
- **Ink** (#E5E7EB): Primary text. High contrast against all neutral backgrounds.
- **Muted** (#9CA3AF): Secondary text, descriptions, supporting copy.
- **Faint** (#6B7280): Tertiary text, labels, metadata. Low contrast by design — recedes into the surface.

### Named Rules

**The Cyan Restraint Rule.** Lab Cyan appears on ≤15% of any given screen. Its rarity is what makes it readable. If every element is cyan, nothing is highlighted.

**The Amber Purpose Rule.** Amber is reserved for lessons learned and callouts. It never decorates, never accents buttons, never fills backgrounds. Its job is to say "this mattered."

## 3. Typography

**Display Font:** Plus Jakarta Sans (with system-ui fallback)
**Body Font:** Plus Jakarta Sans (with system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** A clean, modern sans-serif paired with a technical monospace. The sans carries personality and readability; the mono anchors structural elements (nav labels, log headers, metadata) in a lab-notebook register. One family for content, one for structure — no third voice needed.

### Hierarchy
- **Display** (700, clamp(2.25rem, 5vw, 3rem), 1.1): Hero headlines and section titles. The largest text on any page; appears once per section maximum.
- **Headline** (700, 1.875rem, 1.2): Section headings within articles. Clear hierarchy below Display.
- **Title** (600, 1.25rem, 1.4): Card headings, article titles, subsection labels.
- **Body** (400, 1rem, 1.6): All paragraph text. Max line length 65–75ch for readability.
- **Label** (400, 0.75rem, letter-spacing 0.05em): Navigation items, metadata, log headers, status badges. Always monospaced.

### Named Rules

**The Mono Anchor Rule.** JetBrains Mono appears only on structural/navigation elements: nav labels, log file names, metadata keys, status badges. Body content, headings, and descriptions always use Plus Jakarta Sans. Mixing mono into prose breaks the lab-notebook contract.

## 4. Elevation

Flat by default. Depth is conveyed through background color layering (Void → Surface → Raised) and visible borders, not shadows. The one exception: the Lab Status hero card uses `shadow-2xl` for visual emphasis on the landing section. This exception is deliberate and should not propagate to other components.

### Shadow Vocabulary
- **Emphasis** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)`): Lab Status card only. A deliberate focal point on the landing hero.

### Named Rules

**The Border-First Rule.** All depth is expressed through 1px borders at #263241 and background color shifts. Shadows appear only as a response to a specific design need (hero emphasis), never as a default surface treatment.

## 5. Components

### Buttons
- **Shape:** Gently squared (2px radius). No rounding — the lab notebook is a structured grid, not a soft UI.
- **Primary:** Muted teal fill (#0E7490 at ~12% opacity) with Lab Cyan text and Deep Teal border. Hover deepens the fill. Focus visible via 2px Lab Cyan ring.
- **Secondary:** Raised surface fill with Ink text and standard border. Hover shifts to slightly lighter surface. The "safe" choice — used when primary would over-emphasize.
- **Ghost / Tertiary:** Transparent background, Muted text, no border. Hover shows surface fill. Used for low-priority actions.

### Cards / Containers
- **Corner Style:** Squared (2px radius).
- **Background:** Surface (#0D1117). Raised (#111827) for header bars and active states.
- **Shadow Strategy:** Flat — border-only. See Elevation section for the single exception.
- **Border:** 1px solid #263241 on all sides. Consistent across all card variants.
- **Internal Padding:** 1.5rem (24px) default. 2rem (32px) for featured content (build log articles).

### Navigation
- **Desktop:** Fixed sidebar (256px) with sticky positioning. Surface background with right border. Nav items are monospaced labels with hover/active state shifts. Active state uses Raised background + border.
- **Mobile:** Horizontal scrollable drawer at top. Snap scrolling, hidden scrollbar. Same label styling as desktop.
- **Active State:** Raised background, Ink text, visible border. Clear visual hierarchy between active and inactive.

### Chips / Badges
- **Style:** Inline, small (10px–12px text), border + tinted background. Monospaced text.
- **Variants:** Status chips (Shipped/Prototype/Learning) use accent or warn colors. Availability chip uses accent fill. All follow the border-first depth model.

### Build Log Articles
- **Signature Component.** The most complex pattern in the system — a nested card structure with:
  - Header bar (Raised bg, monospaced file name, status chip)
  - Top accent line (1px, color-coded by status)
  - Two-column body (description + lesson learned)
  - Lesson callout: Amber text on Amber-tinted background with Deep Amber left border
- **Status Color Mapping:** Shipped → Lab Cyan, Prototype → Amber, Learning → Muted

## 6. Do's and Don'ts

### Do:
- **Do** use the Void → Surface → Raised progression for all depth needs. Three layers is enough.
- **Do** keep Lab Cyan under 15% coverage per screen. Its restraint is its power.
- **Do** use monospaced labels for all structural/navigation elements — nav items, log headers, metadata, status badges.
- **Do** document failures and lessons as first-class content. The lab notebook aesthetic demands it.
- **Do** maintain 1px borders at #263241 as the primary depth signal. Consistent, predictable, functional.
- **Do** keep body text at #E5E7EB against dark backgrounds for ≥4.5:1 contrast. Readability is non-negotiable.

### Don't:
- **Don't** use GitHub contribution graphs, star counts, or tech-stack laundry lists. PRODUCT.md explicitly rejects the "typical dev portfolio" pattern.
- **Don't** use hero-metric gradients, identical card grids, or corporate SaaS scaffolding. PRODUCT.md rejects the "corporate SaaS landing page" pattern.
- **Don't** use oversized hero text or stock imagery. The portfolio should feel personal and honest, not like a "creative agency" template.
- **Don't** add shadows to cards, buttons, or inputs as a default treatment. The system is border-first; shadows are the exception, not the rule.
- **Don't** use amber for anything other than lessons learned and callouts. Its purpose-specificity is a design principle, not a suggestion.
- **Don't** round cards beyond 2px. The lab notebook is a structured grid. Full-pill or large-radius breaks the contract.
- **Don't** use gradient text (`background-clip: text`). Decorative, never meaningful. Use weight or size for emphasis.
- **Don't** put `border-left` or `border-right` greater than 1px as a colored accent on cards or list items. Use the build-log article pattern (full top accent line) when color-coding is needed.
