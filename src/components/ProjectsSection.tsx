'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects, type Project } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

const toneBg: Record<Project['tone'], string> = {
  ink: 'bg-ink text-white',
  clay: 'bg-clay',
  sage: 'bg-sage',
  sky: 'bg-sky',
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
          className="absolute inset-x-6 h-24 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm"
          style={{ top: i * 14, scale: 1 - (2 - i) * 0.05, zIndex: i }}
          whileHover={{ y: -6 }}
        >
          <div className="h-2 w-16 rounded-full bg-ink/80" />
          <div className="mt-2 h-2 w-28 rounded-full bg-ink/15" />
          <div className="mt-3 flex gap-1.5">
            <div className="h-8 flex-1 rounded-lg bg-clay" />
            <div className="h-8 flex-1 rounded-lg bg-paper" />
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
          className="absolute h-full w-full rounded-full border border-ink/30"
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
          <span className="w-6 text-muted">{5 - i}★</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white">
            <motion.div
              className="h-full rounded-full bg-ink"
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

const visuals: Record<string, () => React.ReactElement> = {
  durjoyai: VoiceVisual,
  lowkeybd: PlatformVisual,
  emergon: RadarVisual,
  gamecritic: RatingVisual,
};

const layout: Record<string, string> = {
  durjoyai: 'md:col-span-2 md:row-span-2 min-h-[520px]',
  lowkeybd: 'min-h-[300px]',
  emergon: 'min-h-[300px]',
  gamecritic: 'md:col-span-3 md:flex-row md:items-center min-h-[260px]',
};

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel index="02">Selected work</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
            <LineReveal text="Systems I’ve" />
            <LineReveal text="designed & shipped." delay={0.08} className="italic text-muted" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[16px] leading-relaxed text-ink-soft">
            From voice-driven AI to real-time dispatch. Open any project for the architecture and the decisions behind it.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((p, i) => {
          const Visual = visuals[p.id];
          const dark = p.tone === 'ink';
          return (
            <Reveal key={p.id} delay={i * 0.06} className={`${layout[p.id].includes('col-span-2') ? 'md:col-span-2 md:row-span-2' : ''} ${p.id === 'gamecritic' ? 'md:col-span-3' : ''}`}>
              <button
                onClick={() => setSelected(p)}
                data-cursor="Open"
                className={`group relative flex h-full w-full flex-col justify-between gap-8 overflow-hidden rounded-[28px] p-7 text-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[0.985] md:p-9 ${toneBg[p.tone]} ${layout[p.id]}`}
              >
                <div className="flex w-full items-center justify-between text-[13px] font-medium">
                  <span className={dark ? 'text-white/60' : 'text-ink/60'}>{p.category}</span>
                  <span className={`rounded-full px-3 py-1 ${dark ? 'bg-accent text-white' : 'bg-white/70'}`}>{p.year}</span>
                </div>

                <div className={`flex flex-1 items-center ${p.id === 'gamecritic' ? 'md:order-2 md:justify-end' : 'justify-center'} w-full`}>
                  <div className="w-full">{Visual && <Visual />}</div>
                </div>

                <div className={`flex w-full items-end justify-between gap-6 ${p.id === 'gamecritic' ? 'md:order-1 md:max-w-md md:flex-col md:items-start' : ''}`}>
                  <div>
                    <h3 className={`font-serif leading-none ${p.id === 'durjoyai' ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>{p.title}</h3>
                    <p className={`mt-3 max-w-md text-[15px] leading-snug ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{p.tagline}</p>
                  </div>
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg transition-all duration-500 group-hover:rotate-[-45deg] ${
                      dark ? 'bg-white text-ink group-hover:bg-accent group-hover:text-white' : 'bg-ink text-white group-hover:bg-accent'
                    }`}
                  >
                    →
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
