import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { StarField, SectionLabel } from "./SpaceElements";
import { X } from "lucide-react";
import img1 from "../../imports/image-1.png";
import img2 from "../../imports/image-2.png";
import img3 from "../../imports/image-3.png";
import img4 from "../../imports/image-4.png";

interface Skill {
  label: string;
  value: number;
}

interface CrewMember {
  id: number;
  photo: string;
  name: string;
  shortName: string;
  spaceTitle: string;
  role: string;
  currentFocus: string;
  experience: string[];
  strengths: string[];
  contributions: string[];
  missionValue: string;
  skills: Skill[];
  color: string;
}

const crewMembers: CrewMember[] = [
  {
    id: 0,
    photo: img1,
    name: "Brian Stiven Alba Celis",
    shortName: "Brian",
    spaceTitle: "Automation Specialist",
    role: "Software Developer & Automation Engineer",
    currentFocus: "AI Agents \u2022 Automation \u2022 Product Development",
    experience: [
      "Desarrollo de aplicaciones web",
      "Automatizaci\u00f3n de procesos",
      "Dise\u00f1o de soluciones digitales",
      "Desarrollo de aplicaciones m\u00f3viles",
      "Integraci\u00f3n de servicios y APIs",
    ],
    strengths: [
      "Problem Solving",
      "Rapid Learning",
      "Process Automation",
      "Software Development",
      "System Integration",
    ],
    contributions: [
      "Investigaci\u00f3n de arquitecturas para agentes IA",
      "Dise\u00f1o de flujos automatizados",
      "Desarrollo de funcionalidades backend",
      "Integraci\u00f3n entre servicios",
      "Construcci\u00f3n de prototipos funcionales",
    ],
    missionValue:
      "Capacidad para transformar procesos complejos en soluciones automatizadas y escalables.",
    skills: [
      { label: "Automation", value: 95 },
      { label: "AI", value: 85 },
      { label: "Backend", value: 90 },
      { label: "APIs", value: 85 },
    ],
    color: "#38bdf8",
  },
  {
    id: 1,
    photo: img2,
    name: "David Alejandro Rojas",
    shortName: "David",
    spaceTitle: "AI Systems Architect",
    role: "AI Engineer & Systems Designer",
    currentFocus: "LLMs \u2022 Neural Architectures \u2022 Agent Frameworks",
    experience: [
      "Dise\u00f1o de sistemas multi-agente",
      "Integraci\u00f3n de modelos de lenguaje",
      "Desarrollo de pipelines de datos",
      "Arquitecturas de IA escalables",
      "Optimizaci\u00f3n de inferencia",
    ],
    strengths: [
      "Systems Design",
      "Machine Learning",
      "Agent Orchestration",
      "Data Engineering",
      "Research & Development",
    ],
    contributions: [
      "Arquitectura del sistema multi-agente",
      "Integraci\u00f3n de modelos LLM",
      "Dise\u00f1o de flujos de razonamiento",
      "Optimizaci\u00f3n de respuestas",
      "Evaluaci\u00f3n de rendimiento",
    ],
    missionValue:
      "Capacidad para dise\u00f1ar sistemas de IA robustos que potencian la automatizaci\u00f3n inteligente.",
    skills: [
      { label: "AI/ML", value: 92 },
      { label: "Systems", value: 88 },
      { label: "Backend", value: 85 },
      { label: "Data", value: 80 },
    ],
    color: "#a78bfa",
  },
  {
    id: 2,
    photo: img3,
    name: "Santiago Felipe Mora",
    shortName: "Santiago",
    spaceTitle: "Full Stack Engineer",
    role: "Full Stack Developer & Platform Architect",
    currentFocus: "Web Platforms \u2022 Microservices \u2022 Cloud Infrastructure",
    experience: [
      "Desarrollo full stack",
      "Arquitectura de microservicios",
      "Infraestructura cloud",
      "Bases de datos distribuidas",
      "CI/CD y DevOps",
    ],
    strengths: [
      "Full Stack Development",
      "Cloud Architecture",
      "System Design",
      "Performance Optimization",
      "DevOps",
    ],
    contributions: [
      "Construcci\u00f3n de la plataforma web",
      "Despliegue y escalado en cloud",
      "Automatizaci\u00f3n de infraestructura",
      "Optimizaci\u00f3n de rendimiento",
      "Integraci\u00f3n de servicios",
    ],
    missionValue:
      "Capacidad para construir plataformas robustas y escalables que sirven como base para la innovaci\u00f3n.",
    skills: [
      { label: "Full Stack", value: 93 },
      { label: "Cloud", value: 87 },
      { label: "DevOps", value: 85 },
      { label: "Databases", value: 82 },
    ],
    color: "#34d399",
  },
  {
    id: 3,
    photo: img4,
    name: "Laura Valentina Ortiz",
    shortName: "Laura",
    spaceTitle: "Mobile & UX Specialist",
    role: "Mobile Developer & UX Designer",
    currentFocus: "Mobile Apps \u2022 UI/UX \u2022 User Research",
    experience: [
      "Desarrollo de aplicaciones m\u00f3viles",
      "Dise\u00f1o de interfaces de usuario",
      "Investigaci\u00f3n de experiencia de usuario",
      "Prototipado interactivo",
      "Integraci\u00f3n con APIs",
    ],
    strengths: [
      "Mobile Development",
      "UI/UX Design",
      "User Research",
      "Interactive Prototyping",
      "Cross-platform Dev",
    ],
    contributions: [
      "Dise\u00f1o de experiencia de usuario",
      "Desarrollo de interfaz m\u00f3vil",
      "Investigaci\u00f3n de usabilidad",
      "Creaci\u00f3n de prototipos",
      "Integraci\u00f3n con backend",
    ],
    missionValue:
      "Capacidad para crear experiencias m\u00f3viles intuitivas que conectan a los usuarios con la tecnolog\u00eda.",
    skills: [
      { label: "Mobile Dev", value: 90 },
      { label: "UI/UX", value: 88 },
      { label: "Prototyping", value: 85 },
      { label: "APIs", value: 80 },
    ],
    color: "#fb923c",
  },
];

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

