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
  PlayCircle,
  Check,
  FileTerminal,
  ChevronUp,
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
    const main = document.querySelector("main");
    if (!main) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = main;
      const maxScroll = scrollHeight - clientHeight;
      setProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
    };

    main.addEventListener("scroll", handleScroll, { passive: true });
    return () => main.removeEventListener("scroll", handleScroll);
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
    { id: "honesty", label: "Skills" },
    { id: "build-logs", label: "Build Logs" },
    { id: "workflow", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  const activeId = useActiveSection(navItems.map((n) => n.id));

  return (
    <div className="min-h-screen h-screen relative overflow-x-hidden bg-[#070A0F] text-[#E5E7EB] selection:bg-[#164E63] selection:text-[#7DD3FC] flex flex-col lg:flex-row">
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
              src="/AI.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              className="w-6 h-6"
              aria-hidden="true"
            />
            <span>Anggie Irawan</span>
          </div>
          <kbd
            className="px-1.5 py-0.5 text-[10px] text-[#6B7280] border border-[#263241] rounded"
            aria-label="Press question mark for help"
          >
            ?
          </kbd>
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
        id="status"
        className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 lg:py-24 space-y-24 lg:space-y-32 lg:pr-12 lg:overflow-y-auto"
      >
        {/* Hero Section */}
        <section className="scroll-mt-28 lg:scroll-mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 lg:pt-0">
          <div className="space-y-8 hero-stagger">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D1117] border border-[#263241] rounded-sm text-[#9CA3AF] font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Learning by building</span>
            </div>

            <h1 className="text-[36px] sm:text-[42px] lg:text-5xl font-extrabold tracking-tight text-[#E5E7EB] leading-[1.1] font-sans text-balance">
              I started with zero coding background. Now I build small digital
              products with AI.
            </h1>

            <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-lg text-pretty">
              Since March 2026, I&apos;ve been learning by building — using AI
              as a coding partner to ship real products.
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

              <div className="space-y-3 font-mono text-xs lg:text-sm">
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
                    Build websites that work on all devices
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Design clean, modern interfaces
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Launch sites to the web
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" />{" "}
                    Fix common coding issues
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
                    Deep JS array manipulation
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    Complex state management
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    Advanced backend architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" />{" "}
                    Writing rigorous manual tests
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
                  <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                    A responsive portfolio site with Next.js and Tailwind. Built
                    to explain who I am without pretending to be senior.
                  </p>
                  <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 rounded-sm">
                    Lesson: Portfolio is not only design. It is positioning.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://anggieirawan.my.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-[#151B23] border border-[#263241] text-[#E5E7EB] font-sans font-medium text-xs transition-colors rounded-sm"
                    >
                      <PlayCircle className="w-4 h-4 text-[#7DD3FC]" /> Demo
                    </a>
                    <a
                      href="https://github.com/eiaiproject/Portofolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans font-medium text-xs transition-colors rounded-sm"
                    >
                      <Code2 className="w-4 h-4" /> Code
                    </a>
                  </div>
                </div>
              </article>

              {/* BUILD LOG 002 */}
              <article className="log-card log-card-prototype border border-[#263241] rounded-sm relative">
                <div className="absolute top-0 left-0 w-full h-px bg-[#78350F]" />
                <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FileTerminal className="w-4 h-4 text-[#FBBF24]" />
                    <span className="text-xs font-mono text-[#E5E7EB]">
                      LOG_002.md
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 bg-[#FBBF24]/10 text-[#FBBF24] font-mono text-[10px] border border-[#78350F] tracking-wider uppercase">
                    Prototype
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">
                    Expense Tracker Prototype
                  </h3>
                  <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed">
                    A simple app that tracks expenses using local storage. Built
                    to understand how data changes on a page.
                  </p>
                  <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 rounded-sm">
                    Lesson: Small apps teach more than passive tutorials.
                  </p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  name: "Share",
                  icon: Terminal,
                  desc: "Tell me your rough concept",
                },
                {
                  name: "Narrow",
                  icon: Hammer,
                  desc: "We pick one small thing to build",
                },
                { name: "Build", icon: Code2, desc: "I prototype with AI" },
                { name: "Fix", icon: Lightbulb, desc: "We improve what broke" },
                {
                  name: "Deliver",
                  icon: CheckCircle2,
                  desc: "You get the finished product",
                },
              ].map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center"
                  style={{ "--stagger": i } as React.CSSProperties}
                >
                  <div className="w-12 h-12 shrink-0 rounded-sm bg-[#070A0F] border border-[#263241] flex items-center justify-center transition-colors duration-200 hover:border-[#164E63] hover:bg-[#0D1117]">
                    <item.icon className="w-5 h-5 text-[#7DD3FC]" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#E5E7EB] text-sm font-sans">
                      {item.name}
                    </span>
                    <p className="text-xs text-[#6B7280] font-sans mt-1">
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

        {/* Contact Section */}
        <FadeIn>
          <section
            id="contact"
            className="scroll-mt-28 lg:scroll-mt-8 pt-12 pb-16 border-t border-[#263241]"
          >
            <div className="max-w-3xl mx-auto text-left lg:text-center space-y-8">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans text-xs rounded-sm">
                Open for Small Projects
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#E5E7EB] font-sans tracking-tight text-balance">
                Let&apos;s build something simple.
              </h2>
              <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-2xl mx-auto">
                Have a simple idea, messy concept, or early product thought?
                Send it to me. I&apos;ll help turn it into a clear interface or
                prototype.
              </p>

              <div className="flex justify-center pt-4">
                <a
                  href="mailto:irawananggie@gmail.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(22,78,99,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                  title="Opens your email app to send a message"
                >
                  <Mail className="w-4 h-4" />
                  Email Anggie
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
