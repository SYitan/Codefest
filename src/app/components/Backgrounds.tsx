import { StarField, NebulaLayer, SpaceGrid } from "./SpaceElements";

type SectionTheme = "deep" | "navy" | "dark" | "purple";

const gradients: Record<SectionTheme, string> = {
  deep: "linear-gradient(180deg, #030014 0%, #050510 50%, #030014 100%)",
  navy: "linear-gradient(180deg, #050510 0%, #04041c 50%, #050510 100%)",
  dark: "linear-gradient(180deg, #050510 0%, #030014 50%, #050510 100%)",
  purple: "linear-gradient(180deg, #030014 0%, #0a041c 50%, #030014 100%)",
};

export function SectionBackground({ children, theme = "deep", stars = 0, className = "" }: {
  children: React.ReactNode;
  theme?: SectionTheme;
  stars?: number;
  className?: string;
}) {
  return (
    <section className={`relative py-20 px-6 overflow-hidden ${className}`} style={{ background: gradients[theme] }}>
      {stars > 0 && <StarField count={stars} />}
      {stars > 0 && <NebulaLayer />}
      <div className="relative z-10 max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function SectionDivider() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
  );
}

export function BottomFade() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #050510)" }} />
  );
}
