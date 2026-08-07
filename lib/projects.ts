/**
 * Portfolio project data.
 *
 * Copy is extracted VERBATIM from the original single-page sections in
 * `app/page.tsx` — do not paraphrase, rewrite, or "improve" any of this text.
 */

export interface Project {
  slug: string;
  name: string;
  status: "Shipped" | "Active Development";
  subtitle: string;
  /** First paragraph of the case study — rendered with the dropcap rule. */
  description: string;
  highlights: string[];
  /** Lesson blockout, verbatim (typographic quotes included). */
  lesson: string;
  /** Mono stack line, verbatim, including the "Stack: " prefix. */
  tools: string;
  link: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "expend",
    name: "Expend",
    status: "Shipped",
    subtitle: "Offline-First Expense & Debt Tracker",
    description:
      "People need simple expense tracking without complex setup, account creation, or privacy concerns about cloud storage. Expend solves this by being a private, offline-first PWA.",
    highlights: ["Multi-wallet", "Debt tracking", "Budgets", "Works offline"],
    lesson:
      "\u201CLocal-first architecture teaches more about data modeling and state management than any API tutorial.\u201D",
    tools: "Stack: Next.js, React, TypeScript, Tailwind CSS, IndexedDB, Recharts, PWA",
    link: "https://expend.pages.dev",
    linkLabel: "View Live App",
    image: "/expend-plate.png",
    imageAlt:
      "Expend brand card — wordmark on a light sage-toned background with feature list",
  },
  {
    slug: "invois",
    name: "Invois",
    status: "Shipped",
    subtitle: "Offline-First Invoice & Receipt Maker",
    description:
      "Freelancers and small businesses need a fast way to create invoices and receipts without being locked into a server account or losing access when offline.",
    highlights: ["PDF export", "Reusable clients", "Auto-numbering", "Works offline"],
    lesson:
      "\u201CDocument workflows need careful state rules: paid invoices, linked receipts, and local persistence all have to agree before the UI feels trustworthy.\u201D",
    tools: "Stack: React, TypeScript, Vite, React Router, IndexedDB, jsPDF, PWA",
    link: "https://invois.pages.dev",
    linkLabel: "View Live App",
    image: "/invoiz-plate.png",
    imageAlt:
      "Invois brand card — wordmark on a cream background with olive accents and feature list",
  },
  {
    slug: "ledjer",
    name: "Ledjer",
    status: "Active Development",
    subtitle: "Double-Entry Bookkeeping for UMKM",
    description:
      "Indonesian MSMEs need double-entry bookkeeping that follows local accounting standards (PSAK), supports multiple users, and runs on phones without spreadsheet complexity.",
    highlights: ["14 transaction types", "Multi-tenant", "Financial reports", "Stock management"],
    lesson:
      "\u201CRigid financial systems need database-level validation to guarantee data integrity regardless of frontend state.\u201D",
    tools: "Stack: React 19, Vite, Tailwind CSS 4, React Router 7, TanStack Query 5, Supabase, PostgreSQL",
    link: "https://ledjer.id",
    linkLabel: "View Current Build",
    image: "/ledjer-plate.png",
    imageAlt:
      "Ledjer brand card — wordmark on a warm cream background with wood-brown accents and feature list",
  },
  {
    slug: "zipto",
    name: "Zipto",
    status: "Shipped",
    subtitle: "ZIP to Markdown Converter",
    description:
      "Developers, writers, and analysts often need to extract text from ZIP archives without uploading sensitive files to a server. Zipto solves this by running all conversion locally in the browser as a private, offline-first PWA.",
    highlights: ["Local processing", "No upload", "Privacy-first", "Works offline"],
    lesson:
      "\u201CWeb Workers make CPU-intensive file conversion viable in the browser without blocking the UI or compromising on privacy.\u201D",
    tools: "Stack: React, TypeScript, Vite, Web Worker, fflate, Turndown, PapaParse, PWA",
    link: "https://zipto.pages.dev",
    linkLabel: "View Live App",
    image: "/zipto-plate.png",
    imageAlt:
      "Zipto brand card — wordmark on a linen background with terracotta accents and feature list",
  },
];
