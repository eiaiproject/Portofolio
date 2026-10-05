"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Book, { type BookSheet } from "@/components/Book";
import SiteHeader from "@/components/SiteHeader";
import CoverFront from "@/components/book-pages/CoverFront";
import Endpaper from "@/components/book-pages/Endpaper";
import TitlePage from "@/components/book-pages/TitlePage";
import FrontMatter from "@/components/book-pages/FrontMatter";
import ProjectPage from "@/components/book-pages/ProjectPage";
import ProjectPlate from "@/components/book-pages/ProjectPlate";
import ColophonContent from "@/components/book-pages/ColophonContent";
import ContactPage from "@/components/book-pages/ContactPage";
import Verso from "@/components/book-pages/Verso";
import { PROJECTS } from "@/lib/projects";

/* Flip transition duration — must match the CSS transition (--flip-ms). */
const FLIP_MS = 1100;

/* Email parts (constructed at runtime, never in static HTML). */
const EMAIL_USER = "irawananggie";
const EMAIL_DOMAIN = "gmail.com";
function getEmail() {
  return `${EMAIL_USER}@${EMAIL_DOMAIN}`;
}
function getMailto() {
  return `mailto:${getEmail()}?subject=Project%20Inquiry`;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* Nav link ids keep the URL hash meaningful; section pages fall back to
   their own hash. */
function pageHash(page: number, linkId?: string): string {
  if (
    linkId &&
    ["about", "work", "capabilities", "process", "contact"].includes(linkId)
  ) {
    return linkId;
  }
  if (page === 0) return "cover";
  if (page === 1) return "title";
  if (page === 2) return "about";
  return "work";
}

export default function Home() {
  /* Initial state stays 0 (cover) on both server and client so hydration
     never mismatches. Deep links are honored once on mount below. */
  const [current, setCurrent] = useState(0);
  /* Flip state machine: non-null while a flip (or fast jump) runs.
     `current` is the visual/target page (drives the CSS class change),
     `flip.from` the settled page the reader is leaving. Both are the same
     in idle. */
  const [flip, setFlip] = useState<{ from: number; to: number } | null>(null);
  /* Narrow screens (<1024px) get the colophon as an extra closing recto
     page; wide screens show it only as the left page of the final spread.
     SSR and the first client paint always use the base (desktop) book so
     hydration never mismatches — the extra sheet appears after mount. */
  const [isMobile, setIsMobile] = useState(false);
  const emailBtnRef = useRef<HTMLButtonElement>(null);

  const currentRef = useRef(current);
  const flipRef = useRef<{ from: number; to: number } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  /* All sheets stay mounted so every page remains in the DOM (SEO).
     Real-book spread model: a page's image plate is printed on the back
     of the PREVIOUS sheet, so its spread shows [plate] + [text] together
     on wide screens. On narrow screens the book stays centered, showing
     only the recto page — each recto carries a small screenshot of its
     own, so nothing is lost. The closing spread reads
     [Services + Workflow] + [Contact]; on narrow screens Services +
     Workflow becomes its own recto page just before Contact, so the
     colophon stays reachable on mobile and "LET'S SHIP V1." is always
     the last page the reader lands on. */
  const sheets = useMemo<BookSheet[]>(() => {
    const entries = PROJECTS.map((project, i) => ({
      project,
      folio: String(i + 2).padStart(2, "0"),
    }));

    const projectSheets: BookSheet[] = entries.map(({ project, folio }, i) => {
      const next = entries[i + 1];
      return {
        id: project.slug,
        front: <ProjectPage project={project} folio={folio} />,
        back: next ? (
          <ProjectPlate project={next.project} folio={next.folio} />
        ) : (
          /* Left page of the final spread — Services + The Workflow. On
             narrow screens this spread copy gets suffixed ids because the
             same content also renders as the closing recto page (below). */
          <ColophonContent folio="06" idSuffix={isMobile ? "-spread" : ""} />
        ),
      };
    });

    return [
      { id: "cover", front: <CoverFront />, back: <Endpaper /> },
      {
        /* Cream title page — the first page revealed when the cover opens. */
        id: "title",
        front: <TitlePage />,
        back: <Verso folio="01" />,
      },
      {
        id: "manifesto",
        front: <FrontMatter folio="01" />,
        /* Left page of the first project's spread. Only this first plate is
           eager — every later plate loads lazily (see ProjectPlate). */
        back: (
          <ProjectPlate
            project={entries[0].project}
            folio={entries[0].folio}
            priority
          />
        ),
      },
      ...projectSheets,
      /* Narrow screens only: the colophon becomes a real recto page right
         before the closing contact page — mirroring the desktop spread
         ([Services + Workflow] + [Contact]), so "LET'S SHIP V1." stays the
         final page. Its back is never revealed (it is only ever flipped
         past into contact). Canonical ids stay on this page copy; the
         spread copy above is suffixed instead. */
      ...(isMobile
        ? [
            {
              id: "colophon",
              front: <ColophonContent folio="06" />,
              back: <Verso folio="06" />,
            },
          ]
        : []),
      {
        id: "contact",
        front: <ContactPage folio="07" ref={emailBtnRef} />,
        back: <Verso folio="07" />,
      },
    ];
  }, [isMobile]);

  /* Last page is never flipped past. */
  const maxPage = sheets.length - 1;
  /* Closing contact sheet — "LET'S SHIP V1." is always the last page. */
  const contactPage = sheets.findIndex((s) => s.id === "contact");
  /* Services + Workflow content: its own recto page on narrow screens
     (the colophon, just before contact), otherwise the final spread on
     the contact sheet. */
  const colophonPage = isMobile
    ? sheets.findIndex((s) => s.id === "colophon")
    : contactPage;
  /* First-render (base) sheets, captured before the mobile colophon sheet
     is appended — the mount-time hash targets are computed against them. */
  const baseSheetsRef = useRef(sheets);

  /* Flip completion (idempotent) — called from the book's transitionend
     and by the fallback timer below. Releases the input lock. */
  const finishFlip = useCallback(() => {
    if (!flipRef.current) return;
    flipRef.current = null;
    setFlip(null);
  }, []);

  /* Flip with input lock (never interrupt a mid-flip).
     Returns false when the flip is rejected (mid-animation or out of range).
     The visual `current` updates immediately so the CSS transition runs;
     `flip.from` keeps the settled page until completion. Completion is
     reported by Book via transitionend (or a fast-jump timer); the timeout
     here is only the safety net. */
  const flipTo = useCallback(
    (next: number): boolean => {
      if (flipRef.current) return false;
      const clamped = Math.max(0, Math.min(next, maxPage));
      if (clamped === currentRef.current) return false;
      const from = currentRef.current;
      flipRef.current = { from, to: clamped };
      setFlip({ from, to: clamped });
      setCurrent(clamped);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      const delay = prefersReducedMotion() ? 250 : FLIP_MS + 150;
      timerRef.current = window.setTimeout(finishFlip, delay);
      return true;
    },
    [maxPage, finishFlip]
  );

  /* Spread navigation: Prev / Next flip exactly one sheet. */
  const goNext = useCallback(() => {
    flipTo(currentRef.current + 1);
  }, [flipTo]);

  const goPrev = useCallback(() => {
    flipTo(currentRef.current - 1);
  }, [flipTo]);

  /* Nav bridge: book pages for the header links. The link id keeps the
     URL hash meaningful — capabilities / process / contact each keep
     their own hash (on narrow screens capabilities / process land on the
     colophon page while contact stays the final page). */
  const handleNavigate = useCallback(
    (page: number, linkId?: string) => {
      /* Only touch the hash when the navigation actually happened. */
      if (!flipTo(page)) return;
      window.history.replaceState(null, "", `#${pageHash(page, linkId)}`);
    },
    [flipTo]
  );

  /* Keyboard: ArrowRight / ArrowLeft flip the book. Ignored while typing
     in form fields (defensive — the book has none). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* Viewport + deep link on mount (single pass, one paint).
     Reads the narrow-screen flag and applies any URL hash together, so a
     deep link lands on the FINAL index immediately: on narrow screens
     capabilities / process target one sheet further (the colophon page),
     while contact stays on its own sheet — both computed against the
     base sheets (before the colophon sheet is appended below). Re-applying
     the hash later would cause a spurious flip on load, so this never
     re-runs. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const mobile = mq.matches;
    /* One-time sync of the viewport flag on mount — the resize listener
       below keeps it in sync afterwards. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mobile);
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const base = baseSheetsRef.current;
    /* In the base (desktop) book contact is the last sheet; on narrow
       screens the colophon takes that exact position and contact moves one
       sheet further. Services + Workflow therefore always targets the base
       contact position. */
    const baseContact = base.findIndex((s) => s.id === "contact");
    const map: Record<string, number> = {
      cover: 0,
      home: 0,
      title: 1,
      about: 2,
      manifesto: 2,
      work: 3,
      capabilities: baseContact,
      process: baseContact,
      contact: mobile ? baseContact + 1 : baseContact,
    };
    if (hash in map) {
      /* One-time external sync with the URL — not a cascading render. */
      setCurrent(map[hash]);
    }
  }, []);

  /* Keep the viewport flag in sync on resize (adds / removes the mobile
     colophon page) without ever re-applying the hash. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Resizing across the breakpoint adds/removes the mobile colophon sheet
     — clamp `current` back in range and cancel any in-flight flip toward
     the page that no longer exists. The clamp is a pure safety guard that
     only fires when the sheet count actually changed. */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent((c) => Math.min(c, sheets.length - 1));
    if (flipRef.current && flipRef.current.to >= sheets.length) {
      flipRef.current = null;
      setFlip(null);
    }
  }, [sheets.length]);

  /* Clear all timers on unmount. */
  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  /* Hydrate the email button on mount only (spam obfuscation). The
     contact page renders once inside the book; the ref tracks that copy
     and the selector is a safety net for any future duplicate. */
  useEffect(() => {
    const mailto = getMailto();
    const hook = (b: HTMLButtonElement | null) => {
      if (b) {
        b.onclick = () => {
          window.location.href = mailto;
        };
      }
    };
    hook(emailBtnRef.current);
    document
      .querySelectorAll<HTMLButtonElement>(".contact-actions .btn")
      .forEach(hook);
  }, []);

  return (
    <>
      <SiteHeader
        current={current}
        contactPage={contactPage}
        colophonPage={colophonPage}
        onNavigate={handleNavigate}
      />
      <Book
        sheets={sheets}
        current={current}
        flip={flip}
        onFlip={flipTo}
        onFlipComplete={finishFlip}
      />
    </>
  );
}
