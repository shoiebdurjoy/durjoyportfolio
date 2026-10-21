'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Cut-out portrait whose head breaks out of the accent circle; tilts toward the cursor.
export default function Portrait() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative mx-auto max-w-[420px]"
      >
        <div className="relative aspect-[5/6] [container-type:inline-size]">
          <motion.div
            aria-hidden
            className="absolute left-[2%] top-[21.7%] aspect-square w-[96%] rounded-full border border-dashed border-ink/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute bottom-0 left-[4%] aspect-square w-[92%] overflow-hidden rounded-full bg-accent shadow-[0_40px_80px_-30px_rgba(18,18,16,0.5)]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'radial-gradient(90% 70% at 30% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)' }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                'radial-gradient(circle 46cqw at 50% calc(100% - 46cqw), #000 99.5%, transparent 100%), linear-gradient(#000, #000)',
              maskSize: '100% 100%, 64% calc(100% - 46cqw)',
              maskPosition: '0 0, 50% 0',
              maskRepeat: 'no-repeat',
              WebkitMaskImage:
                'radial-gradient(circle 46cqw at 50% calc(100% - 46cqw), #000 99.5%, transparent 100%), linear-gradient(#000, #000)',
              WebkitMaskSize: '100% 100%, 64% calc(100% - 46cqw)',
              WebkitMaskPosition: '0 0, 50% 0',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <Image
              src="/durjoy-portrait-3.webp"
              alt="Md Shoieb Hossain (Durjoy)"
              width={358}
              height={722}
              className="absolute left-[19%] top-[5%] h-auto w-[70%] max-w-none drop-shadow-[0_24px_30px_rgba(18,18,16,0.3)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
