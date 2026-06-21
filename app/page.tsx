"use client";

import { useState, useEffect } from "react";
import { Terminal, Lightbulb, Hammer, CheckCircle2, Mail, Code2, ArrowRight, PlayCircle, Map, Check, FlaskConical, FileTerminal, ChevronUp } from "lucide-react";
import { HelpOverlay } from "@/components/help-overlay";
import { FadeIn } from "@/components/fade-in";
import { MobileNav } from "@/components/mobile-nav";

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState("");

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

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

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

export default function Page() {
  const navItems = [
    { id: "status", label: "Status" },
    { id: "honesty", label: "Skills" },
    { id: "build-logs", label: "Build Logs" },
    { id: "workflow", label: "Process" },
    { id: "how-to-work", label: "Work Together" },
    { id: "contact", label: "Contact" },
  ];

  const activeId = useActiveSection(navItems.map((n) => n.id));

  return (
    <div className="min-h-screen h-screen relative overflow-x-hidden bg-[#070A0F] text-[#E5E7EB] selection:bg-[#164E63] selection:text-[#7DD3FC] flex flex-col lg:flex-row">
      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#263241_1px,transparent_1px),linear-gradient(to_bottom,#263241_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Mobile Navigation */}
      <MobileNav items={navItems} activeId={activeId} />

      {/* Desktop Navigation */}
      <nav aria-label="Lab index" className="hidden lg:flex w-64 shrink-0 border-r border-[#263241] bg-[#070A0F]/90 backdrop-blur-md z-40 sticky top-0 h-screen overflow-y-auto p-8 flex-col">
        <div className="flex items-center justify-between mb-12 font-mono text-[#7DD3FC] font-bold tracking-wider text-sm">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-5 h-5" />
            <span>Lab Index</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] text-[#6B7280] border border-[#263241] rounded" aria-label="Press question mark for help">?</kbd>
        </div>
        <ul role="list" className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={`block px-4 py-3 rounded transition-all border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC] ${activeId === item.id ? "bg-[#111827] border-[#263241] text-[#E5E7EB]" : "border-transparent text-[#9CA3AF] hover:bg-[#111827] hover:text-[#E5E7EB] hover:border-[#263241]"}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="status" className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 lg:py-24 space-y-24 lg:space-y-32 lg:pr-12 lg:overflow-y-auto">
        
        {/* Hero Section */}
        <section className="scroll-mt-28 lg:scroll-mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 lg:pt-0">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D1117] border border-[#263241] rounded-sm text-[#9CA3AF] font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Learning by building</span>
            </div>
            
            <h1 className="text-[36px] sm:text-[42px] lg:text-5xl font-bold tracking-tight text-[#E5E7EB] leading-[1.1] font-sans" style={{textWrap: 'balance'}}>
              I started with zero coding background. Now I build small digital products with AI.
            </h1>
            
            <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-lg" style={{textWrap: 'pretty'}}>
              Since March 2026, I&apos;ve been learning by building — using AI as a coding partner to turn confusion into prompts, prompts into prototypes, and prototypes into real learning.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
              <a href="#build-logs" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
                <FileTerminal className="w-4 h-4" /> Explore Build Logs
              </a>
              <a href="#contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#111827] hover:bg-[#151B23] text-[#E5E7EB] font-sans font-medium border border-[#263241] text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5E7EB]">
                Send Mission <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative">
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
                  <div key={label} className="flex justify-between items-baseline border-b border-[#263241]/60 pb-2">
                    <span className="text-[#6B7280]">{label}</span>
                    <span className={label === "Tool" ? "text-[#7DD3FC]" : "text-[#9CA3AF]"}>{value}</span>
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
        <section id="honesty" className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative border-t border-[#263241] pt-16">
          <div className="text-left space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] font-sans tracking-tight" style={{textWrap: 'balance'}}>Not a senior dev. A fast learner.</h2>
            <p className="text-[#9CA3AF] leading-relaxed max-w-2xl text-lg font-sans" style={{textWrap: 'pretty'}}>
              I don&apos;t pretend to be an expert. I build in public, learn fast, and use AI to turn ideas into working products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
              <h3 className="text-[#E5E7EB] font-sans font-semibold text-sm mb-5 flex items-center gap-2 tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-[#7DD3FC]" /> What I can do
              </h3>
              <ul className="space-y-3 text-sm text-[#9CA3AF] font-sans">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> Build websites that work on all devices</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> Design clean, modern interfaces</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> Launch sites to the web</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> Fix common coding issues</li>
              </ul>
            </div>
            
            <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
              <h3 className="text-[#E5E7EB] font-sans font-medium text-sm mb-5 flex items-center gap-2 tracking-wide">
                <Lightbulb className="w-4 h-4 text-[#FBBF24]" /> Still learning
              </h3>
              <ul className="space-y-3 text-sm text-[#9CA3AF] font-sans">
                <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" /> Deep JS array manipulation</li>
                <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" /> Complex state management</li>
                <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" /> Advanced backend architecture</li>
                <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm" /> Writing rigorous manual tests</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
            <h3 className="text-[#E5E7EB] font-sans font-medium text-sm mb-4 flex items-center gap-2 tracking-wide">
              <Terminal className="w-4 h-4 text-[#9CA3AF]" /> How I use AI
            </h3>
            <p className="text-sm text-[#9CA3AF] font-sans leading-relaxed" style={{textWrap: 'pretty'}}>
              AI helps me write code faster and explains errors when I&apos;m stuck. I make all the design, layout, and content decisions.
            </p>
          </div>
        </section>
        </FadeIn>

        {/* Build Logs Section */}
        <FadeIn>
        <section id="build-logs" className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative pt-8 border-t border-[#263241]">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4 border-b border-[#263241]">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] tracking-tight font-sans" style={{textWrap: 'balance'}}>Build Logs</h2>
              <p className="text-[#9CA3AF] mt-2 font-sans text-sm">Experiments, failures, and lessons from the lab.</p>
            </div>
          </div>

          <div className="space-y-10">
            {/* BUILD LOG 001 */}
            <article className="bg-[#0D1117] border border-[#263241] rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-[#164E63]" />
              <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                 <div className="flex items-center gap-3">
                   <FileTerminal className="w-4 h-4 text-[#7DD3FC]" />
                   <span className="text-xs font-mono text-[#E5E7EB]">LOG_001.md</span>
                 </div>
                 <span className="inline-flex items-center px-2 py-0.5 bg-[#0E7490]/12 text-[#7DD3FC] font-mono text-[10px] border border-[#164E63] tracking-wider uppercase">Shipped</span>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">Personal Portfolio Website</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2">The idea</div>
                      <div className="bg-[#070A0F] p-4 border-l-2 border-[#263241] text-sm text-[#9CA3AF] font-sans leading-relaxed">
                        &quot;I need a page that explains who I am without pretending to be senior.&quot;
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2">What I built</div>
                      <div className="text-sm text-[#E5E7EB] font-sans leading-relaxed">
                        A responsive portfolio site with Next.js and Tailwind.
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#070A0F] p-6 border border-[#263241] rounded-sm space-y-4">
                    <div className="flex items-center gap-2 text-[#6B7280] border-b border-[#263241] pb-3">
                       <Map className="w-4 h-4" />
                       <span className="text-[10px] font-mono uppercase tracking-widest">Lesson Learned</span>
                    </div>
                    <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 border-l-2 border-[#78350F]">
                      &quot;Portfolio is not only design. It is positioning.&quot;
                    </p>
                    <div className="flex gap-3 pt-4">
                       <a href="https://portfolio.example.com" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-[#111827] hover:bg-[#151B23] border border-[#263241] text-[#E5E7EB] font-sans font-medium text-xs transition-colors rounded-sm">
                         <PlayCircle className="w-4 h-4 text-[#7DD3FC]" /> Demo
                       </a>
                       <a href="https://github.com/eiaiproject/Portofolio" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-transparent hover:bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans font-medium text-xs transition-colors rounded-sm">
                         <Code2 className="w-4 h-4" /> Code
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* BUILD LOG 002 */}
            <article className="bg-[#0D1117] border border-[#263241] rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-[#78350F]" />
              <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                 <div className="flex items-center gap-3">
                   <FileTerminal className="w-4 h-4 text-[#FBBF24]" />
                   <span className="text-xs font-mono text-[#E5E7EB]">LOG_002.md</span>
                 </div>
                 <span className="inline-flex items-center px-2 py-0.5 bg-[#FBBF24]/10 text-[#FBBF24] font-mono text-[10px] border border-[#78350F] tracking-wider uppercase">Prototype</span>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">Expense Tracker Prototype</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2">The idea</div>
                      <div className="bg-[#070A0F] p-4 border-l-2 border-[#263241] text-sm text-[#9CA3AF] font-sans leading-relaxed">
                        &quot;I want to understand how data changes on a page.&quot;
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2">What I built</div>
                      <div className="text-sm text-[#E5E7EB] font-sans leading-relaxed">
                        A simple app that tracks expenses using local storage.
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#070A0F] p-6 border border-[#263241] rounded-sm space-y-4">
                    <div className="flex items-center gap-2 text-[#6B7280] border-b border-[#263241] pb-3">
                       <Map className="w-4 h-4" />
                       <span className="text-[10px] font-mono uppercase tracking-widest">Lesson Learned</span>
                    </div>
                    <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 border-l-2 border-[#78350F]">
                      &quot;Small apps teach more than passive tutorials.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* BUILD LOG 003 */}
            <article className="bg-[#0D1117] border border-[#263241] rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-[#263241]" />
              <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                 <div className="flex items-center gap-3">
                   <FileTerminal className="w-4 h-4 text-[#9CA3AF]" />
                   <span className="text-xs font-mono text-[#E5E7EB]">LOG_003.md</span>
                 </div>
                 <span className="inline-flex items-center px-2 py-0.5 bg-[#111827] text-[#9CA3AF] font-mono text-[10px] border border-[#263241] tracking-wider uppercase">Learning</span>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl text-[#E5E7EB] font-semibold font-sans">Business Landing Page Concept</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2">The idea</div>
                      <div className="bg-[#070A0F] p-4 border-l-2 border-[#263241] text-sm text-[#9CA3AF] font-sans leading-relaxed">
                        &quot;I want to help a small business explain its offer clearly.&quot;
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2">What I built</div>
                      <div className="text-sm text-[#E5E7EB] font-sans leading-relaxed">
                        A landing page concept focused on clear messaging.
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#070A0F] p-6 border border-[#263241] rounded-sm space-y-4">
                    <div className="flex items-center gap-2 text-[#6B7280] border-b border-[#263241] pb-3">
                       <Map className="w-4 h-4" />
                       <span className="text-[10px] font-mono uppercase tracking-widest">Lesson Learned</span>
                    </div>
                    <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed bg-[#FBBF24]/10 p-4 border-l-2 border-[#78350F]">
                      &quot;Good landing pages are about clarity, not decoration.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        </FadeIn>

        {/* Workflow Section */}
        <FadeIn>
        <section id="workflow" className="scroll-mt-28 lg:scroll-mt-8 space-y-8 pt-16 border-t border-[#263241]">
          <div className="border-b border-[#263241] pb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] font-sans tracking-tight" style={{textWrap: 'balance'}}>How I work</h2>
            <p className="text-[#9CA3AF] mt-2 font-sans text-sm">Idea → Build → Learn</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Idea", icon: Terminal, desc: "You share a rough concept" },
              { name: "Build", icon: Hammer, desc: "I prototype it with AI" },
              { name: "Test", icon: Code2, desc: "We try it and find issues" },
              { name: "Fix", icon: Lightbulb, desc: "We improve what broke" },
              { name: "Learn", icon: CheckCircle2, desc: "Document what worked" },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
                <div className="w-12 h-12 shrink-0 rounded-sm bg-[#070A0F] border border-[#263241] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#7DD3FC]" />
                </div>
                <div>
                  <span className="font-medium text-[#E5E7EB] text-sm font-sans">{item.name}</span>
                  <p className="text-xs text-[#6B7280] font-sans mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        </FadeIn>

        {/* How to Work Together */}
        <FadeIn>
        <section id="how-to-work" className="scroll-mt-28 lg:scroll-mt-8 border border-[#263241] rounded-sm bg-[#070A0F] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] mb-6 font-sans tracking-tight" style={{textWrap: 'balance'}}>How we work together</h2>
            
            <ol className="space-y-4 sm:space-y-6">
              {[
                { title: "Share your idea", desc: "Tell me your rough concept or problem." },
                { title: "Narrow the scope", desc: "We pick one small, focused thing to build." },
                { title: "First version", desc: "I build a quick prototype with AI help." },
                { title: "Test and improve", desc: "We try it, find issues, and fix them." },
                { title: "Deliver", desc: "You get the finished product." }
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 sm:gap-4">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-[#0D1117] border border-[#263241] flex items-center justify-center font-mono text-xs text-[#7DD3FC]">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-sans font-semibold text-sm text-[#E5E7EB]">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-[#6B7280] font-sans mt-1">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            
            <div className="mt-8 bg-[#FBBF24]/10 border border-[#78350F] p-4 rounded-sm flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-[#FBBF24] mt-0.5 shrink-0" />
               <p className="text-sm text-[#FBBF24] font-sans">I prefer simple, clear, useful initial prototypes over over-engineered systems. Let&apos;s start with v1.</p>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Contact Section */}
        <FadeIn>
        <section id="contact" className="scroll-mt-28 lg:scroll-mt-8 py-16 border-t border-[#263241]">
          <div className="max-w-3xl mx-auto text-left lg:text-center space-y-8">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans text-xs rounded-sm">
               Open for Small Projects
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#E5E7EB] font-sans tracking-tight" style={{textWrap: 'balance'}}>Send me a small mission.</h2>
            <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-2xl mx-auto">
              Have a simple idea, messy concept, or early product thought? Send it to me. I&apos;ll help turn it into a clear interface or prototype.
            </p>
            
            <div className="flex justify-center pt-4">
              <a href="mailto:irawananggie@gmail.com" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]" title="Opens your email app to send a message">
                <Mail className="w-4 h-4" />
                Email Anggie
              </a>
            </div>
          </div>
        </section>
        </FadeIn>

      </main>

      <BackToTop />
      <HelpOverlay />
    </div>
  );
}
