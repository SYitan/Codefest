import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Brain, Code2, Wrench, Layout } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Apps web y móviles", color: "#6366f1" },
  { icon: Wrench, label: "Automatización de procesos", color: "#06b6d4" },
  { icon: Brain, label: "Agentes inteligentes", color: "#8b5cf6" },
  { icon: Layout, label: "Diseño centrado en el usuario", color: "#10b981" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SummarySection() {
  return (
    <section className="py-24 px-6 bg-[#07071a]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-indigo-400 text-sm tracking-widest uppercase">Sobre nosotros</span>
            <h2 className="text-white mt-3" style={{ fontWeight: 700 }}>Resumen Ejecutivo</h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <p className="text-slate-400 leading-relaxed">
                Somos un equipo de cuatro estudiantes universitarios que combina formación académica con experiencia práctica en desarrollo de software, automatización de procesos y construcción de soluciones digitales.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Aunque nos encontramos en etapas tempranas de nuestra carrera profesional, hemos trabajado en proyectos que nos han permitido comprender el <span className="text-indigo-300">ciclo completo de desarrollo</span>: desde la identificación de una necesidad hasta la implementación y validación de una solución funcional.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Para CODEFEST AD ASTRA 2026, buscamos desarrollar un agente de inteligencia artificial que combine procesamiento de lenguaje natural, automatización e integración de servicios para asistir a los usuarios en la resolución de tareas reales de manera eficiente y accesible.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <FadeIn key={item.label} delay={0.15 + i * 0.08}>
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${item.color}20` }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <p className="text-slate-300 text-sm leading-snug">{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
