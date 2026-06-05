import { useEffect, useRef, useState } from 'react'

const levelColors = {
  Experto: 'bg-green-900/60 border-green-400/40 text-green-300',
  Avanzado: 'bg-cyan-900/60 border-cyan-400/40 text-cyan-300',
  Intermedio: 'bg-slate-700/60 border-slate-500/40 text-slate-300',
}

const statLabels = {
  proyectos: 'PROYECTOS',
  tecnologias: 'TECNOLOGÍAS',
  appsWeb: 'APPS WEB',
  appsMoviles: 'APPS MÓVILES',
  sistemasIA: 'SIST. IA',
  modelosDeploy: 'MODELOS DEPLOY',
}

function AnimatedContent({ member, onBack }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [member.id])

  const anim = `transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <div>
      <button
        onClick={onBack}
        className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors mb-6 inline-block"
      >
        ← VOLVER
      </button>

      {/* ── HEADER: image + info ── */}
      <div className={`flex gap-6 items-start ${anim}`}>
        <div className="relative w-[180px] h-[180px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex-shrink-0">
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/10" />
          <div style={{ backgroundColor: member.color }} className="absolute top-0 left-0 w-4 h-[2px]" />
          <div style={{ backgroundColor: member.color }} className="absolute top-0 left-0 w-[2px] h-4" />
          <div style={{ backgroundColor: member.color }} className="absolute top-0 right-0 w-4 h-[2px]" />
          <div style={{ backgroundColor: member.color }} className="absolute top-0 right-0 w-[2px] h-4" />
          <div style={{ backgroundColor: member.color }} className="absolute bottom-0 left-0 w-4 h-[2px]" />
          <div style={{ backgroundColor: member.color }} className="absolute bottom-0 left-0 w-[2px] h-4" />
          <div style={{ backgroundColor: member.color }} className="absolute bottom-0 right-0 w-4 h-[2px]" />
          <div style={{ backgroundColor: member.color }} className="absolute bottom-0 right-0 w-[2px] h-4" />
          <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900" />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h2 className="text-2xl font-bold text-white">● {member.name}</h2>
            <span
              className="px-3 py-1 rounded-md text-xs uppercase tracking-wider"
              style={{
                backgroundColor: `${member.color}20`,
                border: `1px solid ${member.color}60`,
                color: member.color,
              }}
            >
              {member.rol}
            </span>
          </div>
          <p className="text-white/60 text-sm mb-3 leading-relaxed">{member.perfil}</p>
          <div className="flex flex-wrap gap-2">
            {member.tecnologias.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-600/50 text-slate-300 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700/50" />
        </div>
        <div className="relative flex justify-center">
          <div
            className="w-2 h-2 rotate-45"
            style={{ backgroundColor: member.color }}
          />
        </div>
      </div>

      {/* ── BODY: two-column grid ── */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${anim}`}>
        {/* ── LEFT COLUMN ── */}
        <div>
          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mb-4">
            DIAGNÓSTICO DEL OPERADOR
          </h3>
          <div>
            {member.skills.map((skill) => (
              <div
                key={skill.label}
                className="flex items-center justify-between py-3 border-b border-slate-700/30"
              >
                <span className="text-sm text-white/80">{skill.label}</span>
                <span
                  className={`text-xs px-3 py-0.5 rounded-md border tracking-wide ${levelColors[skill.level]}`}
                >
                  {skill.level}
                </span>
              </div>
            ))}
          </div>

          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mt-8 mb-4">
            <span className="text-cyan-400 mr-1">▲</span>
            REGISTRO DE EXPERIENCIA
          </h3>
          <ul className="space-y-2">
            {member.experiencia.map((item, i) => (
              <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                <span className="text-cyan-400 flex-shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div>
          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mb-4">
            ESTADÍSTICAS DE MISIÓN
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(member.stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-slate-900/60 border border-slate-700/40 rounded-lg p-6 text-center"
              >
                <p
                  className="text-5xl font-black font-mono leading-none"
                  style={{ color: member.color }}
                >
                  {value}
                </p>
                <p className="text-xs text-slate-500 tracking-[0.15em] uppercase mt-2 font-mono">
                  {statLabels[key] || key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mt-6 mb-4">
            LOGROS DESTACADOS
          </h3>
          <ul className="space-y-2">
            {member.logros.map((item, i) => (
              <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                <span className="text-cyan-400 flex-shrink-0">★</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function DossierSection({ member, onBack }) {
  const sectionRef = useRef(null)
  const prevMember = useRef(member)

  useEffect(() => {
    if (prevMember.current === member) return
    prevMember.current = member
    if (member) {
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [member])

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen py-16 px-4 md:px-8 transition-all duration-700 ${
        member ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {member ? (
          <AnimatedContent key={member.id} member={member} onBack={onBack} />
        ) : (
          <p className="text-center text-slate-500 text-sm font-mono">
            Selecciona un miembro de la tripulación para ver su dossier.
          </p>
        )}
      </div>
    </section>
  )
}
