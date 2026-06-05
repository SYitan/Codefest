import { useState, useRef, useEffect } from 'react'
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
    name: 'Brian Stiven Alba Celis',
    shortName: 'Brian',
    rol: 'Lead Full Stack Developer',
    perfil: 'Desarrollador full-stack con experiencia en React, Node.js e integración de IA. Apasionado por construir soluciones escalables y de alto rendimiento.',
    skills: [
      { label: 'Full Stack', level: 'Experto' },
      { label: 'Liderazgo Técnico', level: 'Avanzado' },
      { label: 'IA Aplicada', level: 'Avanzado' },
      { label: 'Arquitectura Frontend', level: 'Avanzado' },
      { label: 'Automatización', level: 'Avanzado' },
    ],
    experiencia: [
      'Desarrollo de plataformas de gestión con interfaces modernas, paneles administrativos y gestión de usuarios.',
      'Automatización de procesos empresariales mediante Power Platform, Power Automate y flujos inteligentes.',
      'Construcción de soluciones académicas para gestión estudiantil, asistencia y seguimiento de indicadores.',
      'Implementación de herramientas basadas en IA generativa, asistentes inteligentes y prompt engineering.',
      'Integración de APIs REST, bases de datos PostgreSQL y servicios cloud.',
    ],
    tecnologias: ['React', 'Node.js', 'IA', 'Español (Nativo)', 'Inglés (Intermedio)'],
    stats: { proyectos: '8+', tecnologias: '15+', appsWeb: '6+', appsMoviles: '2+' },
    logros: [
      'Aplicación móvil PWA con Angular y TypeScript.',
      'Automatización de procesos empresariales con Power Platform.',
      'Prototipos funcionales integrando IA generativa en flujos de trabajo.',
    ],
    color: '#22d3ee',
  },
  {
    id: 2,
    photo: ianImg,
    name: 'Ian Lorenzo',
    shortName: 'Ian',
    rol: 'Automation, AI & Cybersecurity Specialist',
    perfil: 'Especialista en automatización, ciberseguridad e IA. Experto en Python, n8n y flujos automatizados para optimización de infraestructura.',
    skills: [
      { label: 'Automatización', level: 'Experto' },
      { label: 'Ciberseguridad', level: 'Avanzado' },
      { label: 'Python Avanzado', level: 'Experto' },
      { label: 'Redes', level: 'Avanzado' },
      { label: 'Administración Linux', level: 'Avanzado' },
    ],
    experiencia: [
      'Desarrollo de flujos de automatización complejos con n8n y Python.',
      'Implementación de medidas de ciberseguridad en infraestructura cloud.',
      'Administración de servidores Linux, monitoreo y despliegues automatizados.',
      'Creación de APIs REST y microservicios para integración de sistemas.',
    ],
    tecnologias: ['Python', 'n8n', 'Ciberseguridad', 'Español (Nativo)', 'Inglés (Técnico)'],
    stats: { proyectos: '6+', tecnologias: '12+', appsWeb: '4+', appsMoviles: '1+' },
    logros: [
      'Automatización completa de procesos de CI/CD con n8n.',
      'Sistema de monitoreo de seguridad 24/7 implementado.',
      '15+ APIs integradas en flujos automatizados de producción.',
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
      { label: 'Frontend', level: 'Avanzado' },
      { label: 'Mobile Development', level: 'Avanzado' },
      { label: 'UI/UX Design', level: 'Intermedio' },
      { label: 'TypeScript', level: 'Avanzado' },
      { label: 'APIs REST', level: 'Avanzado' },
    ],
    experiencia: [
      'Desarrollo de interfaces de usuario con React y React Native.',
      'Construcción de aplicaciones mobile funcionales con navegación.',
      'Maquetación y prototipado con HTML5, CSS3 y TypeScript.',
      'Consumo e integración de APIs REST en aplicaciones.',
      'Control de versiones y trabajo colaborativo con Git.',
    ],
    tecnologias: ['React', 'React Native', 'TypeScript', 'Español (Nativo)', 'Inglés (Técnico)'],
    stats: { proyectos: '10+', tecnologias: '18+', appsWeb: '15+', appsMoviles: '3+' },
    logros: [
      'App mobile con navegación completa y consumo de APIs.',
      'Sistema de componentes reutilizables para múltiples proyectos.',
      'Interfaces responsivas implementadas en producción.',
    ],
    color: '#fb923c',
  },
  {
    id: 4,
    photo: matheusImg,
    name: 'Matheus Rocha',
    shortName: 'Matheus',
    rol: 'AI Systems Architect',
    perfil: 'Arquitecto de sistemas de IA especializado en modelos LLM, fine-tuning y soluciones empresariales de inteligencia artificial.',
    skills: [
      { label: 'Arquitectura IA', level: 'Experto' },
      { label: 'Python', level: 'Experto' },
      { label: 'LLMs', level: 'Experto' },
      { label: 'MLOps', level: 'Avanzado' },
      { label: 'APIs IA', level: 'Avanzado' },
    ],
    experiencia: [
      'Arquitectura de sistemas de IA para soluciones empresariales escalables.',
      'Implementación de modelos LLM con fine-tuning y optimización.',
      'Integración de APIs de OpenAI en productos de producción.',
      'Diseño de pipelines de datos para entrenamiento y evaluación de modelos.',
    ],
    tecnologias: ['Python', 'OpenAI', 'LLMs', 'Español (Nativo)', 'Inglés (Avanzado)'],
    stats: { proyectos: '4+', tecnologias: '14+', sistemasIA: '7+', modelosDeploy: '12+' },
    logros: [
      'Sistema RAG implementado para búsqueda empresarial.',
      'Plataforma multi-agente con IA desplegada en producción.',
      'Reducción de costos de inferencia en 45% mediante optimización.',
    ],
    color: '#60a5fa',
  },
]

export default function App() {
  const [selectedMember, setSelectedMember] = useState(CREW_DATA[0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
