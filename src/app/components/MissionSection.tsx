import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { SectionLabel, GlassCard, SpaceGrid, StarField } from "./SpaceElements";
import { Target, Lightbulb, Rocket } from "lucide-react";

const stats = [
  { value: "4", label: "Engineers", color: "#38bdf8" },
  { value: "∞", label: "Ambition", color: "#a78bfa" },
  { value: "1", label: "Mission", color: "#34d399" },
];

const pillars = [
  {
    icon: Target,
    color: "#38bdf8",
    title: "Context-Aware",
    desc: "Our agent understands context and user intent to deliver precise, actionable responses.",
  },
  {
    icon: Lightbulb,
    color: "#a78bfa",
    title: "Intelligent Automation",
    desc: "Automates repetitive tasks by integrating services and processing information in real time.",
  },
  {
    icon: Rocket,
    color: "#34d399",
    title: "Real-World Impact",
    desc: "Built to solve actual problems, not demos — engineered for practical, measurable outcomes.",
  },
];

function FadeIn({ children, delay = 0, dir = "up" }: { children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial = dir === "up" ? { opacity: 0, y: 28 } : dir === "left" ? { opacity: 0, x: -28 } : { opacity: 0, x: 28 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MissionSection() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030014 0%, #050516 100%)" }}
    >
      <SpaceGrid />
      <StarField count={60} />

      {/* Purple nebula accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "60vh",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Mission Overview</SectionLabel>
            <h2
              className="text-white mt-2"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Our Objective
            </h2>
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-16 flex-wrap">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={0.05 + i * 0.1}>
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "2.8rem",
                    fontWeight: 900,
                    color: s.color,
                    textShadow: `0 0 30px ${s.color}60`,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-slate-500 text-xs mt-1 tracking-widest uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Main text */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <FadeIn dir="left" delay={0.1}>
            <GlassCard className="p-8" glowColor="rgba(56,189,248,0.05)">
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "#38bdf8", fontFamily: "'Orbitron', monospace" }}
              >
                Who We Are
              </div>
              <p
                className="text-slate-300 leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.8 }}
              >
                We are a team of university students combining practical experience in{" "}
                <span className="text-cyan-300">software development</span>,{" "}
                <span className="text-violet-300">process automation</span>, and{" "}
                <span className="text-emerald-300">digital product construction</span>. Though early in our
                careers, we have completed the full development cycle — from identifying a need to deploying a
                working solution.
              </p>
            </GlassCard>
          </FadeIn>

          <FadeIn dir="right" delay={0.2}>
            <GlassCard className="p-8" glowColor="rgba(139,92,246,0.06)">
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "#a78bfa", fontFamily: "'Orbitron', monospace" }}
              >
                Our Mission
              </div>
              <p
                className="text-slate-300 leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.8 }}
              >
                For CODEFEST AD ASTRA 2026, we aim to build an{" "}
                <span className="text-violet-300">intelligent AI agent</span> that understands context,
                automates complex tasks, and assists users through{" "}
                <span className="text-cyan-300">actionable, real-time information</span>. Not a demo — a
                system built for the real world.
              </p>
            </GlassCard>
          </FadeIn>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 + i * 0.12}>
              <div
                className="p-6 rounded-xl text-center group hover:scale-[1.02] transition-transform duration-300"
                style={{
                  background: `${p.color}06`,
                  border: `1px solid ${p.color}20`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${p.color}12`,
                    border: `1px solid ${p.color}25`,
                    boxShadow: `0 0 20px ${p.color}20`,
                  }}
                >
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <h4
                  className="text-white mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  {p.title}
                </h4>
                <p
                  className="text-slate-500 text-sm leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
