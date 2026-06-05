import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Globe } from "./Globe";
import { Atmosphere } from "./Atmosphere";
import { OrbitingPath } from "./OrbitingPath";
import { OrbitingObject } from "./OrbitingObject";
import { StarField } from "../SpaceElements";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-3, -2, 4]} intensity={0.5} color="#4f8bff" />
      <Globe />
      <Atmosphere />
      <OrbitingPath />
      <OrbitingObject color="#38bdf8" speed={0.12} />
    </>
  );
}

export default function GlobeScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ minHeight: 420, height: "100%" }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 1.5, 6.5], fov: 40 }}
          dpr={[0.5, 1]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.5 }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
