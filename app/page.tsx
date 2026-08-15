'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navigation from '@/src/components/Navigation';
import CommandPalette from '@/src/components/CommandPalette';
import HeroSplit from '@/src/components/hero/HeroSplit';

/* ===========================
   SCROLL-REVEAL COMPONENT
   =========================== */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ===========================
   TECH MARQUEE
   =========================== */
const techRows = [
  ['TypeScript', 'Python', 'JavaScript', 'C++', 'Java', 'SQL', 'Bash', 'HTML/CSS'],
  ['Next.js', 'React', 'NestJS', 'Flask', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS'],
  ['PyTorch', 'Docker', 'PostgreSQL', 'Redis', 'MongoDB', 'MinIO', 'Meilisearch', 'WebSockets'],
  ['OpenAI API', 'Gemini', 'CUDA', 'Librosa', 'Git', 'Linux', 'Vercel', 'AWS'],
];

function TechMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="space-y-3 overflow-hidden">
      {techRows.map((row, i) => (
        <motion.div
          key={i}
          className="flex gap-3 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.1 + 0.2 }}
        >
          <motion.div
            className="flex gap-3"
            animate={isInView ? {
              x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'],
            } : {}}
            transition={{
              x: { duration: 25 + i * 5, repeat: Infinity, ease: 'linear' },
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...row, ...row].map((tech, j) => (
              <span
                key={`${tech}-${j}`}
                className="inline-flex items-center px-4 py-2 border border-[rgba(237,234,227,0.08)] font-mono text-[12px] tracking-[1px] text-[#EDEAE3]/50 hover:text-[#22D3AE] hover:border-[#22D3AE]/30 transition-all duration-300 cursor-default shrink-0"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ===========================
   PROJECT CARD
   =========================== */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.a
      ref={ref}
      href={project.url || '#'}
      target={project.url ? '_blank' : undefined}
      rel={project.url ? 'noopener noreferrer' : undefined}
      className={`group block border border-[rgba(237,234,227,0.06)] p-8 md:p-10 transition-all duration-500 relative overflow-hidden hover:-translate-y-1 ${
        project.accent === 'teal' ? 'hover:border-[#22D3AE]/30' : 'hover:border-[#E8854A]/30'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
        project.accent === 'teal'
          ? 'bg-gradient-to-br from-[#22D3AE]/[0.04] to-transparent'
          : 'bg-gradient-to-br from-[#E8854A]/[0.04] to-transparent'
      }`} />

      <div className="relative z-10">
        {/* Top row: tag + number */}
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-[#EDEAE3]/30">{project.tag}</span>
          <span className="font-mono text-[10px] text-[#EDEAE3]/15">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className={`font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-[1px] leading-[1.05] mb-4 transition-colors duration-300 ${
          project.accent === 'teal' ? 'group-hover:text-[#22D3AE]' : 'group-hover:text-[#E8854A]'
        } text-[#EDEAE3]`}>
          {project.name}
        </h3>

        <p className="font-sans text-[14px] leading-[1.7] text-[#EDEAE3]/50 mb-6 max-w-lg">
          {project.desc}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map(t => (
            <span key={t} className="font-mono text-[10px] px-2.5 py-1 border border-[rgba(237,234,227,0.08)] text-[#EDEAE3]/40 tracking-[1px]">
              {t}
            </span>
          ))}
        </div>

        {/* Arrow */}
        {project.url && (
          <div className="mt-6 font-mono text-[11px] text-[#EDEAE3]/25 group-hover:text-[#EDEAE3]/60 transition-colors flex items-center gap-2">
            <span>View Project</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        )}
      </div>
    </motion.a>
  );
}

/* ===========================
   PROJECT DATA
   =========================== */
const projects = [
  {
    tag: 'AI · Personal Project',
    name: 'DurjoyAI',
    desc: 'A modular AI assistant with Alexa voice integration, multi-provider LLM support (OpenAI, Gemini, OpenRouter), and a persistent "Brain 0" context system.',
    stack: ['TypeScript', 'Docker', 'OpenAI', 'Alexa', 'Node.js'],
    accent: 'teal' as const,
    url: 'https://github.com/shoiebdurjoy/DurjoyAI',
  },
  {
    tag: 'Full-Stack · Team Project',
    name: 'EMERGON',
    desc: 'Smart emergency coordination platform with REST APIs, real-time WebSocket events, AI risk-flagging, and SMS/location integration.',
    stack: ['Flask', 'React', 'PostgreSQL', 'Socket.IO', 'Python'],
    accent: 'teal' as const,
  },
  {
    tag: 'Thesis · Deep Learning',
    name: 'Bangla Emotion Recognition',
    desc: 'Multimodal emotion recognition from Bangla audio/video using deep learning — custom dataset curation, feature extraction, and model training.',
    stack: ['PyTorch', 'CUDA', 'Librosa', 'Kaggle', 'Python'],
    accent: 'orange' as const,
  },
  {
    tag: 'Full-Stack · Platform',
    name: 'LowKeyBD',
    desc: 'Full-stack platform with Next.js frontend, NestJS backend, real-time capabilities, search infrastructure, and modern DevOps deployment.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript'],
    accent: 'teal' as const,
    url: 'https://github.com/shoiebdurjoy/lowkeybd',
  },
  {
    tag: 'Full-Stack · Review Platform',
    name: 'Game-Critic',
    desc: 'Game review and rating platform with user authentication, review system, and community features.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    accent: 'teal' as const,
    url: 'https://github.com/shoiebdurjoy/Game-Critic',
  },
];

/* ===========================
   MAIN PAGE
   =========================== */
export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // About section scroll scaling
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ['start end', 'start 0.3'],
  });
  const aboutHeadlineScale = useTransform(aboutScroll, [0, 1], [0.9, 1]);
  const aboutHeadlineOpacity = useTransform(aboutScroll, [0, 1], [0, 1]);

  return (
    <>
      <Navigation onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />

      <main>
        {/* ====== HERO ====== */}
        <HeroSplit />

        {/* ====== ABOUT — EDITORIAL STORYTELLING ====== */}
        <section id="about" ref={aboutRef} className="relative py-32 md:py-44 px-[6%] md:px-[8%]">
          {/* Section divider */}
          <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(237,234,227,0.06)] to-transparent" />

          {/* Large scroll-scaling headline */}
          <motion.div style={{ scale: aboutHeadlineScale, opacity: aboutHeadlineOpacity }}>
            <div className="font-mono text-[11px] tracking-[4px] uppercase text-[#22D3AE]/60 mb-6">
              About
            </div>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-[-0.01em] leading-[1] text-[#EDEAE3] max-w-4xl mb-16">
              One brain,<br />two timelines.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Left: narrative */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <p className="font-sans text-[17px] leading-[1.8] text-[#EDEAE3]/75 max-w-xl">
                  I&apos;m a Computer Science student at BRAC University who builds AI systems,
                  full-stack applications, and backend architectures. I care about how things
                  work under the hood — not just that they ship.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-sans text-[17px] leading-[1.8] text-[#EDEAE3]/75 max-w-xl">
                  Alongside engineering, I&apos;ve spent 3+ years as a professional video editor at
                  Think Big Brand — an international content agency. Real client deadlines,
                  real turnaround pressure, real feedback loops. It taught me the same lesson
                  systems design has: <em className="text-[#EDEAE3] not-italic font-medium">constraints make the work better.</em>
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-sans text-[15px] leading-[1.8] text-[#EDEAE3]/40 max-w-xl">
                  This site is proof of both halves at once. Drag the hero — that&apos;s
                  not a gimmick, it&apos;s the pitch.
                </p>
              </Reveal>
            </div>

            {/* Right: stats + metadata */}
            <div className="lg:col-span-5 lg:border-l lg:border-[rgba(237,234,227,0.06)] lg:pl-10">
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                {[
                  { value: '2027', label: 'Expected Graduation' },
                  { value: '3.00', label: 'CGPA · BRAC University' },
                  { value: '3+', label: 'Years Video Editing' },
                  { value: '2nd', label: 'BSEC Competition' },
                  { value: '7+', label: 'Projects Built' },
                  { value: '2', label: 'Identities, One Person' },
                ].map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.07}>
                    <div>
                      <span className="font-mono text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#E8854A] block leading-[1]">
                        {stat.value}
                      </span>
                      <span className="font-sans text-[11px] uppercase tracking-[2px] text-[#EDEAE3]/30 mt-2 block">
                        {stat.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== TECH STACK — MOVING TICKER ====== */}
        <section id="stack" className="relative py-28 md:py-36 px-[6%] md:px-[8%]">
          <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(237,234,227,0.06)] to-transparent" />

          <Reveal>
            <div className="font-mono text-[11px] tracking-[4px] uppercase text-[#22D3AE]/60 mb-6">
              Stack
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-black uppercase tracking-[1px] leading-[1.05] text-[#EDEAE3] max-w-2xl mb-14">
              Technologies I actually use.
            </h2>
          </Reveal>

          <TechMarquee />

          <Reveal delay={0.3}>
            <p className="font-sans text-[13px] text-[#EDEAE3]/25 mt-10 max-w-md">
              Languages, frameworks, databases, ML tools, DevOps, and cloud — connected to real projects, not a random list.
            </p>
          </Reveal>
        </section>

        {/* ====== SELECTED WORK — PROJECTS ====== */}
        <section id="work" className="relative py-28 md:py-36 px-[6%] md:px-[8%]">
          <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(237,234,227,0.06)] to-transparent" />

          <Reveal>
            <div className="font-mono text-[11px] tracking-[4px] uppercase text-[#22D3AE]/60 mb-6">
              Selected Work
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-black uppercase tracking-[1px] leading-[1.05] text-[#EDEAE3] max-w-2xl mb-14">
              Pick a lane — or don&apos;t.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* ====== THE CUTTING ROOM — VIDEO EDITING ====== */}
        <section id="cutting-room" className="relative py-32 md:py-44 px-[6%] md:px-[8%] overflow-hidden">
          <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(237,234,227,0.06)] to-transparent" />

          {/* Warm ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8854A]/[0.03] blur-[120px] pointer-events-none" />

          <Reveal>
            <div className="font-mono text-[11px] tracking-[4px] uppercase text-[#E8854A]/70 mb-6">
              The Cutting Room
            </div>
            <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-[-0.01em] leading-[0.95] text-[#EDEAE3] max-w-3xl mb-8">
              Where footage<br />becomes story.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans text-[16px] leading-[1.75] text-[#EDEAE3]/60 max-w-xl mb-14">
              3+ years as a professional editor at Think Big Brand — an international
              content agency. I shape raw footage into pacing, rhythm, and meaning.
              The same instinct for structure, aimed at a timeline instead of a codebase.
            </p>
          </Reveal>

          {/* Editing pipeline */}
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-0 items-center justify-start mb-14">
              {['Raw Footage', 'Selects', 'Assembly', 'Motion', 'Color', 'Sound', 'Final'].map((stage, i) => (
                <div key={stage} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${i === 6 ? 'border-[#E8854A] bg-[#E8854A]/30' : 'border-[#E8854A]/40'}`} />
                    <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#EDEAE3]/30 mt-2 whitespace-nowrap">
                      {stage}
                    </span>
                  </div>
                  {i < 6 && (
                    <div className="w-8 md:w-14 h-[1px] bg-[#E8854A]/20 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Experience details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Think Big Brand', sub: 'International Content Agency', detail: 'Long-form & short-form content editing, social media campaigns, brand storytelling' },
              { title: 'Tools', sub: 'Professional Workflow', detail: 'Premiere Pro, After Effects, DaVinci Resolve, Photoshop, Illustrator' },
              { title: 'Output', sub: 'Content Delivery', detail: 'Hundreds of deliverables across multiple formats, platforms, and client verticals' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={0.1 * i + 0.3}>
                <div className="border border-[rgba(237,234,227,0.06)] p-6 group hover:border-[#E8854A]/20 transition-colors duration-500">
                  <h3 className="font-sans text-[16px] font-semibold text-[#EDEAE3] mb-1">{card.title}</h3>
                  <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#E8854A]/50 mb-4">{card.sub}</div>
                  <p className="font-sans text-[13px] leading-[1.7] text-[#EDEAE3]/40">{card.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ====== GITHUB ACTIVITY ====== */}
        <section id="github" className="relative py-28 md:py-36 px-[6%] md:px-[8%]">
          <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(237,234,227,0.06)] to-transparent" />

          <Reveal>
            <div className="font-mono text-[11px] tracking-[4px] uppercase text-[#22D3AE]/60 mb-6">
              GitHub
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-black uppercase tracking-[1px] leading-[1.05] text-[#EDEAE3] max-w-2xl mb-6">
              Open source & activity.
            </h2>
            <p className="font-sans text-[14px] text-[#EDEAE3]/40 max-w-md mb-10">
              Contribution history, repositories, and live development activity.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="https://github.com/shoiebdurjoy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[13px] text-[#22D3AE] border border-[#22D3AE]/20 px-5 py-3 hover:bg-[#22D3AE]/[0.05] hover:border-[#22D3AE]/40 transition-all duration-300"
            >
              <span>@shoiebdurjoy</span>
              <span>↗</span>
            </a>
          </Reveal>

          {/* GitHub contribution placeholder — will be replaced with live API data */}
          <Reveal delay={0.3}>
            <div className="mt-12 border border-[rgba(237,234,227,0.06)] p-6 md:p-8">
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#EDEAE3]/25 mb-4">
                Contribution Activity
              </div>
              {/* Contribution heatmap grid */}
              <div className="grid grid-flow-col auto-cols-[12px] gap-[3px] overflow-x-auto pb-2">
                {Array.from({ length: 52 }, (_, weekIdx) => (
                  <div key={weekIdx} className="grid grid-rows-7 gap-[3px]">
                    {Array.from({ length: 7 }, (_, dayIdx) => {
                      // Generate plausible-looking activity
                      const seed = (weekIdx * 7 + dayIdx) * 2654435761;
                      const activity = ((seed >>> 16) & 0xff) / 255;
                      const level = activity < 0.4 ? 0 : activity < 0.6 ? 1 : activity < 0.8 ? 2 : activity < 0.92 ? 3 : 4;
                      const colors = [
                        'bg-[rgba(237,234,227,0.03)]',
                        'bg-[#22D3AE]/20',
                        'bg-[#22D3AE]/35',
                        'bg-[#22D3AE]/55',
                        'bg-[#22D3AE]/80',
                      ];
                      return (
                        <div
                          key={dayIdx}
                          className={`w-[10px] h-[10px] rounded-[2px] ${colors[level]} transition-colors`}
                          title={`Week ${weekIdx + 1}, Day ${dayIdx + 1}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-mono text-[10px] text-[#EDEAE3]/20">Jan — Dec 2026</span>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[9px] text-[#EDEAE3]/20 mr-1">Less</span>
                  {[0, 1, 2, 3, 4].map(l => {
                    const colors = [
                      'bg-[rgba(237,234,227,0.03)]',
                      'bg-[#22D3AE]/20',
                      'bg-[#22D3AE]/35',
                      'bg-[#22D3AE]/55',
                      'bg-[#22D3AE]/80',
                    ];
                    return <div key={l} className={`w-[10px] h-[10px] rounded-[2px] ${colors[l]}`} />;
                  })}
                  <span className="font-mono text-[9px] text-[#EDEAE3]/20 ml-1">More</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ====== CONTACT — STRONG TYPOGRAPHY ====== */}
        <section id="contact" className="relative py-32 md:py-44 px-[6%] md:px-[8%]">
          <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(237,234,227,0.06)] to-transparent" />

          <Reveal>
            <div className="font-mono text-[11px] tracking-[4px] uppercase text-[#22D3AE]/60 mb-8">
              Contact
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#EDEAE3] mb-10">
              Build something.<br />
              <span className="text-[#E8854A]">Cut something.</span><br />
              Or both.
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex gap-8 flex-wrap font-mono text-[13px] mb-6">
              <a href="mailto:shoiebdurjoy@gmail.com" className="text-[#EDEAE3]/60 hover:text-[#E8854A] transition-colors duration-200 border-b border-transparent hover:border-[#E8854A]/30 pb-0.5">
                shoiebdurjoy@gmail.com
              </a>
              <a href="https://github.com/shoiebdurjoy" target="_blank" rel="noopener noreferrer" className="text-[#EDEAE3]/60 hover:text-[#22D3AE] transition-colors duration-200 border-b border-transparent hover:border-[#22D3AE]/30 pb-0.5">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/shoieb-durjoy-01a942234/" target="_blank" rel="noopener noreferrer" className="text-[#EDEAE3]/60 hover:text-[#22D3AE] transition-colors duration-200 border-b border-transparent hover:border-[#22D3AE]/30 pb-0.5">
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="font-sans text-[14px] text-[#EDEAE3]/25 max-w-md">
              Open to internships, collaborations, freelance editing work,
              and interesting conversations about AI, systems, or storytelling.
            </p>
          </Reveal>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="py-8 px-[6%] md:px-[8%] border-t border-[rgba(237,234,227,0.05)] flex flex-col md:flex-row justify-between gap-2 font-mono text-[10px] tracking-[2px] text-[#EDEAE3]/20 uppercase">
          <span>© 2026 Md Shoieb Hossain</span>
          <span>Designed & Built by Durjoy</span>
          <span>Dhaka, Bangladesh</span>
        </footer>
      </main>
    </>
  );
}
