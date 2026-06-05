import { useRef, useEffect } from "react";

const NODE_DEFS = [
  { rx: 0.72, ry: 0.22 }, { rx: 0.68, ry: 0.40 }, { rx: 0.80, ry: 0.35 },
  { rx: 0.62, ry: 0.55 }, { rx: 0.76, ry: 0.58 }, { rx: 0.85, ry: 0.48 },
  { rx: 0.58, ry: 0.32 }, { rx: 0.90, ry: 0.28 }, { rx: 0.70, ry: 0.70 },
  { rx: 0.82, ry: 0.70 }, { rx: 0.64, ry: 0.78 }, { rx: 0.88, ry: 0.60 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 5], [2, 4], [2, 5], [3, 4], [4, 8],
  [5, 9], [6, 1], [6, 3], [7, 0], [7, 2], [8, 9], [9, 10], [10, 11], [11, 5],
];

function cpOf(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = -(y2 - y1) * 0.3;
  const dy = (x2 - x1) * 0.3;
  return { cx: mx + dx, cy: my + dy };
}

function bezierPt(t: number, x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) {
  const mt = 1 - t;
  return {
    x: mt * mt * x1 + 2 * mt * t * cx + t * t * x2,
    y: mt * mt * y1 + 2 * mt * t * cy + t * t * y2,
  };
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let scrollProgress = 0;
    let W: number, H: number;

    function resize() {
      const dpr = Math.min(devicePixelRatio, 1.2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("scroll", () => {
      const ms = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollProgress = ms > 0 ? window.scrollY / ms : 0;
    });

    const nodes = () => NODE_DEFS.map((n) => ({ x: n.rx * W, y: n.ry * H }));

    const pulses: { ci: number; t: number; speed: number }[] = [];

    function spawnPulse() {
      const ci = Math.floor(Math.random() * CONNECTIONS.length);
      pulses.push({ ci, t: 0, speed: 0.004 + Math.random() * 0.003 });
    }

    const spawnTimer = setInterval(spawnPulse, 800);

    function draw() {
      const activation = Math.min(1, Math.max(0, scrollProgress / 0.5));
      ctx.clearRect(0, 0, W, H);

      if (activation < 0.02) return;

      const ns = nodes();

      for (const [a, b] of CONNECTIONS) {
        const na = ns[a], nb = ns[b];
        const cp = cpOf(na.x, na.y, nb.x, nb.y);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.quadraticCurveTo(cp.cx, cp.cy, nb.x, nb.y);
        ctx.strokeStyle = `rgba(120,60,200,${0.25 * activation})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t > 1) { pulses.splice(i, 1); continue; }

        const [a, b] = CONNECTIONS[p.ci];
        const na = ns[a], nb = ns[b];
        const cp = cpOf(na.x, na.y, nb.x, nb.y);
        const pt = bezierPt(p.t, na.x, na.y, cp.cx, cp.cy, nb.x, nb.y);

        const alpha = Math.sin(p.t * Math.PI) * 1.0 * activation;
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6);
        g.addColorStop(0, `rgba(168,85,247,${alpha})`);
        g.addColorStop(0.5, `rgba(120,60,200,${alpha * 0.5})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      for (const n of ns) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 4);
        g.addColorStop(0, `rgba(200,140,255,${1.2 * activation})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    }

    function loop() {
      draw();
      animId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
