"use client";

/* eslint-disable @next/next/no-img-element -- nav logo needs <img> for static export compatibility */

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, CloseCircle } from "reicon-react";

interface SiteHeaderProps {
  /** Current book page (number of flipped sheets) — drives the active link. */
  current?: number;
  /** Index of the last sheet (the closing contact page) — nav links map to it. */
  lastPage?: number;
  /** Called with the target page index (0 cover, 1 title, 2 about, 3 work, lastPage contact). */
  onNavigate?: (page: number) => void;
}

export default function SiteHeader({
  current = 0,
  lastPage = 7,
  onNavigate,
}: SiteHeaderProps) {
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
    { id: "capabilities", label: "Capabilities", page: lastPage },
    { id: "process", label: "Process", page: lastPage },
    { id: "contact", label: "Contact", page: lastPage },
  ] as const;

  const activeId =
    current === 0 || current === 1
      ? null
      : current === 2
        ? "about"
        : current === lastPage
          ? "contact"
          : "work";

  const go = (page: number) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    onNavigate?.(page);
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
          <div className="nav-links-list" role="none">
            {links.map(({ id, label, page }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? "nav-active" : undefined}
                  aria-current={activeId === id ? "page" : undefined}
                  onClick={go(page)}
                >
                  {label}
                </a>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
}
