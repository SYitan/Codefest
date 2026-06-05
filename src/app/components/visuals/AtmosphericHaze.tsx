import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HazePlane({ color, z, maxOpacity, size }: {
  color: string; z: number; maxOpacity: number; size: [number, number];
}) {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color]);

  useFrame(() => {
    const t = performance.now() * 0.00008;
    const breathe = Math.sin(t) * 0.15 + 0.85;
    mat.opacity = maxOpacity * breathe;
  });

  return (
    <mesh position={[0, 0, z]} rotation={[-0.05, 0, 0]} material={mat}>
      <planeGeometry args={size} />
    </mesh>
  );
}

export function AtmosphericHaze({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const layers = useMemo(() => [
    // Far background - deep gradient
    { color: "#050a1a", z: -10, maxOpacity: 0.06, size: [30, 16] as [number, number] },
    // Mid-far atmosphere
    { color: "#0a1628", z: -6, maxOpacity: 0.04, size: [24, 12] as [number, number] },
    // Mid atmosphere
    { color: "#0d1f3c", z: -3, maxOpacity: 0.025, size: [20, 10] as [number, number] },
    // Near atmosphere
    { color: "#0d2b4a", z: 1, maxOpacity: 0.015, size: [18, 9] as [number, number] },
  ], []);

  useFrame(() => {
    const scroll = progressRef.current * 1.5;
    groupRef.current.position.y = -scroll * 0.5;
  });

  return (
    <group ref={groupRef}>
      {layers.map((l, i) => (
        <HazePlane key={i} {...l} />
      ))}
    </group>
  );
}
