'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

type TechItem = {
  name: string;
  category: 'languages' | 'frameworks' | 'systems' | 'ai' | 'creative';
  context: string;
};

const row1: TechItem[] = [
  { name: 'Python', category: 'languages', context: 'Used in AI pipelines, thesis research, and FastAPI/Flask backends' },
  { name: 'TypeScript', category: 'languages', context: 'Primary language for DurjoyAI, LowKeyBD, and web platforms' },
  { name: 'Next.js', category: 'frameworks', context: 'Full-stack framework for LowKeyBD platform and this portfolio' },
  { name: 'PyTorch', category: 'ai', context: 'Deep learning framework for Bangla Multimodal Emotion Recognition thesis' },
  { name: 'NestJS', category: 'frameworks', context: 'Enterprise backend architecture for LowKeyBD REST & WebSocket APIs' },
  { name: 'FastAPI', category: 'frameworks', context: 'High-throughput async Python APIs for AI model serving' },
  { name: 'C++', category: 'languages', context: 'Academic foundation for algorithms and data structures at BRAC University' },
];

const row2: TechItem[] = [
  { name: 'Docker', category: 'systems', context: 'Containerization across DurjoyAI and full-stack environments' },
  { name: 'PostgreSQL', category: 'systems', context: 'Primary relational database for EMERGON and LowKeyBD' },
  { name: 'Redis', category: 'systems', context: 'In-memory caching and session store for LowKeyBD' },
  { name: 'Flask', category: 'frameworks', context: 'Backend REST API and Socket.IO engine for EMERGON system' },
  { name: 'React', category: 'frameworks', context: 'Component-driven UI development across multiple platforms' },
  { name: 'CUDA', category: 'ai', context: 'GPU acceleration for training multimodal thesis models' },
  { name: 'Git & Linux', category: 'systems', context: 'Version control, shell scripting, and server infrastructure' },
];

const row3: TechItem[] = [
  { name: 'Premiere Pro', category: 'creative', context: 'Primary NLE editor for 3+ years at Think Big Brand agency' },
  { name: 'After Effects', category: 'creative', context: 'Motion graphics, visual effects, and typography animation' },
  { name: 'DaVinci Resolve', category: 'creative', context: 'Color grading and post-production delivery' },
  { name: 'Alexa Skills', category: 'ai', context: 'Voice command interface built for DurjoyAI PC control' },
  { name: 'OpenAI API', category: 'ai', context: 'LLM engine integration and prompt orchestration in DurjoyAI' },
  { name: 'CapCut', category: 'creative', context: 'High-velocity short-form social content creation' },
  { name: 'Socket.IO', category: 'systems', context: 'Real-time bidirectional event dispatch for EMERGON emergency alerts' },
];

function MarqueeRow({
  items,
  direction = 'left',
  speed = 35,
  onHoverItem,
}: {
  items: TechItem[];
  direction?: 'left' | 'right';
  speed?: number;
  onHoverItem: (item: TechItem | null) => void;
}) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list once to create a seamless infinite marquee
  const displayItems = [...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden py-1.5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        onHoverItem(null);
      }}
    >
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {displayItems.map((tech, idx) => {
          const isCreative = tech.category === 'creative';
          const isAI = tech.category === 'ai';

          return (
            <div
              key={`${tech.name}-${idx}`}
              onMouseEnter={() => onHoverItem(tech)}
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-[#0D1117]/90 text-[12px] font-mono cursor-pointer transition-all duration-200 select-none shrink-0 ${
                isCreative
                  ? 'border-[rgba(232,133,74,0.2)] hover:border-[#E8854A] hover:bg-[#E8854A]/10 hover:shadow-[0_0_15px_rgba(232,133,74,0.25)] text-[#EDEAE3]'
                  : isAI
                  ? 'border-[rgba(245,158,11,0.25)] hover:border-[#F59E0B] hover:bg-[#F59E0B]/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] text-[#EDEAE3]'
                  : 'border-[rgba(34,211,174,0.2)] hover:border-[#22D3AE] hover:bg-[#22D3AE]/10 hover:shadow-[0_0_15px_rgba(34,211,174,0.25)] text-[#EDEAE3]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCreative
                    ? 'bg-[#E8854A]'
                    : isAI
                    ? 'bg-[#F59E0B]'
                    : 'bg-[#22D3AE]'
                }`}
              />
              <span className="font-medium text-[#EDEAE3] group-hover:text-white">
                {tech.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

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
      {/* Edge Gradient Fades for Smooth Marquee */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#07090C] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#07090C] to-transparent z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Tech Stack // Applied Engineering
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3]">
              Tools I actually use.
            </h2>
          </div>

          <div className="font-mono text-[11px] text-[#EDEAE3]/40 flex items-center gap-4">
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

      {/* Marquee Rows */}
      <div className="space-y-3.5 relative z-10 max-w-[100vw]">
        <MarqueeRow items={row1} direction="left" speed={40} onHoverItem={setActiveTech} />
        <MarqueeRow items={row2} direction="right" speed={45} onHoverItem={setActiveTech} />
        <MarqueeRow items={row3} direction="left" speed={38} onHoverItem={setActiveTech} />
      </div>

      {/* Interactive Tooltip Context Box */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 min-h-[44px]">
        <div className="p-3.5 rounded-lg border border-[rgba(237,234,227,0.08)] bg-[#0D1117]/80 flex items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-[#EDEAE3]/50 flex items-center gap-2">
            <span className="text-[#F59E0B]">ⓘ</span>
            <span>
              {activeTech ? (
                <>
                  <strong className="text-[#EDEAE3] font-semibold">{activeTech.name}:</strong>{' '}
                  <span className="text-[#EDEAE3]/80">{activeTech.context}</span>
                </>
              ) : (
                'Hover any technology pill to see where and how it was used in real projects.'
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
