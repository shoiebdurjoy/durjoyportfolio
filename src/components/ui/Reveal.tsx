'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function LineReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.08em] ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="label flex items-center gap-3 text-muted">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-line" />
      <span>{children}</span>
    </div>
  );
}
