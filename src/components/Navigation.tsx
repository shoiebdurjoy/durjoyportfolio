'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NavigationProps = {
  onCommandPaletteOpen: () => void;
};

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ onCommandPaletteOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 80);
      setScrollProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(7,9,12,0.85)] backdrop-blur-xl border-b border-[rgba(237,234,227,0.04)]'
            : 'bg-transparent'
        }`}
      >
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-[1.5px] bg-[#22D3AE]/60 z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="h-14 md:h-16 flex items-center justify-between px-6 md:px-10 max-w-[1400px] mx-auto">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-baseline gap-0.5 select-none"
          >
            <span className="font-serif text-lg tracking-tight text-[#EDEAE3]">DURJOY</span>
            <span className="font-mono text-[11px] text-[#EDEAE3]/25">.dev</span>
          </button>

          {/* Desktop nav — clean, minimal */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-7">
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="font-mono text-[11px] uppercase tracking-[2px] text-[#EDEAE3]/40 hover:text-[#EDEAE3]/80 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Cmd+K */}
            <button
              onClick={onCommandPaletteOpen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[rgba(237,234,227,0.08)] hover:border-[rgba(237,234,227,0.15)] transition-colors duration-200"
              aria-label="Open command palette"
            >
              <span className="font-mono text-[10px] text-[#EDEAE3]/30">⌘K</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#EDEAE3] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#EDEAE3] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#EDEAE3] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#07090C]/95 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  onClick={() => handleLinkClick(link.href)}
                  className="font-serif text-3xl text-[#EDEAE3] hover:text-[#22D3AE] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                onClick={() => { setMobileMenuOpen(false); onCommandPaletteOpen(); }}
                className="mt-4 font-mono text-sm text-[#EDEAE3]/40 border border-[rgba(237,234,227,0.1)] px-5 py-2 rounded-md"
              >
                Search ⌘K
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
