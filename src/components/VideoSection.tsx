'use client';

import Image from 'next/image';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { profile, videos } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';
import { useFocusTrap } from '@/src/components/ui/useFocusTrap';

type Video = (typeof videos)[number];
const SLOTS = videos.length + 1; // the videos plus the "see all on Behance" card
const MID = (SLOTS - 1) / 2;
const ARCH_R = 300;
const SPACING = 214;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// Three poses per card: a pile (before the section arrives), an arch (assembled), and a curved
// panorama (unfolded by scroll). `intro` plays once on arrival; `unfold` follows the scroll.
function pose(i: number, intro: number, unfold: number) {
  const e = ease(clamp01((intro - i * 0.07) / 0.6));
  const theta = ((155 - (i * 130) / (SLOTS - 1)) * Math.PI) / 180;
  const arch = { x: ARCH_R * Math.cos(theta), y: -ARCH_R * Math.sin(theta) + ARCH_R * 0.62, z: 0, ry: 0, rz: 90 - (theta * 180) / Math.PI, s: 0.78 };
  const k = i - MID;
  const pano = { x: k * SPACING, y: 0, z: Math.abs(k) * 46, ry: -k * 10, rz: 0, s: 1 };
  const pile = { x: 0, y: 180, z: -200, ry: 0, rz: (i - MID) * 6, s: 0.4 };
  const from = { x: lerp(pile.x, arch.x, e), y: lerp(pile.y, arch.y, e), z: lerp(pile.z, arch.z, e), ry: 0, rz: lerp(pile.rz, arch.rz, e), s: lerp(pile.s, arch.s, e) };
  const u = ease(clamp01(unfold));
  return {
    transform: `translate3d(${lerp(from.x, pano.x, u)}px, ${lerp(from.y, pano.y, u)}px, ${lerp(from.z, pano.z, u)}px) rotateY(${lerp(from.ry, pano.ry, u)}deg) rotateZ(${lerp(from.rz, pano.rz, u)}deg) scale(${lerp(from.s, pano.s, u)})`,
    opacity: e,
  };
}

function Cover({ video }: { video: Video }) {
  return (
    <>
      <Image
        src={`/videos/${video.id}.webp`}
        alt=""
        fill
        sizes="200px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/85 backdrop-blur">{video.kind}</span>
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-white/90 text-[15px] text-[#121210] opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">▶</span>
      <span className="absolute inset-x-3 bottom-3 text-left text-[14px] font-semibold leading-tight text-white">{video.title}</span>
    </>
  );
}

function BehanceCard() {
  return (
    <a
      href={profile.behance}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col justify-between rounded-[18px] bg-accent p-5 text-white"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">Full portfolio</span>
      <span className="text-[24px] font-semibold leading-[1.02] tracking-[-0.03em]">See every video on <span className="font-accent">Behance</span></span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
    </a>
  );
}

function StageCard({ index, intro, unfold, children }: { index: number; intro: MotionValue<number>; unfold: MotionValue<number>; children: React.ReactNode }) {
  const transform = useTransform([intro, unfold], ([a, b]) => pose(index, a as number, b as number).transform);
  const opacity = useTransform([intro, unfold], ([a, b]) => pose(index, a as number, b as number).opacity);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[95px] -mt-[169px] h-[338px] w-[190px] will-change-transform"
      style={{ transform, opacity, zIndex: 50 - Math.round(Math.abs(index - MID) * 10) }}
    >
      <div className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3">{children}</div>
    </motion.div>
  );
}

function Lightbox({ video, onClose }: { video: Video; onClose: () => void }) {
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[min(92vw,760px)] overflow-hidden rounded-[22px] border border-white/10 bg-[#141413] p-3 shadow-2xl"
      >
        <div className="flex items-center justify-between px-2 pb-3 text-white">
          <div>
            <div className="text-[16px] font-semibold">{video.title}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{video.kind} · Think Big Brand</div>
          </div>
          <button onClick={onClose} aria-label="Close video" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#121210] transition-colors hover:bg-accent hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-black">
          <iframe
            src={`https://www.behance.net/embed/project/${video.id}?ilo0=1`}
            title={video.title}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            allow="clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <a href={`https://www.behance.net/gallery/${video.id}/x`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block px-2 text-[13px] text-white/60 transition-colors hover:text-white">
          Open on Behance ↗
        </a>
      </motion.div>
    </div>
  );
}

export default function VideoSection() {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, margin: '-15% 0px' });
  const intro = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 60%', 'center 50%'] });
  const sprung = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const reduce = useReducedMotion();
  const settled = useMotionValue(1);
  // Reduced motion: no scroll-linked 3D, just the unfolded ribbon.
  const unfold = reduce ? settled : sprung;
  const [open, setOpen] = useState<Video | null>(null);
  const [fit, setFit] = useState(1);

  useEffect(() => {
    if (!inView) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      intro.set(1.5);
      return;
    }
    const c = animate(intro, 1.5, { duration: 1.8, ease: 'linear' });
    return () => c.stop();
  }, [inView, intro]);

  // Scale the stage down on narrower desktops so the unfolded ribbon always fits.
  useEffect(() => {
    const measure = () => setFit(Math.min(1, (window.innerWidth - 80) / (SLOTS * SPACING + 60)));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section id="cutting-room" data-tone="dark" className="relative overflow-x-clip py-28 md:py-36">
      {/* Warm horizon behind the reel, in the site's accent. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: 'radial-gradient(60% 55% at 50% 100%, rgba(255,90,36,0.22) 0%, rgba(255,90,36,0) 70%)' }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-10">
        <div>
          <SectionLabel index="08">Video work</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="Brand videos" />
            <LineReveal text="that get watched." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Three years at <strong className="font-medium text-ink">Think Big Brand</strong> editing ads, shorts and talking-head videos for businesses: clear, fast and on brand. Click any video to watch.
          </p>
        </Reveal>
      </div>

      {/* Desktop: arch → panorama */}
      <div ref={stage} className="relative mt-10 hidden md:block" style={{ height: Math.round(580 * fit) }}>
        <div className="absolute inset-0" style={{ perspective: 1600, transform: `scale(${fit})`, transformOrigin: '50% 50%' }}>
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {videos.map((v, i) => (
              <StageCard key={v.id} index={i} intro={intro} unfold={unfold}>
                <button
                  onClick={() => setOpen(v)}
                  aria-label={`Watch ${v.title}`}
                  className="group relative block h-full w-full overflow-hidden rounded-[18px] border border-white/10 bg-black shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]"
                >
                  <Cover video={v} />
                </button>
              </StageCard>
            ))}
            <StageCard index={videos.length} intro={intro} unfold={unfold}>
              <BehanceCard />
            </StageCard>
          </div>
        </div>
      </div>

      {/* Mobile: a swipeable strip of the same cards */}
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:hidden" data-lenis-prevent-horizontal>
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={() => setOpen(v)}
            aria-label={`Watch ${v.title}`}
            className="group relative h-[300px] w-[170px] shrink-0 snap-start overflow-hidden rounded-[18px] border border-white/10 bg-black"
          >
            <Cover video={v} />
          </button>
        ))}
        <div className="h-[300px] w-[170px] shrink-0 snap-start">
          <BehanceCard />
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 text-[14px] text-ink-soft md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">What I edit</span>
        <span>Ads</span><span>Short-form</span><span>Talking heads</span><span>Brand promos</span>
        <span className="hidden h-4 w-px bg-line md:block" />
        <span className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 md:w-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">With</span>
          <span>Premiere Pro · After Effects · DaVinci Resolve · CapCut</span>
        </span>
      </div>

      {open && <Lightbox video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
