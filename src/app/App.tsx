import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { teamCapabilities, teamStats } from "./data/landing";

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
    <section className="relative py-16 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #030014 0%, #050510 50%, #030014 100%)" }}>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>CAPACIDADES DE MISIÓN</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {teamCapabilities.map((cap, i) => (
              <motion.div
                key={cap}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {cap}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {[
              { value: teamStats.solutions, label: "SOLUCIONES" },
              { value: teamStats.sectors, label: "SECTORES" },
              { value: teamStats.members, label: "PERFILES" },
              { value: teamStats.mission, label: "MISIÓN" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
              >
                <div
                  className="text-xl font-bold"
                  style={{ color: "#38bdf8", fontFamily: "'Orbitron', monospace" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[9px] uppercase tracking-[0.15em] mt-1"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
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
      <TeamSection />
    </div>
  );
}
