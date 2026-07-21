"use client";

/* eslint-disable @next/next/no-img-element -- nav logo needs <img> for static export compatibility */

import { useEffect, useRef, useState } from "react";
import { Menu, CloseCircle } from "reicon-react";

export default function SiteHeader() {
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

  /* ── Track active section for nav highlight ── */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href")?.replace("#", "");
            if (href === id) {
              link.classList.add("nav-active");
              link.setAttribute("aria-current", "page");
            } else {
              link.classList.remove("nav-active");
              link.removeAttribute("aria-current");
            }
          });
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Close mobile nav on resize past breakpoint ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    ["work", "Work"],
    ["about", "About"],
    ["capabilities", "Capabilities"],
    ["process", "Process"],
    ["contact", "Contact"],
  ] as const;

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav
        className="site-nav"
        aria-label="Primary navigation"
        data-open={open ? "true" : "false"}
      >
        <a
          href="#hero"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src="/AI-favicon.svg" alt="" className="nav-logo" aria-hidden="true" /> Monograph
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
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
