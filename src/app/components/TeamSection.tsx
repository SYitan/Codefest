import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { StarField, SectionLabel } from "./SpaceElements";
import { crewMembers, teamSection, type CrewMember } from "../data/landing";

const techIcons: Record<string, string> = {
  Python: "\u{1F40D}", Java: "\u2615", React: "\u269B", Git: "\uD83D\uDD00",
  SQL: "\uD83D\uDED7", "APIs REST": "\uD83D\uDD17", "OpenAI APIs": "\uD83E\uDD16",
  Linux: "\uD83D\uDC27", n8n: "\u26A1", TypeScript: "\uD83D\uDCD8",
  JavaScript: "\uD83D\uDCDC", "Power Platform": "\u2699\uFE0F",
  "Power Pages": "\uD83D\uDCC4", "React Native": "\uD83D\uDCF1", HTML5: "\uD83C\uDF10",
  CSS3: "\uD83C\uDFA8",
};

function getTechIcon(tech: string): string {
  for (const [key, icon] of Object.entries(techIcons)) {
    if (tech.includes(key)) return icon;
  }
  return "\u25C8";
}

function ScanLine() {
  return (
    <motion.div
      className="absolute inset-x-0 h-px pointer-events-none z-20"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
        filter: "blur(2px)",
      }}
      animate={{ top: ["-2%", "102%"] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />
  );
}

