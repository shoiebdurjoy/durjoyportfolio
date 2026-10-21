'use client';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

// Axis runs Jan 2022 → Jan 2027; positions are fractional years.
const START = 2022;
const END = 2027;
const TODAY = 2026.8;
const pct = (y: number) => `${((y - START) / (END - START)) * 100}%`;

type Clip = {
  id: string;
  layer: string;
  title: string;
  from: number;
  to: number;
  when: string;
  color: string;
  detail: string;
  tags: string[];
};

// Dates follow the résumé; Think Big Brand is listed there as a 3-year engagement without exact dates.
const clips: Clip[] = [
  {
    id: 'durjoyai', layer: 'DurjoyAI', title: 'DurjoyAI — personal AI assistant', from: 2026.0, to: TODAY,
    when: 'Jan 2026 — present', color: '#FF4F1A',
    detail: 'Provider abstraction over OpenAI, Gemini and OpenRouter, the “Brain 0” memory layer, and a signed Alexa voice webhook — containerised with Docker.',
    tags: ['TypeScript', 'Docker', 'OpenRouter', 'Alexa'],
  },
  {
    id: 'emergon', layer: 'EMERGON', title: 'EMERGON — smart emergency system', from: 2026.05, to: 2026.45,
    when: 'Spring 2026', color: '#F5B841',
    detail: 'Four-person team. Real-time Socket.IO coordination, Twilio SMS alerts and Google Maps request mapping; backend on Render, frontend on Vercel.',
    tags: ['Flask', 'React', 'PostgreSQL', 'Socket.IO'],
  },
  {
    id: 'thesis', layer: 'Thesis', title: 'Thesis — emotion recognition in Bangla', from: 2025.0, to: TODAY,
    when: '2025 — present', color: '#A78BFA',
    detail: 'Curating a Bangla multimodal emotion dataset and training audio-centric deep learning models on CUDA / Kaggle GPUs.',
    tags: ['PyTorch', 'Librosa', 'CUDA', 'LaTeX'],
  },
  {
    id: 'tbb', layer: 'Think Big Brand', title: 'Think Big Brand — video editor', from: 2022.6, to: 2025.6,
    when: '3-year engagement · part-time', color: '#3DDC84',
    detail: 'Commercials, narrative reels and documentaries for clients under tight deadlines — managing revisions and grading in Premiere, After Effects and Resolve.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  {
    id: 'brac', layer: 'BRAC University', title: 'BRAC University — B.S. Computer Science', from: 2022.6, to: 2026.95,
    when: 'Expected 2026', color: '#60A5FA',
    detail: 'Backend architecture, databases and machine learning. Advanced Web Development certificate; Spanish SPN101.',
    tags: ['Algorithms', 'Systems', 'ML'],
  },
];

const keys = [
  { at: 2022.45, label: 'HSC · GPA 5.00', layer: 'BRAC University' },
  { at: 2026.0, label: 'DurjoyAI kicks off', layer: 'DurjoyAI' },
];

function Eye() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
  );
}

