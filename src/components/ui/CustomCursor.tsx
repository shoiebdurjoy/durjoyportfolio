'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for smoother, immediate tracking without React re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics for that buttery smooth trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide native cursor globally on mount
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: '-6px',
          marginTop: '-6px',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 4 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
}
