'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Command = {
  id: string;
  label: string;
  group: string;
  icon: string;
  action?: () => void;
  url?: string;
  keywords?: string;
};

const commands: Command[] = [
  // Navigation
  { id: 'about', label: 'About', group: 'Navigation', icon: '→', action: () => { document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); } },
  { id: 'work', label: 'Work', group: 'Navigation', icon: '→', action: () => { document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); } },
  { id: 'stack', label: 'Tech Stack', group: 'Navigation', icon: '→', action: () => { document.querySelector('#stack')?.scrollIntoView({ behavior: 'smooth' }); } },
  { id: 'cutting-room', label: 'The Cutting Room', group: 'Navigation', icon: '→', action: () => { document.querySelector('#cutting-room')?.scrollIntoView({ behavior: 'smooth' }); } },
  { id: 'github-section', label: 'GitHub Activity', group: 'Navigation', icon: '→', action: () => { document.querySelector('#github')?.scrollIntoView({ behavior: 'smooth' }); } },
  { id: 'contact', label: 'Contact', group: 'Navigation', icon: '→', action: () => { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); } },
  // Projects
  { id: 'durjoyai', label: 'DurjoyAI', group: 'Projects', icon: '◆', keywords: 'ai assistant alexa typescript' },
  { id: 'emergon', label: 'EMERGON', group: 'Projects', icon: '◆', keywords: 'emergency flask react' },
  { id: 'lowkeybd', label: 'LowKeyBD', group: 'Projects', icon: '◆', keywords: 'next nest typescript' },
  { id: 'thesis', label: 'Bangla Emotion Recognition', group: 'Projects', icon: '◆', keywords: 'pytorch thesis ml' },
  { id: 'gamecritic', label: 'Game-Critic', group: 'Projects', icon: '◆', keywords: 'game review' },
  // Quick Actions
  { id: 'hire', label: 'Hire Me', group: 'Quick Actions', icon: '⚡', action: () => { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); } },
  { id: 'source', label: 'View Source Code', group: 'Quick Actions', icon: '💻', url: 'https://github.com/shoiebdurjoy' },
  // External
  { id: 'github', label: 'GitHub Profile', group: 'External', icon: '↗', url: 'https://github.com/shoiebdurjoy' },
  { id: 'linkedin', label: 'LinkedIn', group: 'External', icon: '↗', url: 'https://www.linkedin.com/in/shoieb-durjoy-01a942234/' },
  { id: 'email', label: 'Email', group: 'External', icon: '↗', url: 'mailto:shoiebdurjoy@gmail.com' },
];

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open with Cmd/Ctrl+K handled typically by parent, but we handle the close with Escape
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter((cmd) => {
      return (
        cmd.label.toLowerCase().includes(lowerQuery) ||
        cmd.keywords?.toLowerCase().includes(lowerQuery) ||
        cmd.group.toLowerCase().includes(lowerQuery)
      );
    });
  }, [query]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.group]) groups[cmd.group] = [];
      groups[cmd.group].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        handleSelect(selected);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (cmd: Command) => {
    if (cmd.action) {
      cmd.action();
    } else if (cmd.url) {
      window.open(cmd.url, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20%] pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-xl bg-[#131920] rounded-xl border border-[rgba(237,234,227,0.08)] shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center px-4 py-4 border-b border-[rgba(237,234,227,0.08)]">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search commands..."
                  className="w-full bg-transparent border-none outline-none font-mono text-[#EDEAE3] placeholder-[rgba(237,234,227,0.4)] text-sm"
                  aria-label="Command palette search"
                />
                <div className="flex items-center justify-center px-2 py-1 rounded bg-[rgba(237,234,227,0.04)] border border-[rgba(237,234,227,0.08)] ml-4 shrink-0">
                  <span className="font-mono text-[10px] text-[rgba(237,234,227,0.5)]">⌘K</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto py-2 overscroll-contain">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center font-mono text-sm text-[rgba(237,234,227,0.4)]">
                    No results found
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([group, groupCommands]) => (
                    <div key={group} className="mb-2">
                      <div className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-[rgba(237,234,227,0.4)]">
                        {group}
                      </div>
                      <div className="px-2">
                        {groupCommands.map((cmd) => {
                          const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                          const isActive = globalIndex === selectedIndex;
                          return (
                            <button
                              key={cmd.id}
                              onClick={() => handleSelect(cmd)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-colors relative group ${
                                isActive ? 'bg-[rgba(237,234,227,0.04)] text-[#22D3AE]' : 'text-[#EDEAE3] hover:bg-[rgba(237,234,227,0.02)]'
                              }`}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="command-active"
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#22D3AE] rounded-r-full"
                                />
                              )}
                              <span className={`font-mono text-sm mr-3 ${isActive ? 'text-[#22D3AE]' : 'text-[rgba(237,234,227,0.4)]'}`}>
                                {cmd.icon}
                              </span>
                              <span className="font-sans text-sm">{cmd.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
