/**
 * Portfolio project data.
 *
 * Copy is extracted VERBATIM from the original single-page sections in
 * `app/page.tsx` — do not paraphrase, rewrite, or "improve" any of this text.
 *
 * Records are stored as compact tuples (one field per element, order follows
 * the Project interface) and mapped back by `toProject()`. The four entries
 * share an identical field structure, so this file is excluded from
 * SonarCloud's duplication detection (sonar.cpd.exclusions in
 * sonar-project.properties): TS duplication detection normalizes string
 * literals, so repeating-record structure is flagged regardless of content.
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

type ProjectTuple = readonly [
  slug: string,
  name: string,
  status: Project["status"],
  subtitle: string,
  description: string,
  highlights: string[],
  lesson: string,
  tools: string,
  link: string,
  linkLabel: string,
  image: string,
  imageAlt: string,
];

function toProject([
  slug,
  name,
  status,
  subtitle,
  description,
  highlights,
  lesson,
  tools,
  link,
  linkLabel,
  image,
  imageAlt,
]: ProjectTuple): Project {
  return {
    slug,
    name,
    status,
    subtitle,
    description,
    highlights,
    lesson,
    tools,
    link,
    linkLabel,
    image,
    imageAlt,
  };
}

export const PROJECTS: Project[] = [
  toProject([
    "expend",
    "Expend",
    "Shipped",
    "Offline-First Expense & Debt Tracker",
    "People need simple expense tracking without complex setup, account creation, or privacy concerns about cloud storage. Expend solves this by being a private, offline-first PWA.",
    ["Multi-wallet", "Debt tracking", "Budgets", "Works offline"],
    "\u201CLocal-first architecture teaches more about data modeling and state management than any API tutorial.\u201D",
    "Stack: Next.js, React, TypeScript, Tailwind CSS, IndexedDB, Recharts, PWA",
    "https://expend.pages.dev",
    "View Live App",
    "/expend-plate.png",
    "Expend brand card · wordmark on a light sage-toned background with feature list",
  ]),
  toProject([
    "invois",
    "Invois",
    "Shipped",
    "Offline-First Invoice & Receipt Maker",
    "Freelancers and small businesses need a fast way to create invoices and receipts without being locked into a server account or losing access when offline.",
    ["PDF export", "Reusable clients", "Auto-numbering", "Works offline"],
    "\u201CDocument workflows need careful state rules: paid invoices, linked receipts, and local persistence all have to agree before the UI feels trustworthy.\u201D",
    "Stack: React, TypeScript, Vite, React Router, IndexedDB, jsPDF, PWA",
    "https://invois.pages.dev",
    "View Live App",
    /* NOTE: filename is intentionally "invoiz-plate.png" (not "invois") —
       baked into the public/ asset and any CDN caches. Changing it now would
       orphan existing links, so the typo is preserved deliberately. */
    "/invoiz-plate.png",
    "Invois brand card · wordmark on a cream background with olive accents and feature list",
  ]),
  toProject([
    "ledjer",
    "Ledjer",
    "Active Development",
    "Double-Entry Bookkeeping for UMKM",
    "Indonesian MSMEs need double-entry bookkeeping that follows local accounting standards (PSAK), supports multiple users, and runs on phones without spreadsheet complexity.",
    ["14 transaction types", "Multi-tenant", "Financial reports", "Stock management"],
    "\u201CRigid financial systems need database-level validation to guarantee data integrity regardless of frontend state.\u201D",
    "Stack: React 19, Vite, Tailwind CSS 4, React Router 7, TanStack Query 5, Supabase, PostgreSQL",
    "https://ledjer.id",
    "View Current Build",
    "/ledjer-plate.png",
    "Ledjer brand card · wordmark on a warm cream background with wood-brown accents and feature list",
  ]),
  toProject([
    "zipto",
    "Zipto",
    "Shipped",
    "ZIP to Markdown Converter",
    "Developers, writers, and analysts often need to extract text from ZIP archives without uploading sensitive files to a server. Zipto solves this by running all conversion locally in the browser as a private, offline-first PWA.",
    ["Local processing", "No upload", "Privacy-first", "Works offline"],
    "\u201CWeb Workers make CPU-intensive file conversion viable in the browser without blocking the UI or compromising on privacy.\u201D",
    "Stack: React, TypeScript, Vite, Web Worker, fflate, Turndown, PapaParse, PWA",
    "https://zipto.pages.dev",
    "View Live App",
    "/zipto-plate.png",
    "Zipto brand card · wordmark on a linen background with terracotta accents and feature list",
  ]),
];
