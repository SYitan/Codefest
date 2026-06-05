import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function OrbitingObject({ pathRadius = 3.5, speed = 0.12, color = "#38bdf8" }: {
  pathRadius?: number; speed?: number; color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const angleRef = useRef(0);
  const trailRef = useRef<THREE.Points>(null!);
  const trailPositions = useRef<number[]>([]);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    angleRef.current += delta * speed;
    const tilt = 0.35;
    const a = angleRef.current;
    const x = pathRadius * Math.cos(a);
    const z = pathRadius * Math.sin(a) * Math.cos(tilt);
    const y = pathRadius * Math.sin(a) * Math.sin(tilt);
    groupRef.current.position.set(x, y, z);
    groupRef.current.lookAt(0, 0, 0);

    // Trail
    trailPositions.current.push(x, y, z);
    if (trailPositions.current.length > 90) {
      trailPositions.current = trailPositions.current.slice(-90);
    }
    if (trailRef.current) {
      const arr = new Float32Array(trailPositions.current);
      trailRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      trailRef.current.geometry.setDrawRange(0, arr.length / 3);
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <pointLight color={color} intensity={3} distance={0.8} />
      </group>
      <points ref={trailRef} frustumCulled>
        <bufferGeometry />
        <pointsMaterial color={color} transparent opacity={0.3} size={0.02} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}
