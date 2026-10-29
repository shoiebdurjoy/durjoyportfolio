'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { certificates, type Certificate } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';
import { GRID_SIZES, ProofChip, warmCertificate } from '@/src/components/certificate-parts';
import { OPEN_CERTIFICATE_EVENT } from '@/src/lib/events';

const CertificateViewer = dynamic(() => import('@/src/components/CertificateViewer'), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;
const viewerItems = certificates.filter((c) => c.image);

const pill = 'inline-flex h-11 flex-1 items-center justify-center rounded-full text-[13px] font-medium transition-colors duration-200 md:h-10 md:flex-none md:px-4';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-x-3 border-b border-line py-2.5 md:grid-cols-[96px_1fr]">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="min-w-0 text-[13.5px] text-ink">{children}</dd>
    </div>
  );
}

// The real document on a cream mat. Never cropped; the BRAC slot stays an honest placeholder.
function Frame({ cert, i, onOpen }: { cert: Certificate; i: number; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const img = cert.image;
  const develop = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: reduce ? { duration: 0.3 } : { duration: 1.1, ease, delay: i * 0.1 + 0.12 },
  };

  if (!img) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[12px] bg-paper p-[10px] md:p-[14px]">
        <motion.div
          {...develop}
          initial={{ opacity: 0 }}
          role="img"
          aria-label="Certificate scan not yet added"
          className="flex h-full w-full flex-col items-center justify-center rounded-[4px] border-[1.5px] border-dashed border-ink/20 bg-card px-4 text-center"
        >
          <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">BRAC University</span>
          <span aria-hidden className="font-serif mt-2 max-w-[80%] text-[16px] leading-snug text-ink-soft md:text-[17px]">Web Development (Advanced Level)</span>
          <span aria-hidden className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeDasharray="2 2" /></svg>
            Scan to be added
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={() => warmCertificate(cert)}
      onFocus={() => warmCertificate(cert)}
      aria-haspopup="dialog"
      aria-label={`View the ${cert.title} certificate full size`}
      className="cert-frame group relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center rounded-[12px] bg-paper p-[10px] md:p-[14px]"
    >
      <motion.div
        {...develop}
        className="relative h-full max-w-full overflow-hidden rounded-[4px] shadow-[0_10px_18px_-12px_rgba(18,18,16,0.40)] ring-1 ring-[rgba(18,18,16,0.08)]"
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
      >
        <Image src={img.src} alt={img.alt} fill unoptimized={!img.optimize} sizes={GRID_SIZES} loading="lazy" className="object-contain" />
      </motion.div>
      <span
        aria-hidden
        className="absolute bottom-2.5 right-2.5 inline-flex h-8 items-center gap-1.5 rounded-full bg-ink/85 px-3 text-[12px] font-medium text-paper transition-[opacity,translate] duration-[250ms] pointer-fine:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:pointer-fine:translate-y-1.5 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5" /></svg>
        View full size
      </span>
    </button>
  );
}

