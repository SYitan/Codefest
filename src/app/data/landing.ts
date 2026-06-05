import {
  BrainCircuit,
  Zap,
  Cpu,
  Smartphone,
  Globe,
  Database,
} from "lucide-react";
import yitanImg from "../../imports/yitan.webp";
import diegoImg from "../../imports/diego.webp";
import matheusImg from "../../imports/matheus.webp";
import ianImg from "../../imports/ian.webp";

export const mission = {
  badge: "Misión Activa · 2026",
  title: "MISIÓN:",
  subtitle: "CODEFEST AD ASTRA",
  year: "2026",
  description: "Construyendo Agentes Inteligentes para un Impacto Real",
};

export const heroTags = [
  { label: "Agentes IA", icon: BrainCircuit, color: "#a78bfa", delay: 0.6 },
  { label: "Automatización", icon: Zap, color: "#38bdf8", delay: 0.7 },
  { label: "Ingeniería de Software", icon: Cpu, color: "#34d399", delay: 0.8 },
  { label: "Apps Móviles", icon: Smartphone, color: "#fb923c", delay: 0.9 },
  { label: "APIs", icon: Globe, color: "#f472b6", delay: 1.0 },
  { label: "Sistemas de Datos", icon: Database, color: "#fbbf24", delay: 1.1 },
];

export type SkillLevel = "Experto" | "Avanzado" | "Sólido";

export interface Skill {
  label: string;
  level: SkillLevel;
}

