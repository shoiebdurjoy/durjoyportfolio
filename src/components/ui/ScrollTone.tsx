'use client';

import { useEffect } from 'react';

// Sections opt in with data-tone="dark". The target tone is how much of the middle of the
// viewport dark sections cover; the applied tone eases toward it every frame while scrolling.
function toneAtCentre() {
  const h = window.innerHeight;
  const top = h * 0.2;
  const bottom = h * 0.8;
  let dark = 0;
  document.querySelectorAll<HTMLElement>('[data-tone="dark"]').forEach((el) => {
    const r = el.getBoundingClientRect();
    dark += Math.max(0, Math.min(bottom, r.bottom) - Math.max(top, r.top));
  });
  const t = Math.min(1, dark / (bottom - top));
  return t * t * (3 - 2 * t);
}

// Fades the fixed dark backdrop (opacity only, no restyle) so the page colour moves with the
// scroll, and flips the palette once per crossing (animated in CSS), with hysteresis.
export default function ScrollTone() {
  useEffect(() => {
    const root = document.documentElement;
    const layer = document.getElementById('tone-layer');
    const meta = document.querySelector('meta[name="theme-color"]');
    let raf = 0;
    let current = toneAtCentre();
    let dark = current > 0.5;
    let last = performance.now();

    // Swap the palette block by block. Blocks on screen fade (CSS transition); off-screen blocks
    // switch instantly, so a swap only restyles what the visitor can actually see.
    const setDark = (value: boolean, animate: boolean) => {
      const h = window.innerHeight;
      const blocks = [...document.querySelectorAll<HTMLElement>('main > *'), document.querySelector<HTMLElement>('header')];
      const instant: HTMLElement[] = [];
      for (const el of blocks) {
        if (!el || el.classList.contains('tone-dark') === value) continue;
        const r = el.getBoundingClientRect();
        if (!animate || r.bottom < 0 || r.top > h) {
          el.classList.add('tone-instant');
          instant.push(el);
        }
        el.classList.toggle('tone-dark', value);
      }
      if (instant.length) requestAnimationFrame(() => instant.forEach((el) => el.classList.remove('tone-instant')));
      meta?.setAttribute('content', value ? '#0C0C0B' : '#F5F3EE');
    };

    const apply = () => {
      if (layer) layer.style.opacity = current.toFixed(3);
      const next = dark ? current > 0.4 : current > 0.6;
      if (next !== dark) {
        dark = next;
        setDark(dark, true);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = toneAtCentre();
      current += (target - current) * (1 - Math.exp(-dt * 7));
      if (Math.abs(target - current) < 0.003) current = target;
      apply();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    // Hand over from the first-paint class to per-block classes without animating.
    setDark(dark, false);
    root.classList.remove('tone-boot');
    apply();
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
