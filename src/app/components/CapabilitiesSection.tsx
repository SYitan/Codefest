import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Globe, Cog, Cpu } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

const categories = [
  {
    icon: Globe,
    color: "#6366f1",
    gradient: "from-indigo-500/20 to-indigo-500/0",
    title: "Desarrollo de Software",
    items: [
      "Aplicaciones web y móviles",
      "Arquitecturas cliente-servidor",
      "Consumo e integración de APIs",
      "Gestión de datos y persistencia",
    ],
  },
  {
    icon: Cog,
    color: "#06b6d4",
    gradient: "from-cyan-500/20 to-cyan-500/0",
    title: "Automatización",
    items: [
      "Diseño e implementación de flujos automatizados",
      "Integración entre plataformas",
      "Optimización de procesos repetitivos",
    ],
  },
  {
    icon: Cpu,
    color: "#8b5cf6",
    gradient: "from-violet-500/20 to-violet-500/0",
    title: "Inteligencia Artificial",
    items: [
      "Agentes inteligentes",
      "Modelos generativos",
      "Procesamiento de lenguaje natural",
      "Automatización impulsada por IA",
      "Sistemas de asistencia contextual",
    ],
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-24 px-6 bg-[#050510]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm tracking-widest uppercase">Lo que sabemos hacer</span>
            <h2 className="text-white mt-3" style={{ fontWeight: 700 }}>Capacidades Técnicas</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={0.1 + i * 0.12}>
              <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden h-full group hover:border-slate-600 transition-all duration-300">
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${cat.gradient} opacity-60`} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}>
                    <cat.icon size={22} style={{ color: cat.color }} />
                  </div>

                  <h3 className="text-white mb-4" style={{ fontWeight: 600 }}>{cat.title}</h3>

                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.color }} />
                        <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
