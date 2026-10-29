'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import type { Certificate } from '@/src/data/content';
import { useFocusTrap } from '@/src/components/ui/useFocusTrap';
import { ProofChip, VIEWER_SIZES, viewerCap } from '@/src/components/certificate-parts';

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { items: Certificate[]; initialId: string; onClose: () => void };

// Full-size view of the real documents: dark stage for the paper, cream rail for the facts.
export default function CertificateViewer({ items, initialId, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(() => Math.max(0, items.findIndex((c) => c.id === initialId)));
  const [dir, setDir] = useState(1);
  const [copied, setCopied] = useState(false);
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);
  useFocusTrap(ref, true, onClose);

  const cert = items[index];
  const img = cert.image!;
  const many = items.length > 1;

  const go = (step: 1 | -1) => {
    const next = index + step;
    if (next < 0 || next >= items.length) return;
    setDir(step);
    setCopied(false);
    setIndex(next);
  };

  useEffect(() => {
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const copy = async () => {
    if (!cert.verifyUrl) return;
    try {
      await navigator.clipboard.writeText(cert.verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      document.getElementById('cert-verify-text')?.focus();
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -64 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 64 || info.velocity.x > 400) go(-1);
  };

  const fade = reduce ? { duration: 0.15 } : { duration: 0.25, ease };
  const btn = 'inline-flex h-11 w-full items-center justify-center rounded-full text-[14px] font-medium transition-colors duration-200';

  return (
    <div className="fixed inset-0 z-[80] flex justify-center lg:items-center lg:p-6">
      <motion.div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(12,12,11,0.9)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-viewer-title"
        data-lenis-prevent
        className="relative flex h-[100dvh] w-full flex-col overflow-y-auto overscroll-contain bg-[#141413] text-white lg:grid lg:h-[min(calc(100dvh-48px),820px)] lg:w-[min(94vw,1180px)] lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[56px_minmax(0,1fr)] lg:overflow-hidden lg:rounded-[22px] lg:border lg:border-white/10"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduce ? 0 : 8 }}
        transition={reduce ? { duration: 0.15 } : { duration: 0.45, ease }}
      >
        {/* Top bar — close first in the DOM so the focus trap lands on it */}
        <div className="sticky top-0 z-10 flex h-14 shrink-0 flex-row-reverse items-center justify-between border-b border-white/10 bg-[#141413] px-4 lg:col-span-2 lg:px-5">
          <button
            onClick={onClose}
            aria-label="Close certificate viewer"
            className="flex size-11 items-center justify-center rounded-full bg-white text-[#121210] transition-colors hover:bg-accent hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
            {many && <>{index + 1} / {items.length} · </>}{cert.track}
          </span>
        </div>

        {/* Stage */}
        <div
          className="relative flex min-h-[58dvh] shrink-0 items-center justify-center px-4 py-6 lg:row-start-2 lg:min-h-0 lg:px-16 lg:py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={cert.id}
              initial={{ opacity: 0, x: reduce ? 0 : dir * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -dir * 16 }}
              transition={fade}
              drag={coarse && many ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragDirectionLock
              onDragEnd={onDragEnd}
              className="rounded-[8px] bg-white p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] lg:p-3"
            >
              <div
                className="relative"
                style={{
                  aspectRatio: `${img.width} / ${img.height}`,
                  width: `min(${viewerCap(img)}px, calc(100vw - 48px), calc((100dvh - 230px) * ${img.width / img.height}))`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized={!img.optimize}
                  sizes={VIEWER_SIZES}
                  loading="eager"
                  fetchPriority="high"
                  className="object-contain"
                />
              </div>
            </motion.figure>
          </AnimatePresence>

          {many && (
            <>
              <button
                onClick={() => go(-1)}
                aria-disabled={index === 0}
                aria-label="Previous certificate"
                className="absolute left-4 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-[#121210] aria-disabled:opacity-35 lg:flex"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-disabled={index === items.length - 1}
                aria-label="Next certificate"
                className="absolute right-4 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-[#121210] aria-disabled:opacity-35 lg:flex"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Facts rail */}
        <aside data-lenis-prevent className="tone-light rounded-t-[22px] bg-paper px-5 pb-8 pt-6 text-ink lg:col-start-2 lg:row-start-2 lg:overflow-y-auto lg:rounded-none lg:px-7 lg:pt-7">
          <motion.div key={cert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">{cert.kind}</div>
            <h2 id="cert-viewer-title" className="font-serif mt-2 text-[24px] leading-[1.1] tracking-[-0.02em] lg:text-[28px]">{cert.title}</h2>
            <p className="mt-1.5 text-[14.5px] text-ink-soft">{cert.issuer}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{cert.context}</p>

            <dl className="mt-5 border-t border-line">
              {cert.issued && (
                <div className="grid grid-cols-[96px_1fr] items-center gap-x-3 border-b border-line py-2.5">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">Issued</dt>
                  <dd className="text-[13.5px]"><time dateTime={cert.issued.iso}>{cert.issued.label}</time></dd>
                </div>
              )}
              <div className="grid grid-cols-[96px_1fr] items-center gap-x-3 border-b border-line py-2.5">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">Proof</dt>
                <dd><ProofChip proof={cert.proof} /></dd>
              </div>
              {cert.credentialId && (
                <div className="grid grid-cols-[96px_1fr] items-center gap-x-3 border-b border-line py-2.5">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">Credential</dt>
                  <dd className="select-all break-all font-mono text-[12.5px]">{cert.credentialId}</dd>
                </div>
              )}
            </dl>

            {cert.note && <p className="font-accent mt-5 border-l-2 border-accent pl-3 text-[15px] italic leading-snug text-ink-soft">{cert.note}</p>}

            {cert.provenance && (
              <div className="mt-5 rounded-[12px] bg-card p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Provenance</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{cert.provenance}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2">
              {cert.verifyUrl && (
                <>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.title} on Coursera (opens in a new tab)`}
                    className={`${btn} bg-ink text-paper hover:bg-accent hover:text-white`}
                  >
                    Verify on Coursera ↗
                  </a>
                  <button onClick={copy} className={`${btn} border border-line hover:border-ink`}>
                    <span className="transition-opacity duration-150">{copied ? 'Link copied ✓' : 'Copy verification link'}</span>
                  </button>
                  <span id="cert-verify-text" tabIndex={-1} className="select-all text-center font-mono text-[12px] text-ink-soft outline-none">
                    {cert.verifyUrl.replace('https://', '')}
                  </span>
                </>
              )}
              <a
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the original ${cert.title} image (opens in a new tab)`}
                className={`${btn} border border-line hover:border-ink`}
              >
                Open original image ↗
              </a>
            </div>
          </motion.div>
        </aside>

        {/* Mobile prev / next */}
        {many && (
          <div className="sticky bottom-0 z-10 mt-auto flex h-16 shrink-0 items-center justify-between border-t border-white/10 bg-[#141413] px-4 pb-[env(safe-area-inset-bottom)] lg:hidden">
            <button onClick={() => go(-1)} aria-disabled={index === 0} aria-label="Previous certificate" className="flex size-11 items-center justify-center rounded-full bg-white/10 aria-disabled:opacity-35">←</button>
            <span className="font-mono text-[11px] tracking-[0.18em] text-white/70">{index + 1} / {items.length}</span>
            <button onClick={() => go(1)} aria-disabled={index === items.length - 1} aria-label="Next certificate" className="flex size-11 items-center justify-center rounded-full bg-white/10 aria-disabled:opacity-35">→</button>
          </div>
        )}

        <p className="sr-only" aria-live="polite">Certificate {index + 1} of {items.length}: {cert.title}</p>
        <p className="sr-only" aria-live="polite">{copied ? 'Verification link copied' : ''}</p>
      </motion.div>
    </div>
  );
}
