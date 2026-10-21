'use client';

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/src/data/content';
import { Reveal, SectionLabel } from '@/src/components/ui/Reveal';

const statement =
  'Most developers think purely in logic. Most filmmakers think purely in feeling. I work where the two meet — every frame and every function has to earn its place.';

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = word.startsWith('logic') || word.startsWith('feeling');
  return (
    <motion.span style={{ opacity }} className={`mr-[0.22em] inline-block ${accent ? 'font-accent text-accent' : ''}`}>
      {word}
    </motion.span>
  );
}

function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{prefix}{v}{suffix}</span>;
}

export default function AboutSection() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = statement.split(' ');

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="01">About</SectionLabel>

      <p ref={ref} className="font-serif mt-10 max-w-6xl text-[clamp(2rem,4.8vw,4.4rem)] leading-[1.04]">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>

      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="text-[17px] leading-relaxed text-ink-soft">
            As a Computer Science student at <strong className="font-semibold text-ink">BRAC University (Class of 2027)</strong>, I engineer
            backend microservices, intelligent AI assistants and deep learning models. I care about latency, architectural
            elegance and systems that hold up under real-world load.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            In parallel, I&apos;ve spent <strong className="font-semibold text-ink">3+ years as a professional video editor</strong> at Think Big
            Brand, editing commercial campaigns and documentaries. Editing taught me what systems design did: cut everything
            that doesn&apos;t serve the story.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:col-span-7">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-line bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(18,18,16,0.3)]">
                <div className="font-serif text-6xl leading-none md:text-7xl">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="label mt-5 text-ink">{s.label}</div>
                <p className="mt-2 text-[14px] leading-snug text-muted">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
