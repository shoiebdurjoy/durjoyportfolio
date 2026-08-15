'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import TiltCard from '@/src/components/ui/TiltCard';

type VideoProject = {
  id: string;
  title: string;
  category: string;
  behanceId: string;
};

const videoProjects: VideoProject[] = [
  {
    id: 'project-1',
    title: 'Showcase Reel 01',
    category: 'Commercial Cut',
    behanceId: '254329919',
  },
  {
    id: 'project-2',
    title: 'Showcase Reel 02',
    category: 'Motion Design',
    behanceId: '246267417',
  },
  {
    id: 'project-3',
    title: 'Showcase Reel 03',
    category: 'Documentary',
    behanceId: '208647901',
  },
  {
    id: 'project-4',
    title: 'Showcase Reel 04',
    category: 'Brand Campaign',
    behanceId: '237032839',
  },
  {
    id: 'project-5',
    title: 'Showcase Reel 05',
    category: 'Short-Form Hook',
    behanceId: '254329497',
  },
];

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [activeVideo, setActiveVideo] = useState<VideoProject>(videoProjects[0]);

  return (
    <section
      id="cutting-room"
      ref={containerRef}
      className="relative py-28 md:py-40 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      {/* Sunset Amber Glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-[#EA580C]/[0.035] blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(248,250,252,0.08)] mb-16"
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
            <div className="text-[#F59E0B] font-bold">PROFESSIONAL SHOWCASE</div>
            <div>3+ Years Editing Experience</div>
          </div>
        </motion.div>

        {/* Cinematic Preview Player Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border border-[#F59E0B]/30 bg-[#0C1017] overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.08)] mb-8 max-w-4xl mx-auto"
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-video bg-[#06080B] flex flex-col items-center justify-center border-b border-[rgba(248,250,252,0.08)] overflow-hidden">
            <iframe
              key={activeVideo.behanceId} // Force re-render on change
              src={`https://www.behance.net/embed/project/${activeVideo.behanceId}?ilo0=1`}
              className="w-full h-full absolute inset-0 border-0"
              allowFullScreen
              loading="lazy"
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Active Video Telemetry Bar */}
          <div className="p-4 md:p-6 bg-[#0C1017] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="font-mono text-[12px] text-[#F59E0B] font-bold">
                {activeVideo.category} — {activeVideo.title}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[#F8FAFC]">Premiere Pro</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[#F8FAFC]">After Effects</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[#F8FAFC]">Color Grading</span>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#F8FAFC]/40 md:text-right">
              STATUS: ONLINE<br />
              SOURCE: BEHANCE NETWORK
            </div>
          </div>
        </motion.div>

        {/* Video Reel Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-16"
        >
          {videoProjects.map((video, idx) => {
            const isSelected = activeVideo.id === video.id;
            return (
              <TiltCard
                key={video.id}
                intensity={8}
                className={`p-3 md:p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'border-[#F59E0B] bg-[#0C1017] shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    : 'border-[rgba(248,250,252,0.08)] bg-[#0C1017]/60 hover:border-[#F59E0B]/50'
                }`}
              >
                <div 
                  onClick={() => setActiveVideo(video)} 
                  className="absolute inset-0 z-20"
                />
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                  <span className="font-mono text-[9px] uppercase tracking-[1px] text-[#F59E0B] font-bold mb-1">
                    Project 0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold mt-1">
                      PLAYING
                    </span>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        {/* Full Portfolio Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="https://www.behance.net/shoiebdurjoy9"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[rgba(248,250,252,0.1)] bg-[#0C1017] hover:border-[#F59E0B] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] group-hover:shadow-[0_0_8px_#F59E0B] transition-shadow" />
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors font-bold">
              View Full Behance Portfolio ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
