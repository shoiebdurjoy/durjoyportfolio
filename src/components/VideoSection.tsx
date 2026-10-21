'use client';

import { animate, motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { behanceProjects, profile } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

const FAN = 14; // degrees between cards
const TOTAL = behanceProjects.length + 1; // reels plus the Behance card

function wrapOffset(i: number, pos: number) {
  return ((((i - pos + TOTAL / 2) % TOTAL) + TOTAL) % TOTAL) - TOTAL / 2;
}

// The iframe mounts near the viewport but stays under a play cover until clicked: Behance
// iframes swallow pointer and wheel events, which would break dragging and page scrolling.
function Reel({ id, index, front, playing, onPlay }: { id: string; index: number; front: boolean; playing: boolean; onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { rootMargin: '300px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-[14px] bg-black">
      {/* A played reel that turns away unmounts its player, which stops the audio. */}
      {visible && (front || !played) && (
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
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${loaded ? 'bg-black/30' : ''}`}>
          {front ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlayed(true);
                onPlay();
              }}
              aria-label={`Play reel ${index + 1}`}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-[#121210] shadow-2xl transition-transform duration-300 hover:scale-110"
            >
              ▶
            </button>
          ) : null}
          {!loaded && <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Loading reel {String(index + 1).padStart(2, '0')}</span>}
        </div>
      )}
    </div>
  );
}

function FanCard({ index, pos, active, onPick, children }: {
  index: number;
  pos: MotionValue<number>;
  active: number;
  onPick: (k: number) => void;
  children: React.ReactNode;
}) {
  const rotate = useTransform(pos, (v) => wrapOffset(index, v) * FAN);
  const opacity = useTransform(pos, (v) => Math.max(0, 1 - Math.max(0, Math.abs(wrapOffset(index, v)) - 2.2)));
  const zIndex = useTransform(pos, (v) => 100 - Math.round(Math.abs(wrapOffset(index, v)) * 10));
  const front = index === active;

  return (
    <motion.div
      onClick={() => !front && onPick(wrapOffset(index, pos.get()))}
      className={`absolute left-1/2 top-0 -ml-[160px] h-[290px] w-[320px] sm:-ml-[230px] sm:h-[390px] sm:w-[460px] ${front ? '' : 'cursor-pointer'}`}
      style={{ rotate, opacity, zIndex, transformOrigin: '50% 330%' }}
    >
      {children}
    </motion.div>
  );
}

export default function VideoSection() {
  const pos = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const playing = playingIndex === active;
  const [hovering, setHovering] = useState(false);
  const drag = useRef({ x: 0, start: 0, down: false, moved: false });
  const settling = useRef(false);
  useMotionValueEvent(pos, 'change', (v) => setActive(((Math.round(v) % TOTAL) + TOTAL) % TOTAL));

  const snapTo = useCallback((target: number) => {
    settling.current = true;
    animate(pos, target, { type: 'spring', stiffness: 140, damping: 24, onComplete: () => { settling.current = false; } });
  }, [pos]);

  // Slow drift when nobody is interacting.
  useAnimationFrame((_, delta) => {
    if (playing || hovering || drag.current.down || settling.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pos.set(pos.get() + delta * 0.00008);
  });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      if (Math.abs(e.clientX - d.x) > 6) d.moved = true;
      pos.set(d.start - (e.clientX - d.x) / 300);
    };
    const up = () => {
      if (!drag.current.down) return;
      drag.current.down = false;
      snapTo(Math.round(pos.get()));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [pos, snapTo]);

  const go = (dir: 1 | -1) => snapTo(Math.round(pos.get()) + dir);

  return (
    <section id="cutting-room" data-tone="dark" className="overflow-x-clip py-28 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-10">
        <div>
          <SectionLabel index="06">The cutting room</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">
            <LineReveal text="Where footage" />
            <LineReveal text="becomes story." delay={0.08} className="font-accent text-accent" />
          </h2>
        </div>
        <Reveal>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Three years at <strong className="font-medium text-ink">Think Big Brand</strong> cutting commercials, narrative reels and documentaries, then grading them.
          </p>
        </Reveal>
      </div>

      <div
        className="relative mt-16 h-[400px] cursor-grab select-none active:cursor-grabbing sm:h-[520px]"
        style={{ touchAction: 'pan-y' }}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, start: pos.get(), down: true, moved: false };
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Video reels"
      >
        {behanceProjects.map((id, i) => (
          <FanCard key={id} index={i} pos={pos} active={active} onPick={(k) => !drag.current.moved && snapTo(pos.get() + k)}>
            <figure className="flex h-full flex-col rounded-[22px] border border-white/10 bg-[#161615] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex-1">
                <Reel id={id} index={i} front={i === active} playing={playing && i === active} onPlay={() => setPlayingIndex(i)} />
              </div>
              <figcaption className="flex items-center justify-between px-2 pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                <span>Reel {String(i + 1).padStart(2, '0')}</span>
                <span>Behance</span>
              </figcaption>
            </figure>
          </FanCard>
        ))}
        <FanCard index={behanceProjects.length} pos={pos} active={active} onPick={(k) => !drag.current.moved && snapTo(pos.get() + k)}>
          <a
            href={profile.behance}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { if (active !== behanceProjects.length || drag.current.moved) e.preventDefault(); }}
            className="group flex h-full flex-col justify-between rounded-[22px] bg-accent p-8 text-white"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">Full portfolio</span>
            <span className="text-[38px] font-semibold leading-[0.95] tracking-[-0.04em]">See every cut on <span className="font-accent">Behance</span></span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-accent transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
          </a>
        </FanCard>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-center gap-4 px-5">
        <button onClick={() => go(-1)} aria-label="Previous reel" className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-ink">←</button>
        <span className="label min-w-24 text-center tabular-nums text-muted">{String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
        <button onClick={() => go(1)} aria-label="Next reel" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-accent hover:text-white">→</button>
      </div>
    </section>
  );
}
