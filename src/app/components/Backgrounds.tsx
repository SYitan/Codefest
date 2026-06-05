import { useMemo } from "react";
import { motion } from "motion/react";
import { StarField } from "./SpaceElements";

type SectionTheme = "deep" | "navy" | "dark" | "purple";

const gradients: Record<SectionTheme, string> = {
  deep: "linear-gradient(180deg, #030014 0%, #050510 50%, #030014 100%)",
  navy: "linear-gradient(180deg, #050510 0%, #04041c 50%, #050510 100%)",
  dark: "linear-gradient(180deg, #050510 0%, #030014 50%, #050510 100%)",
  purple: "linear-gradient(180deg, #030014 0%, #0a041c 50%, #030014 100%)",
};

const themeOrbs: Record<SectionTheme, Array<{ color: string; size: number; x: number; y: number; blur: number; opacity: number; duration: number }>> = {
  deep: [
    { color: "#3b82f6", size: 600, x: -15, y: -10, blur: 120, opacity: 0.08, duration: 20 },
    { color: "#7c3aed", size: 500, x: 70, y: 60, blur: 100, opacity: 0.06, duration: 25 },
  ],
  navy: [
    { color: "#38bdf8", size: 400, x: 20, y: 30, blur: 100, opacity: 0.06, duration: 18 },
    { color: "#1d4ed8", size: 350, x: 60, y: -10, blur: 80, opacity: 0.05, duration: 22 },
  ],
  dark: [
    { color: "#6366f1", size: 500, x: 50, y: 40, blur: 120, opacity: 0.05, duration: 24 },
  ],
  purple: [
    { color: "#a855f7", size: 450, x: 30, y: 20, blur: 100, opacity: 0.07, duration: 20 },
    { color: "#3b82f6", size: 400, x: -10, y: 60, blur: 90, opacity: 0.05, duration: 26 },
  ],
};

function AmbientOrb({ color, size, x, y, blur, opacity, duration }: {
  color: string; size: number; x: number; y: number; blur: number; opacity: number; duration: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function ShootingStars() {
  const stars = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 40,
      delay: i * 5 + Math.random() * 10,
      duration: 1.5 + Math.random(),
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute h-px"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: 80,
            background: "linear-gradient(90deg, transparent, rgba(148,215,255,0.6), transparent)",
            rotate: -30 + Math.random() * 20,
            filter: "blur(0.5px)",
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: [null, 600], opacity: [0, 1, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function SectionBackground({ children, theme = "deep", stars = 0, className = "" }: {
  children: React.ReactNode;
  theme?: SectionTheme;
  stars?: number;
  className?: string;
}) {
  const orbs = themeOrbs[theme];
  return (
    <section className={`relative py-20 px-6 overflow-hidden ${className}`} style={{ background: gradients[theme] }}>
      {stars > 0 && <StarField count={stars} />}
      {orbs.map((orb, i) => (
        <AmbientOrb key={i} {...orb} />
      ))}
      <div className="relative z-10 max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function SectionDivider() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
  );
}

export function BottomFade() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #050510)" }} />
  );
}
