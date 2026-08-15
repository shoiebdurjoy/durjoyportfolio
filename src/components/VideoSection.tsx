'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type VideoProject = {
  id: string;
  reelNumber: string;
  title: string;
  category: string;
  tag: string;
  behanceId: string;
  directUrl: string;
};

const videoProjects: VideoProject[] = [
  {
    id: 'reel-1',
    reelNumber: '01',
    title: 'Commercial Cut',
    category: 'High-Retention Campaign',
    tag: '9:16 Vertical',
    behanceId: '254329919',
    directUrl: 'https://www.behance.net/gallery/254329919',
  },
  {
    id: 'reel-2',
    reelNumber: '02',
    title: 'Motion Design',
    category: 'Kinetic Brand Visuals',
    tag: 'Motion FX',
    behanceId: '246267417',
    directUrl: 'https://www.behance.net/gallery/246267417',
  },
  {
    id: 'reel-3',
    reelNumber: '03',
    title: 'Narrative Reel',
    category: 'Documentary Cadence',
    tag: 'Sound Design',
    behanceId: '208647901',
    directUrl: 'https://www.behance.net/gallery/208647901',
  },
  {
    id: 'reel-4',
    reelNumber: '04',
    title: 'Brand Campaign',
    category: 'Fast-Paced Hook Edit',
    tag: 'Retention Edit',
    behanceId: '237032839',
    directUrl: 'https://www.behance.net/gallery/237032839',
  },
  {
    id: 'reel-5',
    reelNumber: '05',
    title: 'Visual Direction',
    category: 'Cinematic Color Master',
    tag: '4K Color Grade',
    behanceId: '254329497',
    directUrl: 'https://www.behance.net/gallery/254329497',
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
      {/* Cinematic Ambient Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#EA580C]/[0.025] blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-[#F59E0B]/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[rgba(248,250,252,0.08)] mb-12"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              04 // The Cutting Room · Video Editorial Suite
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-black uppercase tracking-tight leading-[1.05] text-[#F8FAFC]">
              Where Footage<br />
              <span className="text-[#F59E0B] italic font-normal">Becomes Story.</span>
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-[#F8FAFC]/60 max-w-xl mt-3 leading-[1.6]">
              Real vertical commercial edits, high-retention social reels, and narrative cuts engineered for international brands at Think Big Brand agency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end gap-3 text-left lg:text-right font-mono text-[12px] text-[#F8FAFC]/50">
            <div>
              <span className="text-[#F59E0B] font-bold">5 FEATURED VERTICAL PIECES</span>
              <div className="text-[11px] text-[#F8FAFC]/40">Native 9:16 Video Showcase</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[10px] text-[#F8FAFC]/70">Premiere Pro</span>
              <span className="px-2.5 py-1 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[10px] text-[#F8FAFC]/70">After Effects</span>
              <span className="px-2.5 py-1 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[10px] text-[#F8FAFC]/70">DaVinci Resolve</span>
            </div>
          </div>
        </motion.div>

        {/* 5-Column Simultaneous Vertical Video Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {videoProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-2xl bg-[#0C1017] border border-[rgba(248,250,252,0.08)] hover:border-[#F59E0B]/50 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.15)] transition-all duration-500 overflow-hidden flex flex-col h-[560px]"
            >
              {/* Card Top Telemetry Bar */}
              <div className="px-3.5 py-2.5 bg-[#090C10] border-b border-[rgba(248,250,252,0.06)] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span className="font-mono text-[10px] font-bold tracking-[1.5px] uppercase text-[#F8FAFC]">
                    REEL // {project.reelNumber}
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[1px] px-2 py-0.5 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] font-semibold">
                  {project.tag}
                </span>
              </div>

              {/* Native Behance Vertical Embed Player Frame */}
              <div className="flex-1 w-full bg-[#06080B] relative overflow-hidden">
                <iframe
                  src={`https://www.behance.net/embed/project/${project.behanceId}?ilo0=1`}
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                  allow="clipboard-write"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${project.title} - Reel ${project.reelNumber}`}
                />
              </div>

              {/* Card Bottom Meta Bar */}
              <div className="px-3.5 py-2.5 bg-[#090C10] border-t border-[rgba(248,250,252,0.06)] flex items-center justify-between shrink-0 group-hover:bg-[#0E131A] transition-colors">
                <div className="truncate pr-2">
                  <div className="font-sans text-[12px] font-bold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors truncate">
                    {project.title}
                  </div>
                  <div className="font-mono text-[10px] text-[#F8FAFC]/40 truncate">
                    {project.category}
                  </div>
                </div>

                <a
                  href={project.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on Behance`}
                  className="shrink-0 w-7 h-7 rounded-full bg-[#111722] hover:bg-[#F59E0B] hover:text-[#06080B] text-[#F8FAFC]/60 hover:shadow-[0_0_12px_rgba(245,158,11,0.4)] border border-[rgba(248,250,252,0.08)] flex items-center justify-center font-mono text-[11px] transition-all cursor-pointer"
                  title="Open on Behance"
                >
                  ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agency Credentials Strip & Behance Hub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 md:p-8 rounded-2xl bg-[#090C10] border border-[rgba(248,250,252,0.08)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-[#F59E0B] font-bold flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Think Big Brand Agency · Lead Video Editor
            </div>
            <p className="font-sans text-[13px] md:text-[14px] text-[#F8FAFC]/70 max-w-xl">
              Specialized in high-velocity social campaigns, commercial finishing, kinetic typography, pacing rhythm, and broadcast-ready color grading.
            </p>
          </div>

          <a
            href="https://www.behance.net/shoiebdurjoy9"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-[#F59E0B]/40 bg-[#0C1017] hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#06080B] text-[#F8FAFC] shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all duration-300 cursor-pointer font-mono text-[12px] font-bold tracking-[1.5px] uppercase"
          >
            <span>Explore Complete Behance Portfolio</span>
            <span className="group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
