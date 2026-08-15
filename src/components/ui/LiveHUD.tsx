'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LiveHUD() {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Dhaka (UTC+6)
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setTime(now.toLocaleTimeString('en-US', options) + ' BDT');
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-difference">
      {/* Bottom Right: Live Dhaka Time */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-1 font-mono text-[10px] tracking-[3px] text-[#F8FAFC]/70 uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#00F2C3] animate-[pulse_2s_ease-in-out_infinite]" />
          <span>DHAKA HQ</span>
        </div>
        <div className="text-[#F8FAFC] font-bold">{time}</div>
      </motion.div>

      {/* Bottom Left: System Status */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-col items-start gap-1 font-mono text-[10px] tracking-[3px] text-[#F8FAFC]/70 uppercase"
      >
        <div>SYS.OP // DURJOY_OS v2.0</div>
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          <span className="text-[#F59E0B]">ONLINE_</span>
        </div>
      </motion.div>


      {/* Cinematic Frame Borders (subtle) */}
      <div className="absolute inset-0 border-[1px] border-[rgba(248,250,252,0.03)] m-4 md:m-6 pointer-events-none rounded-xl" />
    </div>
  );
}
