import { useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function DataRing({ x, y, size, color, delay, lowPower }: { x: string; y: string; size: number; color: string; delay: number; lowPower?: boolean }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        border: `1px solid ${color}`,
        boxShadow: `0 0 ${size * 0.3}px ${color}20, inset 0 0 ${size * 0.3}px ${color}10`,
      }}
      initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
      whileInView={lowPower ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 1, opacity: 1, rotate: 360 }}
      viewport={{ once: true }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        animate={lowPower ? undefined : { rotate: [0, 360] }}
        transition={lowPower ? undefined : { duration: 4, repeat: Infinity, ease: "linear", delay }}
      />
    </motion.div>
  );
}

function DataStream({ x, y, width, height, color, delay, lowPower }: {
  x: string; y: string; width: number; height: number; color: string; delay: number; lowPower?: boolean;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none overflow-hidden"
      style={{ left: x, top: y, width, height, opacity: lowPower ? 0.1 : 0.15 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: lowPower ? 0.1 : 0.15 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full"
          style={{
            top: `${i * 20}%`,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            filter: "blur(1px)",
          }}
          animate={lowPower ? undefined : { x: ["-100%", "100%"] }}
          transition={lowPower ? undefined : { duration: 3 + i * 0.5, delay: i * 0.2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}

function CornerBracket({ x, y, color, flipX, flipY }: {
  x: string; y: string; color: string; flipX?: boolean; flipY?: boolean;
}) {
  const sx = flipX ? "-scale-x-100" : "";
  const sy = flipY ? "-scale-y-100" : "";
  return (
    <div
      className={`absolute pointer-events-none ${sx} ${sy}`}
      style={{ left: x, top: y }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        <path d={`M${flipX ? 40 : 0} ${flipY ? 40 : 0} L${flipX ? 40 : 0} ${flipY ? 0 : 15} L${flipX ? 25 : 15} ${flipY ? 0 : 15}`}
          fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
  );
}

function NeuralNode({ x, y, color, size = 4, lowPower }: {
  x: string; y: string; color: string; size?: number; lowPower?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}60`,
      }}
      animate={lowPower ? undefined : { scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
      transition={lowPower ? undefined : { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function NeuralConnection({ x1, y1, x2, y2, color }: {
  x1: number; y1: number; x2: number; y2: number; color: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x1, top: y1, width: len, height: 1,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0",
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: 0.12,
      }}
    />
  );
}

export function HolographicOverlay({ lowPower }: { lowPower?: boolean }) {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" style={{ opacity: lowPower ? 0.55 : 1 }}>
      {/* Corner brackets - Hero section */}
      <CornerBracket x="5%" y="15%" color="#38bdf8" />
      <CornerBracket x="95%" y="15%" color="#38bdf8" flipX />
      <CornerBracket x="5%" y="85%" color="#818cf8" flipY />
      <CornerBracket x="95%" y="85%" color="#818cf8" flipX flipY />

      {/* Data rings - scroll sections */}
      <DataRing x="8%" y="20%" size={120} color="rgba(56,189,248,0.15)" delay={0.5} lowPower={lowPower} />
      <DataRing x="85%" y="40%" size={80} color="rgba(129,140,248,0.12)" delay={0.8} lowPower={lowPower} />
      <DataRing x="10%" y="60%" size={100} color="rgba(56,189,248,0.1)" delay={1.2} lowPower={lowPower} />
      <DataRing x="80%" y="75%" size={140} color="rgba(168,85,247,0.08)" delay={1.5} lowPower={lowPower} />

      {/* Data streams */}
      <DataStream x="15%" y="25%" width={120} height={80} color="#38bdf8" delay={0.3} lowPower={lowPower} />
      <DataStream x="75%" y="55%" width={80} height={60} color="#818cf8" delay={0.6} lowPower={lowPower} />
      <DataStream x="20%" y="70%" width={100} height={100} color="#a78bfa" delay={0.9} lowPower={lowPower} />

      {/* Neural network nodes */}
      <NeuralNode x="12%" y="18%" color="#38bdf8" lowPower={lowPower} />
      <NeuralNode x="18%" y="22%" color="#818cf8" lowPower={lowPower} />
      <NeuralNode x="22%" y="16%" color="#a78bfa" lowPower={lowPower} />
      <NeuralNode x="82%" y="38%" color="#38bdf8" lowPower={lowPower} />
      <NeuralNode x="88%" y="42%" color="#818cf8" lowPower={lowPower} />
      <NeuralNode x="15%" y="58%" color="#a78bfa" lowPower={lowPower} />
      <NeuralNode x="85%" y="72%" color="#38bdf8" lowPower={lowPower} />

      {/* Neural connections */}
      <NeuralConnection x1={200} y1={300} x2={290} y2={340} color="#38bdf8" />
      <NeuralConnection x1={290} y1={340} x2={350} y2={280} color="#818cf8" />
      <NeuralConnection x1={200} y1={300} x2={350} y2={280} color="#a78bfa" />
      <NeuralConnection x1={1300} y1={600} x2={1400} y2={660} color="#38bdf8" />
      <NeuralConnection x1={240} y1={920} x2={340} y2={960} color="#a78bfa" />

      {/* Glass panel - holographic */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "72%", top: "18%", width: 180, height: 100,
          background: "linear-gradient(135deg, rgba(56,189,248,0.03), rgba(56,189,248,0.01))",
          border: "1px solid rgba(56,189,248,0.08)",
          backdropFilter: "blur(4px)",
          borderRadius: 12,
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="p-3">
          <div className="h-1.5 w-16 rounded mb-2" style={{ background: "rgba(56,189,248,0.15)" }} />
          <div className="h-1 w-24 rounded mb-1.5" style={{ background: "rgba(56,189,248,0.08)" }} />
          <div className="h-1 w-20 rounded" style={{ background: "rgba(56,189,248,0.06)" }} />
        </div>
      </motion.div>

      {/* Secondary glass panel */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "15%", top: "45%", width: 140, height: 80,
          background: "linear-gradient(135deg, rgba(129,140,248,0.03), rgba(129,140,248,0.01))",
          border: "1px solid rgba(129,140,248,0.06)",
          backdropFilter: "blur(4px)",
          borderRadius: 10,
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#818cf8" }} />
            <div className="h-1 w-12 rounded" style={{ background: "rgba(129,140,248,0.15)" }} />
          </div>
          <div className="h-1 w-20 rounded mb-1" style={{ background: "rgba(129,140,248,0.08)" }} />
          <div className="h-1 w-16 rounded" style={{ background: "rgba(129,140,248,0.06)" }} />
        </div>
      </motion.div>

      {/* Bottom neural grid */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(56,189,248,0.02))",
          borderTop: "1px solid rgba(56,189,248,0.04)",
        }}
      />
    </div>
  );
}
