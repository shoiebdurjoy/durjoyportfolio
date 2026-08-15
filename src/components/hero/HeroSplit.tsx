'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrambleText from '@/src/components/ui/ScrambleText';

export default function HeroSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHoveringHandle, setIsHoveringHandle] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Split state (0 to 100).
  // 50 = Balanced Merged State
  // 100 = Full BUILD (Software & AI)
  // 0 = Full CUT (Cinema & Video)
  const rawSplit = useMotionValue(50);
  const split = useSpring(rawSplit, { stiffness: 240, damping: 28 });

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Derived visual intensities
  const devIntensity = useTransform(split, [20, 50, 80], [0.1, 0.5, 1]);
  const editIntensity = useTransform(split, [20, 50, 80], [1, 0.5, 0.1]);

  // Photo Grayscale & Lighting interpolation:
  // BUILD (split >= 80) -> 100% B&W (grayscale 100%) with cool tone
  // CUT (split <= 20) -> 0% B&W (100% natural color) with warm tone
  const photoGrayscale = useTransform(split, [20, 50, 80], [0, 45, 100]);
  const photoContrast = useTransform(split, [20, 50, 80], [104, 110, 122]);
  const photoBrightness = useTransform(split, [20, 50, 80], [102, 100, 96]);

  // Initial gentle demonstration sweep
  useEffect(() => {
    if (hasInteracted) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let frame = 0;
    let raf: number;
    const animate = () => {
      frame++;
      if (frame < 150) {
        rawSplit.set(50 + Math.sin(frame / 20) * 10);
        raf = requestAnimationFrame(animate);
      } else {
        rawSplit.set(50);
      }
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(animate); }, 800);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [hasInteracted, rawSplit]);

  // Mouse & Drag handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    if (isDragging.current) {
      let pct = x * 100;
      rawSplit.set(Math.max(10, Math.min(90, pct)));
    }
  }, [rawSplit]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setHasInteracted(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawSplit.set(Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)));
  }, [rawSplit]);

  useEffect(() => {
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    setHasInteracted(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawSplit.set(Math.max(10, Math.min(90, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
  }, [rawSplit]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawSplit.set(Math.max(10, Math.min(90, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
  }, [rawSplit]);

  // Subtle Parallax
  const photoParallaxX = (mousePos.x - 0.5) * -12;
  const photoParallaxY = (mousePos.y - 0.5) * -8;
  const nameParallaxX = (mousePos.x - 0.5) * 8;
  const nameParallaxY = (mousePos.y - 0.5) * 5;

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden cursor-col-resize select-none bg-[#06080B]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ opacity: heroOpacity }}
      aria-label="Interactive Hero — Drag the luminous spine to explore Software Engineering (BUILD - Monochrome) and Video Editing (CUT - Full Color)"
    >
      {/* ====================================================================
          1. ATMOSPHERIC LIGHTING & AMBIENT GLOW
          ==================================================================== */}
      {/* Left: BUILD Emerald Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(devIntensity, [0, 1], [0.1, 0.85]),
          background: 'radial-gradient(circle 900px at 15% 45%, rgba(0, 242, 195, 0.12) 0%, rgba(6, 20, 18, 0.03) 60%, transparent 80%)',
        }}
      />

      {/* Right: CUT Amber Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(editIntensity, [0, 1], [0.1, 0.85]),
          background: 'radial-gradient(circle 900px at 85% 45%, rgba(234, 88, 12, 0.12) 0%, rgba(24, 14, 8, 0.03) 60%, transparent 80%)',
        }}
      />

      {/* Center Gold Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#F59E0B]/[0.025] blur-[150px] pointer-events-none" />

      {/* Deep Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, #06080B 95%)',
        }}
      />

      {/* ====================================================================
          2. LEFT FLANK (BUILD) — REAL SOFTWARE & AI CREDENTIALS
          ==================================================================== */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full md:w-[38%] flex flex-col justify-center px-6 md:px-12 pointer-events-none z-[4]"
        style={{ opacity: useTransform(devIntensity, [0.1, 0.5, 1], [0.15, 0.6, 1]) }}
      >
        <div className="max-w-md space-y-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] text-[#00F2C3] font-bold uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00F2C3] shadow-[0_0_8px_#00F2C3]" />
              01 // BUILD_SYSTEMS
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-tight text-[#F8FAFC]">
              Software & AI Architect
            </h2>
            <p className="font-sans text-[13px] text-[#F8FAFC]/60 mt-1.5 leading-[1.6]">
              Computer Science @ BRAC University ('27). Engineered a voice-driven multi-LLM gateway with &lt;14ms dispatch latency and scalable microservices.
            </p>
          </div>

          {/* Applied Stack */}
          <div className="border-t border-[#00F2C3]/15 pt-3 space-y-2">
            <div className="font-mono text-[10px] tracking-[2px] text-[#00F2C3]/80 uppercase font-semibold">
              Primary Engineering Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['TypeScript', 'Python', 'PyTorch', 'Next.js', 'NestJS', 'Docker', 'PostgreSQL', 'FastAPI'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-[#00F2C3]/[0.05] border border-[#00F2C3]/25 text-[#F8FAFC]/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Notable Systems */}
          <div className="border-t border-[#00F2C3]/15 pt-3 space-y-1.5">
            <div className="font-mono text-[10px] tracking-[2px] text-[#00F2C3]/80 uppercase font-semibold">
              Engineered Work
            </div>
            <div className="font-mono text-[11px] text-[#F8FAFC]/75 space-y-1">
              <div><strong className="text-[#00F2C3]">DurjoyAI</strong> — Voice-enabled Multi-LLM System</div>
              <div><strong className="text-[#00F2C3]">LowKeyBD</strong> — Scalable Full-Stack Platform</div>
              <div><strong className="text-[#00F2C3]">Thesis</strong> — Bangla Multimodal Emotion Recognition</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          3. RIGHT FLANK (CUT) — REAL VIDEO & CREATIVE CREDENTIALS
          ==================================================================== */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full md:w-[38%] flex flex-col justify-center px-6 md:px-12 text-right pointer-events-none z-[4]"
        style={{ opacity: useTransform(editIntensity, [0.1, 0.5, 1], [0.15, 0.6, 1]) }}
      >
        <div className="max-w-md ml-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 justify-end font-mono text-[11px] tracking-[3px] text-[#F59E0B] font-bold uppercase mb-1.5">
              02 // CUT_CINEMA
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-tight text-[#F8FAFC]">
              Video Editor & Storyteller
            </h2>
            <p className="font-sans text-[13px] text-[#F8FAFC]/60 mt-1.5 leading-[1.6]">
              3+ years with Think Big Brand agency. Delivered high-retention commercials and documentary narratives driving massive organic engagement.
            </p>
          </div>

          {/* Post-Production Stack */}
          <div className="border-t border-[#F59E0B]/15 pt-3 space-y-2">
            <div className="font-mono text-[10px] tracking-[2px] text-[#F59E0B]/80 uppercase font-semibold">
              Post-Production Suite
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Color Grading', 'Motion Design'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-[#F59E0B]/[0.05] border border-[#F59E0B]/25 text-[#F8FAFC]/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Agency Deliverables */}
          <div className="border-t border-[#F59E0B]/15 pt-3 space-y-1.5">
            <div className="font-mono text-[10px] tracking-[2px] text-[#F59E0B]/80 uppercase font-semibold">
              Agency Impact
            </div>
            <div className="font-mono text-[11px] text-[#F8FAFC]/75 space-y-1">
              <div><strong className="text-[#F59E0B]">Think Big Brand</strong> — International Content Agency</div>
              <div><strong className="text-[#F59E0B]">Deliverables</strong> — Long-Form, Short-Form, Ads</div>
              <div><strong className="text-[#F59E0B]">Finishing</strong> — 4K ProRes · Sound Design · Color Master</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          4. LAYER: LUXURY BACKGROUND EDITORIAL TITLE (BEHIND SUBJECT)
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
        style={{
          y: textY,
          x: nameParallaxX,
        }}
      >
        <div className="text-center select-none">
          <h1 className="font-serif text-[clamp(6rem,18vw,16rem)] font-black leading-[0.82] tracking-[-0.04em] uppercase text-center whitespace-nowrap">
            <ScrambleText
              text="SHOIEB"
              className="block"
              style={{
                color: useTransform(
                  split,
                  [20, 50, 80],
                  ['rgba(245, 158, 11, 0.05)', 'rgba(248, 250, 252, 0.07)', 'rgba(0, 242, 195, 0.05)']
                ),
              }}
            />
            <ScrambleText
              text="DURJOY"
              className="block -mt-[0.06em]"
              style={{
                color: useTransform(
                  split,
                  [20, 50, 80],
                  ['rgba(245, 158, 11, 0.07)', 'rgba(248, 250, 252, 0.09)', 'rgba(0, 242, 195, 0.07)']
                ),
              }}
            />
          </h1>
        </div>
      </motion.div>

      {/* ====================================================================
          5. LAYER: THE CENTRAL PORTRAIT WITH B&W ↔ COLOR TRANSFORMATION
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
        style={{ y: photoY }}
      >
        <motion.div
          className="relative"
          style={{
            x: photoParallaxX,
            y: photoParallaxY,
          }}
        >
          {/* Ambient Glow Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none">
            <motion.div
              className="absolute inset-0 rounded-full blur-[100px]"
              style={{
                background: useTransform(
                  split,
                  [20, 50, 80],
                  [
                    'radial-gradient(circle, rgba(234, 88, 12, 0.18) 0%, transparent 65%)',
                    'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 65%)',
                    'radial-gradient(circle, rgba(0, 242, 195, 0.18) 0%, transparent 65%)',
                  ]
                ),
              }}
            />
          </div>

          {/* Feather-Masked Portrait Layer */}
          <motion.div
            className="relative w-[clamp(280px,34vw,460px)] h-[clamp(380px,56vh,660px)]"
            style={{
              filter: useTransform(
                [photoGrayscale, photoContrast, photoBrightness],
                ([g, c, b]) => `grayscale(${g}%) contrast(${c}%) brightness(${b}%)`
              ),
              maskImage: `
                radial-gradient(ellipse 85% 82% at 50% 40%, black 45%, transparent 94%),
                linear-gradient(to bottom, transparent 0%, black 10%, black 72%, transparent 98%)
              `,
              WebkitMaskImage: `
                radial-gradient(ellipse 85% 82% at 50% 40%, black 45%, transparent 94%),
                linear-gradient(to bottom, transparent 0%, black 10%, black 72%, transparent 98%)
              `,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <Image
              src="/portrait.png"
              alt="Md Shoieb Hossain — Software Engineer & Video Editor"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 80vw, 34vw"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          6. LAYER: FOREGROUND EDITORIAL NAME & DUAL IDENTITY BADGE
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-[9vh] md:pb-[10vh] pointer-events-none z-[3]"
        style={{
          y: textY,
          x: nameParallaxX * 0.5,
        }}
      >
        <div className="text-center">
          <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.4rem)] font-black leading-[0.88] tracking-[-0.02em] text-[#F8FAFC] uppercase">
            <span className="block">Md Shoieb</span>
            <span className="block">Hossain</span>
          </h1>

          {/* BUILD ◆ CUT Badge */}
          <div className="mt-3 flex items-center justify-center gap-4 font-mono text-[clamp(0.65rem,1.2vw,0.85rem)] font-bold tracking-[5px] uppercase">
            <motion.span
              style={{
                color: useTransform(split, [20, 50, 80], [
                  'rgba(0, 242, 195, 0.4)',
                  'rgba(0, 242, 195, 0.9)',
                  'rgba(0, 242, 195, 1)',
                ]),
              }}
            >
              BUILD
            </motion.span>
            <motion.span
              className="text-[#F59E0B] text-[8px]"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ◆
            </motion.span>
            <motion.span
              style={{
                color: useTransform(split, [20, 50, 80], [
                  'rgba(245, 158, 11, 1)',
                  'rgba(245, 158, 11, 0.9)',
                  'rgba(245, 158, 11, 0.4)',
                ]),
              }}
            >
              CUT
            </motion.span>
          </div>

          <div className="mt-1.5 font-mono text-[9px] tracking-[3px] uppercase text-[#F8FAFC]/30">
            Software Architect · Video Editor · Dhaka, Bangladesh
          </div>

          <div className="mt-6 pointer-events-auto">
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(248,250,252,0.1)] hover:border-[#00F2C3] hover:bg-[#00F2C3]/10 hover:text-[#00F2C3] transition-all bg-[#0C1017]/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] font-mono text-[10px] uppercase tracking-[2px] text-[#F8FAFC] font-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Resume
            </a>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          7. THE SIGNATURE LUMINOUS SPINE & MAGNETIC HANDLE
          ==================================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 pointer-events-none z-[10]"
        style={{
          left: useTransform(split, (v) => `${v}%`),
          transform: 'translateX(-50%)',
        }}
      >
        {/* Soft Ambient Radiance */}
        <motion.div
          className="absolute top-0 bottom-0 w-[60px] -left-[30px]"
          style={{
            background: useTransform(
              split,
              [20, 50, 80],
              [
                'linear-gradient(to right, transparent, rgba(234, 88, 12, 0.1), transparent)',
                'linear-gradient(to right, transparent, rgba(245, 158, 11, 0.12), transparent)',
                'linear-gradient(to right, transparent, rgba(0, 242, 195, 0.1), transparent)',
              ]
            ),
          }}
        />

        {/* Luminous Line */}
        <motion.div
          className="absolute top-[8%] bottom-[8%] left-1/2 -translate-x-1/2 w-[2px]"
          style={{
            background: useTransform(
              split,
              [20, 50, 80],
              [
                'linear-gradient(to bottom, transparent 0%, #EA580C 25%, #F59E0B 50%, #EA580C 75%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, rgba(248,250,252,0.3) 20%, #F59E0B 50%, rgba(248,250,252,0.3) 80%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, #00F2C3 25%, #F59E0B 50%, #00F2C3 75%, transparent 100%)',
              ]
            ),
            boxShadow: '0 0 16px rgba(245, 158, 11, 0.45)',
          }}
        />
      </motion.div>

      {/* Interactive Magnetic Handle */}
      <motion.div
        className="absolute top-1/2 z-[25] cursor-col-resize pointer-events-auto"
        style={{
          left: useTransform(split, (v) => `${v}%`),
          x: '-50%',
          y: '-50%',
        }}
        onMouseEnter={() => setIsHoveringHandle(true)}
        onMouseLeave={() => setIsHoveringHandle(false)}
      >
        {/* Pulsing Aura */}
        <motion.div
          className="absolute -inset-4 rounded-full blur-[14px]"
          animate={{ scale: isHoveringHandle ? 1.3 : [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: useTransform(
              split,
              [20, 50, 80],
              [
                'radial-gradient(circle, rgba(234, 88, 12, 0.5) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(0, 242, 195, 0.5) 0%, transparent 70%)',
              ]
            ),
          }}
        />

        {/* Handle Pill */}
        <motion.div
          className="relative px-3.5 py-1.5 rounded-full border border-[#F59E0B] bg-[#0C1017]/95 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2.5"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="font-mono text-[9px] font-extrabold tracking-[1px]"
            style={{
              color: useTransform(split, [20, 50, 80], ['rgba(0, 242, 195, 0.4)', 'rgba(0, 242, 195, 1)', 'rgba(0, 242, 195, 1)']),
            }}
          >
            ◄ BUILD
          </motion.span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
          <motion.span
            className="font-mono text-[9px] font-extrabold tracking-[1px]"
            style={{
              color: useTransform(split, [20, 50, 80], ['rgba(245, 158, 11, 1)', 'rgba(245, 158, 11, 1)', 'rgba(245, 158, 11, 0.4)']),
            }}
          >
            CUT ►
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          8. REFINED CORNER METADATA
          ==================================================================== */}
      <div className="absolute top-20 left-6 md:left-12 font-mono text-[9px] tracking-[3px] uppercase text-[#F8FAFC]/30 pointer-events-none z-[8]">
        <div className="text-[#00F2C3] font-semibold">MD SHOIEB HOSSAIN</div>
        <div>BRAC UNIVERSITY · CS</div>
      </div>

      <div className="absolute top-20 right-6 md:right-12 font-mono text-[9px] tracking-[3px] uppercase text-[#F8FAFC]/30 text-right pointer-events-none z-[8]">
        <div className="text-[#F59E0B] font-semibold">ONE BRAIN · TWO TIMELINES</div>
        <div>DHAKA, BANGLADESH</div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 font-mono text-[9px] tracking-[3px] uppercase text-[#F8FAFC]/25 pointer-events-none z-[8]">
        <div>B.S. COMPUTER SCIENCE · 2027</div>
      </div>

      <div className="absolute bottom-6 right-6 md:right-12 font-mono text-[9px] tracking-[3px] uppercase text-[#F8FAFC]/25 text-right pointer-events-none z-[8]">
        <div>VIDEO EDITOR · 3+ YRS EXP</div>
      </div>

      {/* Drag Hint (fades after interaction) */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[20] flex items-center gap-3 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#F59E0B]/40 bg-[#0C1017]/90 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <motion.span
                className="text-[#F59E0B] text-[9px] font-bold"
                animate={{ x: [-2, 0, -2] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                ◄
              </motion.span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[3px] text-[#F8FAFC]">
                DRAG SPINE TO EXPLORE
              </span>
              <motion.span
                className="text-[#F59E0B] text-[9px] font-bold"
                animate={{ x: [2, 0, 2] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                ►
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