function DiagnosticBar({ label, value, color, index }: { label: string; value: number; color: string; index: number }) {
  return (
    <motion.div
      className="mb-3"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.06, duration: 0.35 }}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Orbitron', monospace" }}>
            {label}
          </span>
        </div>
        <motion.span
          className="text-xs tabular-nums"
          style={{ color, fontFamily: "'Orbitron', monospace" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.06, duration: 0.3 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 10px ${color}30`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.35 + index * 0.06, duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
      }}
    />
  );
}

function DataRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-[10px] uppercase tracking-[0.15em] mb-1.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function CrewCard({ member, isSelected, onClick, index }: {
  member: CrewMember; isSelected: boolean; onClick: () => void; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isSelected ? `radial-gradient(ellipse at 50% 50%, ${member.color}20, transparent 70%)` : "none",
          filter: "blur(30px)",
        }}
        animate={isSelected ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 0 }}
        transition={isSelected ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
      />

      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-400"
        style={{
          background: isSelected
            ? `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`
            : "rgba(255,255,255,0.015)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isSelected ? member.color + "50" : "rgba(255,255,255,0.05)"}`,
          boxShadow: isSelected
            ? `0 0 40px ${member.color}15, 0 0 0 1px ${member.color}30`
            : "0 4px 30px rgba(0,0,0,0.4)",
        }}
      >
        {isSelected && <ScanLine />}

        <div className="relative overflow-hidden" style={{ height: 240 }}>
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 20%, ${member.color}10, transparent 70%)` }}
          />
          <img src={member.photo} alt={member.name}
            className="w-full h-full object-cover object-top transition-all duration-500"
            style={{ filter: isSelected ? "brightness(1.15) contrast(1.05)" : "brightness(0.85)" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-20"
            style={{ background: "linear-gradient(to top, rgba(3,0,20,0.95), transparent)" }}
          />
          <div className="absolute bottom-2.5 left-3">
            <div
              className="px-2 py-0.5 rounded text-[10px] font-semibold inline-block"
              style={{
                background: `${member.color}20`,
                border: `1px solid ${member.color}40`,
                color: member.color,
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.08em",
              }}
            >
              {member.rol}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: member.color, boxShadow: `0 0 6px ${member.color}` }} />
            <h3 className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {member.shortName}
            </h3>
          </div>
          <p className="text-slate-600 text-[11px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {member.rol}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedProfile({ member }: { member: CrewMember }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [member]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>
        <div
          className="relative rounded-2xl overflow-hidden mt-6"
          style={{
            background: "linear-gradient(180deg, rgba(6,8,28,0.98), rgba(3,3,18,0.98))",
            border: `1px solid ${member.color}35`,
            boxShadow: `0 20px 80px rgba(0,0,0,0.7), 0 0 0 1px ${member.color}15, inset 0 1px 0 rgba(255,255,255,0.03)`,
          }}
        >
          <GridOverlay />

          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${member.color}60, transparent)`,
              filter: "blur(2px)",
            }}
            animate={{ top: ["-2%", "102%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute right-6 top-6 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded" style={{
              background: `${member.color}08`,
              border: `1px solid ${member.color}20`,
            }}>
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: member.color, boxShadow: `0 0 8px ${member.color}` }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>
                DOSSIER ACTIVO
              </span>
            </div>
          </motion.div>

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <motion.div
                className="relative flex-shrink-0 mx-auto md:mx-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08, duration: 0.4 }}
              >
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden" style={{
                  border: `1px solid ${member.color}40`,
                  boxShadow: `0 0 40px ${member.color}15`,
                }}>
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(180deg, ${member.color}10, transparent 30%, ${member.color}08)`,
                    mixBlendMode: "overlay",
                  }} />
                  <motion.div
                    className="absolute inset-x-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: member.color }} />
                <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: member.color }} />
                <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: member.color }} />
                <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: member.color }} />
              </motion.div>

              <div className="flex-1 min-w-0 text-center md:text-left">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                  <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-1">
                    <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {member.name}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{
                      background: `${member.color}12`,
                      border: `1px solid ${member.color}25`,
                      color: member.color,
                      fontFamily: "'Orbitron', monospace",
                      letterSpacing: "0.05em",
                    }}>
                      {member.rol}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                    <div className="flex items-center gap-1.5">
                      <motion.div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <span className="text-[10px] text-slate-500" style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.05em" }}>
                        DISPONIBLE
                      </span>
                    </div>
                    <span className="text-slate-700">|</span>
                    <span className="text-[10px] text-slate-500" style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.05em" }}>
                      MISIÓN: CODEFEST AD ASTRA
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {member.perfil}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="h-px mb-8" style={{
              background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)`,
            }} />

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <DataRow label="DIAGNÓSTICO DEL OPERADOR">
                  {member.skills.map((s, i) => (
                    <DiagnosticBar key={s.label} {...s} color={member.color} index={i} />
                  ))}
                </DataRow>

                <div className="mt-7">
                  <DataRow label="REGISTRO DE EXPERIENCIA">
                    <ul className="space-y-2">
                      {member.experiencia.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.04 }}
                        >
                          <span className="mt-0.5 text-[10px]" style={{ color: member.color }}>{String.fromCharCode(9656)}</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </DataRow>
                </div>

                <div className="mt-7">
                  <DataRow label="FORTALEZAS">
                    <div className="flex flex-wrap gap-2">
                      {member.fortalezas.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs"
                          style={{
                            background: `${member.color}06`,
                            border: `1px solid ${member.color}18`,
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + i * 0.03 }}
                        >
                          <span style={{ color: member.color }}>{String.fromCharCode(10003)}</span>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </DataRow>
                </div>
              </div>

              <div>
                <DataRow label="STACK TECNOLÓGICO">
                  <div className="flex flex-wrap gap-2">
                    {member.tecnologias.map((tech, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs"
                        style={{
                          background: `${member.color}08`,
                          border: `1px solid ${member.color}18`,
                          color: member.color,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + i * 0.04 }}
                      >
                        <span className="text-sm">{getTechIcon(tech)}</span>
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </DataRow>

                <div className="mt-7">
                  <DataRow label="CONTRIBUCIONES ACTUALES">
                    <ul className="space-y-2">
                      {member.contribuciones.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.04 }}
                        >
                          <span className="mt-0.5 text-xs" style={{ color: member.color }}>{String.fromCharCode(9670)}</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </DataRow>
                </div>

                <div className="mt-7">
                  <DataRow label="LOGROS DESTACADOS">
                    <ul className="space-y-2">
                      {member.logros.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + i * 0.04 }}
                        >
                          <span className="mt-0.5" style={{ color: member.color }}>{String.fromCharCode(9733)}</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </DataRow>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-10 p-5 md:p-6 rounded-xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${member.color}06, transparent 60%)`,
                border: `1px solid ${member.color}15`,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${member.color}08, transparent 70%)` }} />
              <div className="relative z-10">
                <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>
                  DECLARACIÓN DE IMPACTO
                </div>
                <p className="text-sm md:text-base leading-relaxed" style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontStyle: "italic",
                }}>
                  &ldquo;{member.valorEquipo}&rdquo;
                </p>
              </div>
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
      setTimeout(() => profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
    }
  }, [selectedMember]);

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #050510 0%, #04041c 50%, #050510 100%)" }}>
      <StarField count={80} />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionLabel>{teamSection.label}</SectionLabel>
          <h2 className="text-white mt-2 mb-3" style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", letterSpacing: "-0.02em" }}>
            {teamSection.title}
          </h2>
          <p className="text-slate-600 max-w-md mx-auto text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {teamSection.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #030014)" }} />
    </section>
  );
}
