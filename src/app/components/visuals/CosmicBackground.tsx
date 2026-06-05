import { Canvas } from "@react-three/fiber";
import { SpiralGalaxy } from "./SpiralGalaxy";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.03} />
      <fog attach="fog" args={["#030014", 2, 18]} />
      <SpiralGalaxy />
    </>
  );
}

export function CosmicBackground() {
  const dpr = typeof window !== "undefined" && window.devicePixelRatio > 2
    ? [0.6, 1] : [0.8, 1.2];

  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 50, near: 0.1, far: 30 }}
        dpr={dpr}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
