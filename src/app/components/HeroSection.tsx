import { motion, useScroll, useTransform } from "motion/react";
import { SpaceGrid } from "./SpaceElements";
import { ShootingStars, ScrollFadeOrbs } from "./Backgrounds";
import { mission } from "../data/landing";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 400], [0, -40]);
  const contentO = useTransform(scrollY, [0, 400], [1, 0]);
  const gridO = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgba(3,0,20,0.88) 0%, rgba(4,4,28,0.75) 60%, rgba(5,5,16,0.88) 100%)" }}
    >
      <ScrollFadeOrbs />
      <motion.div style={{ opacity: gridO }}>
        <SpaceGrid />
      </motion.div>
      <ShootingStars />



      <motion.div
        className="relative z-10 w-full px-6 md:px-16 lg:px-24"
        style={{ y: contentY, opacity: contentO }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8"
              style={{
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(56,189,248,0.25)",
                boxShadow: "0 0 20px rgba(56,189,248,0.1)",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-cyan-300 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {mission.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-white leading-tight mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {mission.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {mission.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-3 rounded-full text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 active:scale-95"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.15))",
                  border: "1px solid rgba(56,189,248,0.4)",
                  boxShadow: "0 0 30px rgba(56,189,248,0.15), inset 0 0 20px rgba(56,189,248,0.05)",
                  color: "#e0f2fe",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(56,189,248,0.3), inset 0 0 30px rgba(56,189,248,0.08)",
                  borderColor: "rgba(56,189,248,0.7)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  EXPLORAR TRIPULACIÓN
                  <motion.span
                    className="inline-block"
                    initial={{ x: -4, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}
                  >
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050510)" }}
      />
    </section>
  );
}
