<div align="center">

# Anggie's Build Lab

**A digital lab notebook and build journal — learn by building with AI.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Overview

An AI-assisted portfolio website that documents the journey of learning to code from a non-IT background. Built as a personal build journal with a lab notebook aesthetic. Deployed on [Cloudflare Pages](https://pages.cloudflare.com) as a fully static site.

**Key sections:**
- **Lab Status** — Current learning context and availability
- **Skills** — Honest breakdown of capabilities vs. learning areas
- **Build Logs** — Documented experiments, failures, and lessons
- **Workflow** — How I approach building with AI
- **Collaboration** — How we work together on projects

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript 5.9 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4.1 |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)

### Installation

```bash
git clone https://github.com/eiaiproject/Portofolio.git
cd portofolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

Output is in the `out/` directory.

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with fonts & metadata
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles & Tailwind config
├── components/
│   ├── help-overlay.tsx  # Keyboard help modal
│   ├── fade-in.tsx       # Scroll-triggered animation wrapper
│   └── mobile-nav.tsx    # Mobile navigation drawer
└── package.json
```

## Features

- **Responsive Design** — Mobile-first with desktop sidebar navigation
- **Dark Theme** — Lab notebook aesthetic with cyan accent colors
- **Smooth Animations** — Scroll-triggered fade-in effects
- **Keyboard Navigation** — Press `?` for help overlay
- **Back to Top** — Quick scroll button on mobile
- **Accessibility** — Skip links, ARIA labels, focus-visible states
- **Fully Static** — No server, no SSR, no API routes, no env vars

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static site to `out/` |
| `npm run lint` | Run ESLint |

## Deployment

### Cloudflare Pages

1. Push to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
3. Connect your repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | 20 |

No environment variables needed.

### Local Preview

```bash
npm run build
npx serve out
```

## Contact

**Anggie Irawan** — [irawananggie@gmail.com](mailto:irawananggie@gmail.com)

Open for small projects and collaborations.

## License

MIT © 2026 Anggie
