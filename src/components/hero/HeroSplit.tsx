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

  // Split state (0 to 100).
  // 50 = Center Balanced
  // 100 = Full BUILD (Left Side)
  // 0 = Full CUT (Right Side)
  const rawSplit = useMotionValue(50);
  const split = useSpring(rawSplit, { stiffness: 220, damping: 26 });

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Visual intensities:
  // Dragging left (split < 50): CUT side expands, BUILD side fades
  // Dragging right (split > 50): BUILD side expands, CUT side fades
  const devIntensity = useTransform(split, [20, 50, 80], [0.1, 0.5, 1]);
  const editIntensity = useTransform(split, [20, 50, 80], [1, 0.5, 0.1]);

  // PHOTO COLOR SHIFT:
  // BUILD (split >= 80) -> 100% Black & White (grayscale 100%)
  // CENTER (split = 50) -> 50% Grayscale blend
  // CUT (split <= 20) -> 0% Grayscale (100% Natural Color)
  const photoGrayscale = useTransform(split, [20, 50, 80], [0, 45, 100]);
  const photoContrast = useTransform(split, [20, 50, 80], [105, 110, 120]);
  const photoBrightness = useTransform(split, [20, 50, 80], [102, 100, 96]);

  // Idle demonstration animation on initial load
  useEffect(() => {
    if (hasInteracted) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let frame = 0;
    let raf: number;
    const animate = () => {
      frame++;
      if (frame < 160) {
        // Smooth sine sweep: 50 -> 40 -> 60 -> 50
        rawSplit.set(50 + Math.sin(frame / 20) * 10);
        raf = requestAnimationFrame(animate);
      } else {
        rawSplit.set(50);
      }
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(animate); }, 900);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [hasInteracted, rawSplit]);

  // Mouse move handler
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

  // Parallax offsets
  const photoParallaxX = (mousePos.x - 0.5) * -12;
  const photoParallaxY = (mousePos.y - 0.5) * -8;
  const nameParallaxX = (mousePos.x - 0.5) * 10;
  const nameParallaxY = (mousePos.y - 0.5) * 6;

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
      aria-label="Interactive Hero: Explore Software Engineering (BUILD - Monochrome) and Video Editing (CUT - Full Color)"
    >
      {/* ====================================================================
          1. ATMOSPHERIC LIGHTING LAYERS
          ==================================================================== */}
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#07090C]" />

      {/* BUILD Left Atmosphere (Teal / Cool tone) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(devIntensity, [0, 1], [0.1, 0.85]),
          background: 'radial-gradient(circle 800px at 15% 50%, rgba(34, 211, 174, 0.14) 0%, rgba(8, 24, 20, 0.04) 55%, transparent 80%)',
        }}
      />

      {/* CUT Right Atmosphere (Amber / Warm tone) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(editIntensity, [0, 1], [0.1, 0.85]),
          background: 'radial-gradient(circle 800px at 85% 50%, rgba(232, 133, 74, 0.14) 0%, rgba(28, 18, 12, 0.04) 55%, transparent 80%)',
        }}
      />

      {/* Center Gold Glow Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/[0.025] blur-[130px] pointer-events-none" />

      {/* ====================================================================
          2. LEFT SIDE (BUILD) — REAL ENGINEERING INFORMATION
          Reveals dynamically as the user moves toward BUILD
          ==================================================================== */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full md:w-[42%] flex flex-col justify-center px-6 md:px-12 pointer-events-none z-[4]"
        style={{ opacity: useTransform(devIntensity, [0.1, 0.45, 1], [0.15, 0.55, 1]) }}
      >
        <div className="max-w-md space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] text-[#22D3AE] font-bold uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE] shadow-[0_0_6px_#22D3AE]" />
              01 — BUILD
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-[1.05] tracking-[-0.01em] text-[#EDEAE3] uppercase">
              Software & AI
            </h2>
            <p className="font-sans text-[13px] text-[#EDEAE3]/50 mt-1 leading-[1.5]">
              Computer Science student at BRAC University building backend architectures, intelligent agents, and scalable systems.
            </p>
          </div>

          {/* Real Skills & Technologies */}
          <div className="border-t border-[#22D3AE]/15 pt-3 space-y-2">
            <div className="font-mono text-[10px] tracking-[2px] text-[#22D3AE]/70 uppercase font-semibold">
              Core Technologies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['TypeScript', 'Python', 'PyTorch', 'Next.js', 'NestJS', 'Docker', 'PostgreSQL', 'FastAPI', 'Redis'].map(tech => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 border border-[#22D3AE]/20 bg-[#22D3AE]/[0.04] text-[#EDEAE3]/80 rounded-[2px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Real Projects */}
          <div className="border-t border-[#22D3AE]/15 pt-3 space-y-1.5">
            <div className="font-mono text-[10px] tracking-[2px] text-[#22D3AE]/70 uppercase font-semibold">
              Key Work
            </div>
            <div className="font-mono text-[11px] text-[#EDEAE3]/70 space-y-1">
              <div><span className="text-[#22D3AE] font-bold">DurjoyAI</span> — Alexa + Multi-LLM Modular Assistant</div>
              <div><span className="text-[#22D3AE] font-bold">LowKeyBD</span> — Next.js + NestJS Scalable Platform</div>
              <div><span className="text-[#22D3AE] font-bold">EMERGON</span> — Smart Emergency Dispatch Platform</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          3. RIGHT SIDE (CUT) — REAL VIDEO EDITING INFORMATION
          Reveals dynamically as the user moves toward CUT
          ==================================================================== */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full md:w-[42%] flex flex-col justify-center px-6 md:px-12 text-right pointer-events-none z-[4]"
        style={{ opacity: useTransform(editIntensity, [0.1, 0.45, 1], [0.15, 0.55, 1]) }}
      >
        <div className="max-w-md ml-auto space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 justify-end font-mono text-[11px] tracking-[3px] text-[#E8854A] font-bold uppercase mb-1">
              02 — CUT
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8854A] shadow-[0_0_6px_#E8854A]" />
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-[1.05] tracking-[-0.01em] text-[#EDEAE3] uppercase">
              Video & Story
            </h2>
            <p className="font-sans text-[13px] text-[#EDEAE3]/50 mt-1 leading-[1.5]">
              Professional video editor with 3+ years at Think Big Brand. Shaping footage into pacing, rhythm, and visual narrative.
            </p>
          </div>

          {/* Real Tools & Software */}
          <div className="border-t border-[#E8854A]/15 pt-3 space-y-2">
            <div className="font-mono text-[10px] tracking-[2px] text-[#E8854A]/70 uppercase font-semibold">
              Post-Production Stack
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Photoshop', 'Motion Design', 'Color Grading'].map(tool => (
                <span
                  key={tool}
                  className="font-mono text-[10px] px-2 py-0.5 border border-[#E8854A]/20 bg-[#E8854A]/[0.04] text-[#EDEAE3]/80 rounded-[2px]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Real Experience & Deliverables */}
          <div className="border-t border-[#E8854A]/15 pt-3 space-y-1.5">
            <div className="font-mono text-[10px] tracking-[2px] text-[#E8854A]/70 uppercase font-semibold">
              Agency Experience
            </div>
            <div className="font-mono text-[11px] text-[#EDEAE3]/70 space-y-1">
              <div><span className="text-[#E8854A] font-bold">Think Big Brand</span> — International Content Agency</div>
              <div><span className="text-[#E8854A] font-bold">3+ Years</span> — Long-Form, Shorts, Social Campaigns</div>
              <div><span className="text-[#E8854A] font-bold">Deliverables</span> — 4K ProRes · Color Mastered · Sound Design</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          4. LAYER: GHOST EDITORIAL NAME (BEHIND THE PHOTO)
          Restored clean, balanced editorial typography
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
        style={{
          y: nameY,
          x: nameParallaxX,
        }}
      >
        <div className="text-center select-none">
          <h1 className="font-serif text-[clamp(4.5rem,13vw,11.5rem)] font-black leading-[0.82] tracking-[-0.04em] uppercase text-center whitespace-nowrap">
            <motion.span
              className="block"
              style={{
                color: useTransform(
                  split,
                  [20, 50, 80],
                  ['rgba(232, 133, 74, 0.05)', 'rgba(237, 234, 227, 0.06)', 'rgba(34, 211, 174, 0.05)']
                ),
              }}
            >
              Shoieb
            </motion.span>
            <motion.span
              className="block -mt-[0.06em]"
              style={{
                color: useTransform(
                  split,
                  [20, 50, 80],
                  ['rgba(232, 133, 74, 0.07)', 'rgba(237, 234, 227, 0.08)', 'rgba(34, 211, 174, 0.07)']
                ),
              }}
            >
              Durjoy
            </motion.span>
          </h1>
        </div>
      </motion.div>

      {/* ====================================================================
          5. LAYER: THE CENTRAL PORTRAIT WITH B&W ↔ COLOR TRANSFORMATION
          Black & White on BUILD side (Left), Full Natural Color on CUT side (Right)
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
          {/* Subtle Ambient Color Glow Behind Subject */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none">
            <motion.div
              className="absolute inset-0 rounded-full blur-[90px]"
              style={{
                background: useTransform(
                  split,
                  [20, 50, 80],
                  [
                    'radial-gradient(circle, rgba(232, 133, 74, 0.16) 0%, transparent 65%)',
                    'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 65%)',
                    'radial-gradient(circle, rgba(34, 211, 174, 0.16) 0%, transparent 65%)',
                  ]
                ),
              }}
            />
          </div>

          {/* Photo Container with Feather Mask (dissolves into dark environment) */}
          <motion.div
            className="relative w-[clamp(260px,32vw,440px)] h-[clamp(360px,52vh,620px)]"
            style={{
              filter: useTransform(
                [photoGrayscale, photoContrast, photoBrightness],
                ([g, c, b]) => `grayscale(${g}%) contrast(${c}%) brightness(${b}%)`
              ),
              maskImage: `
                radial-gradient(ellipse 85% 82% at 50% 42%, black 45%, transparent 94%),
                linear-gradient(to bottom, transparent 0%, black 10%, black 72%, transparent 98%)
              `,
              WebkitMaskImage: `
                radial-gradient(ellipse 85% 82% at 50% 42%, black 45%, transparent 94%),
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
              sizes="(max-width: 768px) 75vw, 32vw"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          6. LAYER: FOREGROUND EDITORIAL IDENTITY (OVERLAPPING BOTTOM)
          Restored clean, elegant, unified presentation
          ==================================================================== */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-[10vh] md:pb-[11vh] pointer-events-none z-[3]"
        style={{
          y: nameY,
          x: nameParallaxX * 0.5,
        }}
      >
        <div className="text-center">
          {/* Main Name Heading */}
          <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-black leading-[0.88] tracking-[-0.02em] text-[#EDEAE3] uppercase">
            <span className="block">Md Shoieb</span>
            <span className="block">Hossain</span>
          </h1>

          {/* BUILD ◆ CUT Indicators */}
          <div className="mt-3.5 flex items-center justify-center gap-4 font-mono text-[clamp(0.65rem,1.2vw,0.85rem)] font-bold tracking-[5px] uppercase">
            <motion.span
              style={{
                color: useTransform(split, [20, 50, 80], [
                  'rgba(34, 211, 174, 0.35)',
                  'rgba(34, 211, 174, 0.9)',
                  'rgba(34, 211, 174, 1)',
                ]),
              }}
            >
              BUILD
            </motion.span>
            <motion.span
              className="text-[#F59E0B] text-[8px]"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ◆
            </motion.span>
            <motion.span
              style={{
                color: useTransform(split, [20, 50, 80], [
                  'rgba(232, 133, 74, 1)',
                  'rgba(232, 133, 74, 0.9)',
                  'rgba(232, 133, 74, 0.35)',
                ]),
              }}
            >
              CUT
            </motion.span>
          </div>

          {/* Subtitle */}
          <div className="mt-2 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/25">
            Software Engineer · Video Editor · Dhaka, Bangladesh
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          7. THE SIGNATURE LUMINOUS SPINE & HANDLE
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
          className="absolute top-0 bottom-0 w-[60px] -left-[30px]"
          style={{
            background: useTransform(
              split,
              [20, 50, 80],
              [
                'linear-gradient(to right, transparent, rgba(232, 133, 74, 0.1), transparent)',
                'linear-gradient(to right, transparent, rgba(245, 158, 11, 0.12), transparent)',
                'linear-gradient(to right, transparent, rgba(34, 211, 174, 0.1), transparent)',
              ]
            ),
          }}
        />

        {/* Center Glowing Spine Line */}
        <motion.div
          className="absolute top-[8%] bottom-[8%] left-1/2 -translate-x-1/2 w-[2px]"
          style={{
            background: useTransform(
              split,
              [20, 50, 80],
              [
                'linear-gradient(to bottom, transparent 0%, #E8854A 25%, #F59E0B 50%, #E8854A 75%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, rgba(237,234,227,0.3) 20%, #F59E0B 50%, rgba(237,234,227,0.3) 80%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, #22D3AE 25%, #F59E0B 50%, #22D3AE 75%, transparent 100%)',
              ]
            ),
            boxShadow: '0 0 14px rgba(245, 158, 11, 0.45)',
          }}
        />
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
          className="absolute -inset-4 rounded-full blur-[14px]"
          animate={{ scale: isHoveringHandle ? 1.3 : [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: useTransform(
              split,
              [20, 50, 80],
              [
                'radial-gradient(circle, rgba(232, 133, 74, 0.5) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(34, 211, 174, 0.5) 0%, transparent 70%)',
              ]
            ),
          }}
        />

        {/* Handle Button */}
        <motion.div
          className="relative px-3.5 py-1.5 rounded-full border border-[#F59E0B] bg-[#07090C]/95 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2.5"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* BUILD Indicator */}
          <motion.span
            className="font-mono text-[9px] font-extrabold tracking-[1px]"
            style={{
              color: useTransform(split, [20, 50, 80], ['rgba(34, 211, 174, 0.4)', 'rgba(34, 211, 174, 1)', 'rgba(34, 211, 174, 1)']),
            }}
          >
            ◄ BUILD
          </motion.span>

          {/* Center Gold Accent Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />

          {/* CUT Indicator */}
          <motion.span
            className="font-mono text-[9px] font-extrabold tracking-[1px]"
            style={{
              color: useTransform(split, [20, 50, 80], ['rgba(232, 133, 74, 1)', 'rgba(232, 133, 74, 1)', 'rgba(232, 133, 74, 0.4)']),
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
      <div className="absolute bottom-6 left-6 md:left-10 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/20 pointer-events-none z-[8]">
        <div>B.S. COMPUTER SCIENCE · 2027</div>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6 md:right-10 font-mono text-[9px] tracking-[3px] uppercase text-[#EDEAE3]/20 text-right pointer-events-none z-[8]">
        <div>VIDEO EDITOR · 3+ YRS EXP</div>
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
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#F59E0B]/40 bg-[#07090C]/90 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <motion.span
                className="text-[#F59E0B] text-[9px] font-bold"
                animate={{ x: [-2, 0, -2] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                ◄
              </motion.span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[3px] text-[#EDEAE3]">
                DRAG TO EXPLORE BOTH SIDES
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
