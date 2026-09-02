<div align="center">

# Anggie Irawan · AI-Assisted Product Builder

**Turning rough ideas into simple working web products.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3176C8?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=eiaiproject_Portofolio&metric=alert_status)](https://sonarcloud.io/dashboard?id=eiaiproject_Portofolio)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=eiaiproject_Portofolio&metric=coverage)](https://sonarcloud.io/dashboard?id=eiaiproject_Portofolio)

[Live Demo](https://anggieirawan.my.id)

</div>

---

## About

Portfolio for Anggie Irawan, an AI-assisted product builder who turns rough ideas into working web products for founders, small businesses, and solo makers.

## Features

- **Editorial monograph aesthetic** · Cream background, high-contrast ink, serif display type
- **Interactive 3D book** · A hard cover that opens, page-flip animations, and one project per spread (desktop shows the 2-page spread; mobile shows the left plate first, slides to the text page, then flips)
- **Responsive, mobile-first layout** · Fixed header with collapsible navigation (iOS-safe)
- **Project case studies** · Each project with problem, lesson, tech stack, and screenshot (Expend, Invois, Ledjer, Zipto)
- **Accessibility** · Skip link, ARIA labels, focus-visible outlines, reduced-motion support
- **Fully static export** · Deployable to Cloudflare Pages, no server needed

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript 5.9 |
| UI Library | React 19 |
| Styling | Custom CSS with CSS custom properties |
| Icons | reicon-react |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)

### Installation

```bash
git clone https://github.com/eiaiproject/Portofolio.git
cd Portofolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Output goes to `out/`.

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx        # Book composition (state, keyboard, hash, sheets)
│   ├── not-found.tsx   # 404 page
│   └── globals.css     # All styles and design tokens
├── components/
│   ├── Book.tsx        # 3D flip engine (controlled)
│   ├── SiteHeader.tsx  # Navigation
│   └── book-pages/     # Cover, title, manifesto, projects, colophon, contact
├── lib/
│   └── projects.ts     # Project data (verbatim copy)
├── tests/
│   └── audit/          # Playwright UI audit (visual + a11y + functional)
├── playwright.config.ts
├── eslint.config.mjs
├── .github/workflows/  # Lint & Build CI
├── public/             # Images and favicon
├── sonar-project.properties
├── DESIGN.md           # (gitignored) Design system reference for local dev
├── PRODUCT.md          # (gitignored) Product context and goals
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build static site |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint (local only · see Quality Gate below) |
| `npm run clean` | Clear Next.js cache |
| `npm run audit` | Playwright UI audit (regression check) |
| `npm run audit:update` | Refresh Playwright baselines |

## Deployment

### Cloudflare Pages

1. Push to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
3. Connect your repository
4. Build command: `npm run build`
5. Output directory: `out`
6. Node.js version: 20

No environment variables needed.

## Quality Gate

Two independent gates protect `main`:

### 1. Lint & Build (GitHub Actions)

A GitHub Actions workflow (`.github/workflows/sonar-quality-gate.yml`) runs on every **push**, **pull request**, and **merge to `main`**:

1. `npm ci` + `npm run build`

The job **fails** if the build breaks. PRs from forks run the same steps (no secrets needed).

`npm run lint` is intentionally **not** part of CI: the `eslint-config-next@15.5` chain is incompatible with ESLint 9.30+ on Node 20+ (a known upstream issue with `@rushstack/eslint-patch@1.10+`), so the lint step throws before the runner can complete. The build step catches type errors and missing imports · the same things lint would have caught. Run `npm run lint` locally before pushing.

### 2. SonarCloud (Automatic Analysis)

Code-quality analysis runs separately via the **SonarCloud GitHub App** ([Automatic Analysis](https://docs.sonarcloud.io/advanced-setup/automatic-analysis/)) · the App analyzes the default branch and the five most recent active PRs on Sonar's own infrastructure using its own credentials, so no `SONAR_TOKEN` secret is required in this repository.

The check appears in the PR **Checks** tab as **"SonarCloud Code Analysis"** once the analysis completes (usually within 1–2 minutes of opening a PR). Results are also visible on the [SonarCloud dashboard](https://sonarcloud.io/project/overview?id=eiaiproject_Portofolio).

**Note**: Automatic Analysis only scans PRs from the same repository · fork PRs are skipped (no `SONAR_TOKEN` in fork secrets). If you need fork-PR gating, switch to CI-based analysis (requires a `SONAR_TOKEN` secret and the `SonarSource/sonarqube-scan-action` step).

### One-time setup (already done on this repo)

1. Create the project at [SonarCloud](https://sonarcloud.io/projects/create), link this GitHub repo, and confirm the **organization** (`eiaiproject`) and **project key** (`eiaiproject_Portofolio`) in `sonar-project.properties`.
2. Install the **SonarCloud GitHub App** on the `eiaiproject` organization (or just this repo) · Automatic Analysis turns on automatically once the App has access.
3. Optional but recommended: in repo **Settings → Branches → main → Require status checks**, require the **"SonarCloud Code Analysis"** check so a PR can only be merged when the Quality Gate passes.

## License

MIT © 2026 Anggie Irawan

## UI Audit (Playwright)

A full visual regression + functional test suite lives in `tests/audit/visual.spec.ts`. It runs against the local static build (`out/`) on chromium at two viewports (Desktop 1280×800 + Pixel 5).

```bash
npm run audit           # regression check · fails on any >2% pixel diff
npm run audit:update    # refresh baselines (after intentional UI changes)
```

The suite covers every page (cover, title, about, work, 4 projects, capabilities, process, contact, 404), keyboard navigation, mobile menu, and live-site smoke against https://anggieirawan.my.id. Baselines (35 PNGs, ~11 MB) are committed under `tests/audit/visual.spec.ts-snapshots/` for diff detection. First-time setup:

```bash
npx playwright install chromium
```
