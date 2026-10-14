'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = ref.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    requestAnimationFrame(() => first?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== 'Tab' || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [active, ref, onEscape]);
}
