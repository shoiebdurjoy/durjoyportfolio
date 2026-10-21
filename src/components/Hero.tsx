'use client';

import Image from 'next/image';
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '@/src/data/content';
import { scrollToId } from '@/src/components/Navigation';
import HeroLayers from '@/src/components/HeroLayers';
import type { Persona } from '@/src/lib/persona';



function DhakaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' }).format(new Date());
    const first = setTimeout(() => setTime(fmt()), 0);
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{time || '--:--'}</span>;
}

export default function Hero() {
  const [mode, setMode] = useState<Persona>('build');

  // The tool stack plays its entrance on load (tipped back and spread → upright), so the first
  // scroll goes straight into the story instead of scrubbing a pinned intro.
  const settle = useMotionValue(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      settle.set(1);
      return;
    }
    const controls = animate(settle, 1, { duration: 1.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [settle]);
  const stageX = useTransform(settle, [0, 1], ['3vw', '0vw']);
  const stageScale = useTransform(settle, [0, 1], [1.06, 1]);

  // Leaving the hero: the stack drifts a touch slower than the page, and the cue fades.
  const { scrollY } = useScroll();
  const stageY = useTransform(scrollY, [0, 900], [0, 120]);
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <section id="top" data-tone="dark" className="relative">
      <div className="relative min-h-[100svh] overflow-hidden">
      {/* Faint grid + glow behind the drop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(70% 60% at 65% 45%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 65% 45%, #000 0%, transparent 75%)',
        }}
      />
      {/* Soft glows as plain gradients: a CSS blur filter this large is costly while scrolling. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-[-5%] h-[110vh] w-[110vh] rounded-full transition-opacity duration-1000"
        style={{ background: 'radial-gradient(circle, rgba(255,79,26,0.16) 0%, rgba(255,79,26,0) 62%)', opacity: mode === 'build' ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-[-5%] h-[110vh] w-[110vh] rounded-full transition-opacity duration-1000"
        style={{ background: 'radial-gradient(circle, rgba(143,168,255,0.14) 0%, rgba(143,168,255,0) 62%)', opacity: mode === 'cut' ? 1 : 0 }}
      />

      <motion.div style={{ opacity: hintOpacity }} className="label pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-3 text-muted lg:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line"><span className="absolute inset-x-0 top-0 h-4 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-ink" /></span>
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-16 pt-28 md:px-10 lg:grid-cols-12 lg:gap-10 lg:pb-12 lg:pt-24">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="hero-fade-up flex w-fit items-center gap-3 rounded-full border border-line bg-card/60 py-1.5 pl-1.5 pr-4 text-[13px] text-ink-soft backdrop-blur-md">
            <Image src="/durjoy.jpg" alt="" width={56} height={56} priority className="h-7 w-7 rounded-full object-cover object-top" />
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDC84] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3DDC84]" />
            </span>
            Open to roles · Dhaka <DhakaTime />
          </div>

          <p style={{ animationDelay: '0.05s' }} className="hero-fade-up label mt-10 text-muted">Hello, I&apos;m</p>
          <h1 className="mt-4 text-[clamp(3.4rem,6.6vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="hero-rise block" style={{ animationDelay: '0.1s' }}>Shoieb Hossain</span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="hero-rise block font-accent font-normal text-accent" style={{ animationDelay: '0.2s' }}>Durjoy</span>
            </span>
          </h1>

          <p style={{ animationDelay: '0.35s' }} className="hero-fade-up mt-5 max-w-xl text-[clamp(1.2rem,1.7vw,1.6rem)] font-medium leading-snug tracking-[-0.02em]">
            {[
              { lead: 'I build', accent: 'intelligent', rest: 'software', m: 'build' as Persona },
              { lead: '& cut', accent: 'cinematic', rest: 'stories.', m: 'cut' as Persona },
            ].map((line) => (
              <span
                key={line.m}
                className="cursor-default transition-opacity duration-500"
                style={{ opacity: mode === line.m ? 1 : 0.4 }}
                onMouseEnter={() => setMode(line.m)}
              >
                {line.lead} <span className="font-accent text-accent">{line.accent}</span> {line.rest}{' '}
              </span>
            ))}
          </p>

          <p style={{ animationDelay: '0.45s' }} className="hero-fade-up mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">
            Computer Science at BRAC University, building AI systems and full-stack platforms. Three years cutting
            commercials at Think Big Brand.
          </p>

          <div style={{ animationDelay: '0.55s' }} className="hero-fade-up mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId('#work')}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-[14px] font-medium text-paper transition-colors hover:bg-accent hover:text-white"
            >
              View work
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-accent">→</span>
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-line px-6 text-[14px] font-medium transition-colors hover:border-ink"
            >
              Résumé
            </a>
          </div>
        </div>

        {/* 3D tool stack with its persona switch */}
        <div className="flex flex-col items-center lg:col-span-5">
          <motion.div
            className="hero-fade-in relative aspect-[6/5] w-full max-w-[560px]"
            style={{ animationDelay: '0.2s', x: stageX, y: stageY, scale: stageScale }}
          >
            <HeroLayers mode={mode} settle={settle} />
          </motion.div>
          <div style={{ animationDelay: '0.65s' }} className="hero-fade-up mt-8 flex items-center gap-1 rounded-full border border-line bg-card/60 p-1 backdrop-blur-md" role="tablist" aria-label="Switch persona">
            {(['build', 'cut'] as const).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className="label relative rounded-full px-5 py-2">
                {mode === m && <motion.span layoutId="persona-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className={`relative ${mode === m ? 'text-paper' : 'text-muted'}`}>{m === 'build' ? 'Build · code' : 'Cut · film'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
