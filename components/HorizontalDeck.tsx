"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = {
  key: string;
  label: string;
  /** id of the nav section this slide represents ("" = none) */
  navId: string;
  content: ReactNode;
};

const DESKTOP = "(min-width: 1024px)";
const SLIDE_MS = 900; // must match the track transition below

/**
 * Desktop: the page becomes a row of full-screen slides. Each wheel /
 * trackpad / key "step" slides horizontally to the next one. A slide whose
 * content is taller than the screen scrolls through its own content first,
 * then moves on when you reach its end.
 *
 * Phones & tablets: falls back to the normal vertical page.
 */
export default function HorizontalDeck({ slides }: { slides: Slide[] }) {
  const [enabled, setEnabled] = useState(false);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animating = useRef(false);
  const gestureLocked = useRef(false);
  const gestureTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // ---- turn deck mode on for large screens only ----
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("deck-on", enabled);
    return () => document.body.classList.remove("deck-on");
  }, [enabled]);

  /**
   * The element that scrolls on slide i: an inner `[data-deck-scroll]`
   * column if it actually overflows (e.g. Beyond's list), else the slide.
   */
  const scrollerOf = useCallback((i: number): HTMLElement | null => {
    const slide = slideRefs.current[i];
    if (!slide) return null;
    const inner = slide.querySelector<HTMLElement>("[data-deck-scroll]");
    if (inner && inner.scrollHeight > inner.clientHeight + 1 && getComputedStyle(inner).overflowY !== "visible") return inner;
    return slide;
  }, []);

  // ---- move to a slide ----
  const go = useCallback(
    (next: number, opts: { instant?: boolean; scrollTo?: HTMLElement | null } = {}) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      const prev = indexRef.current;
      const el = slideRefs.current[clamped];
      if (el) {
        if (opts.scrollTo) {
          const top = opts.scrollTo.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 110;
          el.scrollTop = Math.max(0, top);
        } else if (clamped !== prev) {
          // going forward starts at the top, going back lands at the bottom
          el.scrollTop = clamped > prev ? 0 : el.scrollHeight;
          const inner = scrollerOf(clamped);
          if (inner && inner !== el) inner.scrollTop = clamped > prev ? 0 : inner.scrollHeight;
        }
      }
      if (clamped === prev) return;
      indexRef.current = clamped;
      setIndex(clamped);
      if (!opts.instant) {
        animating.current = true;
        setTimeout(() => (animating.current = false), SLIDE_MS);
      }
      window.dispatchEvent(
        new CustomEvent("deck:change", { detail: { index: clamped, navId: slides[clamped].navId } }),
      );
    },
    [slides, scrollerOf],
  );

  // ---- wheel / trackpad ----
  useEffect(() => {
    if (!enabled) return;

    const onWheel = (e: WheelEvent) => {
      // let pinch-zoom and modals behave normally
      if (e.ctrlKey || document.body.classList.contains("blur-content")) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;
      const dir = delta > 0 ? 1 : -1;
      const scroller = scrollerOf(indexRef.current);

      // mid-transition: swallow everything
      if (animating.current) {
        e.preventDefault();
        bumpGesture();
        return;
      }

      // a tall slide (or its scrollable column) scrolls until it hits an edge
      if (scroller && Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const atTop = scroller.scrollTop <= 1;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) {
          // pointer outside the scrolling column (e.g. over Beyond's heading):
          // scroll the column ourselves so the whole slide feels like one unit
          if (!scroller.contains(e.target as Node)) {
            e.preventDefault();
            const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
            scroller.scrollTop += px;
          }
          // keep the gesture "used" so trackpad momentum doesn't fling
          // straight into the next slide
          bumpGesture();
          return;
        }
      }

      e.preventDefault();
      if (gestureLocked.current) {
        bumpGesture();
        return;
      }
      go(indexRef.current + dir);
      bumpGesture();
    };

    // a "gesture" ends after 180ms without wheel events (kills trackpad inertia)
    const bumpGesture = () => {
      gestureLocked.current = true;
      clearTimeout(gestureTimer.current);
      gestureTimer.current = setTimeout(() => (gestureLocked.current = false), 180);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [enabled, go, scrollerOf]);

  // ---- keyboard ----
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable=true], [role=tablist]")) return;
      const slide = slideRefs.current[indexRef.current];
      const scroller = scrollerOf(indexRef.current);
      const atTop = !scroller || scroller.scrollTop <= 1;
      const atBottom = !scroller || scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
      // an inner column isn't focused, so scroll it for the user
      if (scroller && scroller !== slide && !atBottom && ["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        scroller.scrollBy({ top: e.key === "ArrowDown" ? 80 : scroller.clientHeight * 0.85, behavior: "smooth" });
        return;
      }
      if (scroller && scroller !== slide && !atTop && (["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey))) {
        e.preventDefault();
        scroller.scrollBy({ top: e.key === "ArrowUp" ? -80 : -scroller.clientHeight * 0.85, behavior: "smooth" });
        return;
      }
      let dir = 0;
      if (e.key === "ArrowRight" || (e.key === "PageDown" && atBottom) || (e.key === "ArrowDown" && atBottom) || (e.key === " " && !e.shiftKey && atBottom)) dir = 1;
      if (e.key === "ArrowLeft" || (e.key === "PageUp" && atTop) || (e.key === "ArrowUp" && atTop) || (e.key === " " && e.shiftKey && atTop)) dir = -1;
      if (e.key === "Home") return go(0), e.preventDefault();
      if (e.key === "End") return go(slides.length - 1), e.preventDefault();
      if (!dir || animating.current) return;
      e.preventDefault();
      go(indexRef.current + dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, go, slides.length, scrollerOf]);

  // ---- touch (large touch screens) ----
  useEffect(() => {
    if (!enabled) return;
    let x0 = 0, y0 = 0;
    const start = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const end = (e: TouchEvent) => {
      const dx = x0 - e.changedTouches[0].clientX;
      const dy = y0 - e.changedTouches[0].clientY;
      const scroller = scrollerOf(indexRef.current);
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) return go(indexRef.current + (dx > 0 ? 1 : -1));
      if (Math.abs(dy) > 60 && scroller) {
        const atTop = scroller.scrollTop <= 1;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if (dy > 0 && atBottom) go(indexRef.current + 1);
        if (dy < 0 && atTop) go(indexRef.current - 1);
      }
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [enabled, go, scrollerOf]);

  // ---- in-page links (#about, #projects …) and tabbing into another slide ----
  useEffect(() => {
    if (!enabled) return;
    const slideOf = (el: Element | null) => slideRefs.current.findIndex((s) => !!s && !!el && s.contains(el));

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return e.preventDefault(), go(0);
      const target = document.getElementById(id);
      const i = slideOf(target);
      if (i < 0) return;
      e.preventDefault();
      go(i, { scrollTo: target });
    };
    const onFocus = (e: FocusEvent) => {
      const i = slideOf(e.target as Element);
      if (i >= 0 && i !== indexRef.current) go(i, { scrollTo: e.target as HTMLElement });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
    };
  }, [enabled, go]);

  // ---- every load / reload starts on the landing slide ----
  // Drop any leftover "#section" from the URL and stop the browser from
  // restoring the old scroll position.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
  }, []);

  // ---------- render ----------
  if (!enabled) {
    // phones / tablets: normal vertical page
    return (
      <div className="mx-auto w-full max-w-[1600px] px-[25px] sm:px-[50px] md:px-[100px] xl:px-[150px]">
        {slides.map((s) => (
          <div key={s.key}>{s.content}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-clip">
      <div
        className="flex h-full w-full motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.key}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            inert={i !== index}
            className="deck-slide relative flex h-full w-full shrink-0 overflow-y-auto overscroll-contain [scrollbar-width:none]"
          >
            <div className="slide-inner m-auto w-full max-w-[1600px] px-[100px] pb-[40px] pt-[96px] xl:px-[150px]">
              {s.content}
            </div>
          </div>
        ))}
      </div>

      <ScrollHint />
    </div>
  );
}

/** "Scroll →" hint, top right under the nav, on every slide. */
function ScrollHint() {
  return (
      <div
        className={`pointer-events-none fixed right-[60px] top-[112px] z-10 flex items-center gap-[10px] font-mono text-[12px] uppercase tracking-[0.2em] text-slate fade-in [animation-delay:1.2s]`}
      >
        Scroll
        <span className="relative block h-px w-[60px] overflow-hidden bg-lightest-navy">
          <span className="absolute inset-y-0 left-0 w-1/2 animate-[deckHint_1.6s_ease-in-out_infinite] bg-amber" />
        </span>
        →
      </div>
  );
}
