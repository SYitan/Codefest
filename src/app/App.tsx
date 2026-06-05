import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { BrainCircuit, Code2, Smartphone, Zap } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { SectionBackground, SectionDivider } from "./components/Backgrounds";
import { teamCapabilities, teamStats } from "./data/landing";

const capMeta = [
  { icon: BrainCircuit, gradient: "linear-gradient(135deg, #a78bfa10, #7c3aed05)" },
  { icon: Code2, gradient: "linear-gradient(135deg, #38bdf810, #0284c705)" },
  { icon: Smartphone, gradient: "linear-gradient(135deg, #34d39910, #05966905)" },
  { icon: Zap, gradient: "linear-gradient(135deg, #fb923c10, #ea580c05)" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-6">
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
    <SectionBackground theme="deep">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>CAPACIDADES DEL EQUIPO</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teamCapabilities.map((cap, i) => {
            const { icon: Icon, gradient } = capMeta[i];
            return (
              <motion.div
                key={cap}
                className="rounded-xl p-6 text-center relative overflow-hidden group"
                style={{
                  background: gradient,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -4, borderColor: "rgba(56,189,248,0.3)", boxShadow: "0 8px 30px rgba(56,189,248,0.08)" }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={22} className="text-white/70" />
                </div>
                <span
                  className="text-lg font-semibold block"
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
    <SectionBackground theme="navy">
      <SectionDivider />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-4 gap-6"
      >
        {metrics.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
          >
            <div
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#38bdf8", fontFamily: "'Orbitron', monospace" }}
            >
              {stat.value}
            </div>
            <div
              className="text-[9px] uppercase tracking-[0.2em] mt-1.5"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
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
      <HeroSection />
      <CapabilitiesSection />
      <MetricsSection />
      <TeamSection />
    </div>
  );
}
