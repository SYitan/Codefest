import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARM_COUNT = 4;
const PARTICLES_PER_ARM = 700;
const CORE_PARTICLES = 600;
const DUST_PARTICLES = 500;
const MAX_RADIUS = 5.5;
const TWIST = 6.5;
const ARM_WIDTH = 0.3;
const CORE_RADIUS = 0.5;

const PALETTE = [
  new THREE.Color("#4a0080"), // deep purple
  new THREE.Color("#7b00b0"), // violet
  new THREE.Color("#c400d0"), // magenta
  new THREE.Color("#ff00aa"), // hot pink
  new THREE.Color("#00ccff"), // cyan
  new THREE.Color("#00ff88"), // aurora green
];

function createSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.1, "rgba(255,255,255,0.8)");
  g.addColorStop(0.3, "rgba(200,180,255,0.3)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export function SpiralGalaxy({ progressRef }: { progressRef?: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const armsRef = useRef<THREE.Points>(null!);
  const coreRef = useRef<THREE.Points>(null!);
  const dustRef = useRef<THREE.Points>(null!);
  const coreGlowRef = useRef<THREE.Sprite>(null!);
  const timeRef = useRef(0);
  const sprite = useMemo(createSprite, []);

  const armData = useMemo(() => {
    const count = ARM_COUNT * PARTICLES_PER_ARM;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const off = new Float32Array(count);
    const tmpCol = new THREE.Color();

    for (let a = 0; a < ARM_COUNT; a++) {
      const armAngle = (a / ARM_COUNT) * Math.PI * 2;
      for (let p = 0; p < PARTICLES_PER_ARM; p++) {
        const i = a * PARTICLES_PER_ARM + p;
        const t = Math.pow(Math.random(), 0.6);
        const radius = CORE_RADIUS + t * (MAX_RADIUS - CORE_RADIUS);
        const angle = armAngle + t * TWIST + (Math.random() - 0.5) * ARM_WIDTH * (1 + t * 2);
        const spread = (Math.random() - 0.5) * 0.12 * (1 + t * 3);

        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = spread;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        const paletteT = (t + a / ARM_COUNT) % 1;
        const idx = Math.floor(paletteT * (PALETTE.length - 1));
        const frac = (paletteT * (PALETTE.length - 1)) - idx;
        tmpCol.copy(PALETTE[idx]).lerp(PALETTE[Math.min(idx + 1, PALETTE.length - 1)], frac);

        const bright = 0.4 + Math.random() * 0.6;
        const fade = 1 - t * 0.3;
        col[i * 3] = tmpCol.r * bright * fade;
        col[i * 3 + 1] = tmpCol.g * bright * fade;
        col[i * 3 + 2] = tmpCol.b * bright * fade;

        siz[i] = 0.015 + Math.random() * 0.035 * (1 - t * 0.2);
        off[i] = Math.random() * Math.PI * 2;
      }
    }
    return { pos, col, siz, off };
  }, []);

  const coreData = useMemo(() => {
    const pos = new Float32Array(CORE_PARTICLES * 3);
    const siz = new Float32Array(CORE_PARTICLES);
    for (let i = 0; i < CORE_PARTICLES; i++) {
      const r = Math.pow(Math.random(), 1.8) * CORE_RADIUS;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.3;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      siz[i] = 0.02 + Math.random() * 0.05;
    }
    return pos;
  }, []);

  const dustData = useMemo(() => {
    const pos = new Float32Array(DUST_PARTICLES * 3);
    const col = new Float32Array(DUST_PARTICLES * 3);
    for (let i = 0; i < DUST_PARTICLES; i++) {
      const r = 1.5 + Math.random() * 7;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 3;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const b = 0.04 + Math.random() * 0.06;
      col[i * 3] = c.r * b;
      col[i * 3 + 1] = c.g * b;
      col[i * 3 + 2] = c.b * b;
    }
    return { pos, col };
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    timeRef.current += delta;
    const t = timeRef.current;

    const progress = progressRef?.current ?? 0;
    const scrollRotate = progress * 0.8;
    groupRef.current.rotation.y += delta * (0.03 + progress * 0.02);
    groupRef.current.rotation.x = Math.sin(t * 0.04) * (0.02 + progress * 0.03);
    const orbitY = Math.sin(scrollRotate) * 0.2;
    const orbitX = Math.cos(scrollRotate) * 0.15;
    groupRef.current.position.x = orbitX;
    groupRef.current.position.z = -0.5 + orbitY;

    if (armsRef.current) {
      const sizes = armsRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < armData.pos.length / 3; i++) {
        sizes[i] = armData.siz[i] * (0.6 + Math.sin(t * 0.6 + armData.off[i]) * 0.4);
      }
      armsRef.current.geometry.attributes.size.needsUpdate = true;
    }

    if (coreRef.current) {
      const sizes = coreRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < CORE_PARTICLES; i++) {
        sizes[i] = coreData[i] * (0.7 + Math.sin(t * 0.4 + i * 0.1) * 0.3);
      }
      coreRef.current.geometry.attributes.size.needsUpdate = true;
    }

    if (coreGlowRef.current) {
      const pulse = Math.sin(t * 0.25) * 0.12 + 0.88;
      const s = 0.6 + pulse * 0.3;
      coreGlowRef.current.scale.setScalar(s);
      (coreGlowRef.current.material as THREE.SpriteMaterial).opacity = pulse * 0.12;
    }

    if (dustRef.current) {
      const pos = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST_PARTICLES; i++) {
        const i3 = i * 3;
        pos[i3] += Math.sin(t * 0.015 + i * 0.01) * 0.0002;
        pos[i3 + 1] += Math.cos(t * 0.012 + i * 0.02) * 0.00015;
        pos[i3 + 2] += Math.sin(t * 0.01 + i * 0.015) * 0.0002;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <sprite ref={coreGlowRef} scale={[0.6, 0.6, 1]}>
        <spriteMaterial
          map={sprite}
          color="#cc88ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      <points ref={armsRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[armData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[armData.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(armData.pos.length / 3), 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.035}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      <points ref={coreRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(coreData), 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(CORE_PARTICLES), 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          color="#e0c0ff"
          size={0.04}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={dustRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustData.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.12}
          transparent
          opacity={0.1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
    </group>
  );
}
