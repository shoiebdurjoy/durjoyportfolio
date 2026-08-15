'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeLens, setActiveLens] = useState<'both' | 'systems' | 'cinema'>('both');

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 md:py-40 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      {/* Dynamic Background Radiance */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          activeLens === 'systems'
            ? 'bg-[#00F2C3]/[0.04]'
            : activeLens === 'cinema'
            ? 'bg-[#EA580C]/[0.04]'
            : 'bg-[#F59E0B]/[0.035]'
        }`}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Subheader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(248,250,252,0.08)] mb-16"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              01 // The Philosophy
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-[0.95] text-[#F8FAFC]">
              Engineering the Engine.<br />
              <span className="text-[#F59E0B] italic font-normal">Editing the Emotion.</span>
            </h2>
          </div>

          {/* Interactive Mindset Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0C1017] border border-[rgba(248,250,252,0.08)] self-start md:self-auto">
            {(['both', 'systems', 'cinema'] as const).map((lens) => (
              <button
                key={lens}
                onClick={() => setActiveLens(lens)}
                className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[1px] transition-all cursor-pointer ${
                  activeLens === lens
                    ? 'bg-[#F59E0B] text-[#06080B] font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'text-[#F8FAFC]/50 hover:text-[#F8FAFC]'
                }`}
              >
                {lens === 'both' ? 'Unified' : lens === 'systems' ? 'Build Lens' : 'Cut Lens'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Narrative & Credentials Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Story Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold leading-[1.3] text-[#F8FAFC]">
              Most developers think purely in logic. Most filmmakers think purely in feeling. I operate at the intersection of both.
            </h3>

            <p className="font-sans text-[15px] md:text-[16px] leading-[1.8] text-[#F8FAFC]/70">
              As a Computer Science student at <strong className="text-[#F8FAFC] font-semibold">BRAC University (Class of 2027)</strong>, I engineer backend microservices, intelligent AI assistants, and deep learning models. I care about latency, architectural elegance, and systems that scale reliably under real-world load.
            </p>

            <p className="font-sans text-[15px] md:text-[16px] leading-[1.8] text-[#F8FAFC]/70">
              At the exact same time, I have spent <strong className="text-[#F8FAFC] font-semibold">3+ years as a professional video editor</strong> at Think Big Brand, an international content agency. Editing commercial campaigns and documentaries taught me what systems design did: <em className="text-[#F59E0B] not-italic font-medium">every single frame and every single function must have purpose.</em>
            </p>

            <div className="pt-4 flex items-center gap-6 font-mono text-[12px] text-[#F8FAFC]/40">
              <span className="flex items-center gap-2 text-[#00F2C3]">
                <span className="w-2 h-2 rounded-full bg-[#00F2C3]" />
                Software Architect
              </span>
              <span className="flex items-center gap-2 text-[#EA580C]">
                <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                Video Editor
              </span>
            </div>
          </motion.div>

          {/* Luxury Credential Rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-4"
          >
            {[
              {
                label: 'Video Editing Experience',
                value: '3+ Years',
                detail: 'Think Big Brand (International Content Agency) · Commercials, narrative reels & color grading.',
                tag: 'Cinema',
                color: 'text-[#EA580C]',
                border: 'border-[#EA580C]/20',
              },
              {
                label: 'Academic Standing',
                value: 'BRAC CS \'27',
                detail: 'B.S. in Computer Science · CGPA 3.00 · Focus on backend architecture & machine learning.',
                tag: 'Engineering',
                color: 'text-[#00F2C3]',
                border: 'border-[#00F2C3]/20',
              },
              {
                label: 'National Recognition',
                value: '2nd Place',
                detail: 'Bangladesh Securities & Exchange Commission (BSEC) national competition runner-up.',
                tag: 'Honor',
                color: 'text-[#F59E0B]',
                border: 'border-[#F59E0B]/20',
              },
              {
                label: 'Active Engineering',
                value: '7+ Repos',
                detail: 'Production AI systems (DurjoyAI), full-stack platforms (LowKeyBD), and deep learning thesis research.',
                tag: 'Systems',
                color: 'text-[#00F2C3]',
                border: 'border-[#00F2C3]/20',
              },
            ].map((card, i) => (
              <div
                key={card.label}
                className={`p-5 rounded-lg bg-[#0C1017]/80 border ${card.border} hover:border-[#F59E0B]/50 transition-all duration-300 flex items-start justify-between gap-4`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#F8FAFC]/40">
                      {card.label}
                    </span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 bg-[#F8FAFC]/[0.06] rounded text-[#F8FAFC]/60">
                      {card.tag}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] text-[#F8FAFC]/70 leading-[1.5]">
                    {card.detail}
                  </p>
                </div>
                <div className={`font-mono text-2xl font-black ${card.color} shrink-0`}>
                  {card.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
