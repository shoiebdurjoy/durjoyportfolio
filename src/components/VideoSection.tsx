'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

type VideoProject = {
  id: string;
  title: string;
  category: string;
  agency: string;
  role: string;
  tools: string[];
  description: string;
  youtubeId?: string;
};

const videoProjects: VideoProject[] = [
  {
    id: 'commercial-campaign',
    title: 'Brand Commercial & Social Campaigns',
    category: 'Commercial // High-Velocity',
    agency: 'Think Big Brand (Agency)',
    role: 'Lead Video Editor & Motion Designer',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design'],
    description:
      'High-impact commercial edits for international brand releases. Multi-track audio spatialization, kinetic typography, and seamless temporal pacing.',
  },
  {
    id: 'documentary-narrative',
    title: 'Narrative Storytelling & Documentary Cuts',
    category: 'Documentary // Long-Form',
    agency: 'Think Big Brand (Agency)',
    role: 'Colorist & Video Editor',
    tools: ['DaVinci Resolve', 'Premiere Pro', '4K Color Master'],
    description:
      'Pacing-driven documentary storytelling focusing on interview cadence, atmospheric score balancing, and cinematic color correction.',
  },
  {
    id: 'motion-shorts',
    title: 'High-Retention Short-Form Reels & Hooks',
    category: 'Short-Form // Motion Graphics',
    agency: 'Agency Client Channels',
    role: 'Motion Designer & Editor',
    tools: ['After Effects', 'Premiere Pro', 'CapCut', 'Photoshop'],
    description:
      'Dynamic short-form visual content engineered for high audience retention, speed ramps, and custom sound design layers.',
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

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
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
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-[0.95] text-[#F8FAFC]">
              Where Footage<br />
              <span className="text-[#F59E0B] italic font-normal">Becomes Story.</span>
            </h2>
          </div>
          <div className="font-mono text-[12px] text-[#F8FAFC]/50 text-right space-y-1">
            <div className="text-[#F59E0B] font-bold">THINK BIG BRAND AGENCY</div>
            <div>3+ Years Professional Experience</div>
          </div>
        </motion.div>

        {/* Cinematic Preview Player Frame */}
        <div className="rounded-xl border border-[#F59E0B]/30 bg-[#0C1017] overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.08)] mb-8">
          <div className="relative aspect-video bg-[#06080B] flex flex-col items-center justify-center p-8 text-center border-b border-[rgba(248,250,252,0.08)] overflow-hidden">
            {activeVideo.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="space-y-4 max-w-lg relative z-10">
                <div className="w-16 h-16 rounded-full border-2 border-[#F59E0B] bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] text-2xl mx-auto shadow-[0_0_25px_rgba(245,158,11,0.35)]">
                  ▶
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[2px] text-[#F59E0B] font-bold">
                    {activeVideo.category}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-[#F8FAFC] mt-1">
                    {activeVideo.title}
                  </h3>
                </div>
                <p className="font-sans text-[14px] text-[#F8FAFC]/70 leading-[1.7]">
                  {activeVideo.description}
                </p>
                <div className="inline-block px-3 py-1 rounded bg-[#111722] border border-[#F59E0B]/30 font-mono text-[10px] text-[#F59E0B]">
                  [ Cinema Player Ready — YouTube Links integrate directly here ]
                </div>
              </div>
            )}

            {/* Sprocket Guides */}
            <div className="absolute top-2 left-4 right-4 flex justify-between opacity-20 pointer-events-none">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="w-2 h-1 bg-[#F59E0B] rounded-[0.5px]" />
              ))}
            </div>
          </div>

          {/* Active Video Telemetry Bar */}
          <div className="p-6 md:p-8 bg-[#0C1017] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="font-mono text-[12px] text-[#F59E0B] font-bold">
                {activeVideo.agency} — {activeVideo.role}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeVideo.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[#F8FAFC]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="font-mono text-[11px] text-[#F8FAFC]/40 text-right">
              TIMECODE: 01:24:18:09 · 23.976 FPS · 4K PRORES
            </div>
          </div>
        </div>

        {/* Video Reel Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videoProjects.map((video, idx) => {
            const isSelected = activeVideo.id === video.id;
            return (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-[#F59E0B] bg-[#0C1017] shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                    : 'border-[rgba(248,250,252,0.08)] bg-[#0C1017]/60 hover:border-[rgba(248,250,252,0.2)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#F59E0B] font-bold">
                    Reel 0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold">
                      PLAYING
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-1">
                  {video.title}
                </h4>
                <div className="font-mono text-[11px] text-[#F8FAFC]/40">
                  {video.agency}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
