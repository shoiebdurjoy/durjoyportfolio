'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const email = 'shoiebdurjoy@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-28 md:py-40 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C] overflow-hidden"
    >
      {/* Ambient Accent Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#22D3AE]/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E8854A]/[0.03] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#F59E0B] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Initiate Contact // Get in Touch
          </div>

          <h2 className="font-serif text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#EDEAE3] mb-6">
            Build something.<br />
            <span className="text-[#F59E0B]">Cut something.</span><br />
            Or both.
          </h2>

          <p className="font-sans text-[15px] md:text-[17px] text-[#EDEAE3]/70 leading-[1.7] max-w-xl mx-auto">
            Available for software engineering roles, AI system collaborations, and freelance commercial video editing projects.
          </p>
        </motion.div>

        {/* Contact Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-20">
          {/* Email Copy Card */}
          <div
            onClick={copyEmail}
            className="p-6 rounded-xl border border-[#F59E0B]/30 bg-[#0D1117] hover:border-[#F59E0B] hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all cursor-pointer text-center group"
          >
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#F59E0B] mb-1">
              Direct Email
            </div>
            <div className="font-sans text-[14px] font-semibold text-[#EDEAE3] group-hover:text-white truncate">
              {email}
            </div>
            <div className="font-mono text-[10px] text-[#EDEAE3]/40 mt-2">
              {copied ? '✓ Copied to Clipboard!' : 'Click to Copy'}
            </div>
          </div>

          {/* GitHub Card */}
          <a
            href="https://github.com/shoiebdurjoy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border border-[rgba(237,234,227,0.08)] bg-[#0D1117] hover:border-[#22D3AE] hover:shadow-[0_0_25px_rgba(34,211,174,0.12)] transition-all text-center group block"
          >
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#22D3AE] mb-1">
              GitHub Profile
            </div>
            <div className="font-sans text-[14px] font-semibold text-[#EDEAE3] group-hover:text-white">
              @shoiebdurjoy
            </div>
            <div className="font-mono text-[10px] text-[#EDEAE3]/40 mt-2">
              Explore Code Repos ↗
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/shoieb-durjoy-01a942234/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border border-[rgba(237,234,227,0.08)] bg-[#0D1117] hover:border-[#E8854A] hover:shadow-[0_0_25px_rgba(232,133,74,0.12)] transition-all text-center group block"
          >
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#E8854A] mb-1">
              LinkedIn
            </div>
            <div className="font-sans text-[14px] font-semibold text-[#EDEAE3] group-hover:text-white">
              Md Shoieb Hossain
            </div>
            <div className="font-mono text-[10px] text-[#EDEAE3]/40 mt-2">
              Connect Professionally ↗
            </div>
          </a>
        </div>

        {/* Clean Minimal Footer */}
        <div className="pt-10 border-t border-[rgba(237,234,227,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#EDEAE3]/40">
          <div>
            © {new Date().getFullYear()} Md Shoieb Hossain (Durjoy)
          </div>
          <div className="flex items-center gap-4">
            <span>Dhaka, Bangladesh</span>
            <span>•</span>
            <span>BRAC University</span>
          </div>
          <div className="text-[#EDEAE3]/30">
            Engineered with Next.js & TypeScript
          </div>
        </div>
      </div>
    </section>
  );
}
