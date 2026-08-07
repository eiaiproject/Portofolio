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

  /* ── Nav bridge: book pages for the header links ── */
  const handleNavigate = useCallback(
    (page: number) => {
      /* Only touch the hash when the navigation actually happened. */
      if (!flipTo(page)) return;
      const hash =
        page === 0
          ? "cover"
          : page === 1
            ? "title"
            : page === 2
              ? "about"
              : page === maxPage
                ? "contact"
                : "work";
      window.history.replaceState(null, "", `#${hash}`);
    },
    [flipTo, maxPage]
  );

  /* ── Keyboard: ArrowRight / ArrowLeft flip ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        flipTo(currentRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        flipTo(currentRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipTo]);

  /* ── Read URL hash once on mount to open the matching page ── */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const map: Record<string, number> = {
      cover: 0,
      home: 0,
      title: 1,
      about: 2,
      manifesto: 2,
      work: 3,
      capabilities: maxPage,
      process: maxPage,
      contact: maxPage,
    };
    if (hash in map) {
      /* One-time external sync with the URL — not a cascading render,
         so the set-state-in-effect rule does not apply here. */
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(map[hash]);
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
      <Book sheets={sheets} current={current} isAnimating={isAnimating} onFlip={flipTo} />
    </>
  );
}
