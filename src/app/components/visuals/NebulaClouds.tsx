import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createNebulaTexture(width = 512, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const colors = [
    "rgba(30,100,220,",
    "rgba(80,40,200,",
    "rgba(20,150,240,",
    "rgba(60,180,255,",
  ];

  for (let i = 0; i < 60; i++) {
    const x = (Math.random() - 0.5) * width * 1.5;
    const y = (Math.random() - 0.5) * height * 1.5;
    const rx = 40 + Math.random() * 100;
    const ry = 40 + Math.random() * 100;
    const alpha = 0.03 + Math.random() * 0.05;
    const rot = Math.random() * Math.PI;
    const ci = Math.floor(Math.random() * colors.length);

    ctx.save();
    ctx.translate(width / 2 + x, height / 2 + y);
    ctx.rotate(rot);
    ctx.scale(1, 0.3 + Math.random() * 0.7);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.3})`);
    grad.addColorStop(0.3, `${colors[ci]}${alpha})`);
    grad.addColorStop(1, `rgba(0,0,0,0)`);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

const layers = [
  { x: -5, y: 3, z: -6, scale: 14, speed: 0.002 },
  { x: 6, y: -2, z: -8, scale: 12, speed: 0.0025 },
  { x: -3, y: -4, z: -10, scale: 16, speed: 0.0015 },
  { x: 4, y: 5, z: -5, scale: 10, speed: 0.003 },
];

export function NebulaClouds({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  const textures = useMemo(() => {
    const tex = createNebulaTexture();
    return layers.map(() => tex.clone());
  }, []);

  useFrame(() => {
    groupRef.current.position.y = scrollRef.current * -0.003;
    groupRef.current.rotation.z += 0.0003;
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <mesh
          key={i}
          position={[layer.x, layer.y, layer.z]}
          frustumCulled
        >
          <planeGeometry args={[layer.scale, layer.scale]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
