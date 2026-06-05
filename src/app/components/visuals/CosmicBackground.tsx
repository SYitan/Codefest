import { useRef, useEffect } from "react";
import { useScroll, useMotionValue } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { IntelligenceNetwork } from "./IntelligenceNetwork";
import { AtmosphericHaze } from "./AtmosphericHaze";
import { ForegroundLayer } from "./ForegroundLayer";
import { CoreEnergy } from "./CoreEnergy";

function Scene({ progressRef }: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <>
      <ambientLight intensity={0.06} />
      <fog attach="fog" args={["#030014", 4, 30]} />
      <AtmosphericHaze progressRef={progressRef} />
      <IntelligenceNetwork progressRef={progressRef} />
      <CoreEnergy progressRef={progressRef} />
      <ForegroundLayer progressRef={progressRef} />
    </>
  );
}

export function CosmicBackground() {
  const { scrollY } = useScroll();
  const progressRef = useRef(0);
  const smoothY = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      smoothY.set(latest);
    });
    return unsubscribe;
  }, [scrollY, smoothY]);

  useEffect(() => {
    const unsubscribe = smoothY.on("change", (latest) => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      progressRef.current = Math.min(Math.max(0, latest / maxScroll), 1);
    });
    return unsubscribe;
  }, [smoothY]);

  const dpr = typeof window !== "undefined" && window.devicePixelRatio > 2
    ? [0.5, 1] : [0.8, 1.2];

  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0.2, 6], fov: 56, near: 0.1, far: 50 }}
        dpr={dpr}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
