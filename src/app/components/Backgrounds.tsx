import { useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { StarField } from "./SpaceElements";

type SectionTheme = "deep" | "navy" | "dark" | "purple";

const gradients: Record<SectionTheme, string> = {
  deep: "linear-gradient(180deg, rgba(3,0,20,0.82) 0%, rgba(5,5,16,0.7) 50%, rgba(3,0,20,0.82) 100%)",
  navy: "linear-gradient(180deg, rgba(5,5,16,0.8) 0%, rgba(4,4,28,0.65) 50%, rgba(5,5,16,0.8) 100%)",
  dark: "linear-gradient(180deg, rgba(5,5,16,0.82) 0%, rgba(3,0,20,0.7) 50%, rgba(5,5,16,0.82) 100%)",
  purple: "linear-gradient(180deg, rgba(3,0,20,0.8) 0%, rgba(10,4,28,0.65) 50%, rgba(3,0,20,0.8) 100%)",
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

function AmbientOrb({ color, size, x, y, blur, opacity, duration, lowPower }: {
  color: string; size: number; x: number; y: number; blur: number; opacity: number; duration: number; lowPower?: boolean;
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
        ...(lowPower ? {} : { willChange: "transform" }),
      }}
      animate={lowPower ? undefined : { x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
      transition={lowPower ? undefined : { duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9999,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

export function ShootingStars({ lowPower }: { lowPower?: boolean }) {
  if (lowPower) return null;

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

export function ScrollFadeOrbs() {
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 400], [0, -60]);
  const orb1O = useTransform(scrollY, [0, 400], [0.08, 0]);
  const orb2Y = useTransform(scrollY, [0, 400], [0, -40]);
  const orb2O = useTransform(scrollY, [0, 400], [0.06, 0]);

  return (
    <>
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "clamp(260px, 30vw, 600px)",
          height: "clamp(260px, 30vw, 600px)",
          left: "-15%", top: "-10%",
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          filter: "blur(10vw)",
          y: orb1Y, opacity: orb1O,
        }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "clamp(220px, 25vw, 500px)",
          height: "clamp(220px, 25vw, 500px)",
          left: "70%", top: "60%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(8vw)",
          y: orb2Y, opacity: orb2O,
        }}
      />
    </>
  );
}

export function SectionBackground({ children, theme = "deep", stars = 0, className = "", lowPower }: {
  children: React.ReactNode;
  theme?: SectionTheme;
  stars?: number;
  className?: string;
  lowPower?: boolean;
}) {
  const orbs = themeOrbs[theme];
  return (
    <section className={`relative py-20 px-6 overflow-hidden ${className}`} style={{ background: gradients[theme] }}>
      {stars > 0 && <StarField count={lowPower ? Math.max(10, Math.floor(stars / 3)) : stars} lowPower={lowPower} />}
      {orbs.map((orb, i) => (
        <AmbientOrb key={i} {...orb} lowPower={lowPower} />
      ))}
      <div className="relative z-10 max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function SectionDivider() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px opacity-10" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
  );
}

export function BottomFade() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #030014)" }} />
  );
}
