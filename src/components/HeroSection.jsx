import useScrollReveal from '../hooks/useScrollReveal'

const starPath = 'M14 0 C14 8 20 14 28 14 C20 14 14 20 14 28 C14 20 8 14 0 14 C8 14 14 8 14 0Z'

const constellationDots = [
  { cx: 85, cy: 10, label: 'Polaris' },
  { cx: 70, cy: 28 },
  { cx: 55, cy: 40 },
  { cx: 45, cy: 60 },
  { cx: 30, cy: 65 },
  { cx: 20, cy: 55 },
  { cx: 15, cy: 40 },
]

const constellationLines = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
]

export default function HeroSection({ onExplore }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Constellation background */}
      <svg
        viewBox="0 0 100 80"
        className="absolute top-10 right-10 w-[300px] h-[240px] md:w-[400px] md:h-[320px] opacity-50 pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.1))' }}
      >
        {constellationLines.map(([from, to]) => (
          <line
            key={`line-${from}-${to}`}
            x1={constellationDots[from].cx}
            y1={constellationDots[from].cy}
            x2={constellationDots[to].cx}
            y2={constellationDots[to].cy}
            stroke="white"
            strokeWidth="0.5"
            opacity="0.08"
          />
        ))}
        {constellationDots.map((d, i) => (
          <circle
            key={`dot-${i}`}
            cx={d.cx}
            cy={d.cy}
            r={i === 0 ? 3 : 1.5}
            fill="white"
            opacity={i === 0 ? 0.35 : 0.12}
          />
        ))}
        <circle cx={85} cy={10} r={6} fill="none" stroke="white" strokeWidth="0.3" opacity="0.15" />
      </svg>

      <div
        className={`text-center max-w-3xl transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Star */}
        <div className="flex justify-center mb-6 animate-star-fade" style={{ animation: 'fadeSlideIn 0.6s ease-out both' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" className="animate-star-pulse" style={{ filter: 'drop-shadow(0 0 12px #22d3ee)' }}>
            <path d={starPath} fill="white" />
          </svg>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-teal-400/40 bg-black/50 backdrop-blur-sm font-mono text-xs text-teal-300 tracking-widest"
          style={{ animation: 'fadeSlideIn 0.6s 0.15s ease-out both' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" style={{ boxShadow: '0 0 6px #2dd4bf' }} />
          MISIÓN: CODEFEST AD ASTRA 2026
        </div>

        {/* Title */}
        <h1
          className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-4"
          style={{
            textShadow: '0 0 40px #0d9488',
            animation: 'fadeSlideIn 0.6s 0.3s ease-out both',
          }}
        >
          Polaris
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-3 leading-relaxed"
          style={{ animation: 'fadeSlideIn 0.6s 0.45s ease-out both' }}
        >
          Construimos soluciones reales mediante IA, automatización e ingeniería de software.
        </p>

        {/* Coordinates */}
        <p
          className="font-mono text-xs text-white/30 tracking-widest mb-8"
          style={{ animation: 'fadeSlideIn 0.6s 0.55s ease-out both' }}
        >
          α 02h 31m 49s  ·  δ +89° 15′ 51″  ·  433 ly
        </p>

        {/* Button */}
        <div style={{ animation: 'fadeSlideIn 0.6s 0.65s ease-out both' }}>
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-600/80 hover:bg-teal-500 text-white text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
          >
            EXPLORAR NUESTRA TRIPULACIÓN →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes starPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-star-pulse {
          animation: starPulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