export default function Timeline() {
  const panel = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Clip | null>(null);
  const { scrollYProgress } = useScroll({ target: panel, offset: ['start 85%', 'end 35%'] });
  const head = useTransform(scrollYProgress, [0, 1], [START, TODAY]);
  const left = useTransform(head, (y) => pct(y));
  const [time, setTime] = useState(START);
  useMotionValueEvent(head, 'change', setTime);

  const year = Math.floor(time);
  const month = Math.min(12, Math.floor((time - year) * 12) + 1);
  const shown = hover ?? clips.find((c) => time >= c.from && time <= c.to) ?? null;

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel index="02">Experience</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="Four years," />
            <LineReveal text="one timeline." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Laid out the way I&apos;d cut it. Scroll to scrub the playhead, hover a clip to inspect it.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <div ref={panel} className="overflow-hidden rounded-2xl border border-black/40 bg-[#1C1C1C] text-[#CFCFCF] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.55)]">
          {/* Title bar */}
          <div className="flex items-center gap-4 border-b border-black/50 bg-[#232323] px-4 py-2.5 text-[12px]">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-[#8E8E8E]">Timeline</span>
            <span className="rounded bg-[#2E2E2E] px-2 py-0.5 text-white">Durjoy_2022–2026 ×</span>
            <span className="ml-auto hidden font-mono text-[#8E8E8E] sm:inline">24 fps · 1920×1080</span>
          </div>

          <div className="overflow-x-auto no-scrollbar" data-lenis-prevent-horizontal>
            <div className="min-w-[780px]">
              {/* Timecode + ruler */}
              <div className="grid grid-cols-[220px_1fr] border-b border-black/50">
                <div className="flex items-center border-r border-black/50 px-4 py-3">
                  <span className="font-mono text-[20px] tabular-nums tracking-tight text-[#4DA3FF]">
                    {year}:{String(month).padStart(2, '0')}:00:00
                  </span>
                </div>
                <div className="relative h-12">
                  {Array.from({ length: END - START + 1 }, (_, i) => START + i).map((y) => (
                    <div key={y} className="absolute top-0 h-full" style={{ left: pct(y) }}>
                      <span className="absolute left-1.5 top-1.5 font-mono text-[11px] text-[#8E8E8E]">{y}</span>
                      <span className="absolute bottom-0 h-3 w-px bg-[#5A5A5A]" />
                    </div>
                  ))}
                  {Array.from({ length: (END - START) * 4 }, (_, i) => i).filter((i) => i % 4).map((i) => (
                    <span key={i} className="absolute bottom-0 h-1.5 w-px bg-[#3E3E3E]" style={{ left: pct(START + i / 4) }} />
                  ))}
                  <span className="absolute inset-y-0 w-px bg-[#5A5A5A]/60" style={{ left: pct(TODAY) }} />
                </div>
              </div>

              {/* Layers */}
              <div className="relative">
                {clips.map((c, i) => (
                  <div key={c.id} className="grid grid-cols-[220px_1fr] border-b border-black/40 last:border-b-0">
                    <div className={`flex items-center gap-3 border-r border-black/50 px-4 py-3 text-[13px] ${shown?.id === c.id ? 'bg-[#2B2B2B] text-white' : ''}`}>
                      <span className="text-[#8E8E8E]"><Eye /></span>
                      <span className="h-3 w-3 rounded-[3px]" style={{ background: c.color }} />
                      <span className="font-mono text-[11px] text-[#7A7A7A]">{i + 1}</span>
                      <span className="truncate">{c.layer}</span>
                    </div>
                    <div className="relative h-12">
                      <button
                        onMouseEnter={() => setHover(c)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(c)}
                        onBlur={() => setHover(null)}
                        aria-label={`${c.title}, ${c.when}`}
                        className="group absolute top-2 h-8 overflow-hidden rounded-[5px] text-left transition-[filter,transform] duration-300 hover:brightness-125"
                        style={{ left: pct(c.from), width: `calc(${pct(c.to)} - ${pct(c.from)})`, background: `${c.color}33`, boxShadow: `inset 0 0 0 1px ${c.color}AA` }}
                      >
                        <span className="absolute inset-y-0 left-0 w-1" style={{ background: c.color }} />
                        <span className="block truncate px-3 text-[12px] font-medium leading-8 text-white">{c.title}</span>
                      </button>
                      {keys.filter((k) => k.layer === c.layer).map((k) => (
                        <span key={k.label} title={k.label} className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-black/40 bg-[#F5D76E]" style={{ left: pct(k.at) }} />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Playhead */}
                <div className="pointer-events-none absolute inset-y-0 left-[220px] right-0">
                  <motion.div className="absolute inset-y-0" style={{ left }}>
                    <span className="absolute -top-[3.25rem] -translate-x-1/2 border-x-[6px] border-t-[8px] border-x-transparent border-t-[#4DA3FF]" />
                    <span className="absolute -top-12 bottom-0 w-px -translate-x-1/2 bg-[#4DA3FF]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Effect Controls */}
          <div className="grid grid-cols-1 gap-6 border-t border-black/50 bg-[#202020] px-5 py-5 md:grid-cols-[220px_1fr]" aria-live="polite">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E8E8E]">Effect controls</div>
            {shown ? (
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-[17px] font-semibold text-white">{shown.title}</span>
                  <span className="font-mono text-[12px] text-[#8E8E8E]">{shown.when}</span>
                </div>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#B5B5B5]">{shown.detail}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {shown.tags.map((t) => (
                    <span key={t} className="rounded border border-[#3A3A3A] px-2 py-0.5 font-mono text-[11px] text-[#CFCFCF]">{t}</span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-[#8E8E8E]">Scroll to move the playhead, or hover a clip.</p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
