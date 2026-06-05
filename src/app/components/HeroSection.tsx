import { motion } from "motion/react";
import { StarField, NebulaLayer, SpaceGrid, Planet, OrbitalRing, GlowDot } from "./SpaceElements";
import { mission, heroTags } from "../data/landing";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030014 0%, #04041c 60%, #050510 100%)" }}
    >
      <NebulaLayer />
      <StarField count={240} />
      <SpaceGrid />

      {/* Planet */}
      <div className="opacity-60">
        <Planet
          size={450}
          position={{ bottom: "-15%", right: "-6%" }}
          colorStart="#1d4ed8"
          colorMid="#1e3a8a"
          glowColor="rgba(37,99,235,0.4)"
          showRing
        />
      </div>

      {/* Orbital decorations centered top-left */}
      <div className="absolute top-[15%] left-[8%] pointer-events-none hidden lg:block">
        <OrbitalRing size={140} duration={18} color="rgba(56,189,248,0.12)" />
        <OrbitalRing size={100} duration={12} delay={2} color="rgba(139,92,246,0.15)" />
        <GlowDot size={5} color="#38bdf8" style={{ top: "50%", left: "50%", marginTop: -2, marginLeft: -2 }} />
      </div>

      {/* Satellite dot top-right */}
      <motion.div
        className="absolute top-[18%] right-[18%] pointer-events-none hidden md:block"
        animate={{ x: [0, 15, 0], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <GlowDot size={4} color="#a78bfa" style={{}} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Mission badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10"
          style={{
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.25)",
            boxShadow: "0 0 20px rgba(56,189,248,0.1)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span
            className="text-cyan-300 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            {mission.badge}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              marginBottom: "0.4em",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 30%, #bfdbfe 70%, #93c5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {mission.title}
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(56,189,248,0.4))",
              }}
            >
              {mission.subtitle}
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 30%, #bfdbfe 70%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {mission.year}
            </span>
          </h1>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-24 h-px mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-slate-300 mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: "1.15rem", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {mission.description}
        </motion.p>

        {/* Tech tags */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {heroTags.map((tag) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: tag.delay }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `${tag.color}10`,
                border: `1px solid ${tag.color}30`,
                boxShadow: `0 0 15px ${tag.color}15`,
              }}
            >
              <tag.icon size={13} style={{ color: tag.color }} />
              <span
                className="text-slate-300 text-xs"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.04em" }}
              >
                {tag.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-10"
        >
          <button
            onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative px-8 py-3 rounded-full text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.15))",
              border: "1px solid rgba(56,189,248,0.4)",
              boxShadow: "0 0 30px rgba(56,189,248,0.15), inset 0 0 20px rgba(56,189,248,0.05)",
              color: "#e0f2fe",
            }}
          >
            <span className="relative z-10">EXPLORAR TRIPULACIÓN</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-10 flex flex-col items-center gap-2"
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
