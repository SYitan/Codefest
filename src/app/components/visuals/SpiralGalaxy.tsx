import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARM_COUNT = 4;
const ARM_PARTICLES = 600;
const DISK_PARTICLES = 800;
const JET_PARTICLES = 200;
const DUST_PARTICLES = 400;
const MAX_RADIUS = 5.0;
const TWIST = 7.0;
const ARM_WIDTH = 0.25;

function createSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.08, "rgba(255,255,255,0.9)");
  g.addColorStop(0.25, "rgba(200,180,255,0.4)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function SpiralGalaxy({ progressRef }: { progressRef?: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const armsRef = useRef<THREE.Points>(null!);
  const diskRef = useRef<THREE.Points>(null!);
  const jetRef = useRef<THREE.Points>(null!);
  const dustRef = useRef<THREE.Points>(null!);
  const coreGlowRef = useRef<THREE.Sprite>(null!);
  const timeRef = useRef(0);
  const sprite = useMemo(createSprite, []);

  const armData = useMemo(() => {
    const count = ARM_COUNT * ARM_PARTICLES;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const off = new Float32Array(count);
    for (let a = 0; a < ARM_COUNT; a++) {
      const armAngle = (a / ARM_COUNT) * Math.PI * 2;
      for (let p = 0; p < ARM_PARTICLES; p++) {
        const i = a * ARM_PARTICLES + p;
        const t = Math.pow(Math.random(), 0.5);
        const radius = 0.8 + t * (MAX_RADIUS - 0.8);
        const angle = armAngle + t * TWIST + (Math.random() - 0.5) * ARM_WIDTH * (1 + t * 2);
        const spread = (Math.random() - 0.5) * 0.08 * (1 + t * 2.5);
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = spread;
        pos[i * 3 + 2] = Math.sin(angle) * radius;
        const bright = 0.3 + Math.random() * 0.7;
        const fade = Math.max(0, 1 - t * 0.35);
        const r = (0.8 - t * 0.3 + 0.5 * Math.sin(t * 3 + a)) * bright * fade;
        const g = (0.3 - t * 0.15 + 0.8 * Math.cos(t * 2 + a * 0.5)) * bright * fade;
        const b = (0.6 + t * 0.2) * bright * fade;
        col[i * 3] = r;
        col[i * 3 + 1] = g * 0.5;
        col[i * 3 + 2] = b;
        siz[i] = 0.02 + Math.random() * 0.04 * (1 - t * 0.15);
        off[i] = Math.random() * Math.PI * 2;
      }
    }
    return { pos, col, siz, off };
  }, []);

  const diskData = useMemo(() => {
    const pos = new Float32Array(DISK_PARTICLES * 3);
    const col = new Float32Array(DISK_PARTICLES * 3);
    const siz = new Float32Array(DISK_PARTICLES);
    for (let i = 0; i < DISK_PARTICLES; i++) {
      const r = 0.3 + Math.pow(Math.random(), 0.7) * 1.5;
      const a = Math.random() * Math.PI * 2;
      const thin = (Math.random() - 0.5) * 0.04 * (1 + r * 0.3);
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = thin;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const innerGlow = Math.max(0, 1 - Math.abs(r - 0.5) * 2);
      const b = (0.5 + innerGlow * 0.5) * (0.6 + Math.random() * 0.4);
      const temp = (r - 0.3) / 1.5;
      col[i * 3] = (1 - temp * 0.3) * b;
      col[i * 3 + 1] = (0.6 - temp * 0.2) * b;
      col[i * 3 + 2] = (0.8 - temp * 0.2) * b;
      siz[i] = 0.015 + innerGlow * 0.04 + Math.random() * 0.02;
    }
    return { pos, col, siz };
  }, []);

  const jetData = useMemo(() => {
    const pos = new Float32Array(JET_PARTICLES * 3);
    const col = new Float32Array(JET_PARTICLES * 3);
    const siz = new Float32Array(JET_PARTICLES);
    for (let i = 0; i < JET_PARTICLES; i++) {
      const up = Math.random() > 0.5 ? 1 : -1;
      const len = Math.pow(Math.random(), 1.5) * 3.5;
      const spread = (Math.random() - 0.5) * 0.06 * (1 + len);
      pos[i * 3] = (Math.random() - 0.5) * 0.1 * (1 + len * 0.3);
      pos[i * 3 + 1] = up * len;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * (1 + len * 0.3);
      const b = (0.6 - len * 0.12) * (0.5 + Math.random() * 0.5);
      col[i * 3] = 0.4 * b;
      col[i * 3 + 1] = 0.6 * b;
      col[i * 3 + 2] = 1.0 * b;
      siz[i] = 0.01 + Math.random() * 0.02 * (1 - len * 0.1);
    }
    return { pos, col, siz };
  }, []);

  const dustData = useMemo(() => {
    const pos = new Float32Array(DUST_PARTICLES * 3);
    const col = new Float32Array(DUST_PARTICLES * 3);
    for (let i = 0; i < DUST_PARTICLES; i++) {
      const r = 1 + Math.random() * 6;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 2.5;
      const b = 0.06 + Math.random() * 0.08;
      col[i * 3] = 0.5 * b;
      col[i * 3 + 1] = 0.2 * b;
      col[i * 3 + 2] = 0.6 * b;
    }
    return { pos, col };
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    timeRef.current += delta;
    const t = timeRef.current;

    const progress = progressRef?.current ?? 0;
    const scrollRotate = progress * 0.6;

    // Faster inner rotation for black hole accretion feel
    groupRef.current.rotation.y += delta * (0.04 + progress * 0.015);

    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.03 + progress * 0.04;
    groupRef.current.position.x = Math.cos(scrollRotate) * 0.25;
    groupRef.current.position.z = -0.8 + Math.sin(scrollRotate) * 0.3;

    if (armsRef.current) {
      const sizes = armsRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < armData.pos.length / 3; i++) {
        sizes[i] = armData.siz[i] * (0.5 + Math.sin(t * 0.5 + armData.off[i]) * 0.5);
      }
      armsRef.current.geometry.attributes.size.needsUpdate = true;
    }

    if (diskRef.current) {
      const sizes = diskRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < DISK_PARTICLES; i++) {
        sizes[i] = diskData.siz[i] * (0.6 + Math.sin(t * 0.8 + i * 0.05) * 0.4);
      }
      diskRef.current.geometry.attributes.size.needsUpdate = true;

      // Subtle rotation of disk particles
      const pos = diskRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < DISK_PARTICLES; i++) {
        const i3 = i * 3;
        const x = pos[i3];
        const z = pos[i3 + 2];
        const angle = delta * (0.3 + 0.7 / (0.1 + Math.sqrt(x * x + z * z)));
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        pos[i3] = x * cos - z * sin;
        pos[i3 + 2] = x * sin + z * cos;
      }
      diskRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (jetRef.current) {
      const sizes = jetRef.current.geometry.attributes.size.array as Float32Array;
      const pos = jetRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < JET_PARTICLES; i++) {
        const i3 = i * 3;
        sizes[i] = jetData.siz[i] * (0.5 + Math.sin(t * 0.6 + i * 0.1) * 0.5);
        pos[i3] += Math.sin(t * 0.1 + i * 0.05) * 0.0005;
        pos[i3 + 2] += Math.cos(t * 0.08 + i * 0.07) * 0.0005;
      }
      jetRef.current.geometry.attributes.size.needsUpdate = true;
      jetRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (coreGlowRef.current) {
      const pulse = Math.sin(t * 0.2) * 0.15 + 0.85;
      const s = 0.4 + pulse * 0.5;
      coreGlowRef.current.scale.setScalar(s);
      (coreGlowRef.current.material as THREE.SpriteMaterial).opacity = 0.08 + pulse * 0.06;
    }

    if (dustRef.current) {
      const pos = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST_PARTICLES; i++) {
        const i3 = i * 3;
        pos[i3] += Math.sin(t * 0.012 + i * 0.01) * 0.0003;
        pos[i3 + 1] += Math.cos(t * 0.01 + i * 0.02) * 0.0002;
        pos[i3 + 2] += Math.sin(t * 0.008 + i * 0.015) * 0.0003;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Core glow - the black hole shadow edge */}
      <sprite ref={coreGlowRef} scale={[0.4, 0.4, 1]}>
        <spriteMaterial
          map={sprite}
          color="#88bbff"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Accretion disk - bright inner ring */}
      <points ref={diskRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[diskData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[diskData.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(DISK_PARTICLES), 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.04}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Spiral arms */}
      <points ref={armsRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[armData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[armData.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(armData.pos.length / 3), 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.04}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Energy jets */}
      <points ref={jetRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[jetData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[jetData.col, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(JET_PARTICLES), 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.025}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Dust haze */}
      <points ref={dustRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustData.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.15}
          transparent
          opacity={0.12}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
    </group>
  );
}
