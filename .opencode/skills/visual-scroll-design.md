<skill_content name="visual-scroll-design">
# Visual & Scroll Experience Design System

## Filosofía
El diseño visual debe sentirse cinematográfico, inmersivo y premium. Cada animación tiene un propósito: guiar la mirada, crear profundidad o reforzar la narrativa. Nada se mueve por moverse.

## Stack técnico
- **Framework**: React + TypeScript
- **Animaciones**: `motion/react` (Framer Motion)
- **Estilos**: Tailwind CSS + inline styles con variables CSS
- **Espacio de nombres**: `motion` importado como `{ motion, useScroll, useTransform, useInView, AnimatePresence }`

---

## 1. Background System (`Backgrounds.tsx`)

### Gradientes por sección
Cada sección tiene un tema con gradiente `linear-gradient(180deg, ...)` y orbes ambientales flotantes:

| Tema | Uso | Colores clave |
|------|-----|---------------|
| `deep` | Hero, capacidades | `#030014 → #050510` |
| `navy` | Métricas | `#050510 → #04041c` |
| `dark` | Secciones generales | `#050510 → #030014` |
| `purple` | Secciones destacadas | `#030014 → #0a041c` |

### Patrón de sección
Siempre usar `SectionBackground` que envuelve en `<section>` con:
- Tema de gradiente
- `StarField` opcional (cantidad de estrellas)
- Orbes ambientales animados con `radial-gradient`, `filter: blur()`, movimiento lento flotante
- `position: relative; overflow: hidden`
- Contenido dentro de `max-w-7xl mx-auto`

### Grain Overlay (`GrainOverlay`)
Capa fija sobre toda la página (`z-index: 50`, `pointer-events: none`). Usa SVG inline con `feTurbulence` (fractalNoise) como `background-image` con opacidad 0.025. Da textura analógica sutil al espacio digital.

### Shooting Stars
Array de 3 estrellas fugaces con posición aleatoria en X/Y (top 0-40%). Usar `motion.div` con `animate: { x: [null, 600], opacity: [0, 1, 0] }`, rotación de -30°, delay escalonado (cada 5 + random 10s). Fondo con `linear-gradient(90deg, transparent, rgba(148,215,255,0.6), transparent)`.

### SectionDivider
Línea horizontal decorativa en `top: 0`, centrada, `width: 600px`, ocupa todo el ancho real, `linear-gradient(90deg, transparent, #38bdf8, transparent)`, opacidad 0.3.

### BottomFade
`linear-gradient(to bottom, transparent, #050510)` de 32px al final de cada sección para transición suave entre secciones.

---

## 2. Parallax & Scroll (`HeroSection.tsx`)

### Scroll-driven animations
Importar `useScroll` y `useTransform` de `motion/react`:
```tsx
const { scrollY } = useScroll();
const planetY = useTransform(scrollY, [0, 600], [0, 120]);
```
El planeta se mueve 120px más lento que el scroll (entre 0 y 600px de scroll), creando profundidad.

### Elementos del Hero (orden de capas):
1. `NebulaLayer` — manchas de color difuminadas
2. `StarField count={240}` — fondo estelar
3. `SpaceGrid` — grid de líneas sutiles con `mask-image` radial
4. `ShootingStars` — estrellas fugaces
5. Planeta — `position: absolute`, `right: -4%`, `bottom: -8%`, parallax con `planetY`
6. Contenido — `relative z-10`, `max-w-7xl`, grid 2-columnas

### CTA Button
- `rounded-full`, `px-8 py-3`
- `font-family: 'Orbitron'`, `tracking-[0.15em]`, `uppercase`
- Gradiente `linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.15))`
- Borde `1px solid rgba(56,189,248,0.4)`
- Box-shadow con glow azul + inset glow
- Hover: `scale(1.05)`, shadow aumenta
- Icono `ArrowRight` con `group-hover:translate-x-1`
- Animación inicial: el arrow aparece con slide desde la izquierda (`x: -4, opacity: 0 → x: 0, opacity: 1`)

### Scroll Indicator
`absolute bottom-8`, centrado horizontalmente. Un rectángulo pequeño (`w-4 h-7`) con border sutil y un dot animado que sube y baja (`y: [0, 10, 0]`).

---

## 3. Glassmorphism (`App.tsx`, `TeamSection.tsx`)

### Fórmula glass:
```css
background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))";
backdropFilter: "blur(12px) saturate(1.1)";
border: "1px solid rgba(255,255,255,0.06)";
boxShadow: "0 4px 30px rgba(0,0,0,0.5)";
```

### Cards de capacidades:
- Grid 2/4 columnas responsive
- Gradiente con el color de la card (`${color}06` a `transparent`)
- Hover: `scale(1.04)`, `y: -6`, borde se ilumina con el color
- Glow radial interno que aparece en hover
- Icono en caja con borde sutil, hover se agranda y se vuelve blanco

### Card de tripulación (`CrewCard`):
- Foto con overlay gradient (`to top, rgba(0,0,0,0.85), transparent 40%`)
- Hover en imagen: `brightness(1.05)`, `scale(1.05)`
- Badge "ACTIVO" con dot verde pulsante
- Contenido con rol (color del miembro), nombre, especialidades separadas por "•"
- "VER DOSSIER →" aparece solo en hover (`opacity-0 → opacity-100`)
- Card glow seleccionada: `radial-gradient` pulsante detrás de la card
- Borde se ilumina al seleccionar, box-shadow con el color del miembro