function SkillBar({ label, value, color, index }: { label: string; value: number; color: string; index: number }) {
  return (
    <motion.div
      className="mb-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span
          className="text-xs text-slate-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {label}
        </span>
        <span
          className="text-xs tabular-nums"
          style={{ color, fontFamily: "'Orbitron', monospace" }}
        >
          {value}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}60, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
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
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${member.color}12, #030014 70%)`,
            }}
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
              style={{
                background: member.color,
                boxShadow: `0 0 6px ${member.color}`,
              }}
            />
            <h3
              className="text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {member.shortName}
            </h3>
          </div>
          <p
            className="text-slate-500 text-xs mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {member.role}
          </p>

          <div className="flex flex-wrap gap-2">
            {member.skills.slice(0, 3).map((skill) => (
              <span
                key={skill.label}
                className="text-xs px-2 py-0.5 rounded-md"
                style={{
                  background: `${member.color}10`,
                  border: `1px solid ${member.color}25`,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {skill.label}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${member.color}30, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function HolographicPanel({
  member,
  onClose,
}: {
  member: CrewMember;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-lg h-full overflow-y-auto"
        style={{
          background: "linear-gradient(180deg, #0a0a1a 0%, #060612 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "-10px 0 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)`,
          }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <X size={16} />
        </button>

        <div className="p-6 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: `${member.color}10`,
                border: `1px solid ${member.color}30`,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: member.color,
                  boxShadow: `0 0 6px ${member.color}`,
                }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: member.color, fontFamily: "'Orbitron', monospace", fontSize: "0.6rem" }}
              >
                Holographic Profile
              </span>
            </motion.div>
          </div>

          <motion.div
            className="flex gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-28 h-28 rounded-xl overflow-hidden relative"
                style={{
                  border: `1px solid ${member.color}40`,
                  boxShadow: `0 0 30px ${member.color}15`,
                }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${member.color}15, transparent 40%, ${member.color}10)`,
                    mixBlendMode: "overlay",
                  }}
                />
                <motion.div
                  className="absolute left-0 right-0 h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                  }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: member.color }} />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: member.color }} />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: member.color }} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: member.color }} />
            </div>

            <div className="flex-1 min-w-0">
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
              <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {member.role}
              </p>
              <p className="text-slate-500 text-xs mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Focus: {member.currentFocus}
              </p>
            </div>
          </motion.div>

          <div
            className="h-px mb-6 opacity-30"
            style={{ background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)` }}
          />

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
            >
              Skills Matrix
            </h4>
            {member.skills.map((skill, i) => (
              <SkillBar key={skill.label} label={skill.label} value={skill.value} color={member.color} index={i} />
            ))}
          </motion.div>

          <div
            className="h-px mb-6 opacity-30"
            style={{ background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)` }}
          />

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
            >
              Experience
            </h4>
            <ul className="space-y-1.5">
              {member.experience.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <span style={{ color: member.color }}>{">"}</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
            >
              Strengths
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.strengths.map((strength, i) => (
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
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  <span style={{ color: member.color }}>{"\u2714"}</span>
                  {strength}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
            >
              Current Contributions
            </h4>
            <ul className="space-y-1.5">
              {member.contributions.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                >
                  <span style={{ color: member.color }}>{"\u25C6"}</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mb-8 p-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${member.color}08, transparent)`,
              border: `1px solid ${member.color}20`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-2"
              style={{ color: member.color, fontFamily: "'Orbitron', monospace" }}
            >
              Mission Value
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;{member.missionValue}&rdquo;
            </p>
          </motion.div>
        </div>

        <div
          className="sticky bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{ background: "linear-gradient(to top, #060612, transparent)" }}
        />
      </motion.div>
    </div>
  );
}

export function TeamSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const selectedMember = selectedId !== null ? crewMembers.find((m) => m.id === selectedId) : null;

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
          <SectionLabel>Codefest Ad Astra 2026</SectionLabel>
          <h2
            className="text-white mt-2 mb-3"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            MISSION CREW
          </h2>
          <p
            className="text-slate-500 max-w-md mx-auto text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Select a crew member to view their mission profile
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {crewMembers.map((m, i) => (
            <CrewCard
              key={m.id}
              member={m}
              isSelected={selectedId === m.id}
              onClick={() => setSelectedId(m.id)}
              index={i}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 p-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: "#38bdf8", fontFamily: "'Orbitron', monospace" }}
              >
                4
              </div>
              <div
                className="text-xs text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Crew Members
              </div>
            </div>
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: "#a78bfa", fontFamily: "'Orbitron', monospace" }}
              >
                20+
              </div>
              <div
                className="text-xs text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Technologies
              </div>
            </div>
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: "#34d399", fontFamily: "'Orbitron', monospace" }}
              >
                1
              </div>
              <div
                className="text-xs text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Mission
              </div>
            </div>
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: "#fb923c", fontFamily: "'Orbitron', monospace" }}
              >
                {"\u221E"}
              </div>
              <div
                className="text-xs text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Innovation
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p
              className="text-xs text-center"
              style={{
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.15em",
              }}
            >
              CODEFEST AD ASTRA 2026 &middot; PREPARING FOR LAUNCH
            </p>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030014)" }}
      />

      <AnimatePresence>
        {selectedMember && <HolographicPanel member={selectedMember} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </section>
  );
}
