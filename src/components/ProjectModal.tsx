'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export type ProjectDetails = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  accentColor: 'teal' | 'gold' | 'orange';
  overview: string;
  architecture: {
    title: string;
    flow: string[];
    details: string;
  };
  features: string[];
  stack: string[];
  github?: string;
  liveDemo?: string;
  screenshots: {
    title: string;
    description: string;
  }[];
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectDetails | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'screenshots'>('overview');
  const [currentScreenshotIdx, setCurrentScreenshotIdx] = useState(0);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
      setCurrentScreenshotIdx(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#07090C]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0D1117] border border-[rgba(237,234,227,0.12)] rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(237,234,227,0.08)] bg-[#131920]/80">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-[#F59E0B] mb-1">
                <span>{project.category}</span>
                <span>•</span>
                <span>Case Study</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#EDEAE3]">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[rgba(237,234,227,0.15)] flex items-center justify-center text-[#EDEAE3]/60 hover:text-white hover:border-[#EDEAE3] transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[rgba(237,234,227,0.08)] px-6 bg-[#0D1117]">
            {(['overview', 'architecture', 'screenshots'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 font-mono text-[11px] uppercase tracking-[1.5px] border-b-2 transition-all capitalize ${
                  activeTab === tab
                    ? 'border-[#F59E0B] text-[#F59E0B] font-semibold'
                    : 'border-transparent text-[#EDEAE3]/40 hover:text-[#EDEAE3]/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-[#EDEAE3]/40 mb-2">
                    Project Overview
                  </h3>
                  <p className="font-sans text-[15px] leading-[1.75] text-[#EDEAE3]/80">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-[#EDEAE3]/40 mb-3">
                    Key Features & Capabilities
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {project.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded bg-[#131920]/60 border border-[rgba(237,234,227,0.06)] font-sans text-[13px] text-[#EDEAE3]/80"
                      >
                        <span className="text-[#F59E0B] mt-0.5">◆</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-[#EDEAE3]/40 mb-2.5">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-3 py-1 rounded bg-[#131920] border border-[rgba(237,234,227,0.1)] text-[#EDEAE3]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-[#F59E0B] mb-2">
                    System Architecture Diagram
                  </h3>
                  <div className="p-5 rounded-lg border border-[#F59E0B]/20 bg-[#131920]/80 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[12px]">
                      {project.architecture.flow.map((node, i) => (
                        <div key={node} className="flex items-center gap-2">
                          <span className="px-3 py-1.5 rounded bg-[#0D1117] border border-[#F59E0B]/40 text-[#EDEAE3] font-semibold">
                            {node}
                          </span>
                          {i < project.architecture.flow.length - 1 && (
                            <span className="text-[#F59E0B]">──►</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="font-sans text-[14px] leading-[1.7] text-[#EDEAE3]/75 border-t border-[rgba(237,234,227,0.06)] pt-4">
                      {project.architecture.details}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'screenshots' && (
              <div className="space-y-6">
                {/* Screenshot Display / Placeholder Frame */}
                <div className="relative aspect-video rounded-lg border border-[rgba(237,234,227,0.12)] bg-[#131920] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[#F59E0B]/50 flex items-center justify-center text-[#F59E0B] mb-3">
                    📸
                  </div>
                  <div className="font-mono text-[13px] text-[#EDEAE3] font-semibold mb-1">
                    {project.screenshots[currentScreenshotIdx]?.title || 'Project Screenshot Slot'}
                  </div>
                  <p className="font-sans text-[12px] text-[#EDEAE3]/50 max-w-md">
                    {project.screenshots[currentScreenshotIdx]?.description ||
                      'Ready to display real screenshot asset when provided.'}
                  </p>
                  <div className="mt-4 px-3 py-1 rounded bg-[#0D1117] border border-[#F59E0B]/30 font-mono text-[10px] text-[#F59E0B]">
                    [ Screenshot Slot #{currentScreenshotIdx + 1} of {project.screenshots.length} ]
                  </div>
                </div>

                {/* Screenshot Thumbnails / Selector */}
                <div className="flex gap-3">
                  {project.screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentScreenshotIdx(idx)}
                      className={`flex-1 p-3 rounded border text-left transition-all ${
                        currentScreenshotIdx === idx
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10'
                          : 'border-[rgba(237,234,227,0.08)] bg-[#131920]/60 hover:border-[rgba(237,234,227,0.2)]'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-[#EDEAE3]/40 mb-1">
                        View 0{idx + 1}
                      </div>
                      <div className="font-sans text-[12px] font-medium text-[#EDEAE3] truncate">
                        {s.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Links */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(237,234,227,0.08)] bg-[#131920]/90">
            <div className="font-mono text-[11px] text-[#EDEAE3]/40">
              Durjoy Portfolio // Case Study System
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded border border-[rgba(237,234,227,0.15)] font-mono text-[11px] text-[#EDEAE3] hover:border-[#22D3AE] hover:text-[#22D3AE] transition-colors"
                >
                  GitHub Repository ↗
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-[#F59E0B] text-[#07090C] font-mono text-[11px] font-bold hover:bg-[#F59E0B]/90 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
