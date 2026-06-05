import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ForegroundDust({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 120;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = 2 + Math.random() * 3;
      siz[i] = 0.05 + Math.random() * 0.08;
    }
    return { positions: pos, sizes: siz };
  }, []);

  const basePos = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    const t = performance.now() * 0.0002;
    const scroll = scrollRef.current * 0.00012;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = basePos[i3] + Math.sin(t + i) * 0.08;
      pos[i3 + 1] = basePos[i3 + 1] + Math.cos(t * 0.6 + i * 0.5) * 0.05 - scroll;
      pos[i3 + 2] = basePos[i3 + 2] + Math.sin(t * 0.3 + i * 0.3) * 0.04;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(positions), 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#6889ff"
        size={0.08}
        transparent
        opacity={0.06}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
