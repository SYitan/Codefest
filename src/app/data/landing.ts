import {
  BrainCircuit, Zap, Cpu, Smartphone, Globe, Database,
  Code2, GitMerge, Layers, Brain, MessageSquareCode, BotMessageSquare, Network,
} from "lucide-react";
import img1 from "../../imports/image-1.png";
import img2 from "../../imports/image-2.png";
import img3 from "../../imports/image-3.png";
import img4 from "../../imports/image-4.png";

export interface Skill {
  label: string;
  value: number;
}

export interface CrewMember {
  id: number;
  photo: string;
  name: string;
  shortName: string;
  rol: string;
  perfil: string;
  skills: Skill[];
  experiencia: string[];
  fortalezas: string[];
  tecnologias: string[];
  contribuciones: string[];
  valorEquipo: string;
  logros: string[];
  color: string;
}

export const crewMembers: CrewMember[] = [
  {
    id: 0,
    photo: img3,
    name: "Matheus Aponte",
    shortName: "Matheus",
    rol: "AI Systems Architect",
    perfil: "Estudiante enfocado en inteligencia artificial, arquitectura de software y diseño de soluciones tecnológicas.",
    skills: [
      { label: "Technical Mastery", value: 78 },
      { label: "System Design", value: 82 },
      { label: "Problem Solving", value: 80 },
      { label: "AI Knowledge", value: 85 },
      { label: "Development Experience", value: 72 },
    ],
    experiencia: [
      "Investigación de agentes inteligentes y sus aplicaciones.",
      "Integración de modelos de IA en prototipos funcionales.",
      "Diseño de arquitecturas para aplicaciones modernas.",
      "Desarrollo de prototipos basados en IA.",
      "Evaluación de tecnologías emergentes para proyectos.",
    ],
    fortalezas: [
      "Arquitectura de Software",
      "Inteligencia Artificial",
      "Investigación Técnica",
      "Pensamiento Analítico",
      "Diseño de Soluciones",
    ],
    tecnologias: ["Python", "Java", "React", "Git", "SQL", "APIs REST", "OpenAI APIs"],
    contribuciones: [
      "Diseño de la arquitectura del agente.",
      "Definición de componentes de IA.",
      "Investigación y validación tecnológica.",
    ],
    valorEquipo:
      "Convierte requerimientos complejos en soluciones funcionales y escalables, conectando tecnología, producto y experiencia de usuario.",
    logros: [
      "Prototipo funcional de agente con IA.",
      "Integración temprana de LLMs en proyectos académicos.",
    ],
    color: "#38bdf8",
  },
  {
    id: 1,
    photo: img4,
    name: "Ian Di Filippo",
    shortName: "Ian",
    rol: "Automation, AI & Cybersecurity Specialist",
    perfil: "Estudiante con experiencia en automatización, inteligencia artificial y seguridad informática aplicada a proyectos tecnológicos.",
    skills: [
      { label: "Technical Mastery", value: 80 },
      { label: "System Design", value: 72 },
      { label: "Problem Solving", value: 85 },
      { label: "AI Knowledge", value: 82 },
      { label: "Development Experience", value: 75 },
    ],
    experiencia: [
      "Automatización de procesos con n8n y APIs.",
      "Integración de modelos de IA en flujos automatizados.",
      "Implementación de medidas básicas de ciberseguridad.",
      "Desarrollo de scripts para análisis de datos.",
      "Administración de sistemas Linux.",
    ],
    fortalezas: [
      "Automatización",
      "Inteligencia Artificial",
      "Ciberseguridad",
      "Resolución de Problemas",
      "Adaptabilidad",
    ],
    tecnologias: ["Python", "Java", "Git", "Linux", "n8n", "OpenAI APIs", "APIs REST"],
    contribuciones: [
      "Automatización de flujos de trabajo.",
      "Integración de IA en procesos.",
      "Seguridad en integraciones.",
    ],
    valorEquipo:
      "Automatiza procesos complejos y protege las integraciones, asegurando que los flujos de trabajo sean eficientes y seguros.",
    logros: [
      "Flujo automatizado para procesamiento de datos.",
      "Implementación de agente con capacidades de IA.",
    ],
    color: "#a78bfa",
  },
  {
    id: 2,
    photo: img1,
    name: "Brian Alba",
    shortName: "Brian",
    rol: "Lead Full Stack Developer",
    perfil: "Estudiante con experiencia en desarrollo full stack, automatización de procesos e integración de plataformas empresariales.",
    skills: [
      { label: "Technical Mastery", value: 85 },
      { label: "System Design", value: 80 },
      { label: "Problem Solving", value: 82 },
      { label: "AI Knowledge", value: 70 },
      { label: "Development Experience", value: 82 },
    ],
    experiencia: [
      "Desarrollo full stack con React, TypeScript y Java.",
      "Automatización de procesos con Power Platform y n8n.",
      "Creación de portales con Power Pages.",
      "Integración de sistemas y APIs REST.",
      "Gestión de bases de datos SQL.",
    ],
    fortalezas: [
      "Desarrollo Full Stack",
      "Automatización",
      "Integración de Sistemas",
      "Pensamiento de Producto",
      "Aprendizaje Autónomo",
    ],
    tecnologias: ["React", "Java", "JavaScript", "TypeScript", "Power Platform", "Power Pages", "n8n", "Git", "SQL", "APIs REST"],
    contribuciones: [
      "Liderazgo técnico del equipo.",
      "Desarrollo de la plataforma principal.",
      "Integración de servicios y APIs.",
      "Diseño de la lógica de negocio.",
    ],
    valorEquipo:
      "Lidera el desarrollo técnico del equipo, conectando el frontend con el backend y asegurando que cada integración funcione de extremo a extremo.",
    logros: [
      "Plataforma funcional con múltiples integraciones.",
      "Automatización de procesos manuales complejos.",
    ],
    color: "#06b6d4",
  },
  {
    id: 3,
    photo: img2,
    name: "Diego Panteve",
    shortName: "Diego",
    rol: "Frontend & Mobile Engineer",
    perfil: "Estudiante enfocado en desarrollo frontend y mobile, construcción de interfaces modernas y experiencias de usuario intuitivas.",
    skills: [
      { label: "Technical Mastery", value: 78 },
      { label: "System Design", value: 72 },
      { label: "Problem Solving", value: 80 },
      { label: "AI Knowledge", value: 65 },
      { label: "Development Experience", value: 76 },
    ],
    experiencia: [
      "Desarrollo de interfaces con React y React Native.",
      "Construcción de aplicaciones mobile funcionales.",
      "Maquetación con HTML5, CSS3 y TypeScript.",
      "Consumo de APIs REST en aplicaciones.",
      "Control de versiones con Git.",
    ],
    fortalezas: [
      "Frontend",
      "Mobile Development",
      "UI Engineering",
      "Resolución de Problemas",
      "Trabajo en Equipo",
    ],
    tecnologias: ["React", "React Native", "JavaScript", "TypeScript", "HTML5", "CSS3", "Git", "APIs REST"],
    contribuciones: [
      "Desarrollo de interfaces de usuario.",
      "Construcción de componentes reutilizables.",
      "Prototipado rápido de funcionalidades.",
    ],
    valorEquipo:
      "Construye las interfaces que los usuarios ven y usan, asegurando que cada pantalla sea intuitiva, rápida y visualmente consistente.",
    logros: [
      "App mobile con navegación y consumo de APIs.",
      "Sistema de componentes reutilizables.",
    ],
    color: "#fb923c",
  },
];

