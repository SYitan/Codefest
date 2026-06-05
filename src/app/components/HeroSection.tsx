import { motion } from "motion/react";
import { StarField, NebulaLayer, SpaceGrid, Planet } from "./SpaceElements";
import { ShootingStars } from "./Backgrounds";
import { mission } from "../data/landing";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030014 0%, #04041c 60%, #050510 100%)" }}
    >
      <NebulaLayer />
      <StarField count={240} />
      <SpaceGrid />
      <ShootingStars />

      {/* Planet — right side */}
      <div className="absolute right-[-10%] bottom-[-10%] sm:right-[-4%] sm:bottom-[-8%] opacity-50 sm:opacity-70 pointer-events-none hidden sm:block">
        <Planet
          size={500}
          position={{}}
          colorStart="#1d4ed8"
          colorMid="#1e3a8a"
          glowColor="rgba(37,99,235,0.4)"
          showRing
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mission */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
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

            {/* Title */}
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

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {mission.description}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative px-8 py-3 rounded-full text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.15))",
                  border: "1px solid rgba(56,189,248,0.4)",
                  boxShadow: "0 0 30px rgba(56,189,248,0.15), inset 0 0 20px rgba(56,189,248,0.05)",
                  color: "#e0f2fe",
                }}
                whileHover={{ boxShadow: "0 0 50px rgba(56,189,248,0.3), inset 0 0 30px rgba(56,189,248,0.08)" }}
              >
                <span className="relative z-10">EXPLORAR TRIPULACIÓN</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right: empty on mobile, planet shows on desktop */}
          <div className="hidden lg:block" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-slate-600 text-[10px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, rgba(56,189,248,0.5), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050510)" }}
      />
    </section>
  );
}
