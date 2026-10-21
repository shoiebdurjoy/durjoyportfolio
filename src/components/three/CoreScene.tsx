'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Component, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import { persona } from '@/src/lib/persona';

const { damp, lerp, smoothstep } = THREE.MathUtils;

const BUILD = new THREE.Color('#FF5A24');
const CUT = new THREE.Color('#BFCBE8');
const INK = new THREE.Color('#121210');
const SNOW = new THREE.Color('#F4F2ED');
const RIG_RADIUS = 2.15; // outer edge of the rings, used to fit the rig to its DOM anchor
const CUBES = 32;
const FRAMES = 40;

type Target = { x: number; y: number; size: number };

// The rig follows `[data-core]` elements in the page. Between two anchors it eases from one to the
// next as the viewport centre passes them; `data-core="hide"` anchors shrink it away.
function anchorTarget(): Target | null {
  const mid = window.innerHeight / 2;
  const anchors: Target[] = [];
  document.querySelectorAll<HTMLElement>('[data-core]').forEach((el) => {
    const r = el.getBoundingClientRect();
    const hide = el.dataset.core === 'hide';
    if (!hide && r.width === 0 && r.height === 0) return; // display:none at this breakpoint
    anchors.push({ x: r.left + r.width / 2, y: r.top + r.height / 2, size: hide ? 0 : r.width });
  });
  if (!anchors.length) return null;
  const next = anchors.findIndex((a) => a.y > mid);
  if (next === 0) return anchors[0];
  if (next === -1) return anchors[anchors.length - 1];
  const a = anchors[next - 1];
  const b = anchors[next];
  const t = smoothstep((mid - a.y) / (b.y - a.y), 0.2, 0.8);
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), size: lerp(a.size, b.size, t) };
}

