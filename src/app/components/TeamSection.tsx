import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { StarField, SectionLabel } from "./SpaceElements";
import { crewMembers, teamSection, type CrewMember, type SkillLevel } from "../data/landing";

const levelColors: Record<SkillLevel, string> = {
  Experto: "#22c55e",
  Avanzado: "#38bdf8",
  Sólido: "#a78bfa",
};

function SkillBadge({ label, level, color }: { label: string; level: SkillLevel; color: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-b-0">
      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Orbitron', monospace" }}>{label}</span>
      <span
        className="text-[10px] px-2 py-0.5 rounded font-semibold"
        style={{
          background: `${levelColors[level]}15`,
          color: levelColors[level],
          border: `1px solid ${levelColors[level]}25`,
          fontFamily: "'Orbitron', monospace",
        }}
      >
        {level}
      </span>
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute inset-x-0 h-px pointer-events-none z-20"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
        filter: "blur(2px)",
      }}
      initial={{ top: "-2%" }}
      animate={{ top: "102%" }}
      transition={{ duration: 2.5, ease: "linear" }}
    />
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
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      tabIndex={0}
      role="button"
      aria-label={`Ver dossier de ${member.name}`}
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
      <motion.div
        className="relative overflow-hidden rounded-2xl transition-all duration-400"
        style={{
          background: isSelected ? `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))` : "rgba(255,255,255,0.015)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isSelected ? member.color + "50" : "rgba(255,255,255,0.05)"}`,
          boxShadow: isSelected ? `0 0 40px ${member.color}15, 0 0 0 1px ${member.color}30` : "0 4px 30px rgba(0,0,0,0.4)",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {isSelected && <ScanLine />}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${member.color}10, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
        <div className="relative overflow-hidden" style={{ height: 340 }}>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 20%, ${member.color}10, transparent 70%)` }} />
          <motion.img
            src={member.photo} alt={member.name}
            className="w-full h-full object-cover object-top transition-all duration-500"
            style={{ filter: isSelected ? "none" : undefined }}
            initial={{ filter: "brightness(0.85)" }}
            whileHover={{ filter: "brightness(1.05)", scale: 1.05 }}
          />
          <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: "linear-gradient(to top, rgba(3,0,20,0.95), transparent)" }} />
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded text-[11px] font-semibold" style={{ background: `${member.color}20`, border: `1px solid ${member.color}40`, color: member.color, fontFamily: "'Orbitron', monospace", letterSpacing: "0.08em" }}>
              {member.rol}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: member.color, boxShadow: `0 0 8px ${member.color}` }} />
            <h3 className="text-white text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.shortName}</h3>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.rol}</p>
          <p className="mt-2 text-slate-500 text-sm leading-relaxed line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {member.perfil}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {member.idiomas.map((idioma) => (
              <span key={idioma} className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.08em]" style={{ background: `${member.color}08`, border: `1px solid ${member.color}15`, color: "rgba(255,255,255,0.35)", fontFamily: "'Orbitron', monospace" }}>
                {idioma}
              </span>
            ))}
          </div>
          <motion.div
            className="mt-3 text-[10px] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}
          >
            Ver dossier →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LoadingDossier({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <motion.div
        className="rounded-full"
        style={{
          width: 48,
          height: 48,
          border: `2px solid ${color}20`,
          borderTopColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color, fontFamily: "'Orbitron', monospace" }}>
          CARGANDO DOSSIER
        </div>
        <div className="w-32 h-px mx-auto overflow-hidden rounded-full" style={{ background: `${color}15` }}>
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function DossierFlash({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 pointer-events-none"
      style={{ background: color }}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

function TechBadges({ member, b }: { member: CrewMember; b: number }) {
  return (
    <SectionFade delay={b + 0.2}>
      <SectionLabel2>STACK TECNOLÓGICO</SectionLabel2>
      <div className="space-y-2.5">
        {member.techGroups.map((group, gi) => (
          <div key={group.category}>
            <div className="text-[9px] uppercase tracking-[0.12em] mb-1" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', monospace" }}>
              {group.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((tech, ti) => (
                <motion.span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px]"
                  style={{ background: `${member.color}06`, border: `1px solid ${member.color}15`, color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: b + 0.25 + (gi * member.techGroups[0].items.length + ti) * 0.02 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFade>
  );
}

function ExpandedProfile({ member, onReady }: { member: CrewMember; onReady: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [phase, setPhase] = useState<"loading" | "content">("loading");
  const [expSect, setExpSect] = useState(false);

  useEffect(() => {
    setPhase("loading");
    setExpSect(false);
    const t = setTimeout(() => {
      setPhase("content");
      onReady();
    }, 300);
    return () => { clearTimeout(t); };
  }, [member, onReady]);

  useEffect(() => {
    if (ref.current && phase === "content") setHeight(ref.current.scrollHeight);
  }, [phase, member]);

  const b = 0.1;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: phase === "loading" ? 160 : height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ overflow: "hidden" }}
    >
      {phase === "loading" ? (
        <div
          className="relative rounded-2xl overflow-hidden mt-6"
          style={{
            background: "linear-gradient(180deg, rgba(6,8,28,0.98), rgba(3,3,18,0.98))",
            border: `1px solid ${member.color}35`,
            boxShadow: `0 20px 80px rgba(0,0,0,0.7), 0 0 0 1px ${member.color}15`,
          }}
        >
          <LoadingDossier color={member.color} />
        </div>
      ) : (
        <div ref={ref}>
          <DossierFlash color={member.color} />
          <div
            className="relative rounded-2xl overflow-hidden mt-6"
            style={{
              background: "linear-gradient(180deg, rgba(6,8,28,0.98), rgba(3,3,18,0.98))",
              border: `1px solid ${member.color}35`,
              boxShadow: `0 20px 80px rgba(0,0,0,0.7), 0 0 0 1px ${member.color}15, inset 0 1px 0 rgba(255,255,255,0.03)`,
            }}
          >
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
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.perfil}</p>
                  </div>
                </div>
              </SectionFade>

              <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, transparent, ${member.color}30, transparent)` }} />

              {/* COMPACT 2-COLUMN: Skills + Stats + Logros */}
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <SectionFade delay={b + 0.15}>
                    <SectionLabel2>DIAGNÓSTICO DEL OPERADOR</SectionLabel2>
                    <div className="rounded-lg overflow-hidden" style={{ background: `${member.color}04`, border: `1px solid ${member.color}10` }}>
                      {member.skills.map((s, i) => (
                        <SkillBadge key={s.label} label={s.label} level={s.level} color={member.color} />
                      ))}
                    </div>
                  </SectionFade>

                  {/* COLLAPSIBLE EXPERIENCE */}
                  <div className="mt-5">
                    <SectionFade delay={b + 0.35}>
                      <button
                        onClick={() => setExpSect((p) => !p)}
                        className="flex items-center gap-2 w-full text-left"
                      >
                        <SectionLabel2>REGISTRO DE EXPERIENCIA</SectionLabel2>
                        <motion.span
                          className="text-[9px]"
                          style={{ color: member.color }}
                          animate={{ rotate: expSect ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▼
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {expSect && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-1.5 overflow-hidden"
                          >
                            {member.experiencia.map((item, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start gap-2 text-xs leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                              >
                                <span className="mt-0.5 text-[9px]" style={{ color: member.color }}>{String.fromCharCode(9656)}</span>
                                {item}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </SectionFade>
                  </div>
                </div>

                <div>
                  {/* ESTADÍSTICAS */}
                  <SectionFade delay={b + 0.2}>
                    <SectionLabel2>ESTADÍSTICAS DE MISIÓN</SectionLabel2>
                    <div className="grid grid-cols-2 gap-2">
                      {member.stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="rounded-lg p-3 text-center"
                          style={{ background: `${member.color}06`, border: `1px solid ${member.color}12` }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: b + 0.25 + i * 0.04 }}
                        >
                          <div className="text-lg font-bold" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>{stat.value}</div>
                          <div className="text-[9px] uppercase tracking-[0.1em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}>{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </SectionFade>

                  {/* LOGROS */}
                  <div className="mt-5">
                    <SectionFade delay={b + 0.35}>
                      <SectionLabel2>LOGROS DESTACADOS</SectionLabel2>
                      <ul className="space-y-1.5">
                        {member.logros.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-xs leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: b + 0.4 + i * 0.04 }}
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

              {/* TECH BADGES (compact, below the grid) */}
              <div className="mt-5">
                <TechBadges member={member} b={b + 0.5} />
              </div>

              {/* IMPACT STATEMENT */}
              <SectionFade delay={b + 0.55}>
                <motion.div
                  className="mt-5 p-4 rounded-xl relative overflow-hidden"
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
      )}
    </motion.div>
  );
}

export function TeamSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const ref = useRef(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const selectedMember = selectedId !== null ? crewMembers.find((m) => m.id === selectedId) : null;

  const handleProfileReady = () => {
    setTimeout(() => profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  return (
    <section id="team-section" className="relative py-28 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #050510 0%, #04041c 50%, #050510 100%)" }}>
      <StarField count={80} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {crewMembers.map((m, i) => (
            <CrewCard key={m.id} member={m} isSelected={selectedId === m.id} onClick={() => setSelectedId((prev) => (prev === m.id ? null : m.id))} index={i} />
          ))}
        </div>

        <div ref={profileRef}>
          <AnimatePresence mode="wait">
            {selectedMember && <ExpandedProfile key={selectedMember.id} member={selectedMember} onReady={handleProfileReady} />}
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #030014)" }} />
    </section>
  );
}
