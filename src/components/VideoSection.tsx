'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const behanceProjects = [
  {
    id: '254329919',
    src: 'https://www.behance.net/embed/project/254329919?ilo0=1',
  },
  {
    id: '246267417',
    src: 'https://www.behance.net/embed/project/246267417?ilo0=1',
  },
  {
    id: '208647901',
    src: 'https://www.behance.net/embed/project/208647901?ilo0=1',
  },
  {
    id: '237032839',
    src: 'https://www.behance.net/embed/project/237032839?ilo0=1',
  },
  {
    id: '254329497',
    src: 'https://www.behance.net/embed/project/254329497?ilo0=1',
  },
];

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="cutting-room"
      ref={containerRef}
      className="relative py-28 md:py-40 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#EA580C]/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#F59E0B]/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(248,250,252,0.08)] mb-14"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              04 // The Cutting Room
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-[1.05] text-[#F8FAFC]">
              Where Footage<br />
              <span className="text-[#F59E0B] italic font-normal">Becomes Story.</span>
            </h2>
          </div>
          <div className="font-mono text-[12px] text-[#F8FAFC]/50 md:text-right space-y-1">
            <div className="text-[#F59E0B] font-bold">THINK BIG BRAND AGENCY</div>
            <div>3+ Years Professional Experience</div>
          </div>
        </motion.div>

        {/* 5 Behance Video Pieces Showcase */}
        {/* Row 1: 2 Prominent Pieces (50% / 50% on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {behanceProjects.slice(0, 2).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#0C1017] border border-[rgba(248,250,252,0.08)] hover:border-[#F59E0B]/40 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-[380px] sm:h-[420px] bg-[#06080B] overflow-hidden">
                <iframe
                  src={project.src}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  allow="clipboard-write"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: 3 Prominent Pieces (33.3% / 33.3% / 33.3% on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
          {behanceProjects.slice(2, 5).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (idx + 2) * 0.1 }}
              className="rounded-2xl bg-[#0C1017] border border-[rgba(248,250,252,0.08)] hover:border-[#F59E0B]/40 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-[360px] sm:h-[390px] bg-[#06080B] overflow-hidden">
                <iframe
                  src={project.src}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  allow="clipboard-write"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clear Connection to Full Behance Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12 md:mt-24"
        >
          <a
            href="https://www.behance.net/shoiebdurjoy9"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[rgba(248,250,252,0.12)] bg-[#0C1017] hover:border-[#F59E0B] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] group-hover:shadow-[0_0_8px_#F59E0B] transition-shadow" />
            <span className="font-mono text-[12px] uppercase tracking-[2px] text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors font-bold">
              View Full Behance Portfolio (shoiebdurjoy9) ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
