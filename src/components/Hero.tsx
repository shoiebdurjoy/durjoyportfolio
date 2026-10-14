'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '@/src/data/content';
import { scrollToId } from '@/src/components/Navigation';

type Mode = 'build' | 'cut';
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
  const [mode, setMode] = useState<Mode>('build');
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFD9C7 0%, rgba(245,243,238,0) 70%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] text-ink-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDC84] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DDC84]" />
            </span>
            Open to roles &amp; projects · Dhaka <DhakaTime />
          </motion.div>

          <h1 className="mt-8 font-serif text-[clamp(3.1rem,5.3vw,5.4rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="sr-only">Md Shoieb Hossain (Durjoy), software engineer and video editor. </span>
            {[
              { text: 'I build', italic: 'intelligent', rest: 'software', m: 'build' as Mode },
              { text: '& cut', italic: 'cinematic', rest: 'stories.', m: 'cut' as Mode },
            ].map((line, i) => (
              <span key={line.m} className="block overflow-hidden pb-[0.06em]" aria-hidden>
                <motion.span
                  className="block cursor-pointer transition-colors duration-500"
                  style={{ color: mode === line.m ? 'var(--color-ink)' : '#B9B6AD' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
                  onMouseEnter={() => setMode(line.m)}
                  onClick={() => setMode(line.m)}
                >
                  {line.text}{' '}
                  <em className={`transition-colors duration-500 ${mode === line.m ? 'text-accent' : ''}`}>{line.italic}</em>
                  <br className="sm:hidden" /> {line.rest}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft md:text-[18px]"
          >
            I&apos;m <strong className="font-semibold text-ink">Md Shoieb Hossain</strong>, a Computer Science student at BRAC University
            building AI systems and full-stack platforms, and a video editor with 3+ years crafting commercials for an
            international agency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollToId('#work')}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent pl-7 pr-2 text-[15px] font-medium text-white transition-transform hover:scale-[1.02]"
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
              className="inline-flex h-14 items-center rounded-full border border-ink/15 bg-white px-7 text-[15px] font-medium transition-colors hover:border-ink"
            >
              Download résumé
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-[14px] text-muted"
          >
            <span><strong className="font-semibold text-ink">BRAC</strong> CS ’27</span>
            <span><strong className="font-semibold text-ink">3+ yrs</strong> at Think Big Brand</span>
            <span><strong className="font-semibold text-ink">2nd</strong> BSEC national</span>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="relative mx-auto max-w-[440px]"
          >
            <div className="relative aspect-[5/6] [container-type:inline-size]">
              <motion.div
                aria-hidden
                className="absolute left-[2%] top-[21.7%] aspect-square w-[96%] rounded-full border border-dashed border-ink/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <div
                className={`absolute bottom-0 left-[4%] aspect-square w-[92%] overflow-hidden rounded-full transition-colors duration-700 ${
                  mode === 'build' ? 'bg-accent' : 'bg-ink'
                } shadow-[0_40px_80px_-30px_rgba(18,18,16,0.5)]`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(90% 70% at 30% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                    opacity: mode === 'build' ? 1 : 0.2,
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mode}
                    aria-hidden
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease }}
                    className="absolute inset-x-0 bottom-[8%] text-center font-serif text-[30cqw] italic leading-none text-white/20"
                  >
                    {mode === 'build' ? 'build.' : 'cut.'}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    'radial-gradient(circle 46cqw at 50% calc(100% - 46cqw), #000 99.5%, transparent 100%), linear-gradient(#000, #000)',
                  maskSize: '100% 100%, 100% calc(100% - 46cqw)',
                  maskRepeat: 'no-repeat',
                  WebkitMaskImage:
                    'radial-gradient(circle 46cqw at 50% calc(100% - 46cqw), #000 99.5%, transparent 100%), linear-gradient(#000, #000)',
                  WebkitMaskSize: '100% 100%, 100% calc(100% - 46cqw)',
                  WebkitMaskRepeat: 'no-repeat',
                }}
              >
                <Image
                  src="/durjoy-portrait-2.webp"
                  alt="Md Shoieb Hossain (Durjoy)"
                  width={550}
                  height={810}
                  priority
                  className="absolute left-[6%] top-0 h-auto w-[88%] max-w-none drop-shadow-[0_24px_30px_rgba(18,18,16,0.3)]"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'build' ? (
                <motion.div
                  key="build-card"
                  initial={{ opacity: 0, y: 12, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: -4 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease }}
                  style={{ translateZ: 60 }}
                  className="absolute -left-2 bottom-10 hidden w-[210px] rounded-2xl sm:block border border-line bg-white p-4 shadow-xl sm:-left-16"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <span className="ml-auto text-[10px] text-muted">gateway.py</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-[1.6] text-ink-soft">
                    <span className="text-[#8B5CF6]">async def</span> <span className="text-accent">route</span>(query):{'\n'}
                    {'  '}llm = pick_model(query){'\n'}
                    {'  '}<span className="text-[#8B5CF6]">return await</span> llm.run(){'\n'}
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
                  style={{ translateZ: 60 }}
                  className="absolute -left-2 bottom-10 hidden w-[210px] rounded-2xl sm:block border border-line bg-white p-4 shadow-xl sm:-left-16"
                >
                  <div className="mb-3 flex items-center justify-between text-[10px] text-muted">
                    <span>Timeline · Commercial_v12</span>
                    <span>24fps</span>
                  </div>
                  {[['V2', 'w-[38%] ml-[18%]', 'bg-[#8B5CF6]/70'], ['V1', 'w-[72%]', 'bg-accent/80'], ['A1', 'w-[88%]', 'bg-[#3DDC84]/70']].map(([t, w, c]) => (
                    <div key={t} className="mb-1.5 flex items-center gap-2">
                      <span className="w-5 text-[10px] font-semibold text-muted">{t}</span>
                      <div className="relative h-4 flex-1 rounded bg-paper">
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
              className="[transform:translateZ(80px)] absolute right-0 -top-2 sm:-top-6 flex h-20 w-20 items-center justify-center rounded-full bg-ink sm:h-28 sm:w-28 text-white shadow-xl sm:-right-8"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]">
                <defs><path id="circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
                <text className="fill-white text-[9.5px] uppercase"><textPath href="#circle" textLength="224" lengthAdjust="spacing">Engineer ✦ Editor ✦ Engineer ✦ Editor ✦</textPath></text>
              </svg>
              <span className="text-2xl text-accent">↓</span>
            </button>
          </motion.div>

          <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-line bg-white p-1" role="tablist" aria-label="Switch persona">
            {(['build', 'cut'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className="relative rounded-full px-6 py-2.5 text-[14px] font-medium"
              >
                {mode === m && (
                  <motion.span layoutId="persona-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className={`relative ${mode === m ? 'text-white' : 'text-muted'}`}>
                  {m === 'build' ? '⌘ Build mode' : '● Cut mode'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-hidden border-y border-line bg-white py-6 md:mt-28">
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
    </section>
  );
}
