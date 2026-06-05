import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { SectionLabel, StarField, GlassCard } from "./SpaceElements";
import { skillGroups, type SkillGroup } from "../data/landing";

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group"
    >
      <GlassCard
        className="p-7 h-full hover:scale-[1.02] transition-transform duration-400"
        glowColor={group.glowColor}
        style={{
          border: `1px solid ${group.borderColor}`,
          boxShadow: `0 4px 40px rgba(0,0,0,0.4), 0 0 60px ${group.glowColor}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: `${group.color}12`,
              border: `1px solid ${group.color}30`,
              boxShadow: `0 0 20px ${group.color}20`,
            }}
          >
            {group.emoji}
          </div>
          <div>
            <h3
              className="text-white"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            >
              {group.title}
            </h3>
            <div
              className="h-px mt-2"
              style={{ background: `linear-gradient(90deg, ${group.color}60, transparent)`, width: "80%" }}
            />
          </div>
        </div>

        {/* Skills list */}
        <div className="space-y-3">
          {group.skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 + i * 0.07 + 0.3 }}
              className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-300"
              style={{ background: "rgba(255,255,255,0.02)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = `${group.color}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${group.color}15` }}
              >
                <skill.icon size={14} style={{ color: group.color }} />
              </div>
              <div>
                <div
                  className="text-slate-200 text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {skill.label}
                </div>
                <div
                  className="text-slate-600 text-xs mt-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {skill.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050516 0%, #04041c 50%, #050510 100%)" }}
    >
      <StarField count={70} />

      {/* Cyan glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60vw",
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)",
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
          <SectionLabel>Technical Arsenal</SectionLabel>
          <h2
            className="text-white mt-2"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Core Skills
          </h2>
          <p
            className="text-slate-500 mt-3 max-w-md mx-auto text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A multi-disciplinary stack built for building intelligent systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
