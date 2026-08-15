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
  youtubeId?: string; // Ready for real YouTube IDs
};

const videoProjects: VideoProject[] = [
  {
    id: 'commercial-campaign',
    title: 'Brand Commercial & Social Campaign',
    category: 'Commercial // High-Pacing',
    agency: 'Think Big Brand (Agency)',
    role: 'Lead Video Editor & Motion Designer',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    description:
      'High-velocity commercial cut for international brand release. Multi-camera synchronization, sound design spatialization, and custom typography animation.',
  },
  {
    id: 'documentary-narrative',
    title: 'Narrative Storytelling & Documentary Cut',
    category: 'Narrative // Long-Form',
    agency: 'Think Big Brand (Agency)',
    role: 'Colorist & Video Editor',
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Color Master'],
    description:
      'Pacing-driven documentary storytelling focusing on interview cadence, cinematic color grading, and ambient music rhythm.',
  },
  {
    id: 'motion-shorts',
    title: 'High-Impact Short-Form Reels & Visuals',
    category: 'Short-Form // Motion Graphics',
    agency: 'Content Agency Client Campaigns',
    role: 'Editor & Visual Effects Artist',
    tools: ['After Effects', 'Premiere Pro', 'CapCut', 'Photoshop'],
    description:
      'Dynamic hook-retention short-form videos with kinetic typography, SFX layering, and seamless speed ramps.',
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
      className="relative py-24 md:py-36 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C] overflow-hidden"
    >
      {/* Warm Cinematic Film Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#E8854A]/[0.035] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#E8854A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8854A]" />
            The Cutting Room // Video Editing & Motion
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3]">
                Where footage becomes story.
              </h2>
              <p className="font-mono text-[12px] text-[#E8854A] mt-2">
                3+ Years Professional Experience · Think Big Brand (Agency)
              </p>
            </div>
            <p className="font-sans text-[14px] text-[#EDEAE3]/50 max-w-sm">
              Crafting pacing, rhythm, and narrative structure. Ready to display real YouTube edits once links are provided.
            </p>
          </div>
        </motion.div>

        {/* Featured Video Player Frame (Cinema Player Slot) */}
        <div className="rounded-xl border border-[#E8854A]/30 bg-[#0D1117] overflow-hidden shadow-[0_0_35px_rgba(232,133,74,0.08)] mb-8">
          <div className="relative aspect-video bg-[#07090C] flex flex-col items-center justify-center p-8 text-center border-b border-[rgba(237,234,227,0.08)] overflow-hidden">
            {activeVideo.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="space-y-4 max-w-lg">
                <div className="w-16 h-16 rounded-full border-2 border-[#E8854A] bg-[#E8854A]/10 flex items-center justify-center text-[#E8854A] text-2xl mx-auto shadow-[0_0_20px_rgba(232,133,74,0.3)]">
                  ▶
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[2px] text-[#E8854A]">
                    {activeVideo.category}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-[#EDEAE3] mt-1">
                    {activeVideo.title}
                  </h3>
                </div>
                <p className="font-sans text-[13px] text-[#EDEAE3]/60 leading-[1.6]">
                  {activeVideo.description}
                </p>
                <div className="inline-block px-3 py-1 rounded bg-[#131920] border border-[#E8854A]/30 font-mono text-[10px] text-[#E8854A]">
                  [ YouTube Link Slot: Paste YouTube Video ID to activate player ]
                </div>
              </div>
            )}

            {/* Cinematic Filmstrip Ticks Overlay */}
            <div className="absolute top-2 left-4 right-4 flex justify-between opacity-20 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-2 h-1 bg-[#E8854A] rounded-[0.5px]" />
              ))}
            </div>
          </div>

          {/* Active Video Metadata Footer */}
          <div className="p-6 md:p-8 bg-[#0D1117] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="font-mono text-[11px] text-[#E8854A] font-semibold">
                {activeVideo.agency} — {activeVideo.role}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeVideo.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#131920] border border-[rgba(237,234,227,0.08)] text-[#EDEAE3]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="font-mono text-[11px] text-[#EDEAE3]/40">
              TIMECODE: 01:24:18:09 · 23.976 FPS · 4K PRORES
            </div>
          </div>
        </div>

        {/* Video Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videoProjects.map((video, idx) => {
            const isSelected = activeVideo.id === video.id;
            return (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`p-5 rounded-lg border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-[#E8854A] bg-[#0D1117] shadow-[0_0_20px_rgba(232,133,74,0.15)]'
                    : 'border-[rgba(237,234,227,0.08)] bg-[#0D1117]/60 hover:border-[rgba(237,234,227,0.2)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#E8854A]">
                    Edit 0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#E8854A]/20 text-[#E8854A] font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#EDEAE3] mb-1">
                  {video.title}
                </h4>
                <div className="font-mono text-[10px] text-[#EDEAE3]/40">
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
