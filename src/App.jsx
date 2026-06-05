import { useState, useRef } from 'react'
import SpaceBackground from './components/SpaceBackground'
import HeroSection from './components/HeroSection'
import CrewSection from './components/CrewSection'
import DossierSection from './components/DossierSection'
import brianImg from './imports/yitan.webp'
import ianImg from './imports/ian.webp'
import diegoImg from './imports/diego.webp'
import matheusImg from './imports/matheus.webp'

const CREW_DATA = [
  {
    id: 1,
    photo: brianImg,
    name: 'Brian Yitan',
    shortName: 'Brian',
    rol: 'Lead Full Stack Developer',
    perfil: 'Desarrollador full-stack especializado en React, Node.js e integración de IA. Apasionado por construir soluciones escalables y de alto rendimiento.',
    skills: [
      { label: 'Technical Mastery', value: 92 },
      { label: 'System Design', value: 85 },
      { label: 'Problem Solving', value: 88 },
      { label: 'AI Knowledge', value: 78 },
      { label: 'Development Experience', value: 90 },
    ],
    experiencia: [
      'Desarrollo de plataformas web full-stack con React y Node.js',
      'Integración de modelos de IA en aplicaciones empresariales',
      'Automatización de procesos y optimización de rendimiento',
      'Liderazgo técnico y revisión de código',
    ],
    fortalezas: ['Full Stack', 'React', 'Node.js', 'Liderazgo Técnico', 'Optimización'],
    tecnologias: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'React Native', 'Docker', 'IA/ML'],
    contribuciones: [
      'Implementación de sistema multi-tenant escalable',
      'Optimización de rendimiento reduciendo tiempos de carga en 60%',
      'Integración exitosa de IA generativa en plataforma cliente',
    ],
    valorEquipo: 'Lidera el desarrollo full-stack conectando frontend, backend e IA para entregar soluciones completas y de alto impacto.',
    logros: [
      'Sistema multi-tenant escalable implementado',
      'Reducción de carga del 60% mediante optimización',
      'IA generativa integrada en producción',
    ],
    color: '#22d3ee',
  },
  {
    id: 2,
    photo: ianImg,
    name: 'Ian Lorenzo',
    shortName: 'Ian',
    rol: 'Automation, AI & Cybersecurity Specialist',
    perfil: 'Especialista en automatización, ciberseguridad e inteligencia artificial. Experto en Python, n8n y flujos automatizados.',
    skills: [
      { label: 'Technical Mastery', value: 88 },
      { label: 'System Design', value: 82 },
      { label: 'Problem Solving', value: 90 },
      { label: 'AI Knowledge', value: 85 },
      { label: 'Development Experience', value: 84 },
    ],
    experiencia: [
      'Desarrollo de flujos de automatización con n8n',
      'Implementación de medidas de ciberseguridad en infraestructura',
      'Administración de servidores Linux y despliegues',
      'Creación de APIs y microservicios',
    ],
    fortalezas: ['Automatización', 'Ciberseguridad', 'Python', 'Linux', 'APIs'],
    tecnologias: ['Python', 'n8n', 'Linux', 'APIs REST', 'Ciberseguridad', 'Docker', 'Bash'],
    contribuciones: [
      'Automatización completa de procesos de CI/CD',
      'Implementación de sistema de monitoreo de seguridad 24/7',
      'Integración de 15+ APIs en flujos automatizados',
    ],
    valorEquipo: 'Automatiza procesos críticos y protege la infraestructura, permitiendo al equipo operar con seguridad y eficiencia.',
    logros: [
      'CI/CD completamente automatizado',
      'Monitoreo de seguridad 24/7 implementado',
      '15+ APIs integradas en flujos automatizados',
    ],
    color: '#a78bfa',
  },
  {
    id: 3,
    photo: diegoImg,
    name: 'Diego Panteve',
    shortName: 'Diego',
    rol: 'Frontend & Mobile Engineer',
    perfil: 'Estudiante enfocado en desarrollo frontend y mobile, construcción de interfaces modernas y experiencias de usuario intuitivas.',
    skills: [
      { label: 'Technical Mastery', value: 78 },
      { label: 'System Design', value: 72 },
      { label: 'Problem Solving', value: 80 },
      { label: 'AI Knowledge', value: 65 },
      { label: 'Development Experience', value: 76 },
    ],
    experiencia: [
      'Desarrollo de interfaces con React y React Native',
      'Construcción de aplicaciones mobile funcionales',
      'Maquetación con HTML5, CSS3 y TypeScript',
      'Consumo de APIs REST en aplicaciones',
      'Control de versiones con Git',
    ],
    fortalezas: ['Frontend', 'Mobile Development', 'UI Engineering', 'Resolución de Problemas', 'Trabajo en Equipo'],
    tecnologias: ['React', 'React Native', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Git', 'APIs REST'],
    contribuciones: [
      'Desarrollo de interfaces de usuario',
      'Construcción de componentes reutilizables',
      'Prototipado rápido de funcionalidades',
    ],
    valorEquipo: 'Construye las interfaces que los usuarios ven y usan, asegurando que cada pantalla sea intuitiva, rápida y visualmente consistente.',
    logros: [
      'App mobile con navegación y consumo de APIs',
      'Sistema de componentes reutilizables',
    ],
    color: '#fb923c',
  },
  {
    id: 4,
    photo: matheusImg,
    name: 'Matheus Rocha',
    shortName: 'Matheus',
    rol: 'AI Systems Architect',
    perfil: 'Arquitecto de sistemas de IA especializado en integración de modelos LLM, fine-tuning y soluciones empresariales de inteligencia artificial.',
    skills: [
      { label: 'Technical Mastery', value: 95 },
      { label: 'System Design', value: 90 },
      { label: 'Problem Solving', value: 87 },
      { label: 'AI Knowledge', value: 96 },
      { label: 'Development Experience', value: 82 },
    ],
    experiencia: [
      'Arquitectura de sistemas de inteligencia artificial',
      'Implementación de modelos LLM y fine-tuning',
      'Integración de APIs de OpenAI en soluciones empresariales',
      'Diseño de pipelines de datos para entrenamiento de modelos',
    ],
    fortalezas: ['Arquitectura IA', 'Python', 'LLMs', 'Fine-tuning', 'Sistemas RAG'],
    tecnologias: ['Python', 'Java', 'OpenAI', 'TensorFlow', 'Arquitectura IA', 'APIs', 'RAG'],
    contribuciones: [
      'Implementación de sistema RAG para búsqueda empresarial',
      'Arquitectura de plataforma multi-agente con IA',
      'Reducción de costos de inferencia en 45% mediante optimización',
    ],
    valorEquipo: 'Diseña la arquitectura de IA del equipo, habilitando soluciones inteligentes que diferencian nuestros productos en el mercado.',
    logros: [
      'Sistema RAG implementado para búsqueda empresarial',
      'Plataforma multi-agente con IA desplegada',
      'Costos de inferencia reducidos en 45%',
    ],
    color: '#60a5fa',
  },
]

export default function App() {
  const [selectedMember, setSelectedMember] = useState(CREW_DATA[0])
  const crewRef = useRef(null)
  const dossierRef = useRef(null)

  const scrollToCrew = () => {
    crewRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openDossier = (member) => {
    setSelectedMember(member)
    requestAnimationFrame(() => {
      dossierRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const backToCrew = () => {
    crewRef.current?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => setSelectedMember(null), 500)
  }

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
  )
}
