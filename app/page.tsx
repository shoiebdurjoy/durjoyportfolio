'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navigation from '@/src/components/Navigation';
import ScrollTone from '@/src/components/ui/ScrollTone';
import Timeline from '@/src/components/Timeline';
import Hero from '@/src/components/Hero';
import AboutSection from '@/src/components/AboutSection';
import ProjectsSection from '@/src/components/ProjectsSection';
import TechStack from '@/src/components/TechStack';
import ThesisSection from '@/src/components/ThesisSection';
import VideoSection from '@/src/components/VideoSection';
import GitHubSection from '@/src/components/GitHubSection';
import ContactSection from '@/src/components/ContactSection';

const CommandPalette = dynamic(() => import('@/src/components/CommandPalette'), { ssr: false });

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollTone />
      <Navigation onCommandPaletteOpen={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <AboutSection />
        <Timeline />
        <ProjectsSection />
        <TechStack />
        <ThesisSection />
        <VideoSection />
        <GitHubSection />
        <ContactSection />
      </main>
      {paletteOpen && <CommandPalette onClose={closePalette} />}
    </MotionConfig>
  );
}
