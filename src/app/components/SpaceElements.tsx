import { useMemo } from "react";
import { motion } from "motion/react";

export function StarField({ count = 220, lowPower }: { count?: number; lowPower?: boolean }) {
  const effectiveCount = lowPower ? Math.max(10, Math.floor((count ?? 220) / 3)) : count;
  const stars = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.4,
        opacity: Math.random() * 0.65 + 0.2,
        duration: Math.random() * 5 + 2.5,
        delay: Math.random() * 8,
      })),
    [effectiveCount]
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
          animate={lowPower ? undefined : { opacity: [s.opacity * 0.2, s.opacity, s.opacity * 0.2] }}
          transition={lowPower ? undefined : { duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
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

export function GlowDot({
  size = 6,
  color = "#38bdf8",
  style,
  lowPower,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  lowPower?: boolean;
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
      animate={lowPower ? undefined : { scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
      transition={lowPower ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
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


