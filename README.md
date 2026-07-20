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
- **Responsive, mobile-first layout** — Fixed header with collapsible navigation (iOS-safe)
- **Project case studies** — Each project with problem, lesson, tech stack, and screenshot
- **Scroll-reveal animations** — Sections fade in via IntersectionObserver
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
│   ├── page.tsx        # Main portfolio page
│   ├── not-found.tsx   # 404 page
│   └── globals.css     # All styles and design tokens
├── components/
│   └── SiteHeader.tsx  # Navigation
├── public/             # Images and favicon
├── DESIGN.md           # Design system reference
├── PRODUCT.md          # Product context and goals
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

## License

MIT © 2026 Anggie Irawan
