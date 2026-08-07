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
 * Controlled 3D book flip engine (desktop) + mobile spread viewer.
 *
 * Model:
 *  - `current` = number of flipped sheets (0 → cover readable … sheets.length-1 → last page).
 *  - Sheets are stacked in `.book`; each sheet rotates -180° about its left edge (the spine)
 *    when flipped, landing on the left stack and revealing its back (verso) face.
 *  - Desktop: the 2-page spread renders in 3D — left plate (back of the previous
 *    sheet) + right text page (front of the current sheet).
 *  - Mobile (≤1023px): a flat slide viewer instead. For sheets 3..7 the LEFT page
 *    (plate / colophon) shows first, taps slide to the right page, then the next
 *    tap forward flips to the next sheet (landing on its left page). Plate panels
 *    animate with a page-turn-in so the sheet change still reads as a flip.
 *  - Only `transform` is animated. Layout properties never animate.
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
  /** 1 = right page (text), 0 = left page (plate / colophon) — mobile only. */
  side: 0 | 1;
  isAnimating: boolean;
  onFlip: (next: number) => void;
  /** Mobile spread navigation (see page.tsx goNext/goPrev). */
  onNext: () => void;
  onPrev: () => void;
}

const FLIP_MS = 1100;
/* Sheets ≥ 3 have real left-page content (project plates / colophon);
   earlier backs are decorative (endpaper / verso) and never shown. */
const PLATE_FROM = 3;

export default function Book({
  sheets,
  current,
  side,
  isAnimating,
  onFlip,
  onNext,
  onPrev,
}: BookProps) {
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

  const maxPage = sheets.length - 1;
  const isFirst = current === 0;
  const isLast = current === maxPage;
  /* Left page exists on mobile for sheets ≥ 3. */
  const showPlate = current >= PLATE_FROM;

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
      /* Mobile strip panels keep their internal scrolls in sync too. */
      document.querySelectorAll<HTMLElement>(".book-mobile .page-content").forEach((p) => {
        p.scrollTop = 0;
      });
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

    /* Move focus to the new page's heading once the flip lands. On mobile
       the flip lands on the LEFT page (plate/colophon) — the heading is on
       the hidden right page, so skip until the slide reveals it. */
    const sheet = sheets[current];
    if (sheet) {
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      if (isMobile && side === 0) {
        return;
      }
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
  }, [current, sheets, ready, resetPageScrolls, markOverflow, side]);

  /* Mobile side change (slide): reset scrolls and move focus to the text
     page's heading once the slide lands. */
  useEffect(() => {
    if (!ready) return;
    resetPageScrolls(current);
    markOverflow();
    if (side !== 1) return;
    const sheet = sheets[current];
    if (!sheet) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => {
      const el = document.getElementById(`book-heading-${sheet.id}`);
      if (el) (el as HTMLElement).focus({ preventScroll: true });
    }, reduced ? 300 : 500);
    return () => window.clearTimeout(t);
  }, [side, current, sheets, ready, resetPageScrolls, markOverflow]);

  /* Final cleanup on unmount. */
  useEffect(
    () => () => {
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
    },
    []
  );

  /* Remember where a tap began so a drag (scroll attempt or selection)
     never registers as a flip on touch devices. */
  const handlePointerDown = (e: PointerEvent) => {
    tapStart.current = { x: e.clientX, y: e.clientY };
  };

  /* Shared tap guard: links/buttons handle themselves, drags and text
     selections never navigate. */
  const shouldIgnoreClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return true;
    const start = tapStart.current;
    tapStart.current = null;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) return true;
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().length > 0) return true;
    return false;
  };

  const handleSheetClick = (i: number) => (e: MouseEvent) => {
    if (isAnimating) return;
    if (shouldIgnoreClick(e)) return;
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
      {/* ── Desktop / wide: the 3D book with its spread ── */}
      <div className="book-3d">
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

      {/* ── Mobile (≤1023px): spread viewer — default shows the LEFT page
           (plate / colophon), slides to the right (text) page, then flips. ── */}
      <div className="book-mobile">
        <div className="book-mobile-viewport">
          <div
            className={`book-mobile-track${side === 1 ? " show-text" : ""}${
              !showPlate ? " single" : ""
            }`}
          >
            {showPlate && (
              <div
                key={`plate-${current}`}
                className="book-mobile-panel book-mobile-plate"
                onPointerDown={handlePointerDown}
                onClick={(e) => {
                  if (isAnimating) return;
                  if (shouldIgnoreClick(e)) return;
                  onNext();
                }}
              >
                {sheets[current - 1].back}
              </div>
            )}
            <div
              key={`page-${current}`}
              className="book-mobile-panel book-mobile-page"
              onPointerDown={handlePointerDown}
              onClick={(e) => {
                if (isAnimating) return;
                if (shouldIgnoreClick(e)) return;
                onNext();
              }}
            >
              {sheets[current].front}
            </div>
          </div>
        </div>

        <div className="book-controls">
          <button
            type="button"
            className="btn"
            onClick={onPrev}
            disabled={isFirst && side === 1}
            aria-label="Previous page"
          >
            &larr; Prev
          </button>
          <span className="book-indicator" aria-live="polite" aria-atomic="true">
            {side === 0 ? "Plate" : indicator}
          </span>
          <button
            type="button"
            className="btn"
            onClick={onNext}
            disabled={isLast && side === 1}
            aria-label="Next page"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}