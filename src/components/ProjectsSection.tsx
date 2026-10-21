'use client';

import dynamic from 'next/dynamic';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects, type Project } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

const toneBg: Record<Project['tone'], string> = {
  ink: 'bg-[#121210] text-white',
  clay: 'bg-clay text-[#121210]',
  sage: 'bg-sage text-[#121210]',
  sky: 'bg-sky text-[#121210]',
  violet: 'bg-[#E3DEFF] text-[#121210]',
};

function VoiceVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex h-24 items-center gap-[5px]">
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-[5px] rounded-full bg-accent"
            animate={{ height: [8, 18 + ((i * 37) % 70), 8] }}
            transition={{ duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
          />
        ))}
      </div>
      <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-[12px] leading-relaxed text-white/70">
        <div><span className="text-accent">›</span> “Alexa, initialize workspace protocol”</div>
        <div className="text-[#3DDC84]">✓ intent: PC_CONTROL_AUTOMATION</div>
        <div>✓ context: Brain-0 persistent memory</div>
        <div>✓ dispatch &lt;14ms · multi-LLM failover</div>
      </div>
    </div>
  );
}

function PlatformVisual() {
  return (
    <div className="relative h-36">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-x-6 h-24 rounded-2xl border border-[#121210]/10 bg-white p-3 shadow-sm"
          style={{ top: i * 14, scale: 1 - (2 - i) * 0.05, zIndex: i }}
          whileHover={{ y: -6 }}
        >
          <div className="h-2 w-16 rounded-full bg-[#121210]/80" />
          <div className="mt-2 h-2 w-28 rounded-full bg-[#121210]/15" />
          <div className="mt-3 flex gap-1.5">
            <div className="h-8 flex-1 rounded-lg bg-clay" />
            <div className="h-8 flex-1 rounded-lg bg-[#F5F3EE]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RadarVisual() {
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-full w-full rounded-full border border-[#121210]/30"
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}
      <span className="relative h-4 w-4 rounded-full bg-accent shadow-[0_0_0_6px_rgba(255,79,26,0.2)]" />
      <span className="absolute right-4 top-6 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold shadow">SOS · P1</span>
    </div>
  );
}

function RatingVisual() {
  return (
    <div className="w-full max-w-xs space-y-2">
      {[92, 74, 58, 31].map((w, i) => (
        <div key={i} className="flex items-center gap-3 text-[12px] font-medium">
          <span className="w-6 text-[#77756D]">{5 - i}★</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white">
            <motion.div
              className="h-full rounded-full bg-[#121210]"
              initial={{ width: 0 }}
              whileInView={{ width: `${w}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TbbVisual() {
  const rows = [
    ['Ad cut · Client 25', 'QC · first approval', '#8B5CF6'],
    ['Talking head · Client 50', 'In edit', '#FF5A24'],
    ['Short · Client 12', 'Sent to client', '#22C55E'],
  ];
  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-[#121210]/10 bg-white shadow-[0_20px_40px_-24px_rgba(18,18,16,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-[#121210]/10 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] font-semibold text-[#121210]/60">Content pipeline</span>
      </div>
      <div className="space-y-1.5 p-3">
        {rows.map(([name, status, c]) => (
          <div key={name} className="flex items-center gap-2 rounded-lg bg-[#F5F3EE] px-2.5 py-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c }} />
            <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#121210]">{name}</span>
            <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white" style={{ background: c }}>{status}</span>
          </div>
        ))}
        <div className="flex gap-1 pt-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="h-1 flex-1 rounded-full" style={{ background: i < 7 ? '#8B5CF6' : '#E3E0D8' }} />
          ))}
        </div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#121210]/50">10-stage QC workflow</div>
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.ReactElement> = {
  tbb: TbbVisual,
  durjoyai: VoiceVisual,
  lowkeybd: PlatformVisual,
  emergon: RadarVisual,
  gamecritic: RatingVisual,
};

// Gentle 3D tilt toward the cursor while hovering a card.
const STEP = 30; // degrees between cards on the arc
const RADIUS = 860;

// Signed distance from the front slot, wrapped so the carousel loops endlessly.
function wrapOffset(i: number, pos: number, n: number) {
  return ((((i - pos + n / 2) % n) + n) % n) - n / 2;
}

function ArcCard({ project: p, index, pos, total, onPick }: {
  project: Project;
  index: number;
  pos: MotionValue<number>;
  total: number;
  onPick: (index: number, k: number) => void;
}) {
  // Concave arc: neighbours swing toward the viewer and turn to face the centre.
  const transform = useTransform(pos, (v) => {
    const k = wrapOffset(index, v, total);
    const a = (k * STEP * Math.PI) / 180;
    return `translate3d(${RADIUS * Math.sin(a)}px, 0, ${RADIUS * (1 - Math.cos(a)) * 0.55}px) rotateY(${-k * STEP}deg)`;
  });
  const opacity = useTransform(pos, (v) => Math.max(0, 1 - Math.max(0, Math.abs(wrapOffset(index, v, total)) - 1.1) * 1.6));
  const zIndex = useTransform(pos, (v) => 100 - Math.round(Math.abs(wrapOffset(index, v, total)) * 10));
  const Visual = visuals[p.id];
  const dark = p.tone === 'ink';

  return (
    <motion.button
      type="button"
      onClick={() => onPick(index, wrapOffset(index, pos.get(), total))}
      aria-label={`${p.title}: ${p.short}`}
      className={`absolute left-1/2 top-0 -ml-[170px] flex h-[440px] w-[340px] flex-col justify-between overflow-hidden rounded-[28px] p-6 text-left shadow-[0_40px_80px_-40px_rgba(18,18,16,0.5)] will-change-transform sm:-ml-[190px] sm:w-[380px] ${toneBg[p.tone]}`}
      style={{ transform, opacity, zIndex }}
    >
      <div className={`flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? 'text-white/60' : 'text-[#121210]/60'}`}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{p.year}</span>
      </div>
      <div className="pointer-events-none flex flex-1 items-center">{Visual && <div className="w-full"><Visual /></div>}</div>
      <div>
        <div className="text-[30px] font-semibold leading-none tracking-[-0.04em]">{p.title}</div>
        <div className={`mt-2 text-[14px] ${dark ? 'text-white/60' : 'text-[#121210]/60'}`}>{p.short}</div>
      </div>
    </motion.button>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const n = projects.length;
  const pos = useMotionValue(0);
  const [active, setActive] = useState(0);
  const drag = useRef({ x: 0, start: 0, moved: false, down: false, lastX: 0, lastT: 0, v: 0 });
  useMotionValueEvent(pos, 'change', (v) => setActive(((Math.round(v) % n) + n) % n));

  const snapTo = useCallback((target: number) => animate(pos, target, { type: 'spring', stiffness: 170, damping: 26 }), [pos]);
  const step = (dir: 1 | -1) => snapTo(Math.round(pos.get()) + dir);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      if (Math.abs(e.clientX - d.x) > 6) d.moved = true;
      const now = performance.now();
      d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
      d.lastX = e.clientX;
      d.lastT = now;
      pos.set(d.start - (e.clientX - d.x) / 360);
    };
    const up = () => {
      const d = drag.current;
      if (!d.down) return;
      d.down = false;
      snapTo(Math.round(pos.get() - d.v * 1.2));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [pos, snapTo]);

  const onPick = (index: number, k: number) => {
    if (drag.current.moved) return;
    if (Math.abs(k) < 0.5) setSelected(projects[index]);
    else snapTo(pos.get() + k);
  };

  const current = projects[active];

  return (
    <section id="work" className="overflow-x-clip py-28 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-10">
        <div>
          <SectionLabel index="03">Selected work</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="Systems I’ve" />
            <LineReveal text="designed & shipped." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Drag, swipe or use the arrows. Open the front card for the architecture and the decisions behind it.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div
          className="relative mx-auto mt-16 h-[460px] cursor-grab select-none outline-none active:cursor-grabbing"
          style={{ perspective: 1400, touchAction: 'pan-y' }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, lastX: e.clientX, lastT: performance.now(), start: pos.get(), moved: false, down: true, v: 0 };
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
        >
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((p, i) => (
              <ArcCard key={p.id} project={p} index={i} pos={pos} total={n} onPick={onPick} />
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 items-end gap-6 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-8" aria-live="polite">
          <div className="label text-muted">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {current.category}</div>
          <motion.p key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-3 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
            {current.tagline}
          </motion.p>
        </div>
        <div className="flex items-center gap-3 md:col-span-4 md:justify-end">
          <div className="mr-2 flex gap-1.5">
            {projects.map((p, i) => (
              <button key={p.id} aria-label={`Go to ${p.title}`} onClick={() => snapTo(pos.get() + wrapOffset(i, pos.get(), n))} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-accent' : 'w-1.5 bg-line'}`} />
            ))}
          </div>
          <button onClick={() => step(-1)} aria-label="Previous project" className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-ink">←</button>
          <button onClick={() => step(1)} aria-label="Next project" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-accent hover:text-white">→</button>
          <button onClick={() => setSelected(current)} className="hidden h-12 items-center rounded-full border border-line px-5 text-[14px] font-medium transition-colors hover:border-ink sm:inline-flex">Case study</button>
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
