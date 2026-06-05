import {
  BrainCircuit,
  Zap,
  Cpu,
  Smartphone,
  Globe,
  Database,
} from "lucide-react";
import yitanImg from "../../imports/yitan.png";
import diegoImg from "../../imports/diego.png";
import matheusImg from "../../imports/matheus.png";
import ianImg from "../../imports/ian.png";

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
  { label: "APIs", icon: Globe, color: "#38bdf8", delay: 1.0 },
  { label: "Sistemas de Datos", icon: Database, color: "#a78bfa", delay: 1.1 },
];

export interface Skill {
  label: string;
  value: number;
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
  skills: Skill[];
  techGroups: TechGroup[];
  stats: Stat[];
  experiencia: string[];
  contribuciones: string[];
  valorEquipo: string;
  logros: string[];
  color: string;
}

export const crewMembers: CrewMember[] = [
  {
    id: 0,
    photo: matheusImg,
    name: "Matheus Aponte",
    shortName: "Matheus",
    rol: "AI Systems Architect",
    perfil:
      "Estudiante enfocado en inteligencia artificial, arquitectura de software y diseño de soluciones tecnológicas.",
    skills: [
      { label: "Technical Mastery", value: 78 },
      { label: "System Design", value: 82 },
      { label: "Problem Solving", value: 80 },
      { label: "AI Knowledge", value: 85 },
      { label: "Development Experience", value: 72 },
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
    photo: ianImg,
    name: "Ian Di Filippo",
    shortName: "Ian",
    rol: "Automation, AI & Cybersecurity Specialist",
    perfil:
      "Estudiante con experiencia en automatización, inteligencia artificial y seguridad informática aplicada a proyectos tecnológicos.",
    skills: [
      { label: "Technical Mastery", value: 80 },
      { label: "System Design", value: 72 },
      { label: "Problem Solving", value: 85 },
      { label: "AI Knowledge", value: 82 },
      { label: "Development Experience", value: 75 },
    ],
    techGroups: [
      { category: "Lenguajes", items: ["Python", "Java"] },
      { category: "IA", items: ["OpenAI APIs", "n8n"] },
      { category: "Infra", items: ["Linux", "APIs REST"] },
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
    photo: yitanImg,
    name: "Brian Stiven Alba Celis",
    shortName: "Brian",
    rol: "Lead Full Stack Developer",
    perfil:
      "Estudiante de Ingeniería de Software con experiencia práctica en desarrollo de aplicaciones web, automatización de procesos e integración de inteligencia artificial en soluciones digitales. Apasionado por construir productos tecnológicos escalables que resuelvan problemas reales, combinando desarrollo full stack, automatización e innovación.",
    skills: [
      { label: "Technical Mastery", value: 85 },
      { label: "System Design", value: 80 },
      { label: "Problem Solving", value: 82 },
      { label: "AI Knowledge", value: 72 },
      { label: "Development Experience", value: 82 },
    ],
    techGroups: [
      { category: "Frontend", items: ["Angular", "TypeScript", "JavaScript"] },
      { category: "Backend", items: ["Node.js", "APIs REST"] },
      { category: "Database", items: ["PostgreSQL", "Supabase"] },
      { category: "Automation", items: ["Power Platform", "Power Automate"] },
      { category: "Tools", items: ["Git", "GitHub", "Vercel", "Figma"] },
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
    contribuciones: [
      "Liderazgo técnico del equipo y desarrollo full stack.",
      "Diseño e implementación de la plataforma principal.",
      "Automatización de procesos e integración de servicios.",
      "Investigación y aplicación de IA en soluciones del equipo.",
    ],
    valorEquipo:
      "Convierte necesidades del mundo real en productos de software funcionales, combinando visión de producto, solidez técnica y automatización para crear soluciones completas de principio a fin.",
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
    perfil:
      "Estudiante de Ingeniería de Software enfocado en desarrollo full stack, con experiencia real construyendo sistemas completos desde el backend hasta interfaces modernas. Apasionado por la arquitectura de software, la ciberseguridad y la creación de productos funcionales que resuelvan problemas reales.",
    skills: [
      { label: "Technical Mastery", value: 82 },
      { label: "System Design", value: 80 },
      { label: "Problem Solving", value: 85 },
      { label: "AI Knowledge", value: 70 },
      { label: "Development Experience", value: 78 },
    ],
    techGroups: [
      { category: "Frontend", items: ["Angular 19+", "TypeScript", "HTML5", "CSS3", "TailwindCSS", "DaisyUI"] },
      { category: "Backend", items: ["NestJS", "Node.js", "Express", "APIs REST"] },
      { category: "Database", items: ["PostgreSQL", "Prisma ORM", "MongoDB", "SQL"] },
      { category: "Desktop", items: ["Electron"] },
      { category: "Tools", items: ["Git", "GitHub", "Microsoft Intune", "Python", "Java"] },
    ],
    stats: [
      { label: "Proyectos", value: "10+" },
      { label: "Tecnologías", value: "22+" },
      { label: "Apps Desktop", value: "3+" },
      { label: "Cert.", value: "3" },
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
    contribuciones: [
      "Diseño e implementación de arquitecturas full stack escalables.",
      "Construcción de sistemas POS completos con módulos de caja, gastos e inventario.",
      "Implementación de autenticación JWT y guards de seguridad.",
      "Optimización de queries con agrupaciones y eliminación de problemas N+1.",
      "Desarrollo de componentes reutilizables y directivas personalizadas en Angular.",
    ],
    valorEquipo:
      "Conecta el frontend y el backend con criterio arquitectónico, asegurando que el sistema completo funcione de forma coherente, segura y escalable desde la base de datos hasta la interfaz de usuario.",
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
