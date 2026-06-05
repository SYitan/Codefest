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
  g.addColorStop(0.1, "rgba(200,220,255,0.6)");
  g.addColorStop(0.4, "rgba(100,150,255,0.15)");
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
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 0.6 + Math.random() * 0.3;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    const progress = progressRef.current;
    const intensity = Math.max(0, (progress - 0.78) / 0.22);

    const t = performance.now() * 0.0005;

    // Position: scrolls into view at the bottom
    const targetY = -4 + intensity * 0.3;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;
    groupRef.current.position.x = 0;

    // Glow sprite
    if (glowRef.current) {
      const s = 0.5 + intensity * 1.5;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.SpriteMaterial).opacity = intensity * 0.15;
    }

    // Orbiting ring particles
    if (ringRef.current) {
      const pos = ringRef.current.geometry.attributes.position.array as Float32Array;
      const count = pos.length / 3;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + t + i * 0.05;
        const r = 0.6 + Math.sin(t * 0.3 + i) * 0.1;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = Math.sin(a) * r * 0.6;
      }
      ringRef.current.geometry.attributes.position.needsUpdate = true;
      (ringRef.current.material as THREE.PointsMaterial).opacity = intensity * 0.3;
      const s = 0.03 + intensity * 0.04;
      (ringRef.current.material as THREE.PointsMaterial).size = s;
    }
  });

  return (
    <group ref={groupRef} position={[0, -4, -1]}>
      {/* Central glow */}
      <sprite ref={glowRef} scale={[0.5, 0.5, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color="#88bbff"
        />
      </sprite>

      {/* Orbiting ring */}
      <points ref={ringRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(ringPositions), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60a5fa"
          size={0.03}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner glow field */}
      <group>
        {[0, 1, 2].map((i) => (
          <sprite
            key={i}
            position={[
              Math.cos(i * 2.1) * 0.4,
              Math.sin(i * 2.1) * 0.4,
              (Math.random() - 0.5) * 0.3,
            ]}
            scale={[0.15, 0.15, 1]}
          >
            <spriteMaterial
              map={glowTex}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              color={["#38bdf8", "#818cf8", "#a78bfa"][i]}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
