'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectModal, { type ProjectDetails } from './ProjectModal';

const featuredProject: ProjectDetails = {
  id: 'durjoyai',
  title: 'DurjoyAI — Multi-LLM Voice Assistant',
  tagline: 'Amazon Alexa voice integration + multi-provider LLM orchestration with persistent Brain-0 memory context.',
  category: 'Featured // Artificial Intelligence',
  accentColor: 'gold',
  overview:
    'DurjoyAI is an intelligent personal AI assistant engineered with custom Amazon Alexa voice command integration, multi-model failover (OpenAI, Google Gemini, OpenRouter), and a persistent context architecture ("Brain 0"). Designed to execute automated PC scripts, process multimodal queries, and maintain long-term memory across voice sessions.',
  architecture: {
    title: 'Distributed Voice & LLM Architecture',
    flow: ['User Voice Command', 'Alexa Skill / Webhook', 'FastAPI Gateway', 'Multi-LLM Engine', 'Brain-0 Memory Context', 'PC Execution'],
    details:
      'Voice queries received via Amazon Alexa custom skills are dispatched through an authenticated webhook into a containerized FastAPI gateway. The gateway queries the Brain 0 profile database, routes to the optimal LLM dynamically, and triggers local script executions.',
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
    { title: 'Voice Architecture Pipeline', description: 'Real-time telemetry and command routing interface.' },
    { title: 'Brain 0 Memory Context Engine', description: 'Persistent context retention and owner-profile data storage.' },
    { title: 'Multi-Model Provider Gateway', description: 'Dynamic failover between OpenAI, Gemini, and OpenRouter backends.' },
  ],
};

