'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { thesisStages } from '@/src/data/content';
import { SectionLabel } from '@/src/components/ui/Reveal';

const emotions = ['Happy', 'Sad', 'Angry', 'Fear', 'Neutral'];

export default function ThesisSection() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] });

  return (
    <section id="thesis" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="07">Research</SectionLabel>
            <h2 className="font-serif mt-6 text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.98]">
              Teaching machines to read <em className="font-accent text-accent">Bangla</em> emotion.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">
              Bachelor&apos;s thesis at BRAC University: a multimodal deep learning pipeline that fuses voice and facial
              signals to classify emotion in conversational Bangla.
            </p>

            <div className="mt-10 rounded-3xl border border-line bg-card p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">Pipeline stage</span>
                <span className="font-serif text-5xl tabular-nums">
                  {thesisStages[active].step}<span className="text-muted">/05</span>
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper">
                <motion.div className="h-full origin-left rounded-full bg-accent" style={{ scaleX: scrollYProgress }} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {emotions.map((e, i) => (
                  <span
                    key={e}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-500 ${
                      active === 4 && i === 0 ? 'bg-accent text-white' : active === 4 ? 'bg-accent-soft text-ink' : 'bg-paper text-muted'
                    }`}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative space-y-4 lg:col-span-7">
          {thesisStages.map((s, i) => (
            <motion.li
              key={s.step}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              className={`rounded-[28px] border p-7 transition-all duration-500 md:p-9 ${
                active === i ? 'border-ink bg-card shadow-[0_30px_60px_-30px_rgba(18,18,16,0.3)]' : 'border-line bg-transparent opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-5xl text-accent">{s.step}</span>
                <span className="rounded-full bg-paper px-3 py-1 text-[12px] font-medium text-ink-soft">{s.tag}</span>
              </div>
              <h3 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{s.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-[13px]">{t}</span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
