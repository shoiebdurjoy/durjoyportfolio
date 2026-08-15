'use client';

import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-[20px] h-[32px] rounded-full border border-[rgba(237,234,227,0.3)] flex justify-center p-1 relative">
        <div className="w-1 h-2 bg-[#22D3AE] rounded-full animate-bounce" style={{ animationDuration: '1.5s' }} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[2px] text-[rgba(237,234,227,0.4)]">
        scroll
      </span>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(12px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}} />
    </div>
  );
}