export const teamSection = {
  label: "CODEFEST AD ASTRA 2026",
  title: "SELECCIÓN DE TRIPULACIÓN",
  subtitle: "Accede al dossier de cada miembro para revisar sus credenciales de misión.",
};

export interface SkillGroupSkill {
  icon: typeof Globe;
  label: string;
  desc: string;
}

export interface SkillGroup {
  emoji: string;
  title: string;
  color: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  skills: SkillGroupSkill[];
}

export const skillGroups: SkillGroup[] = [
  {
    emoji: "🚀",
    title: "Software Development",
    color: "#38bdf8",
    gradient: "from-cyan-500/10 to-cyan-500/0",
    borderColor: "rgba(56,189,248,0.2)",
    glowColor: "rgba(56,189,248,0.08)",
    skills: [
      { icon: Globe, label: "Web Applications", desc: "Full-stack web development" },
      { icon: Smartphone, label: "Mobile Apps", desc: "Cross-platform applications" },
      { icon: Code2, label: "APIs & Services", desc: "RESTful & GraphQL endpoints" },
      { icon: Database, label: "Databases", desc: "SQL & NoSQL data systems" },
    ],
  },
  {
    emoji: "⚡",
    title: "Automation",
    color: "#34d399",
    gradient: "from-emerald-500/10 to-emerald-500/0",
    borderColor: "rgba(52,211,153,0.2)",
    glowColor: "rgba(52,211,153,0.08)",
    skills: [
      { icon: Zap, label: "Workflow Automation", desc: "End-to-end process flows" },
      { icon: GitMerge, label: "Process Optimization", desc: "Reduce manual bottlenecks" },
      { icon: Layers, label: "System Integration", desc: "Connect disparate platforms" },
    ],
  },
  {
    emoji: "🧠",
    title: "Artificial Intelligence",
    color: "#a78bfa",
    gradient: "from-violet-500/10 to-violet-500/0",
    borderColor: "rgba(167,139,250,0.2)",
    glowColor: "rgba(167,139,250,0.08)",
    skills: [
      { icon: BotMessageSquare, label: "AI Agents", desc: "Autonomous intelligent systems" },
      { icon: Brain, label: "LLM Integration", desc: "Large language model orchestration" },
      { icon: MessageSquareCode, label: "NLP", desc: "Natural language processing" },
      { icon: Network, label: "Intelligent Automation", desc: "AI-powered decision flows" },
    ],
  },
];
