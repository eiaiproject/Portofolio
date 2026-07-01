"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Terminal,
  Lightbulb,
  Hammer,
  CheckCircle2,
  Mail,
  Code2,
  ArrowRight,
  Check,
  PlayCircle,
  FileTerminal,
  ChevronUp,
  Layout,
  Package,
  Briefcase,
  BarChart,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { HelpOverlay } from "@/components/help-overlay";
import { FadeIn } from "@/components/fade-in";
import { MobileNav } from "@/components/mobile-nav";

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState("");
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const visibleSections = new Set<string>();

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      for (const id of sectionIds) {
        if (visibleSections.has(id)) {
          setActiveId(id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const ids = idsKey.split(",");
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[#0D1117] border border-[#263241] rounded-sm flex items-center justify-center text-[#7DD3FC] hover:bg-[#111827] hover:border-[#164E63] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] lg:hidden"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

function FirstVisitHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("help-hint-seen");
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 3000);
      const hideTimer = setTimeout(() => {
        setShow(false);
        localStorage.setItem("help-hint-seen", "true");
      }, 10000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#0D1117] border border-[#263241] rounded-sm font-mono text-xs text-[#9CA3AF] flex items-center gap-2 lg:hidden"
      role="status"
      aria-live="polite"
    >
      Press{" "}
      <kbd className="px-1.5 py-0.5 bg-[#111827] border border-[#263241] rounded text-[#7DD3FC] text-[10px]">
        ?
      </kbd>{" "}
      for keyboard shortcuts
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      setProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] lg:left-64"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#7DD3FC] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

export default function Page() {
  const navItems = [
    { id: "status", label: "Status" },
    { id: "services", label: "Services" },
    { id: "honesty", label: "Skills" },
    { id: "build-logs", label: "Build Logs" },
    { id: "workflow", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  const activeId = useActiveSection(navItems.map((n) => n.id));

  return (
    <div className="min-h-screen relative overflow-x-clip bg-[#070A0F] text-[#E5E7EB] selection:bg-[#164E63] selection:text-[#7DD3FC] flex flex-col lg:flex-row">
      {/* Mobile Navigation */}
      <MobileNav items={navItems} activeId={activeId} />

      {/* Desktop Navigation */}
      <nav
        aria-label="Site navigation"
        className="nav-sidebar hidden lg:flex w-64 shrink-0 border-r border-[#263241] bg-[#070A0F]/90 backdrop-blur-md z-40 sticky top-0 h-screen overflow-y-auto p-8 flex-col"
      >
        <div className="flex items-center justify-between mb-12 font-mono text-[#7DD3FC] font-bold tracking-wider text-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/AI-logo.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              className="w-6 h-6"
              aria-hidden="true"
            />
            <span>Anggie Irawan</span>
          </div>
        </div>
        <ul role="list" className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block px-4 py-3 rounded transition-all border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC] ${activeId === item.id ? "bg-[#111827] border-[#263241] text-[#E5E7EB]" : "border-transparent text-[#9CA3AF] hover:bg-[#111827] hover:text-[#E5E7EB] hover:border-[#263241]"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main
        className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 lg:py-24 space-y-24 lg:space-y-32 lg:pr-12"
      >
        {/* Hero Section */}
        <section id="status" className="scroll-mt-28 lg:scroll-mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 lg:pt-0">
          <div className="space-y-8 hero-stagger">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D1117] border border-[#263241] rounded-sm text-[#9CA3AF] font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Learning by building</span>
            </div>

            <h1 className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-5xl font-extrabold tracking-tight text-[#E5E7EB] leading-[1.1] font-sans text-balance">
              Hi, I&apos;m Anggie
              <br />
              I turn rough ideas into simple working web products.
            </h1>

            <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-lg text-pretty">
              I come from a non-IT background. Since March 2026, I&apos;ve been building landing pages, prototypes, dashboards, and small apps through AI-assisted development and learning by shipping.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
              <a
                href="#build-logs"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(22,78,99,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
              >
                <FileTerminal className="w-4 h-4" /> Explore Build Logs
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#111827] hover:bg-[#151B23] text-[#E5E7EB] font-sans font-medium border border-[#263241] text-sm rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#374151] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5E7EB]"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative hero-card-reveal">
            <div className="bg-[#0D1117] border border-[#263241] rounded-sm p-6 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent opacity-30" />

              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#263241]">
                <h2 className="font-mono text-[#E5E7EB] tracking-wide text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#164E63] flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#7DD3FC] rounded-full animate-pulse" />
                  </div>
                  Lab Status
                </h2>
              </div>

              <div className="space-y-3 font-mono text-xs lg:text-sm lab-status-rows">
                {[
                  ["Started", "March 2026"],
                  ["Background", "Non-IT"],
                  ["Approach", "Learning by building"],
                  ["Tool", "AI-assisted coding"],
                  ["Focus", "Simple web products"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline border-b border-[#263241]/60 pb-2"
                  >
                    <span className="text-[#6B7280]">{label}</span>
                    <span
                      className={
                        label === "Tool" ? "text-[#7DD3FC]" : "text-[#9CA3AF]"
                      }
                    >
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#6B7280]">Availability</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-[#0E7490]/10 text-[#7DD3FC] border border-[#164E63]/60 leading-none">
                    Open for small projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative border-t border-[#263241] pt-16"
        >
          <FadeIn>
            <div className="text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] font-sans tracking-tight text-balance">
                What I can build for you
              </h2>
              <p className="text-[#9CA3AF] leading-relaxed max-w-2xl text-lg font-sans text-pretty">
                I help non-technical founders, small businesses, and solo makers turn rough ideas into simple working web products.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0}>
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base mb-3 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-[#7DD3FC]" />
                  Landing Pages
                </h3>
                <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                  Clean, responsive pages for validating an idea, presenting a service, or collecting leads.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#7DD3FC]" />
                  MVP Prototypes
                </h3>
                <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                  Clickable or working early versions of an idea so you can test the flow before investing heavily.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#7DD3FC]" />
                  Personal Portfolios
                </h3>
                <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                  Professional portfolio sites that showcase your work, explain your offer, and make it easy to get in touch.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base mb-3 flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-[#7DD3FC]" />
                  Internal Tools & Dashboards
                </h3>
                <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                  Simple admin panels, dashboards, or internal tools to manage data, track metrics, or automate workflows.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={320}>
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#7DD3FC]" />
                  Progressive Web Apps
                </h3>
                <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                  Installable web apps that work offline, load instantly, and feel native - without app stores or complex deployment.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7DD3FC]" />
                  UI Cleanup & Iteration
                </h3>
                <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                  Improve an existing interface, fix responsiveness, polish interactions, or add missing features.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Skills Section */}
        <FadeIn>
          <section
            id="honesty"
            className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative border-t border-[#263241] pt-16"
          >
            <div className="text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] font-sans tracking-tight text-balance">
                Not a senior dev. A fast learner.
              </h2>
              <p className="text-[#9CA3AF] leading-relaxed max-w-2xl text-lg font-sans text-pretty">
                I don&apos;t pretend to be an expert. I build in public, learn
                fast, and use AI to turn ideas into working products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-medium text-sm mb-5 flex items-center gap-2 tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-[#7DD3FC]" /> What I can
                  do
                </h3>
                <ul className="space-y-3 text-sm text-[#9CA3AF] font-sans">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Ship responsive sites that work everywhere
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Turn rough ideas into clear, usable interfaces
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Deploy and ship with confidence
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Debug, refine, and polish AI-generated code
                  </li>
                </ul>
              </div>

              <div className="skill-card bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
                <h3 className="text-[#E5E7EB] font-sans font-medium text-sm mb-5 flex items-center gap-2 tracking-wide">
                  <Lightbulb className="w-4 h-4 text-[#FBBF24]" /> Still
                  learning
                </h3>
                <ul className="space-y-3 text-sm text-[#9CA3AF] font-sans">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    RESTful API design
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    Database schema design
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    Authentication systems
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    Server-side optimization
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Build Logs Section */}
        <FadeIn>
          <section
            id="build-logs"
            className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative pt-4 border-t border-[#263241]"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4 border-b border-[#263241]">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] tracking-tight font-sans text-balance">
                  Build Logs
                </h2>
                <p className="text-[#9CA3AF] mt-2 font-sans text-sm">
                  Experiments, failures, and lessons from the lab.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {/* BUILD LOG 001 */}
              <article className="log-card log-card-shipped border border-[#263241] rounded-sm relative">
                <div className="absolute top-0 left-0 w-full h-px bg-[#164E63]" />
                <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FileTerminal className="w-4 h-4 text-[#7DD3FC]" />
                    <span className="text-xs font-mono text-[#E5E7EB]">
                      LOG_001.md
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 bg-[#0E7490]/12 text-[#7DD3FC] font-mono text-[10px] border border-[#164E63] tracking-wider uppercase">
                    Shipped
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">
                    Personal Portfolio Website
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Problem:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Needed a professional web presence that honestly positions a non-IT builder without sounding amateur or over-claiming skills.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Solution:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Built a responsive portfolio with clear positioning, honest skills section, build logs, and process explanation. Dark theme with clean typography.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Stack:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Next.js 15, React 19, TypeScript, Tailwind CSS 4
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Role:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Design, development, copy, deployment
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 rounded-sm">
                    Lesson: Portfolio is not only design. It is positioning.
                  </p>
                </div>
              </article>

              {/* BUILD LOG 002 */}
              <article className="log-card log-card-shipped border border-[#263241] rounded-sm relative">
                <div className="absolute top-0 left-0 w-full h-px bg-[#164E63]" />
                <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FileTerminal className="w-4 h-4 text-[#7DD3FC]" />
                    <span className="text-xs font-mono text-[#E5E7EB]">
                      LOG_002.md
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 bg-[#0E7490]/12 text-[#7DD3FC] font-mono text-[10px] border border-[#164E63] tracking-wider uppercase">
                    Shipped
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">
                    Expend - Offline-First Expense & Debt Tracker
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Problem:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        People need simple expense tracking without complex setup, account creation, or privacy concerns about cloud storage.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Solution:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Built a private offline-first Progressive Web App for managing wallets, debts, budgets, and transactions. All data stored locally in IndexedDB. Works offline, installs like a native app, supports multiple languages.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Features:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Multi-wallet management, debt tracking with payment schedules, budget monitoring with alerts, transaction categorization, interactive charts, multi-currency support, PWA installable.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Stack:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Next.js, React, TypeScript, Tailwind CSS, IndexedDB, Recharts, PWA
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-[#7DD3FC] font-medium">Role:</span>
                      <p className="text-[#9CA3AF] font-sans leading-relaxed mt-1">
                        Product design, development, data modeling, UI/UX, deployment
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 rounded-sm">
                    Lesson: Local-first architecture teaches more about data modeling and state management than any API tutorial.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://expend.pages.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-[#151B23] border border-[#263241] text-[#E5E7EB] font-sans font-medium text-xs transition-colors rounded-sm"
                    >
                      <PlayCircle className="w-4 h-4 text-[#7DD3FC]" /> Demo
                    </a>
                    <a
                      href="https://github.com/eiaiproject/Expend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-[#151B23] border border-[#263241] text-[#E5E7EB] font-sans font-medium text-xs transition-colors rounded-sm"
                    >
                      <Code2 className="w-4 h-4" /> Code
                    </a>
                  </div>
                </div>
              </article>

              {/* BUILD LOG 003 */}
              <article className="log-card log-card-learning border border-[#263241] rounded-sm relative">
                <div className="absolute top-0 left-0 w-full h-px bg-[#263241]" />
                <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FileTerminal className="w-4 h-4 text-[#9CA3AF]" />
                    <span className="text-xs font-mono text-[#E5E7EB]">
                      LOG_003.md
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 bg-[#111827] text-[#9CA3AF] font-mono text-[10px] border border-[#263241] tracking-wider uppercase">
                    Learning
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">
                    Business Landing Page Concept
                  </h3>
                  <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                    A landing page concept focused on clear messaging. Built to
                    help a small business explain its offer.
                  </p>
                  <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 rounded-sm">
                    Lesson: Good landing pages are about clarity, not
                    decoration.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </FadeIn>

        {/* Process Section */}
        <FadeIn>
          <section
            id="workflow"
            className="scroll-mt-28 lg:scroll-mt-8 space-y-8 pt-16 border-t border-[#263241]"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-[11px] text-[#6B7280] tracking-wider uppercase">
                <FileTerminal className="w-4 h-4 text-[#FBBF24]" />
                <span>PROCESS.md</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] font-sans tracking-tight text-balance">
                How we work together
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Share",
                  icon: Terminal,
                  desc: "Tell me your rough concept",
                  color: "#7DD3FC",
                },
                {
                  name: "Narrow",
                  icon: Hammer,
                  desc: "We pick one small thing to build",
                  color: "#7DD3FC",
                },
                {
                  name: "Build",
                  icon: Code2,
                  desc: "I prototype with AI",
                  color: "#7DD3FC",
                },
                {
                  name: "Fix",
                  icon: Lightbulb,
                  desc: "We improve what broke",
                  color: "#FBBF24",
                },
                {
                  name: "Deliver",
                  icon: CheckCircle2,
                  desc: "You get the finished product",
                  color: "#7DD3FC",
                },
              ].map((item, i) => (
                <div
                  key={item.name}
                  className="log-card bg-[#0D1117] border border-[#263241] rounded-sm flex items-center gap-4 p-4 relative"
                  style={{ "--stagger": i } as React.CSSProperties}
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full rounded-sm"
                    style={{ backgroundColor: item.color, opacity: 0.5 }}
                  />
                  <div className="w-10 h-10 shrink-0 rounded-sm bg-[#070A0F] border border-[#263241] flex items-center justify-center">
                    <item.icon
                      className="w-4 h-4"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#E5E7EB] text-sm font-sans">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#6B7280] tracking-wider">
                        STEP_0{i + 1}
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] font-sans mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0D1117] border border-[#263241] p-4 rounded-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FBBF24] mt-0.5 shrink-0" />
              <p className="text-sm text-[#FBBF24] font-sans">
                I ship simple, clear v1s first. Over-engineering can wait.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Credibility Section */}
        <FadeIn>
          <section className="scroll-mt-28 lg:scroll-mt-8 space-y-8 pt-4 border-t border-[#263241]">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] font-sans tracking-tight text-balance">
                What makes this work
              </h2>
              <p className="text-[#9CA3AF] leading-relaxed max-w-2xl text-base font-sans">
                I use AI as a build partner, but I still shape the product direction, test the flows, refine the UI, and decide what ships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm space-y-3">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7DD3FC]" />
                  Best fit
                </h3>
                <ul className="space-y-2 text-sm text-[#9CA3AF] font-sans">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />
                    Simple MVPs and prototypes
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />
                    Landing pages and portfolios
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />
                    Small internal tools and dashboards
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />
                    Idea validation experiments
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />
                    UI cleanup and iteration
                  </li>
                </ul>
              </div>

              <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm space-y-3">
                <h3 className="text-[#E5E7EB] font-sans font-semibold text-base flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#FBBF24]" />
                  Beyond current skills
                </h3>
                <ul className="space-y-2 text-sm text-[#9CA3AF] font-sans">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />
                    Enterprise-grade systems
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />
                    Highly regulated products (finance, healthcare)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />
                    Complex backend infrastructure
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />
                    Security-critical systems without senior review
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />
                    Real-time multiplayer applications
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
              <div className="flex items-start gap-3">
                <Terminal className="w-5 h-5 text-[#7DD3FC] mt-0.5 shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-[#E5E7EB] font-sans font-semibold text-sm">
                    Tech I work with
                  </h3>
                  <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                    Next.js, React, TypeScript, Tailwind CSS, basic CRUD flows, local-first patterns, PWAs, responsive design, accessibility basics
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Contact Section */}
        <FadeIn>
          <section
            id="contact"
            className="scroll-mt-28 lg:scroll-mt-8 pt-12 pb-16 border-t border-[#263241]"
          >
            <div className="max-w-3xl mx-auto text-left lg:text-center space-y-8">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans text-xs rounded-sm">
                Available for Small Projects
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#E5E7EB] font-sans tracking-tight text-balance">
                Have a small idea you want to turn into a working product?
              </h2>
              <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-2xl mx-auto">
                Send me the idea, the goal, and the rough flow. I can help shape it into a simple web prototype or landing page.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href="mailto:irawananggie@gmail.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(22,78,99,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                  title="Opens your email app to send a message"
                >
                  <Mail className="w-4 h-4" />
                  Start a Conversation
                </a>
                <a
                  href="#build-logs"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111827] hover:bg-[#151B23] text-[#E5E7EB] border border-[#263241] font-sans font-medium text-sm rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#374151] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5E7EB]"
                >
                  <FileTerminal className="w-4 h-4" />
                  View My Work
                </a>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>

      <ScrollProgress />
      <BackToTop />
      <FirstVisitHint />
      <HelpOverlay />
    </div>
  );
}
