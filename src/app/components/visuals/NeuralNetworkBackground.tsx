import { useRef, useEffect } from "react";
import { useScroll } from "motion/react";

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  color: string;
  label: string;
  phase: number;
  brightness: number;
}

interface Connection { from: number; to: number; baseOpacity: number; }

interface Pulse {
  from: number; to: number;
  progress: number; speed: number;
}

const COLORS = ["#38bdf8", "#818cf8", "#a78bfa", "#06b6d4", "#6366f1"];
const LABELS = ["AI", "DATA", "CLOUD", "API", "ML", "NLP", "AGENT", "AUTO", "FULL", "MOBILE", "SYS", "OPS", "FLOW", "CORE", "EDGE", "LINK"];

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => { scrollRef.current = v; });
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let nodes: Node[] = [];
    let connections: Connection[] = [];
    let pulses: Pulse[] = [];
    let time = 0;
    let spawnTimer = 0;

    function resize() {
      const dpr = Math.min(devicePixelRatio, 1.2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      nodes = [];
      connections = [];
      pulses = [];
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const count = 16;

      for (let i = 0; i < count; i++) {
        const rightBias = Math.pow(Math.random(), 0.5);
        nodes.push({
          x: cw * 0.05 + rightBias * cw * 0.9,
          y: ch * 0.08 + Math.random() * ch * 0.84,
          vx: 0, vy: 0,
          radius: 1.2 + Math.random() * 2.8,
          color: COLORS[i % COLORS.length],
          label: LABELS[i % LABELS.length],
          phase: Math.random() * Math.PI * 2,
          brightness: 0.3 + Math.random() * 0.7,
        });
      }

      const maxDist = Math.min(cw, ch) * 0.35;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist && Math.random() < 0.25) {
            const t = d / maxDist;
            connections.push({ from: i, to: j, baseOpacity: 0.06 * (1 - t) + 0.02 });
          }
        }
      }
    }

    function spawnPulse(scrollSpeed: number) {
      if (connections.length === 0) return;
      const ci = Math.floor(Math.random() * connections.length);
      const c = connections[ci];
      pulses.push({
        from: c.from, to: c.to,
        progress: 0,
        speed: (0.003 + Math.random() * 0.004) * (1 + scrollSpeed * 2),
      });
    }

    function draw() {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      if (cw === 0 || ch === 0) return;

      ctx.clearRect(0, 0, cw, ch);
      time += 0.016;

      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollProg = Math.min(1, Math.max(0, scrollRef.current / maxScroll));
      const influence = scrollProg;

      // Drift nodes slowly
      for (const n of nodes) {
        n.vx += (Math.random() - 0.5) * 0.04;
        n.vy += (Math.random() - 0.5) * 0.04;
        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(20, Math.min(cw - 20, n.x));
        n.y = Math.max(20, Math.min(ch - 20, n.y));
      }

      // Connections
      for (const c of connections) {
        const na = nodes[c.from];
        const nb = nodes[c.to];
        const opacity = c.baseOpacity * (1 + influence * 0.5);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(56,189,248,${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Spawn pulses
      spawnTimer += 0.016;
      const interval = Math.max(0.4, 1.2 - influence * 0.6);
      if (spawnTimer > interval) {
        spawnTimer = 0;
        spawnPulse(influence);
      }

      // Update and draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }

        const na = nodes[p.from];
        const nb = nodes[p.to];
        const x = na.x + (nb.x - na.x) * p.progress;
        const y = na.y + (nb.y - na.y) * p.progress;
        const bright = Math.sin(p.progress * Math.PI) * (0.5 + influence * 0.5);
        const r = 1.5 + bright * 2;

        // Glow
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
        g.addColorStop(0, `rgba(56,189,248,${bright * 0.6})`);
        g.addColorStop(0.3, `rgba(56,189,248,${bright * 0.2})`);
        g.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Pulse core
        ctx.beginPath();
        ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${bright * 0.8})`;
        ctx.fill();
      }

      // Nodes
      for (const n of nodes) {
        const breathe = Math.sin(time * 0.5 + n.phase) * 0.2 + 0.8;
        const nodeBright = n.brightness * breathe;
        const scrollBright = nodeBright * (0.5 + influence * 0.5);
        const r = n.radius;

        // Glow
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        const glowColor = hexToRgba(n.color, scrollBright * 0.12);
        ng.addColorStop(0, glowColor);
        ng.addColorStop(0.4, hexToRgba(n.color, scrollBright * 0.04));
        ng.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(n.color, 0.5 + scrollBright * 0.5);
        ctx.fill();

        // Core highlight
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${scrollBright * 0.3})`;
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
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
