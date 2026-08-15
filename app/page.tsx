'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/src/components/Navigation';
import CommandPalette from '@/src/components/CommandPalette';
import HeroSplit from '@/src/components/hero/HeroSplit';
import AboutSection from '@/src/components/AboutSection';
import TechStack from '@/src/components/TechStack';
import ProjectsSection from '@/src/components/ProjectsSection';
import ThesisSection from '@/src/components/ThesisSection';
import VideoSection from '@/src/components/VideoSection';
import GitHubSection from '@/src/components/GitHubSection';
import ContactSection from '@/src/components/ContactSection';
import LiveHUD from '@/src/components/ui/LiveHUD';
export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090C] text-[#EDEAE3] selection:bg-[#F59E0B] selection:text-[#07090C] overflow-x-hidden">
      {/* Fixed Navigation Bar */}
      <Navigation onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />

      {/* Premium Live HUD Overlay */}
      <LiveHUD />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <main className="w-full">
        {/* 1. Hero: Interactive BUILD ↔ CUT (B&W to Full Color) */}
        <HeroSplit />

        {/* 2. About & Statistics Cards */}
        <AboutSection />

        {/* 3. Tech Stack: Interactive Marquee with Project Context Tooltips */}
        <TechStack />

        {/* 4. Selected Work: Featured DurjoyAI with Case Study Modal & Grid */}
        <ProjectsSection />

        {/* 5. Thesis: Interactive Deep Learning Research Pipeline */}
        <ThesisSection />

        {/* 6. The Cutting Room: Dedicated Video Editing & Agency Showcase */}
        <VideoSection />

        {/* 7. Open Source: Live GitHub Activity & Contribution Heatmap */}
        <GitHubSection />

        {/* 8. Contact & Minimal Editorial Footer */}
        <ContactSection />
      </main>
    </div>
  );
}
