'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/src/components/ui/MagneticButton';

type NavigationProps = {
  onCommandPaletteOpen: () => void;
};

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#work' },
  { label: 'Thesis', href: '#thesis' },
  { label: 'Video', href: '#cutting-room' },
  { label: 'GitHub', href: '#github' },
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
            ? 'bg-[#07090C]/90 backdrop-blur-xl border-b border-[rgba(237,234,227,0.06)]'
            : 'bg-transparent'
        }`}
      >
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-[1.5px] bg-[#F59E0B] z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="h-14 md:h-16 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <MagneticButton strength={15}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-baseline gap-1 select-none group cursor-pointer"
            >
              <span className="font-serif text-lg tracking-tight text-[#EDEAE3] group-hover:text-[#F59E0B] transition-colors">
                DURJOY
              </span>
              <span className="font-mono text-[10px] text-[#EDEAE3]/30 tracking-wider">.dev</span>
            </button>
          </MagneticButton>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            <nav className="flex gap-6">
              {NAV_LINKS.map((link) => (
                <MagneticButton key={link.label} strength={20}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#EDEAE3]/50 hover:text-[#EDEAE3] transition-colors cursor-pointer block py-2"
                  >
                    {link.label}
                  </button>
                </MagneticButton>
              ))}
            </nav>

            {/* Resume CTA */}
            <MagneticButton strength={25}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-[#07090C] bg-[#F59E0B] hover:bg-[#F59E0B]/90 px-4 py-2 rounded-full transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] block"
              >
                Resume
              </a>
            </MagneticButton>

            {/* Cmd+K trigger */}
            <MagneticButton strength={30}>
              <button
                onClick={onCommandPaletteOpen}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-[rgba(237,234,227,0.1)] hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/[0.05] transition-all cursor-pointer"
                aria-label="Open command palette"
              >
                <span className="font-mono text-[10px] text-[#EDEAE3]/40">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#131920] border border-[rgba(237,234,227,0.1)] font-mono text-[9px] text-[#F59E0B]">
                  ⌘K
                </kbd>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-50 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#EDEAE3] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#EDEAE3] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#EDEAE3] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#07090C]/98 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.3 }}
                  onClick={() => handleLinkClick(link.href)}
                  className="font-serif text-3xl text-[#EDEAE3] hover:text-[#F59E0B] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.30, duration: 0.3 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 font-mono text-[13px] text-[#07090C] px-10 py-3.5 rounded-full bg-[#F59E0B] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                Download Resume
              </motion.a>
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                onClick={() => { setMobileMenuOpen(false); onCommandPaletteOpen(); }}
                className="mt-4 font-mono text-xs text-[#F59E0B] border border-[#F59E0B]/30 px-6 py-2.5 rounded-full bg-[#F59E0B]/10"
              >
                Search Commands (⌘K)
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
