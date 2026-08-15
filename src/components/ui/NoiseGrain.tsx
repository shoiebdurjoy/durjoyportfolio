export default function NoiseGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] h-full w-full opacity-[0.035] mix-blend-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
