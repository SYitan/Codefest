import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(200,220,255,0.5)");
  g.addColorStop(0.5, "rgba(100,150,255,0.1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export function ForegroundLayer({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null!);
  const count = 30;
  const sprite = useMemo(createSprite, []);

  const base = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = 3 + Math.random() * 2;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    const t = performance.now() * 0.00015;
    const progress = progressRef.current;
    const visible = Math.floor(count * Math.min(progress * 1.5, 1));

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < visible; i++) {
      const i3 = i * 3;
      pos[i3] = base[i3] + Math.sin(t + i * 0.3) * 0.2;
      pos[i3 + 1] = base[i3 + 1] + Math.cos(t * 0.7 + i * 0.2) * 0.15;
      pos[i3 + 2] = base[i3 + 2] + Math.sin(t * 0.3 + i * 0.15) * 0.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.setDrawRange(0, visible);
    (ref.current.material as THREE.PointsMaterial).opacity = 0.02 + Math.min(progress * 1.2, 1) * 0.04;
  });

  return (
    <points ref={ref} frustumCulled>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(base), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color="#88bbff"
        size={0.3}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
