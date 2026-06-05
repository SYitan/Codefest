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

const CONSTELLATION_POINTS = [
  { rx: 0.05, ry: 0.08 }, { rx: 0.12, ry: 0.04 }, { rx: 0.20, ry: 0.06 },
  { rx: 0.04, ry: 0.20 }, { rx: 0.08, ry: 0.35 }, { rx: 0.03, ry: 0.50 },
  { rx: 0.06, ry: 0.65 }, { rx: 0.04, ry: 0.80 }, { rx: 0.10, ry: 0.92 },
  { rx: 0.20, ry: 0.96 }, { rx: 0.35, ry: 0.97 }, { rx: 0.50, ry: 0.98 },
  { rx: 0.65, ry: 0.97 }, { rx: 0.80, ry: 0.96 }, { rx: 0.90, ry: 0.92 },
  { rx: 0.96, ry: 0.80 }, { rx: 0.94, ry: 0.65 }, { rx: 0.97, ry: 0.50 },
  { rx: 0.95, ry: 0.35 }, { rx: 0.96, ry: 0.20 }, { rx: 0.92, ry: 0.08 },
  { rx: 0.85, ry: 0.04 }, { rx: 0.78, ry: 0.06 },
];

const CONSTELLATION_LINKS: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
  [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22],
  [0, 21], [2, 22], [1, 20], [3, 6], [7, 10], [11, 14], [15, 18], [19, 22],
  [5, 17], [4, 16],
];

export function NeuralNetworkBackground({ lowPower }: { lowPower?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let scrollProgress = 0;
    let W: number, H: number;
    const dpr = 1;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const handleScroll = () => {
      const ms = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollProgress = ms > 0 ? window.scrollY / ms : 0;
    };

    window.addEventListener("scroll", handleScroll);

    const nodes = () => NODE_DEFS.map((n) => ({ x: n.rx * W, y: n.ry * H }));

    const pulses: { ci: number; t: number; speed: number }[] = [];
    const pulseInterval = lowPower ? 1400 : 800;
    const maxPulses = lowPower ? 5 : 10;

    function spawnPulse() {
      if (pulses.length >= maxPulses) return;
      const ci = Math.floor(Math.random() * CONNECTIONS.length);
      pulses.push({ ci, t: 0, speed: lowPower ? 0.003 + Math.random() * 0.002 : 0.004 + Math.random() * 0.003 });
    }

    const spawnTimer = setInterval(spawnPulse, pulseInterval);

    function draw() {
      const activation = Math.min(1, Math.max(0, scrollProgress / 0.5));
      ctx.clearRect(0, 0, W, H);

      if (activation < 0.02) return;

      const ns = nodes();

      // Constellations
      const cpts = CONSTELLATION_POINTS.map((p) => ({ x: p.rx * W, y: p.ry * H }));
      for (const [a, b] of CONSTELLATION_LINKS) {
        const pa = cpts[a], pb = cpts[b];
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(180,140,255,${0.035 * activation})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (const pt of cpts) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${0.04 * activation})`;
        ctx.fill();
      }

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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lowPower]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
