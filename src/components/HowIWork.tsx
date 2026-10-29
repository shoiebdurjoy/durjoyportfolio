'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

// The same five steps in both crafts. Every "code" line points at something real in the repos.
const steps = [
  {
    name: 'Brief',
    edit: 'Who is it for, what is the one message, when is it due. Nothing gets cut before that is clear.',
    code: 'TBB Workspace began with a written audit, requirements and architecture before any code.',
  },
  {
    name: 'Rough cut',
    edit: 'Assemble the story fast and watch it end to end before polishing a single frame.',
    code: 'Baeky’s core loop came first: Agree → Track → Remind → Pay → Confirm.',
  },
  {
    name: 'QC',
    edit: 'Every video passes a QC pass before a client ever sees it.',
    code: 'Tests are my QC: 315 automated tests on Baeky, and database permissions tested in real Postgres.',
  },
  {
    name: 'Revisions',
    edit: 'Timestamped client notes, turned around quickly without breaking what already works.',
    code: 'Gated phases: TBB Workspace ships in 15 phases, each signed off before the next starts.',
  },
  {
    name: 'Delivery',
    edit: 'Export in the right format, deliver, archive the project cleanly.',
    code: 'Deployed (Vercel, Render) and documented so a teammate can pick it up.',
  },
];

export default function HowIWork() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel index="04">How I work</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="I build software" />
            <LineReveal text="the way I edit." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Three years in an edit bay gave me a process. It turns out to be a good way to ship software too.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16">
        {/* Track labels, like an editor's timeline */}
        <div className="hidden grid-cols-[96px_repeat(5,1fr)] gap-3 lg:grid">
          <span />
          {steps.map((s, i) => (
            <div key={s.name} className="flex items-center gap-2 pb-4">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] transition-colors ${hover === i ? 'bg-accent text-white' : 'bg-ink text-paper'}`}>{i + 1}</span>
              <span className="text-[17px] font-semibold tracking-[-0.02em]">{s.name}</span>
            </div>
          ))}
        </div>

        {(['edit', 'code'] as const).map((track) => (
          <div key={track} className="hidden grid-cols-[96px_repeat(5,1fr)] gap-3 lg:mb-3 lg:grid">
            <span className="flex items-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{track === 'edit' ? 'In the edit' : 'In the code'}</span>
            {steps.map((s, i) => (
              <motion.div
                key={s.name}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06 + (track === 'code' ? 0.15 : 0), ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border p-4 text-[14px] leading-relaxed transition-colors duration-300 ${
                  track === 'edit'
                    ? `bg-card ${hover === i ? 'border-accent' : 'border-line'}`
                    : `${hover === i ? 'border-accent bg-accent-soft' : 'border-line bg-paper'}`
                }`}
              >
                {s[track]}
              </motion.div>
            ))}
          </div>
        ))}

        {/* Small screens: one card per step */}
        <ol className="space-y-3 lg:hidden">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <li className="rounded-2xl border border-line bg-card p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">{i + 1}</span>
                  <span className="text-[18px] font-semibold tracking-[-0.02em]">{s.name}</span>
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">In the edit</div>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{s.edit}</p>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">In the code</div>
                <p className="mt-1 text-[15px] leading-relaxed">{s.code}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
