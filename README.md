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

An AI-assisted portfolio website that documents the journey of learning to code from a non-IT background. Built as a personal build journal with a lab notebook aesthetic. Deployed on [Cloudflare Pages](https://pages.cloudflare.com).

**Key sections:**
- **Lab Status** — Current learning context and availability
- **Skills** — Honest breakdown of capabilities vs. learning areas
- **Build Logs** — Documented experiments, failures, and lessons
- **Workflow** — How I approach building with AI
- **Collaboration** — How we work together on projects

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.9 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4.1 |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| AI Integration | Google GenAI (Gemini) |
| Utilities | CVA, clsx, tailwind-merge |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm
- Gemini API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/eiaiproject/Portofolio.git
cd portofolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with fonts & metadata
│   ├── page.tsx        # Main portfolio page
│   ├── globals.css     # Global styles & Tailwind config
│   ├── error.tsx       # Error boundary
│   ├── loading.tsx     # Loading state
│   └── not-found.tsx   # 404 page
├── components/
│   ├── help-overlay.tsx  # Keyboard help modal
│   ├── fade-in.tsx       # Scroll-triggered animation wrapper
│   └── mobile-nav.tsx    # Mobile navigation drawer
├── hooks/
│   └── use-mobile.ts     # Mobile viewport detection
├── lib/
│   └── utils.ts          # cn() utility for class merging
├── .env.example          # Environment variable template
├── metadata.json         # AI Studio metadata
└── package.json
```

## Features

- **Responsive Design** — Mobile-first with desktop sidebar navigation
- **Dark Theme** — Lab notebook aesthetic with cyan accent colors
- **Smooth Animations** — Scroll-triggered fade-in effects
- **Keyboard Navigation** — Press `?` for help overlay
- **Back to Top** — Quick scroll button on mobile
- **Accessibility** — Skip links, ARIA labels, focus-visible states

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run clean` | Clean Next.js build artifacts |

## Deployment

### Cloudflare Pages

**1. Install adapter:**

```bash
npm install -D @cloudflare/next-on-pages
```

**2. Add build script to `package.json`:**

```json
"scripts": {
  "pages:build": "npx @cloudflare/next-on-pages",
  "pages:deploy": "npm run pages:build && wrangler pages deploy .vercel/output/static"
}
```

**3. Build and deploy:**

```bash
npm run pages:deploy
```

Or connect your GitHub repo in [Cloudflare Dashboard] (https://dash.cloudflare.com) → Pages → Create a project.

**Build settings:**
| Setting | Value |
|---------|-------|
| Build command | `npx @cloudflare/next-on-pages` |
| Build output directory | `.vercel/output/static` |
| Node.js version | 20 |

**Environment variables in Cloudflare:**
| Variable | Description |
|----------|-------------|
| `APP_URL` | Your deployed URL (e.g. `https://your-project.pages.dev`) |

> **Note:** Cloudflare Pages uses edge runtime. Server-side features work, but Node.js APIs have [limitations](https://developers.cloudflare.com/pages/functions/compatibility-flags/).

### Alternative Platforms

- [Vercel](https://vercel.com) — Zero-config
- [Netlify](https://netlify.com) — With Next.js runtime
- [Docker](https://docs.docker.com/engine/reference/builder/) — Self-hosted

## Contributing

This is a personal learning project. However, suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## Contact

**Anggie Irawan** — [irawananggie@gmail.com](mailto:irawananggie@gmail.com)

Open for small projects and collaborations.

## License

MIT © 2026 Anggie
