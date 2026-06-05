import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { BrainCircuit, Code2, Smartphone, Zap } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { SectionBackground, SectionDivider, ShootingStars, GrainOverlay, BottomFade } from "./components/Backgrounds";
import { GlowDot } from "./components/SpaceElements";
import { HolographicOverlay } from "./components/visuals/HolographicOverlay";
import { NeuralNetworkBackground } from "./components/visuals/NeuralNetworkBackground";
import { ForegroundParticles } from "./components/visuals/ForegroundParticles";
import { teamCapabilities, teamStats } from "./data/landing";

const CosmicBackground = lazy(() => import("./components/visuals/CosmicBackground").then(m => ({ default: m.CosmicBackground })));

const capMeta = [
  { icon: BrainCircuit, color: "#a78bfa", label: "IA" },
  { icon: Code2, color: "#38bdf8", label: "Full Stack" },
  { icon: Smartphone, color: "#34d399", label: "Mobile" },
  { icon: Zap, color: "#fb923c", label: "Automatización" },
];

function getLowPowerMode() {
  if (typeof window === "undefined") return false;
  const isSmallScreen = window.innerWidth < 900;
  const lowCpu = typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4;
  const highDpr = window.devicePixelRatio > 2;
  return isSmallScreen || lowCpu || highDpr;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-8">
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
  const sectionRef = useRef(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <SectionBackground theme="deep" stars={40}>
      <SectionDivider />
      <div ref={sectionRef}>
        <motion.div
          ref={inViewRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>CAPACIDADES DEL EQUIPO</SectionLabel>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ y: cardY }}>
            {teamCapabilities.map((cap, i) => {
              const { icon: Icon, color } = capMeta[i];
              return (
                <motion.div
                  key={cap}
                  className="rounded-xl p-7 text-center relative overflow-hidden group cursor-default"
                  style={{
                    background: `linear-gradient(135deg, ${color}06, rgba(255,255,255,0.01))`,
                    border: `1px solid rgba(255,255,255,0.06)`,
                    backdropFilter: "blur(12px) saturate(1.1)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.04, y: -6, borderColor: `${color}40`,
                    boxShadow: `0 16px 48px ${color}20, 0 0 0 1px ${color}30`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                    style={{ background: `radial-gradient(ellipse at 50% 30%, ${color}15, transparent 70%)`, filter: "blur(40px)" }}
                  />
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `${color}08`,
                      border: `1px solid ${color}15`,
                      boxShadow: `0 0 20px ${color}05`,
                    }}
                  >
                    <Icon size={24} style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }} className="group-hover:text-white" />
                  </div>
                  <span
                    className="text-lg font-semibold block relative"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {cap}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </SectionBackground>
  );
}

function MetricsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const metrics = [
    { value: teamStats.solutions, label: "PROYECTOS" },
    { value: teamStats.sectors, label: "SECTORES" },
    { value: teamStats.members, label: "ESPECIALISTAS" },
    { value: teamStats.mission, label: "MISIÓN" },
  ];

  return (
    <SectionBackground theme="navy" stars={20}>
      <SectionDivider />
      <ShootingStars />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto relative"
      >
        <GlowDot size={4} color="#38bdf8" style={{ left: "-20px", top: "50%" }} />
        <GlowDot size={4} color="#818cf8" style={{ right: "-20px", top: "50%" }} />

        {metrics.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center relative group"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.06), transparent 70%)", filter: "blur(20px)" }}
            />
            <div className="relative">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Orbitron', monospace",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[9px] uppercase tracking-[0.2em] mt-1.5"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}
              >
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="max-w-xs mx-auto mt-8 h-px opacity-20" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
      <BottomFade />
    </SectionBackground>
  );
}

export default function App() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const updateMode = () => setLowPower(getLowPowerMode());
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        background: "#030014",
        colorScheme: "dark",
      }}
    >
      {/* Aurora gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 20% 0%, rgba(120,0,200,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 80% 50% at 80% 30%, rgba(0,180,255,0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 50% 60%, rgba(200,0,180,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 90% 50% at 30% 80%, rgba(0,255,180,0.04) 0%, transparent 50%)
            `,
          }}
        />
      </div>
      <GrainOverlay />
      <Suspense fallback={null}>
        <CosmicBackground lowPower={lowPower} />
      </Suspense>
      <NeuralNetworkBackground lowPower={lowPower} />
      <HolographicOverlay lowPower={lowPower} />
      <ForegroundParticles lowPower={lowPower} />
      <div className="relative z-10">
        <HeroSection />
        <CapabilitiesSection />
        <MetricsSection />
        <TeamSection />
      </div>
    </div>
  );
}
