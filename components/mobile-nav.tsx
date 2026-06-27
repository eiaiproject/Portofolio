"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  items: { id: string; label: string }[];
  activeId: string;
}

export function MobileNav({ items, activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap + restore
  useEffect(() => {
    if (!open) {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement;
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabTrap);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabTrap);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-3 z-50 w-10 h-10 bg-[#0D1117] border border-[#263241] rounded-sm flex items-center justify-center text-[#7DD3FC] hover:bg-[#111827] hover:border-[#164E63] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        ref={drawerRef}
        id="mobile-nav-drawer"
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#070A0F] border-r border-[#263241] transform transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Site navigation"
        aria-modal="true"
        role="dialog"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#263241]">
          <div className="flex items-center gap-3 font-mono text-[#7DD3FC] font-bold tracking-wider text-sm">
            <Image src="/AI-logo.svg" alt="" width={24} height={24} unoptimized className="w-6 h-6" aria-hidden="true" />
            <span>Anggie</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC]"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul role="list" className="p-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-sm transition-all border ${
                  activeId === item.id
                    ? "bg-[#111827] border-[#263241] text-[#E5E7EB]"
                    : "border-transparent text-[#9CA3AF] hover:bg-[#111827] hover:text-[#E5E7EB]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
