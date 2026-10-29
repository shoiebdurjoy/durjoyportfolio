import { getImageProps } from 'next/image';
import type { Certificate, CertificateProof } from '@/src/data/content';

export const GRID_SIZES = '(min-width:1024px) 340px, (min-width:768px) 45vw, 92vw';
export const VIEWER_SIZES = '(min-width:1024px) 780px, 92vw';

// Never show a low-resolution photo larger than it really is: unoptimised images cap at their own
// width (and 560px), optimised ones at 780px.
export function viewerCap(image: NonNullable<Certificate['image']>) {
  return image.optimize ? 780 : Math.min(560, image.width);
}

// Fetch the large viewer variant on hover/focus so it's cached before the viewer opens.
const warmed = new Set<string>();
export function warmCertificate(cert: Certificate) {
  const img = cert.image;
  if (!img || warmed.has(cert.id) || typeof window === 'undefined') return;
  warmed.add(cert.id);
  if (!img.optimize) {
    new window.Image().src = img.src;
    return;
  }
  const { props } = getImageProps({ src: img.src, width: img.width, height: img.height, sizes: VIEWER_SIZES, alt: '' });
  const pre = new window.Image();
  if (props.sizes) pre.sizes = props.sizes;
  if (props.srcSet) pre.srcset = props.srcSet;
  pre.src = props.src;
}

const chip = 'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-mono text-[10px] uppercase tracking-[0.16em]';

export function ProofChip({ proof }: { proof: CertificateProof }) {
  if (proof === 'verifiable') {
    return (
      <span className={`${chip} bg-sage text-ink`}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        Verifiable online
      </span>
    );
  }
  if (proof === 'photo') return <span className={`${chip} border border-line bg-paper text-ink-soft`}>Photo of original</span>;
  return <span className={`${chip} border border-dashed border-ink/25 text-muted`}>Scan to be added</span>;
}
