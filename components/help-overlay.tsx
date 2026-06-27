"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Keyboard } from "lucide-react";

export function HelpOverlay() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    },
    [open]
  );

  // Focus trap
  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the close button on open
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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

    document.addEventListener("keydown", handleTabTrap);
    return () => document.removeEventListener("keydown", handleTabTrap);
  }, [open]);

  // Restore focus on close
  useEffect(() => {
    if (!open && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [open]);

  // Global key listener
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
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div
        ref={dialogRef}
        className="bg-[#0D1117] border border-[#263241] rounded-sm p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-[#E5E7EB] text-sm flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[#7DD3FC]" />
            Keyboard Shortcuts
          </h2>
          <button
            ref={closeButtonRef}
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
            ["Tab", "Navigate between items"],
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
