"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

/**
 * Controlled 3D book flip engine.
 *
 * Model:
 *  - `current` = number of flipped sheets (0 → cover readable … sheets.length-1 → last page).
 *  - Sheets are stacked in `.book`; each sheet rotates -180° about its left edge (the spine)
 *    when flipped, landing on the left stack and revealing its back (verso) face.
 *  - Only `transform` is animated (1.1s easeInOutCubic). Layout properties never animate.
 *  - `isAnimating` (owned by the parent) locks input during the flip.
 */

export interface BookSheet {
  id: string;
  front: ReactNode;
  back: ReactNode;
}

interface BookProps {
  sheets: BookSheet[];
  current: number;
  isAnimating: boolean;
  onFlip: (next: number) => void;
}

const FLIP_MS = 1100;

export default function Book({ sheets, current, isAnimating, onFlip }: BookProps) {
  /* Transitions stay disabled until one frame after mount so a deep-linked
     initial state paints instantly instead of animating on load. */
  const [ready, setReady] = useState(false);
  /* Which sheet is mid-flip (elevated z-index + lighting) and which was just revealed. */
  const [flipState, setFlipState] = useState<{
    flipping: number;
    revealed: number;
  } | null>(null);

  const prevCurrent = useRef(current);
  const flipTimer = useRef<number | null>(null);
  const focusTimer = useRef<number | null>(null);
  const tapStart = useRef<{ x: number; y: number } | null>(null);
  const sheetEls = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Real-book behavior: every flipped-to page opens from the top. The
     incoming page (this sheet's front) and the left page of the new spread
     (the previous sheet's back) both get their internal scroll reset. */
  const resetPageScrolls = useCallback(
    (index: number) => {
      for (const target of [index, index - 1]) {
        if (target < 0) continue;
        const el = sheetEls.current.get(sheets[target]?.id ?? "");
        el?.querySelectorAll<HTMLElement>(".page-content").forEach((p) => {
          p.scrollTop = 0;
        });
      }
    },
    [sheets]
  );

  /* #3: toggle .has-overflow on every scrollable page when there is content
     below the fold — drives the bottom ink-fade cue (see globals.css). */
  const markOverflow = useCallback(() => {
    document.querySelectorAll<HTMLElement>(".page-content").forEach((el) => {
      const hasMore =
        el.scrollHeight > el.clientHeight + 1 &&
        el.scrollTop < el.scrollHeight - el.clientHeight - 8;
      el.classList.toggle("has-overflow", hasMore);
    });
  }, []);

  /* Listen on the scrolling phase (page-content scrolls internally) and on
     resize so the cue tracks which page actually overflows. */
  useEffect(() => {
    const onScroll = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el.classList || !el.classList.contains("page-content")) return;
      const hasMore =
        el.scrollHeight > el.clientHeight + 1 &&
        el.scrollTop < el.scrollHeight - el.clientHeight - 8;
      el.classList.toggle("has-overflow", hasMore);
    };
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  /* Re-evaluate the overflow cue once transitions are enabled (deep-linked
     state paints flat) and on any resize. */
  useEffect(() => {
    if (!ready) return;
    markOverflow();
    window.addEventListener("resize", markOverflow);
    return () => window.removeEventListener("resize", markOverflow);
  }, [ready, markOverflow]);

  useEffect(() => {
    const prev = prevCurrent.current;
    if (prev === current) return;
    prevCurrent.current = current;

    /* A hash deep-link on mount changes `current` before transitions are
       enabled — paint it flat, without the flip ceremony or focus jump. */
    if (!ready) return;

    resetPageScrolls(current);
    markOverflow();

    setFlipState({ flipping: Math.min(prev, current), revealed: current });

    if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
    flipTimer.current = window.setTimeout(() => setFlipState(null), FLIP_MS);

    /* Move focus to the new page's heading once the flip lands. */
    const sheet = sheets[current];
    if (sheet) {
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const delay = reduced ? 400 : FLIP_MS + 50;
      focusTimer.current = window.setTimeout(() => {
        const el = document.getElementById(`book-heading-${sheet.id}`);
        if (el) (el as HTMLElement).focus({ preventScroll: true });
      }, delay);
    }

    return () => {
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
    };
  }, [current, sheets, ready, resetPageScrolls, markOverflow]);

  /* Final cleanup on unmount. */
  useEffect(
    () => () => {
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
    },
    []
  );

  const maxPage = sheets.length - 1;
  const isFirst = current === 0;
  const isLast = current === maxPage;

  /* Remember where a tap began so a drag (scroll attempt or selection)
     never registers as a flip on touch devices. */
  const handlePointerDown = (e: PointerEvent) => {
    tapStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleSheetClick = (i: number) => (e: MouseEvent) => {
    if (isAnimating) return;
    const target = e.target as HTMLElement;
    /* Let links/buttons inside the page handle their own clicks. */
    if (target.closest("a, button")) return;
    /* A drag (scroll attempt or text selection) shouldn't flip the page. */
    const start = tapStart.current;
    tapStart.current = null;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) return;
    /* Don't flip when the click ends a text-selection drag. */
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().length > 0) return;
    if (i === current) onFlip(current + 1);
    else if (i < current) onFlip(current - 1);
  };

  const indicator = isFirst
    ? "Cover"
    : `${String(current).padStart(2, "0")} / ${String(maxPage).padStart(2, "0")}`;

  return (
    <div
      className="book-page"
      id="book-main"
      tabIndex={-1}
      role="region"
      aria-label="Portfolio book"
    >
      <div
        className={`book-wrap${current > 0 ? " book-open" : ""}`}
        data-ready={ready ? "true" : "false"}
      >
        <div className="book-scene">
          <div className="book">
            {/* Static back board — peeks out 3px like a real hardcover. */}
            <div className="book-base" aria-hidden="true" />

            {sheets.map((sheet, i) => {
              const flipped = i < current;
              /* Z-index rule: flipped → i + 1, unflipped → sheets.length - i;
                 the mid-flip sheet is elevated above both stacks. */
              const zIndex =
                flipState && flipState.flipping === i
                  ? 100 + i
                  : flipped
                    ? i + 1
                    : sheets.length - i;

              const classes = [
                "sheet",
                flipped ? "sheet-flipped" : "",
                i === current ? "sheet-current" : "",
                i === 0 ? "sheet-cover" : "",
                flipState && flipState.flipping === i ? "sheet-flipping" : "",
                flipState && flipState.revealed === i ? "sheet-revealed" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={sheet.id}
                  className={classes}
                  style={{ zIndex }}
                  ref={(el) => {
                    if (el) sheetEls.current.set(sheet.id, el);
                    else sheetEls.current.delete(sheet.id);
                  }}
                  onPointerDown={handlePointerDown}
                  onClick={handleSheetClick(i)}
                >
                  <div className="sheet-front">{sheet.front}</div>
                  <div className="sheet-back" aria-hidden="true">
                    {sheet.back}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="book-shadow" aria-hidden="true" />
      </div>

      <div className="book-controls">
        <button
          type="button"
          className="btn"
          onClick={() => onFlip(current - 1)}
          disabled={isAnimating || isFirst}
          aria-label="Previous page"
        >
          &larr; Prev
        </button>
        <span className="book-indicator" aria-live="polite" aria-atomic="true">
          {indicator}
        </span>
        <button
          type="button"
          className="btn"
          onClick={() => onFlip(current + 1)}
          disabled={isAnimating || isLast}
          aria-label="Next page"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
