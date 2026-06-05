import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { BrainCircuit, Code2, Smartphone, Zap } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { SectionBackground, SectionDivider, ShootingStars, GrainOverlay } from "./components/Backgrounds";
import { teamCapabilities, teamStats } from "./data/landing";

const capMeta = [
  { icon: BrainCircuit, color: "#a78bfa", label: "IA" },
  { icon: Code2, color: "#38bdf8", label: "Full Stack" },
  { icon: Smartphone, color: "#34d399", label: "Mobile" },
  { icon: Zap, color: "#fb923c", label: "Automatización" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-8">
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/60" />
      <span
        className="text-cyan-400 text-xs tracking-[0.25em] uppercase"
        style={{ fontFamily: "'Orbitron', monospace" }}
      >
        {children}
      </span>
      <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/60" />
    </div>
  );
}

function CapabilitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionBackground theme="deep" stars={40}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>CAPACIDADES DEL EQUIPO</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {teamCapabilities.map((cap, i) => {
            const { icon: Icon, color } = capMeta[i];
            return (
              <motion.div
                key={cap}
                className="rounded-xl p-7 text-center relative overflow-hidden group cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${color}06, rgba(255,255,255,0.01))`,
                  border: `1px solid rgba(255,255,255,0.06)`,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -6, borderColor: `${color}40`, boxShadow: `0 12px 40px ${color}15` }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{ background: `radial-gradient(ellipse at 50% 30%, ${color}15, transparent 70%)`, filter: "blur(40px)" }}
                />
                {/* Icon container */}
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    background: `${color}08`,
                    border: `1px solid ${color}15`,
                    boxShadow: `0 0 20px ${color}05`,
                  }}
                >
                  <Icon size={24} style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }} className="group-hover:text-white" />
                </div>
                <span
                  className="text-lg font-semibold block relative"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {cap}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionBackground>
  );
}

function MetricsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const metrics = [
    { value: teamStats.solutions, label: "PROYECTOS" },
    { value: teamStats.sectors, label: "SECTORES" },
    { value: teamStats.members, label: "ESPECIALISTAS" },
    { value: teamStats.mission, label: "MISIÓN" },
  ];

  return (
    <SectionBackground theme="navy" stars={20}>
      <SectionDivider />
      <ShootingStars />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-4 gap-8 max-w-3xl mx-auto"
      >
        {metrics.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.06), transparent 70%)", filter: "blur(20px)" }}
            />
            <div className="relative">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Orbitron', monospace",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[9px] uppercase tracking-[0.2em] mt-1.5"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}
              >
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="max-w-xs mx-auto mt-8 h-px opacity-20" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
    </SectionBackground>
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
      <GrainOverlay />
      <HeroSection />
      <CapabilitiesSection />
      <MetricsSection />
      <TeamSection />
    </div>
  );
}
