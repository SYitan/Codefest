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
    <div className="flex items-center justify-between py-2 px-3 border-b border-white/5 last:border-b-0">
      <span className="text-xs md:text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Orbitron', monospace" }}>{label}</span>
      <span
        className="text-[11px] px-2.5 py-0.5 rounded font-semibold"
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
    <div className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}>
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
      {/* Card glow on select/hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${member.color}25, transparent 70%)`,
          filter: "blur(50px)",
        }}
        animate={isSelected ? { opacity: [0.3, 0.9, 0.3], scale: [1, 1.05, 1] } : { opacity: 0, scale: 0.9 }}
        transition={isSelected ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
      />
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${member.color}10, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.015)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isSelected ? member.color + "60" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isSelected
            ? `0 0 60px ${member.color}20, 0 0 0 1px ${member.color}40`
            : "0 4px 30px rgba(0,0,0,0.5)",
        }}
        whileHover={{ scale: 1.03, y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Hover border glow overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            border: `1px solid ${member.color}60`,
            boxShadow: `0 0 40px ${member.color}25, inset 0 0 40px ${member.color}10`,
          }}
        />

        {/* Photo */}
        <div className="relative" style={{ height: 240 }}>
          <div className="absolute inset-0 z-[1]" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)` }} />
          <motion.img
            src={member.photo} alt={member.name}
            className="w-full h-full object-cover object-top"
            initial={{ filter: "brightness(0.85)" }}
            whileHover={{ filter: "brightness(1.08)", scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />

          {/* ACTIVO badge - bottom left of photo */}
          <div className="absolute bottom-3 left-3 z-[2] flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[8px] uppercase tracking-[0.15em] text-white/50" style={{ fontFamily: "'Orbitron', monospace" }}>
              ACTIVO
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rol */}
          <div className="text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>
            {member.rol}
          </div>

          {/* Name */}
          <h3 className="text-white font-bold leading-tight mb-2" style={{ fontSize: "1.1rem", fontFamily: "'Space Grotesk', sans-serif" }}>
            {member.shortName}
          </h3>

          {/* Specialties dot-separated */}
          <div className="flex flex-wrap gap-x-1 gap-y-0.5 mb-3">
            {member.specialties.map((s, i) => (
              <span key={s} className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {i > 0 && <span className="mr-1" style={{ color: "rgba(255,255,255,0.15)" }}>•</span>}
                {s}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, ${member.color}30, transparent)` }} />

          {/* First stat */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Orbitron', monospace" }}>{member.stats[0].value}</span>
            <span className="text-[8px] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}>{member.stats[0].label}</span>
          </div>

          {/* VER DOSSIER — appears on hover */}
          <motion.div
            className="mt-3 text-[9px] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}
          >
            VER DOSSIER →
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
      <div className="space-y-4">
        {member.techGroups.map((group, gi) => (
          <div key={group.category}>
            <div className="text-xs uppercase tracking-[0.12em] mb-2" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}>
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((tech, ti) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 rounded text-sm cursor-default"
                  style={{ background: `${member.color}06`, border: `1px solid ${member.color}15`, color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.06, background: `${member.color}10`, borderColor: `${member.color}30`, color: "rgba(255,255,255,0.8)" }}
                  transition={{ delay: b + 0.25 + (gi * (member.techGroups[0]?.items.length ?? 4) + ti) * 0.02 }}
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
  const [expSect, setExpSect] = useState(true);

  useEffect(() => {
    setPhase("loading");
    setExpSect(true);
    const t = setTimeout(() => {
      setPhase("content");
      onReady();
    }, 300);
    return () => { clearTimeout(t); };
  }, [member, onReady]);

  useEffect(() => {
    if (ref.current && phase === "content") setHeight(ref.current.scrollHeight);
  }, [phase, member, expSect]);

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
            {/* Scan line */}
            <motion.div
              className="absolute inset-x-0 h-px pointer-events-none z-10"
              style={{ background: `linear-gradient(90deg, transparent, ${member.color}60, transparent)`, filter: "blur(2px)" }}
              animate={{ top: ["-2%", "102%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 p-10 md:p-14">
              {/* HEADER — bigger */}
              <SectionFade delay={b}>
                <div className="flex items-center gap-8 mb-8">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden"
                      style={{ border: `1px solid ${member.color}40`, boxShadow: `0 0 50px ${member.color}15` }}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: b, duration: 0.4 }}
                    >
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${member.color}15, transparent 30%, ${member.color}08)`, mixBlendMode: "overlay" }} />
                    </motion.div>
                    {/* Corner decorations */}
                    <motion.div className="absolute -top-2.5 -left-2.5 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: member.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: b + 0.1 }} />
                    <motion.div className="absolute -top-2.5 -right-2.5 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: member.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: b + 0.15 }} />
                    <motion.div className="absolute -bottom-2.5 -left-2.5 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: member.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: b + 0.2 }} />
                    <motion.div className="absolute -bottom-2.5 -right-2.5 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: member.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: b + 0.25 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <motion.div className="flex items-center gap-2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: b + 0.1 }}>
                        <motion.div className="w-2 h-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      </motion.div>
                      <h2 className="text-white text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.name}</h2>
                      <motion.span className="text-sm px-3 py-0.5 rounded font-medium" style={{ background: `${member.color}12`, border: `1px solid ${member.color}25`, color: member.color, fontFamily: "'Orbitron', monospace" }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: b + 0.2 }}>
                        {member.rol}
                      </motion.span>
                    </div>
                    <motion.p className="text-slate-500 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: b + 0.25 }}>
                      {member.perfil}
                    </motion.p>
                    <motion.div className="flex flex-wrap gap-2 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: b + 0.35 }}>
                      {member.specialties.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: `${member.color}10`, border: `1px solid ${member.color}20`, color: member.color, fontFamily: "'Orbitron', monospace" }}>{s}</span>
                      ))}
                      {member.idiomas.map((idi) => (
                        <span key={idi} className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)", fontFamily: "'Orbitron', monospace" }}>{idi}</span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </SectionFade>

              {/* Divider */}
              <div className="relative h-px mb-10" style={{ background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)` }}>
                <motion.div className="absolute left-1/2 -top-1 w-2 h-2 rotate-45" style={{ background: member.color, boxShadow: `0 0 8px ${member.color}` }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: b + 0.3 }} />
              </div>

              {/* 2-COLUMN CONTENT */}
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                <div>
                  {/* Skills */}
                  <SectionFade delay={b + 0.15}>
                    <SectionLabel2>DIAGNÓSTICO DEL OPERADOR</SectionLabel2>
                    <motion.div className="rounded-lg overflow-hidden" style={{ background: `${member.color}04`, border: `1px solid ${member.color}10` }} whileHover={{ boxShadow: `0 0 20px ${member.color}08` }} transition={{ duration: 0.3 }}>
                      {member.skills.map((s, i) => (
                        <SkillBadge key={s.label} label={s.label} level={s.level} color={member.color} />
                      ))}
                    </motion.div>
                  </SectionFade>

                  {/* COLLAPSIBLE EXPERIENCE */}
                  <div className="mt-10">
                    <SectionFade delay={b + 0.35}>
                      <button
                        onClick={() => setExpSect((p) => !p)}
                        className="flex items-center gap-2 w-full text-left group"
                      >
                        <SectionLabel2>REGISTRO DE EXPERIENCIA</SectionLabel2>
                        <motion.span
                          className="text-xs"
                          style={{ color: member.color }}
                          animate={{ rotate: expSect ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▼
                        </motion.span>
                      </button>
                      <motion.ul
                        className="space-y-2.5 overflow-hidden"
                        animate={expSect ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.experiencia.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm md:text-base leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <span className="mt-0.5" style={{ color: member.color, fontSize: "10px" }}>{String.fromCharCode(9656)}</span>
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </SectionFade>
                  </div>
                </div>

                <div>
                  {/* Stats */}
                  <SectionFade delay={b + 0.2}>
                    <SectionLabel2>ESTADÍSTICAS DE MISIÓN</SectionLabel2>
                    <div className="grid grid-cols-2 gap-4">
                      {member.stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="rounded-xl p-5 text-center cursor-default"
                          style={{ background: `${member.color}06`, border: `1px solid ${member.color}12` }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: b + 0.25 + i * 0.06, duration: 0.35 }}
                          whileHover={{ scale: 1.04, y: -2, boxShadow: `0 8px 25px ${member.color}15`, borderColor: `${member.color}30` }}
                        >
                          <div className="text-4xl font-bold" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>{stat.value}</div>
                          <div className="text-xs uppercase tracking-[0.1em] mt-1.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}>{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </SectionFade>

                  {/* Logros */}
                  <div className="mt-10">
                    <SectionFade delay={b + 0.35}>
                      <SectionLabel2>LOGROS DESTACADOS</SectionLabel2>
                      <ul className="space-y-2.5">
                        {member.logros.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm md:text-base leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: b + 0.4 + i * 0.05 }}
                          >
                            <motion.span className="mt-0.5 text-sm" style={{ color: member.color }} whileHover={{ scale: 1.3 }}>{String.fromCharCode(9733)}</motion.span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </SectionFade>
                  </div>
                </div>
              </div>

              {/* Tech Badges — full width below columns */}
              <div className="mt-10">
                <TechBadges member={member} b={b + 0.5} />
              </div>

              {/* Impact */}
              <SectionFade delay={b + 0.55}>
                <motion.div
                  className="mt-10 p-6 md:p-8 rounded-xl relative overflow-hidden group"
                  style={{ background: `linear-gradient(135deg, ${member.color}08, transparent 60%)`, border: `1px solid ${member.color}15` }}
                  whileHover={{ borderColor: `${member.color}40`, boxShadow: `0 0 40px ${member.color}10` }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${member.color}10, transparent 70%)` }} />
                  <motion.div className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-10" style={{ background: member.color, filter: "blur(20px)" }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                  <div className="relative z-10">
                    <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}>DECLARACIÓN DE IMPACTO</div>
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Space Grotesk', sans-serif", fontStyle: "italic" }}>
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
    setTimeout(() => profileRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
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