### Dossier expandido (`ExpandedProfile`):
- Glass más intenso: `backdropFilter: blur(24px) saturate(1.2)`
- `AnimatePresence mode="wait"` para transición suave entre miembros
- Loading state: spinner rotatorio y barra de progreso animada
- Scan line: línea horizontal que recorre de arriba abajo (`3s, repeat: Infinity`)
- Cabecera con foto grande, corner decorations (L-Shapes del color del miembro)
- Grid 2-columnas para skills + stats + logros
- Estadísticas con hover glow
- Tech badges: tags que aparecen con stagger, hover se iluminan
- "Declaración de Impacto": card con glassmorphism, blur, glow animado, texto en cursiva con comillas

---

## 4. Animaciones Principales

### Scroll Reveal (patrón estándar)
```tsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: "-60px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
/>
```

### Stagger children
Usar `delay: baseDelay + index * 0.08` en `transition` de cada hijo.

### Hover effects estándar
- `whileHover={{ scale: 1.03, y: -4 }}` en cards
- `whileHover={{ scale: 1.05, y: -6 }}` en cards principales
- Transición `{ duration: 0.25, ease: "easeOut" }`
- Acompañar con cambio de borde y box-shadow

### Pulsing glow
```tsx
animate={isSelected ? { opacity: [0.3, 0.9, 0.3], scale: [1, 1.05, 1] } : {}}
transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
```

---

## 5. Tipografía

| Uso | Font | Weight | Tracking |
|-----|------|--------|----------|
| Títulos | `'Space Grotesk', sans-serif` | 700 | `-0.02em` |
| Subtítulos | `'Orbitron', monospace` | 400 | `0.15-0.25em` uppercase |
| Body | `'Space Grotesk', sans-serif` | 400 | normal |
| Badges | `'Orbitron', monospace` | 600 | `0.2em` uppercase |
| Stats | `'Orbitron', monospace` | 700 | normal |
| Labels sección | `'Orbitron', monospace` | 400 | `0.25em` uppercase |

### Tamaños responsive
- Hero title: `clamp(1.6rem, 4vw, 3.2rem)`
- Section titles: `clamp(1.6rem, 3.5vw, 2.6rem)`
- Body: `text-base` (1rem) a `text-xl` (1.25rem)

---

## 6. Paleta de Colores

### Backgrounds
- `#030014` — deep space base
- `#050510` — dark navy
- `#04041c` — medium navy

### Brand
- `#38bdf8` (cyan-400) — primario, acentos
- `#818cf8` (indigo-400) — secundario
- `#a78bfa` (violet-400) — terciario
- `#7c3aed` (violet-600) — purple deep

### Colores de miembro (crew)
Cada miembro tiene un color único que tiñe su card, dossier y badges.

### Texto
- `rgba(255,255,255,0.85)` — títulos
- `rgba(255,255,255,0.5-0.7)` — body
- `rgba(255,255,255,0.25-0.35)` — metadata, labels
- `#e0f2fe` — texto sobre brand

---

## 7. Reglas de Estilo

1. **Siempre** usar `pointer-events: none` en capas decorativas (orbes, grids, grains, stars)
2. **Siempre** envolver secciones en `<section>` con `overflow-hidden` y `relative`
3. **Nunca** animar sin propósito — cada animación guía o informa
4. **Nunca** usar emojis en la UI
5. **Preferir** gradientes sutiles sobre colores sólidos
6. **Transiciones** estándar: `duration: 0.3` para hover, `0.4-0.6` para entrada, `0.7-0.9` para hero
7. **Easing**: `easeOut` para entradas, `easeInOut` para loops, `[0.25, 0.1, 0.25, 1]` para acordeones
8. **Stagger** máximo 0.08s entre hijos para que se sienta natural
9. **Glassmorphism**: siempre con border visible (1px) y box-shadow que separe del fondo

---

## 8. Estructura de Archivos

```
src/app/components/
├── Backgrounds.tsx          # GrainOverlay, ShootingStars, SectionBackground, etc.
├── HeroSection.tsx          # Hero con parallax, CTA, scroll indicator
├── SpaceElements.tsx        # StarField, Nebula, Planet, Grid, OrbitalRing, GlowDot
├── TeamSection.tsx          # CrewCard, ExpandedProfile, Dossier
src/app/
├── App.tsx                  # Layout principal, capabilities, metrics
├── data/landing.ts          # Datos de crew, stats, capacidades
```

---

## 9. Checklist de calidad visual

- [ ] ¿El grain overlay está presente y apenas perceptible?
- [ ] ¿Las estrellas titilan suavemente (no parpadean)?
- [ ] ¿Los orbes flotan muy lentamente (12-26s)?
- [ ] ¿El scroll reveal usa `once: true`?
- [ ] ¿Las transiciones de hover son suaves (0.2-0.3s)?
- [ ] ¿El glassmorphism tiene borde visible?
- [ ] ¿El hero tiene parallax sutil?
- [ ] ¿Las cards tienen stagger en su animación?
- [ ] ¿La tipografía usa tracking adecuado para mayúsculas?
- [ ] ¿Los colores de miembro se heredan consistentemente en card y dossier?
</skill_content>
