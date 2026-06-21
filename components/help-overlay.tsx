"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Keyboard } from "lucide-react";

export function HelpOverlay() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="bg-[#0D1117] border border-[#263241] rounded-sm p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-[#E5E7EB] text-sm flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[#7DD3FC]" />
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-[#6B7280] hover:text-[#E5E7EB] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7DD3FC] rounded"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 font-sans text-sm">
          {[
            ["?", "Toggle this help"],
            ["Esc", "Close overlay"],
            ["↑ ↓", "Scroll page"],
          ].map(([key, desc]) => (
            <div key={key} className="flex items-center justify-between">
              <kbd className="px-2 py-1 bg-[#111827] border border-[#263241] rounded text-[#7DD3FC] font-mono text-xs min-w-[2rem] text-center">
                {key}
              </kbd>
              <span className="text-[#9CA3AF]">{desc}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#6B7280] font-sans">
          Press <kbd className="px-1 py-0.5 bg-[#111827] border border-[#263241] rounded text-[#7DD3FC] font-mono text-[10px]">?</kbd> anywhere to toggle this overlay.
        </p>
      </div>
    </div>
  );
}
