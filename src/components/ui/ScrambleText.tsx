'use client';

import { useEffect, useState } from 'react';
import { motion, MotionStyle } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: MotionStyle;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>?';

export default function ScrambleText({ text, className, style }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; // Controls speed of decryption
    }, 40);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span className={className} style={style}>
      {displayText}
    </motion.span>
  );
}
