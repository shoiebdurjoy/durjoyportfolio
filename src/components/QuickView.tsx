'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { profile, projects, quickView } from '@/src/data/content';
import { useFocusTrap } from '@/src/components/ui/useFocusTrap';
import { openProject } from '@/src/lib/events';

// The 30-second version for recruiters: who, what role, proof, and how to reach me — one screen.
export default function QuickView({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);
  useFocusTrap(ref, true, onClose);

  useEffect(() => {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [lenis]);

  const top = quickView.topWork.map((id) => projects.find((p) => p.id === id)).filter((p) => p !== undefined);
  const facts: [string, string][] = [
    ['Looking for', quickView.lookingFor],
    ['Based in', quickView.location],
    ['Education', quickView.education],
    ['Experience', quickView.experience],
    ['Recognition', quickView.highlight],
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6">
      <motion.div className="absolute inset-0 bg-black/45 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent
        className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[28px] bg-[#F5F3EE] text-[#121210] md:rounded-[28px]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E3E0D8] bg-[#F5F3EE]/90 px-6 py-4 backdrop-blur md:px-9">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#77756D]">The 30-second version</span>
          <button onClick={onClose} aria-label="Close summary" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#121210] text-white transition-colors hover:bg-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="px-6 pb-9 pt-7 md:px-9">
          <div className="flex items-center gap-4">
            <Image src="/durjoy.jpg" alt="" width={112} height={112} className="h-14 w-14 rounded-full object-cover object-top" />
            <div>
              <h2 id="quick-view-title" className="font-serif text-[30px] leading-none md:text-[36px]">
                Shoieb Hossain <span className="font-accent text-accent">Durjoy</span>
              </h2>
              <p className="mt-1.5 text-[15px] text-[#3A3934]">{quickView.role}</p>
            </div>
          </div>

          <dl className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 border-y border-[#E3E0D8] py-6 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#77756D]">{k}</dt>
                <dd className="mt-1 text-[15px] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-[#77756D]">Top work</h3>
          <ul className="mt-3 space-y-3">
            {top.map((p) => (
              <li key={p.id} className="rounded-2xl border border-[#E3E0D8] bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[18px] font-semibold tracking-[-0.02em]">{p.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#77756D]">{p.year} · {p.category}</span>
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#3A3934]">{p.built ?? p.tagline}</p>
                {p.proof && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.proof.map((x) => (
                      <span key={x} className="rounded-full bg-[#F5F3EE] px-2.5 py-1 text-[12px] font-medium">✓ {x}</span>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => openProject(p.id), 250);
                    }}
                    className="rounded-full bg-[#121210] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent"
                  >
                    Read the case study
                  </button>
                  {p.liveDemo && (
                    <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#121210]/20 px-4 py-2 text-[13px] font-medium transition-colors hover:border-[#121210]">
                      Live ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#121210]/20 px-4 py-2 text-[13px] font-medium transition-colors hover:border-[#121210]">
                      Code ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-[#77756D]">Skills</h3>
          <dl className="mt-3 space-y-2.5">
            {quickView.skills.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 text-[14.5px]">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-[#3A3934]">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-[#E3E0D8] pt-6">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]">
              Download résumé ↓
            </a>
            <button onClick={copyEmail} className="inline-flex h-11 items-center rounded-full bg-[#121210] px-5 text-[14px] font-medium text-white">
              {copied ? 'Email copied ✓' : profile.email}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-[#121210]/20 px-5 text-[14px] font-medium hover:border-[#121210]">LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-[#121210]/20 px-5 text-[14px] font-medium hover:border-[#121210]">GitHub ↗</a>
          </div>
          <p className="sr-only" aria-live="polite">{copied ? 'Email copied' : ''}</p>
        </div>
      </motion.div>
    </div>
  );
}
