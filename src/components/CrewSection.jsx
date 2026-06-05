import CrewCard from './CrewCard'
import useScrollReveal from '../hooks/useScrollReveal'

export default function CrewSection({ crew, onSelectMember }) {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()

  return (
    <section className="min-h-screen py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/20 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-teal-300 text-xs uppercase tracking-[0.3em] font-mono mb-4">
            — CODEFEST AD ASTRA 2026 —
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider mb-4">
            SELECCIÓN DE TRIPULACIÓN
          </h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Accede al dossier de cada miembro para revisar sus credenciales de misión.
          </p>
        </div>
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {crew.map((member) => (
            <CrewCard key={member.id} member={member} onSelect={onSelectMember} />
          ))}
        </div>
      </div>
    </section>
  )
}
