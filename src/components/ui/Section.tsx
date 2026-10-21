'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type Props = {
  id: string;
  theme: 'light' | 'dark';
  className?: string;
  children: ReactNode;
  // The hero panel starts at the top of the page, so it skips the scale-in.
  fixedPanel?: boolean;
};

// Layering: the dark panel sits at z-0, the fixed WebGL canvas at z-1 and content at z-2, so the 3D
// rig floats over panels but behind text. Nothing here may create a stacking context on <section>.
export default function Section({ id, theme, className = '', children, fixedPanel = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 30%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [72, 40]);
  const dark = theme === 'dark';

  return (
    <section ref={ref} id={id} data-theme={theme} className={`relative overflow-x-clip ${dark ? 'theme-dark' : ''} ${className}`}>
      {dark && (
        <motion.div
          aria-hidden
          className={`dark-panel absolute z-0 ${fixedPanel ? 'inset-0 rounded-b-[40px]' : 'inset-x-2 inset-y-0 md:inset-x-3'}`}
          style={fixedPanel ? undefined : { scale, borderRadius: radius }}
        />
      )}
      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
