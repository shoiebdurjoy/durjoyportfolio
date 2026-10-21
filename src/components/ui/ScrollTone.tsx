'use client';

import { useEffect } from 'react';

// Light and dark ends of the palette, as RGB triplets.
const LIGHT = {
  paper: [245, 243, 238],
  card: [255, 255, 255],
  ink: [18, 18, 16],
  'ink-soft': [58, 57, 52],
  muted: [119, 117, 109],
  line: [227, 224, 216],
  'accent-soft': [255, 230, 219],
};
const DARK = {
  paper: [12, 12, 11],
  card: [24, 24, 22],
  ink: [243, 241, 236],
  'ink-soft': [198, 195, 187],
  muted: [140, 138, 131],
  line: [40, 39, 36],
  'accent-soft': [58, 28, 18],
};

// Sections opt in with data-tone="dark". The target tone is how much of the middle of the
// viewport dark sections cover; the applied tone eases toward it so colours glide rather than snap.
function toneAtCentre() {
  const h = window.innerHeight;
  const top = h * 0.15;
  const bottom = h * 0.85;
  let dark = 0;
  document.querySelectorAll<HTMLElement>('[data-tone="dark"]').forEach((el) => {
    const r = el.getBoundingClientRect();
    dark += Math.max(0, Math.min(bottom, r.bottom) - Math.max(top, r.top));
  });
  const t = Math.min(1, dark / (bottom - top));
  return t * t * (3 - 2 * t); // smoothstep
}

export default function ScrollTone() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let current = toneAtCentre();
    let applied = -1;
    let last = performance.now();

    const paint = (t: number) => {
      root.style.setProperty('--tone', t.toFixed(3));
      for (const key of Object.keys(LIGHT) as (keyof typeof LIGHT)[]) {
        const [r, g, b] = LIGHT[key].map((v, i) => Math.round(v + (DARK[key][i] - v) * t));
        root.style.setProperty(`--color-${key}`, `rgb(${r} ${g} ${b})`);
      }
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t > 0.5 ? '#0C0C0B' : '#F5F3EE');
      applied = t;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = toneAtCentre();
      current += (target - current) * (1 - Math.exp(-dt * 6));
      if (Math.abs(target - current) < 0.002) current = target;
      if (Math.abs(current - applied) >= 0.004 || (current === target && current !== applied)) paint(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    paint(current);
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
    };
  }, []);

  return null;
}
