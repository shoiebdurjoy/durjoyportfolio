'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '@/src/data/content';
import { scrollToId } from '@/src/components/Navigation';
import Section from '@/src/components/ui/Section';
import { persona, type Persona } from '@/src/lib/persona';

const ease = [0.16, 1, 0.3, 1] as const;

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
  const [mode, setModeState] = useState<Persona>('build');
  const setMode = (m: Persona) => {
    persona.set(m);
    setModeState(m);
  };

  return (
    <Section id="top" theme="dark" fixedPanel className="overflow-hidden">
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-6 px-5 pb-16 pt-24 md:px-8 md:pt-32 lg:gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7">
          <div className="hero-fade-up glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[13px] text-ink-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDC84] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DDC84]" />
            </span>
            Open to roles &amp; projects · Dhaka <DhakaTime />
          </div>

          <h1 className="mt-8 font-serif text-[clamp(3.1rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="sr-only">Md Shoieb Hossain (Durjoy), software engineer and video editor. </span>
            {[
              { text: 'I build', italic: 'intelligent', rest: 'software', m: 'build' as Persona },
              { text: '& cut', italic: 'cinematic', rest: 'stories.', m: 'cut' as Persona },
            ].map((line, i) => (
              <span key={line.m} className="block overflow-hidden pb-[0.06em]" aria-hidden>
                <span
                  className="hero-rise block cursor-pointer transition-colors duration-500"
                  style={{ color: mode === line.m ? 'var(--color-ink)' : 'rgba(244,242,237,0.28)', animationDelay: `${0.1 + i * 0.12}s` }}
                  onMouseEnter={() => setMode(line.m)}
                  onClick={() => setMode(line.m)}
                >
                  {line.text}{' '}
                  <em className={`transition-colors duration-500 ${mode === line.m ? 'text-accent' : ''}`}>{line.italic}</em>
                  <br className="sm:hidden" /> {line.rest}
                </span>
              </span>
            ))}
          </h1>

          <p style={{ animationDelay: '0.45s' }} className="hero-fade-up mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
            I&apos;m <strong className="font-semibold text-ink">Md Shoieb Hossain</strong>, a Computer Science student at BRAC University
            building AI systems and full-stack platforms, and a video editor with 3+ years crafting commercials for an
            international agency.
          </p>

          <div style={{ animationDelay: '0.55s' }} className="hero-fade-up mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId('#work')}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent pl-7 pr-2 text-[15px] font-medium text-white shadow-[0_10px_40px_-10px_rgba(255,79,26,0.7)] transition-transform hover:scale-[1.02]"
            >
              See selected work
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-transform duration-500 group-hover:rotate-[-45deg]">
                →
              </span>
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex h-14 items-center rounded-full px-7 text-[15px] font-medium transition-colors hover:border-white/40"
            >
              Download résumé
            </a>
          </div>

          <div style={{ animationDelay: '0.8s' }} className="hero-fade-in mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-[14px] text-muted">
            <span><strong className="font-semibold text-ink">BRAC</strong> CS ’27</span>
            <span><strong className="font-semibold text-ink">3+ yrs</strong> at Think Big Brand</span>
            <span><strong className="font-semibold text-ink">2nd</strong> BSEC national</span>
          </div>
        </div>

        <div className="relative order-first lg:order-none lg:col-span-5">
          <div className="hero-pop-in relative mx-auto aspect-square w-[58vw] max-w-[520px] sm:w-[70vw] lg:w-full" style={{ animationDelay: '0.2s' }}>
            {/* Shown until (or instead of) the WebGL core, which is fitted to the data-core box. */}
            <div
              aria-hidden
              className="absolute inset-[12%] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(255,90,36,0.45) 0%, rgba(122,162,255,0.12) 55%, transparent 72%)' }}
            />
            <div data-core className="absolute inset-0" />

            <AnimatePresence mode="wait">
              {mode === 'build' ? (
                <motion.div
                  key="build-card"
                  initial={{ opacity: 0, y: 12, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: -4 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease }}
                  className="glass absolute -left-2 bottom-6 hidden w-[210px] rounded-2xl p-4 sm:block lg:-left-10"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <span className="ml-auto text-[10px] text-muted">gateway.py</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-[1.6] text-ink-soft">
                    <span className="text-[#B794F6]">async def</span> <span className="text-accent">route</span>(query):{'\n'}
                    {'  '}llm = pick_model(query){'\n'}
                    {'  '}<span className="text-[#B794F6]">return await</span> llm.run(){'\n'}
                    <span className="text-muted"># dispatch &lt;14ms</span>
                    <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-ink" />
                  </pre>
                </motion.div>
              ) : (
                <motion.div
                  key="cut-card"
                  initial={{ opacity: 0, y: 12, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 3 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease }}
                  className="glass absolute -left-2 bottom-6 hidden w-[210px] rounded-2xl p-4 sm:block lg:-left-10"
                >
                  <div className="mb-3 flex items-center justify-between text-[10px] text-muted">
                    <span>Timeline · Commercial_v12</span>
                    <span>24fps</span>
                  </div>
                  {[['V2', 'w-[38%] ml-[18%]', 'bg-[#8B5CF6]/80'], ['V1', 'w-[72%]', 'bg-accent/90'], ['A1', 'w-[88%]', 'bg-[#3DDC84]/80']].map(([t, w, c]) => (
                    <div key={t} className="mb-1.5 flex items-center gap-2">
                      <span className="w-5 text-[10px] font-semibold text-muted">{t}</span>
                      <div className="relative h-4 flex-1 rounded bg-white/5">
                        <motion.div className={`h-full rounded ${w} ${c}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease }} style={{ transformOrigin: 'left' }} />
                      </div>
                    </div>
                  ))}
                  <motion.div className="pointer-events-none absolute bottom-3 top-9 w-px bg-accent" initial={{ left: '30%' }} animate={{ left: ['30%', '88%', '30%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => scrollToId('#work')}
              aria-label="Scroll to work"
              className="absolute right-0 top-0 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#121210] shadow-xl sm:h-28 sm:w-28 lg:-right-4"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]">
                <defs><path id="circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
                <text className="fill-[#121210] text-[9.5px] uppercase"><textPath href="#circle" textLength="224" lengthAdjust="spacing">Engineer ✦ Editor ✦ Engineer ✦ Editor ✦</textPath></text>
              </svg>
              <span className="text-2xl text-accent">↓</span>
            </button>
          </div>

          <div className="glass mx-auto mt-3 flex w-fit items-center gap-1 rounded-full p-1 lg:mt-6" role="tablist" aria-label="Switch persona">
            {(['build', 'cut'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className="relative rounded-full px-6 py-2.5 text-[14px] font-medium"
              >
                {mode === m && (
                  <motion.span layoutId="persona-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className={`relative ${mode === m ? 'text-[#121210]' : 'text-muted'}`}>
                  {m === 'build' ? '⌘ Build mode' : '● Cut mode'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-line py-6">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap font-serif text-4xl md:text-6xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ['AI Engineering', 'Full-Stack Systems', 'Video Editing', 'Motion Design', 'Deep Learning', 'Color Grading'].map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10" aria-hidden={k === 1}>
                <span className={i % 2 ? 'italic text-muted' : ''}>{w}</span>
                <span className="text-2xl text-accent">✦</span>
              </span>
            )),
          )}
        </div>
      </div>
    </Section>
  );
}
