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
      { label: "Dominio Técnico", value: 78 },
      { label: "Diseño de Sistemas", value: 74 },
      { label: "Resolución de Problemas", value: 88 },
      { label: "Conocimiento en IA", value: 85 },
      { label: "Experiencia de Desarrollo", value: 75 },
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
      "Full-Stack Development",
      "AI Automation",
      "Problem Solving",
      "System Design",
      "Prompt Engineering",
      "Process Automation",
      "Product Thinking",
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
      "Optimización de procesos mediante herramientas low-code y AI.",
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
    valorEquipo:
      "Conecta tecnologías y personas para construir soluciones completas y funcionales.",
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
      { label: "Dominio Técnico", value: 88 },
      { label: "Diseño de Sistemas", value: 84 },
      { label: "Resolución de Problemas", value: 91 },
      { label: "Inteligencia Artificial", value: 87 },
      { label: "Experiencia de Desarrollo", value: 86 },
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
      "Full-Stack Development",
      "Cybersecurity",
      "Artificial Intelligence",
      "Backend Engineering",
      "System Architecture",
      "Automation",
      "Data Analysis",
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
      "Cryptography",
    ],

    contribuciones: [
      "Diseño de arquitectura técnica.",
      "Desarrollo de sistemas backend.",
      "Automatización de procesos operativos.",
      "Integración de soluciones de IA.",
      "Optimización del flujo de datos.",
      "Implementación de medidas de seguridad.",
    ],

    valorEquipo:
      "Es el motor técnico detrás de la arquitectura, automatización y seguridad del proyecto. Convierte ideas complejas en soluciones escalables e inteligentes, aportando visión estratégica, capacidad analítica y una fuerte orientación a la innovación.",

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
    name: "Diego Panteve",
    shortName: "Diego",
    rol: "Frontend & Mobile Engineer",
    perfil:
      "Estudiante enfocado en desarrollo frontend y mobile, construcción de interfaces modernas y experiencias de usuario intuitivas.",
    skills: [
      { label: "Frontend", level: "Avanzado" },
      { label: "Mobile Development", level: "Avanzado" },
      { label: "UI/UX Design", level: "Intermedio" },
      { label: "TypeScript", level: "Avanzado" },
      { label: "APIs REST", level: "Avanzado" },
    ],
    experiencia: [
      "Desarrollo de interfaces de usuario con React y React Native.",
      "Construcción de aplicaciones mobile funcionales con navegación.",
      "Maquetación y prototipado con HTML5, CSS3 y TypeScript.",
      "Consumo e integración de APIs REST en aplicaciones.",
      "Control de versiones y trabajo colaborativo con Git.",
    ],
    tecnologias: [
      "React",
      "React Native",
      "TypeScript",
      "Español (Nativo)",
      "Inglés (Técnico)",
    ],
    logros: [
      "App mobile con navegación completa y consumo de APIs.",
      "Sistema de componentes reutilizables para múltiples proyectos.",
      "Interfaces responsivas implementadas en producción.",
    ],
    fortalezas: [
      "React",
      "React Native",
      "TypeScript",
      "UI/UX",
      "Trabajo en Equipo",
    ],
    contribuciones: [
      "Desarrollo de interfaces modulares y reutilizables.",
      "Implementación de navegación y lógica en apps mobile.",
      "Optimización de rendimiento en aplicaciones frontend.",
    ],
    valorEquipo:
      "Traduce diseños en interfaces funcionales y experiencias de usuario fluidas.",
    color: "rgb(27, 231, 54)",
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
      { label: "Dominio Técnico", value: 84 },
      { label: "Diseño de Sistemas", value: 80 },
      { label: "Resolución de Problemas", value: 90 },
      { label: "Conocimiento en IA", value: 88 },
      { label: "Experiencia de Desarrollo", value: 86 },
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
      "Full-Stack Development",
      "AI Automation",
      "Prompt Engineering",
      "Database Design",
      "System Design",
      "Problem Solving",
      "Product Thinking",
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

    valorEquipo:
      "Aporta una combinación de desarrollo Full-Stack, automatización e Inteligencia Artificial que permite transformar procesos empresariales en soluciones digitales eficientes, escalables y centradas en el usuario.",

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
