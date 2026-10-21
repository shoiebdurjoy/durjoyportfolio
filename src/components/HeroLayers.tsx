'use client';

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Persona } from '@/src/lib/persona';

const ease = [0.16, 1, 0.3, 1] as const;

const code = [
  [['k', 'async def '], ['f', 'route'], ['p', '(query):']],
  [['p', '  model = '], ['f', 'pick_model'], ['p', '(query)']],
  [['p', '  ctx = brain0.'], ['f', 'recall'], ['p', '(query.user)']],
  [['k', '  return await '], ['p', 'model.'], ['f', 'run'], ['p', '(query, ctx)']],
  [['c', '# dispatch <14ms · multi-LLM failover']],
] as const;

const tone: Record<string, string> = { k: 'text-[#C084FC]', f: 'text-[#FF7A45]', p: 'text-[#D4D4D4]', c: 'text-[#6B7280]' };

function Chrome({ title, right }: { title: string; right?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.07] px-3.5 py-2.5">
      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
      <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      <span className="ml-2 font-mono text-[10px] text-white/50">{title}</span>
      {right && <span className="ml-auto font-mono text-[10px] text-white/35">{right}</span>}
    </div>
  );
}

function Editor() {
  const [chars, setChars] = useState(0);
  const total = code.reduce((n, line) => n + line.reduce((m, [, t]) => m + t.length, 0), 0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = setTimeout(() => setChars(total), 0);
      return () => clearTimeout(id);
    }
    const id = setInterval(() => setChars((c) => (c >= total + 40 ? 0 : c + 1)), 45);
    return () => clearInterval(id);
  }, [total]);

  // Reveal the code character by character; the caret sits on the line being typed.
  const lengths = code.map((line) => line.reduce((m, [, t]) => m + t.length, 0));
  const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));
  const lines = code.map((line, i) => ({ line, typed: Math.max(0, Math.min(lengths[i], chars - starts[i])) }));
  const pending = lines.findIndex((l, i) => l.typed < lengths[i]);
  const caretLine = pending === -1 ? lines.length - 1 : pending;

  return (
    <>
      <Chrome title="gateway.py — DurjoyAI" right="Python" />
      <div className="flex gap-4 px-4 py-3.5 font-mono text-[12px] leading-[1.75]">
        <div className="select-none text-right text-white/20">{code.map((_, i) => <div key={i}>{i + 1}</div>)}</div>
        <div className="min-w-0 whitespace-pre">
          {lines.map(({ line, typed }, i) => {
            const offsets = line.map((_, j) => line.slice(0, j).reduce((m, [, t]) => m + t.length, 0));
            return (
              <div key={i}>
                {line.map(([k, t], j) => (
                  <span key={j} className={tone[k]}>{t.slice(0, Math.max(0, typed - offsets[j]))}</span>
                ))}
                {i === caretLine && <span className="ml-px inline-block h-3.5 w-[7px] translate-y-0.5 animate-blink bg-[#FF7A45]" />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function TimelinePanel() {
  return (
    <>
      <Chrome title="Commercial_v12 — Timeline" right="00:00:14:08" />
      <div className="relative px-3.5 py-3">
        <div className="mb-2 flex justify-between pl-8 font-mono text-[9px] text-white/30">
          {['00:00', '00:05', '00:10', '00:15', '00:20'].map((t) => <span key={t}>{t}</span>)}
        </div>
        {[
          ['V2', [['8%', '22%', '#8B5CF6'], ['46%', '18%', '#8B5CF6']]],
          ['V1', [['0%', '38%', '#FF5A24'], ['39%', '27%', '#FF5A24'], ['67%', '33%', '#FF5A24']]],
          ['A1', [['0%', '92%', '#22C55E']]],
        ].map(([track, clips]) => (
          <div key={track as string} className="mb-1.5 flex items-center gap-2">
            <span className="w-6 font-mono text-[9px] text-white/40">{track as string}</span>
            <div className="relative h-6 flex-1 rounded-[4px] bg-white/[0.04]">
              {(clips as string[][]).map(([l, w, c]) => (
                <div key={l} className="absolute inset-y-0 overflow-hidden rounded-[4px]" style={{ left: l, width: w, background: `${c}55`, boxShadow: `inset 0 0 0 1px ${c}` }}>
                  {track === 'A1' && (
                    <div className="flex h-full items-center gap-[2px] px-1">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <span key={i} className="w-[2px] rounded-full bg-[#22C55E]" style={{ height: `${20 + ((i * 53) % 70)}%` }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <motion.div
          className="pointer-events-none absolute bottom-2 top-7 w-px bg-[#4DA3FF] shadow-[0_0_8px_#4DA3FF]"
          initial={{ left: '18%' }}
          animate={{ left: ['18%', '92%', '18%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </>
  );
}

function Monitor() {
  return (
    <>
      <Chrome title="Program: Commercial_v12" right="4K · 24fps" />
      <div className="p-3">
        <div className="relative aspect-video overflow-hidden rounded-md" style={{ background: 'linear-gradient(160deg,#FFB38A 0%,#FF5A24 38%,#3B1A33 72%,#0E0B14 100%)' }}>
          <div className="absolute inset-x-0 bottom-[22%] h-[30%]" style={{ background: 'linear-gradient(180deg,transparent,rgba(10,6,12,0.85))' }} />
          <div className="absolute left-[12%] bottom-[18%] h-[38%] w-[7%] rounded-t-full bg-[#0E0B14]" />
          <div className="absolute left-[24%] bottom-[18%] h-[26%] w-[5%] rounded-t-full bg-[#0E0B14]" />
          <div className="absolute inset-x-0 top-0 h-[10%] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[10%] bg-black" />
          <span className="absolute right-[4%] top-[14%] flex items-center gap-1 font-mono text-[9px] text-white/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3B30]" /> REC
          </span>
          <span className="absolute bottom-[14%] left-[4%] font-mono text-[9px] text-white/80">01:00:14:08</span>
        </div>
      </div>
    </>
  );
}

// Three tools from the two crafts, exploded into depth. The active persona's panel comes forward.
// `settle` runs 0 → 1 as the hero intro plays: panels start tipped back and spread apart, then
// swing upright and close up.
export default function HeroLayers({ mode, settle }: { mode: Persona; settle: MotionValue<number> }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [16, 4]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-30, -14]), { stiffness: 80, damping: 20 });
  const spread = useTransform(settle, [0, 1], [1.7, 1]);
  const tilt = useTransform(settle, [0, 1], [34, 0]);
  const turn = useTransform(settle, [0, 1], [10, 0]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  const build = mode === 'build';
  const zEditor = useTransform(spread, (s) => (build ? 90 : -10) * s);
  const zTimeline = useTransform(spread, (s) => (build ? 10 : 110) * s);
  const zMonitor = useTransform(spread, (s) => -110 * s);
  const panel = 'absolute overflow-hidden rounded-xl border border-white/10 bg-[#141416]/95 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]';

  return (
    <div className="relative h-full w-full" style={{ perspective: 1600 }}>
      <motion.div className="relative h-full w-full" style={{ rotateX: tilt, rotateZ: turn, transformStyle: 'preserve-3d' }}>
      <motion.div className="relative h-full w-full" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        <motion.div className={`${panel} left-[22%] top-[2%] w-[70%]`} style={{ z: zMonitor }}>
          <Monitor />
        </motion.div>
        <motion.div
          className={`${panel} left-[2%] top-[30%] w-[72%] transition-[border-color] duration-700 ${build ? 'border-[#FF7A45]/40' : ''}`}
          style={{ z: zEditor }}
          animate={{ opacity: build ? 1 : 0.72 }}
          transition={{ duration: 0.6, ease }}
        >
          <Editor />
        </motion.div>
        <motion.div
          className={`${panel} left-[16%] top-[63%] w-[80%] transition-[border-color] duration-700 ${!build ? 'border-[#4DA3FF]/40' : ''}`}
          style={{ z: zTimeline }}
          animate={{ opacity: build ? 0.72 : 1 }}
          transition={{ duration: 0.6, ease }}
        >
          <TimelinePanel />
        </motion.div>
      </motion.div>
      </motion.div>
    </div>
  );
}
