'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import type { Project } from '@/src/data/content';
import { useFocusTrap } from '@/src/components/ui/useFocusTrap';

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  useFocusTrap(ref, true, onClose);

  useEffect(() => {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [lenis]);

  return (
    <div className="tone-light fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[32px] bg-paper md:rounded-[32px]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-6 py-4 backdrop-blur md:px-10">
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted">Case study · {project.category}</span>
          <button onClick={onClose} aria-label="Close case study" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="px-6 pb-10 pt-8 md:px-10">
          <h2 id="project-title" className="font-serif text-6xl leading-none md:text-7xl">{project.title}</h2>
          <p className="mt-3 text-[18px] text-ink-soft">{project.short}</p>
          {project.problem && (
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">The problem</div>
                <p className="mt-2 text-[15px] leading-relaxed">{project.problem}</p>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">What I built</div>
                <p className="mt-2 text-[15px] leading-relaxed">{project.built}</p>
              </div>
            </div>
          )}
          {project.proof && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.proof.map((x) => (
                <span key={x} className="rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-medium">✓ {x}</span>
              ))}
            </div>
          )}
          <p className="mt-8 text-[17px] leading-relaxed text-ink-soft">{project.overview}</p>

          <h3 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{project.architecture.title}</h3>
          <ol className="mt-5 space-y-0">
            {project.architecture.flow.map((node, i) => (
              <motion.li
                key={node}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                className="relative flex items-center gap-4 pb-4 last:pb-0"
              >
                {i < project.architecture.flow.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-line" />}
                <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${i === 0 || i === project.architecture.flow.length - 1 ? 'bg-accent text-white' : 'border border-line bg-white'}`}>
                  {i + 1}
                </span>
                <span className="rounded-xl border border-line bg-white px-4 py-2.5 text-[15px] font-medium">{node}</span>
              </motion.li>
            ))}
          </ol>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">{project.architecture.details}</p>

          <h3 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">Key capabilities</h3>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl bg-white p-4 text-[15px] leading-snug">
                <span className="text-accent">✦</span>
                {f}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">Stack</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="rounded-full border border-line bg-white px-4 py-1.5 text-[14px]">{t}</span>
            ))}
          </div>

          {(project.github || project.liveDemo) && (
            <div className="mt-12 flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent">
                  View on GitHub ↗
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-ink px-6 text-[15px] font-medium">
                  Live demo ↗
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
