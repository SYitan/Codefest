import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.1, "rgba(200,220,255,0.4)");
  g.addColorStop(0.35, "rgba(100,150,255,0.1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function CoreEnergy({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Sprite>(null!);
  const ringRef = useRef<THREE.Points>(null!);
  const glowTex = useMemo(createGlowTexture, []);

  const ringPositions = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    const progress = progressRef.current;
    const intensity = Math.max(0, (progress - 0.82) / 0.18);
    const t = performance.now() * 0.0004;

    const targetY = -3.5 + intensity * 0.2;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;

    if (glowRef.current) {
      const s = 0.4 + intensity * 1.2;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.SpriteMaterial).opacity = intensity * 0.12;
    }

    if (ringRef.current) {
      const pos = ringRef.current.geometry.attributes.position.array as Float32Array;
      const count = pos.length / 3;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + t;
        const r = 0.5 + Math.sin(t * 0.25 + i * 0.1) * 0.08;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = Math.sin(a) * r * 0.7;
      }
      ringRef.current.geometry.attributes.position.needsUpdate = true;
      (ringRef.current.material as THREE.PointsMaterial).opacity = intensity * 0.2;
      (ringRef.current.material as THREE.PointsMaterial).size = 0.02 + intensity * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.5, -0.5]}>
      <sprite ref={glowRef} scale={[0.4, 0.4, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color="#88bbff"
        />
      </sprite>
      <points ref={ringRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(ringPositions), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60a5fa"
          size={0.02}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
