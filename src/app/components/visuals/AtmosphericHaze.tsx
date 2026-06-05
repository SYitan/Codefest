import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HazePlane({ color, z, opacityScale, scrollSpeed, progressOffset }: {
  color: string; z: number; opacityScale: number; scrollSpeed: number; progressOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color]);

  useFrame((_, delta) => {
    const t = performance.now() * 0.0001;
    const breathe = Math.sin(t + progressOffset) * 0.3 + 0.7;
    mat.opacity = opacityScale * breathe;
  });

  return (
    <mesh ref={ref} position={[0, 0, z]} rotation={[-0.1, 0, 0]} material={mat}>
      <planeGeometry args={[18, 10]} />
    </mesh>
  );
}

export function AtmosphericHaze({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const layers = useMemo(() => [
    { color: "#0a1628", z: -5, opacityScale: 0.04, scrollSpeed: 0.02, progressOffset: 0 },
    { color: "#0d1f3c", z: -3, opacityScale: 0.03, scrollSpeed: 0.03, progressOffset: 1.5 },
    { color: "#1a0a2e", z: -1, opacityScale: 0.02, scrollSpeed: 0.04, progressOffset: 3 },
    { color: "#0d2b4a", z: -7, opacityScale: 0.035, scrollSpeed: 0.01, progressOffset: 0.8 },
  ], []);

  useFrame(() => {
    const scroll = progressRef.current * 2;
    groupRef.current.position.y = -scroll * 0.6;
  });

  return (
    <group ref={groupRef}>
      {layers.map((l, i) => (
        <HazePlane key={i} {...l} />
      ))}
    </group>
  );
}
