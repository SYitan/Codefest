import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { StarField, SectionLabel } from "./SpaceElements";
import { crewMembers, teamSection, type CrewMember, type Skill } from "../data/landing";

function ScanLine({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        filter: "blur(1px)",
        boxShadow: `0 0 8px ${color}60, 0 0 20px ${color}30`,
      }}
      animate={{ top: ["-2%", "102%", "-2%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  );
}

function SkillBar({ label, value, color, index }: Skill & { color: string; index: number }) {
  return (
    <motion.div
      className="mb-2.5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {label}
        </span>
        <span className="text-xs tabular-nums" style={{ color, fontFamily: "'Orbitron', monospace" }}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}60, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.4 + index * 0.08, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function CrewCard({
  member,
  isSelected,
  onClick,
  index,
}: {
  member: CrewMember;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${member.color}25, transparent 70%)`,
            filter: "blur(20px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-1"
        style={{
          background: isSelected
            ? `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.02)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${isSelected ? member.color + "50" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isSelected
            ? `0 8px 60px rgba(0,0,0,0.6), 0 0 40px ${member.color}20, 0 0 0 1px ${member.color}30`
            : `0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)`,
          transform: isSelected ? "translateY(-4px)" : "none",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${member.color}60, transparent)` }}
        />

        {isSelected && <ScanLine color={member.color} />}

        <div className="relative overflow-hidden" style={{ height: 260 }}>
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 30%, ${member.color}12, #030014 70%)` }}
          />
          <div
            className="absolute top-3 left-3 w-6 h-6 border-t border-l opacity-60 z-10"
            style={{ borderColor: member.color }}
          />
          <div
            className="absolute top-3 right-3 w-6 h-6 border-t border-r opacity-60 z-10"
            style={{ borderColor: member.color }}
          />
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            style={{ filter: isSelected ? "brightness(1.1) contrast(1.05)" : "none" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to top, rgba(3,0,20,0.95), transparent)" }}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `${member.color}20`,
                border: `1px solid ${member.color}50`,
                color: member.color,
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
              }}
            >
              {member.spaceTitle}
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: member.color, boxShadow: `0 0 6px ${member.color}` }}
            />
            <h3
              className="text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem" }}
            >
              {member.shortName}
            </h3>
          </div>
          <p className="text-slate-500 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {member.spaceTitle}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${member.color}30, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function ExpandedProfile({ member }: { member: CrewMember }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [member]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>
        <div
          className="relative rounded-2xl overflow-hidden mt-5"
          style={{
            background: "linear-gradient(180deg, rgba(8,8,28,0.97), rgba(4,4,16,0.97))",
            backdropFilter: "blur(20px)",
            border: `1px solid ${member.color}30`,
            boxShadow: `0 8px 60px rgba(0,0,0,0.6), 0 0 0 1px ${member.color}15, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${member.color}50, transparent)`,
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse at 30% 20%, ${member.color}08, transparent 60%)`,
          }} />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: `${member.color}10`,
                  border: `1px solid ${member.color}30`,
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: member.color, boxShadow: `0 0 6px ${member.color}` }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: member.color, fontFamily: "'Orbitron', monospace", fontSize: "0.6rem" }}
                >
                  Perfil de Tripulación
                </span>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                <div
                  className="w-24 h-24 rounded-xl overflow-hidden relative"
                  style={{
                    border: `1px solid ${member.color}40`,
                    boxShadow: `0 0 30px ${member.color}15`,
                  }}
                >
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${member.color}15, transparent 40%, ${member.color}10)`,
                      mixBlendMode: "overlay",
                    }}
                  />
                  <motion.div
                    className="absolute left-0 right-0 h-[1px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: member.color }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: member.color }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: member.color }} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: member.color }} />
              </div>

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h2
                  className="text-white text-xl font-semibold mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {member.name}
                </h2>
                <div
                  className="text-xs px-2.5 py-1 rounded-full inline-block mb-2"
                  style={{
                    background: `${member.color}15`,
                    border: `1px solid ${member.color}30`,
                    color: member.color,
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {member.spaceTitle}
                </div>
                <p className="text-slate-400 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {member.subtitle}
                </p>
                <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {member.bio}
                </p>
              </div>
            </motion.div>

            <div
              className="h-px mb-6 opacity-30"
              style={{ background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)` }}
            />

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h4
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
                >
                  Matriz de Habilidades
                </h4>
                {member.skills.map((skill, i) => (
                  <SkillBar key={skill.label} {...skill} color={member.color} index={i} />
                ))}
              </motion.div>

              <div>
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <h4
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
                  >
                    Experiencia
                  </h4>
                  <ul className="space-y-1.5">
                    {member.experiencia.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.04 }}
                      >
                        <span style={{ color: member.color }}>{"\u25B8"}</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
                  >
                    Fortalezas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.fortalezas.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                        style={{
                          background: `${member.color}08`,
                          border: `1px solid ${member.color}20`,
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.04 }}
                      >
                        <span style={{ color: member.color }}>{"\u2714"}</span>
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <h4
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
                  >
                    Tecnologías Principales
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.tecnologias.map((tech, i) => (
                      <motion.div
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs"
                        style={{
                          background: `${member.color}10`,
                          border: `1px solid ${member.color}25`,
                          color: member.color,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + i * 0.04 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <h4
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
                  >
                    Contribuciones Actuales
                  </h4>
                  <ul className="space-y-1.5">
                    {member.contribuciones.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.04 }}
                      >
                        <span style={{ color: member.color }}>{"\u25C6"}</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-6 p-4 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${member.color}08, transparent)`,
                border: `1px solid ${member.color}20`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}
              >
                Valor que Aporta al Equipo
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{member.valorEquipo}&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const ref = useRef(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const selectedMember = selectedId !== null ? crewMembers.find((m) => m.id === selectedId) : null;

  useEffect(() => {
    if (selectedMember && profileRef.current) {
      setTimeout(() => {
        profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, [selectedMember]);

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #04041c 50%, #050510 100%)" }}
    >
      <StarField count={80} />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>{teamSection.label}</SectionLabel>
          <h2
            className="text-white mt-2 mb-3"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {teamSection.title}
          </h2>
          <p
            className="text-slate-500 max-w-md mx-auto text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {teamSection.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {crewMembers.map((m, i) => (
            <CrewCard
              key={m.id}
              member={m}
              isSelected={selectedId === m.id}
              onClick={() => setSelectedId((prev) => (prev === m.id ? null : m.id))}
              index={i}
            />
          ))}
        </div>

        <div ref={profileRef}>
          <AnimatePresence mode="wait">
            {selectedMember && <ExpandedProfile key={selectedMember.id} member={selectedMember} />}
          </AnimatePresence>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030014)" }}
      />
    </section>
  );
}
