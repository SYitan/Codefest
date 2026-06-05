import { useEffect, useRef, useState } from 'react'

function AnimatedContent({ member, onBack }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const t = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(t)
  }, [member.id])

  const animClass = `transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`

  const metrics = [
    { label: 'PROYECTOS', value: member.experiencia.length + member.contribuciones.length },
    { label: 'TECNOLOGÍAS', value: member.tecnologias.length },
    { label: 'FORTALEZAS', value: member.fortalezas.length },
    { label: 'LOGROS', value: member.logros.length },
  ]

  return (
    <div>
      <button
        onClick={onBack}
        className="text-teal-400 text-sm hover:underline mb-8 inline-block transition-all"
      >
        ← VOLVER A TRIPULACIÓN
      </button>

      <div className={`flex flex-col lg:flex-row gap-8 ${animClass}`}>
        <div className="lg:w-1/3">
          <div className="relative w-full max-w-xs mx-auto lg:mx-0 rounded-lg bg-slate-800 mb-6 overflow-hidden border border-slate-700/50">
            <div className="aspect-[3/4]">
              <img
                src={member.photo}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              <div className="absolute inset-0 bg-slate-900/10" />
            </div>
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 rounded-tl" style={{ borderColor: `${member.color}80` }} />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 rounded-tr" style={{ borderColor: `${member.color}80` }} />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 rounded-bl" style={{ borderColor: `${member.color}80` }} />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 rounded-br" style={{ borderColor: `${member.color}80` }} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
          <div
            className="inline-block px-3 py-1 rounded-full border text-xs uppercase tracking-wider mb-4"
            style={{
              backgroundColor: `${member.color}15`,
              borderColor: `${member.color}50`,
              color: member.color,
            }}
          >
            {member.rol}
          </div>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">{member.perfil}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {member.tecnologias.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/40 text-xs text-slate-300 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/30">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">Valor en el equipo</p>
            <p className="text-sm text-slate-300 leading-relaxed italic">"{member.valorEquipo}"</p>
          </div>
        </div>

        <div className="lg:w-2/3 space-y-8">
          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] font-mono mb-4" style={{ color: member.color }}>
              DIAGNÓSTICO DEL OPERADOR
            </h3>
            <div className="space-y-4">
              {member.skills.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-200">{skill.label}</span>
                    <span style={{ color: member.color }}>{skill.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700/50 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${loaded ? skill.value : 0}%`,
                        backgroundColor: member.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] font-mono mb-4" style={{ color: member.color }}>
              ESTADÍSTICAS DE MISIÓN
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-center"
                >
                  <p className="text-xl font-bold" style={{ color: member.color }}>{m.value}</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5 font-mono">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] font-mono mb-4" style={{ color: member.color }}>
              REGISTRO DE EXPERIENCIA
            </h3>
            <ul className="space-y-2">
              {member.experiencia.map((item, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span style={{ color: member.color }}>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] font-mono mb-4" style={{ color: member.color }}>
              FORTALEZAS CLAVE
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.fortalezas.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-mono border"
                  style={{
                    backgroundColor: `${member.color}15`,
                    borderColor: `${member.color}30`,
                    color: member.color,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.3em] font-mono mb-4" style={{ color: member.color }}>
              LOGROS DESTACADOS
            </h3>
            <ul className="space-y-2">
              {member.logros.map((item, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-amber-400">★</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute inset-0 -m-6 rounded-3xl bg-slate-900/60 backdrop-blur-sm" />
        <div className="relative">
          {member ? (
            <AnimatedContent key={member.id} member={member} onBack={onBack} />
          ) : (
            <p className="text-center text-slate-500 text-sm font-mono">
              Selecciona un miembro de la tripulación para ver su dossier.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
