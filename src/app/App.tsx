import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { StarField } from "./components/SpaceElements";

function SectionBridge() {
  return (
    <div className="relative h-16 flex items-center justify-center overflow-hidden" style={{ background: "#050510" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.03) 50%, transparent 100%)" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full" style={{ background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.15), transparent)" }} />
      <div className="relative flex items-center gap-3">
        <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3))" }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(56,189,248,0.4)", boxShadow: "0 0 8px rgba(56,189,248,0.2)" }} />
        <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.3), transparent)" }} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        background: "#030014",
        colorScheme: "dark",
      }}
    >
      <HeroSection />
      <SectionBridge />
      <TeamSection />
    </div>
  );
}
