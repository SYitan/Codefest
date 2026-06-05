import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DeepStarField({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  const geometry = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dist = 15 + Math.random() * 35;
      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.cos(phi);
      positions[i * 3 + 2] = dist * Math.sin(phi) * Math.sin(theta);

      const temp = Math.random();
      if (temp < 0.3) {
        colors[i * 3] = 0.8; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1.0;
      } else if (temp < 0.6) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.9;
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.7;
      }

      const sizeFactor = 1 - (dist - 15) / 35;
      sizes[i] = (0.03 + Math.random() * 0.1) * sizeFactor;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, []);

  useFrame(() => {
    groupRef.current.position.y = scrollRef.current * -0.006;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
