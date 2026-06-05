import { useMemo } from "react";
import { motion } from "motion/react";

export function StarField({ count = 220 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.4,
        opacity: Math.random() * 0.65 + 0.2,
        duration: Math.random() * 5 + 2.5,
        delay: Math.random() * 8,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background:
              s.size > 1.8
                ? `rgba(148,215,255,${s.opacity})`
                : `rgba(255,255,255,${s.opacity})`,
          }}
          animate={{ opacity: [s.opacity * 0.2, s.opacity, s.opacity * 0.2] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Extra bright stars */}
      {[
        { x: 12, y: 8, size: 3 },
        { x: 78, y: 15, size: 2.5 },
        { x: 35, y: 55, size: 3 },
        { x: 88, y: 72, size: 2.5 },
        { x: 55, y: 30, size: 2 },
        { x: 22, y: 80, size: 3 },
      ].map((s, i) => (
        <motion.div
          key={`bright-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "white",
            boxShadow: "0 0 6px 2px rgba(148,215,255,0.8)",
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function NebulaLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute rounded-full opacity-[0.12]"
        style={{
          width: "70vw",
          height: "70vw",
          top: "-20%",
          left: "-15%",
          background: "radial-gradient(circle, #3b82f6 0%, #1d4ed8 30%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.09]"
        style={{
          width: "60vw",
          height: "60vw",
          bottom: "-10%",
          right: "-10%",
          background: "radial-gradient(circle, #7c3aed 0%, #4c1d95 30%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.07]"
        style={{
          width: "40vw",
          height: "40vw",
          top: "40%",
          left: "30%",
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

export function SpaceGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      }}
    />
  );
}

export function Planet({
  size = 700,
  position = { bottom: "-18%", right: "-8%" },
  colorStart = "#1e40af",
  colorMid = "#1e3a8a",
  glowColor = "rgba(37,99,235,0.35)",
  showRing = true,
}: {
  size?: number;
  position?: Record<string, string>;
  colorStart?: string;
  colorMid?: string;
  glowColor?: string;
  showRing?: boolean;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, ...position }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ring behind planet */}
      {showRing && (
        <div
          className="absolute"
          style={{
            width: size * 1.7,
            height: size * 0.28,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg)",
            borderRadius: "50%",
            border: `${size * 0.018}px solid rgba(99,179,237,0.15)`,
            boxShadow: `0 0 30px rgba(99,179,237,0.08)`,
          }}
        />
      )}
      {/* Planet glow halo */}
      <div
        className="absolute inset-[-12%] rounded-full opacity-40"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      {/* Planet body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 28%, ${colorStart}, ${colorMid} 45%, #050010 80%)`,
          boxShadow: `0 0 80px ${glowColor}, 0 0 160px rgba(37,99,235,0.1), inset -${size * 0.08}px -${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.9)`,
        }}
      />
      {/* Surface highlight */}
      <div
        className="absolute rounded-full opacity-15"
        style={{
          width: "40%",
          height: "20%",
          top: "22%",
          left: "20%",
          background: "radial-gradient(ellipse, rgba(147,197,253,0.6), transparent)",
          filter: "blur(8px)",
        }}
      />
      {/* Atmosphere rim */}
      <div
        className="absolute inset-0 rounded-full opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 55%, ${glowColor} 75%, transparent 90%)`,
        }}
      />
    </motion.div>
  );
}

export function OrbitalRing({
  size,
  duration,
  delay = 0,
  color = "rgba(56,189,248,0.2)",
}: {
  size: number;
  duration: number;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        border: `1px solid ${color}`,
        top: "50%",
        left: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
        boxShadow: `0 0 15px ${color}`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function GlowDot({
  size = 6,
  color = "#38bdf8",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${size}px ${color}40`,
        ...style,
      }}
      animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
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


