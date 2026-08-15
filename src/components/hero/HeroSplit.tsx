'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function HeroSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHoveringHandle, setIsHoveringHandle] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Split state (0 to 100)
  const rawSplit = useMotionValue(50);
  const split = useSpring(rawSplit, { stiffness: 220, damping: 26 });

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const nameBgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const nameFgY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Derived intensities:
  // Dragging right (split > 50) reveals more BUILD (left side)
  // Dragging left (split < 50) reveals more CUT (right side)
  const devIntensity = useTransform(split, [15, 50, 85], [0, 0.45, 1]);
  const editIntensity = useTransform(split, [15, 50, 85], [1, 0.45, 0]);

  // Demonstration sweep on initial mount to teach interaction without clumsy popups
  useEffect(() => {
    if (hasInteracted) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let frame = 0;
    let raf: number;
    const animate = () => {
      frame++;
      if (frame < 160) {
        // Smooth sine wave: 50 -> 40 -> 60 -> 50
        rawSplit.set(50 + Math.sin(frame / 20) * 10);
        raf = requestAnimationFrame(animate);
      } else {
        rawSplit.set(50);
      }
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(animate); }, 800);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [hasInteracted, rawSplit]);

  // Mouse move handler for smooth dragging & subtle parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    if (isDragging.current) {
      let pct = x * 100;
      rawSplit.set(Math.max(8, Math.min(92, pct)));
    }
  }, [rawSplit]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setHasInteracted(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawSplit.set(Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100)));
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
    rawSplit.set(Math.max(8, Math.min(92, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
  }, [rawSplit]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawSplit.set(Math.max(8, Math.min(92, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
  }, [rawSplit]);

  // Parallax offsets
  const photoParallaxX = (mousePos.x - 0.5) * -16;
  const photoParallaxY = (mousePos.y - 0.5) * -12;
  const nameParallaxX = (mousePos.x - 0.5) * 14;
  const nameParallaxY = (mousePos.y - 0.5) * 8;

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden cursor-col-resize select-none bg-[#07090C]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ opacity: heroOpacity }}
      aria-label="Interactive Hero: Drag the luminous spine to explore BUILD and CUT environments"
    >
      {/* ====================================================================
          1. ATMOSPHERIC BACKGROUNDS & RADIANCE
          ==================================================================== */}
      {/* Deep neutral base */}
      <div className="absolute inset-0 bg-[#07090C]" />

      {/* BUILD Side Ambient Teal Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(devIntensity, [0, 1], [0.15, 0.9]),
          background: 'radial-gradient(circle 900px at 15% 45%, rgba(34, 211, 174, 0.16) 0%, rgba(10, 30, 26, 0.05) 55%, transparent 80%)',
        }}
      />

      {/* CUT Side Ambient Amber/Orange Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(editIntensity, [0, 1], [0.15, 0.9]),
          background: 'radial-gradient(circle 900px at 85% 45%, rgba(232, 133, 74, 0.16) 0%, rgba(30, 20, 14, 0.05) 55%, transparent 80%)',
        }}
      />

      {/* Center Gold Heart Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#F59E0B]/[0.035] blur-[140px] pointer-events-none" />

      {/* Outer Vignette for Cinematic Focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, #07090C 95%)',
        }}
      />

      {/* ====================================================================
          2. DYNAMICALLY REVEALED TECHNICAL SYSTEM (BUILD SIDE)
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: useTransform(devIntensity, [0, 0.25, 1], [0.04, 0.35, 1]) }}
      >
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 174, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 174, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at 20% 45%, black 35%, transparent 75%)',
          }}
        />

        {/* Top Left Header & Mode */}
        <div className="absolute top-[22%] left-[4%] md:left-[7%] font-mono text-[11px] space-y-1 text-[#22D3AE]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22D3AE] shadow-[0_0_8px_#22D3AE] animate-pulse" />
            <span className="tracking-[3px] font-bold text-[#22D3AE]">01 // BUILD_SYSTEM</span>
          </div>
          <div className="text-[10px] text-[#EDEAE3]/40 tracking-[1.5px] pl-4">
            ARCHITECTURE: MODULAR_AI · BRAIN_0
          </div>
          <div className="text-[10px] text-[#EDEAE3]/30 tracking-[1.5px] pl-4">
            CORE_STACK: [TS, PYTHON, PYTORCH, DOCKER, NEXTJS]
          </div>
        </div>

        {/* Architecture Node Diagram Sketch */}
        <div className="absolute bottom-[20%] left-[4%] md:left-[7%] hidden md:block font-mono text-[10px] text-[#22D3AE]/60 space-y-2.5 border-l-2 border-[#22D3AE]/25 pl-4 bg-[#07090C]/40 backdrop-blur-xs py-2 pr-4 rounded-r-md">
          <div className="text-[#EDEAE3]/40 tracking-[2px] font-semibold text-[9px] uppercase">
            // ACTIVE DISTRIBUTED PIPELINE
          </div>
          <div className="flex items-center gap-2 text-[#EDEAE3]/75">
            <span className="px-2 py-0.5 border border-[#22D3AE]/40 bg-[#22D3AE]/10 text-[#22D3AE] font-bold rounded-[2px]">USER_VOICE</span>
            <span className="text-[#22D3AE]">──►</span>
            <span className="px-2 py-0.5 border border-[#22D3AE]/40 bg-[#22D3AE]/10 text-[#22D3AE] font-bold rounded-[2px]">ALEXA_SKILL</span>
            <span className="text-[#22D3AE]">──►</span>
            <span className="px-2 py-0.5 border border-[#22D3AE]/40 bg-[#22D3AE]/10 text-[#22D3AE] font-bold rounded-[2px]">LLM_BRAIN_0</span>
          </div>
          <div className="text-[#22D3AE]/50 text-[9px] tracking-[1px]">
            LATENCY: &lt;14ms · MEMORY_CONTEXT: DOCKER_PERSISTENT
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          3. DYNAMICALLY REVEALED CINEMATIC SYSTEM (CUT SIDE)
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: useTransform(editIntensity, [0, 0.25, 1], [0.04, 0.35, 1]) }}
      >
        {/* Subtle Organic Film Grain Overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Top Right Header & Timecode */}
        <div className="absolute top-[22%] right-[4%] md:right-[7%] text-right font-mono text-[11px] space-y-1 text-[#E8854A]">
          <div className="flex items-center gap-2 justify-end">
            <span className="tracking-[3px] font-bold text-[#E8854A]">02 // CUT_TIMELINE</span>
            <span className="w-2 h-2 rounded-full bg-[#E8854A] shadow-[0_0_8px_#E8854A] animate-pulse" />
          </div>
          <div className="text-[10px] text-[#EDEAE3]/40 tracking-[1.5px]">
            AGENCY: THINK_BIG_BRAND · 3+ YRS
          </div>
          <div className="text-[10px] text-[#E8854A]/80 font-bold tracking-[2px]">
            TC 01:24:18:09 · 23.976 FPS · 4K UHD
          </div>
        </div>

        {/* Filmstrip Sprocket Edge Markers */}
        <div className="absolute top-[20%] bottom-[20%] right-3 hidden md:flex flex-col justify-between opacity-35">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3.5 h-2.5 border border-[#E8854A] rounded-[1px] bg-[#E8854A]/10" />
          ))}
        </div>

        {/* Editing Workflow Sequence (Bottom Right) */}
        <div className="absolute bottom-[20%] right-[4%] md:right-[7%] hidden md:block text-right font-mono text-[10px] text-[#E8854A]/60 space-y-2.5 border-r-2 border-[#E8854A]/25 pr-4 bg-[#07090C]/40 backdrop-blur-xs py-2 pl-4 rounded-l-md">
          <div className="text-[#EDEAE3]/40 tracking-[2px] font-semibold text-[9px] uppercase">
            // POST-PRODUCTION WORKFLOW
          </div>
          <div className="flex items-center gap-1.5 justify-end text-[#EDEAE3]/75 text-[9px]">
            <span className="px-1.5 py-0.5 border border-[#E8854A]/30 bg-[#E8854A]/10">SELECTS</span>
            <span className="text-[#E8854A]">►</span>
            <span className="px-1.5 py-0.5 border border-[#E8854A]/30 bg-[#E8854A]/10">ASSEMBLY</span>
            <span className="text-[#E8854A]">►</span>
            <span className="px-1.5 py-0.5 border border-[#E8854A]/30 bg-[#E8854A]/10">MOTION</span>
            <span className="text-[#E8854A]">►</span>
            <span className="px-1.5 py-0.5 border border-[#F59E0B]/50 bg-[#F59E0B]/20 text-[#F59E0B] font-bold">COLOR</span>
            <span className="text-[#E8854A]">►</span>
            <span className="px-1.5 py-0.5 border border-[#E8854A]/30 bg-[#E8854A]/10">MASTER</span>
          </div>
          <div className="text-[#E8854A]/50 text-[9px] tracking-[1px]">
            DELIVERABLE: PRORES 4444 XQ · REC.709
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          4. LAYER 1: MASSIVE BACKGROUND EDITORIAL TYPOGRAPHY ("MD SHOIEB")
          Sits behind the head and shoulders with magazine grandeur
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-start justify-center pt-[14vh] md:pt-[12vh] pointer-events-none z-[2]"
        style={{
          y: nameBgY,
          x: nameParallaxX,
        }}
      >
        <h1 className="font-serif text-[clamp(4.5rem,14vw,14rem)] font-black leading-[0.8] tracking-[-0.04em] uppercase text-center whitespace-nowrap select-none">
          <motion.span
            className="block"
            style={{
              color: useTransform(
                split,
                [15, 50, 85],
                ['rgba(34, 211, 174, 0.12)', 'rgba(237, 234, 227, 0.18)', 'rgba(232, 133, 74, 0.12)']
              ),
              textShadow: '0 0 40px rgba(245, 158, 11, 0.08)',
            }}
          >
            MD SHOIEB
          </motion.span>
        </h1>
      </motion.div>

      {/* ====================================================================
          5. LAYER 2: THE LARGE PORTRAIT (ATMOSPHERIC HUMAN CENTER)
          Feather-masked on all sides so it emerges from the dark environment
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
        style={{ y: photoY }}
      >
        <motion.div
          className="relative"
          style={{
            x: photoParallaxX,
            y: photoParallaxY,
          }}
        >
          {/* Subtle Ambient Color Glow Behind Subject */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
            <motion.div
              className="absolute inset-0 rounded-full blur-[100px]"
              style={{
                background: useTransform(
                  split,
                  [15, 50, 85],
                  [
                    'radial-gradient(circle, rgba(232, 133, 74, 0.22) 0%, transparent 65%)',
                    'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, transparent 65%)',
                    'radial-gradient(circle, rgba(34, 211, 174, 0.22) 0%, transparent 65%)',
                  ]
                ),
              }}
            />
          </div>

          {/* Portrait Container with Comprehensive Feather Mask */}
          <div
            className="relative w-[clamp(300px,42vw,560px)] h-[clamp(400px,65vh,740px)]"
            style={{
              maskImage: `
                radial-gradient(ellipse 85% 80% at 50% 40%, black 45%, transparent 92%),
                linear-gradient(to bottom, transparent 0%, black 12%, black 65%, transparent 98%)
              `,
              WebkitMaskImage: `
                radial-gradient(ellipse 85% 80% at 50% 40%, black 45%, transparent 92%),
                linear-gradient(to bottom, transparent 0%, black 12%, black 65%, transparent 98%)
              `,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          >
            {/* Environmental Color Grading Overlay */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none mix-blend-color"
              style={{
                background: useTransform(
                  split,
                  [15, 50, 85],
                  [
                    'linear-gradient(135deg, rgba(232, 133, 74, 0.22) 0%, rgba(180, 90, 40, 0.15) 100%)',
                    'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(34, 211, 174, 0.05) 100%)',
                    'linear-gradient(135deg, rgba(34, 211, 174, 0.18) 0%, rgba(20, 150, 130, 0.22) 100%)',
                  ]
                ),
              }}
            />

            {/* Contrast / Scanline Environmental Overlay */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: useTransform(
                  split,
                  [20, 50, 80],
                  [
                    'linear-gradient(135deg, rgba(35, 20, 10, 0.15) 0%, transparent 100%)',
                    'transparent',
                    'linear-gradient(135deg, transparent 0%, rgba(10, 30, 40, 0.15) 100%)',
                  ]
                ),
              }}
            />

            <Image
              src="/portrait.png"
              alt="Md Shoieb Hossain — Software Engineer & Video Editor"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 80vw, 42vw"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          6. LAYER 3: FOREGROUND INTERSECTING TYPOGRAPHY ("HOSSAIN")
          Passes across the lower dissolving torso creating true magazine depth
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-[10vh] md:pb-[8vh] pointer-events-none z-[4]"
        style={{
          y: nameFgY,
          x: nameParallaxX * 0.7,
        }}
      >
        <h1 className="font-serif text-[clamp(4.5rem,14vw,14rem)] font-black leading-[0.8] tracking-[-0.04em] uppercase text-center whitespace-nowrap select-none">
          <motion.span
            className="block"
            style={{
              color: useTransform(
                split,
                [15, 50, 85],
                ['rgba(232, 133, 74, 0.35)', 'rgba(237, 234, 227, 0.45)', 'rgba(34, 211, 174, 0.35)']
              ),
              textShadow: '0 0 35px rgba(0, 0, 0, 0.8)',
            }}
          >
            HOSSAIN
          </motion.span>
        </h1>
      </motion.div>

      {/* ====================================================================
          7. THE SIGNATURE LUMINOUS SPINE & HANDLE
          A real, crafted interactive spine with ruler ticks and gold handle
          ==================================================================== */}
      {/* Luminous Vertical Spine */}
      <motion.div
        className="absolute top-0 bottom-0 pointer-events-none z-[10]"
        style={{
          left: useTransform(split, v => `${v}%`),
          transform: 'translateX(-50%)',
        }}
      >
        {/* Soft Radial Ambient Aura */}
        <motion.div
          className="absolute top-0 bottom-0 w-[80px] -left-[40px]"
          style={{
            background: useTransform(
              split,
              [15, 50, 85],
              [
                'linear-gradient(to right, transparent, rgba(232, 133, 74, 0.12), transparent)',
                'linear-gradient(to right, transparent, rgba(245, 158, 11, 0.14), transparent)',
                'linear-gradient(to right, transparent, rgba(34, 211, 174, 0.12), transparent)',
              ]
            ),
          }}
        />

        {/* Center Glowing Spine Line */}
        <motion.div
          className="absolute top-[6%] bottom-[6%] left-1/2 -translate-x-1/2 w-[2px]"
          style={{
            background: useTransform(
              split,
              [15, 50, 85],
              [
                'linear-gradient(to bottom, transparent 0%, #E8854A 25%, #F59E0B 50%, #E8854A 75%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, #22D3AE 20%, #F59E0B 50%, #E8854A 80%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, #22D3AE 25%, #F59E0B 50%, #22D3AE 75%, transparent 100%)',
              ]
            ),
            boxShadow: '0 0 16px rgba(245, 158, 11, 0.5)',
          }}
        />

        {/* Ruler Tick Marks Along Spine */}
        <div className="absolute top-[12%] bottom-[12%] left-1/2 -translate-x-1/2 hidden md:flex flex-col justify-between items-center opacity-40">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="w-1.5 h-[1px] bg-[#EDEAE3]" />
              <span className="w-1 h-1 rounded-full bg-[#F59E0B]/60" />
              <span className="w-1.5 h-[1px] bg-[#EDEAE3]" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Magnetic Handle */}
      <motion.div
        className="absolute top-1/2 z-[25] cursor-col-resize pointer-events-auto"
        style={{
          left: useTransform(split, v => `${v}%`),
          x: '-50%',
          y: '-50%',
        }}
        onMouseEnter={() => setIsHoveringHandle(true)}
        onMouseLeave={() => setIsHoveringHandle(false)}
      >
        {/* Outer Pulsing Glow Aura */}
        <motion.div
          className="absolute -inset-5 rounded-full blur-[16px]"
          animate={{ scale: isHoveringHandle ? 1.35 : [1, 1.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: useTransform(
              split,
              [15, 50, 85],
              [
                'radial-gradient(circle, rgba(232, 133, 74, 0.5) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(34, 211, 174, 0.5) 0%, transparent 70%)',
              ]
            ),
          }}
        />

        {/* Handle Badge */}
        <motion.div
          className="relative px-4 py-2 rounded-full border-2 border-[#F59E0B] bg-[#07090C]/95 backdrop-blur-md shadow-[0_0_24px_rgba(245,158,11,0.45)] flex items-center gap-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* BUILD Indicator */}
          <motion.span
            className="font-mono text-[10px] font-extrabold tracking-[1.5px]"
            style={{
              color: useTransform(split, [15, 50, 85], ['rgba(34, 211, 174, 0.35)', 'rgba(34, 211, 174, 1)', 'rgba(34, 211, 174, 1)']),
            }}
          >
            ◄ BUILD
          </motion.span>

          {/* Center Glowing Accent Dot */}
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B] animate-ping opacity-75" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B] -ml-3.5" />

          {/* CUT Indicator */}
          <motion.span
            className="font-mono text-[10px] font-extrabold tracking-[1.5px]"
            style={{
              color: useTransform(split, [15, 50, 85], ['rgba(232, 133, 74, 1)', 'rgba(232, 133, 74, 1)', 'rgba(232, 133, 74, 0.35)']),
            }}
          >
            CUT ►
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          8. CLEAN CORNER METADATA
          ==================================================================== */}
      {/* Top Left */}
      <div className="absolute top-20 left-6 md:left-10 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/30 pointer-events-none z-[8]">
        <div className="text-[#22D3AE] font-semibold">MD SHOIEB HOSSAIN</div>
        <div>BRAC UNIVERSITY · CS</div>
      </div>

      {/* Top Right */}
      <div className="absolute top-20 right-6 md:right-10 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/30 text-right pointer-events-none z-[8]">
        <div className="text-[#E8854A] font-semibold">ONE BRAIN · TWO TIMELINES</div>
        <div>DHAKA, BANGLADESH</div>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-6 left-6 md:left-10 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/25 space-y-0.5 pointer-events-none z-[8]">
        <div>01_BUILD_SYSTEM // ACTIVE</div>
        <div>LATENCY: &lt;14MS · SYS_2026</div>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6 md:right-10 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/25 text-right space-y-0.5 pointer-events-none z-[8]">
        <div>02_CUT_TIMELINE // ONLINE</div>
        <div>PRORES 4444 XQ · 4K UHD</div>
      </div>

      {/* ====================================================================
          9. DISCOVERY HINT (Disappears once dragged)
          ==================================================================== */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[20] flex items-center gap-3 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/40 bg-[#07090C]/90 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <motion.span
                className="text-[#F59E0B] text-[10px] font-bold"
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                ◄
              </motion.span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[3px] text-[#EDEAE3]">
                DRAG SPINE TO EXPLORE
              </span>
              <motion.span
                className="text-[#F59E0B] text-[10px] font-bold"
                animate={{ x: [3, 0, 3] }}
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
