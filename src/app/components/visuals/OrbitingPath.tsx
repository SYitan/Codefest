import { useMemo } from "react";
import * as THREE from "three";

export function OrbitingPath({ radius = 3.5, color = "#38bdf8", segments = 80 }: {
  radius?: number; color?: string; segments?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const tilt = 0.35;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.cos(tilt);
      const y = radius * Math.sin(theta) * Math.sin(tilt);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, segments]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <line geometry={geometry} frustumCulled>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
}