const allProjects: ProjectDetails[] = [
  {
    id: 'lowkeybd',
    title: 'LowKeyBD',
    tagline: 'Scalable full-stack platform built with Next.js and enterprise NestJS microservices.',
    category: 'Full-Stack // Platform',
    accentColor: 'teal',
    overview:
      'A full-stack ecosystem built using Next.js on the frontend and NestJS with PostgreSQL on the backend. Designed with high-concurrency capabilities, search infrastructure, session caching with Redis, and modular service separation.',
    architecture: {
      title: 'Full-Stack Microservice Pipeline',
      flow: ['Next.js Client', 'NestJS API Gateway', 'PostgreSQL DB', 'Redis Cache', 'Meilisearch'],
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
      { title: 'Platform Dashboard', description: 'Main user feed and discovery layout.' },
      { title: 'NestJS Microservices Architecture', description: 'Backend REST API schema and relation models.' },
    ],
  },
  {
    id: 'emergon',
    title: 'EMERGON — Smart Emergency Dispatch',
    tagline: 'Real-time emergency coordination platform with automated risk triage and WebSocket alerts.',
    category: 'Systems // Emergency AI',
    accentColor: 'teal',
    overview:
      'EMERGON is a full-stack emergency response coordination platform. Built with Flask and React, featuring real-time WebSocket alert dispatch, PostgreSQL audit logs, and AI risk-flagging to prioritize critical medical and rescue calls.',
    architecture: {
      title: 'Real-time Emergency Dispatch Architecture',
      flow: ['SOS Event', 'Flask Gateway', 'Socket.IO Server', 'PostgreSQL Logs', 'Responder Map'],
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
      { title: 'Incident Response Live Feed', description: 'Real-time emergency unit locator and alert map.' },
      { title: 'AI Triage Severity Engine', description: 'Automated urgency score and report triage view.' },
    ],
  },
  {
    id: 'gamecritic',
    title: 'Game-Critic Platform',
    tagline: 'Community video game review platform with dynamic scoring and user authentication.',
    category: 'Full-Stack // Community',
    accentColor: 'teal',
    overview:
      'Game-Critic is a community-driven game rating and review platform. Built with a React frontend and Node.js/Express backend with MongoDB, offering user authentication, review aggregation, and dynamic rating calculations.',
    architecture: {
      title: 'Review Aggregation Stack',
      flow: ['React Frontend', 'Express REST API', 'JWT Security', 'MongoDB Cluster'],
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
      className="relative py-28 md:py-40 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(248,250,252,0.08)] mb-16"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#00F2C3] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2C3]" />
              02 // Proof of Craft
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-[1.05] text-[#F8FAFC]">
              Selected Systems &<br />
              <span className="text-[#00F2C3] italic font-normal">Architectures.</span>
            </h2>
          </div>
          <p className="font-sans text-[14px] text-[#F8FAFC]/50 max-w-xs">
            Interactive case studies, real-world microservices, and open source repositories.
          </p>
        </motion.div>

        {/* 1. HERO FEATURED PROJECT — DURJOYAI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="p-8 md:p-12 rounded-xl bg-[#0C1017] border border-[#F59E0B]/30 hover:border-[#F59E0B] shadow-[0_0_35px_rgba(245,158,11,0.08)] hover:shadow-[0_0_50px_rgba(245,158,11,0.18)] transition-all duration-500 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/40 font-mono text-[10px] uppercase tracking-[2px] text-[#F59E0B] font-bold">
                  ★ FLAGSHIP AI SYSTEM
                </span>
                <span className="font-mono text-[11px] text-[#F8FAFC]/40">Production Assistant</span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-black text-[#F8FAFC] leading-tight">
                {featuredProject.title}
              </h3>

              <p className="font-sans text-[15px] leading-[1.75] text-[#F8FAFC]/75">
                {featuredProject.overview}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 pt-1">
                {featuredProject.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-3 py-1 rounded bg-[#111722] border border-[rgba(248,250,252,0.08)] text-[#F8FAFC]/85"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-3">
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="px-5 py-2.5 rounded bg-[#F59E0B] text-[#06080B] font-mono text-[12px] font-bold hover:bg-[#F59E0B]/90 transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer"
                >
                  Explore Architecture Case Study →
                </button>
                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded border border-[rgba(248,250,252,0.15)] font-mono text-[12px] text-[#F8FAFC] hover:border-[#00F2C3] hover:text-[#00F2C3] transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Simulated Interactive Terminal */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setSelectedProject(featuredProject)}
                className="p-6 rounded-lg bg-[#06080B] border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all cursor-pointer space-y-4 font-mono text-[12px]"
              >
                <div className="flex items-center justify-between border-b border-[rgba(248,250,252,0.08)] pb-3 text-[#F8FAFC]/40 text-[10px]">
                  <span>DURJOY_AI_DAEMON // V2.4</span>
                  <span className="text-[#00F2C3]">● ACTIVE_LISTENING</span>
                </div>

                <div className="space-y-2 text-[11px] leading-[1.6]">
                  <div>
                    <span className="text-[#F59E0B]">&gt;</span> <span className="text-[#F8FAFC]/60">INPUT:</span> <span className="text-[#F8FAFC]">&quot;Alexa, initialize workspace protocol&quot;</span>
                  </div>
                  <div className="text-[#00F2C3]/80 pl-3">
                    ✔ Intent Classified: [PC_CONTROL_AUTOMATION]
                  </div>
                  <div className="text-[#F8FAFC]/50 pl-3">
                    ✔ Context Queried: [Brain-0 Persistent Memory]
                  </div>
                  <div className="text-[#F8FAFC]/50 pl-3">
                    ✔ Dispatch Time: &lt;14ms · Model: Multi-LLM
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(248,250,252,0.08)] flex items-center justify-between text-[10px] text-[#F59E0B]">
                  <span>CLICK TO VIEW SYSTEM DIAGRAM</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. SECONDARY PROJECTS — ELEGANT EDITORIAL ROWS */}
        <div className="space-y-4">
          {allProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-xl bg-[#0C1017]/80 border border-[rgba(248,250,252,0.08)] hover:border-[#00F2C3]/40 hover:bg-[#0C1017] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#00F2C3] font-bold">0{idx + 2}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#F8FAFC]/40">
                    {project.category}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#F8FAFC] group-hover:text-[#00F2C3] transition-colors">
                  {project.title}
                </h4>
                <p className="font-sans text-[13px] text-[#F8FAFC]/65 leading-[1.6]">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111722] text-[#F8FAFC]/70 border border-[rgba(248,250,252,0.06)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 rounded bg-[#111722] hover:bg-[#00F2C3] hover:text-[#06080B] border border-[rgba(248,250,252,0.1)] hover:border-[#00F2C3] font-mono text-[11px] font-semibold text-[#F8FAFC] transition-all cursor-pointer"
                >
                  Case Study →
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded border border-[rgba(248,250,252,0.1)] text-[#F8FAFC]/50 hover:text-[#F8FAFC] hover:border-[rgba(248,250,252,0.3)] transition-colors"
                    title="View GitHub Repository"
                  >
                    ↗
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
