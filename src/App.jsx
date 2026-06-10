import { useState, useRef, useEffect } from "react";
import SpaceBackground from "./components/SpaceBackground";
import HeroSection from "./components/HeroSection";
import CrewSection from "./components/CrewSection";
import DossierSection from "./components/DossierSection";
import brianImg from "./imports/yitan.webp";
import ianImg from "./imports/ian.webp";
import diegoImg from "./imports/diego.webp";
import matheusImg from "./imports/matheus.webp";

const CREW_DATA = [
  {
    id: 1,
    photo: brianImg,
    name: "Brian Alba",
    shortName: "Brian",
    rol: "Full-Stack & AI Automation Engineer",
    perfil:
      "Estudiante de Ingeniería de Software con experiencia práctica en desarrollo Full-Stack, automatización de procesos e integración de Inteligencia Artificial. Ha trabajado en proyectos personales y entornos reales de desarrollo durante aproximadamente 6 meses, construyendo aplicaciones web, sistemas de gestión empresarial y soluciones enfocadas en optimización de procesos mediante tecnología moderna.",
    skills: [
      { label: "Dominio Técnico", value: 72 },
      { label: "Diseño de Sistemas", value: 65 },
      { label: "Resolución de Problemas", value: 82 },
      { label: "Conocimiento en IA", value: 78 },
      { label: "Experiencia de Desarrollo", value: 55 },
    ],
    experiencia: [
      "Desarrollo de aplicaciones Full-Stack con React, Next.js y TypeScript.",
      "Creación de sistemas CRM y plataformas de gestión de información.",
      "Implementación de bases de datos con Supabase y PostgreSQL.",
      "Diseño de sistemas de gestión para procesos empresariales (HSE y operativos).",
      "Automatización de flujos de trabajo con n8n y herramientas de IA.",
      "Integración de modelos de Inteligencia Artificial en aplicaciones web.",
      "Desarrollo de portafolios interactivos y aplicaciones personalizadas.",
      "Construcción de soluciones orientadas a optimización de procesos.",
    ],
    fortalezas: [
      "Desarrollo Full-Stack",
      "Automatización con IA",
      "Resolución de Problemas",
      "Diseño de Sistemas",
      "Ingeniería de Prompts",
      "Automatización de Procesos",
      "Pensamiento de Producto",
      "Adaptabilidad",
    ],
    tecnologias: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "HTML5",
      "CSS3",
      "Supabase",
      "PostgreSQL",
      "Python",
      "Java",
      "n8n",
      "Power Apps",
      "Power Automate",
      "OpenAI APIs",
      "REST APIs",
    ],
    contribuciones: [
      "Diseño y desarrollo de aplicaciones web completas.",
      "Implementación de sistemas de automatización empresarial.",
      "Integración de Inteligencia Artificial en flujos de trabajo.",
      "Desarrollo de interfaces funcionales y optimizadas.",
      "Estructuración de bases de datos y lógica backend.",
      "Optimización de procesos mediante herramientas low-code e IA.",
      "Apoyo en definición de arquitectura de proyectos.",
    ],
    logros: [
      "Desarrollo de múltiples proyectos Full-Stack personales.",
      "Implementación de sistemas CRM y plataformas empresariales.",
      "Automatización de procesos con n8n y herramientas de IA.",
      "Integración de APIs de Inteligencia Artificial en aplicaciones.",
      "Experiencia en proyectos de gestión de datos y sistemas operativos.",
      "Construcción de soluciones web enfocadas en eficiencia y escalabilidad.",
    ],
    color: "#6366f1",
  },
  {
    id: 2,
    photo: ianImg,
    name: "Ian Di Filippo Espeleta",
    shortName: "Ian",
    rol: "Full-Stack Engineer & Cybersecurity Specialist",
    perfil:
      "Estudiante de Ingeniería de Software enfocado en desarrollo full-stack, ciberseguridad, automatización e inteligencia artificial. Destaca por su capacidad para diseñar soluciones escalables, optimizar procesos complejos y desarrollar sistemas seguros impulsados por tecnología moderna.",
    skills: [
      { label: "Dominio Técnico", value: 82 },
      { label: "Diseño de Sistemas", value: 65 },
      { label: "Resolución de Problemas", value: 80 },
      { label: "Inteligencia Artificial", value: 62 },
      { label: "Experiencia de Desarrollo", value: 80 },
    ],
    experiencia: [
      "Desarrollo de aplicaciones web full-stack.",
      "Construcción de APIs y servicios backend.",
      "Automatización de procesos con Python.",
      "Análisis de fraude y validación de datos.",
      "Implementación de soluciones de ciberseguridad.",
      "Desarrollo de dashboards y análisis de información.",
    ],
    fortalezas: [
      "Desarrollo Full-Stack",
      "Ciberseguridad",
      "Inteligencia Artificial",
      "Ingeniería Backend",
      "Arquitectura de Sistemas",
      "Automatización",
      "Análisis de Datos",
    ],
    tecnologias: [
      "Python",
      "Java",
      "JavaScript",
      "Swift",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "MySQL",
      "SQL Server",
      "Power BI",
      "REST APIs",
      "Machine Learning",
      "Criptografía",
    ],
    contribuciones: [
      "Diseño de arquitectura técnica.",
      "Desarrollo de sistemas backend.",
      "Automatización de procesos operativos.",
      "Integración de soluciones de IA.",
      "Optimización del flujo de datos.",
      "Implementación de medidas de seguridad.",
    ],
    logros: [
      "Certificación CS50x de Harvard.",
      "Formación en criptografía aplicada.",
      "Experiencia en análisis de fraude financiero.",
      "Participación en proyectos tecnológicos internacionales.",
      "Implementación de automatizaciones basadas en IA.",
      "Desarrollo de plataformas web escalables.",
    ],
    color: "#3b82f6",
  },
  {
    id: 3,
    photo: diegoImg,
    name: "Diego Rojas",
    shortName: "Diego",
    rol: "Full-Stack Engineer & Software Engineering Student",
    perfil:
      "Estudiante de Ingeniería de Software enfocado en desarrollo full stack, con experiencia real construyendo sistemas completos desde el backend hasta interfaces modernas. Apasionado por la arquitectura de software, la ciberseguridad y la creación de productos funcionales que resuelvan problemas reales.",
    skills: [
      { label: "Dominio Técnico", value: 74 },
      { label: "Diseño de Sistemas", value: 85 },
      { label: "Resolución de Problemas", value: 80 },
      { label: "Conocimiento en IA", value: 65 },
      { label: "Experiencia en Desarrollo", value: 75 },
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
    fortalezas: [
      "Desarrollo Full Stack",
      "Arquitectura de Software",
      "Backend con NestJS",
      "Frontend con Angular",
      "Resolución de Problemas",
      "Ciberseguridad Básica",
      "Aprendizaje Autónomo",
      "Trabajo en Equipo",
    ],
    tecnologias: [
      "Angular 19+",
      "NestJS",
      "Electron",
      "PostgreSQL",
      "Prisma ORM",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express",
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "DaisyUI",
      "NgRx Signal Store",
      "Git",
      "GitHub",
      "MongoDB",
      "SQL",
      "Microsoft Intune",
      "Python",
      "Java",
      "Docker",
    ],
    contribuciones: [
      "Diseño e implementación de arquitecturas full stack escalables.",
      "Construcción de sistemas POS completos con módulos de caja, gastos e inventario.",
      "Implementación de autenticación JWT y guards de seguridad.",
      "Desarrollo de componentes reutilizables y directivas personalizadas en Angular.",
    ],
    logros: [
      "Sistema POS desktop funcional con Electron, Angular y NestJS.",
      "Certificación B2 de inglés Cambridge Linguaskill.",
      "Técnico en Programación y Servicios para la Nube — SENA.",
      "Prototipo de IA para traducción en tiempo real en entorno empresarial.",
      "Migración exitosa de infraestructura a la nube en RSec.",
      "Curso de SQL con MinTIC y Universidad Distrital (50h).",
    ],
    color: "#1be736",
  },
  {
    id: 4,
    photo: matheusImg,
    name: "Matheus Aponte",
    shortName: "Matheus",
    rol: "Full-Stack & AI Automation Engineer",
    perfil:
      "Estudiante de Ingeniería de Software con experiencia en desarrollo Full-Stack, automatización de procesos e integración de soluciones basadas en Inteligencia Artificial. Ha participado en la construcción de aplicaciones web empresariales, sistemas de gestión de datos y plataformas orientadas a optimizar procesos mediante tecnologías modernas, arquitecturas escalables y automatización inteligente.",
    skills: [
      { label: "Dominio Técnico", value: 60 },
      { label: "Diseño de Sistemas", value: 74 },
      { label: "Resolución de Problemas", value: 82 },
      { label: "Conocimiento en IA", value: 75 },
      { label: "Experiencia de Desarrollo", value: 60 },
    ],
    experiencia: [
      "Desarrollo de aplicaciones Full-Stack con React, Next.js y TypeScript.",
      "Construcción de sistemas CRM y plataformas empresariales.",
      "Implementación de soluciones con Supabase y bases de datos en la nube.",
      "Diseño de sistemas de gestión para procesos HSE.",
      "Automatización de procesos mediante n8n y Power Platform.",
      "Integración de Inteligencia Artificial en flujos empresariales.",
      "Desarrollo de aplicaciones web personalizadas.",
      "Diseño de arquitecturas orientadas a escalabilidad y mantenimiento.",
    ],
    fortalezas: [
      "Desarrollo Full-Stack",
      "Automatización con IA",
      "Ingeniería de Prompts",
      "Diseño de Bases de Datos",
      "Diseño de Sistemas",
      "Resolución de Problemas",
      "Pensamiento de Producto",
      "Trabajo en Equipo",
    ],
    tecnologias: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "HTML5",
      "CSS3",
      "Supabase",
      "PostgreSQL",
      "Java",
      "Python",
      "n8n",
      "Power Apps",
      "Power Automate",
      "REST APIs",
      "OpenAI",
    ],
    contribuciones: [
      "Desarrollo de plataformas empresariales.",
      "Diseño e implementación de automatizaciones.",
      "Integración de herramientas de Inteligencia Artificial.",
      "Construcción de módulos Full-Stack.",
      "Diseño de estructuras de datos y bases de datos.",
      "Optimización de flujos operativos digitales.",
    ],
    logros: [
      "Participación en múltiples proyectos empresariales reales.",
      "Implementación de sistemas CRM y gestión de información.",
      "Automatización de procesos con n8n y Power Platform.",
      "Integración de IA en herramientas y flujos de trabajo.",
      "Desarrollo de aplicaciones web modernas y escalables.",
      "Implementación de soluciones seguras utilizando Supabase y RLS.",
    ],
    color: "#fb923c",
  },
];

export default function App() {
  const [selectedMember, setSelectedMember] = useState(CREW_DATA[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const crewRef = useRef(null);
  const dossierRef = useRef(null);

  const scrollToCrew = () => {
    crewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openDossier = (member) => {
    setSelectedMember(member);
    requestAnimationFrame(() => {
      dossierRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const backToCrew = () => {
    crewRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setSelectedMember(null), 500);
  };

  return (
    <div className="relative min-h-screen text-white font-sans">
      <SpaceBackground />

      <div className="relative">
        <HeroSection onExplore={scrollToCrew} />

        <div ref={crewRef}>
          <CrewSection crew={CREW_DATA} onSelectMember={openDossier} />
        </div>

        <div ref={dossierRef}>
          <DossierSection member={selectedMember} onBack={backToCrew} />
        </div>
      </div>
    </div>
  );
}
