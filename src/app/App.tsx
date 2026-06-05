import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { MissionSection } from "./components/MissionSection";
import { SkillsSection } from "./components/SkillsSection";
import { TimelineSection } from "./components/TimelineSection";
import { WhySection } from "./components/WhySection";
import { ClosingSection } from "./components/ClosingSection";

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
      <MissionSection />
      <SkillsSection />
      <TimelineSection />
      <WhySection />
      <ClosingSection />
    </div>
  );
}
