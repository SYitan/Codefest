import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { teamCapabilities, teamStats, mission } from "./data/landing";

const capIcons = ["∞", "</>", "📱", "⚡"];

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
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #030014 0%, #050510 50%, #030014 100%)" }}>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>CAPACIDADES DEL EQUIPO</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamCapabilities.map((cap, i) => (
              <motion.div
                key={cap}
                className="rounded-xl p-6 text-center"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -4, borderColor: "rgba(56,189,248,0.3)", boxShadow: "0 8px 30px rgba(56,189,248,0.08)" }}
              >
                <div className="text-2xl mb-2">{capIcons[i]}</div>
                <span
                  className="text-lg font-semibold"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {cap}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
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
    <section className="relative py-16 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #050510 0%, #04041c 50%, #050510 100%)" }}>
      <div className="relative z-10 max-w-3xl mx-auto">
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
      </div>
    </section>
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
