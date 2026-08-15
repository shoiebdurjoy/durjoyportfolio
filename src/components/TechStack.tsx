'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import TechStackPhysics from '@/src/components/ui/TechStackPhysics';

export type TechItem = {
  name: string;
  category: 'languages' | 'frameworks' | 'systems' | 'ai' | 'creative';
  context: string;
};

const allItems: TechItem[] = [
  { name: 'Python', category: 'languages', context: 'Used in AI pipelines, thesis research, and FastAPI/Flask backends' },
  { name: 'TypeScript', category: 'languages', context: 'Primary language for DurjoyAI, LowKeyBD, and web platforms' },
  { name: 'Next.js', category: 'frameworks', context: 'Full-stack framework for LowKeyBD platform and this portfolio' },
  { name: 'PyTorch', category: 'ai', context: 'Deep learning framework for Bangla Multimodal Emotion Recognition thesis' },
  { name: 'NestJS', category: 'frameworks', context: 'Enterprise backend architecture for LowKeyBD REST & WebSocket APIs' },
  { name: 'FastAPI', category: 'frameworks', context: 'High-throughput async Python APIs for AI model serving' },
  { name: 'C++', category: 'languages', context: 'Academic foundation for algorithms and data structures at BRAC University' },
  { name: 'Docker', category: 'systems', context: 'Containerization across DurjoyAI and full-stack environments' },
  { name: 'PostgreSQL', category: 'systems', context: 'Primary relational database for EMERGON and LowKeyBD' },
  { name: 'Redis', category: 'systems', context: 'In-memory caching and session store for LowKeyBD' },
  { name: 'Flask', category: 'frameworks', context: 'Backend REST API and Socket.IO engine for EMERGON system' },
  { name: 'React', category: 'frameworks', context: 'Component-driven UI development across multiple platforms' },
  { name: 'CUDA', category: 'ai', context: 'GPU acceleration for training multimodal thesis models' },
  { name: 'Git & Linux', category: 'systems', context: 'Version control, shell scripting, and server infrastructure' },
  { name: 'Premiere Pro', category: 'creative', context: 'Primary NLE editor for 3+ years at Think Big Brand agency' },
  { name: 'After Effects', category: 'creative', context: 'Motion graphics, visual effects, and typography animation' },
  { name: 'DaVinci Resolve', category: 'creative', context: 'Color grading and post-production delivery' },
  { name: 'Alexa Skills', category: 'ai', context: 'Voice command interface built for DurjoyAI PC control' },
  { name: 'OpenAI API', category: 'ai', context: 'LLM engine integration and prompt orchestration in DurjoyAI' },
  { name: 'CapCut', category: 'creative', context: 'High-velocity short-form social content creation' },
  { name: 'Socket.IO', category: 'systems', context: 'Real-time bidirectional event dispatch for EMERGON emergency alerts' },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative py-24 md:py-32 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center gap-6"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Tech Stack // Physics Playground
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3]">
              Grab and Throw.
            </h2>
          </div>

          <div className="font-mono text-[11px] text-[#EDEAE3]/40 flex items-center justify-center flex-wrap gap-4 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22D3AE]" /> Engineering
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> AI & ML
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E8854A]" /> Video & Motion
            </span>
          </div>
        </motion.div>
      </div>

      {/* Physics Engine Tech Playground */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <TechStackPhysics 
          items={allItems} 
          onHoverItem={setActiveTech} 
        />
      </div>

      {/* Interactive Tooltip Context Box */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 min-h-[44px]">
        <div className="p-3.5 rounded-lg border border-[rgba(237,234,227,0.08)] bg-[#0D1117]/80 flex flex-col md:flex-row items-center justify-center text-center gap-4">
          <div className="font-mono text-[11px] text-[#EDEAE3]/50 flex items-center gap-2">
            <span className="text-[#F59E0B]">ⓘ</span>
            <span>
              {activeTech ? (
                <>
                  <strong className="text-[#EDEAE3] font-semibold">{activeTech.name}:</strong>{' '}
                  <span className="text-[#EDEAE3]/80">{activeTech.context}</span>
                </>
              ) : (
                'Hover any falling technology pill to see where and how it was used in real projects.'
              )}
            </span>
          </div>
          {activeTech && (
            <span className="font-mono text-[9px] uppercase tracking-[1.5px] px-2 py-0.5 rounded bg-[#EDEAE3]/10 text-[#EDEAE3]/60 hidden sm:inline-block">
              {activeTech.category}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
