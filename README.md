<div align="center">

# Anggie Irawan — AI-Assisted Product Builder

**Turning rough ideas into simple working web products.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3176C8?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[Live Demo](https://anggieirawan.my.id)

</div>

---

## About

Portfolio for Anggie Irawan, an AI-assisted product builder who turns rough ideas into working web products for founders, small businesses, and solo makers.

## Features

- **Editorial monograph aesthetic** — Cream background, high-contrast ink, serif display type
- **Interactive 3D book** — A hard cover that opens, page-flip animations, and one project per spread (desktop shows the 2-page spread; mobile shows the left plate first, slides to the text page, then flips)
- **Responsive, mobile-first layout** — Fixed header with collapsible navigation (iOS-safe)
- **Project case studies** — Each project with problem, lesson, tech stack, and screenshot (Expend, Invois, Ledjer, Zipto)
- **Accessibility** — Skip link, ARIA labels, focus-visible outlines, reduced-motion support
- **Fully static export** — Deployable to Cloudflare Pages, no server needed

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
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Book composition (8 sheets, state, keyboard, hash)
│   ├── not-found.tsx   # 404 page
│   └── globals.css     # All styles and design tokens
├── components/
│   ├── Book.tsx        # 3D flip engine (controlled)
│   ├── SiteHeader.tsx  # Navigation
│   └── book-pages/     # Cover, title page, manifesto, projects, colophon
├── lib/
│   └── projects.ts     # Project data (verbatim copy)
├── .github/workflows/  # SonarCloud quality gate CI
├── public/             # Images and favicon
├── DESIGN.md           # Design system reference
├── PRODUCT.md          # Product context and goals
├── sonar-project.properties
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build static site |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run clean` | Clear Next.js cache |

## Deployment

### Cloudflare Pages

1. Push to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
3. Connect your repository
4. Build command: `npm run build`
5. Output directory: `out`
6. Node.js version: 20

No environment variables needed.

## Quality Gate (SonarCloud)

A GitHub Actions workflow (`.github/workflows/sonar-quality-gate.yml`) runs on every **push**, **pull request**, and **merge to `main`**:

1. `npm ci` + `npm run lint` + `npm run build`
2. SonarCloud scan with `sonar.qualitygate.wait=true` — the job **fails while the Quality Gate is red** (PRs from forks are skipped: the `SONAR_TOKEN` secret is not available to them)

### One-time setup

1. Create the project at [SonarCloud](https://sonarcloud.io/projects/create) (free), link this GitHub repo, and copy its **organization** and **project key** into `sonar-project.properties` (defaults: org `eiaiproject`, key `eiaiproject_Portofolio`).
2. Add a **`SONAR_TOKEN`** secret: repo **Settings → Secrets and variables → Actions**.
3. Optional but recommended: in **Settings → Branches → main → Require status checks**, require the **SonarCloud Code Analysis** check so a PR can only be merged when the Quality Gate passes.

## License

MIT © 2026 Anggie Irawan
