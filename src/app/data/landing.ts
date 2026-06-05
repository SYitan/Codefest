import { BrainCircuit, Zap, Cpu, Smartphone, Globe, Database } from "lucide-react";
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
  spaceTitle: string;
  subtitle: string;
  bio: string;
  skills: Skill[];
  experiencia: string[];
  fortalezas: string[];
  contribuciones: string[];
  valorEquipo: string;
  tecnologias: string[];
  color: string;
}

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

export const crewMembers: CrewMember[] = [
  {
    id: 0,
    photo: img3,
    name: "Matheus Aponte",
    shortName: "Matheus",
    spaceTitle: "AI Systems Architect",
    subtitle: "Estudiante enfocado en inteligencia artificial, arquitectura de soluciones y diseño de sistemas.",
    bio: "Matheus es estudiante universitario con interés en inteligencia artificial y arquitectura de software. Ha complementado su formación académica con investigación autónoma en agentes inteligentes, integración de modelos de lenguaje y prototipado de soluciones basadas en IA. Su enfoque está en entender cómo las tecnologías emergentes pueden aplicarse a problemas reales, evaluando opciones y diseñando arquitecturas funcionales.",
    skills: [
      { label: "Arquitectura de IA", value: 78 },
      { label: "Integración de Modelos", value: 75 },
      { label: "Investigación Técnica", value: 85 },
      { label: "Prompt Engineering", value: 80 },
      { label: "Python", value: 72 },
    ],
    experiencia: [
      "Investigación de agentes inteligentes y sus aplicaciones.",
      "Integración de modelos de IA en prototipos funcionales.",
      "Diseño de arquitecturas para aplicaciones modernas.",
      "Desarrollo de prototipos basados en IA.",
      "Evaluación de tecnologías emergentes para proyectos.",
    ],
    fortalezas: [
      "Pensamiento Analítico",
      "Diseño de Soluciones",
      "Investigación Técnica",
      "Aprendizaje Autónomo",
    ],
    contribuciones: [
      "Diseño de la arquitectura del agente.",
      "Definición de componentes de IA.",
      "Investigación y validación tecnológica.",
    ],
    valorEquipo:
      "Aporta una visión estructurada para el diseño de sistemas con IA, asegurando que las decisiones tecnológicas estén respaldadas por investigación y análisis.",
    tecnologias: ["Python", "OpenAI API", "LangChain", "TensorFlow", "FastAPI"],
    color: "#38bdf8",
  },
  {
    id: 1,
    photo: img4,
    name: "Ian Di Filippo",
    shortName: "Ian",
    spaceTitle: "Full Stack Engineer",
    subtitle: "Estudiante con experiencia en desarrollo web, integración de servicios y construcción de aplicaciones funcionales.",
    bio: "Ian es estudiante universitario con experiencia práctica en desarrollo web, tanto en frontend como en backend. Ha trabajado en proyectos que involucran consumo de APIs, gestión de bases de datos e integración entre sistemas. Su enfoque está en construir aplicaciones funcionales que resuelvan necesidades reales de los usuarios, aprendiendo nuevas herramientas según lo requiera cada proyecto.",
    skills: [
      { label: "Desarrollo Frontend", value: 80 },
      { label: "Desarrollo Backend", value: 78 },
      { label: "Bases de Datos", value: 72 },
      { label: "APIs y Servicios", value: 82 },
      { label: "Git y Control de Versiones", value: 78 },
    ],
    experiencia: [
      "Desarrollo frontend y backend en proyectos web.",
      "Consumo e integración de APIs REST.",
      "Diseño y gestión de bases de datos relacionales.",
      "Integración entre sistemas y servicios.",
      "Desarrollo de funcionalidades para usuarios finales.",
    ],
    fortalezas: [
      "Desarrollo Full Stack",
      "Resolución de Problemas",
      "Adaptabilidad",
      "Trabajo Colaborativo",
    ],
    contribuciones: [
      "Implementación de funcionalidades clave.",
      "Desarrollo de interfaces de usuario.",
      "Integración de servicios y APIs.",
    ],
    valorEquipo:
      "Conecta el frontend con el backend, garantizando que las funcionalidades se implementen de principio a fin con calidad y buen desempeño.",
    tecnologias: ["React", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    color: "#a78bfa",
  },
  {
    id: 2,
    photo: img1,
    name: "Brian Alba",
    shortName: "Brian",
    spaceTitle: "Automation Specialist",
    subtitle: "Estudiante con experiencia práctica en automatización de procesos, desarrollo de soluciones digitales y optimización operativa.",
    bio: "Brian es estudiante universitario con experiencia en automatización de procesos empresariales y desarrollo de soluciones digitales. Ha participado en proyectos que integran plataformas, diseñan flujos automatizados y optimizan operaciones mediante tecnología. Su enfoque combina el pensamiento de producto con la implementación técnica para crear soluciones que realmente mejoren la eficiencia.",
    skills: [
      { label: "Automatización de Procesos", value: 82 },
      { label: "Diseño de Flujos", value: 78 },
      { label: "Desarrollo Web", value: 70 },
      { label: "Integración de Plataformas", value: 75 },
      { label: "Lógica de Negocio", value: 72 },
    ],
    experiencia: [
      "Automatización de procesos empresariales.",
      "Diseño de flujos automatizados.",
      "Desarrollo web de aplicaciones funcionales.",
      "Participación en proyectos de desarrollo móvil.",
      "Integración de plataformas y servicios.",
    ],
    fortalezas: [
      "Automatización",
      "Pensamiento de Producto",
      "Optimización de Procesos",
      "Aprendizaje Rápido",
    ],
    contribuciones: [
      "Diseño de automatizaciones.",
      "Integración entre sistemas.",
      "Construcción de flujos inteligentes.",
      "Implementación de lógica de negocio.",
    ],
    valorEquipo:
      "Identifica oportunidades de automatización y las convierte en flujos funcionales que ahorran tiempo y reducen errores operativos.",
    tecnologias: ["Python", "Node.js", "Zapier", "Power Automate", "React"],
    color: "#06b6d4",
  },
  {
    id: 3,
    photo: img2,
    name: "Diego Panteve",
    shortName: "Diego",
    spaceTitle: "Mobile & UX Specialist",
    subtitle: "Estudiante enfocado en desarrollo móvil, experiencia de usuario y construcción de interfaces intuitivas.",
    bio: "Diego es estudiante universitario con interés en el desarrollo de aplicaciones móviles y el diseño de experiencias de usuario. Ha trabajado en prototipado, validación de interfaces y construcción de apps funcionales, combinando principios de usabilidad con buenas prácticas de desarrollo. Su enfoque está en crear productos digitales que sean intuitivos, accesibles y centrados en las necesidades del usuario.",
    skills: [
      { label: "Desarrollo Móvil", value: 82 },
      { label: "Diseño UX/UI", value: 85 },
      { label: "Prototipado", value: 78 },
      { label: "Usabilidad y Pruebas", value: 75 },
      { label: "Flujos de Usuario", value: 76 },
    ],
    experiencia: [
      "Desarrollo de aplicaciones móviles.",
      "Diseño de experiencia de usuario.",
      "Prototipado de interfaces y flujos.",
      "Validación de interfaces con usuarios.",
      "Diseño centrado en el usuario.",
    ],
    fortalezas: [
      "UX/UI",
      "Diseño de Flujos",
      "Creatividad",
      "Comunicación",
    ],
    contribuciones: [
      "Diseño de experiencia de usuario.",
      "Construcción de interfaces.",
      "Prototipado rápido.",
      "Validación de usabilidad.",
    ],
    valorEquipo:
      "Garantiza que las aplicaciones sean usables, atractivas y estén diseñadas pensando en quienes las utilizarán.",
    tecnologias: ["React Native", "Figma", "Flutter", "TypeScript", "Firebase"],
    color: "#fb923c",
  },
];

export const teamSection = {
  label: "CODEFEST AD ASTRA 2026",
  title: "BASE DE DATOS DE TRIPULACIÓN",
  subtitle: "Selecciona un miembro para acceder a su perfil de misión.",
};
