'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectModal, { type ProjectDetails } from './ProjectModal';

const featuredProject: ProjectDetails = {
  id: 'durjoyai',
  title: 'DurjoyAI — Intelligent Modular Assistant',
  tagline: 'Alexa voice skill + multi-LLM orchestration engine with persistent Brain-0 memory context.',
  category: 'Featured // AI & Systems',
  accentColor: 'gold',
  overview:
    'DurjoyAI is an advanced personal AI assistant engineered with custom Alexa voice command skills, multi-provider LLM integrations (OpenAI, Gemini, OpenRouter), and a persistent context architecture ("Brain 0"). Built to execute local PC tasks, process multimodal queries, and maintain long-term memory across sessions.',
  architecture: {
    title: 'Distributed Assistant Architecture',
    flow: ['Voice / Input', 'Alexa Skill / Webhook', 'FastAPI Dispatcher', 'Multi-LLM Provider', 'Brain 0 Memory', 'PC Action Exec'],
    details:
      'Incoming voice commands are parsed via Amazon Alexa custom skills and forwarded through a secure webhook into a containerized FastAPI gateway. The dispatcher selects optimal LLM models dynamically, queries the Brain 0 memory profile, and returns actionable responses or triggers local PC control scripts.',
  },
  features: [
    'Custom Amazon Alexa voice skill for hands-free command dispatch',
    'Multi-provider LLM failover (OpenAI, Google Gemini, OpenRouter)',
    'Persistent "Brain 0" memory context for long-term profile state',
    'Containerized deployment using Docker for reproducible environments',
  ],
  stack: ['TypeScript', 'Python', 'Docker', 'FastAPI', 'OpenAI API', 'Alexa Skills Kit'],
  github: 'https://github.com/shoiebdurjoy/DurjoyAI',
  screenshots: [
    { title: 'DurjoyAI Voice Architecture', description: 'Real-time pipeline from Alexa skill voice input to LLM response execution.' },
    { title: 'Brain 0 Memory Context Engine', description: 'Persistent context retention and owner-profile data storage system.' },
    { title: 'Multi-Model Provider Gateway', description: 'Dynamic routing between OpenAI, Gemini, and OpenRouter backends.' },
  ],
};

