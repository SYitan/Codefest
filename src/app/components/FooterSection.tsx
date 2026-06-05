import { Rocket } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="py-12 px-6 bg-[#07071a] border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}>
            <Rocket size={16} className="text-white" />
          </div>
          <span className="text-slate-400 text-sm">[NOMBRE DEL EQUIPO] · CODEFEST AD ASTRA 2026</span>
        </div>

        <div className="flex items-center gap-6 text-slate-600 text-sm">
          <span>4 Integrantes</span>
          <span className="w-px h-4 bg-slate-800" />
          <span>Desarrollo · Automatización · IA</span>
        </div>
      </div>
    </footer>
  );
}
