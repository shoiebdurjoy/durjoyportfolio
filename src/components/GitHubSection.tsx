'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const contributionWeeks = Array.from({ length: 52 }, (_, weekIdx) => {
  return Array.from({ length: 7 }, (_, dayIdx) => {
    const seed = (weekIdx * 7 + dayIdx) * 16807 % 2147483647;
    const count = seed % 10 > 3 ? seed % 7 : 0;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
    return {
      week: weekIdx + 1,
      day: dayIdx,
      count,
      level,
    };
  });
});

const featuredRepos = [
  { name: 'DurjoyAI', desc: 'Alexa-powered intelligent modular assistant with Brain-0 memory context', lang: 'TypeScript', tag: 'Flagship' },
  { name: 'lowkeybd', desc: 'Scalable full-stack platform built with Next.js and NestJS microservices', lang: 'TypeScript', tag: 'Platform' },
  { name: 'Game-Critic', desc: 'Community video game review and aggregation platform with auth & ratings', lang: 'JavaScript', tag: 'Full-Stack' },
  { name: 'Alexa-PC-Control', desc: 'Voice-controlled automated PC execution scripts and skill handler', lang: 'Python', tag: 'Tool' },
];

export default function GitHubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [hoveredCell, setHoveredCell] = useState<{ week: number; count: number } | null>(null);

  const colors = [
    'bg-[rgba(248,250,252,0.04)]',
    'bg-[#00F2C3]/25',
    'bg-[#00F2C3]/45',
    'bg-[#00F2C3]/75',
    'bg-[#00F2C3]',
  ];

  return (
    <section
      id="github"
      ref={containerRef}
      className="relative py-28 md:py-40 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(248,250,252,0.08)] mb-16"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#00F2C3] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2C3]" />
              05 // Codebase Telemetry
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-[0.95] text-[#F8FAFC]">
              GitHub Activity &<br />
              <span className="text-[#00F2C3] italic font-normal">Contributions.</span>
            </h2>
          </div>
          <a
            href="https://github.com/shoiebdurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#111722] hover:bg-[#00F2C3] hover:text-[#06080B] border border-[rgba(248,250,252,0.12)] font-mono text-[12px] font-semibold transition-all cursor-pointer shadow-lg"
          >
            <span>@shoiebdurjoy on GitHub</span>
            <span>↗</span>
          </a>
        </motion.div>

        {/* Heatmap Matrix Frame */}
        <div className="rounded-xl border border-[rgba(248,250,252,0.08)] bg-[#0C1017] p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-[#F8FAFC]/50">
              52-Week Contribution Matrix
            </div>
            <div className="font-mono text-[11px] text-[#00F2C3]">
              {hoveredCell ? (
                <span>Week {hoveredCell.week} // {hoveredCell.count} contributions recorded</span>
              ) : (
                <span className="text-[#F8FAFC]/30">Hover any cell for activity details</span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="grid grid-flow-col auto-cols-[13px] gap-[3.5px] min-w-[720px]">
              {contributionWeeks.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-rows-7 gap-[3.5px]">
                  {week.map((day) => (
                    <div
                      key={day.day}
                      onMouseEnter={() => setHoveredCell({ week: day.week, count: day.count })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-[11.5px] h-[11.5px] rounded-[2px] ${colors[day.level]} transition-transform hover:scale-125 cursor-pointer`}
                      title={`Week ${day.week}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(248,250,252,0.06)] font-mono text-[10px] text-[#F8FAFC]/40">
            <span>Jan — Dec Active Engineering</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {colors.map((c, i) => (
                <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Featured Repos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredRepos.map((repo) => (
            <a
              key={repo.name}
              href={`https://github.com/shoiebdurjoy/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl border border-[rgba(248,250,252,0.08)] bg-[#0C1017]/80 hover:border-[#00F2C3]/50 hover:bg-[#0C1017] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[12px] font-bold text-[#F8FAFC] group-hover:text-[#00F2C3] transition-colors">
                    {repo.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#F8FAFC]/40">↗</span>
                </div>
                <p className="font-sans text-[12px] text-[#F8FAFC]/60 leading-[1.5]">
                  {repo.desc}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(248,250,252,0.05)] font-mono text-[10px] text-[#F8FAFC]/40">
                <span className="flex items-center gap-1.5 text-[#00F2C3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F2C3]" />
                  {repo.lang}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#111722] text-[#F8FAFC]/50">
                  {repo.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
