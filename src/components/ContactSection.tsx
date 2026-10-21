'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { navLinks, profile } from '@/src/data/content';
import { scrollToId } from '@/src/components/Navigation';
import { LineReveal, Reveal } from '@/src/components/ui/Reveal';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="px-3 pb-3 md:px-4 md:pb-4">
      <div className="relative overflow-hidden rounded-[36px] bg-ink px-6 pt-24 text-white md:px-12 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF4F1A 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[#3DDC84]" /> Available for roles & projects
          </div>
          <h2 className="mt-8 font-serif text-[clamp(3.4rem,11vw,10rem)] leading-[0.9] tracking-[-0.03em]">
            <LineReveal text="Let’s make" />
            <LineReveal text="something good." delay={0.08} className="italic text-accent" />
          </h2>

          <Reveal className="mt-14 flex flex-col gap-4 md:flex-row md:items-center">
            <button
              onClick={copy}
              data-cursor={copied ? 'Copied' : 'Copy'}
              className="group flex min-w-0 items-center justify-between gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-5 pr-2 text-left transition-colors hover:border-white/40 md:gap-6 md:pl-7"
            >
              <span className="truncate text-[15px] font-medium md:text-xl">{profile.email}</span>
              <span className={`shrink-0 whitespace-nowrap rounded-full px-4 py-3 text-[13px] font-semibold transition-colors md:px-5 md:text-[14px] ${copied ? 'bg-[#3DDC84] text-ink' : 'bg-white text-ink group-hover:bg-accent group-hover:text-white'}`}>
                {copied ? 'Copied ✓' : 'Copy email'}
              </span>
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[60px] items-center justify-center rounded-full bg-accent px-8 text-[16px] font-semibold transition-transform hover:scale-[1.03]"
            >
              Download résumé ↓
            </a>
          </Reveal>

          <div className="mt-24 grid grid-cols-2 gap-10 border-t border-white/10 pt-10 text-[15px] md:grid-cols-4">
            <div>
              <div className="text-[12px] uppercase tracking-[0.14em] text-white/40">Elsewhere</div>
              <ul className="mt-4 space-y-2">
                {[['GitHub', profile.github], ['LinkedIn', profile.linkedin], ['Behance', profile.behance]].map(([l, h]) => (
                  <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" className="text-white/80 transition-colors hover:text-accent">{l} ↗</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[0.14em] text-white/40">Explore</div>
              <ul className="mt-4 space-y-2">
                {navLinks.slice(0, 5).map((l) => (
                  <li key={l.href}><button onClick={() => scrollToId(l.href)} className="text-white/80 transition-colors hover:text-accent">{l.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[0.14em] text-white/40">Based in</div>
              <p className="mt-4 text-white/80">{profile.location}<br />BRAC University ’27</p>
            </div>
            <div className="md:text-right">
              <button onClick={() => scrollToId('#top')} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-white/80 transition-colors hover:border-white hover:text-white">
                Back to top ↑
              </button>
            </div>
          </div>
        </div>

        <div ref={footerRef} className="relative mt-16 overflow-hidden">
          <motion.div
            style={{ y: wordY }}
            aria-hidden
            className="select-none text-center font-serif text-[27vw] leading-[0.75] tracking-[-0.04em] text-white/[0.07]"
          >
            Durjoy
          </motion.div>
          <div className="absolute inset-x-0 bottom-6 flex flex-col justify-between gap-2 text-[13px] text-white/40 md:flex-row">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span>Designed & built in Dhaka with Next.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}
