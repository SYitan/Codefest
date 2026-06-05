import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useInView } from "motion/react";
import { StarField, SectionLabel } from "./SpaceElements";
import { crewMembers, teamSection, type CrewMember } from "../data/landing";

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

function DynaBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  return (
    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}40, ${color})`,
          boxShadow: `0 0 10px ${color}30`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay, duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

function SectionFade({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel2({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}>
      {children}
    </div>
  );
}

function StaggerGroup({ children, baseDelay, step = 0.04 }: { children: React.ReactNode[]; baseDelay: number; step?: number }) {
  return children.map((child, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: baseDelay + i * step, duration: 0.3 }}
    >
      {child}
    </motion.div>
  ));
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
          background: isSelected ? `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))` : "rgba(255,255,255,0.015)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isSelected ? member.color + "50" : "rgba(255,255,255,0.05)"}`,
          boxShadow: isSelected ? `0 0 40px ${member.color}15, 0 0 0 1px ${member.color}30` : "0 4px 30px rgba(0,0,0,0.4)",
        }}
      >
        {isSelected && <ScanLine />}
        <div className="relative overflow-hidden" style={{ height: 240 }}>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 20%, ${member.color}10, transparent 70%)` }} />
          <img src={member.photo} alt={member.name}
            className={`w-full h-full object-cover object-top transition-all duration-500 ${isSelected ? "scale-105" : "brightness-85"}`}
          />
          <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(to top, rgba(3,0,20,0.95), transparent)" }} />
          <div className="absolute bottom-2.5 left-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: `${member.color}20`, border: `1px solid ${member.color}40`, color: member.color, fontFamily: "'Orbitron', monospace", letterSpacing: "0.08em" }}>
              {member.rol}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: member.color, boxShadow: `0 0 6px ${member.color}` }} />
            <h3 className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.shortName}</h3>
          </div>
          <p className="text-slate-600 text-[11px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.rol}</p>
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

  const b = 0.1;

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
            style={{ background: `linear-gradient(90deg, transparent, ${member.color}60, transparent)`, filter: "blur(2px)" }}
            animate={{ top: ["-2%", "102%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 p-5 md:p-6">
            {/* HEADER */}
            <SectionFade delay={b}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden"
                    style={{ border: `1px solid ${member.color}40`, boxShadow: `0 0 30px ${member.color}15` }}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: b, duration: 0.3 }}
                  >
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${member.color}10, transparent 30%, ${member.color}08)`, mixBlendMode: "overlay" }} />
                  </motion.div>
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: member.color }} />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: member.color }} />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: member.color }} />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: member.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h2 className="text-white text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.name}</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: `${member.color}12`, border: `1px solid ${member.color}25`, color: member.color, fontFamily: "'Orbitron', monospace" }}>
                      {member.rol}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.perfil}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <span className="text-[9px] text-slate-600" style={{ fontFamily: "'Orbitron', monospace" }}>ACTIVO</span>
                    </div>
                    <span className="text-slate-700 text-[9px]" style={{ fontFamily: "'Orbitron', monospace" }}>MISIÓN: CODEFEST 2026</span>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start">
                  <motion.div
                    className="px-2.5 py-1.5 rounded text-[9px] uppercase tracking-[0.15em]"
                    style={{ background: `${member.color}08`, border: `1px solid ${member.color}20`, color: member.color, fontFamily: "'Orbitron', monospace" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: b + 0.1 }}
                  >
                    DOSSIER
                  </motion.div>
                </div>
              </div>
            </SectionFade>

            <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, transparent, ${member.color}30, transparent)` }} />

            {/* 2-COLUMN DASHBOARD */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {/* LEFT COL */}
              <div>
                <SectionFade delay={b + 0.15}>
                  <SectionLabel2>DIAGNÓSTICO DEL OPERADOR</SectionLabel2>
                  {member.skills.map((s, i) => (
                    <div key={s.label} className="mb-2.5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Orbitron', monospace" }}>{s.label}</span>
                        <motion.span
                          className="text-[11px] tabular-nums"
                          style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: b + 0.25 + i * 0.06 }}
                        >
                          {s.value}%
                        </motion.span>
                      </div>
                      <DynaBar value={s.value} color={member.color} delay={b + 0.25 + i * 0.06} />
                    </div>
                  ))}
                </SectionFade>

                <div className="mt-5">
                  <SectionFade delay={b + 0.35}>
                    <SectionLabel2>REGISTRO DE EXPERIENCIA</SectionLabel2>
                    <ul className="space-y-1.5">
                      {member.experiencia.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-xs leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: b + 0.4 + i * 0.04 }}
                        >
                          <span className="mt-0.5 text-[9px]" style={{ color: member.color }}>{String.fromCharCode(9656)}</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </SectionFade>
                </div>

                <div className="mt-5">
                  <SectionFade delay={b + 0.5}>
                    <SectionLabel2>CONTRIBUCIONES ACTUALES</SectionLabel2>
                    <ul className="space-y-1.5">
                      {member.contribuciones.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-xs leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: b + 0.55 + i * 0.04 }}
                        >
                          <span className="mt-0.5 text-[9px]" style={{ color: member.color }}>{String.fromCharCode(9670)}</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </SectionFade>
                </div>
              </div>

              {/* RIGHT COL */}
              <div>
                <SectionFade delay={b + 0.2}>
                  <SectionLabel2>STACK TECNOLÓGICO</SectionLabel2>
                  <div className="space-y-3">
                    {member.techGroups.map((g, gi) => (
                      <motion.div
                        key={g.category}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: b + 0.25 + gi * 0.06 }}
                      >
                        <div className="text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: `${member.color}80`, fontFamily: "'Orbitron', monospace" }}>
                          {g.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {g.items.map((tech, ti) => (
                            <span
                              key={ti}
                              className="px-2 py-0.5 rounded text-[10px]"
                              style={{ background: `${member.color}06`, border: `1px solid ${member.color}15`, color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </SectionFade>

                <div className="mt-5">
                  <SectionFade delay={b + 0.45}>
                    <SectionLabel2>MISSION STATS</SectionLabel2>
                    <div className="grid grid-cols-2 gap-2">
                      {member.stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="rounded-lg p-3 text-center"
                          style={{ background: `${member.color}06`, border: `1px solid ${member.color}12` }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: b + 0.5 + i * 0.04 }}
                        >
                          <div className="text-lg font-bold" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>{stat.value}</div>
                          <div className="text-[9px] uppercase tracking-[0.1em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}>{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </SectionFade>
                </div>

                <div className="mt-5">
                  <SectionFade delay={b + 0.55}>
                    <SectionLabel2>LOGROS DESTACADOS</SectionLabel2>
                    <ul className="space-y-1.5">
                      {member.logros.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-xs leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: b + 0.6 + i * 0.04 }}
                        >
                          <span className="mt-0.5" style={{ color: member.color }}>{String.fromCharCode(9733)}</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </SectionFade>
                </div>
              </div>
            </div>

            {/* IMPACT STATEMENT */}
            <SectionFade delay={b + 0.65}>
              <motion.div
                className="mt-6 p-4 rounded-xl relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${member.color}06, transparent 60%)`, border: `1px solid ${member.color}15` }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${member.color}08, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="text-[9px] uppercase tracking-[0.2em] mb-1.5" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>DECLARACIÓN DE IMPACTO</div>
                  <p className="text-xs md:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Space Grotesk', sans-serif", fontStyle: "italic" }}>
                    &ldquo;{member.valorEquipo}&rdquo;
                  </p>
                </div>
              </motion.div>
            </SectionFade>
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
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
          <p className="text-slate-600 max-w-md mx-auto text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{teamSection.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {crewMembers.map((m, i) => (
            <CrewCard key={m.id} member={m} isSelected={selectedId === m.id} onClick={() => setSelectedId((prev) => (prev === m.id ? null : m.id))} index={i} />
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
