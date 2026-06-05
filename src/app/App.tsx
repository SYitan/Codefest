import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";

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
      <TeamSection />
    </div>
  );
}
