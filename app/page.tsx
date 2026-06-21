import { Terminal, Lightbulb, Hammer, CheckCircle2, Mail, Github, Linkedin, MessageCircle, Code2, ArrowRight, ExternalLink, PlayCircle, Map, Lock, Network, Check, FlaskConical, FileTerminal } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const navItems = [
    { id: "status", num: "01", label: "Status" },
    { id: "honesty", num: "02", label: "Honesty" },
    { id: "build-logs", num: "03", label: "Build Logs" },
    { id: "workflow", num: "04", label: "Workflow" },
    { id: "skill-map", num: "05", label: "Skill Map" },
    { id: "how-to-work", num: "06", label: "How to Work" },
    { id: "missions", num: "07", label: "Missions" },
    { id: "contact", num: "08", label: "Contact" },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#070A0F] text-[#E5E7EB] selection:bg-[#164E63] selection:text-[#7DD3FC] flex flex-col lg:flex-row">
      {/* Blueprint Grid Background - Extremely subtle */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#263241_1px,transparent_1px),linear-gradient(to_bottom,#263241_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none"></div>

      {/* Lab Index Navigation */}
      <nav className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-[#263241] bg-[#070A0F]/90 backdrop-blur-md z-40 sticky top-0 lg:self-start lg:h-dvh lg:overflow-y-auto p-3 lg:p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-3 lg:mb-12 font-mono text-[#7DD3FC] font-bold tracking-wider text-sm">
          <FlaskConical className="w-5 h-5" />
          <span>Lab Index</span>
        </div>
        <div className="relative w-full">
          <ul className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 hide-scrollbar w-full relative z-10">
            {navItems.map(item => (
              <li key={item.id} className="shrink-0">
                <a href={`#${item.id}`} className="group flex items-center gap-3 p-2 lg:px-4 lg:py-3 rounded hover:bg-[#111827] focus-visible:bg-[#111827] transition-all border border-transparent hover:border-[#263241] focus-visible:border-[#263241] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC]">
                  <span className="font-mono text-xs text-[#6B7280] group-hover:text-[#7DD3FC] transition-colors">{item.num}</span>
                  <span className="font-sans text-sm text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors tracking-wide whitespace-nowrap lg:whitespace-normal">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {/* Subtle mobile swipe indicator */}
          <div className="lg:hidden absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[#070A0F] to-transparent pointer-events-none flex items-center justify-end z-20">
              <span className="text-[10px] font-sans text-[#6B7280] opacity-80 mr-1 pb-1">Swipe →</span>
          </div>
        </div>
        
        {/* Decorative corner */}
        <div className="hidden lg:block absolute bottom-8 left-8 text-[#6B7280] font-mono text-[10px]">
          v1.0.6
        </div>
      </nav>

      <main className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 lg:py-24 space-y-24 lg:space-y-32 lg:pr-12">
        
        {/* 01. Hero Section (Status) */}
        <section id="status" className="scroll-mt-28 lg:scroll-mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 lg:pt-0">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D1117] border border-[#263241] rounded-sm text-[#9CA3AF] font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Status: Learning by Shipping</span>
            </div>
            
            <h1 className="text-[32px] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#E5E7EB] leading-[1.15] font-sans">
              I started with zero coding background. Now I build small digital products with AI.
            </h1>
            
            <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-lg">
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
            {/* Status Dashboard Panel */}
            <div className="bg-[#0D1117] border border-[#263241] rounded-sm p-6 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent opacity-30"></div>
              
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#263241]">
                <h2 className="font-mono text-[#E5E7EB] tracking-wide text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#164E63] flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#7DD3FC] rounded-full animate-pulse"></div>
                  </div>
                  System Status
                </h2>
                <span className="font-mono text-[10px] text-[#6B7280]">v1.0.6</span>
              </div>
              
              <div className="space-y-4 font-mono text-xs lg:text-sm">
                <div className="flex justify-between items-baseline border-b border-[#263241] pb-2">
                  <span className="text-[#6B7280]">Started</span>
                  <span className="text-[#E5E7EB]">March 2026</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#263241] pb-2">
                  <span className="text-[#6B7280]">Background</span>
                  <span className="text-[#E5E7EB]">Non-IT</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#263241] pb-2">
                  <span className="text-[#6B7280]">Current Mode</span>
                  <span className="text-[#E5E7EB]">Learning by Shipping</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#263241] pb-2">
                  <span className="text-[#6B7280]">Main Tool</span>
                  <span className="text-[#7DD3FC]">AI-assisted coding</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#263241] pb-2">
                  <span className="text-[#6B7280]">Focus</span>
                  <span className="text-[#E5E7EB]">Simple web products</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#6B7280]">Availability</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-[#0E7490]/12 text-[#7DD3FC] border border-[#164E63] leading-none">
                    Open for small projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. Honesty Section */}
        <section id="honesty" className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative border-t border-[#263241] pt-16">
          <div className="absolute top-0 right-0 py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 text-[10px] font-mono text-[#9CA3AF] rounded-b-sm">SECTION_02</div>
          <div className="text-left space-y-4">
            <h2 className="text-3xl font-semibold text-[#E5E7EB] font-sans tracking-tight">Not a Senior Dev. A Fast Learner.</h2>
            <p className="text-[#9CA3AF] leading-relaxed max-w-2xl text-lg font-sans">
              I&apos;m not pretending to be a senior engineer. I&apos;m building in public, learning fast, and using AI to close the gap between idea and execution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
              <h3 className="text-[#E5E7EB] font-sans font-semibold text-sm mb-5 flex items-center gap-2 tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-[#7DD3FC]" /> Can do now
              </h3>
              <ul className="space-y-4 text-sm text-[#9CA3AF] font-sans">
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">01</span><span className="leading-snug">Build responsive single-page apps</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">02</span><span className="leading-snug">Design clean, modern interfaces</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">03</span><span className="leading-snug">Deploy to production environments</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">04</span><span className="leading-snug">Debug common React & Tailwind issues</span></li>
              </ul>
            </div>
            
            <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
              <h3 className="text-[#E5E7EB] font-sans font-medium text-sm mb-5 flex items-center gap-2 tracking-wide">
                <Lightbulb className="w-4 h-4 text-[#FBBF24]" /> Still learning
              </h3>
              <ul className="space-y-4 text-sm text-[#9CA3AF] font-sans">
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">01</span><span className="leading-snug">Deep JS array manipulation</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">02</span><span className="leading-snug">Complex state management</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">03</span><span className="leading-snug">Advanced backend architecture</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">04</span><span className="leading-snug">Writing rigorous manual tests</span></li>
              </ul>
            </div>
            
            <div className="bg-[#0D1117] border border-[#263241] p-6 rounded-sm">
              <h3 className="text-[#E5E7EB] font-sans font-medium text-sm mb-5 flex items-center gap-2 tracking-wide">
                <Terminal className="w-4 h-4 text-[#9CA3AF]" /> AI Workflow
              </h3>
              <ul className="space-y-4 text-sm text-[#9CA3AF] font-sans">
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">01</span><span className="leading-snug">As a pair programmer for structure</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">02</span><span className="leading-snug">To explain confusing error messages</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">03</span><span className="leading-snug">To turn pseudocode into real logic</span></li>
                <li className="flex items-start gap-3"><span className="text-[#6B7280] font-mono mt-0.5 text-xs">04</span><span className="leading-snug">I make the design formatting choices</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 03. Build Logs Section */}
        <section id="build-logs" className="scroll-mt-28 lg:scroll-mt-8 space-y-12 relative pt-8 border-t border-[#263241]">
          <div className="absolute top-0 right-0 py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 text-[10px] font-mono text-[#9CA3AF] rounded-b-sm">SECTION_03</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4 border-b border-[#263241]">
            <div>
              <h2 className="text-3xl font-semibold text-[#E5E7EB] tracking-tight font-sans">Build Logs</h2>
              <p className="text-[#9CA3AF] mt-2 font-sans text-sm">Experiments, failures, and lessons from the lab.</p>
            </div>
            <div className="font-mono text-xs text-[#6B7280] bg-[#0D1117] border border-[#263241] px-3 py-1.5 rounded-sm w-fit">
              /logs/experiments
            </div>
          </div>

          <div className="space-y-10">
            {/* BUILD LOG 001 */}
            <div className="bg-[#0D1117] border border-[#263241] rounded-sm relative shadow-xl focus-within:ring-1 focus-within:ring-[#164E63] transition-all">
              <div className="absolute top-0 left-0 w-full h-px bg-[#164E63]"></div>
              {/* File Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                 <div className="flex items-center gap-3">
                   <FileTerminal className="w-4 h-4 text-[#7DD3FC]" />
                   <span className="text-xs font-mono text-[#E5E7EB]">LOG_001.md</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="inline-flex items-center px-2 py-0.5 bg-[#0E7490]/12 text-[#7DD3FC] font-mono text-[10px] border border-[#164E63] tracking-wider uppercase">Shipped</span>
                 </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                <header>
                  <h3 className="text-2xl text-[#E5E7EB] font-semibold font-sans">Personal Portfolio Website</h3>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-8">
                    {/* Input */}
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2 tracking-wide">Input / Idea</div>
                      <div className="bg-[#070A0F] p-4 border-l-2 border-[#263241] text-sm text-[#9CA3AF] font-sans leading-relaxed">
                        &quot;I need a page that explains who I am without pretending to be senior.&quot;
                      </div>
                    </div>
                    {/* Output */}
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2 tracking-wide">Output / Result</div>
                      <div className="text-sm text-[#E5E7EB] font-sans leading-relaxed pt-1">
                        A responsive, single-page portfolio built with Next.js and Tailwind.
                      </div>
                    </div>

                    {/* Secondary details */}
                    <details className="group pt-6 border-t border-[#263241]">
                      <summary className="text-[10px] font-mono text-[#6B7280] mb-4 uppercase cursor-pointer hover:text-[#9CA3AF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC] inline-flex items-center gap-2">
                        <span>Show Process Details</span>
                      </summary>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                        <div>
                          <div className="text-[10px] font-mono text-[#6B7280] mb-1 uppercase">AI Assistance</div>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">Generated layout ideas, helped debug Tailwind, and refined section structure.</p>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-[#6B7280] mb-1 uppercase">Human Decisions</div>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">Chose the story, edited the copy, tested the flow, and simplified the UI.</p>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-6 bg-[#070A0F] p-6 border border-[#263241] rounded-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-[#6B7280] border-b border-[#263241] pb-3">
                         <Map className="w-4 h-4" />
                         <span className="text-[10px] font-mono uppercase tracking-widest relative top-px">Lesson Learned</span>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-[#6B7280] mb-1">What broke first:</div>
                        <p className="text-sm text-[#9CA3AF] line-through decoration-[#263241]">Generic hero, weak project mockup, and unclear uniqueness.</p>
                      </div>
                      
                      <div>
                        <div className="text-xs font-mono text-[#FBBF24] mb-2 mt-4">The Real Lesson:</div>
                        <div className="bg-[#FBBF24]/10 p-4 border-l-2 border-[#78350F]">
                          <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed">&quot;Portfolio is not only design. It is positioning.&quot;</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 w-full">
                       <a href="#" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-[#111827] hover:bg-[#151B23] border border-[#263241] text-[#E5E7EB] font-sans font-medium text-xs transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
                         <PlayCircle className="w-4 h-4 text-[#7DD3FC]" /> Live Demo
                       </a>
                       <a href="#" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-transparent hover:bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans font-medium text-xs transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
                         <Code2 className="w-4 h-4" /> View Code
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BUILD LOG 002 */}
            <div className="bg-[#0D1117] border border-[#263241] rounded-sm relative shadow-xl focus-within:ring-1 focus-within:ring-[#78350F] transition-all">
              <div className="absolute top-0 left-0 w-full h-px bg-[#78350F]"></div>
              {/* File Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                 <div className="flex items-center gap-3">
                   <FileTerminal className="w-4 h-4 text-[#FBBF24]" />
                   <span className="text-xs font-mono text-[#E5E7EB]">LOG_002.md</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="inline-flex items-center px-2 py-0.5 bg-[#FBBF24]/10 text-[#FBBF24] font-mono text-[10px] border border-[#78350F] tracking-wider uppercase">Prototype</span>
                 </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                <header>
                  <h3 className="text-2xl text-[#E5E7EB] font-semibold font-sans">Expense Tracker Prototype</h3>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-8">
                    {/* Input */}
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2 tracking-wide">Input / Idea</div>
                      <div className="bg-[#070A0F] p-4 border-l-2 border-[#263241] text-sm text-[#9CA3AF] font-sans leading-relaxed">
                        &quot;I want to understand how data changes on a page.&quot;
                      </div>
                    </div>
                    {/* Output */}
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2 tracking-wide">Output / Result</div>
                      <div className="text-sm text-[#E5E7EB] font-sans leading-relaxed pt-1">
                        A simple logic-focused prototype managing state with localStorage.
                      </div>
                    </div>

                    {/* Secondary details */}
                    <details className="group pt-6 border-t border-[#263241]">
                      <summary className="text-[10px] font-mono text-[#6B7280] mb-4 uppercase cursor-pointer hover:text-[#9CA3AF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC] inline-flex items-center gap-2">
                        <span>Show Process Details</span>
                      </summary>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                        <div>
                          <div className="text-[10px] font-mono text-[#6B7280] mb-1 uppercase">AI Assistance</div>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">Helped structure transaction logic, localStorage, and component state.</p>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-[#6B7280] mb-1 uppercase">Human Decisions</div>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">Defined the user flow, categories, balance summary, and empty states.</p>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-6 bg-[#070A0F] p-6 border border-[#263241] rounded-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-[#6B7280] border-b border-[#263241] pb-3">
                         <Map className="w-4 h-4" />
                         <span className="text-[10px] font-mono uppercase tracking-widest relative top-px">Lesson Learned</span>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-[#6B7280] mb-1">What broke first:</div>
                        <p className="text-sm text-[#9CA3AF] line-through decoration-[#263241]">Data reset issues, input validation bugs, and layout spacing.</p>
                      </div>
                      
                      <div>
                        <div className="text-xs font-mono text-[#FBBF24] mb-2 mt-4">The Real Lesson:</div>
                        <div className="bg-[#FBBF24]/10 p-4 border-l-2 border-[#78350F]">
                          <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed">&quot;Small apps teach more than passive tutorials.&quot;</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 w-full">
                       <button disabled aria-disabled="true" title="Demo Offline" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-[#0D1117] border border-[#263241] text-[#6B7280] font-sans font-medium text-xs rounded-sm cursor-not-allowed opacity-70">
                         <PlayCircle className="w-4 h-4" /> Live Demo (Offline)
                       </button>
                       <a href="#" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-transparent hover:bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans font-medium text-xs transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
                         <Code2 className="w-4 h-4" /> View Code
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BUILD LOG 003 */}
            <div className="bg-[#0D1117] border border-[#263241] rounded-sm relative shadow-xl focus-within:ring-1 focus-within:ring-[#263241] transition-all">
              <div className="absolute top-0 left-0 w-full h-px bg-[#263241]"></div>
              {/* File Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#263241] bg-[#111827] px-4 py-2 gap-4">
                 <div className="flex items-center gap-3">
                   <FileTerminal className="w-4 h-4 text-[#9CA3AF]" />
                   <span className="text-xs font-mono text-[#E5E7EB]">LOG_003.md</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="inline-flex items-center px-2 py-0.5 bg-[#111827] text-[#9CA3AF] font-mono text-[10px] border border-[#263241] tracking-wider uppercase">Learning</span>
                 </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                <header>
                  <h3 className="text-2xl text-[#E5E7EB] font-semibold font-sans">Business Landing Page Concept</h3>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-8">
                    {/* Input */}
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2 tracking-wide">Input / Idea</div>
                      <div className="bg-[#070A0F] p-4 border-l-2 border-[#263241] text-sm text-[#9CA3AF] font-sans leading-relaxed">
                        &quot;I want to help a small business explain its offer clearly.&quot;
                      </div>
                    </div>
                    {/* Output */}
                    <div>
                      <div className="text-xs font-mono text-[#6B7280] mb-2 tracking-wide">Output / Result</div>
                      <div className="text-sm text-[#E5E7EB] font-sans leading-relaxed pt-1">
                        A clean, un-deployed landing page concept focused on messaging.
                      </div>
                    </div>

                    {/* Secondary details */}
                    <details className="group pt-6 border-t border-[#263241]">
                      <summary className="text-[10px] font-mono text-[#6B7280] mb-4 uppercase cursor-pointer hover:text-[#9CA3AF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC] inline-flex items-center gap-2">
                        <span>Show Process Details</span>
                      </summary>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                        <div>
                          <div className="text-[10px] font-mono text-[#6B7280] mb-1 uppercase">AI Assistance</div>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">Generated section ideas, copy alternatives, and layout patterns.</p>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-[#6B7280] mb-1 uppercase">Human Decisions</div>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">Selected the message, removed clutter, and focused the CTA.</p>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-6 bg-[#070A0F] p-6 border border-[#263241] rounded-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-[#6B7280] border-b border-[#263241] pb-3">
                         <Map className="w-4 h-4" />
                         <span className="text-[10px] font-mono uppercase tracking-widest relative top-px">Lesson Learned</span>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-[#6B7280] mb-1">What broke first:</div>
                        <p className="text-sm text-[#9CA3AF] line-through decoration-[#263241]">Too many sections, generic copy, and weak visual hierarchy.</p>
                      </div>
                      
                      <div>
                        <div className="text-xs font-mono text-[#FBBF24] mb-2 mt-4">The Real Lesson:</div>
                        <div className="bg-[#FBBF24]/10 p-4 border-l-2 border-[#78350F]">
                          <p className="text-sm text-[#FBBF24] font-medium font-sans leading-relaxed">&quot;Good landing pages are about clarity, not decoration.&quot;</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 w-full">
                       <button disabled aria-disabled="true" title="No Link Available" className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2.5 bg-[#0D1117] border border-[#263241] text-[#6B7280] font-sans font-medium text-xs rounded-sm cursor-not-allowed opacity-70">
                         <ExternalLink className="w-4 h-4" /> Design Link (WIP)
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04. Workflow Section */}
        <section id="workflow" className="scroll-mt-28 lg:scroll-mt-8 space-y-12 pt-16 border-t border-[#263241] relative">
          <div className="absolute top-0 right-0 py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 text-[10px] font-mono text-[#9CA3AF] rounded-b-sm">SECTION_04</div>
          <div className="text-left border-b border-[#263241] pb-6">
            <h2 className="text-3xl font-semibold text-[#E5E7EB] font-sans tracking-tight">Workflow Pipeline</h2>
            <p className="text-[#9CA3AF] mt-2 font-mono text-sm">PROMPT → PROTOTYPE → LESSON</p>
          </div>
          
          <div className="relative pt-8 pb-8">
            {/* Connecting line */}
            <div className="absolute top-[45%] left-[5%] w-[90%] border-t border-dashed border-[#263241] hidden md:block z-0"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "01", name: "Prompt", icon: Terminal, color: "text-[#7DD3FC]", border: "border-[#164E63]" },
                { step: "02", name: "Prototype", icon: Hammer, color: "text-[#9CA3AF]", border: "border-[#263241]" },
                { step: "03", name: "Debug", icon: Code2, color: "text-[#9CA3AF]", border: "border-[#263241]" },
                { step: "04", name: "Refine", icon: Lightbulb, color: "text-[#9CA3AF]", border: "border-[#263241]" },
                { step: "05", name: "Lesson", icon: CheckCircle2, color: "text-[#FBBF24]", border: "border-[#78350F]" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className={`w-16 h-16 rounded-sm bg-[#070A0F] border ${item.border} flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 duration-300 shadow-lg`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-mono text-[10px] text-[#6B7280] mb-1">{item.step}</span>
                  <span className="font-medium text-[#E5E7EB] tracking-wide text-sm font-sans">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05. Skill Unlock Map */}
        <section id="skill-map" className="scroll-mt-28 lg:scroll-mt-8 space-y-12 bg-[#0D1117]/50 lg:p-8 xl:-mx-8 border-y md:border border-[#263241] relative pt-16 md:pt-8 pb-8">
          <div className="absolute top-0 right-0 md:hidden py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 text-[10px] font-mono text-[#9CA3AF] rounded-b-sm">SECTION_05</div>
          <div className="flex items-center justify-between border-b border-[#263241] pb-6">
            <div>
              <h2 className="text-3xl font-semibold text-[#E5E7EB] font-sans tracking-tight">Skill Map</h2>
              <p className="text-[#9CA3AF] mt-2 font-mono text-sm">Path: Core Knowledge</p>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] text-[#6B7280] bg-[#111827] px-2 py-1 rounded-sm border border-[#263241]">
              <span className="w-1.5 h-1.5 bg-[#7DD3FC]"></span> LIVE SYNC
            </span>
          </div>

          <div className="relative pt-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
              
              {/* Unlocked */}
              <div className="p-6 md:p-8 border border-[#263241] bg-[#070A0F] relative z-20">
                <div className="text-[10px] font-mono text-[#7DD3FC] bg-[#0E7490]/12 border border-[#164E63] px-2 py-1 absolute top-0 right-0 m-4">UNLOCKED</div>
                <Network className="w-6 h-6 text-[#164E63] mb-6" />
                <ul className="space-y-4 text-sm font-sans text-[#E5E7EB]">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> HTML Structure</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> CSS / Layout</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> Responsive Design</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> Prompting</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#7DD3FC] mt-0.5 shrink-0" /> AI-assisted Debugging</li>
                </ul>
              </div>

              {/* Connector line overlay for desktop */}
              <div className="hidden md:block absolute top-[50%] left-[33%] w-[33%] h-px bg-[#263241] z-0"></div>
              
              {/* Unlocking */}
              <div className="p-6 md:p-8 border-x md:border-t md:border-b border-y border-[#263241] bg-[#0D1117] relative z-20">
                <div className="text-[10px] font-mono text-[#FBBF24] bg-[#FBBF24]/10 border border-[#78350F] px-2 py-1 absolute top-0 right-0 m-4">TRAINING</div>
                <Network className="w-6 h-6 text-[#78350F] mb-6" />
                <ul className="space-y-4 text-sm font-sans text-[#E5E7EB]">
                  <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm"></div> JavaScript Logic</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm"></div> React Components</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm"></div> State Management</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm"></div> Tailwind Patterns</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 border border-[#FBBF24] mt-1.5 shrink-0 rounded-sm"></div> Deployment</li>
                </ul>
              </div>

              {/* Connector line overlay for desktop */}
              <div className="hidden md:block absolute top-[50%] left-[66%] w-[34%] h-px z-0 border-t border-dashed border-[#263241] bg-transparent"></div>

              {/* Next */}
              <div className="p-6 md:p-8 border border-[#263241] bg-[#070A0F] relative z-20 opacity-70">
                <div className="text-[10px] font-mono text-[#6B7280] bg-[#111827] border border-[#263241] px-2 py-1 absolute top-0 right-0 m-4">LOCKED</div>
                <Lock className="w-6 h-6 text-[#263241] mb-6" />
                <ul className="space-y-4 text-sm font-sans text-[#6B7280]">
                  <li className="flex items-start gap-2"><Lock className="w-3 h-3 text-[#263241] mt-1 shrink-0" /> API Integration</li>
                  <li className="flex items-start gap-2"><Lock className="w-3 h-3 text-[#263241] mt-1 shrink-0" /> Database Basics</li>
                  <li className="flex items-start gap-2"><Lock className="w-3 h-3 text-[#263241] mt-1 shrink-0" /> Authentication</li>
                  <li className="flex items-start gap-2"><Lock className="w-3 h-3 text-[#263241] mt-1 shrink-0" /> Custom Backend Logic</li>
                  <li className="flex items-start gap-2"><Lock className="w-3 h-3 text-[#263241] mt-1 shrink-0" /> Real Client Projects</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 06. How to work with me */}
        <section id="how-to-work" className="scroll-mt-28 lg:scroll-mt-8 border border-[#263241] rounded-sm bg-[#070A0F] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 border-r-0 text-[10px] font-mono text-[#9CA3AF] rounded-bl-sm z-20">SECTION_06</div>
          <div className="absolute -right-8 -top-8 text-[#111827] transform rotate-12 z-0">
             <FlaskConical className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-[#E5E7EB] mb-2 font-sans tracking-tight">How we work together</h2>
            <p className="text-[#9CA3AF] font-mono text-sm mb-12">5_Step_Process</p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0">
              {[
                { title: "Send Messy Idea", desc: "Share your rough concept or problem." },
                { title: "Define Scope", desc: "We slice it down to a small, isolated mission." },
                { title: "First Build", desc: "I prototype it quickly using AI assistance." },
                { title: "Review & Refine", desc: "We test, break it, and fix the assumptions." },
                { title: "Ship & Document", desc: "Output is delivered and the lesson is logged." }
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-row md:flex-col gap-4 md:gap-6 md:text-center group">
                  <div className="md:hidden absolute left-5 top-10 bottom-0 w-px bg-[#263241] -z-10 group-last:hidden"></div>
                  {/* Need to conditionally hide the horizontal line on the last element manually since group-last didn't work for flex-col previously. */}
                  {idx < 4 && <div className="hidden md:block absolute top-[1.1rem] left-[50%] w-full h-px bg-[#263241] -z-10"></div>}
                  
                  <div className="w-10 h-10 rounded-full bg-[#0D1117] border-2 border-[#070A0F] ring-1 ring-[#263241] flex items-center justify-center font-mono text-xs text-[#9CA3AF] mx-auto shrink-0 md:group-hover:ring-[#164E63] md:transition-colors">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-sm text-[#E5E7EB] mb-2 tracking-wide">{step.title}</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed max-w-[200px] mx-auto hidden md:block font-sans">{step.desc}</p>
                    <p className="text-xs text-[#6B7280] leading-relaxed max-w-[200px] md:hidden font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-[#FBBF24]/10 border border-[#78350F] p-4 rounded-sm flex items-start gap-4">
               <div className="text-[#FBBF24] mt-1"><CheckCircle2 className="w-5 h-5"/></div>
               <div>
                  <p className="text-sm text-[#FBBF24] font-sans"><strong>Note:</strong> I prefer simple, clear, useful initial prototypes over over-engineered systems. Let&apos;s start with v1.</p>
               </div>
            </div>
          </div>
        </section>

        {/* 07. Missions (Mission Board) */}
        <section id="missions" className="scroll-mt-28 lg:scroll-mt-8 space-y-10 pt-16 border-t border-[#263241] relative">
          <div className="absolute top-0 right-0 py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 text-[10px] font-mono text-[#9CA3AF] rounded-b-sm">SECTION_07</div>
          <div className="flex items-center justify-between border-b border-[#263241] pb-6">
            <div>
              <h2 className="text-3xl font-semibold text-[#E5E7EB] font-sans tracking-tight">Mission Board</h2>
              <p className="text-[#9CA3AF] mt-2 font-sans text-sm">Choose a Small Mission</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Make my personal portfolio",
                diff: "Small",
                bestFor: "Individuals needing a clear internet presence",
                output: "1-page responsive site"
              },
              {
                title: "Turn my idea into a landing page",
                diff: "Medium",
                bestFor: "Small businesses or solo founders",
                output: "Designed landing page concept"
              },
              {
                title: "Create a clickable web app prototype",
                diff: "Medium",
                bestFor: "Founders testing a flow before hiring a senior dev",
                output: "Static interactive UI"
              },
              {
                title: "Simplify my messy product concept",
                diff: "Small",
                bestFor: "Anyone with too many features in mind",
                output: "Clear scope document & UI wireframes"
              }
            ].map((mission, idx) => (
              <div key={idx} className="group relative bg-[#0D1117] p-6 lg:p-8 border border-[#263241] border-l-2 hover:border-l-[#7DD3FC] hover:bg-[#111827] transition-all cursor-default">
                <div className="absolute top-4 right-4 px-2 py-0.5 bg-[#0E7490]/12 border border-[#164E63] text-[#7DD3FC] font-mono text-[10px]">AVAILABLE</div>
                <h3 className="text-xl font-semibold text-[#E5E7EB] mb-6 pr-20 font-sans tracking-tight">{mission.title}</h3>
                
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex">
                    <span className="text-[#6B7280] w-24 shrink-0 uppercase tracking-wide font-mono text-[10px] mt-px">Difficulty</span>
                    <span className="text-[#9CA3AF]">{mission.diff}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#6B7280] w-24 shrink-0 uppercase tracking-wide font-mono text-[10px] mt-px">Best For</span>
                    <span className="text-[#9CA3AF]">{mission.bestFor}</span>
                  </div>
                  <div className="flex pt-3 mt-3 border-t border-[#263241]">
                    <span className="text-[#6B7280] w-24 shrink-0 uppercase tracking-wide font-mono text-[10px] mt-px">Output</span>
                    <span className="text-[#9CA3AF]">{mission.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08. Contact Section */}
        <section id="contact" className="scroll-mt-28 lg:scroll-mt-8 py-20 border-t border-[#263241] relative pt-16">
          <div className="absolute top-0 right-0 py-2 px-3 bg-[#0D1117] border border-[#263241] border-t-0 text-[10px] font-mono text-[#9CA3AF] rounded-b-sm">SECTION_08</div>
          <div className="max-w-3xl mx-auto text-left lg:text-center space-y-8">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-[#111827] border border-[#263241] text-[#9CA3AF] font-sans text-xs rounded-sm mb-4">
               Open for Small Projects
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#E5E7EB] font-sans tracking-tight">Send me a small mission.</h2>
            <p className="text-lg text-[#9CA3AF] leading-relaxed font-sans max-w-2xl mx-auto">
              Have a simple idea, messy concept, or early product thought? Send it to me. I&apos;ll help turn it into a clear interface or prototype.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap lg:justify-center gap-4 pt-8">
              <a href="mailto:anggieirawan66@gmail.com" className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-all duration-200 min-w-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
                <Mail className="w-4 h-4" />
                Email Anggie
              </a>
            </div>
          </div>
        </section>

      </main>
      
      {/* Footer sticky-note style element (Obsidian dark Amber) */}
      <div className="fixed bottom-6 right-6 lg:right-12 z-50 transform rotate-3 hidden 2xl:block shadow-2xl pointer-events-none">
        <div className="bg-[#150F05]/95 backdrop-blur-md p-5 w-56 text-[#FBBF24] border border-[#78350F] font-sans text-sm relative shadow-black/80">
          <div className="absolute top-0 right-0 w-full h-1 bg-[#FBBF24]/10"></div>
          <div className="font-mono text-xs border-b border-[#78350F]/50 pb-2 mb-3 tracking-wider text-[#FBBF24]/70 uppercase">Note to Self</div>
          <p className="leading-relaxed text-[#E5E7EB]">Keep building.<br/>Keep shipping.<br/>Keep learning.</p>
          <div className="absolute -bottom-2 -right-2 transform -rotate-12 opacity-80">
             <div className="w-8 h-8 rounded-full border border-[#FBBF24]/30 flex items-center justify-center text-[10px] font-mono text-[#FBBF24]">OK</div>
          </div>
        </div>
      </div>
    </div>
  );
}
