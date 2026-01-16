import React from "react";

type UseSectionStepperScrollOptions = {
  /** CSS selector for the fullpage sections (footer should NOT match this). */
  selector: string;
  /** Enables/disables the behavior (handy for mobile or modals). */
  enabled?: boolean;
  /** Prevents multiple jumps from trackpad inertia. */
  lockMs?: number;
  /** Selector for a sticky header to offset the target scroll position. */
  topOffsetSelector?: string;
  /** When this selector is present & true, scrolling is ignored (e.g. mobile menu open). */
  disableWhenOpenSelector?: string;
  /** IDs of sections to exclude from the stepper logic. */
  excludedIds?: string[];
};

function isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof HTMLElement;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!isHTMLElement(target)) return false;

  const tag = target.tagName.toLowerCase();
  return (
    target.isContentEditable ||
    tag === "input" ||
    tag === "textarea" ||
    tag === "select"
  );
}

function hasScrollableAncestor(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;

  let el: Element | null = target;
  while (el && el !== document.documentElement) {
    if (el instanceof HTMLElement) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const canScroll =
        (overflowY === "auto" || overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 1;

      if (canScroll) return true;
    }
    el = el.parentElement;
  }

  return false;
}

export function useSectionStepperScroll({
  selector,
  enabled = true,
  lockMs = 650,
  topOffsetSelector = ".template-header",
  disableWhenOpenSelector = '.template-mobile-overlay[data-open="true"]',
  excludedIds = [],
}: UseSectionStepperScrollOptions) {
  const lockTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    // Desktop-only behavior: disable on mobile + tablets.
    // Aligns with Tailwind's `lg` breakpoint.
    const desktopMq = window.matchMedia("(min-width: 1024px)");

    const getTopOffset = () => {
      const el = document.querySelector(topOffsetSelector);
      return el instanceof HTMLElement ? el.offsetHeight : 0;
    };

    const isTemporarilyDisabled = () => {
      if (!disableWhenOpenSelector) return false;
      return document.querySelector(disableWhenOpenSelector) != null;
    };

    const getSections = (): HTMLElement[] => {
      return Array.from(document.querySelectorAll(selector)).filter(
        (n): n is HTMLElement => n instanceof HTMLElement
      );
    };

    const getSectionTops = (sections: HTMLElement[]) => {
      const topOffset = getTopOffset();
      return sections.map(
        (s) => s.getBoundingClientRect().top + window.scrollY - topOffset
      );
    };

    const getCurrentIndex = (tops: number[], scrollY: number) => {
      // Last section whose top is <= current position.
      let idx = 0;
      for (let i = 0; i < tops.length; i++) {
        if (scrollY >= tops[i] - 2) idx = i;
      }
      return idx;
    };

    const snapThresholdPx = 24;

    const lock = () => {
      if (lockTimeoutRef.current) window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = window.setTimeout(() => {
        lockTimeoutRef.current = null;
      }, lockMs);
    };

    const scrollToIndex = (sections: HTMLElement[], index: number) => {
      const topOffset = getTopOffset();
      const targetTop =
        sections[index].getBoundingClientRect().top +
        window.scrollY -
        topOffset;

      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      lock();
    };

    const shouldIgnoreEvent = (target: EventTarget | null) => {
      if (isTemporarilyDisabled()) return true;
      if (isEditableTarget(target)) return true;
      if (hasScrollableAncestor(target)) return true;
      if (
        target instanceof Element &&
        target.closest(".template-mobile-drawer")
      )
        return true;
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-to-zoom
      if (shouldIgnoreEvent(e.target)) return;

      // On coarse pointers (touch), intercepting wheel-like scrolling is usually bad.
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const sections = getSections();
      if (sections.length < 2) return;

      const dir = Math.sign(e.deltaY);
      if (dir === 0) return;

      const tops = getSectionTops(sections);
      const currentIndex = getCurrentIndex(tops, window.scrollY);

      // Check if current section is excluded
      const currentSection = sections[currentIndex];
      if (
        excludedIds.length > 0 &&
        currentSection.id &&
        excludedIds.includes(currentSection.id)
      ) {
        // Allow native scrolling within excluded sections
        return;
      }

      // If we're not aligned to the top of the current section, first snap to it.
      // This prevents skipping a section when the user is in-between (e.g. footer area).
      const currentTop = tops[currentIndex];
      const isAlignedToCurrentTop =
        window.scrollY <= currentTop + snapThresholdPx;

      // Allow natural scrolling past the last section into the footer.
      if (dir > 0 && currentIndex >= sections.length - 1) return;
      // Allow natural scrolling above the first section.
      if (dir < 0 && currentIndex <= 0) return;

      // If we're locked, swallow inertia so it doesn't trigger extra jumps.
      if (lockTimeoutRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (dir < 0 && !isAlignedToCurrentTop) {
        scrollToIndex(sections, currentIndex);
        return;
      }

      scrollToIndex(sections, currentIndex + (dir > 0 ? 1 : -1));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (shouldIgnoreEvent(e.target)) return;

      const isNext =
        e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      const isPrev = e.key === "ArrowUp" || e.key === "PageUp";
      if (!isNext && !isPrev) return;

      const sections = getSections();
      if (sections.length < 2) return;

      const tops = getSectionTops(sections);
      const currentIndex = getCurrentIndex(tops, window.scrollY);

      // Check if current section is excluded
      const currentSection = sections[currentIndex];
      if (
        excludedIds.length > 0 &&
        currentSection.id &&
        excludedIds.includes(currentSection.id)
      ) {
        return;
      }

      const currentTop = tops[currentIndex];
      const isAlignedToCurrentTop =
        window.scrollY <= currentTop + snapThresholdPx;

      const wantsPrev = e.key === " " ? e.shiftKey : isPrev;

      if (wantsPrev && currentIndex > 0 && !isAlignedToCurrentTop) {
        e.preventDefault();
        if (!lockTimeoutRef.current) {
          scrollToIndex(sections, currentIndex);
        }
        return;
      }

      const nextIndex = wantsPrev ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex < 0 || nextIndex >= sections.length) return;

      if (lockTimeoutRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      scrollToIndex(sections, nextIndex);
    };

    let active = false;
    const attach = () => {
      if (active) return;
      active = true;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKeyDown);
    };

    const detach = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      if (lockTimeoutRef.current) window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = null;
    };

    const sync = () => {
      if (desktopMq.matches) attach();
      else detach();
    };

    sync();

    // Keep in sync if viewport crosses desktop breakpoint.
    // Safari < 14 uses addListener/removeListener.
    const onMqChange = () => sync();
    if (typeof desktopMq.addEventListener === "function") {
      desktopMq.addEventListener("change", onMqChange);
    } else {
      desktopMq.addListener(onMqChange);
    }

    return () => {
      detach();
      if (typeof desktopMq.removeEventListener === "function") {
        desktopMq.removeEventListener("change", onMqChange);
      } else {
        desktopMq.removeListener(onMqChange);
      }
    };
  }, [
    selector,
    enabled,
    lockMs,
    topOffsetSelector,
    disableWhenOpenSelector,
    excludedIds,
  ]);
}
