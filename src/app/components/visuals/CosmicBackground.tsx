import { useRef, useEffect } from "react";
import { useScroll, useMotionValue } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { GalaxyParticles } from "./GalaxyParticles";
import { NebulaClouds } from "./NebulaClouds";
import { DeepStarField } from "./DeepStarField";

function CosmicScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.3} />
      <DeepStarField scrollRef={scrollRef} />
      <GalaxyParticles scrollRef={scrollRef} />
      <NebulaClouds scrollRef={scrollRef} />
    </>
  );
}

export function CosmicBackground() {
  const { scrollY } = useScroll();
  const scrollRef = useRef(0);
  const smoothY = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      smoothY.set(latest);
    });
    return unsubscribe;
  }, [scrollY, smoothY]);

  useEffect(() => {
    const unsubscribe = smoothY.on("change", (latest) => {
      scrollRef.current = latest;
    });
    return unsubscribe;
  }, [smoothY]);

  const dpr = typeof window !== "undefined" && window.devicePixelRatio > 2 ? [0.5, 1] : [0.8, 1.5];

  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60, near: 0.1, far: 100 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <CosmicScene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
