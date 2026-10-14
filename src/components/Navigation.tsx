'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navLinks, profile } from '@/src/data/content';
import { useFocusTrap } from '@/src/components/ui/useFocusTrap';

export function scrollToId(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navigation({ onCommandPaletteOpen }: { onCommandPaletteOpen: () => void }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(drawerRef, open, close);

  useEffect(() => {
    const id = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => cancelAnimationFrame(id);
  }, []);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400 && !open);
    setScrolled(v > 24);
  });

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Primary"
          className={`relative flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-500 ${
            scrolled ? 'border-line bg-white/75 shadow-[0_8px_30px_-12px_rgba(18,18,16,0.15)] backdrop-blur-xl' : 'border-transparent bg-transparent'
          }`}
        >
          <button onClick={() => go('#top')} className="flex items-baseline gap-1 text-ink" aria-label="Back to top">
            <span className="font-serif text-2xl leading-none">Durjoy</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onCommandPaletteOpen}
              aria-label="Open command palette"
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-white px-3 text-[13px] text-muted transition-colors hover:text-ink sm:flex"
            >
              Search
              <kbd className="rounded-md bg-paper px-1.5 py-0.5 font-sans text-[11px] text-ink-soft">⌘K</kbd>
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="hidden h-10 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-transform hover:scale-[1.03] sm:flex"
            >
              <span className="h-2 w-2 rounded-full bg-[#3DDC84] shadow-[0_0_0_3px_rgba(61,220,132,0.25)]" />
              Let&apos;s talk
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
            </button>
          </div>

          <motion.span
            aria-hidden
            className="absolute inset-x-6 -bottom-px h-px origin-left bg-accent"
            style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
          />
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-paper px-6 pb-10 pt-6"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl">Durjoy<span className="text-accent">.</span></span>
              <button onClick={close} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <ul className="mt-14 flex flex-1 flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button onClick={() => go(l.href)} className="flex w-full items-baseline gap-4 border-b border-line py-3 text-left">
                    <span className="text-[12px] text-muted">0{i + 1}</span>
                    <span className="font-serif text-5xl">{l.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${profile.email}`} className="rounded-full bg-accent py-4 text-center font-medium text-white">
                {profile.email}
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink py-4 text-center font-medium">
                Download résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
