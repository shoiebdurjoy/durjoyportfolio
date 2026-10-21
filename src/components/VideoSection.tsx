'use client';

import { useEffect, useRef, useState } from 'react';
import { behanceProjects, profile } from '@/src/data/content';
import { LineReveal, Reveal, SectionLabel } from '@/src/components/ui/Reveal';

function Perforations() {
  return (
    <div aria-hidden className="flex justify-between gap-2 px-3">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="h-2.5 w-4 rounded-[3px] bg-paper" />
      ))}
    </div>
  );
}

function LazyEmbed({ id, index }: { id: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
    <div ref={ref} className="relative h-[330px] w-full overflow-hidden rounded-xl bg-paper">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white text-ink">▶</span>
          <span className="text-[13px] font-medium">Loading reel {String(index + 1).padStart(2, '0')}…</span>
        </div>
      )}
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
    </div>
  );
}

export default function VideoSection() {
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 440, behavior: 'smooth' });

  return (
    <section id="cutting-room" className="overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="05">The cutting room</SectionLabel>
            <h2 className="mt-6 font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
              <LineReveal text="Where footage" />
              <LineReveal text="becomes story." delay={0.08} className="italic text-accent" />
            </h2>
          </div>
          <Reveal className="flex flex-col items-start gap-5 md:items-end">
            <p className="max-w-xs text-[16px] leading-relaxed text-ink-soft md:text-right">
              3+ years at <strong className="font-semibold text-ink">Think Big Brand</strong> cutting commercials, narrative reels and documentaries, then grading them.
            </p>
            <div className="flex gap-2">
              <button onClick={() => nudge(-1)} aria-label="Previous reels" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors hover:border-ink">←</button>
              <button onClick={() => nudge(1)} aria-label="Next reels" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent">→</button>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-[max(2rem,calc((100vw_-_72rem)/2_+_2rem))] scroll-px-5 md:scroll-px-[max(2rem,calc((100vw_-_72rem)/2_+_2rem))]"
      >
        {behanceProjects.map((id, i) => (
          <Reveal key={id} delay={i * 0.06} className="w-[86vw] shrink-0 snap-start sm:w-[420px]">
            <figure className="rounded-[24px] border border-line bg-white py-3">
              <Perforations />
              <div className="px-3 py-3">
                <LazyEmbed id={id} index={i} />
              </div>
              <Perforations />
              <figcaption className="flex items-center justify-between px-5 pt-3 text-[13px] text-muted">
                <span>Reel {String(i + 1).padStart(2, '0')}</span>
                <span>Behance ↗</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
        <a
          href={profile.behance}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Behance"
          className="group flex w-[70vw] shrink-0 snap-start flex-col justify-between rounded-[24px] bg-accent p-8 text-white sm:w-[320px]"
        >
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/80">Full portfolio</span>
          <span className="font-serif text-5xl leading-[1]">See every cut on Behance</span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-accent transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
        </a>
      </div>
    </section>
  );
}
