import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CTRL_OFF = 0.6;

interface NodeDef {
  pos: THREE.Vector3;
  threshold: number;
  phase: number;
}

interface ConnectionDef {
  points: THREE.Vector3[];
  curve: THREE.CatmullRomCurve3;
  length: number;
  aIdx: number;
  bIdx: number;
  speed: number;
  offset: number;
}

const NODE_DEFS: [number, number, number, number][] = [
  // [x, y, z, activationThreshold]
  // Primary hub (right)
  [2.8, 0.6, 0.0, 0.15],
  [3.8, 1.3, -0.2, 0.18],
  [3.4, -0.4, 0.15, 0.20],
  [4.2, 0.2, -0.1, 0.22],
  [2.2, 1.2, 0.1, 0.25],
  // Lower cluster (right)
  [2.6, -1.6, 0.0, 0.35],
  [3.6, -2.2, -0.15, 0.38],
  [1.8, -2.0, 0.1, 0.42],
  // Sparse left
  [-2.0, 0.6, -0.1, 0.50],
  [-1.4, -0.8, 0.15, 0.55],
  // Mid
  [0.6, -0.6, -0.2, 0.45],
  [-0.8, 1.0, 0.05, 0.52],
];

// Connection definitions: [nodeA, nodeB, ...controlPoints]
// Control points are optional intermediate points for curve shaping
const CONNECTION_DEFS: { a: number; b: number; via?: [number, number, number][] }[] = [
  // Hub mesh
  { a: 0, b: 1 },
  { a: 0, b: 2 },
  { a: 0, b: 3, via: [[3.6, 0.2, 0.4]] },
  { a: 1, b: 2, via: [[3.8, 0.2, -0.1]] },
  { a: 1, b: 4 },
  { a: 2, b: 4, via: [[2.6, 0.2, 0.2]] },
  { a: 3, b: 1 },
  // Hub to lower cluster (directional flow)
  { a: 0, b: 5, via: [[2.9, -0.4, 0.2], [2.6, -1.0, -0.1]] },
  { a: 2, b: 5, via: [[3.2, -0.8, 0.1]] },
  { a: 4, b: 7, via: [[2.0, -0.2, 0.15], [1.6, -1.2, 0.0]] },
  // Lower cluster mesh
  { a: 5, b: 6 },
  { a: 5, b: 7, via: [[2.4, -1.8, 0.1]] },
  { a: 6, b: 7 },
  // Sparse left connections
  { a: 8, b: 9, via: [[-1.8, -0.2, 0.0]] },
  { a: 8, b: 11, via: [[-1.4, 0.6, -0.1]] },
  // Mid connections
  { a: 10, b: 5, via: [[1.2, -1.2, -0.1]] },
  { a: 10, b: 2, via: [[1.8, -0.2, 0.0]] },
  { a: 11, b: 0, via: [[0.6, 0.8, 0.1]] },
  { a: 11, b: 4, via: [[0.4, 1.0, 0.05]] },
];

