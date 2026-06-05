---
name: senior-performance
description: Use when optimizing bundle size, runtime performance, animation smoothness, loading speed, or memory usage. Covers code splitting, GPU compositing, React re-render prevention, image optimization, Framer Motion perf, and Core Web Vitals. Trigger on any performance audit, lighthouse run, or "this feels slow" feedback.
---

# Senior Performance — Production React Optimization

## Filosofía
El rendimiento no es una capa final. Es una restricción de diseño desde el primer componente. Toda abstracción tiene costo. Toda animación tiene frame budget. Toda librería tiene peso.

## Principios cardinales

1. **Medir antes de optimizar**: Sin perfilamiento no hay optimización. Usar React DevTools Profiler, Chrome Performance tab, Lighthouse.
2. **El bundle es el enemigo #1**: Cada KB adicional es tiempo de carga. Cada librería es un compromiso.
3. **60fps no es negociable**: Si una animación no llega a 60fps, no se incluye. 16.6ms por frame.
4. **Mobile-first performance**: Si no corre en un Moto G (o equivalente), no corre en producción.
5. **Tree-shaking es responsabilidad tuya**: No todas las librerías tree-shakean bien. Verificar bundle con `vite build --analyze` o `source-map-explorer`.

---

## 1. Bundle Optimization

### Análisis
```bash
npm install -D vite-bundle-analyzer
# o
npx source-map-explorer dist/assets/*.js
```

### Code Splitting táctico

```tsx
// PESADO — importa todo al inicio
import { GlobeScene } from "./visuals/GlobeScene";

// LIVIANO — lazy load con preload en hover
const GlobeScene = lazy(() => import("./visuals/GlobeScene"));

// Preload en hover (cuando el usuario va a hacer clic)
onMouseEnter={() => import("./visuals/GlobeScene")}
```

```tsx
// Estrategia de thresholds para lazy loading
const GlobeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "200px" }); // carga 200px antes de entrar

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<Skeleton />}>
          <GlobeScene />
        </Suspense>
      )}
    </div>
  );
};
```

### Reglas de importación
- **Librerías grandes** (`three`, `framer-motion`, `lodash`): siempre lazy load si no están en la vista principal.
- **Iconos**: importar solo los que se usan, nunca la librería completa (`import { ArrowRight } from "lucide-react"` está bien si el bundler tree-shakea).
- **Moment/date-fns**: preferir `date-fns` (tree-shakeable) sobre `moment`.
- **Bundle de estilos**: Tailwind purga CSS no usado en producción por defecto. Verificar que `content` paths en `tailwind.config` cubran todos los archivos.

---

## 2. React Render Optimization

### Reglas de re-render

```
❌ setState en el padre → todos los hijos renderizan
✅ Hijos memoizados con React.memo
✅ Estado movido hacia abajo (colocation)
✅ useMemo para computaciones caras
✅ useCallback para props-función
```

```tsx
// MAL — cada scroll/frame renderiza todo el árbol
const { scrollY } = useScroll();
return <ExpensiveComponent style={{ y: scrollY }} />;

// BIEN — solo el elemento animado se actualiza (Framer Motion lo maneja)
function ExpensiveComponent() {
  return <motion.div style={{ y: scrollY }}>...</motion.div>;
}
```

### useMemo / useCallback con propósito

```tsx
// SOLO cuando la computación es cara (>1ms) o el hijo usa React.memo
const sorted = useMemo(() => {
  return items.sort((a, b) => expensiveCompare(a, b));
}, [items]);

// useCallback es para mantener referencia estable
const handleClick = useCallback(() => {
  doStuff(id);
}, [id]);
```

### Virtual list para listas largas
Cuando hay >50 elementos visibles similares, usar `react-window` o `@tanstack/virtual`:

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualCrewList({ members }: { members: CrewMember[] }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: members.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((item) => (
          <CrewCard key={item.key} member={members[item.index]} />
        ))}
      </div>
    </div>
  );
}
```

---

## 3. Animation Performance (Framer Motion)

### GPU compositing
```tsx
// MAL — anima propiedades que causan layout (caro)
<motion.div animate={{ width: 200, height: 200 }} />

// BIEN — anima solo transform y opacity (GPU)
<motion.div animate={{ scale: 1.2, opacity: 0.8 }} />

// FORZAR GPU — para elementos que se mueven constantemente
<motion.div style={{ willChange: "transform" }} />
```

### Reglas de Framer Motion
- **Preferir `layoutId`** sobre animaciones manuales de height/position para shared layout animations.
- **`AnimatePresence`** solo cuando es necesario (cuesta setup de enter/exit).
- **Evitar animar `height: "auto"`** — usar `grid-template-rows` o CSS `grid` con Framer.
- **`whileHover` / `whileTap`** son gratis (no causan re-render del árbol React).
- **`motion.div` con `style={{ ... }}`** que cambia por scroll: Framer lo maneja con `useTransform` sin re-renders.

### Alternativa ligera
Para animaciones simples sin Framer Motion:
```css
.card { transition: transform 0.2s ease-out, opacity 0.2s ease-out; }
.card:hover { transform: scale(1.03) translateY(-4px); }
```

---

## 4. Image Optimization

### Formato
| Formato | Cuándo | Calidad |
|---------|--------|---------|
| WebP | Siempre (conversión automática) | 80% |
| AVIF | Cuando el soporte del navegador lo permita | 70% |
| JPEG | Fallback para WebP | 80% |
| PNG | Solo si necesita transparencia absoluta | - |

### Técnicas
```tsx
// Lazy loading nativo (gratis, sin librería)
<img src={photo} alt={name} loading="lazy" />

