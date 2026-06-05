import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { CheckCircle2, Lightbulb, Users, Layers, TrendingUp, PackageCheck } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

const differentials = [
  {
    icon: TrendingUp,
    text: "Hemos desarrollado soluciones más allá del entorno académico.",
    color: "#6366f1",
  },
  {
    icon: Lightbulb,
    text: "Estamos acostumbrados a aprender tecnologías nuevas de forma autónoma.",
    color: "#06b6d4",
  },
  {
    icon: Layers,
    text: "Entendemos el proceso completo de construcción de productos digitales.",
    color: "#8b5cf6",
  },
  {
    icon: PackageCheck,
    text: "Combinamos habilidades de desarrollo, automatización e inteligencia artificial.",
    color: "#10b981",
  },
  {
    icon: Users,
    text: "Tenemos experiencia colaborando para convertir ideas en prototipos funcionales.",
    color: "#f59e0b",
  },
];

export function DifferentialSection() {
  return (
    <section className="py-24 px-6 bg-[#07071a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <span className="text-violet-400 text-sm tracking-widest uppercase">Por qué elegirnos</span>
              <h2 className="text-white mt-3 mb-6" style={{ fontWeight: 700 }}>Nuestro Valor Diferencial</h2>
              <p className="text-slate-400 leading-relaxed">
                Lo que nos diferencia no es únicamente el conocimiento técnico, sino nuestra <span className="text-violet-300">capacidad de ejecución</span>. Convertimos ideas en soluciones funcionales con enfoque, disciplina y trabajo colaborativo.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {differentials.map((item, i) => (
              <FadeIn key={i} delay={0.08 + i * 0.09}>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}25` }}>
                    <CheckCircle2 size={18} style={{ color: item.color }} />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
