'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { stackGroups } from '@/src/data/content';
import { LineReveal, SectionLabel } from '@/src/components/ui/Reveal';

export default function TechStack() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const group = stackGroups[active];
  const current = group.items.find((i) => i.name === hovered);

  return (
    <section id="stack" className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <SectionLabel index="03">Toolkit</SectionLabel>
        <h2 className="mt-6 font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
          <LineReveal text="Tools I actually" />
          <LineReveal text="use, daily." delay={0.08} className="italic text-muted" />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar lg:col-span-4 lg:flex-col lg:gap-0" role="tablist" aria-label="Tool categories">
            {stackGroups.map((g, i) => (
              <button
                key={g.key}
                role="tab"
                aria-selected={active === i}
                onClick={() => { setActive(i); setHovered(null); }}
                className={`group flex shrink-0 items-baseline justify-between gap-6 rounded-full border px-5 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-6 ${
                  active === i ? 'border-ink bg-ink text-white lg:bg-transparent lg:text-ink' : 'border-line text-muted hover:text-ink'
                }`}
              >
                <span className="font-serif text-2xl lg:text-5xl">
                  {active === i && <span className="mr-3 hidden text-accent lg:inline">→</span>}
                  {g.title}
                </span>
                <span className="text-[13px] tabular-nums">{String(g.items.length).padStart(2, '0')}</span>
              </button>
            ))}
            <p className="mt-6 hidden text-[15px] text-muted lg:block">{group.blurb}</p>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.ul
                key={group.key}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.03 } }, hidden: {} }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onMouseEnter={() => setHovered(item.name)}
                      onFocus={() => setHovered(item.name)}
                      onClick={() => setHovered(item.name)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-5 text-left text-[16px] font-medium transition-all duration-300 ${
                        hovered === item.name ? 'border-accent bg-accent-soft' : 'border-line bg-paper hover:border-ink/30'
                      }`}
                    >
                      {item.name}
                      <span className={`h-2 w-2 rounded-full transition-colors ${hovered === item.name ? 'bg-accent' : 'bg-ink/15'}`} />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className="mt-6 flex min-h-[72px] items-center gap-4 rounded-2xl bg-ink px-6 py-5 text-white" aria-live="polite">
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
                    <><strong className="font-semibold">{current.name}</strong> <span className="text-white/70">— {current.context}</span></>
                  ) : (
                    <span className="text-white/60">Hover or tap any tool to see where I&apos;ve used it in real work.</span>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
