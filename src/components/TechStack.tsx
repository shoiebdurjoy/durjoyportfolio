'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  siCplusplus, siDavinciresolve, siDocker, siFastapi, siFlask, siFlutter, siGit, siNestjs, siNextdotjs,
  siNvidia, siPostgresql, siPython, siPytorch, siReact, siRedis, siSocketdotio, siSupabase, siTypescript,
} from 'simple-icons';
import { stackGroups, type StackGroup } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

type Mark = { path: string; hex: string } | { mono: string; hex: string };

// Real logos where the open icon set has them; monogram badges for brands that asked to be removed.
const marks: Record<string, Mark> = {
  TypeScript: { path: siTypescript.path, hex: siTypescript.hex },
  Python: { path: siPython.path, hex: siPython.hex },
  'Next.js': { path: siNextdotjs.path, hex: '121210' },
  NestJS: { path: siNestjs.path, hex: siNestjs.hex },
  FastAPI: { path: siFastapi.path, hex: siFastapi.hex },
  Flutter: { path: siFlutter.path, hex: siFlutter.hex },
  React: { path: siReact.path, hex: '149ECA' },
  Flask: { path: siFlask.path, hex: siFlask.hex },
  Supabase: { path: siSupabase.path, hex: siSupabase.hex },
  PostgreSQL: { path: siPostgresql.path, hex: siPostgresql.hex },
  Redis: { path: siRedis.path, hex: siRedis.hex },
  Docker: { path: siDocker.path, hex: siDocker.hex },
  'Socket.IO': { path: siSocketdotio.path, hex: '121210' },
  'C++': { path: siCplusplus.path, hex: siCplusplus.hex },
  'Git & Linux': { path: siGit.path, hex: siGit.hex },
  PyTorch: { path: siPytorch.path, hex: siPytorch.hex },
  CUDA: { path: siNvidia.path, hex: siNvidia.hex },
  'OpenAI API': { mono: 'AI', hex: '10A37F' },
  'Alexa Skills': { mono: 'Ax', hex: '00CAFF' },
  'Premiere Pro': { mono: 'Pr', hex: '9999FF' },
  'After Effects': { mono: 'Ae', hex: 'B9A3FF' },
  'DaVinci Resolve': { path: siDavinciresolve.path, hex: 'E8A33D' },
  CapCut: { mono: 'Cc', hex: 'F3F1EC' },
};

function Logo({ name }: { name: string }) {
  const m = marks[name];
  if (!m) return null;
  // Grey at rest, brand colour on hover/focus (via the tile's --brand).
  if ('path' in m) {
    return (
      <svg viewBox="0 0 24 24" className="size-7 fill-current transition-colors duration-300" aria-hidden>
        <path d={m.path} />
      </svg>
    );
  }
  return (
    <span aria-hidden className="flex size-7 items-center justify-center rounded-[7px] border border-current text-[12px] font-bold tracking-tight transition-colors duration-300">
      {m.mono}
    </span>
  );
}

// A bento card: tool tiles, plus a footer that says where the hovered tool was actually used.
function GroupCard({ group, index, dark = false, className = '' }: { group: StackGroup; index: number; dark?: boolean; className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const current = group.items.find((i) => i.name === active);

  // Soft spotlight that follows the cursor: two CSS variables, no React re-render.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = card.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Reveal delay={index * 0.08} className={className}>
      <div
        ref={card}
        onPointerMove={onMove}
        className={`group/card relative flex h-full flex-col overflow-hidden rounded-[28px] border p-6 md:p-8 ${
          dark ? 'border-white/10 bg-[#121210] text-[#F3F1EC]' : 'border-line bg-card text-ink'
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), ${dark ? 'rgba(255,90,36,0.14)' : 'rgba(255,79,26,0.08)'}, transparent 70%)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${dark ? 'text-white/50' : 'text-muted'}`}>
              {String(index + 1).padStart(2, '0')} · {group.items.length} tools
            </span>
            <h3 className="font-serif mt-2 text-[30px] leading-none md:text-[36px]">{group.title}</h3>
            <p className={`mt-2 text-[14.5px] ${dark ? 'text-white/60' : 'text-ink-soft'}`}>{group.blurb}</p>
          </div>
        </div>

        <ul className={`relative mt-7 grid gap-2.5 ${group.items.length > 6 ? 'grid-cols-3 sm:grid-cols-4 xl:grid-cols-5' : 'grid-cols-3 sm:grid-cols-4'}`}>
          {group.items.map((item, i) => {
            const on = active === item.name;
            const hex = marks[item.name]?.hex ?? 'FF4F1A';
            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActive(item.name)}
                  onFocus={() => setActive(item.name)}
                  onClick={() => setActive(item.name)}
                  aria-pressed={on}
                  style={{ '--brand': `#${hex}` } as React.CSSProperties}
                  className={`flex h-[92px] w-full flex-col items-center justify-center gap-2 rounded-2xl border px-1.5 text-center transition-[border-color,background-color,translate] duration-300 hover:-translate-y-0.5 ${
                    dark
                      ? `${on ? 'border-white/30 bg-white/[0.08] text-[var(--brand)]' : 'border-white/10 bg-white/[0.03] text-white/45 hover:text-[var(--brand)]'}`
                      : `${on ? 'border-ink/30 bg-paper text-[var(--brand)]' : 'border-line bg-paper/60 text-ink/35 hover:text-[var(--brand)]'}`
                  }`}
                >
                  <Logo name={item.name} />
                  <span className={`text-[12px] font-medium leading-tight ${dark ? 'text-white/85' : 'text-ink'}`}>{item.name}</span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-auto pt-6" />
        <div aria-live="polite" className={`relative flex min-h-[64px] items-center gap-3 border-t pt-5 ${dark ? 'border-white/10' : 'border-line'}`}>
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
          {current ? (
            <motion.p key={current.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-[14px] leading-snug">
              <strong className="font-semibold">{current.name}</strong>
              <span className={dark ? 'text-white/60' : 'text-ink-soft'}> — {current.context}</span>
            </motion.p>
          ) : (
            <p className={`text-[14px] ${dark ? 'text-white/50' : 'text-muted'}`}>Hover or tap a tool to see where I used it.</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function TechStack() {
  const [eng, ai, video] = stackGroups;

  return (
    <section id="stack" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel index="06">Toolkit</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="Tools I actually" />
            <LineReveal text="use, daily." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Engineering, AI and video editing. Every tool here is tied to real work: hover one to see where.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        <GroupCard group={eng} index={0} className="lg:col-span-7 lg:row-span-2" />
        <GroupCard group={ai} index={1} className="lg:col-span-5" />
        <GroupCard group={video} index={2} dark className="lg:col-span-5" />
      </div>
    </section>
  );
}
