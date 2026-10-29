'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, SectionLabel } from '@/src/components/ui/Reveal';
import { scrollToId } from '@/src/components/Navigation';
import { openProject } from '@/src/lib/events';

const statement =
  'Most developers think purely in logic. Most video editors think purely in attention. I work where the two meet — every function and every cut has to earn its place.';

type Chapter = {
  when: string;
  title: string;
  accent: string;
  body: string;
  links: { label: string; action: () => void }[];
};

// The career told in order, so a recruiter gets the whole arc in one pass. Facts follow the résumé.
const chapters: Chapter[] = [
  {
    when: '2022',
    title: 'Learning to',
    accent: 'build.',
    body: 'Started Computer Science at BRAC University after an HSC with GPA 5.00 — algorithms, backend systems and machine learning. Graduating in 2027.',
    links: [{ label: 'See the timeline', action: () => scrollToId('#experience') }],
  },
  {
    when: '2023 →',
    title: 'Learning what',
    accent: 'clients want.',
    body: 'Joined Think Big Brand as a part-time video editor: ads, shorts and talking-head videos for businesses explaining their brand. Three years of deadlines, revision rounds and QC sign-off taught me to ship for real people.',
    links: [{ label: 'Watch the videos', action: () => scrollToId('#cutting-room') }],
  },
  {
    when: '2025 – 26',
    title: 'Building real',
    accent: 'systems.',
    body: 'A thesis teaching models to read emotion in Bangla speech, DurjoyAI — a multi-LLM voice assistant with long-term memory — and EMERGON, real-time emergency coordination built with a team of four. Plus 2nd place nationally in BSEC’s financial-literacy short-video competition, with Team Akatsuki.',
    links: [
      { label: 'DurjoyAI case study', action: () => openProject('durjoyai') },
      { label: 'The thesis', action: () => scrollToId('#thesis') },
      { label: 'Awards', action: () => scrollToId('#certificates') },
    ],
  },
  {
    when: '2026 →',
    title: 'Where the two',
    accent: 'meet.',
    body: 'I work inside a video agency’s QC workflow every week, so I’m building the production platform for it: TBB Workspace, a live full-stack app modelled on Think Big Brand’s real pipeline. Alongside it, Baeky — a Flutter app that makes money agreements between friends clear.',
    links: [
      { label: 'TBB Workspace case study', action: () => openProject('tbb') },
      { label: 'Baeky case study', action: () => openProject('baeky') },
    ],
  },
];

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = word.startsWith('logic') || word.startsWith('attention');
  return (
    <motion.span style={{ opacity }} className={`mr-[0.22em] inline-block ${accent ? 'font-accent text-accent' : ''}`}>
      {word}
    </motion.span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = statement.split(' ');

  const storyRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({ target: storyRef, offset: ['start 70%', 'end 60%'] });

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="01">The story</SectionLabel>

      <p ref={ref} className="font-serif mt-10 max-w-6xl text-[clamp(2rem,4.8vw,4.4rem)] leading-[1.04]">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>

      <h3 className="mt-24 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">How I got here</h3>
      <ol ref={storyRef} className="relative mt-8">
        {/* Progress rail that fills as the chapters scroll past. */}
        <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[159px]" />
        <motion.span
          aria-hidden
          className="absolute left-[7px] top-2 w-px origin-top bg-accent md:left-[159px]"
          style={{ scaleY: storyProgress, bottom: 0 }}
        />
        {chapters.map((c, i) => (
          <li key={c.when} className="relative grid grid-cols-1 gap-3 pb-14 pl-8 last:pb-0 md:grid-cols-[160px_1fr] md:gap-0 md:pl-0">
            <span aria-hidden className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-paper md:left-[152px]" />
            <Reveal className="md:pr-8 md:text-right">
              <span className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{c.when}</span>
              <span className="mt-1 block font-mono text-[11px] text-accent">Chapter {String(i + 1).padStart(2, '0')}</span>
            </Reveal>
            <Reveal delay={0.05} className="md:pl-12">
              <h4 className="font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02]">
                {c.title} <span className="font-accent text-accent">{c.accent}</span>
              </h4>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{c.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.links.map((l) => (
                  <button
                    key={l.label}
                    onClick={l.action}
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] font-medium transition-colors hover:border-ink"
                  >
                    {l.label}
                    <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

    </section>
  );
}
