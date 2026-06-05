import { useEffect, useRef, useState } from 'react'

const levelColors = {
  Experto: 'bg-green-900/60 border-green-400/40 text-green-300',
  Avanzado: 'bg-cyan-900/60 border-cyan-400/40 text-cyan-300',
  Intermedio: 'bg-slate-700/60 border-slate-500/40 text-slate-300',
  Basico: 'bg-zinc-800/60 border-zinc-600/40 text-zinc-400',
}

function getLevel(skill) {
  if (skill.level) return skill.level
  if (skill.value != null) {
    if (skill.value >= 75) return 'Experto'
    if (skill.value >= 50) return 'Avanzado'
    if (skill.value >= 25) return 'Intermedio'
    return 'Basico'
  }
  return 'Intermedio'
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
        className="text-sm hover:opacity-80 transition-opacity mb-6 inline-block"
        style={{ color: member.color }}
      >
        ← VOLVER
      </button>

      {/* ── HEADER: image + info ── */}
      <div className={`flex gap-6 items-start ${anim}`}>
        <div className="relative w-[220px] h-[220px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex-shrink-0">
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
          <span className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-sm text-green-400 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
            ACTIVO
          </span>
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
                className="px-3 py-1 rounded-md text-xs font-semibold tracking-wide"
                style={{
                  backgroundColor: `${member.color}20`,
                  border: `1px solid ${member.color}50`,
                  color: member.color,
                  textShadow: `0 0 8px ${member.color}40`,
                }}
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
                className="flex items-center justify-between py-1.5 border-b border-slate-700/20"
              >
                <span className="text-sm text-white/80">{skill.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md border tracking-wide ${levelColors[getLevel(skill)]}`}
                >
                  {getLevel(skill)}
                </span>
              </div>
            ))}
          </div>

          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mt-8 mb-4">
            <span className="mr-1" style={{ color: member.color }}>▲</span>
            REGISTRO DE EXPERIENCIA
          </h3>
          <ul className="space-y-3">
            {member.experiencia.map((item, i) => (
              <li key={i} className="text-base text-white/80 leading-relaxed flex gap-3">
                <span className="flex-shrink-0 mt-1" style={{ color: member.color }}>·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div>
          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mb-4">
            FORTALEZAS CLAVE
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {member.fortalezas.map((f) => (
              <span
                key={f}
                className="px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide"
                style={{
                  backgroundColor: `${member.color}15`,
                  border: `1px solid ${member.color}30`,
                  color: member.color,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mb-4">
            CONTRIBUCIONES
          </h3>
          <ul className="space-y-2 mb-6">
            {member.contribuciones.map((item, i) => (
              <li key={i} className="text-sm text-white/70 leading-relaxed flex gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: member.color }}>◆</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-xs text-slate-500 tracking-[0.2em] uppercase font-mono mb-4">
            LOGROS DESTACADOS
          </h3>
          <ul className="space-y-3">
            {member.logros.map((item, i) => (
              <li key={i} className="text-base text-white/80 leading-relaxed flex gap-3">
                <span className="flex-shrink-0 mt-0.5" style={{ color: member.color }}>★</span>
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
      className={`py-12 px-4 md:px-8 transition-all duration-700 relative ${
        member ? 'opacity-100' : 'opacity-0'
      }`}
      style={
        member
          ? {
              background: `
                radial-gradient(ellipse at 30% 20%, ${member.color}18 0%, transparent 65%),
                radial-gradient(ellipse at 70% 80%, ${member.color}12 0%, transparent 65%)
              `,
              borderTop: `1px solid ${member.color}15`,
              borderBottom: `1px solid ${member.color}10`,
            }
          : {}
      }
    >
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-slate-950/40 rounded-2xl p-6 md:p-8 border border-slate-800/40">
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