export function IntelligenceNetwork({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  const linesRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef<THREE.Points>(null!);
  const pulsesRef = useRef<THREE.Points>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const timeRef = useRef(0);

  const { nodes, connections, particleBase } = useMemo(() => {
    const nodes: NodeDef[] = NODE_DEFS.map(([x, y, z, t]) => ({
      pos: new THREE.Vector3(x, y, z),
      threshold: t,
      phase: Math.random() * Math.PI * 2,
    }));

    const connections: ConnectionDef[] = CONNECTION_DEFS.map(c => {
      const pa = nodes[c.a].pos;
      const pb = nodes[c.b].pos;
      const pts = c.via
        ? [pa, ...c.via.map(v => new THREE.Vector3(v[0], v[1], v[2])), pb]
        : [pa, pb];
      const curve = new THREE.CatmullRomCurve3(pts);
      return {
        points: pts,
        curve,
        length: 0,
        aIdx: c.a,
        bIdx: c.b,
        speed: 0.08 + Math.random() * 0.12,
        offset: Math.random() * Math.PI * 2,
      };
    });

    // Pre-compute curve lengths
    connections.forEach(c => {
      c.length = c.curve.getLength();
    });

    // Particle base positions (80 particles)
    const pCount = 80;
    const pb = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      pb[i * 3] = n.pos.x + (Math.random() - 0.5) * 3;
      pb[i * 3 + 1] = n.pos.y + (Math.random() - 0.5) * 2.5;
      pb[i * 3 + 2] = n.pos.z + (Math.random() - 0.5) * 1.5;
    }

    return { nodes, connections, particleBase: pb };
  }, []);

  // Pre-compute curve geometries
  const curveGeos = useMemo(() => {
    return connections.map(c => {
      const pts = c.curve.getPoints(40);
      const pos = new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]));
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return geo;
    });
  }, [connections]);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    timeRef.current += delta;
    const t = timeRef.current;
    const progress = progressRef.current;

    // Compute node activation: smooth sigmoid-ish curve
    const nodeActive = nodes.map(n => {
      if (progress < n.threshold) return 0;
      const raw = (progress - n.threshold) / (1 - n.threshold);
      return raw * raw * (3 - 2 * raw); // smoothstep
    });

    // Node glow
    if (nodesRef.current) {
      const pos = nodesRef.current.geometry.attributes.position.array as Float32Array;
      const sizes = nodesRef.current.geometry.attributes.size.array as Float32Array;
      nodes.forEach((n, i) => {
        const act = nodeActive[i];
        const i3 = i * 3;
        const pulse = Math.sin(t * 0.4 + n.phase) * 0.5 + 0.5;
        pos[i3] = n.pos.x;
        pos[i3 + 1] = n.pos.y + Math.sin(t * 0.2 + n.phase) * 0.03;
        pos[i3 + 2] = n.pos.z;
        sizes[i] = 0.02 + act * 0.04 + pulse * 0.01 * act;
      });
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
      nodesRef.current.geometry.attributes.size.needsUpdate = true;
      (nodesRef.current.material as THREE.PointsMaterial).opacity = 0.08 + Math.min(progress * 2.5, 1) * 0.25;
    }

    // Connection lines
    if (linesRef.current) {
      const children = linesRef.current.children;
      connections.forEach((c, i) => {
        const line = children[i] as THREE.Line;
        const act = (nodeActive[c.aIdx] + nodeActive[c.bIdx]) * 0.5;
        const op = act * act * 0.2;
        (line.material as THREE.LineBasicMaterial).opacity = op;
      });
    }

    // Energy pulses
    if (pulsesRef.current) {
      const maxPulses = Math.min(connections.length, Math.floor(progress * 20));
      const pPos = pulsesRef.current.geometry.attributes.position.array as Float32Array;
      const pSizes = pulsesRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < maxPulses; i++) {
        const ci = i % connections.length;
        const c = connections[ci];
        const p = (t * c.speed + c.offset) % 1;
        const pt = c.curve.getPointAt(p);
        pPos[i * 3] = pt.x;
        pPos[i * 3 + 1] = pt.y;
        pPos[i * 3 + 2] = pt.z;
        const act = (nodeActive[c.aIdx] + nodeActive[c.bIdx]) * 0.5;
        pSizes[i] = 0.02 + act * 0.03 + Math.sin(t * 3 + i) * 0.005;
      }
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
      pulsesRef.current.geometry.attributes.size.needsUpdate = true;
      pulsesRef.current.geometry.setDrawRange(0, maxPulses);
      (pulsesRef.current.material as THREE.PointsMaterial).opacity = Math.min(progress * 1.5, 1) * 0.3;
    }

    // Particle field
    if (particlesRef.current) {
      const visible = Math.floor(80 * Math.min(progress * 1.8, 1));
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < visible; i++) {
        const i3 = i * 3;
        pos[i3] = particleBase[i3] + Math.sin(t * 0.08 + i * 0.1) * 0.3;
        pos[i3 + 1] = particleBase[i3 + 1] + Math.cos(t * 0.06 + i * 0.13) * 0.2;
        pos[i3 + 2] = particleBase[i3 + 2] + Math.sin(t * 0.04 + i * 0.07) * 0.1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.setDrawRange(0, visible);
      (particlesRef.current.material as THREE.PointsMaterial).opacity = 0.04 + Math.min(progress * 1.2, 1) * 0.12;
    }
  });

  return (
    <group>
      {/* Connection lines */}
      <group ref={linesRef}>
        {curveGeos.map((geo, i) => (
          <line key={i} geometry={geo} frustumCulled>
            <lineBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0}
              depthWrite={false}
            />
          </line>
        ))}
      </group>

      {/* Energy pulses */}
      <points ref={pulsesRef} frustumCulled>
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
          color="#88ccff"
          size={0.04}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Node glow */}
      <points ref={nodesRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(NODE_DEFS.length * 3), 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[new Float32Array(NODE_DEFS.length), 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60a5fa"
          size={0.04}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient particles */}
      <points ref={particlesRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(particleBase), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4992ff"
          size={0.04}
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
