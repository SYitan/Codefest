import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { SectionLabel, StarField, GlassCard } from "./SpaceElements";
import { Target, Users, Wrench, BrainCircuit, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Target,
    color: "#38bdf8",
    title: "Solve Real Problems",
    desc: "We want to build solutions that matter beyond the competition. Real utility for real people.",
  },
  {
    icon: Users,
    color: "#a78bfa",
    title: "Learn From Others",
    desc: "CODEFEST brings together exceptional builders. We grow fastest in environments that challenge us.",
  },
  {
    icon: Wrench,
    color: "#34d399",
    title: "Build Useful Technology",
    desc: "Not demos, not slides — working software. Our goal is to ship something genuinely functional.",
  },
  {
    icon: BrainCircuit,
    color: "#fb923c",
    title: "Create a Functional Agent",
    desc: "An intelligent agent that understands, automates, and assists — built end-to-end by our team.",
  },
  {
    icon: CheckCircle2,
    color: "#f472b6",
    title: "Prove Execution",
    desc: "We don't just plan — we execute. CODEFEST is our stage to demonstrate what our team can deliver.",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030014 0%, #04041c 50%, #030014 100%)" }}
    >
      <StarField count={80} />

      {/* Side glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "40vw",
          height: "60vh",
          background: "radial-gradient(ellipse at right, rgba(56,189,248,0.06), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>Motivation</SectionLabel>
          <h2
            className="text-white mt-2"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Why CODEFEST?
          </h2>
          <p
            className="text-slate-500 mt-3 max-w-lg mx-auto text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            More than a competition — a launchpad for impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={0.05 + i * 0.1}>
              <div
                className="p-6 rounded-2xl h-full group hover:scale-[1.025] transition-transform duration-300"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${r.color}18`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = `${r.color}06`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${r.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${r.color}18`;
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${r.color}12`,
                    border: `1px solid ${r.color}25`,
                  }}
                >
                  <r.icon size={20} style={{ color: r.color }} />
                </div>
                <h4
                  className="text-white mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem" }}
                >
                  {r.title}
                </h4>
                <p
                  className="text-slate-500 text-sm leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {r.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quote */}
        <FadeIn delay={0.5}>
          <GlassCard
            className="p-8 text-center"
            glowColor="rgba(56,189,248,0.06)"
            style={{ borderColor: "rgba(56,189,248,0.15)" }}
          >
            <div className="text-slate-600 text-3xl mb-4">"</div>
            <p
              className="text-slate-300 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", lineHeight: 1.8 }}
            >
              We believe the next generation of software will not just execute instructions — it will{" "}
              <span className="text-cyan-300">understand context</span>, process information, and{" "}
              <span className="text-violet-300">actively assist people</span> in making better decisions.
            </p>
            <div
              className="mt-4 text-xs tracking-widest uppercase"
              style={{ color: "#38bdf8", fontFamily: "'Orbitron', monospace" }}
            >
              Our Vision
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
