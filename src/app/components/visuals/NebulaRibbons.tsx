import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = [
  { r: 0.15, g: 0.25, b: 0.55 },
  { r: 0.2, g: 0.1, b: 0.4 },
  { r: 0.1, g: 0.3, b: 0.45 },
];

function NebulaRibbon({ color, offset }: { color: typeof COLORS[0]; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 8 }, (_, i) => {
        const t = i / 7;
        return new THREE.Vector3(
          (Math.sin(t * Math.PI * 2 + offset) * 3) + (Math.random() - 0.5) * 2,
          Math.sin(t * Math.PI + offset * 0.5) * 1.5,
          t * 5 - 2.5
        );
      })
    );
    return new THREE.TubeGeometry(curve, 48, 0.06 + Math.random() * 0.04, 6, false);
  }, []);

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(color.r, color.g, color.b),
    transparent: true,
    opacity: 0.04,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [color.r, color.g, color.b]);

  useFrame(() => {
    const t = performance.now() * 0.0002 + offset;
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.15;
    ref.current.position.y = Math.sin(t * 0.08) * 0.2;
    mat.opacity = 0.03 + Math.sin(t * 0.1) * 0.015;
  });

  return <mesh ref={ref} geometry={geo} material={mat} frustumCulled />;
}

export function NebulaRibbons({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    groupRef.current.position.y = -(scrollRef.current * 0.00006);
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {COLORS.map((c, i) => (
        <NebulaRibbon key={i} color={c} offset={i * 2.1} />
      ))}
    </group>
  );
}
