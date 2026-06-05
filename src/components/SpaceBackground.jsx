import { useRef, useEffect } from 'react'

const STAR_COLORS = [
  [255, 255, 255], // white
  [200, 220, 255], // blue-white
  [255, 230, 200], // warm white
  [255, 200, 180], // orange
  [200, 200, 255], // pale blue
  [255, 180, 150], // red-orange
]

function pickStarColor() {
  const r = Math.random()
  if (r < 0.4) return STAR_COLORS[0]
  if (r < 0.65) return STAR_COLORS[1]
  if (r < 0.8) return STAR_COLORS[2]
  if (r < 0.9) return STAR_COLORS[3]
  if (r < 0.96) return STAR_COLORS[4]
  return STAR_COLORS[5]
}

function generateStars(w, h) {
  const stars = []
  const denseCount = Math.floor((w * h) / 1200)

  for (let i = 0; i < denseCount; i++) {
    const color = pickStarColor()
    const sizeRand = Math.random()
    let size, baseOpacity
    if (sizeRand < 0.6) {
      size = 0.3 + Math.random() * 0.4
      baseOpacity = 0.15 + Math.random() * 0.3
    } else if (sizeRand < 0.85) {
      size = 0.7 + Math.random() * 0.6
      baseOpacity = 0.3 + Math.random() * 0.4
    } else if (sizeRand < 0.96) {
      size = 1.3 + Math.random() * 0.8
      baseOpacity = 0.5 + Math.random() * 0.3
    } else {
      size = 2.2 + Math.random() * 1.2
      baseOpacity = 0.7 + Math.random() * 0.3
    }
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size,
      baseOpacity,
      phase: Math.random() * Math.PI * 2,
      speed: 0.08 + Math.random() * 0.25,
      color,
      glow: size > 1.8 ? 6 + Math.random() * 8 : 0,
      spike: size > 2.2 && Math.random() < 0.5,
    })
  }

  return stars
}

function generateNebulae(w, h) {
  return [
    { x: w * 0.2, y: h * 0.15, rx: w * 0.2, ry: h * 0.12, color: [40, 20, 80], opacity: 0.04 },
    { x: w * 0.75, y: h * 0.3, rx: w * 0.25, ry: h * 0.15, color: [20, 40, 90], opacity: 0.035 },
    { x: w * 0.5, y: h * 0.7, rx: w * 0.35, ry: h * 0.08, color: [60, 30, 100], opacity: 0.03 },
    { x: w * 0.1, y: h * 0.6, rx: w * 0.15, ry: h * 0.1, color: [80, 40, 60], opacity: 0.025 },
    { x: w * 0.85, y: h * 0.75, rx: w * 0.18, ry: h * 0.12, color: [30, 50, 90], opacity: 0.03 },
  ]
}

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let stars = []
    let nebulae = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = generateStars(canvas.width, canvas.height)
      nebulae = generateNebulae(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    // Pre-render noise texture
    const noiseCanvas = document.createElement('canvas')
    noiseCanvas.width = 256
    noiseCanvas.height = 256
    const nctx = noiseCanvas.getContext('2d')
    const imgData = nctx.createImageData(256, 256)
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 60
      imgData.data[i] = v
      imgData.data[i + 1] = v
      imgData.data[i + 2] = v
      imgData.data[i + 3] = 15 + Math.random() * 20
    }
    nctx.putImageData(imgData, 0, 0)

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Nebulae
      for (const n of nebulae) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx)
        grad.addColorStop(0, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},${n.opacity * 0.6})`)
        grad.addColorStop(0.5, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},${n.opacity * 0.2})`)
        grad.addColorStop(1, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.ellipse(n.x, n.y, n.rx, n.ry, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // Stars
      for (const s of stars) {
        const twinkle = Math.sin(time * 0.001 * s.speed * Math.PI * 2 + s.phase)
        const opacity = Math.max(0.01, s.baseOpacity * (0.1 + 0.9 * Math.abs(twinkle)))
        const [r, g, b] = s.color

        // Glow for larger stars
        if (s.glow > 0) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.glow)
          glow.addColorStop(0, `rgba(${r},${g},${b},${opacity * 0.4})`)
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.glow, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()

        // Diffraction spikes on brightest stars
        if (s.spike && opacity > 0.4) {
          ctx.save()
          ctx.translate(s.x, s.y)
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.35})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(-s.size * 4, 0); ctx.lineTo(s.size * 4, 0)
          ctx.moveTo(0, -s.size * 4); ctx.lineTo(0, s.size * 4)
          ctx.stroke()
          ctx.restore()
        }
      }

      // Noise overlay
      ctx.save()
      ctx.globalAlpha = 0.15
      ctx.drawImage(noiseCanvas, 0, 0, canvas.width, canvas.height)
      ctx.restore()

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
          backgroundColor: '#000002',
          backgroundImage: [
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 20%, #000002 85%)',
            'radial-gradient(ellipse 50% 30% at 50% 100%, rgba(20,50,120,0.6) 0%, rgba(20,50,120,0.15) 50%, transparent 80%)',
            'radial-gradient(ellipse 60% 40% at 50% 100%, #102050 0%, #081030 50%, transparent 80%)',
            'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(10,20,50,0.5) 0%, transparent 75%)',
            'radial-gradient(ellipse 40% 20% at 30% 20%, rgba(60,30,100,0.12) 0%, transparent 70%)',
          ].join(','),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  )
}