function darkAtCentre() {
  const mid = window.innerHeight / 2;
  for (const el of document.querySelectorAll<HTMLElement>('[data-theme]')) {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) return el.dataset.theme === 'dark' ? 1 : 0;
  }
  return 0;
}

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Rig({ lite, still }: { lite: boolean; still: boolean }) {
  const rig = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const coreMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const shell = useRef<THREE.LineSegments>(null!);
  const shellMat = useRef<THREE.LineBasicMaterial>(null!);
  const cubes = useRef<THREE.InstancedMesh>(null!);
  const cubeRing = useRef<THREE.Group>(null!);
  const film = useRef<THREE.Group>(null!);
  const frames = useRef<THREE.InstancedMesh>(null!);
  const frameMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const dust = useRef<THREE.Points>(null!);
  const dustMat = useRef<THREE.PointsMaterial>(null!);
  const pointer = useRef({ x: 0, y: 0 });
  const live = useRef({ build: 1, dark: 1, spin: 0, lastY: 0, px: 0, py: 0 });

  const shellGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.45, 1)), []);
  const dustPositions = useMemo(() => {
    const rand = seeded(7);
    const n = lite ? 220 : 520;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (rand() - 0.5) * 20;
      arr[i * 3 + 1] = (rand() - 0.5) * 12;
      arr[i * 3 + 2] = -rand() * 8 + 1.5;
    }
    return arr;
  }, [lite]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    live.current.lastY = window.scrollY;
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Object3D();
    for (let i = 0; i < CUBES; i++) {
      const a = (i / CUBES) * Math.PI * 2;
      m.position.set(Math.cos(a) * 1.95, Math.sin(a * 3) * 0.09, Math.sin(a) * 1.95);
      m.rotation.set(a, a * 2, 0);
      m.scale.setScalar(0.55 + ((i * 37) % 10) / 14);
      m.updateMatrix();
      cubes.current.setMatrixAt(i, m.matrix);
    }
    cubes.current.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < FRAMES; i++) {
      const a = (i / FRAMES) * Math.PI * 2;
      m.position.set(Math.cos(a) * 2.05, 0, Math.sin(a) * 2.05);
      m.rotation.set(0, Math.PI / 2 - a, 0);
      m.scale.setScalar(1);
      m.updateMatrix();
      frames.current.setMatrixAt(i, m.matrix);
    }
    frames.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, dt) => {
    const s = live.current;
    const { width: vw, height: vh } = state.viewport;
    const { width: W, height: H } = state.size;

    const target = anchorTarget();
    if (target) {
      rig.current.position.x = damp(rig.current.position.x, (target.x / W - 0.5) * vw, 5, dt);
      rig.current.position.y = damp(rig.current.position.y, (0.5 - target.y / H) * vh, 9, dt);
      const scale = damp(rig.current.scale.x, ((target.size / W) * vw) / (RIG_RADIUS * 2), 4, dt);
      rig.current.scale.setScalar(Math.max(scale, 0.0001));
      rig.current.visible = scale > 0.01;
    }

    s.build = damp(s.build, persona.get() === 'build' ? 1 : 0, 3, dt);
    s.dark = damp(s.dark, darkAtCentre(), 3, dt);

    coreMat.current.color.lerpColors(CUT, BUILD, s.build);
    coreMat.current.metalness = lerp(0.85, 0.4, s.build);
    shellMat.current.color.lerpColors(INK, SNOW, s.dark);
    shellMat.current.opacity = 0.16 + 0.24 * s.dark;
    cubeRing.current.scale.setScalar(Math.max(s.build, 0.0001));
    film.current.scale.setScalar(0.8 + 0.2 * (1 - s.build));
    frameMat.current.opacity = 0.18 + 0.6 * (1 - s.build);
    dustMat.current.color.lerpColors(INK, SNOW, s.dark);
    dustMat.current.opacity = 0.1 + 0.45 * s.dark;

    const y = window.scrollY;
    s.spin = damp(s.spin, Math.min(Math.abs(y - s.lastY) * 0.03, 3), 6, dt);
    s.lastY = y;
    const speed = still ? 0 : 1;
    core.current.rotation.y += dt * (0.25 + s.spin) * speed;
    core.current.rotation.x += dt * 0.1 * speed;
    shell.current.rotation.y -= dt * (0.12 + s.spin * 0.5) * speed;
    cubes.current.rotation.y += dt * (0.45 + s.spin) * speed;
    film.current.rotation.y -= dt * (0.3 + s.spin) * speed;
    dust.current.rotation.y += dt * 0.012 * speed;

    s.px = damp(s.px, pointer.current.x, 3, dt);
    s.py = damp(s.py, pointer.current.y, 3, dt);
    rig.current.rotation.set(s.py * 0.35, s.px * 0.5, 0);
    dust.current.position.set(-s.px * 0.25, s.py * 0.15, 0);
  });

  return (
    <>
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -1]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={4} color="#FF7A45" position={[-5, 1, 1]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={3} color="#7AA2FF" position={[5, -1, 1]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={1} position={[0, 0, -6]} scale={[10, 10, 1]} />
        <Lightformer form="ring" intensity={1.5} position={[0, 0, 6]} scale={4} />
      </Environment>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />

      <group ref={rig} scale={0.0001}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            ref={coreMat}
            flatShading
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={1}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[120, 680]}
            envMapIntensity={1.3}
          />
        </mesh>
        <lineSegments ref={shell} geometry={shellGeo}>
          <lineBasicMaterial ref={shellMat} transparent depthWrite={false} />
        </lineSegments>

        <group ref={cubeRing} rotation={[1.1, 0, 0.25]}>
          <instancedMesh ref={cubes} args={[undefined, undefined, CUBES]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshPhysicalMaterial color="#F4F2ED" metalness={0.9} roughness={0.2} clearcoat={1} />
          </instancedMesh>
        </group>

        <group rotation={[-0.4, 0, -0.55]}>
          <group ref={film}>
            <instancedMesh ref={frames} args={[undefined, undefined, FRAMES]}>
              <boxGeometry args={[0.24, 0.15, 0.012]} />
              <meshPhysicalMaterial ref={frameMat} color="#FFFFFF" transparent roughness={0.2} metalness={0.2} depthWrite={false} />
            </instancedMesh>
            {[0.11, -0.11].map((off) => (
              <mesh key={off} position={[0, off, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.05, 0.008, 6, 128]} />
                <meshStandardMaterial color="#FF5A24" emissive="#FF5A24" emissiveIntensity={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={dustMat} size={0.03} sizeAttenuation transparent depthWrite={false} />
      </points>
    </>
  );
}

// WebGL can be unavailable (old GPUs, blocked contexts); the page must still work without the scene.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function CoreScene() {
  const lite = useMemo(() => window.matchMedia('(max-width: 767px)').matches, []);
  const still = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <SceneBoundary>
        <Canvas
          dpr={[1, lite ? 1.5 : 1.75]}
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Rig lite={lite} still={still} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
