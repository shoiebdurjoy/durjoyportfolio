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
  // ENGINEERING / DEVELOPMENT
  { name: 'Python', category: 'languages', context: 'Used in AI pipelines, thesis research, and FastAPI/Flask backends' },
  { name: 'JavaScript', category: 'languages', context: 'Core language for frontend interactivity and web platforms' },
  { name: 'TypeScript', category: 'languages', context: 'Primary language for DurjoyAI, LowKeyBD, and web platforms' },
  { name: 'C++', category: 'languages', context: 'Academic foundation for algorithms and data structures at BRAC University' },
  { name: 'Java', category: 'languages', context: 'Object-oriented programming and enterprise system foundation' },
  { name: 'SQL', category: 'languages', context: 'Relational database queries and data manipulation' },
  { name: 'HTML/CSS', category: 'languages', context: 'Semantic structure and styling for modern web applications' },
  { name: 'Bash', category: 'systems', context: 'Shell scripting for deployment and server automation' },
  { name: 'Git', category: 'systems', context: 'Version control for collaborative engineering' },
  { name: 'Linux', category: 'systems', context: 'Server infrastructure and deployment environments' },
  { name: 'Windows', category: 'systems', context: 'Primary development OS and DurjoyAI target environment' },
  { name: 'Docker', category: 'systems', context: 'Containerization across DurjoyAI and full-stack environments' },
  { name: 'Node.js', category: 'frameworks', context: 'JavaScript runtime for scalable backend services' },
  { name: 'Express', category: 'frameworks', context: 'Minimalist web framework for Node.js APIs' },
  { name: 'FastAPI', category: 'frameworks', context: 'High-throughput async Python APIs for AI model serving' },
  { name: 'Flask', category: 'frameworks', context: 'Backend REST API and Socket.IO engine for EMERGON system' },
  { name: 'NestJS', category: 'frameworks', context: 'Enterprise backend architecture for LowKeyBD REST & WebSocket APIs' },
  { name: 'Next.js', category: 'frameworks', context: 'Full-stack framework for LowKeyBD platform and this portfolio' },
  { name: 'React', category: 'frameworks', context: 'Component-driven UI development across multiple platforms' },
  { name: 'Tailwind CSS', category: 'frameworks', context: 'Utility-first styling for rapid, responsive UI development' },
  { name: 'Prisma', category: 'frameworks', context: 'Next-generation ORM for Node.js and TypeScript' },
  { name: 'PostgreSQL', category: 'systems', context: 'Primary relational database for EMERGON and LowKeyBD' },
  { name: 'MySQL', category: 'systems', context: 'Relational database management for legacy projects' },
  { name: 'MongoDB', category: 'systems', context: 'NoSQL document database for flexible data schemas' },
  { name: 'Redis', category: 'systems', context: 'In-memory caching and session store for LowKeyBD' },
  { name: 'MinIO', category: 'systems', context: 'S3-compatible high-performance object storage' },
  { name: 'Meilisearch', category: 'systems', context: 'Lightning-fast, ultra-relevant search engine integration' },
  { name: 'WebSockets', category: 'systems', context: 'Real-time bidirectional communication for live events' },
  { name: 'Socket.IO', category: 'systems', context: 'Real-time bidirectional event dispatch for EMERGON emergency alerts' },
  { name: 'Turborepo', category: 'systems', context: 'High-performance build system for JavaScript and TypeScript codebases' },
  { name: 'Vercel', category: 'systems', context: 'Frontend cloud platform for zero-config deployments' },
  { name: 'Render', category: 'systems', context: 'Cloud application hosting for backend services' },
  { name: 'AWS', category: 'systems', context: 'Cloud infrastructure and scalable deployment services' },
  { name: 'Google Maps API', category: 'systems', context: 'Location services and mapping integration for platforms' },

  // AI / ML
  { name: 'PyTorch', category: 'ai', context: 'Deep learning framework for Bangla Multimodal Emotion Recognition thesis' },
  { name: 'CUDA', category: 'ai', context: 'GPU acceleration for training multimodal thesis models' },
  { name: 'OpenAI API', category: 'ai', context: 'LLM engine integration and prompt orchestration in DurjoyAI' },
  { name: 'OpenRouter', category: 'ai', context: 'Unified API routing for access to multiple large language models' },
  { name: 'Gemini', category: 'ai', context: 'Google\'s multimodal AI models for advanced reasoning tasks' },
  { name: 'Ollama', category: 'ai', context: 'Local deployment and execution of large language models' },
  { name: 'Librosa', category: 'ai', context: 'Python package for music and audio analysis in thesis research' },
  { name: 'Alexa Skills', category: 'ai', context: 'Voice command interface built for DurjoyAI PC control' },

  // VIDEO / MOTION
  { name: 'Premiere Pro', category: 'creative', context: 'Primary NLE editor for 3+ years at Think Big Brand agency' },
  { name: 'After Effects', category: 'creative', context: 'Motion graphics, visual effects, and typography animation' },
  { name: 'DaVinci Resolve', category: 'creative', context: 'Color grading and post-production delivery' },
  { name: 'CapCut', category: 'creative', context: 'High-velocity short-form social content creation' },
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
          isVisible={isInView}
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
