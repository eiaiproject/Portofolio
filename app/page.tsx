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

/* Flip transition duration — must match the CSS transition (1.1s). */
const FLIP_MS = 1100;

/* ── Email parts (constructed at runtime, never in static HTML) ── */
const EMAIL_USER = "irawananggie";
const EMAIL_DOMAIN = "gmail.com";
function getEmail() {
  return `${EMAIL_USER}@${EMAIL_DOMAIN}`;
}
function getMailto() {
  return `mailto:${getEmail()}?subject=Project%20Inquiry`;
}

export default function Home() {
  /* Initial state stays 0 (cover) on both server and client so hydration
     never mismatches. Deep links are honored once on mount below. */
  const [current, setCurrent] = useState(0);
  /* Mobile side of the current spread: 1 = right page (text), 0 = left page
     (plate/colophon). Mobile shows the left page first, then slides to the
     right page, then flips to the next sheet. */
  const [side, setSide] = useState<0 | 1>(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentRef = useRef(current);
  const animatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const emailBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  /* ── All sheets stay mounted so every page remains in the DOM (SEO).
     Real-book spread model: a page's image plate is printed on the back
     of the PREVIOUS sheet, so its spread shows [plate] + [text] together
     on desktop. On mobile only the right (recto) page is visible — it
     carries a small screenshot of its own, so nothing is lost.
     The closing spread reads [Services + Workflow] + [Contact]. ── */
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
          /* Left page of the final spread — Services + The Workflow. */
          <ColophonContent folio="06" />
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
        /* Left page of the first project's spread. */
        back: (
          <ProjectPlate project={entries[0].project} folio={entries[0].folio} />
        ),
      },
      ...projectSheets,
      {
        id: "contact",
        front: <ContactPage folio="07" ref={emailBtnRef} />,
        back: <Verso folio="07" />,
      },
    ];
  }, []);

  /* Last page is never flipped past. */
  const maxPage = sheets.length - 1;

  /* ── Flip with input lock (never interrupt a mid-flip).
     Returns false when the flip is rejected (mid-animation or out of range). ── */
  const flipTo = useCallback(
    (next: number): boolean => {
      if (animatingRef.current) return false;
      const clamped = Math.max(0, Math.min(next, maxPage));
      if (clamped === currentRef.current) return false;
      animatingRef.current = true;
      setIsAnimating(true);
      setCurrent(clamped);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        animatingRef.current = false;
        setIsAnimating(false);
      }, FLIP_MS);
      return true;
    },
    [maxPage]
  );

  /* Sheets 3..7 have real left-page content (project plates / colophon);
     earlier backs are decorative (endpaper / verso) and stay hidden. */
  const canShowPlate = (i: number) => i >= 3;

  /* ── Mobile spread navigation ──
     next: left page → slide right; right page → flip to next sheet (lands on
     its left page). prev mirrors: right page → slide back; left page → flip
     back (lands on the previous sheet's right page). */
  const goNext = useCallback(() => {
    if (side === 0) {
      setSide(1);
      return;
    }
    const next = currentRef.current + 1;
    if (next > maxPage) return;
    if (!flipTo(next)) return;
    setSide(canShowPlate(next) ? 0 : 1);
  }, [side, flipTo, maxPage]);

  const goPrev = useCallback(() => {
    if (side === 1 && canShowPlate(currentRef.current)) {
      setSide(0);
      return;
    }
    const prev = currentRef.current - 1;
    if (prev < 0) return;
    if (!flipTo(prev)) return;
    setSide(1);
  }, [side, flipTo]);

  /* ── Nav bridge: book pages for the header links ── */
  const handleNavigate = useCallback(
    (page: number, navSide: 0 | 1) => {
      /* Only touch the hash when the navigation actually happened. */
      if (!flipTo(page)) return;
      setSide(navSide);
      const hash =
        page === 0
          ? "cover"
          : page === 1
            ? "title"
            : page === 2
              ? "about"
              : page === maxPage
                ? navSide === 0
                  ? "capabilities"
                  : "contact"
                : "work";
      window.history.replaceState(null, "", `#${hash}`);
    },
    [flipTo, maxPage]
  );

  /* ── Keyboard: ArrowRight / ArrowLeft navigate the mobile spread model ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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

  /* ── Read URL hash once on mount to open the matching page ── */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const map: Record<string, [number, 0 | 1]> = {
      cover: [0, 1],
      home: [0, 1],
      title: [1, 1],
      about: [2, 1],
      manifesto: [2, 1],
      work: [3, 0],
      capabilities: [maxPage, 0],
      process: [maxPage, 0],
      contact: [maxPage, 1],
    };
    if (hash in map) {
      const [p, s] = map[hash];
      /* One-time external sync with the URL — not a cascading render,
         so the set-state-in-effect rule does not apply here. */
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(p);
      setSide(s);
    }
  }, [maxPage]);

  /* ── Clear the flip lock timer on unmount ── */
  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  /* ── Hydrate the email button on mount only (spam obfuscation) ── */
  useEffect(() => {
    const mailto = getMailto();
    if (emailBtnRef.current) {
      emailBtnRef.current.onclick = () => {
        window.location.href = mailto;
      };
    }
  }, []);

  return (
    <>
      <SiteHeader current={current} lastPage={maxPage} onNavigate={handleNavigate} />
      <Book
        sheets={sheets}
        current={current}
        side={side}
        isAnimating={isAnimating}
        onFlip={flipTo}
        onNext={goNext}
        onPrev={goPrev}
      />
    </>
  );
}
