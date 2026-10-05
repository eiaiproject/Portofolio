"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type TransitionEvent,
} from "react";

/**
 * Controlled 3D book flip engine — one engine on every screen size.
 *
 * Model:
 *  - `current` = number of flipped sheets (0 → cover readable … sheets.length-1 → last page).
 *  - Sheets are stacked in `.book`; each sheet rotates -180° about its left edge (the spine)
 *    when flipped, landing on the left stack and revealing its back (verso) face.
 *  - Wide screens (≥1024px): the open spread centers via `.book-open` (translateX(50%))
 *    — left plate (back of the previous sheet) + right text page (front of the current sheet).
 *  - Narrow screens (≤1023px): the same 3D book stays centered (no spread shift), so the
 *    recto page fills the frame — matching the original monograph build. Each recto carries
 *    its own small screenshot (`.project-mobile-shot`), so nothing is lost.
 *  - Only `transform` is animated. Layout properties never animate.
 *  - Flip state machine (owned by the parent, passed in as `flip`):
 *      current = settled/target page (drives the flipped classes)
 *      flip    = { from, to } while an animation runs; null when idle
 *    Completion is reported via `onFlipComplete` from the sheet's
 *    `transitionend` (transform only) or the fast-jump timer. The parent
 *    keeps a short fallback timer.
 *  - `will-change` is applied only to the sheet that is mid-flip.
 */

export interface BookSheet {
  id: string;
  front: ReactNode;
  back: ReactNode;
}

type BookProps = Readonly<{
  sheets: BookSheet[];
  current: number;
  /** Non-null while a flip / fast jump runs: the settled page being left and
      the target page. Drives z-index, lighting classes, and input lock. */
  flip: { from: number; to: number } | null;
  onFlip: (next: number) => void;
  /** Called when the flip animation actually ended (transitionend / jump
      timer) so the parent can release its input lock. Idempotent. */
  onFlipComplete: () => void;
}>;

const FLIP_MS = 1100;
/* Long-jump (nav link) snap: sheets jump straight to the target with one
   short fade — no per-sheet flips, no transitionend to wait for. */
