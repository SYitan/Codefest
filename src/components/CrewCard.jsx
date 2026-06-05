import useScrollReveal from "../hooks/useScrollReveal";

export default function CrewCard({ member, onSelect }) {
  const { shortName, rol, tecnologias, photo, color, experiencia } = member;
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      onClick={() => onSelect(member)}
      style={{ "--accent": color }}
      className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-cyan-700/30 p-5 cursor-pointer transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:border-[var(--accent)] hover:shadow-[0_14px_28px_-8px_var(--accent)]`}
    >
      <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
        <img
          src={photo}
          alt={shortName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-800/60 backdrop-blur-sm text-green-300 text-[10px] font-mono uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Activo
        </div>
      </div>
      <p className="text-xs uppercase tracking-widest mb-1" style={{ color }}>
        {rol}
      </p>
      <h3 className="text-xl font-bold text-white mb-1">{shortName}</h3>
      <p className="text-sm text-slate-300 mb-2">
        {tecnologias.slice(0, 4).join(" · ")}
      </p>
      <p className="text-xs text-slate-400 font-mono mb-4">
        {experiencia.length}+ PROYECTOS
      </p>
      <span className="text-cyan-400 text-sm group-hover:underline transition-all">
        VER DOSSIER →
      </span>
    </div>
  );
}
