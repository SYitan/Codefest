import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createEarthTexture, createBumpMap, createSpecularMap } from "./createEarthTexture";

export function Globe({ radius = 2 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const textures = useMemo(() => {
    const mapCanvas = createEarthTexture();
    const mapTex = new THREE.CanvasTexture(mapCanvas);
    mapTex.wrapS = THREE.RepeatWrapping;
    mapTex.wrapT = THREE.ClampToEdgeWrapping;
    mapTex.anisotropy = 4;

    const bumpCanvas = createBumpMap();
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.wrapS = THREE.RepeatWrapping;
    bumpTex.wrapT = THREE.ClampToEdgeWrapping;

    const specCanvas = createSpecularMap();
    const specTex = new THREE.CanvasTexture(specCanvas);
    specTex.wrapS = THREE.RepeatWrapping;
    specTex.wrapT = THREE.ClampToEdgeWrapping;

    return { mapTex, bumpTex, specTex };
  }, []);

  useEffect(() => {
    return () => {
      textures.mapTex.dispose();
      textures.bumpTex.dispose();
      textures.specTex.dispose();
    };
  }, [textures]);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    meshRef.current.rotation.y += delta * 0.06;
  });

  return (
    <mesh ref={meshRef} frustumCulled>
      <sphereGeometry args={[radius, 96, 96]} />
      <meshPhongMaterial
        map={textures.mapTex}
        bumpMap={textures.bumpTex}
        bumpScale={0.03}
        specularMap={textures.specTex}
        specular={new THREE.Color("#444")}
        shininess={25}
      />
    </mesh>
  );
}
