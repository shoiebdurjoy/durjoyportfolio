'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navigation from '@/src/components/Navigation';
import Hero from '@/src/components/Hero';
import AboutSection from '@/src/components/AboutSection';
import ProjectsSection from '@/src/components/ProjectsSection';
import TechStack from '@/src/components/TechStack';
import ThesisSection from '@/src/components/ThesisSection';
import VideoSection from '@/src/components/VideoSection';
import GitHubSection from '@/src/components/GitHubSection';
import ContactSection from '@/src/components/ContactSection';

const CommandPalette = dynamic(() => import('@/src/components/CommandPalette'), { ssr: false });
const Cursor = dynamic(() => import('@/src/components/ui/Cursor'), { ssr: false });
const CoreScene = dynamic(() => import('@/src/components/three/CoreScene'), { ssr: false });

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
      <CoreScene />
      <Cursor />
      <Navigation onCommandPaletteOpen={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <AboutSection />
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
