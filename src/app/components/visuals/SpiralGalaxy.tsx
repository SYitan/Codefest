import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ARM_COUNT = 4;
const PARTICLES_PER_ARM = 500;
const CORE_PARTICLES = 400;
const DUST_PARTICLES = 400;
const MAX_RADIUS = 4.5;
const TWIST = 5.5;
const ARM_WIDTH = 0.35;
const CORE_RADIUS = 0.6;

const COLORS = {
  core: new THREE.Color("#c8d8ff"),
  armInner: new THREE.Color("#88bbff"),
  armMid: new THREE.Color("#6080dd"),
  armOuter: new THREE.Color("#4a3590"),
  dust: new THREE.Color("#3a2580"),
};

function createSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.1, "rgba(255,255,255,0.7)");
  g.addColorStop(0.4, "rgba(180,200,255,0.2)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export function SpiralGalaxy({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const armsRef = useRef<THREE.Points>(null!);
  const coreRef = useRef<THREE.Points>(null!);
  const dustRef = useRef<THREE.Points>(null!);
  const coreGlowRef = useRef<THREE.Sprite>(null!);
  const timeRef = useRef(0);
  const sprite = useMemo(createSprite, []);

  // Spiral arms
  const armData = useMemo(() => {
    const count = ARM_COUNT * PARTICLES_PER_ARM;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const off = new Float32Array(count);

    const cInner = COLORS.armInner;
    const cMid = COLORS.armMid;
    const cOuter = COLORS.armOuter;
    const tmpCol = new THREE.Color();

    for (let a = 0; a < ARM_COUNT; a++) {
      const armAngle = (a / ARM_COUNT) * Math.PI * 2;
      for (let p = 0; p < PARTICLES_PER_ARM; p++) {
        const i = a * PARTICLES_PER_ARM + p;
        const t = Math.random();
        const radius = CORE_RADIUS + t * (MAX_RADIUS - CORE_RADIUS);
        const angle = armAngle + t * TWIST + (Math.random() - 0.5) * ARM_WIDTH * (1 - t * 0.5);
        const spread = (Math.random() - 0.5) * 0.15 * (1 + t * 2);

        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = spread;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        tmpCol.copy(cInner).lerp(cMid, t * 0.6).lerp(cOuter, t * t);
        const bright = 0.3 + Math.random() * 0.5;
        col[i * 3] = tmpCol.r * bright;
        col[i * 3 + 1] = tmpCol.g * bright;
        col[i * 3 + 2] = tmpCol.b * bright;

        siz[i] = 0.02 + Math.random() * 0.04 * (1 - t * 0.3);
        off[i] = Math.random() * Math.PI * 2;
      }
    }
    return { pos, col, siz, off };
  }, []);

  // Core
  const coreData = useMemo(() => {
    const pos = new Float32Array(CORE_PARTICLES * 3);
    const siz = new Float32Array(CORE_PARTICLES);
    for (let i = 0; i < CORE_PARTICLES; i++) {
      const r = Math.pow(Math.random(), 1.5) * CORE_RADIUS;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.4;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      siz[i] = 0.02 + Math.random() * 0.06;
    }
    return pos;
  }, []);

  // Dust
  const dustData = useMemo(() => {
    const pos = new Float32Array(DUST_PARTICLES * 3);
    for (let i = 0; i < DUST_PARTICLES; i++) {
      const r = 1 + Math.random() * 6;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    timeRef.current += delta;
    const t = timeRef.current;
    const progress = progressRef.current;

    // Galaxy slow rotation
    groupRef.current.rotation.y += delta * 0.04;
    // Slight tilt wobble
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.03;

    // Scroll-based camera orbit (subtle)
    const orbitAngle = progress * Math.PI * 0.3;
    groupRef.current.position.x = Math.sin(orbitAngle) * 0.3;
    groupRef.current.position.y = -progress * 0.2;

    // Arm particle twinkle
    if (armsRef.current) {
      const sizes = armsRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < armData.pos.length / 3; i++) {
        const twinkle = Math.sin(t * 0.5 + armData.off[i]) * 0.3 + 0.7;
        sizes[i] = armData.siz[i] * twinkle;
      }
      armsRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // Core breathing
    if (coreRef.current) {
      const sizes = coreRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < CORE_PARTICLES; i++) {
        sizes[i] = coreData[i] * (0.8 + Math.sin(t * 0.3 + i) * 0.2);
      }
      coreRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // Core glow pulse
    if (coreGlowRef.current) {
      const pulse = Math.sin(t * 0.2) * 0.1 + 0.9;
      const s = 0.5 + pulse * 0.3;
      coreGlowRef.current.scale.setScalar(s);
      (coreGlowRef.current.material as THREE.SpriteMaterial).opacity = 0.08 + pulse * 0.04;
    }

    // Dust slow drift
    if (dustRef.current) {
      const pos = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST_PARTICLES; i++) {
        const i3 = i * 3;
        pos[i3] += Math.sin(t * 0.02 + i) * 0.0003;
        pos[i3 + 1] += Math.cos(t * 0.015 + i * 0.5) * 0.0002;
        pos[i3 + 2] += Math.sin(t * 0.018 + i * 0.3) * 0.0003;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core glow sprite */}
      <sprite ref={coreGlowRef} scale={[0.5, 0.5, 1]}>
        <spriteMaterial
          map={sprite}
          color="#88bbff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

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
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Core cluster */}
      <points ref={coreRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(coreData), 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(CORE_PARTICLES), 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          color="#d0e4ff"
          size={0.05}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dust haze */}
      <points ref={dustRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustData, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          color="#4a3590"
          size={0.08}
          transparent
          opacity={0.08}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