const FAST_MS = 520;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Book({
  sheets,
  current,
  flip,
  onFlip,
  onFlipComplete,
}: BookProps) {
  /* Transitions stay disabled until one frame after mount so a deep-linked
     initial state paints instantly instead of animating on load. */
  const [ready, setReady] = useState(false);
  /* Fast-travel mode: long nav jumps snap the whole book with one fade
     instead of flipping every sheet in between. */
  const [fast, setFast] = useState(false);

  const prevCurrent = useRef(current);
  const flipTimer = useRef<number | null>(null);
  const fastTimer = useRef<number | null>(null);
  const focusTimer = useRef<number | null>(null);
  const tapStart = useRef<{ x: number; y: number } | null>(null);
  const sheetEls = useRef<Map<string, HTMLElement>>(new Map());

  const maxPage = sheets.length - 1;
  const isFirst = current === 0;
  const isLast = current === maxPage;
  /* Any animation in flight locks navigation. */
  const busy = flip !== null;
  /* Deterministic z-index: the moving sheet is elevated above both stacks
     for the whole flip — never for fast jumps (they snap in one paint). */
  const movingSheet =
    flip && Math.abs(flip.to - flip.from) === 1
      ? Math.min(flip.from, flip.to)
      : null;
  const revealedSheet = flip && Math.abs(flip.to - flip.from) === 1 ? flip.to : null;

  const headingId = useCallback(
    (sheetId: string) => `book-heading-${sheetId}`,
    []
  );

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

  /* Make sure the incoming spread's images are decoded before/while the
     page flips in, so they never pop in mid-animation. */
  const decodeImages = useCallback((root: HTMLElement | undefined | null) => {
    if (!root) return;
    root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    });
  }, []);

  /* Listen on the scrolling phase (page-content scrolls internally) and on
     resize so the cue tracks which page actually overflows. */
  useEffect(() => {
    const onScroll = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el.classList?.contains("page-content")) return;
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

  /* Fast travel (jump > 1) snaps the whole book to the target with one
     short fade — no per-sheet transitionend fires, so a short timer
     completes it. Otherwise the moving sheet's transitionend completes the
     flip and this timer is only the safety net (e.g. tab hidden mid-flip,
     reduced motion without transform transitions). */
  const scheduleFlipCompletion = useCallback(
    (jump: number, reduced: boolean) => {
      if (jump > 1) {
        setFast(true);
        if (fastTimer.current !== null) window.clearTimeout(fastTimer.current);
        fastTimer.current = window.setTimeout(() => {
          setFast(false);
          onFlipComplete();
        }, FAST_MS);
        return;
      }
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      const fallback = reduced ? 300 : FLIP_MS + 150;
      flipTimer.current = window.setTimeout(onFlipComplete, fallback);
    },
    [onFlipComplete]
  );

  /* Move focus to the incoming page's heading once the flip lands. */
  const schedulePageFocus = useCallback(
    (sheetId: string | undefined, jump: number, reduced: boolean) => {
      if (!sheetId) return;
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
      let delay = FLIP_MS + 60;
      if (reduced) delay = 350;
      else if (jump > 1) delay = FAST_MS + 60;
      focusTimer.current = window.setTimeout(() => {
        const el = document.getElementById(headingId(sheetId));
        if (el) (el as HTMLElement).focus({ preventScroll: true });
      }, delay);
    },
    [headingId]
  );

  useEffect(() => {
    const prev = prevCurrent.current;
    if (prev === current) return;
    prevCurrent.current = current;

    /* A hash deep-link on mount changes `current` before transitions are
       enabled — paint it flat, without the flip ceremony or focus jump. */
    if (!ready) return;

    resetPageScrolls(current);
    markOverflow();

    const jump = Math.abs(current - prev);
    const reduced = prefersReducedMotion();

    /* Decode the images on the incoming spread (front + left plate) before
       the flip lands. */
    decodeImages(sheetEls.current.get(sheets[current]?.id ?? ""));
    decodeImages(sheetEls.current.get(sheets[current - 1]?.id ?? ""));

    scheduleFlipCompletion(jump, reduced);
    schedulePageFocus(sheets[current]?.id, jump, reduced);

    return () => {
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      if (fastTimer.current !== null) window.clearTimeout(fastTimer.current);
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
    };
  }, [current, sheets, ready, resetPageScrolls, markOverflow, scheduleFlipCompletion, schedulePageFocus, decodeImages]);

  /* Final cleanup on unmount. */
  useEffect(
    () => () => {
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      if (fastTimer.current !== null) window.clearTimeout(fastTimer.current);
      if (focusTimer.current !== null) window.clearTimeout(focusTimer.current);
    },
    []
  );

  /* Remember where a tap began so a drag (scroll attempt or selection)
     never registers as a flip on touch devices. */
  const handlePointerDown = (e: PointerEvent) => {
    tapStart.current = { x: e.clientX, y: e.clientY };
  };

  /* Real interactive elements (links, buttons) handle themselves — a bare
     tap or key on the page surface is the only thing that flips the book. */
  const isInteractiveTarget = (target: HTMLElement) =>
    !!target.closest("a, button");

  /* Shared tap guard: links/buttons handle themselves, drags and text
     selections never navigate. */
  const shouldIgnoreClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (isInteractiveTarget(target)) return true;
    const start = tapStart.current;
    tapStart.current = null;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) return true;
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().length > 0) return true;
    return false;
  };

  const handleSheetClick = (i: number) => (e: MouseEvent) => {
    if (busy) return;
    if (shouldIgnoreClick(e)) return;
    if (i === current) onFlip(current + 1);
    else if (i < current) onFlip(current - 1);
  };

  /* Keyboard twin of the sheet click: Enter / Space on a sheet turns the
     page the same way. The sheet itself stays out of the tab order — the
     Prev/Next buttons and arrow keys are the primary keyboard path — this
     just keeps the click semantics complete for programmatic focus. Events
     from interactive children (links, buttons) are left to those elements. */
  const handleSheetKeyDown = (i: number) => (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (busy) return;
    if (isInteractiveTarget(e.target as HTMLElement)) return;
    e.preventDefault();
    if (i === current) onFlip(current + 1);
    else if (i < current) onFlip(current - 1);
  };

  /* Only the sheet that actually flipped reports completion: the event must
     come from that exact element (not a child) and the property must be
     transform — everything else is ignored. */
  const handleSheetTransitionEnd = (i: number) => (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;
    if (flip && Math.abs(flip.to - flip.from) === 1 && i === movingSheet) {
      onFlipComplete();
    }
  };

  const indicator = isFirst
    ? "Cover"
    : `${String(current).padStart(2, "0")} / ${String(maxPage).padStart(2, "0")}`;

  /* Single live region for the whole book. The visual indicator is plain
     text; this sr-only region announces the settled page (during a flip the
     reader is still on `flip.from`, so nothing double-announces). */
  const pageLabel = (id: string) =>
    id
      .split("-")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(" ");
  const settled = flip ? flip.from : current;
  const announcement =
    settled === 0
      ? "Cover"
      : `Page ${settled} of ${maxPage}: ${pageLabel(sheets[settled]?.id ?? "")}`;

  return (
    <section
      className="book-page"
      id="book-main"
      tabIndex={-1}
      aria-label="Portfolio book"
      aria-keyshortcuts="ArrowRight ArrowLeft"
    >
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {/* The 3D book — the same engine on every screen size. On wide screens
          the open spread centers; on narrow screens the book stays centered
          so the recto page fills the frame. */}
      <div className="book-3d">
        <div
          className={`book-wrap${current > 0 ? " book-open" : ""}${fast ? " book-fast" : ""}`}
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
                let zIndex = sheets.length - i;
                if (movingSheet === i) zIndex = 100 + i;
                else if (flipped) zIndex = i + 1;

                const classes = [
                  "sheet",
                  flipped ? "sheet-flipped" : "",
                  i === current ? "sheet-current" : "",
                  i === 0 ? "sheet-cover" : "",
                  movingSheet === i ? "sheet-flipping" : "",
                  revealedSheet === i ? "sheet-revealed" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div // NOSONAR:S6848 -- pointer affordance; keyboard twin via onKeyDown, role=button would flatten page content for screen readers
                    key={sheet.id}
                    className={classes}
                    style={{ zIndex }}
                    ref={(el) => {
                      if (el) sheetEls.current.set(sheet.id, el);
                      else sheetEls.current.delete(sheet.id);
                    }}
                    onPointerDown={handlePointerDown}
                    onClick={handleSheetClick(i)}
                    onKeyDown={handleSheetKeyDown(i)}
                    onTransitionEnd={handleSheetTransitionEnd(i)}
                  >
                    {/* Non-current fronts are inert + hidden from the a11y
                        tree: their links can never receive keyboard focus.
                        (The sheet itself stays clickable — inert children
                        pass the hit through to it in Chromium/Firefox.
                        Note: the outgoing page becomes hidden mid-flip while
                        it may still hold focus — transient, input is locked
                        and focus moves to the new heading at the end.)
                        Backs are never inert on purpose: no back face holds
                        a link or button, so inert buys no tab-order safety
                        there, and it blocks wheel and touch scrolling on the
                        visible left page of the spread (the colophon). */}
                    <div
                      className="sheet-front"
                      inert={i !== current ? true : undefined}
                      aria-hidden={i !== current ? "true" : undefined}
                    >
                      {sheet.front}
                    </div>
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
            disabled={busy || isFirst}
            aria-label="Previous page"
          >
            &larr; Prev
          </button>
          <span className="book-indicator">{indicator}</span>
          <button
            type="button"
            className="btn"
            onClick={() => onFlip(current + 1)}
            disabled={busy || isLast}
            aria-label="Next page"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
