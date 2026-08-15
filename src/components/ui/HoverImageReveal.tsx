'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Image from 'next/image';

type HoverImageRevealProps = {
  children: React.ReactNode;
  imageSrc?: string;
  className?: string;
};

export default function HoverImageReveal({ children, imageSrc, className = '' }: HoverImageRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use springs for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && imageSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 w-64 h-40 pointer-events-none z-[999]"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,242,195,0.2)] border border-[rgba(248,250,252,0.1)]">
              <Image 
                src={imageSrc} 
                alt="Project Preview" 
                fill 
                className="object-cover"
                sizes="256px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
