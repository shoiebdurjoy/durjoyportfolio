'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { stackGroups } from '@/src/data/content';
import { LineReveal, SectionLabel } from '@/src/components/ui/Reveal';
import Section from '@/src/components/ui/Section';

const dot: Record<string, string> = { eng: 'bg-white', ai: 'bg-accent', cut: 'bg-[#B794F6]' };

type Chip = { name: string; context: string; group: string; x: number; y: number; z: number };

// Tools sit on a Fibonacci sphere that is projected in JS each frame, so labels stay flat and readable.
function useSphere(count: number) {
  return useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return { x: Math.cos(i * golden) * r, y, z: Math.sin(i * golden) * r };
    });
  }, [count]);
}

export default function TechStack() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const group = stackGroups[active];
  const all = useMemo(() => stackGroups.flatMap((g) => g.items.map((it) => ({ ...it, group: g.key }))), []);
  const current = all.find((i) => i.name === hovered);
  const points = useSphere(all.length);
  // Spread groups over the sphere instead of banding them by latitude (8 is coprime with the count).
  const chips: Chip[] = useMemo(() => all.map((it, i) => ({ ...it, ...points[(i * 8) % all.length] })), [all, points]);

  const stage = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);
  const motionState = useRef({ ax: -0.25, ay: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, paused: false });
  const activeKey = useRef(group.key);

  useEffect(() => {
    activeKey.current = group.key;
  }, [group.key]);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const tick = () => {
      const m = motionState.current;
      const size = stage.current?.clientWidth ?? 500;
      const R = size * 0.4;
      if (!m.dragging) {
        m.ay += m.vy + (m.paused || still ? 0 : 0.0035);
        m.ax += m.vx;
        m.vy *= 0.94;
        m.vx *= 0.94;
        m.ax += (-0.25 - m.ax) * 0.02;
      }
      const cy = Math.cos(m.ay), sy = Math.sin(m.ay), cx = Math.cos(m.ax), sx = Math.sin(m.ax);
      chips.forEach((c, i) => {
        const el = els.current[i];
        if (!el) return;
        const x1 = c.x * cy + c.z * sy;
        const z1 = -c.x * sy + c.z * cy;
        const y2 = c.y * cx - z1 * sx;
        const z2 = c.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2;
        const inGroup = c.group === activeKey.current;
        el.style.transform = `translate3d(${x1 * R}px, ${y2 * R}px, 0) translate(-50%, -50%) scale(${0.62 + 0.48 * depth})`;
        el.style.opacity = String((0.25 + 0.75 * depth) * (inGroup ? 1 : 0.4));
        el.style.zIndex = String(Math.round(depth * 100));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [chips]);

  const onDown = (e: React.PointerEvent) => {
    const m = motionState.current;
    m.dragging = true;
    m.lastX = e.clientX;
    m.lastY = e.clientY;
  };
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const m = motionState.current;
      if (!m.dragging) return;
      m.vy = (e.clientX - m.lastX) * 0.006;
      m.vx = -(e.clientY - m.lastY) * 0.004;
      m.ay += m.vy;
      m.ax += m.vx;
      m.lastX = e.clientX;
      m.lastY = e.clientY;
    };
    const up = () => { motionState.current.dragging = false; };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <Section id="stack" theme="dark" className="my-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-28 md:px-8 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="03">Toolkit</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            <LineReveal text="Tools I actually" />
            <LineReveal text="use, daily." delay={0.08} className="italic text-muted" />
          </h2>

          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Tool categories">
            {stackGroups.map((g, i) => (
              <button
                key={g.key}
                role="tab"
                aria-selected={active === i}
                onClick={() => { setActive(i); setHovered(null); }}
                className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[15px] font-medium transition-colors ${
                  active === i ? 'bg-white text-[#121210]' : 'glass text-ink-soft hover:text-ink'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${dot[g.key]}`} />
                {g.title}
                <span className="text-[12px] tabular-nums opacity-60">{String(g.items.length).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-muted">{group.blurb}</p>

          <div className="glass mt-8 flex min-h-[84px] items-center gap-4 rounded-2xl px-6 py-5" aria-live="polite">
            <span className="text-accent">✦</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={current?.name ?? 'hint'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-[15px] leading-snug"
              >
                {current ? (
                  <><strong className="font-semibold">{current.name}</strong> <span className="text-ink-soft">— {current.context}</span></>
                ) : (
                  <span className="text-muted">Drag the sphere to spin it. Hover or tap any tool to see where I&apos;ve used it.</span>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={stage}
            onPointerDown={onDown}
            className="relative mx-auto aspect-square w-full max-w-[600px] cursor-grab select-none active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
          >
            <div aria-hidden className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />
            <div data-core aria-hidden className="absolute inset-[29%]" />
            <ul className="absolute left-1/2 top-1/2 h-0 w-0" aria-label="Tools">
              {chips.map((c, i) => (
                <li key={c.name}>
                  <button
                    ref={(el) => { els.current[i] = el; }}
                    onMouseEnter={() => { setHovered(c.name); motionState.current.paused = true; }}
                    onMouseLeave={() => { motionState.current.paused = false; }}
                    onFocus={() => { setHovered(c.name); motionState.current.paused = true; }}
                    onBlur={() => { motionState.current.paused = false; }}
                    onClick={() => setHovered(c.name)}
                    className={`absolute left-0 top-0 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium will-change-transform ${
                      hovered === c.name ? 'bg-accent text-white' : 'glass text-ink'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${hovered === c.name ? 'bg-white' : dot[c.group]}`} />
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
