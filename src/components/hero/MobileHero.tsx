'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function MobileHero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeTab, setActiveTab] = useState<'BUILD' | 'CUT'>('BUILD');

  // Split state (0 to 100).
  const rawSplit = useMotionValue(50);
  const split = useSpring(rawSplit, { stiffness: 200, damping: 25 });

  // Update active tab based on split value
  useEffect(() => {
    return split.on('change', (latest) => {
      if (latest > 50) {
        setActiveTab('BUILD');
      } else {
        setActiveTab('CUT');
      }
    });
  }, [split]);

  // Derived layout values for the slider spine
  const spineLeft = useTransform(split, (v) => `${v}%`);

  // Active opacity shifts for columns
  const buildOpacity = useTransform(split, [20, 50, 80], [0.4, 0.7, 1]);
  const cutOpacity = useTransform(split, [20, 50, 80], [1, 0.7, 0.4]);

  // Single robust filter transform for the image
  const photoFilter = useTransform(split, [0, 100], [
    'grayscale(0%) contrast(105%) brightness(100%)',
    'grayscale(100%) contrast(120%) brightness(92%)'
  ]);

  // Initial gentle demonstration sweep
  useEffect(() => {
    if (hasInteracted) return;
    const timer = setTimeout(() => {
      rawSplit.set(30);
      const timer2 = setTimeout(() => {
        rawSplit.set(70);
        const timer3 = setTimeout(() => {
          rawSplit.set(50);
        }, 800);
        return () => clearTimeout(timer3);
      }, 800);
      return () => clearTimeout(timer2);
    }, 1200);
    return () => clearTimeout(timer);
  }, [hasInteracted, rawSplit]);

  // Touch drag handlers on the photo card
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    setHasInteracted(true);
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    rawSplit.set(Math.max(0, Math.min(100, pct)));
  }, [rawSplit]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    rawSplit.set(Math.max(0, Math.min(100, pct)));
  }, [rawSplit]);

  useEffect(() => {
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('touchend', onUp);
    return () => window.removeEventListener('touchend', onUp);
  }, []);

  return (
    <section
      id="hero-mobile"
      className="relative w-full bg-[#06080B] flex flex-col items-center justify-start pt-28 pb-20 px-4 overflow-y-auto"
      style={{ minHeight: '100svh' }}
    >
      {/* 1. ATMOSPHERIC LIGHTING & GLOWS */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: useTransform(split, [0, 50, 100], [0.1, 0.4, 0.8]),
          background: 'radial-gradient(circle 350px at 15% 35%, rgba(0, 242, 195, 0.15) 0%, transparent 80%)',
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: useTransform(split, [0, 50, 100], [0.8, 0.4, 0.1]),
          background: 'radial-gradient(circle 350px at 85% 35%, rgba(234, 88, 12, 0.15) 0%, transparent 80%)',
        }}
      />

      {/* 2. TOP METADATA */}
      <div className="relative z-10 flex flex-col items-center space-y-1 text-center mb-2">
        <div className="font-mono tracking-[3px] uppercase text-[#00F2C3] font-bold" style={{ fontSize: '11px' }}>
          MD SHOIEB HOSSAIN
        </div>
        <div className="font-mono tracking-[2px] uppercase text-[#F59E0B] font-bold" style={{ fontSize: '10px' }}>
          ONE BRAIN • TWO TIMELINES
        </div>
        <div className="font-mono tracking-[2.5px] uppercase text-white/40" style={{ fontSize: '8px' }}>
          BRAC UNIVERSITY • CS
        </div>
        <div className="font-mono tracking-[2.5px] uppercase text-white/40" style={{ fontSize: '8px' }}>
          DHAKA, BANGLADESH
        </div>
      </div>

      {/* 3. CENTER PORTRAIT CARD (Feather masked to merge with background like desktop) */}
      <div 
        ref={photoRef}
        className="relative my-2 z-10 flex items-center justify-center" 
        style={{ width: '280px', height: '360px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Glow behind portrait */}
        <div className="absolute inset-0 pointer-events-none blur-[40px]">
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              background: useTransform(
                split,
                [0, 50, 100],
                [
                  'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(0, 242, 195, 0.25) 0%, transparent 70%)',
                ]
              ),
            }}
          />
        </div>

        {/* Feather masked image container - exactly like desktop, WebKit compatible */}
        <motion.div
          className="relative w-full h-full"
          style={{
            filter: photoFilter,
            maskImage: 'radial-gradient(circle at 50% 45%, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 30%, transparent 70%)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src="/portrait.png"
            alt="Md Shoieb Hossain"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Deep dark overlay at the bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none z-10" />

        {/* Overlayed Name (Large, centered editorial style) */}
        <div 
          className="absolute left-0 right-0 bottom-6 pointer-events-none px-4 z-20"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <h1 className="font-serif font-black leading-[0.92] tracking-tight text-white uppercase" style={{ fontSize: '2.1rem' }}>
            <span className="block text-white/95">MD SHOIEB</span>
            <span className="block text-white">HOSSAIN</span>
          </h1>
        </div>

        {/* Luminous Vertical Spine */}
        <motion.div
          className="absolute top-0 bottom-0 pointer-events-none z-20"
          style={{ 
            left: spineLeft,
            width: '1.2px',
            opacity: 0.35,
            backgroundColor: '#F59E0B',
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            boxShadow: '0 0 6px rgba(245, 158, 11, 0.4)'
          }}
        />

        {/* Floating Slider Control Pill - Redesigned to be smaller & cooler */}
        <motion.div
          className="absolute z-30 pointer-events-none flex items-center justify-between px-3 rounded-full border border-white/10 backdrop-blur-md shadow-lg shadow-black/50"
          style={{ 
            left: spineLeft,
            top: '55%',
            transform: 'translate(-50%, -50%)',
            width: '130px',
            height: '26px',
            backgroundColor: 'rgba(12, 16, 23, 0.45)',
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.25)'
          }}
        >
          <span 
            className="font-mono font-extrabold tracking-[0.5px]"
            style={{ 
              color: activeTab === 'BUILD' ? '#00F2C3' : 'rgba(255,255,255,0.45)',
              fontSize: '7px'
            }}
          >
            ◄ BUILD
          </span>

          <span className="text-white/15 text-[8px] font-light">|</span>

          <span 
            className="font-mono font-extrabold tracking-[0.5px]"
            style={{ 
              color: activeTab === 'CUT' ? '#F59E0B' : 'rgba(255,255,255,0.45)',
              fontSize: '7px'
            }}
          >
            CUT ►
          </span>
        </motion.div>

      </div>

      {/* Sub-text under image */}
      <div 
        className="relative z-10 font-mono tracking-[2.5px] uppercase text-white/40 text-center mb-6"
        style={{ fontSize: '8px' }}
      >
        SOFTWARE ARCHITECT • VIDEO EDITOR • DHAKA, BANGLADESH
      </div>

      {/* 3. SIDE-BY-SIDE METADATA COLUMNS (Uses inline fonts for absolute layout precision) */}
      <div className="w-full flex justify-between gap-4 px-2 text-left my-4">
        
        {/* Left Column (BUILD_SYSTEMS) */}
        <motion.div 
          className="w-[48%] space-y-4"
          style={{ opacity: buildOpacity }}
        >
          <div>
            <div 
              className="flex items-center gap-1 font-mono text-[#00F2C3] font-bold uppercase mb-1"
              style={{ fontSize: '8px', letterSpacing: '1.5px' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2C3] shadow-[0_0_6px_#00F2C3]" />
              01 // BUILD_SYSTEMS
            </div>
            <h3 
              className="font-serif font-bold text-white leading-tight"
              style={{ fontSize: '14px' }}
            >
              Software & AI Architect
            </h3>
            <p 
              className="font-sans text-white/60 mt-1"
              style={{ fontSize: '9px', lineHeight: '1.4' }}
            >
              Computer Science @ BRAC University ('27). Engineered a voice-driven multi-LLM gateway with &lt;14ms dispatch latency and scalable microservices.
            </p>
          </div>

          <div className="space-y-1.5">
            <div 
              className="font-mono text-[#00F2C3]/80 uppercase font-semibold"
              style={{ fontSize: '8px', letterSpacing: '1.5px' }}
            >
              PRIMARY ENGINEERING STACK
            </div>
            <div className="flex flex-wrap gap-1">
              {['TypeScript', 'Python', 'PyTorch', 'Next.js', 'NestJS', 'Docker', 'PostgreSQL', 'FastAPI'].map((t) => (
                <span 
                  key={t} 
                  className="font-mono px-1.5 py-0.5 rounded bg-[#00F2C3]/[0.05] border border-[#00F2C3]/20 text-white/80"
                  style={{ fontSize: '7.5px' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div 
              className="font-mono text-[#00F2C3]/80 uppercase font-semibold"
              style={{ fontSize: '8px', letterSpacing: '1.5px' }}
            >
              ENGINEERED WORK
            </div>
            <div 
              className="font-mono text-white/75 space-y-1"
              style={{ fontSize: '8px', lineHeight: '1.3' }}
            >
              <div><strong className="text-[#00F2C3]">DurjoyAI</strong> — Voice-enabled LLM</div>
              <div><strong className="text-[#00F2C3]">LowKeyBD</strong> — Full-Stack App</div>
              <div><strong className="text-[#00F2C3]">Thesis</strong> — Bangla Emotion ML</div>
            </div>
          </div>
        </motion.div>

        {/* Divider Line in the middle */}
        <div className="w-[1px] bg-white/10 self-stretch" />

        {/* Right Column (CUT_CINEMA) */}
        <motion.div 
          className="w-[48%] space-y-4"
          style={{ opacity: cutOpacity }}
        >
          <div>
            <div 
              className="flex items-center gap-1 font-mono text-[#F59E0B] font-bold uppercase mb-1"
              style={{ fontSize: '8px', letterSpacing: '1.5px' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" />
              02 // CUT_CINEMA
            </div>
            <h3 
              className="font-serif font-bold text-white leading-tight"
              style={{ fontSize: '14px' }}
            >
              Video Editor & Storyteller
            </h3>
            <p 
              className="font-sans text-white/60 mt-1"
              style={{ fontSize: '9px', lineHeight: '1.4' }}
            >
              3+ years with Think Big Brand agency. Delivered high-retention commercials and documentary narratives driving massive organic engagement.
            </p>
          </div>

          <div className="space-y-1.5">
            <div 
              className="font-mono text-[#F59E0B]/80 uppercase font-semibold"
              style={{ fontSize: '8px', letterSpacing: '1.5px' }}
            >
              POST-PRODUCTION SUITE
            </div>
            <div className="flex flex-wrap gap-1">
              {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Color Grading', 'Motion Design'].map((t) => (
                <span 
                  key={t} 
                  className="font-mono px-1.5 py-0.5 rounded bg-[#F59E0B]/[0.05] border border-[#F59E0B]/20 text-white/80"
                  style={{ fontSize: '7.5px' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div 
              className="font-mono text-[#F59E0B]/80 uppercase font-semibold"
              style={{ fontSize: '8px', letterSpacing: '1.5px' }}
            >
              AGENCY IMPACT
            </div>
            <div 
              className="font-mono text-white/75 space-y-1"
              style={{ fontSize: '8px', lineHeight: '1.3' }}
            >
              <div><strong className="text-[#F59E0B]">Think Big Brand</strong> — Agency</div>
              <div><strong className="text-[#F59E0B]">Deliverables</strong> — Commercials</div>
              <div><strong className="text-[#F59E0B]">Finishing</strong> — 4K Color Master</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 4. DOWNLOAD RESUME BUTTON */}
      <div className="relative z-10 mt-8 pointer-events-auto">
        <a 
          href="/resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full border border-white/10 bg-[#0C1017]/85 font-mono text-white font-bold transition-all hover:bg-white/5 shadow-lg shadow-black/50"
          style={{ fontSize: '9px', letterSpacing: '2px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          DOWNLOAD RESUME
        </a>
      </div>

      {/* 5. SLIDING INTERACTION HINT */}
      <div className="relative z-10 mt-6">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F59E0B]/30 bg-[#0C1017]/50 shadow-md">
          <span className="text-[#F59E0B] font-bold" style={{ fontSize: '8px' }}>◄</span>
          <span className="font-mono font-bold uppercase tracking-[2.5px] text-white/60" style={{ fontSize: '7.5px' }}>
            DRAG SPINE TO EXPLORE
          </span>
          <span className="text-[#F59E0B] font-bold" style={{ fontSize: '8px' }}>►</span>
        </div>
      </div>

    </section>
  );
}
