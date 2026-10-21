'use client';

import { useEffect, useState } from 'react';
import { featuredRepos, profile } from '@/src/data/content';
import { Reveal, SectionLabel } from '@/src/components/ui/Reveal';

type Day = { date: string; level: number };
type Week = { week: number; days: Day[] };

const levels = ['bg-paper', 'bg-[#FFD3C2]', 'bg-[#FFA27F]', 'bg-[#FF7444]', 'bg-accent'];

export default function GitHubSection() {
  const [weeks, setWeeks] = useState<Week[] | null>(null);
  const [hover, setHover] = useState<Day | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => setWeeks(d.weeks ?? []))
      .catch(() => setWeeks([]));
  }, []);

  return (
    <section id="github" className="mx-auto max-w-6xl px-5 pb-28 md:px-8 md:pb-36">
      <div className="rounded-[32px] border border-line bg-white p-6 md:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="06">Open source</SectionLabel>
            <h2 className="mt-5 font-serif text-5xl leading-none md:text-6xl">
              Building <span className="italic text-muted">in public.</span>
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent"
          >
            @{profile.githubHandle} ↗
          </a>
        </div>

        <div className="mt-10 overflow-x-auto pb-2 no-scrollbar" data-lenis-prevent-horizontal>
          <div className="flex min-w-[740px] gap-[4px]" aria-label="GitHub contribution calendar" role="img">
            {(weeks && weeks.length ? weeks : Array.from({ length: 53 }, (_, i) => ({ week: i, days: [] as Day[] }))).map((w) => (
              <div key={w.week} className="flex flex-1 flex-col gap-[4px]">
                {Array.from({ length: 7 }).map((_, j) => {
                  const d = w.days[j];
                  return (
                    <div
                      key={j}
                      onMouseEnter={() => d && setHover(d)}
                      onMouseLeave={() => setHover(null)}
                      className={`aspect-square w-full rounded-[3px] transition-transform hover:scale-125 ${d ? levels[d.level] ?? levels[0] : 'bg-paper'} ${!weeks ? 'animate-pulse' : ''}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
          <span>{hover ? `${hover.date} · level ${hover.level}` : 'Last 12 months'}</span>
          <span className="flex items-center gap-1.5">
            Less {levels.map((c) => <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />)} More
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRepos.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <a
                href={`${profile.github}/${r.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl bg-paper p-5 transition-colors hover:bg-accent-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-semibold">{r.name}</span>
                    <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-snug text-ink-soft">{r.desc}</p>
                </div>
                <span className="mt-5 flex items-center gap-2 text-[13px] text-muted">
                  <span className="h-2 w-2 rounded-full bg-accent" /> {r.lang}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
