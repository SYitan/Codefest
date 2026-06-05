import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { StarField, NebulaLayer, Planet, OrbitalRing, GlowDot, SpaceGrid } from "./SpaceElements";

const lines = [
  { text: "From ideas to intelligent systems.", color: "#ffffff", delay: 0.1 },
  { text: "From students to builders.", color: "#38bdf8", delay: 0.4 },
  { text: "We are ready for", color: "#94a3b8", delay: 0.7 },
];

function FloatingParticle({ x, y, color, size, duration, delay }: {
  x: number; y: number; color: string; size: number; duration: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 4}px ${size * 2}px ${color}40`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 10, 0],
        opacity: [0.4, 0.9, 0.4],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const particles = [
  { x: 8, y: 20, color: "#38bdf8", size: 4, duration: 6, delay: 0 },
  { x: 18, y: 70, color: "#a78bfa", size: 3, duration: 8, delay: 1 },
  { x: 75, y: 15, color: "#34d399", size: 5, duration: 7, delay: 2 },
  { x: 85, y: 65, color: "#38bdf8", size: 3, duration: 5, delay: 0.5 },
  { x: 45, y: 85, color: "#f472b6", size: 4, duration: 9, delay: 1.5 },
  { x: 92, y: 35, color: "#fbbf24", size: 3, duration: 6.5, delay: 3 },
  { x: 30, y: 25, color: "#a78bfa", size: 2, duration: 7.5, delay: 2.5 },
  { x: 60, y: 78, color: "#38bdf8", size: 3, duration: 8, delay: 0.8 },
];

export function ClosingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04041c 0%, #030014 40%, #050010 100%)" }}
    >
      <NebulaLayer />
      <StarField count={180} />
      <SpaceGrid />

      {/* Background planet */}
      <Planet
        size={900}
        position={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        colorStart="#0d1b4f"
        colorMid="#080e2e"
        glowColor="rgba(30,58,138,0.25)"
        showRing={false}
      />

      {/* Centered orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <OrbitalRing size={500} duration={40} color="rgba(56,189,248,0.06)" />
        <OrbitalRing size={380} duration={28} delay={5} color="rgba(139,92,246,0.08)" />
        <OrbitalRing size={260} duration={18} delay={2} color="rgba(56,189,248,0.1)" />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Content */}
      <div ref={ref} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Lines */}
        <div className="space-y-3 mb-8">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: line.delay }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                  color: line.color,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 40%, #a78bfa 70%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(56,189,248,0.5))",
              marginBottom: "0.2em",
            }}
          >
            CODEFEST
          </h2>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #ffffff, #bfdbfe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AD ASTRA 2026
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          className="w-40 h-px mx-auto my-8"
          style={{ background: "linear-gradient(90deg, transparent, #38bdf8, #a78bfa, transparent)" }}
        />

        {/* Team badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: "rgba(56,189,248,0.06)",
            border: "1px solid rgba(56,189,248,0.2)",
            boxShadow: "0 0 30px rgba(56,189,248,0.08)",
          }}
        >
          <div className="flex -space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-slate-700"
                style={{ background: ["#38bdf8", "#a78bfa", "#34d399", "#fb923c"][i] + "40" }}
              />
            ))}
          </div>
          <span
            className="text-slate-400 text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            4 Engineers · 1 Mission · Infinite Drive
          </span>
        </motion.div>

        {/* Glow dots bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
          className="flex justify-center gap-3 mt-12"
        >
          {["#38bdf8", "#a78bfa", "#34d399", "#fb923c"].map((c, i) => (
            <motion.div
              key={c}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: c, boxShadow: `0 0 8px 2px ${c}60` }}
              animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
