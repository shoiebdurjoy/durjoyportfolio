'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import MagneticButton from '@/src/components/ui/MagneticButton';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const email = 'shoiebdurjoy@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 md:py-48 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00F2C3]/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#EA580C]/[0.03] blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            06 // Initiate Contact
          </div>

          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[1.05] tracking-tight text-[#F8FAFC] mb-6">
            Build Systems.<br />
            <span className="text-[#F59E0B] italic font-normal">Cut Stories.</span><br />
            Or Both.
          </h2>

          <p className="font-sans text-[16px] md:text-[18px] text-[#F8FAFC]/70 leading-[1.7] max-w-xl mx-auto">
            Available for software engineering roles, AI system architectures, and commercial post-production video projects.
          </p>

          {/* Big Interactive Email Link Button */}
          <div className="pt-8">
            <MagneticButton strength={40}>
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0C1017] border border-[#F59E0B]/40 hover:border-[#F59E0B] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
              >
                <span className="font-mono text-base md:text-lg font-bold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors">
                  {email}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 font-mono text-[10px] text-[#F59E0B] font-bold">
                  {copied ? '✓ COPIED!' : 'CLICK TO COPY'}
                </span>
              </button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Social Connection Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-24">
          <MagneticButton className="block" strength={15}>
            <a
              href="https://github.com/shoiebdurjoy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-6 rounded-xl border border-[rgba(248,250,252,0.08)] bg-[#0C1017]/80 hover:border-[#00F2C3] hover:shadow-[0_0_25px_rgba(0,242,195,0.12)] transition-all text-center group block"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#00F2C3] mb-1">
                Code Repositories
              </div>
              <div className="font-sans text-base font-bold text-[#F8FAFC] group-hover:text-white">
                GitHub // @shoiebdurjoy
              </div>
            </a>
          </MagneticButton>

          <MagneticButton className="block" strength={15}>
            <a
              href="https://www.linkedin.com/in/shoieb-durjoy-01a942234/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-6 rounded-xl border border-[rgba(248,250,252,0.08)] bg-[#0C1017]/80 hover:border-[#EA580C] hover:shadow-[0_0_25px_rgba(234,88,12,0.12)] transition-all text-center group block"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#EA580C] mb-1">
                Professional Network
              </div>
              <div className="font-sans text-base font-bold text-[#F8FAFC] group-hover:text-white">
                LinkedIn // Md Shoieb Hossain
              </div>
            </a>
          </MagneticButton>
        </div>

        {/* Luxury Editorial Footer */}
        <div className="pt-12 border-t border-[rgba(248,250,252,0.08)] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#F8FAFC]/40">
          <div>
            © {new Date().getFullYear()} Md Shoieb Hossain (Durjoy)
          </div>
          <div className="flex items-center gap-4">
            <span>Dhaka, Bangladesh</span>
            <span>•</span>
            <span>BRAC University (&apos;27)</span>
          </div>
          <div className="text-[#F8FAFC]/30">
            Engineered with Next.js & TypeScript
          </div>
        </div>
      </div>
    </section>
  );
}
