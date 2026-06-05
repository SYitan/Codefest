import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = [
  new THREE.Color("#0a1628"),
  new THREE.Color("#0d1f3c"),
  new THREE.Color("#0d2b4a"),
  new THREE.Color("#1a0a2e"),
  new THREE.Color("#0f1a30"),
];

export function GalaxyAtmosphere({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 1200;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 1.2;
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      pos[i * 3 + 1] = spread * 1.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;

      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const bright = 0.15 + Math.random() * 0.15;
      col[i * 3] = c.r * bright;
      col[i * 3 + 1] = c.g * bright;
      col[i * 3 + 2] = c.b * bright;

      siz[i] = 0.15 + Math.random() * 0.4;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    const t = performance.now() * 0.00004;
    const scroll = scrollRef.current * 0.00004;
    ref.current.rotation.y = t * 0.1;
    ref.current.position.y = -scroll * 0.2;
  });

  return (
    <points ref={ref} position={[0, 0, -6]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}
