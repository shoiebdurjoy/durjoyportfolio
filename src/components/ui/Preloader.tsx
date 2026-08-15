'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 10) + 5;
      if (count > 100) count = 100;
      setCounter(count);

      if (count === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, 500); // Hold at 100% for 500ms
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#06080B] text-[#F8FAFC]"
        >
          <div className="absolute inset-0 bg-[#00F2C3]/[0.02] blur-[150px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-5xl md:text-7xl font-black tracking-tight"
            >
              {counter}%
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[3px] text-[#F8FAFC]/50"
            >
              <span>Systems</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>Cinema</span>
            </motion.div>
            
            <div className="mt-12 w-48 h-[1px] bg-[rgba(248,250,252,0.1)] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#F59E0B]"
                style={{ width: `${counter}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
