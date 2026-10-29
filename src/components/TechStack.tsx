'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stackGroups, type StackGroup } from '@/src/data/content';
import { LineReveal, SectionLabel } from '@/src/components/ui/Reveal';

const swatch: Record<string, string> = { eng: '#121210', ai: '#FF4F1A', cut: '#8B5CF6' };

function GroupPanel({ group, index }: { group: StackGroup; index: number }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <article className="flex w-full shrink-0 flex-col self-center rounded-[28px] border border-line bg-card p-7 shadow-[0_30px_60px_-40px_rgba(18,18,16,0.35)] md:w-[500px] md:p-9">
      <div className="flex items-start justify-between">
        <span className="label text-muted">{String(index + 1).padStart(2, '0')} / {String(stackGroups.length).padStart(2, '0')}</span>
        <span className="h-3 w-3 rounded-full" style={{ background: swatch[group.key] }} />
      </div>
      <h3 className="mt-6 text-[40px] font-semibold leading-none tracking-[-0.045em]">{group.title}</h3>
      <p className="mt-3 text-[15px] text-muted">{group.blurb}</p>
      <ul className="mt-6 border-t border-line">
        {group.items.map((item) => (
          <li key={item.name} className="border-b border-line">
            <button
              onMouseEnter={() => setOpen(item.name)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(item.name)}
              onBlur={() => setOpen(null)}
              onClick={() => setOpen((o) => (o === item.name ? null : item.name))}
              aria-expanded={open === item.name}
              className="group flex w-full flex-col py-2.5 text-left"
            >
              <span className="flex items-center justify-between text-[16px] font-medium">
                {item.name}
                <span className={`text-muted transition-transform duration-300 ${open === item.name ? 'rotate-45 text-accent' : ''}`}>+</span>
              </span>
              <span className={`grid transition-all duration-300 ${open === item.name ? 'mt-1 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <span className="overflow-hidden text-[14px] leading-snug text-muted">{item.context}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Intro() {
  return (
    <div className="flex shrink-0 flex-col justify-center md:w-[440px]">
      <SectionLabel index="06">Toolkit</SectionLabel>
      <h2 className="font-serif mt-6 text-[clamp(2.6rem,5vw,5rem)] leading-[0.95]">
        <LineReveal text="Tools I actually" />
        <LineReveal text="use, daily." delay={0.08} className="font-accent text-accent" />
      </h2>
      <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-soft">
        Engineering, AI and video editing. Hover any tool to see where it earned its place.
      </p>
    </div>
  );
}

export default function TechStack() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -travel], { clamp: true });

  useEffect(() => {
    const measure = () => setTravel(Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + 80));
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div id="stack">
      {/* Desktop: the rail scrubs sideways as the page scrolls down. */}
      <section ref={section} className="relative hidden md:block" style={{ height: `calc(100vh + ${travel}px)` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex items-center gap-6 pl-10 pr-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
            <Intro />
            {stackGroups.map((g, i) => (
              <GroupPanel key={g.key} group={g} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: stacked panels. */}
      <section className="flex flex-col gap-5 px-5 py-24 md:hidden">
        <Intro />
        {stackGroups.map((g, i) => (
          <GroupPanel key={g.key} group={g} index={i} />
        ))}
      </section>
    </div>
  );
}
