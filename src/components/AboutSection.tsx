'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const stats = [
  {
    value: '3+',
    unit: 'Years',
    title: 'Video Editing',
    subtitle: 'Think Big Brand (Agency)',
    side: 'cut',
    desc: 'Crafting pacing, visual rhythm, and storytelling for international campaigns.',
  },
  {
    value: '2027',
    unit: 'Class of',
    title: 'BRAC University',
    subtitle: 'B.S. in Computer Science',
    side: 'build',
    desc: 'Focused on backend systems, artificial intelligence, and software engineering.',
  },
  {
    value: '3.00',
    unit: 'CGPA',
    title: 'Academic Standing',
    subtitle: 'Computer Science & Engineering',
    side: 'build',
    desc: 'Solid foundation in algorithms, databases, distributed systems, and ML.',
  },
  {
    value: '2nd',
    unit: 'Place',
    title: 'BSEC Competition',
    subtitle: 'National Securities & Exchange',
    side: 'build',
    desc: 'Awarded 2nd runner-up in Bangladesh Securities & Exchange Commission competition.',
  },
  {
    value: '7+',
    unit: 'Projects',
    title: 'Engineered Systems',
    subtitle: 'AI, Full-Stack & Research',
    side: 'build',
    desc: 'From Alexa-integrated assistants (DurjoyAI) to thesis deep learning models.',
  },
  {
    value: '2',
    unit: 'Identities',
    title: 'One Mindset',
    subtitle: 'Codebase & Cutting Room',
    side: 'gold',
    desc: 'Engineering systems with precision; cutting narratives with emotional impact.',
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredSide, setHoveredSide] = useState<'build' | 'cut' | 'gold' | null>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-36 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C] overflow-hidden"
    >
      {/* Background Atmosphere on Card Hover */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          hoveredSide === 'build'
            ? 'bg-[#22D3AE]/[0.04]'
            : hoveredSide === 'cut'
            ? 'bg-[#E8854A]/[0.04]'
            : hoveredSide === 'gold'
            ? 'bg-[#F59E0B]/[0.05]'
            : 'bg-transparent'
        }`}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#22D3AE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE]" />
            About // Dual Identity
          </div>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3] max-w-3xl">
            One brain,<br />two timelines.
          </h2>
        </motion.div>

        {/* Grid: Narrative + Statistics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="font-sans text-[16px] md:text-[17px] leading-[1.8] text-[#EDEAE3]/80">
              I am a <strong className="text-[#EDEAE3] font-semibold">Computer Science student at BRAC University</strong> and a software builder. I design and build backend systems, AI agents, and scalable web platforms with a deep curiosity for how things work under the hood.
            </p>
            <p className="font-sans text-[15px] md:text-[16px] leading-[1.8] text-[#EDEAE3]/70">
              Alongside software engineering, I have spent <strong className="text-[#EDEAE3] font-semibold">3+ years as a professional video editor</strong> at Think Big Brand, an international content agency. Handling client turnarounds and narrative pacing taught me what systems design did: <em className="text-[#F59E0B] not-italic font-medium">deliberate constraints produce exceptional work.</em>
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/[0.04] font-mono text-[11px] text-[#F59E0B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                <span>BUILD = Systems · CUT = Stories</span>
              </div>
            </div>
          </motion.div>

          {/* Right Statistics Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => {
              const isTeal = stat.side === 'build';
              const isOrange = stat.side === 'cut';
              const isGold = stat.side === 'gold';

              return (
                <div
                  key={stat.title}
                  onMouseEnter={() => setHoveredSide(stat.side as 'build' | 'cut' | 'gold')}
                  onMouseLeave={() => setHoveredSide(null)}
                  className={`group relative p-6 rounded-lg bg-[#0D1117]/80 border transition-all duration-300 ${
                    isGold
                      ? 'border-[#F59E0B]/30 hover:border-[#F59E0B] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] sm:col-span-2'
                      : isTeal
                      ? 'border-[rgba(237,234,227,0.08)] hover:border-[#22D3AE]/50 hover:shadow-[0_0_20px_rgba(34,211,174,0.1)]'
                      : 'border-[rgba(237,234,227,0.08)] hover:border-[#E8854A]/50 hover:shadow-[0_0_20px_rgba(232,133,74,0.1)]'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`font-mono text-[28px] md:text-[32px] font-bold leading-none ${
                          isGold
                            ? 'text-[#F59E0B]'
                            : isTeal
                            ? 'text-[#22D3AE]'
                            : 'text-[#E8854A]'
                        }`}
                      >
                        {stat.value}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[1px] text-[#EDEAE3]/40">
                        {stat.unit}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[2px] px-2 py-0.5 rounded ${
                        isGold
                          ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                          : isTeal
                          ? 'bg-[#22D3AE]/10 text-[#22D3AE]'
                          : 'bg-[#E8854A]/10 text-[#E8854A]'
                      }`}
                    >
                      {stat.side.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-sans text-[15px] font-semibold text-[#EDEAE3] group-hover:text-white transition-colors">
                    {stat.title}
                  </h3>
                  <div className="font-mono text-[11px] text-[#EDEAE3]/45 mb-2">
                    {stat.subtitle}
                  </div>
                  <p className="font-sans text-[12px] leading-[1.6] text-[#EDEAE3]/55">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
