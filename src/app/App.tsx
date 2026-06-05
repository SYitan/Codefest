
import { useEffect, useState, lazy, Suspense } from "react";

import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { GrainOverlay } from "./components/Backgrounds";
import { HolographicOverlay } from "./components/visuals/HolographicOverlay";
import { NeuralNetworkBackground } from "./components/visuals/NeuralNetworkBackground";
import { ForegroundParticles } from "./components/visuals/ForegroundParticles";


const CosmicBackground = lazy(() => import("./components/visuals/CosmicBackground").then(m => ({ default: m.CosmicBackground })));



function getLowPowerMode() {
  if (typeof window === "undefined") return false;
  const isSmallScreen = window.innerWidth < 900;
  const lowCpu = typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4;
  const highDpr = window.devicePixelRatio > 2;
  return isSmallScreen || lowCpu || highDpr;
}


export default function App() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const updateMode = () => setLowPower(getLowPowerMode());
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        background: "#030014",
        colorScheme: "dark",
        contain: "paint",
      }}
    >
      {/* Aurora gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 20% 0%, rgba(120,0,200,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 80% 50% at 80% 30%, rgba(0,180,255,0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 50% 60%, rgba(200,0,180,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 90% 50% at 30% 80%, rgba(0,255,180,0.04) 0%, transparent 50%)
            `,
          }}
        />
      </div>
      <GrainOverlay />
      <Suspense fallback={null}>
        <CosmicBackground lowPower={lowPower} />
      </Suspense>
      <NeuralNetworkBackground lowPower={lowPower} />
      <HolographicOverlay lowPower={lowPower} />
      <ForegroundParticles lowPower={lowPower} />
      <div className="relative z-10">
        <HeroSection lowPower={lowPower} />
        <TeamSection lowPower={lowPower} />
      </div>
    </div>
  );
}
