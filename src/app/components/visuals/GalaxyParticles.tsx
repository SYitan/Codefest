import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GalaxyParticles({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const rotRef = useRef(0);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 12000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const arm = i % 3;
      const dist = Math.random() * 6 + 0.3;
      const angle = dist * 1.8 + arm * (Math.PI * 2 / 3) + (Math.random() - 0.5) * 0.4;
      const spread = (Math.random() - 0.5) * 0.25 * (dist + 0.5);

      pos[i * 3] = Math.cos(angle) * dist + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (0.2 + dist * 0.06);
      pos[i * 3 + 2] = Math.sin(angle) * dist + spread;

      const t = Math.min(dist / 6.5, 1);
      const brightness = 0.5 + Math.random() * 0.5;
      col[i * 3] = (0.4 + t * 0.3) * brightness;
      col[i * 3 + 1] = (0.3 + t * 0.35) * brightness;
      col[i * 3 + 2] = (0.7 + t * 0.1) * brightness;

      siz[i] = (0.03 + Math.random() * 0.08) * (1 + dist * 0.05);
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    rotRef.current += delta * 0.015;
    groupRef.current.rotation.y = rotRef.current;
    groupRef.current.position.y = scrollRef.current * -0.0015;
  });

  return (
    <group ref={groupRef} frustumCulled>
      <points geometry={geometry} frustumCulled>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