function CertCard({ cert, i, onOpen }: { cert: Certificate; i: number; onOpen: (id: string) => void }) {
  const reduce = useReducedMotion();
  const brac = !cert.image;

  return (
    <motion.div
      className={`h-full ${brac ? 'md:col-span-2 lg:col-span-1' : ''}`}
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={reduce ? { duration: 0.3 } : { duration: 0.9, ease, delay: i * 0.1 }}
    >
      <article
        data-interactive={brac ? 'false' : 'true'}
        aria-labelledby={`${cert.id}-title`}
        className={`cert relative isolate flex h-full flex-col rounded-[20px] border border-line bg-card p-2.5 shadow-[0_1px_0_rgba(18,18,16,0.04),0_24px_48px_-36px_rgba(18,18,16,0.35)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[20px] after:opacity-0 after:shadow-[0_36px_60px_-34px_rgba(18,18,16,0.45)] after:transition-opacity after:duration-[450ms] after:content-[''] md:p-3 lg:hover:after:opacity-100 motion-safe:lg:hover:-translate-y-1 ${
          brac ? 'md:grid md:grid-cols-[44%_1fr] md:gap-x-6 lg:flex lg:flex-col' : ''
        }`}
      >
        <div className={`flex items-center justify-between gap-3 px-2 pb-3 pt-1 ${brac ? 'md:col-span-2' : ''}`}>
          <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            <span className={`size-1.5 rounded-full ${cert.track === 'Video' ? 'bg-accent' : 'bg-ink'}`} />
            {cert.index} · {cert.track}
          </span>
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{cert.kind}</span>
        </div>

        <Frame cert={cert} i={i} onOpen={() => onOpen(cert.id)} />

        <div className="flex flex-1 flex-col">
          <div className="px-2 pt-5">
            <h3 id={`${cert.id}-title`} className="font-serif text-[20px] leading-[1.15] tracking-[-0.02em] text-ink md:text-[22px]">{cert.title}</h3>
            <p className="mt-1 text-[14px] text-ink-soft md:text-[14.5px]">{cert.issuer}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-[13.5px]">{cert.context}</p>
          </div>

          <dl className="mx-2 mt-4 border-t border-line">
            {cert.issued && (
              <Row label="Issued"><time dateTime={cert.issued.iso}>{cert.issued.label}</time></Row>
            )}
            {cert.listedOn && <Row label="Listed on">{cert.listedOn.label}</Row>}
            <Row label="Proof"><ProofChip proof={cert.proof} /></Row>
            {cert.credentialId && (
              <Row label="Credential"><span className="select-all break-all font-mono text-[12.5px]">{cert.credentialId}</span></Row>
            )}
          </dl>

          {cert.note && <p className="font-accent mx-2 mt-4 border-l-2 border-accent pl-3 text-[15px] italic leading-snug text-ink-soft">{cert.note}</p>}

          <div className="mt-auto flex gap-2 px-2 pb-1 pt-5">
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.title} on Coursera (opens in a new tab)`}
                className={`${pill} bg-ink text-paper hover:bg-accent hover:text-white`}
              >
                Verify on Coursera ↗
              </a>
            )}
            {cert.image && (
              <button
                type="button"
                onClick={() => onOpen(cert.id)}
                onPointerEnter={() => warmCertificate(cert)}
                onFocus={() => warmCertificate(cert)}
                aria-haspopup="dialog"
                className={`${pill} border border-line text-ink hover:border-ink`}
              >
                {cert.verifyUrl ? (
                  <><span className="md:hidden">View</span><span className="hidden md:inline">View certificate</span></>
                ) : (
                  'View certificate'
                )}
              </button>
            )}
            {cert.listedOn && (
              <a
                href={cert.listedOn.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open my résumé (PDF, opens in a new tab)"
                className={`${pill} border border-line text-ink hover:border-ink`}
              >
                See résumé ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Certificates() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  // Claims elsewhere on the site (the hero "2nd" stat, timeline markers) open their proof here.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (viewerItems.some((c) => c.id === id)) setOpenId(id);
    };
    window.addEventListener(OPEN_CERTIFICATE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CERTIFICATE_EVENT, onOpen);
  }, []);

  return (
    <section id="certificates" aria-labelledby="certificates-title" className="mx-auto max-w-7xl overflow-x-clip px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel index="05">Recognition</SectionLabel>
          <h2 id="certificates-title" className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="Awards &" />
            <LineReveal text="certificates." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft md:max-w-[340px]">
            The documents themselves: a national award for video, and the coursework behind the engineering. Where the issuer offers online verification, it is one click away.
          </p>
        </Reveal>
      </div>

      <div className="cert-grid mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:items-stretch">
        {certificates.map((c, i) => (
          <CertCard key={c.id} cert={c} i={i} onOpen={open} />
        ))}
      </div>

      <AnimatePresence>{openId && <CertificateViewer key={openId} items={viewerItems} initialId={openId} onClose={close} />}</AnimatePresence>
    </section>
  );
}
