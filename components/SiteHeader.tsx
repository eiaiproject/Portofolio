"use client";

/* eslint-disable @next/next/no-img-element -- nav logo needs <img> for static export compatibility */

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, CloseCircle } from "reicon-react";

interface SiteHeaderProps {
  /** Current book page (number of flipped sheets) — drives the active link. */
  current?: number;
  /** Index of the closing contact page ("LET'S SHIP V1." — always the last
      page the reader lands on). */
  contactPage?: number;
  /** Index of the Services + Workflow content — its own page on narrow
      screens (the colophon, just before contact), otherwise the contact
      sheet (the final spread shows it on the left). Defaults to contactPage. */
  colophonPage?: number;
  /** Called with the target page index and the link id (for the URL hash). */
  onNavigate?: (page: number, linkId?: string) => void;
}

export default function SiteHeader({
  current = 0,
  contactPage = 7,
  colophonPage,
  onNavigate,
}: SiteHeaderProps) {
  const colophon = colophonPage ?? contactPage;
  const [open, setOpen] = useState(false);
  const scrollPos = useRef(0);

  /* ── Mobile nav: iOS-safe body scroll lock ── */
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (open) {
      scrollPos.current = window.scrollY;
      body.style.top = `-${scrollPos.current}px`;
      body.classList.add("nav-open");
    } else {
      body.classList.remove("nav-open");
      body.style.top = "";
      window.scrollTo(0, scrollPos.current);
    }
    return () => {
      body.classList.remove("nav-open");
      body.style.top = "";
      if (scrollPos.current > 0) {
        window.scrollTo(0, scrollPos.current);
      }
    };
  }, [open]);

  /* ── Close mobile nav on resize past breakpoint ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { id: "about", label: "About", page: 2 },
    { id: "work", label: "Work", page: 3 },
    { id: "capabilities", label: "Capabilities", page: colophon },
    { id: "process", label: "Process", page: colophon },
    { id: "contact", label: "Contact", page: contactPage },
  ] as const;

  /* The colophon page (mobile) carries the Services + Workflow content,
     so it highlights Capabilities. On wide screens colophon === contact,
     so the closing spread highlights Contact. */
  const activeId =
    current === 0 || current === 1
      ? null
      : current === 2
        ? "about"
        : current === contactPage
          ? "contact"
          : current === colophon
            ? "capabilities"
            : "work";

  const go = (page: number, linkId?: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    onNavigate?.(page, linkId);
  };

  return (
    <header className="site-header">
      <a href="#book-main" className="skip-link">
        Skip to main content
      </a>
      <nav
        className="site-nav"
        aria-label="Primary navigation"
        data-open={open ? "true" : "false"}
      >
        <a href="#book-main" className="nav-brand" onClick={go(0)}>
          <img src="/AI-favicon.svg" alt="" className="nav-logo" aria-hidden="true" />{" "}
          Monograph
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <CloseCircle size={24} weight="Outline" color="var(--ink)" />
          ) : (
            <Menu size={24} weight="Outline" color="var(--ink)" />
          )}
        </button>
        <ul id="primary-menu" className="nav-links">
          {/* Valid list structure: direct children of a ul are always li.
              The wrapper li collapses on mobile (grid-rows gutter); the
              inner list carries the actual links. */}
          <li className="nav-links-list">
            <ul className="nav-links-items">
              {links.map(({ id, label, page }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeId === id ? "nav-active" : undefined}
                    aria-current={activeId === id ? "page" : undefined}
                    onClick={go(page, id)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