const secondaryProjects: ProjectDetails[] = [
  {
    id: 'lowkeybd',
    title: 'LowKeyBD',
    tagline: 'Scalable full-stack web platform built with Next.js and enterprise NestJS microservices.',
    category: 'Full-Stack // Platform',
    accentColor: 'teal',
    overview:
      'A full-stack ecosystem built using Next.js on the frontend and NestJS with PostgreSQL on the backend. Designed with high-concurrency capabilities, search infrastructure, session caching with Redis, and modular service separation.',
    architecture: {
      title: 'Full-Stack Microservice Pipeline',
      flow: ['Next.js App', 'NestJS API Gateway', 'PostgreSQL', 'Redis Cache', 'Meilisearch'],
      details:
        'Frontend SSR/SSG queries the NestJS gateway over typed REST and WebSocket connections. Cached responses are served via Redis with full-text search handled by Meilisearch.',
    },
    features: [
      'Type-safe end-to-end architecture with TypeScript across client and server',
      'High-performance database indexing and relation modeling with PostgreSQL',
      'In-memory session and cache management powered by Redis',
      'Modern responsive design system with sub-second page transitions',
    ],
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/shoiebdurjoy/lowkeybd',
    screenshots: [
      { title: 'LowKeyBD Main Interface', description: 'User dashboard and search discovery interface.' },
      { title: 'NestJS API Controller & Schema', description: 'Backend service architecture and database schemas.' },
    ],
  },
  {
    id: 'emergon',
    title: 'EMERGON — Smart Emergency System',
    tagline: 'Real-time emergency coordination platform with automated risk triage and WebSocket alerts.',
    category: 'Full-Stack // Emergency AI',
    accentColor: 'teal',
    overview:
      'EMERGON is a full-stack emergency response coordination platform. Built with Flask and React, featuring real-time WebSocket alert dispatch, PostgreSQL audit logs, and AI risk-flagging to prioritize critical medical and rescue calls.',
    architecture: {
      title: 'Real-time Emergency Dispatch Architecture',
      flow: ['SOS Trigger', 'Flask REST API', 'Socket.IO Server', 'PostgreSQL Audit', 'Responder Dashboard'],
      details:
        'When an emergency trigger occurs, the platform calculates location coordinates, assigns priority scores via AI triage algorithms, and broadcasts WebSocket alerts to emergency responder dispatchers.',
    },
    features: [
      'Instant real-time event broadcasting using WebSockets (Socket.IO)',
      'Automated priority and severity triage based on incoming report metadata',
      'Location tracking and responsive emergency responder coordination map',
      'Secure PostgreSQL relational storage for incident history and auditing',
    ],
    stack: ['Flask', 'React', 'PostgreSQL', 'Socket.IO', 'Python', 'Tailwind CSS'],
    screenshots: [
      { title: 'Responder Live Map', description: 'Real-time incident dispatch and active unit tracking.' },
      { title: 'AI Triage & Severity Index', description: 'Automated urgency scoring and report breakdown.' },
    ],
  },
  {
    id: 'gamecritic',
    title: 'Game-Critic',
    tagline: 'Full-stack video game review platform with community scoring and user authentication.',
    category: 'Full-Stack // Web App',
    accentColor: 'teal',
    overview:
      'Game-Critic is a community-driven game rating and review platform. Built with a React frontend and Node.js/Express backend with MongoDB, offering user authentication, review aggregation, and dynamic rating calculations.',
    architecture: {
      title: 'Review Aggregation Stack',
      flow: ['React Client', 'Express REST API', 'JWT Auth', 'MongoDB Database'],
      details:
        'Users can search games, submit formatted reviews, and view weighted rating scores computed across community entries.',
    },
    features: [
      'Secure JWT-based user authentication and role management',
      'Dynamic rating aggregation and sorting algorithms',
      'Search and filter by genres, release year, and platforms',
      'Responsive interface optimized for desktop and mobile devices',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
    github: 'https://github.com/shoiebdurjoy/Game-Critic',
    screenshots: [
      { title: 'Game Discovery Feed', description: 'Aggregated reviews, rating distributions, and genre filters.' },
      { title: 'Review Submission Modal', description: 'Interactive community scoring and markdown review interface.' },
    ],
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-24 md:py-36 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#22D3AE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE]" />
            Selected Work // Software & AI
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3]">
              Systems I have built.
            </h2>
            <p className="font-sans text-[14px] text-[#EDEAE3]/50 max-w-sm">
              Explore live architectures, code repositories, and interactive case studies.
            </p>
          </div>
        </motion.div>

        {/* 1. FEATURED PROJECT (DurjoyAI) — Dominant Hero Card with Gold Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="group relative rounded-xl border border-[#F59E0B]/30 bg-[#0D1117] hover:border-[#F59E0B] shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:shadow-[0_0_40px_rgba(245,158,11,0.18)] transition-all duration-500 overflow-hidden mb-8"
        >
          {/* Subtle Ambient Gold Glow Inside Card */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#F59E0B]/[0.03] rounded-full blur-[100px] pointer-events-none" />

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Project Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 font-mono text-[10px] uppercase tracking-[2px] text-[#F59E0B] font-bold">
                  ★ FEATURED SYSTEM
                </span>
                <span className="font-mono text-[11px] text-[#EDEAE3]/40">AI / Personal Project</span>
              </div>

              <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.05] text-[#EDEAE3]">
                {featuredProject.title}
              </h3>

              <p className="font-sans text-[15px] leading-[1.75] text-[#EDEAE3]/75 max-w-xl">
                {featuredProject.overview}
              </p>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {featuredProject.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-3 py-1 rounded bg-[#131920] border border-[rgba(237,234,227,0.1)] text-[#EDEAE3]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="px-5 py-2.5 rounded bg-[#F59E0B] text-[#07090C] font-mono text-[12px] font-bold hover:bg-[#F59E0B]/90 transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer"
                >
                  View Case Study & Architecture →
                </button>
                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded border border-[rgba(237,234,227,0.15)] font-mono text-[12px] text-[#EDEAE3] hover:border-[#22D3AE] hover:text-[#22D3AE] transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>

            {/* Visual Preview / Placeholder Mockup Frame */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setSelectedProject(featuredProject)}
                className="relative aspect-[4/3] rounded-lg border border-[#F59E0B]/25 bg-[#131920] flex flex-col items-center justify-center p-6 text-center cursor-pointer group-hover:border-[#F59E0B]/60 transition-colors"
              >
                <div className="w-14 h-14 rounded-full border border-dashed border-[#F59E0B]/60 flex items-center justify-center text-[#F59E0B] text-xl mb-3">
                  ⚡
                </div>
                <div className="font-mono text-[13px] font-bold text-[#EDEAE3] mb-1">
                  DurjoyAI System Architecture
                </div>
                <div className="font-mono text-[11px] text-[#F59E0B]/80 mb-3">
                  Alexa Skill ──► Brain 0 Engine
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[1px] px-3 py-1 rounded bg-[#0D1117] border border-[#F59E0B]/30 text-[#EDEAE3]/70">
                  Click to Explore Case Study
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. SECONDARY PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-xl border border-[rgba(237,234,227,0.08)] bg-[#0D1117]/80 hover:border-[#22D3AE]/40 hover:shadow-[0_0_25px_rgba(34,211,174,0.08)] transition-all duration-300 flex flex-col justify-between p-6 md:p-7 overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-[#22D3AE]">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#EDEAE3]/30">0{idx + 2}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#EDEAE3] group-hover:text-[#22D3AE] transition-colors">
                  {project.title}
                </h3>

                <p className="font-sans text-[13px] leading-[1.65] text-[#EDEAE3]/65">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#131920] border border-[rgba(237,234,227,0.08)] text-[#EDEAE3]/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="font-mono text-[10px] px-2 py-0.5 text-[#EDEAE3]/40">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(237,234,227,0.06)] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-mono text-[11px] text-[#22D3AE] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Case Study <span>→</span>
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-[#EDEAE3]/50 hover:text-[#EDEAE3] transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
