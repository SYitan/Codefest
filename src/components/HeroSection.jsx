import useScrollReveal from '../hooks/useScrollReveal'

export default function HeroSection({ onExplore }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div
        className={`text-center max-w-3xl transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-teal-400/40 bg-black/50 backdrop-blur-sm font-mono text-xs text-teal-300 tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          MISIÓN: CODEFEST AD ASTRA 2026
        </div>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-4">
          Polaris
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Construimos soluciones reales mediante IA, automatización e ingeniería de software.
        </p>
        <button
          onClick={onExplore}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-600/80 hover:bg-teal-500 text-white text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
        >
          EXPLORAR NUESTRA TRIPULACIÓN →
        </button>
      </div>
    </section>
  )
}
