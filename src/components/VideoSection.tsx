'use client';

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { behanceProjects, profile } from '@/src/data/content';
import { LineReveal, SectionLabel } from '@/src/components/ui/Reveal';
import Section from '@/src/components/ui/Section';

const STEP = 360 / (behanceProjects.length + 1); // reels plus the Behance card close the ring
const RADIUS = 420;

function Perforations() {
  return (
    <div aria-hidden className="flex justify-between gap-2 px-3">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="h-2.5 w-4 rounded-[3px] bg-paper" />
      ))}
    </div>
  );
}

// The iframe mounts once near the viewport, but stays behind a play cover until clicked: Behance
// iframes swallow wheel events, which would otherwise trap the page scroll.
function LazyEmbed({ id, index }: { id: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[300px] w-full overflow-hidden rounded-xl bg-paper">
      {visible && (
        <iframe
          src={`https://www.behance.net/embed/project/${id}?ilo0=1`}
          title={`Behance video project ${index + 1}`}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          allowFullScreen
          scrolling="no"
          loading="lazy"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
        />
      )}
      {!playing && (
        <button
          onClick={() => setPlaying(true)}
          data-cursor="Play"
          aria-label={`Play reel ${index + 1}`}
          className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-colors ${loaded ? 'bg-black/25 hover:bg-black/10' : 'text-muted'}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-[#121210] shadow-xl">▶</span>
          {!loaded && <span className="text-[13px] font-medium">Loading reel {String(index + 1).padStart(2, '0')}…</span>}
        </button>
      )}
    </div>
  );
}

function ReelCard({ id, index }: { id: string; index: number }) {
  return (
    <figure className="glass rounded-[24px] py-3">
      <Perforations />
      <div className="px-3 py-3">
        <LazyEmbed id={id} index={index} />
      </div>
      <Perforations />
      <figcaption className="flex items-center justify-between px-5 pt-3 text-[13px] text-muted">
        <span>Reel {String(index + 1).padStart(2, '0')}</span>
        <span>Behance ↗</span>
      </figcaption>
    </figure>
  );
}

function BehanceCard({ className = '' }: { className?: string }) {
  return (
    <a
      href={profile.behance}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Behance"
      className={`group flex flex-col justify-between rounded-[24px] bg-accent p-8 text-white ${className}`}
    >
      <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/80">Full portfolio</span>
      <span className="font-serif text-5xl leading-[1]">See every cut on Behance</span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-accent transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
    </a>
  );
}

function Slot({ index, rotation, children }: { index: number; rotation: MotionValue<number>; children: React.ReactNode }) {
  // Cards fade as they turn away from the viewer.
  const opacity = useTransform(rotation, (r) => 0.25 + 0.75 * Math.max(0, Math.cos(((index * STEP + r) * Math.PI) / 180)));
  return (
    <motion.div
      className="absolute inset-0"
      style={{ transform: `rotateY(${index * STEP}deg) translateZ(${RADIUS}px)`, backfaceVisibility: 'hidden', opacity }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  return (
    <div>
      <SectionLabel index="05">The cutting room</SectionLabel>
      <h2 className="mt-6 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
        <LineReveal text="Where footage" />
        <LineReveal text="becomes story." delay={0.08} className="italic text-accent" />
      </h2>
    </div>
  );
}

export default function VideoSection() {
  const total = behanceProjects.length + 1;
  const track = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const rotation = useTransform(scrollYProgress, [0.05, 0.95], [0, -(total - 1) * STEP], { clamp: true });
  const [front, setFront] = useState(0);
  useMotionValueEvent(rotation, 'change', (r) => setFront(Math.min(total - 1, Math.max(0, Math.round(-r / STEP)))));

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const p = 0.05 + (Math.max(0, Math.min(total - 1, i)) / (total - 1)) * 0.9;
    const y = top + p * (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const mobileScroller = useRef<HTMLDivElement>(null);

  return (
    <Section id="cutting-room" theme="dark" className="my-6">
      <div data-core="hide" aria-hidden className="pointer-events-none absolute left-1/2 top-1/3" />

      {/* Desktop: a film-reel cylinder turned by scroll. */}
      <div ref={track} className="relative hidden md:block" style={{ height: `${total * 70}vh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-8 px-8 pt-28">
            <Header />
            <div className="flex flex-col items-end gap-5">
              <p className="max-w-xs text-right text-[16px] leading-relaxed text-ink-soft">
                3+ years at <strong className="font-semibold text-ink">Think Big Brand</strong> cutting commercials, narrative reels and documentaries, then grading them.
              </p>
              <div className="flex items-center gap-3">
                <span className="mr-2 text-[13px] tabular-nums text-muted">{String(front + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                <button onClick={() => goTo(front - 1)} aria-label="Previous reel" className="glass flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:border-white/40">←</button>
                <button onClick={() => goTo(front + 1)} aria-label="Next reel" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#121210] transition-colors hover:bg-accent hover:text-white">→</button>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center" style={{ perspective: 1800 }}>
            <motion.div
              className="relative h-[430px] w-[400px] scale-[0.78] [@media(min-height:900px)]:scale-100"
              style={{ rotateY: rotation, transformStyle: 'preserve-3d', z: -RADIUS }}
            >
              {behanceProjects.map((id, i) => (
                <Slot key={id} index={i} rotation={rotation}>
                  <ReelCard id={id} index={i} />
                </Slot>
              ))}
              <Slot index={behanceProjects.length} rotation={rotation}>
                <BehanceCard className="h-full" />
              </Slot>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: a swipeable strip. */}
      <div className="py-24 md:hidden">
        <div className="px-5">
          <Header />
          <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
            3+ years at <strong className="font-semibold text-ink">Think Big Brand</strong> cutting commercials, narrative reels and documentaries, then grading them.
          </p>
        </div>
        <div ref={mobileScroller} className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4" data-lenis-prevent-horizontal>
          {behanceProjects.map((id, i) => (
            <div key={id} className="w-[86vw] shrink-0 snap-start">
              <ReelCard id={id} index={i} />
            </div>
          ))}
          <BehanceCard className="w-[70vw] shrink-0 snap-start" />
        </div>
      </div>
    </Section>
  );
}
