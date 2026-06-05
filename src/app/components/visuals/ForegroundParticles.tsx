import { useRef, useEffect } from "react";

interface FParticle {
  x: number; y: number;
  size: number;
  speedX: number; speedY: number;
  phase: number;
  opacity: number;
}

export function ForegroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: FParticle[] = [];
    let time = 0;

    function resize() {
      const dpr = Math.min(devicePixelRatio, 1.2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      const count = 28;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 0.5 + Math.random() * 2.5,
          speedX: (Math.random() - 0.5) * 0.12,
          speedY: (Math.random() - 0.5) * 0.08 - 0.03,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.015 + Math.random() * 0.035,
        });
      }
    }

    function draw() {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      if (cw === 0 || ch === 0) return;

      ctx.clearRect(0, 0, cw, ch);
      time += 0.016;

      for (const p of particles) {
        p.x += p.speedX + Math.sin(time * 0.3 + p.phase) * 0.04;
        p.y += p.speedY + Math.cos(time * 0.2 + p.phase) * 0.03;

        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;
        if (p.y < -10) p.y = ch + 10;
        if (p.y > ch + 10) p.y = -10;

        const flicker = Math.sin(time * 0.6 + p.phase) * 0.3 + 0.7;
        const op = p.opacity * flicker;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,215,255,${op})`;
        ctx.fill();
      }
    }

    function loop() {
      draw();
      animId = requestAnimationFrame(loop);
    }

    resize();
    init();
    loop();
    window.addEventListener("resize", () => { resize(); init(); });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", () => { resize(); init(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3, filter: "blur(2px)" }}
    />
  );
}