export interface TechGroup {
  category: string;
  items: string[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface CrewMember {
  id: number;
  photo: string;
  name: string;
  shortName: string;
  rol: string;
  perfil: string;
  focus: string;
  specialties: string[];
  idiomas: string[];
  skills: Skill[];
  techGroups: TechGroup[];
  stats: Stat[];
  experiencia: string[];
  valorEquipo: string;
  logros: string[];
  color: string;
}

export const teamCapabilities = [
  "IA Generativa",
  "Automatización",
  "Desarrollo Full Stack",
  "Aplicaciones Móviles",
  "APIs e Integraciones",
  "Bases de Datos",
];

export const teamStats = {
  solutions: "20+",
  sectors: "5",
  members: "4",
  mission: "1",
};

export const crewMembers: CrewMember[] = [
  {
    id: 0,
    photo: matheusImg,
    name: "Matheus Aponte",
    shortName: "Matheus",
    rol: "AI Systems Architect",
    perfil: "Arquitectura de IA y sistemas inteligentes.",
    focus: "Arquitectura de IA y Sistemas Inteligentes",
    specialties: ["Agentes IA", "Modelos de Lenguaje", "Arquitectura de Software"],
    idiomas: ["Español (Nativo)", "Inglés (Avanzado)"],
    skills: [
      { label: "IA y Machine Learning", level: "Experto" },
      { label: "Arquitectura de Sistemas", level: "Avanzado" },
      { label: "Investigación Técnica", level: "Avanzado" },
      { label: "Resolución de Problemas", level: "Avanzado" },
      { label: "Desarrollo de Software", level: "Sólido" },
    ],
    techGroups: [
      { category: "Lenguajes", items: ["Python", "Java", "SQL"] },
      { category: "Frontend", items: ["React"] },
      { category: "IA", items: ["OpenAI APIs", "Prompt Engineering"] },
      { category: "Herramientas", items: ["Git", "APIs REST"] },
    ],
    stats: [
      { label: "Proyectos IA", value: "4+" },
      { label: "Tecnologías", value: "10+" },
      { label: "Prototipos", value: "3+" },
      { label: "Modelos", value: "5+" },
    ],
    experiencia: [
      "Investigación de agentes inteligentes y sus aplicaciones.",
      "Integración de modelos de IA en prototipos funcionales.",
      "Diseño de arquitecturas para aplicaciones modernas.",
      "Desarrollo de prototipos basados en IA.",
      "Evaluación de tecnologías emergentes para proyectos.",
    ],
    valorEquipo:
      "Convierte requerimientos complejos en soluciones funcionales y escalables, conectando tecnología, producto y experiencia de usuario.",
    logros: [
      "Prototipo funcional de agente con IA.",
      "Integración temprana de LLMs en proyectos académicos.",
    ],
    color: "#f97316",
  },
  {
    id: 1,
    photo: ianImg,
    name: "Ian Di Filippo",
    shortName: "Ian",
    rol: "Automation, AI & Cybersecurity Specialist",
    perfil: "Automatización inteligente y seguridad informática.",
    focus: "Automatización, Integraciones y Ciberseguridad",
    specialties: ["Automatización de Flujos", "Seguridad en APIs", "Integración de IA"],
    idiomas: ["Español (Nativo)", "Inglés (Avanzado)"],
    skills: [
      { label: "Automatización", level: "Experto" },
      { label: "Ciberseguridad", level: "Avanzado" },
      { label: "Integración de APIs", level: "Avanzado" },
      { label: "Resolución de Problemas", level: "Avanzado" },
      { label: "Desarrollo de Software", level: "Avanzado" },
    ],
    techGroups: [
      { category: "Lenguajes", items: ["Python", "Java"] },
      { category: "IA", items: ["OpenAI APIs", "n8n"] },
      { category: "Infraestructura", items: ["Linux", "APIs REST"] },
      { category: "Herramientas", items: ["Git"] },
    ],
    stats: [
      { label: "Flujos Auto.", value: "6+" },
      { label: "Tecnologías", value: "8+" },
      { label: "Agentes IA", value: "3+" },
      { label: "Integraciones", value: "5+" },
    ],
    experiencia: [
      "Automatización de procesos con n8n y APIs.",
      "Integración de modelos de IA en flujos automatizados.",
      "Implementación de medidas básicas de ciberseguridad.",
      "Desarrollo de scripts para análisis de datos.",
      "Administración de sistemas Linux.",
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
    photo: yitanImg,
    name: "Brian Stiven Alba Celis",
    shortName: "Brian",
    rol: "Lead Full Stack Developer",
    perfil: "Producto, desarrollo full stack y liderazgo técnico.",
    focus: "Producto, Full Stack y Liderazgo Técnico",
    specialties: ["Aplicaciones Web", "Automatización Empresarial", "IA Aplicada"],
    idiomas: ["Español (Nativo)", "Inglés (Intermedio)"],
    skills: [
      { label: "Full Stack", level: "Experto" },
      { label: "Liderazgo Técnico", level: "Avanzado" },
      { label: "IA Aplicada", level: "Avanzado" },
      { label: "Arquitectura Frontend", level: "Avanzado" },
      { label: "Automatización", level: "Avanzado" },
    ],
    techGroups: [
      { category: "Frontend", items: ["Angular", "TypeScript", "JavaScript"] },
      { category: "Backend", items: ["Node.js", "APIs REST"] },
      { category: "Bases de Datos", items: ["PostgreSQL", "Supabase"] },
      { category: "Automatización", items: ["Power Platform", "Power Automate"] },
      { category: "Herramientas", items: ["Git", "GitHub", "Vercel", "Figma"] },
    ],
    stats: [
      { label: "Proyectos", value: "8+" },
      { label: "Tecnologías", value: "15+" },
      { label: "Apps Web", value: "6+" },
      { label: "Apps Móviles", value: "2+" },
    ],
    experiencia: [
      "Desarrollo de plataformas de gestión con interfaces modernas, paneles administrativos y gestión de usuarios.",
      "Automatización de procesos empresariales mediante Power Platform, Power Automate y flujos inteligentes.",
      "Construcción de soluciones académicas para gestión estudiantil, asistencia y seguimiento de indicadores.",
      "Implementación de herramientas basadas en IA generativa, asistentes inteligentes y prompt engineering.",
      "Integración de APIs REST, bases de datos PostgreSQL y servicios externos.",
    ],
    valorEquipo:
      "Convierte necesidades del mundo real en productos de software funcionales, combinando visión de producto, solidez técnica y automatización.",
    logros: [
      "Aplicación móvil PWA con Angular y TypeScript.",
      "Automatización de procesos empresariales con Power Platform.",
      "Prototipos funcionales integrando IA generativa en flujos de trabajo.",
    ],
    color: "#06b6d4",
  },
  {
    id: 3,
    photo: diegoImg,
    name: "Diego Alejandro Rojas Panteve",
    shortName: "Diego",
    rol: "Full Stack Developer & Software Engineering Student",
    perfil: "Ingeniería de software, backend y sistemas escalables.",
    focus: "Ingeniería de Software, Backend y Sistemas Escalables",
    specialties: ["Arquitectura Backend", "Bases de Datos", "Aplicaciones Desktop"],
    idiomas: ["Español (Nativo)", "Inglés (B2 - Cambridge)"],
    skills: [
      { label: "Backend y APIs", level: "Experto" },
      { label: "Arquitectura de Software", level: "Avanzado" },
      { label: "Bases de Datos", level: "Avanzado" },
      { label: "Resolución de Problemas", level: "Avanzado" },
      { label: "Desarrollo Full Stack", level: "Avanzado" },
    ],
    techGroups: [
      { category: "Frontend", items: ["Angular 19+", "TypeScript", "HTML5", "CSS3", "TailwindCSS", "DaisyUI"] },
      { category: "Backend", items: ["NestJS", "Node.js", "Express", "APIs REST"] },
      { category: "Bases de Datos", items: ["PostgreSQL", "Prisma ORM", "MongoDB", "SQL"] },
      { category: "Desktop", items: ["Electron"] },
      { category: "Herramientas", items: ["Git", "GitHub", "Microsoft Intune", "Python", "Java"] },
    ],
    stats: [
      { label: "Proyectos", value: "10+" },
      { label: "Tecnologías", value: "22+" },
      { label: "Apps Desktop", value: "3+" },
      { label: "Certificaciones", value: "3" },
    ],
    experiencia: [
      "Desarrollo de aplicaciones desktop con Electron y Angular 19+.",
      "Construcción de APIs REST con NestJS y Prisma ORM.",
      "Gestión de bases de datos PostgreSQL con migraciones y optimización de queries.",
      "Implementación de arquitecturas con NgRx Signal Store y Signals.",
      "Migración de directorio activo local a la nube con Microsoft Intune.",
      "Desarrollo de prototipo con IA para traducción en tiempo real durante llamadas.",
      "Soporte técnico de hardware, software y red mediante sistema de tickets.",
      "Gestión de infraestructura tecnológica empresarial.",
    ],
    valorEquipo:
      "Conecta el frontend y el backend con criterio arquitectónico, asegurando que el sistema completo funcione de forma coherente, segura y escalable.",
    logros: [
      "Sistema POS desktop funcional con Electron, Angular y NestJS.",
      "Certificación B2 de inglés Cambridge Linguaskill.",
      "Técnico en Programación y Servicios para la Nube — SENA.",
      "Prototipo de IA para traducción en tiempo real en entorno empresarial.",
      "Migración exitosa de infraestructura a la nube en RSec.",
      "Curso de SQL con MinTIC y Universidad Distrital (50h).",
    ],
    color: "#05a305",
  },
];

export const teamSection = {
  label: "CODEFEST AD ASTRA 2026",
  title: "SELECCIÓN DE TRIPULACIÓN",
  subtitle:
    "Accede al dossier de cada miembro para revisar sus credenciales de misión.",
};