// Responsive images con srcSet (evita descargar 2000px en móvil)
<img
  srcSet={`
    ${photo}?w=400 400w,
    ${photo}?w=800 800w,
    ${photo}?w=1200 1200w
  `}
  sizes="(max-width: 640px) 400px, 800px"
  src={photo}
/>

// Preload hero image (crítica para LCP)
{/* en index.html */}
<link rel="preload" as="image" href={heroPhoto} />
```

---

## 5. CSS Performance

### Layout Thrashing
```tsx
// MAL — lectura/escritura alternada (reflow en cada iteración)
items.forEach(el => {
  const h = el.offsetHeight; // lectura (fuerza reflow)
  el.style.height = h * 2 + "px"; // escritura
});

// BIEN — batch lecturas, luego batch escrituras
const heights = items.map(el => el.offsetHeight);
items.forEach((el, i) => { el.style.height = heights[i] * 2 + "px"; });
```

### CSS Containment
```css
/* Aísla el componente del layout del resto de la página */
.card-list {
  contain: layout style paint;
}

/* Para elementos que se mueven con transform */
.globe-wrapper {
  contain: layout paint;
}
```

### Will-change (usar con moderación)
```css
/* Solo en elementos que se animan CONSTANTEMENTE */
.orbiting-plane {
  will-change: transform;
}
/* NUNCA en :hover o elementos estáticos — consume GPU memory */
```

---

## 6. Memory Management

### Event listeners
```tsx
useEffect(() => {
  const handler = () => { ... };
  window.addEventListener("scroll", handler, { passive: true }); // passive: true para scroll
  return () => window.removeEventListener("scroll", handler);
}, []);
```

### Timers e intervalos
```tsx
useEffect(() => {
  const t = setTimeout(() => ..., 300);
  return () => clearTimeout(t); // ← SIEMPRE limpiar
}, [dep]);
```

### Three.js memory
```tsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}, []);
```

---

## 7. Core Web Vitals

| Métrica | Objetivo | Técnica principal |
|---------|----------|-------------------|
| LCP (Largest Contentful Paint) | ≤2.5s | Preload hero image, optimizar fuente, lazy load below-fold |
| FID (First Input Delay) | ≤100ms | Code splitting, reducir JS bloqueante, idle callbacks |
| CLS (Cumulative Layout Shift) | ≤0.1 | Dimensiones fijas en imágenes, reservar espacio para lazy load |
| TBT (Total Blocking Time) | ≤200ms | Dividir tareas largas, `requestIdleCallback`, web workers |

### Font loading
```html
<!-- Cargar fuentes críticas con swap para evitar FOIT -->
<link rel="preload" as="font" href="/fonts/orbitron.woff2" crossorigin />
```
```css
/* En CSS */
@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/orbitron.woff2') format('woff2');
  font-display: swap; /* ← muestra texto con fallback mientras carga */
}
```

---

## 8. Monitoreo y herramientas

```bash
# Análisis de bundle
npm run build && npx vite-bundle-analyzer

# Auditoría de performance en CI
npx lighthouse https://example.com --view

# Perfilamiento de React
# React DevTools > Profiler > grabar interacción > leer flamegraph
```

### Benchmark en código
```tsx
const start = performance.now();
// ... operación a medir ...
const duration = performance.now() - start;
if (duration > 1) console.warn(`Operación lenta: ${duration.toFixed(2)}ms`);
```

---

## Checklist de performance

### Bundle
- [ ] ¿Librerías grandes lazy-loadeadas?
- [ ] ¿Analizado con `vite-bundle-analyzer`?
- [ ] ¿Sin imports de barrel (index.js) que arrastran todo?
- [ ] ¿Tree-shaking verificado?

### Render
- [ ] ¿Sin re-renders innecesarios en árbol crítico?
- [ ] ¿Componentes pesados memoizados?
- [ ] ¿Estado tan cerca del consumidor como sea posible?
- [ ] ¿Listas >50 items virtualizadas?

### Animaciones
- [ ] ¿Solo transform y opacity?
- [ ] ¿Sin animaciones en hover que causan layout?
- [ ] ¿Framer Motion sin re-renders por `style` dinámico no-motion?
- [ ] ¿Scroll listeners con `passive: true`?

### Assets
- [ ] ¿Imágenes en WebP?
- [ ] ¿Lazy loading (`loading="lazy"`)?
- [ ] ¿Hero image preload?
- [ ] ¿Fuentes con `font-display: swap`?

### CWV
- [ ] LCP ≤2.5s
- [ ] FID ≤100ms
- [ ] CLS ≤0.1
- [ ] TBT ≤200ms

### Mobile
- [ ] ¿Throttle CPU 4x en DevTools sin caída de fps?
- [ ] ¿Touch events responsivos?
- [ ] ¿Scroll suave en Android Chrome?
