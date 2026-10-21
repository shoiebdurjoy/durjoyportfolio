'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      setMoved(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]');
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hovering ? 44 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-accent text-[11px] font-semibold uppercase tracking-wider text-white"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: !moved ? 0 : hovering && !label ? 0.35 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {label}
    </motion.div>
  );
}
