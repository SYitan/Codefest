import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { SectionLabel, StarField, GlowDot } from "./SpaceElements";
import { Code2, Cpu, Smartphone, Zap, Brain, Rocket } from "lucide-react";

const events = [
  {
    year: "Phase 01",
    title: "Real-World Projects",
    desc: "Started building actual software beyond the classroom — web apps, services and APIs that solve real problems.",
    icon: Code2,
    color: "#38bdf8",
    side: "left",
  },
  {
    year: "Phase 02",
    title: "Process Automation",
    desc: "Designed and deployed automated workflows to eliminate manual bottlenecks and optimize repetitive operations.",
    icon: Zap,
    color: "#34d399",
    side: "right",
  },
  {
    year: "Phase 03",
    title: "Web Development",
    desc: "Built full-stack web applications with modern frameworks, REST APIs and database-backed architectures.",
    icon: Cpu,
    color: "#a78bfa",
    side: "left",
  },
  {
    year: "Phase 04",
    title: "Mobile Applications",
    desc: "Extended to mobile platforms — delivering cross-platform applications with native performance and polished UX.",
    icon: Smartphone,
    color: "#fb923c",
    side: "right",
  },
  {
    year: "Phase 05",
    title: "AI Exploration",
    desc: "Dove into LLMs, AI agents and intelligent automation — learning how to build systems that reason and act.",
    icon: Brain,
    color: "#f472b6",
    side: "left",
  },
  {
    year: "Phase 06",
    title: "CODEFEST AD ASTRA",
    desc: "Joining the mission. Bringing everything together to build an intelligent agent that makes a real difference.",
    icon: Rocket,
    color: "#fbbf24",
    side: "right",
    highlight: true,
  },
];

function TimelineEvent({ event, index }: { event: (typeof events)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = event.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-8`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <div
          className={`inline-block p-5 rounded-xl max-w-sm ${isLeft ? "ml-auto" : ""}`}
          style={{
            background: event.highlight ? `${event.color}10` : "rgba(255,255,255,0.02)",
            border: `1px solid ${event.color}${event.highlight ? "35" : "18"}`,
            boxShadow: event.highlight ? `0 0 30px ${event.color}15` : "none",
          }}
        >
          <div
            className="text-xs mb-1 tracking-widest uppercase"
            style={{ color: event.color, fontFamily: "'Orbitron', monospace", fontSize: "0.6rem" }}
          >
            {event.year}
          </div>
          <h4
            className="text-white mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem" }}
          >
            {event.title}
          </h4>
          <p
            className="text-slate-500 text-xs leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {event.desc}
          </p>
        </div>
      </div>

      {/* Center node */}
      <div className="flex flex-col items-center shrink-0 relative">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 relative"
          style={{
            background: `${event.color}15`,
            border: `2px solid ${event.color}50`,
            boxShadow: `0 0 20px ${event.color}35`,
          }}
        >
          <event.icon size={16} style={{ color: event.color }} />
        </div>
        {event.highlight && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${event.color}` }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1" />
    </motion.div>
  );
}

export function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #030014 100%)" }}
    >
      <StarField count={60} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>Mission Log</SectionLabel>
          <h2
            className="text-white mt-2"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Our Journey
          </h2>
          <p
            className="text-slate-500 mt-3 text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The path that brought us to CODEFEST AD ASTRA 2026.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(56,189,248,0.25) 15%, rgba(167,139,250,0.25) 50%, rgba(251,191,36,0.4) 85%, transparent)",
            }}
          />

          {events.map((event, i) => (
            <TimelineEvent key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
