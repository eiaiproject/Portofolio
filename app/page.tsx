"use client";

/* eslint-disable @next/next/no-img-element -- onError handler needs <img>, Image component can't use onError pattern */

import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowRight } from "reicon-react";

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
  const emailLinkRef = useRef<HTMLAnchorElement>(null);
  const emailBtnRef = useRef<HTMLAnchorElement>(null);

  /* ── Hydrate email links on mount only (spam obfuscation) ── */
  useEffect(() => {
    const mailto = getMailto();
    const email = getEmail();
    if (emailLinkRef.current) {
      emailLinkRef.current.href = mailto;
      emailLinkRef.current.textContent = email;
    }
    if (emailBtnRef.current) emailBtnRef.current.href = mailto;
  }, []);

  /* ── Scroll reveal (fade + slide) ── */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="section hero" id="hero">
        <h1>
          <span>ANGGIE</span>
          <span className="accent-name">IRAWAN</span>
        </h1>
        <p className="hero-sub">AI-Assisted Product Builder</p>
        <p className="hero-tagline">
          &ldquo;I turn rough ideas into simple working web products.&rdquo;
        </p>
        <p className="hero-support">
          Landing pages, internal tools, and offline-first apps for small
          businesses, founders, and solo makers.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            View Selected Work
          </a>
          <a href="#contact" className="btn">
            Discuss a Project
          </a>
        </div>
        <div className="footer-note">
          <span>Est. March 2026</span>
          <span>Scroll to begin &darr;</span>
        </div>
      </section>

      {/* ═══ SELECTED WORK ═══ */}
      <section className="section" id="work" aria-labelledby="work-heading">
        <div className="section-meta">
          <span>01 / Selected Work</span>
          <span>Build Log</span>
        </div>
        <h2 id="work-heading" className="sr-only">
          Selected Work
        </h2>

        {/* ── Project 01: Expend ── */}
        <article className="project-content project-content-spaced reveal">
          <div className="editorial-copy">
            <span className="project-status">
              <span className="project-status-dot" aria-hidden="true" />
              Shipped
            </span>
            <h3 className="section-title section-title-large project-name">
              Expend
            </h3>
            <p className="project-subtitle">
              Offline-First Expense & Debt Tracker
            </p>
            <p className="dropcap">
              People need simple expense tracking without complex setup, account
              creation, or privacy concerns about cloud storage. Expend solves
              this by being a private, offline-first PWA.
            </p>
            <div className="project-highlights">
              <span className="project-highlight">Multi-wallet</span>
              <span className="project-highlight">Debt tracking</span>
              <span className="project-highlight">Budgets</span>
              <span className="project-highlight">Works offline</span>
            </div>
            <div className="project-lesson">
              &ldquo;Local-first architecture teaches more about data modeling
              and state management than any API tutorial.&rdquo;
            </div>
            <p className="project-tools">
              Stack: Next.js, React, TypeScript, Tailwind CSS, IndexedDB, Recharts, PWA
            </p>
            <a
              href="https://expend.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View Expend live app, opens in a new tab"
            >
              View Live App <ArrowUpRight size={16} weight="Outline" />
            </a>
          </div>
          <div className="visual-frame">
            <img
              src="/expend-hero.png"
              alt="Expend dashboard showing wallet balances, budget status, and recent transactions"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const placeholder = img.nextElementSibling as HTMLElement | null;
                if (placeholder) placeholder.style.display = "block";
              }}
            />
            <span className="placeholder-text" style={{ display: "none" }}>
              [ Expend Screenshot ]
            </span>
          </div>
        </article>

        {/* ── Project 02: Invois ── */}
        <article className="project-content project-content-spaced reveal project-invert">
          <div className="editorial-copy">
            <span className="project-status">
              <span className="project-status-dot" aria-hidden="true" /> Shipped
            </span>
            <h3 className="section-title section-title-large project-name">
              Invois
            </h3>
            <p className="project-subtitle">
              Offline-First Invoice & Receipt Maker
            </p>
            <p className="dropcap">
              Freelancers and small businesses need a fast way to create invoices
              and receipts without being locked into a server account or losing
              access when offline.
            </p>
            <div className="project-highlights">
              <span className="project-highlight">PDF export</span>
              <span className="project-highlight">Reusable clients</span>
              <span className="project-highlight">Auto-numbering</span>
              <span className="project-highlight">Works offline</span>
            </div>
            <div className="project-lesson">
              &ldquo;Document workflows need careful state rules: paid invoices,
              linked receipts, and local persistence all have to agree before the
              UI feels trustworthy.&rdquo;
            </div>
            <p className="project-tools">
              Stack: React, TypeScript, Vite, React Router, IndexedDB, jsPDF, PWA
            </p>
            <a
              href="https://invois.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View Invois live app, opens in a new tab"
            >
              View Live App <ArrowUpRight size={16} weight="Outline" />
            </a>
          </div>
          <div className="visual-frame">
            <img
              src="/invois-hero.png"
              alt="Invois app screen showing invoice creation form with client details and line items"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const placeholder = img.nextElementSibling as HTMLElement | null;
                if (placeholder) placeholder.style.display = "block";
              }}
            />
            <span className="placeholder-text" style={{ display: "none" }}>
              [ Invois Screenshot ]
            </span>
          </div>
        </article>

        {/* ── Project 03: Ledjer ── */}
        <article className="project-content reveal">
          <div className="editorial-copy">
            <span className="project-status">
              <span className="project-status-dot" aria-hidden="true" /> Active Development
            </span>
            <h3 className="section-title section-title-large project-name">
              Ledjer
            </h3>
            <p className="project-subtitle">
              Double-Entry Bookkeeping for UMKM
            </p>
            <p className="dropcap">
              Indonesian MSMEs need double-entry bookkeeping that follows local
              accounting standards (PSAK), supports multiple users, and runs on
              phones without spreadsheet complexity.
            </p>
            <div className="project-highlights">
              <span className="project-highlight">14 transaction types</span>
              <span className="project-highlight">Multi-tenant</span>
              <span className="project-highlight">Financial reports</span>
              <span className="project-highlight">Stock management</span>
            </div>
            <div className="project-lesson">
              &ldquo;Rigid financial systems need database-level validation to
              guarantee data integrity regardless of frontend state.&rdquo;
            </div>
            <p className="project-tools">
              Stack: React 19, Vite, Tailwind CSS 4, React Router 7, TanStack
              Query 5, Supabase, PostgreSQL
            </p>
            <a
              href="https://ledjer.id"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View Ledjer current build, opens in a new tab"
            >
              View Current Build <ArrowUpRight size={16} weight="Outline" />
            </a>
          </div>
          <div className="visual-frame">
            <img
              src="/ledjer-hero.png"
              alt="Ledjer bookkeeping dashboard showing financial records and accounting interface"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const placeholder = img.nextElementSibling as HTMLElement | null;
                if (placeholder) placeholder.style.display = "block";
              }}
            />
            <span className="placeholder-text" style={{ display: "none" }}>
              [ Ledjer Screenshot ]
            </span>
          </div>
        </article>
      </section>

      {/* ═══ MID-PAGE CTA ═══ */}
      <section className="section cta-section reveal" id="cta-mid">
        <p>Have a similar idea? Let&rsquo;s narrow it into a small, testable v1.</p>
        <a href="#contact" className="btn btn-primary">
          Discuss a Project
        </a>
      </section>

      {/* ═══ MANIFESTO / ABOUT ═══ */}
      <section className="section" id="about">
        <div className="section-meta">
          <span>02 / Manifesto</span>
          <span>Learning by Building</span>
        </div>
        <p className="manifesto-pull reveal">
          From non-IT background to <em>shipping</em> products.
        </p>
        <div className="manifesto-body reveal">
          <p>
            I come from a non-IT background. Since March 2026, I&apos;ve been
            building landing pages, prototypes, dashboards, and small apps
            through AI-assisted development and learning by shipping.
          </p>
          <p>
            The approach is straightforward: understand the problem, limit the
            scope, build the version that works, test the important paths, fix
            weak spots, and ship something usable. AI helps accelerate
            exploration and implementation, but product decisions, scope
            validation, and quality control stay deliberate and hands-on.
          </p>
          <p>
            The work here is still small and practical by design. Each project
            is a real tool built for a real need.
          </p>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="section" id="capabilities" aria-labelledby="services-heading">
        <div className="section-meta">
          <span>03 / Capabilities</span>
          <span>What I can build</span>
        </div>
        <h2
          className="section-title section-title-medium section-heading-narrow reveal"
          id="services-heading"
        >
          Services.
        </h2>
        <div className="capabilities-grid reveal">
          <article className="capability-card">
            <span className="num" aria-hidden="true">01</span>
            <h3>Landing Pages & MVPs</h3>
            <p className="cap-desc">
              Responsive pages and focused prototypes for validating a product
              idea quickly.
            </p>
            <p className="cap-examples">
              For: founders testing concepts, small business launches
            </p>
          </article>
          <article className="capability-card">
            <span className="num" aria-hidden="true">02</span>
            <h3>Internal Tools & Dashboards</h3>
            <p className="cap-desc">
              Simple admin panels, CRUD workflows, and operational data tracking
              for teams.
            </p>
            <p className="cap-examples">
              For: operations teams, data entry, small orgs
            </p>
          </article>
          <article className="capability-card">
            <span className="num" aria-hidden="true">03</span>
            <h3>Offline-First PWAs</h3>
            <p className="cap-desc">
              Installable web apps that keep essential workflows available
              without a constant connection.
            </p>
            <p className="cap-examples">
              For: field workers, mobile-first use cases, privacy-sensitive apps
            </p>
          </article>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="section" id="process" aria-labelledby="workflow-heading">
        <div className="section-meta">
          <span>04 / Process</span>
          <span>How we work together</span>
        </div>
        <h2
          className="section-title section-title-medium section-heading-narrow reveal"
          id="workflow-heading"
        >
          The Workflow.
        </h2>
        <div className="process-track reveal">
          <div className="process-step">
            <div className="step-num">01 / SHARE</div>
            <h3>Idea</h3>
            <p>You send the idea, goal, and rough flow.</p>
            <p className="step-detail">
              A short conversation, a sketch, or a reference. No formal
              requirements needed.
            </p>
          </div>
          <div className="process-step">
            <div className="step-num">02 / NARROW</div>
            <h3>Scope</h3>
            <p>We define one focused version to build first.</p>
            <p className="step-detail">
              One screen, one flow, one job to do well. Everything else waits
              for v2.
            </p>
          </div>
          <div className="process-step">
            <div className="step-num">03 / BUILD</div>
            <h3>Prototype</h3>
            <p>I turn the agreed flow into a working product.</p>
            <p className="step-detail">
              Built with AI-assisted coding. No boilerplate, no unnecessary
              abstractions.
            </p>
          </div>
          <div className="process-step">
            <div className="step-num">04 / REVIEW</div>
            <h3>Test</h3>
            <p>We test the important paths and fix weak spots.</p>
            <p className="step-detail">
              You try it. We find rough edges. I tighten them.
            </p>
          </div>
          <div className="process-step">
            <div className="step-num">05 / DELIVER</div>
            <h3>Ship</h3>
            <p>You receive the finished page, prototype, or application.</p>
            <p className="step-detail">
              Deployed and ready to use. No ongoing commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / FINAL CTA ═══ */}
      <section className="section section-accent contact-section" id="contact">
        <p className="colophon">Colophon — End of Monograph Vol. 01</p>
        <h2>
          LET&rsquo;S
          <br />
          SHIP V1.
        </h2>
        <div className="contact-actions">
          <a ref={emailBtnRef} className="btn">
            Reach Me <ArrowRight size={16} weight="Outline" />
          </a>
        </div>
      </section>

    </>
  );
}
