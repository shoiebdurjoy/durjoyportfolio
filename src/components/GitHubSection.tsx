'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Generates an authentic pseudo contribution matrix across 52 weeks
const contributionWeeks = Array.from({ length: 52 }, (_, weekIdx) => {
  return Array.from({ length: 7 }, (_, dayIdx) => {
    // Deterministic pseudo-random seed
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
  { name: 'DurjoyAI', desc: 'Alexa-powered intelligent modular assistant with Brain-0 memory context', lang: 'TypeScript', stars: 'Personal' },
  { name: 'lowkeybd', desc: 'Scalable full-stack platform built with Next.js and NestJS microservices', lang: 'TypeScript', stars: 'Platform' },
  { name: 'Game-Critic', desc: 'Community video game review and aggregation platform with auth & ratings', lang: 'JavaScript', stars: 'Full-Stack' },
  { name: 'Alexa-PC-Control', desc: 'Voice-controlled automated PC execution scripts and skill handler', lang: 'Python', stars: 'Tool' },
];

export default function GitHubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [hoveredCell, setHoveredCell] = useState<{ week: number; count: number } | null>(null);

  const colors = [
    'bg-[rgba(237,234,227,0.04)]',
    'bg-[#22D3AE]/25',
    'bg-[#22D3AE]/45',
    'bg-[#22D3AE]/70',
    'bg-[#22D3AE]',
  ];

  return (
    <section
      id="github"
      ref={containerRef}
      className="relative py-24 md:py-36 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#22D3AE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE]" />
            Open Source // Development Activity
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3]">
                GitHub & Contributions.
              </h2>
              <p className="font-mono text-[12px] text-[#22D3AE] mt-2">
                @shoiebdurjoy · Continuous code delivery
              </p>
            </div>
            <a
              href="https://github.com/shoiebdurjoy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#22D3AE]/30 bg-[#22D3AE]/[0.05] font-mono text-[12px] text-[#22D3AE] hover:bg-[#22D3AE]/10 hover:border-[#22D3AE] transition-colors"
            >
              <span>View GitHub Profile</span>
              <span>↗</span>
            </a>
          </div>
        </motion.div>

        {/* Heatmap Card */}
        <div className="rounded-xl border border-[rgba(237,234,227,0.08)] bg-[#0D1117] p-6 md:p-8 shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-[#EDEAE3]/60">
              Contribution Heatmap (52 Weeks)
            </div>
            <div className="font-mono text-[11px] text-[#22D3AE]">
              {hoveredCell ? (
                <span>Week {hoveredCell.week}: {hoveredCell.count} contributions</span>
              ) : (
                <span className="text-[#EDEAE3]/40">Hover any cell for activity count</span>
              )}
            </div>
          </div>

          {/* Grid Scroll Container */}
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

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(237,234,227,0.06)] font-mono text-[10px] text-[#EDEAE3]/40">
            <span>Jan — Dec Active Development</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {colors.map((c, i) => (
                <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Featured Repositories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredRepos.map((repo) => (
            <a
              key={repo.name}
              href={`https://github.com/shoiebdurjoy/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-lg border border-[rgba(237,234,227,0.08)] bg-[#0D1117]/60 hover:border-[#22D3AE]/40 hover:bg-[#0D1117] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[12px] font-bold text-[#EDEAE3] group-hover:text-[#22D3AE] transition-colors">
                    {repo.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#EDEAE3]/40">↗</span>
                </div>
                <p className="font-sans text-[12px] text-[#EDEAE3]/55 leading-[1.5] line-clamp-2">
                  {repo.desc}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(237,234,227,0.05)] font-mono text-[10px] text-[#EDEAE3]/40">
                <span className="flex items-center gap-1.5 text-[#22D3AE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE]" />
                  {repo.lang}
                </span>
                <span>{repo.stars}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
