'use client';

import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { navLinks, profile, projects } from '@/src/data/content';
import { scrollToId } from '@/src/components/Navigation';
import { useFocusTrap } from '@/src/components/ui/useFocusTrap';

type Command = { id: string; label: string; group: string; hint?: string; run: () => void };

const commands: Command[] = [
  ...navLinks.map((l) => ({ id: l.href, label: l.label, group: 'Jump to', run: () => scrollToId(l.href) })),
  ...projects.map((p) => ({ id: p.id, label: p.title, hint: p.short, group: 'Projects', run: () => scrollToId('#work') })),
  { id: 'email', label: 'Email me', hint: profile.email, group: 'Contact', run: () => (window.location.href = `mailto:${profile.email}`) },
  { id: 'resume', label: 'Download résumé', group: 'Contact', run: () => window.open(profile.resume, '_blank', 'noopener') },
  { id: 'gh', label: 'GitHub', group: 'Links', run: () => window.open(profile.github, '_blank', 'noopener') },
  { id: 'li', label: 'LinkedIn', group: 'Links', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
  { id: 'be', label: 'Behance', group: 'Links', run: () => window.open(profile.behance, '_blank', 'noopener') },
];

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return q ? commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [query]);

  const select = (c: Command) => {
    onClose();
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => (i + 1) % results.length); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => (i - 1 + results.length) % results.length); }
    if (e.key === 'Enter') { e.preventDefault(); select(results[index]); }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]">
      <motion.div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <span className="text-muted">⌕</span>
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
            onKeyDown={onKeyDown}
            placeholder="Search sections, projects, links…"
            aria-label="Search commands"
            aria-controls="palette-results"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            className="h-14 w-full bg-transparent text-[16px] outline-none placeholder:text-muted"
          />
          <kbd className="rounded-md bg-paper px-2 py-1 text-[11px] text-muted">Esc</kbd>
        </div>
        <ul id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
          {results.length === 0 && <li className="px-4 py-8 text-center text-muted">No results</li>}
          {results.map((c, i) => {
            const header = i === 0 || results[i - 1].group !== c.group ? c.group : null;
            return (
              <li key={c.id} role="presentation">
                {header && <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{header}</div>}
                <button
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === index}
                  tabIndex={-1}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => select(c)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] ${i === index ? 'bg-accent-soft' : ''}`}
                >
                  <span className="font-medium">{c.label}</span>
                  <span className="text-[13px] text-muted">{i === index ? '↵' : c.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
