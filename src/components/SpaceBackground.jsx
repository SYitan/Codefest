import { useRef, useEffect } from 'react'

function generateStars(w, h) {
  const stars = []
  const count = Math.floor((w * h) / 2000)

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 1 + Math.random(),
      baseOpacity: 0.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.2,
      isSparkle: false,
      isLarge: false,
    })
  }

  const largeCount = 8 + Math.floor(Math.random() * 5)
  for (let i = 0; i < largeCount; i++) {
    const edge = Math.floor(Math.random() * 4)
    let x, y
    switch (edge) {
      case 0: x = Math.random() * w; y = Math.random() * h * 0.15; break
      case 1: x = w - Math.random() * 120; y = Math.random() * h; break
      case 2: x = Math.random() * w; y = h - Math.random() * 120; break
      case 3: x = Math.random() * 120; y = Math.random() * h; break
      default: x = Math.random() * w; y = Math.random() * h; break
    }
    stars.push({
      x, y,
      size: 2 + Math.random(),
      baseOpacity: 0.6 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.12 + Math.random() * 0.2,
      isSparkle: false,
      isLarge: true,
    })
  }

  for (let i = 0; i < 4; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 2 + Math.random() * 0.5,
      baseOpacity: 0.8 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.15,
      isSparkle: true,
      isLarge: true,
    })
  }

  return stars
}

function generateRings(w, h) {
  const rings = []
  const count = 5
  const centerX = w / 2
  const centerY = h + 60

  for (let i = 0; i < count; i++) {
    const t = (i + 1) / count
    rings.push({
      centerX,
      centerY,
      radiusX: w * 0.1 + w * 0.35 * t,
      radiusY: (w * 0.1 + w * 0.35 * t) * 0.28,
      opacity: 0.04 + t * 0.04,
    })
  }

  return rings
}

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let stars = []
    let rings = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = generateStars(canvas.width, canvas.height)
      rings = generateRings(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const r of rings) {
        ctx.strokeStyle = `rgba(180, 200, 255, ${r.opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(r.centerX, r.centerY, r.radiusX, r.radiusY, 0, Math.PI, 0, true)
        ctx.stroke()
      }

      for (const s of stars) {
        const twinkle = Math.sin(time * 0.001 * s.speed * Math.PI * 2 + s.phase)
        const opacity = Math.max(0.05, s.baseOpacity * (0.5 + 0.5 * twinkle))

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()

        if (s.isSparkle) {
          ctx.save()
          ctx.translate(s.x, s.y)
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.5})`
          ctx.shadowBlur = 8
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(-8, 0)
          ctx.lineTo(8, 0)
          ctx.moveTo(0, -8)
          ctx.lineTo(0, 8)
          ctx.stroke()
          ctx.restore()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#000000',
          backgroundImage: [
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 30%, #000000 90%)',
            'radial-gradient(ellipse 55% 25% at 50% 100%, rgba(48,96,224,1) 0%, rgba(48,96,224,0.3) 40%, transparent 70%)',
            'radial-gradient(ellipse 80% 40% at 50% 100%, #2050c8 0%, #1a3a8f 40%, transparent 75%)',
            'radial-gradient(ellipse 75% 60% at 50% 45%, #0d2347 0%, #061020 50%, transparent 85%)',
          ].join(','),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.03 }}>
        <filter id="spaceNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#spaceNoise)" />
      </svg>
    </div>
  )
}
