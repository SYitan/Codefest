import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createEarthTexture } from "./createEarthTexture";

export function Globe({ radius = 2 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const texture = useMemo(() => {
    const canvas = createEarthTexture();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    tex.anisotropy = 4;
    return tex;
  }, []);

  useEffect(() => {
    return () => { texture.dispose(); };
  }, [texture]);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={meshRef} frustumCulled>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhongMaterial
        map={texture}
        specular={new THREE.Color("#222")}
        shininess={15}
      />
    </mesh>
  );
}
