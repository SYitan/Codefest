import { useRef, useEffect } from "react";
import { useScroll, useMotionValue } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { GalaxyAtmosphere } from "./GalaxyAtmosphere";
import { NebulaRibbons } from "./NebulaRibbons";
import { ForegroundDust } from "./ForegroundDust";

function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[4, 3, 5]} intensity={0.15} color="#6889ff" />
      <fog attach="fog" args={["#030014", 6, 20]} />
      <GalaxyAtmosphere scrollRef={scrollRef} />
      <NebulaRibbons scrollRef={scrollRef} />
      <ForegroundDust scrollRef={scrollRef} />
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

  const dpr = typeof window !== "undefined" && window.devicePixelRatio > 2
    ? [0.6, 1] : [0.8, 1.2];

  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 60, near: 0.1, far: 40 }}
        dpr={dpr}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
