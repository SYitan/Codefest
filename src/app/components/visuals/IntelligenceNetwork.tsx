import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 24;
const FIELD_W = 10;
const FIELD_H = 4;
const FIELD_D = 3;
const CONNECT_DIST = 2.6;

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(200,220,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

interface NodeDef {
  pos: THREE.Vector3;
  threshold: number;
  pulsePhase: number;
}

interface ConnectionDef {
  a: number;
  b: number;
  pulseSpeed: number;
  pulseOffset: number;
}

function buildNetwork(): { nodes: NodeDef[]; connections: ConnectionDef[] } {
  const nodes: NodeDef[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * FIELD_W,
        (Math.random() - 0.5) * FIELD_H,
        (Math.random() - 0.5) * FIELD_D
      ),
      threshold: 0.08 + Math.random() * 0.5,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  }

  const connections: ConnectionDef[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const d = nodes[i].pos.distanceTo(nodes[j].pos);
      if (d < CONNECT_DIST && Math.random() < 0.35) {
        connections.push({
          a: i, b: j,
          pulseSpeed: 0.15 + Math.random() * 0.2,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }
  }
  return { nodes, connections };
}

export function IntelligenceNetwork({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const spriteRef = useRef<THREE.Points>(null!);
  const nodeGlowRef = useRef<THREE.Points>(null!);
  const pulseRef = useRef<THREE.Points>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const activeLineRef = useRef<THREE.LineSegments>(null!);
  const timeRef = useRef(0);

  const { nodes, connections } = useMemo(buildNetwork, []);
  const spriteTex = useMemo(createParticleTexture, []);

  const linePositions = useMemo(() => {
    const arr: number[] = [];
    connections.forEach(c => {
      const pa = nodes[c.a].pos;
      const pb = nodes[c.b].pos;
      arr.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
    });
    return new Float32Array(arr);
  }, [nodes, connections]);

  const particleBase = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * FIELD_W * 1.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H * 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * FIELD_D * 1.5;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    timeRef.current += delta;
    const t = timeRef.current;
    const progress = progressRef.current;

    const stage = progress < 0.12 ? 0 : progress < 0.35 ? 1 : progress < 0.6 ? 2 : progress < 0.82 ? 3 : 4;

    // Node activation: ease in
    const nodeActive = nodes.map((n, i) => {
      if (progress < n.threshold) return 0;
      const raw = (progress - n.threshold) / (1 - n.threshold);
      return Math.min(raw * 2.5, 1);
    });

    // Connection opacity = average of both endpoints
    const connOpacity = connections.map((c, i) => {
      const act = (nodeActive[c.a] + nodeActive[c.b]) * 0.5;
      return act * act * 0.35;
    });

    // Update line segments opacity via vertex colors
    if (lineRef.current) {
      const colors = new Float32Array(linePositions.length / 3 * 3);
      const baseColor = new THREE.Color("#38bdf8");
      connections.forEach((c, i) => {
        const o = connOpacity[i];
        const col = baseColor.clone().multiplyScalar(o * 1.5);
        for (let j = 0; j < 2; j++) {
          const idx = (i * 2 + j) * 3;
          colors[idx] = col.r;
          colors[idx + 1] = col.g;
          colors[idx + 2] = col.b;
        }
      });
      lineRef.current.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }

    // Energy pulses along connections
    if (pulseRef.current && stage >= 1) {
      const pulseCount = Math.min(connections.length, Math.floor(progress * 40));
      const pulsePos = new Float32Array(pulseCount * 3);
      const pulseSizes = new Float32Array(pulseCount);
      for (let i = 0; i < pulseCount; i++) {
        const ci = i % connections.length;
        const c = connections[ci];
        const p = (t * c.pulseSpeed + c.pulseOffset) % 1;
        const pa = nodes[c.a].pos;
        const pb = nodes[c.b].pos;
        const e = p < 0.5 ? p * 2 : 2 - p * 2;
        pulsePos[i * 3] = pa.x + (pb.x - pa.x) * e;
        pulsePos[i * 3 + 1] = pa.y + (pb.y - pa.y) * e;
        pulsePos[i * 3 + 2] = pa.z + (pb.z - pa.z) * e;
        pulseSizes[i] = 0.04 + Math.sin(t * 2 + i) * 0.02;
      }
      pulseRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
      pulseRef.current.geometry.setAttribute("size", new THREE.BufferAttribute(pulseSizes, 1));
      (pulseRef.current.material as THREE.PointsMaterial).opacity = connOpacity.reduce((a, b) => a + b, 0) / connections.length * 0.8;
    }

    // Particle field
    if (spriteRef.current) {
      const activeRatio = Math.min(progress * 2, 1);
      const visibleCount = Math.floor(180 * activeRatio);
      const positions = spriteRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < visibleCount; i++) {
        const i3 = i * 3;
        const drift = Math.sin(t * 0.15 + i * 0.05) * 0.3;
        const driftY = Math.cos(t * 0.12 + i * 0.07) * 0.2;
        if (stage >= 3) {
          // Clustering behavior at later stages
          const clusterIdx = i % nodes.length;
          const n = nodes[clusterIdx];
          positions[i3] = particleBase[i3] * (0.4 + Math.sin(t * 0.1 + i) * 0.1) + n.pos.x * 0.3 + drift;
          positions[i3 + 1] = particleBase[i3 + 1] * 0.5 + n.pos.y * 0.3 + driftY;
        } else {
          positions[i3] = particleBase[i3] + drift;
          positions[i3 + 1] = particleBase[i3 + 1] + driftY;
        }
        positions[i3 + 2] = particleBase[i3 + 2] + Math.sin(t * 0.1 + i * 0.03) * 0.1;
      }
      spriteRef.current.geometry.attributes.position.needsUpdate = true;
      spriteRef.current.geometry.setDrawRange(0, visibleCount);
      (spriteRef.current.material as THREE.PointsMaterial).opacity = 0.08 + activeRatio * 0.25;
    }

    // Node glow points
    if (nodeGlowRef.current) {
      const positions = nodeGlowRef.current.geometry.attributes.position.array as Float32Array;
      const sizes = nodeGlowRef.current.geometry.attributes.size.array as Float32Array;
      nodes.forEach((n, i) => {
        const act = nodeActive[i];
        const i3 = i * 3;
        positions[i3] = n.pos.x;
        positions[i3 + 1] = n.pos.y + Math.sin(t * 0.3 + n.pulsePhase) * 0.04;
        positions[i3 + 2] = n.pos.z;
        sizes[i] = 0.03 + act * 0.04 + Math.sin(t * 0.5 + n.pulsePhase) * 0.01;
      });
      nodeGlowRef.current.geometry.attributes.position.needsUpdate = true;
      nodeGlowRef.current.geometry.attributes.size.needsUpdate = true;
      (nodeGlowRef.current.material as THREE.PointsMaterial).opacity = 0.15 + Math.min(progress * 3, 1) * 0.35;
    }
  });

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={lineRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} depthWrite={false} />
      </lineSegments>

      {/* Energy pulses */}
      <points ref={pulseRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(connections.length * 3), 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[new Float32Array(connections.length), 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a0e0ff"
          size={0.06}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Node glow points */}
      <points ref={nodeGlowRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(NODE_COUNT * 3), 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[new Float32Array(NODE_COUNT), 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60a5fa"
          size={0.06}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glowing particle field */}
      <points ref={spriteRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(particleBase), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={spriteTex}
          size={0.08}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#88bbff"
        />
      </points>
    </group>
  );
}
