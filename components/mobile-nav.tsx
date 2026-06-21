"use client";

import { useState, useEffect } from "react";
import { Menu, X, FlaskConical } from "lucide-react";

interface MobileNavProps {
  items: { id: string; label: string }[];
  activeId: string;
}

export function MobileNav({ items, activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 bg-[#0D1117] border border-[#263241] rounded-sm flex items-center justify-center text-[#7DD3FC] hover:bg-[#111827] hover:border-[#164E63] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
        aria-label="Open navigation menu"
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
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#070A0F] border-r border-[#263241] transform transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Lab index"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#263241]">
          <div className="flex items-center gap-3 font-mono text-[#7DD3FC] font-bold tracking-wider text-sm">
            <FlaskConical className="w-5 h-5" />
            <span>Lab Index</span>
          </div>
          <button
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
