# SKILL: Premium AI Landing Page

## Trigger
Use when user asks for a "premium landing page", "hackathon landing", "team landing", "AI-themed landing",
or any single-file HTML page with immersive dark visuals, glassmorphism, and Three.js background.

---

## Architecture Pattern

### File structure (single HTML)
```
<canvas id="galaxy-canvas">   z-index: 1  — Three.js galaxy (fixed)
<canvas id="neural-canvas">   z-index: 2  — 2D neural network overlay (fixed)
<canvas id="particle-canvas"> z-index: 3  — 30 foreground drift particles (fixed)
<nav>                         z-index: 100 — glassmorphism on scroll
<main>                        z-index: 10  — all content sections
<div id="dossier-overlay">    z-index: 200 — slide-in panel
```

### Script order
1. Three.js galaxy IIFE — runs immediately after `<script src="three.js">`
2. Neural network IIFE — Canvas 2D, scroll-reactive
3. Foreground particles IIFE — Canvas 2D, drift only
4. Data object (CREW / content)
5. Render functions (cards, modals)
6. Scroll handlers
7. Reveal observer
8. DOMContentLoaded init

---

## Color System

```css
--bg-deep:       #030014;   /* main background */
--bg-dark:       #050510;   /* card backgrounds */
--purple:        #7c3aed;   /* primary accent */
--purple-mid:    #9333ea;
--purple-light:  #a855f7;   /* labels, badges */
--magenta:       #c026d3;
--cyan:          #06b6d4;   /* secondary accent */
--cyan-light:    #67e8f9;
--glass-bg:      rgba(255,255,255,0.032);
--glass-border:  rgba(255,255,255,0.072);
--glass-hover:   rgba(255,255,255,0.058);
--text-primary:  rgba(255,255,255,0.92);
--text-secondary:rgba(255,255,255,0.52);
--text-muted:    rgba(255,255,255,0.28);
```

Per-element color overrides via CSS custom properties on the element:
```css
style="--member-color: ...; --member-border: ...; --member-shadow: ...; --member-accent: ...;"
```

---

## Three.js Galaxy (r128)

### Key parameters
- `armCount = 4` spiral arms, `armStars = 550` per arm
- `twist = 7.0` — controls how tightly arms wind
- Adaptive DPR: `Math.min(devicePixelRatio, 1.2)`
- `antialias: false` for performance
- Fog: `near 1.5, far 16`
- Camera: `position(0, 3.5, 5.5)`, `lookAt(0,0,0)`

### Particle systems (in order)
1. Spiral arms — `PointsMaterial` with `vertexColors`, warm→purple gradient
2. Accretion disk — 800 pts, warm yellow-white, thin disk (spreadY 0.018)
3. Cyan jets — 200 pts perpendicular, `color: 0x00ddff`
4. Dust haze — 400 pts purple, large size (0.14), low opacity (0.22)
5. Core sprite — `THREE.Sprite` with canvas-generated radial glow
6. Field stars — 1200 pts, large volume (18×12×18), very low opacity

### Canvas glow texture factory
```js
function makeGlowTex(innerColor, outerColor) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32,32,0, 32,32,32);
  g.addColorStop(0, innerColor);
  g.addColorStop(0.35, outerColor);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(c);
}
```
Always use `THREE.AdditiveBlending` + `depthWrite: false` on all particle materials.

### Scroll-driven animation
```js
// Galaxy rotation tied to scroll
scene.rotation.y = time * 0.12 + scrollProgress * 1.2;
scene.rotation.x = -0.28 + scrollProgress * 0.15;
camera.position.y = 3.5 - scrollProgress * 1.2;
```

---

## Neural Network (Canvas 2D)

### Node layout: asymmetric, right-weighted
Place nodes at `rx: 0.58–0.90, ry: 0.22–0.78` (normalized coords).
12 nodes, 17 connections.

### Scroll-reactive activation
```js
const activation = Math.min(1, Math.max(0, (scrollProgress - 0.1) / 0.5));
// Fade in between 10%–60% scroll progress
```

### Pulse animation
- Spawn interval: 800ms
- Speed: 0.004–0.007 per frame
- Lerp along quadratic bezier using `bezierPt(t, x1,y1, cx,cy, x2,y2)`
- Render as radial gradient circle (r=6), alpha = `sin(t*π) * 0.7 * activation`

---

## Glassmorphism Card Pattern

```css
.glass-card {
  background: rgba(255,255,255,0.032);
  border: 1px solid rgba(255,255,255,0.072);
  backdrop-filter: blur(12px) saturate(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.1);
  border-radius: 16px;
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-card:hover {
  background: rgba(255,255,255,0.058);
  transform: translateY(-4px) scale(1.005);
  box-shadow: 0 16px 48px rgba(var-shadow-rgb, 0.18);
}
```

---

## Slide-in Dossier Panel

### Structure
```
.dossier-overlay (position:fixed, z:200)
  .dossier-backdrop (blur backdrop, closes on click)
  .dossier-panel (420px, translateX 100%→0)
    corner brackets (.tl .tr .bl .br)
    scan-line (::before pseudo, top→bottom animation 3s)
    header (avatar, name, role, level badge)
    body (capabilities, tech groups, experience, impact)
```

### Scan line animation
```css
@keyframes scan-line {
  0%,100% { opacity:0; transform:translateY(0); }
  10%     { opacity:1; }
  90%     { opacity:0.3; }
  50%     { transform:translateY(100vh); }
}
```

### Open/close
```js
function openDossier(i) {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDossier() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
// Also close on Escape key + backdrop click
```

---

## Reveal Animation

```js
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
```
```css
.reveal { opacity:0; transform:translateY(24px); transition: opacity 0.6s, transform 0.6s; }
.reveal.visible { opacity:1; transform:translateY(0); }
.reveal-delay-N { transition-delay: N*0.08s; }
```

---

## Typography Scale

```css
Hero title:       clamp(42px, 6vw, 80px)  weight 700  tracking -0.03em
Section title:    clamp(28px, 4vw, 44px)  weight 700  tracking -0.025em
Card name:        16px  weight 600  tracking -0.02em
Body:             15px  weight 300  line-height 1.65
Label/tag:        11–12px  weight 600  letter-spacing 0.12em  uppercase
```

Gradient text:
```css
background: linear-gradient(135deg, #a855f7 0%, #06b6d4 60%, #67e8f9 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## Section Structure (hackathon judge flow)

```
1. HERO        — Who + value prop in 5 seconds
2. CAPABILITIES — Collective skills (before individuals)
3. METRICS     — 4 credibility numbers (inline flex row)
4. CREW        — Individual cards (4-col grid → 2-col → 1-col)
5. FOOTER      — Minimal, logo + tagline
```

---

## Responsive Breakpoints

```
1440px — 4-col crew grid, full nav
1024px — 2-col crew grid, 2-col capabilities
768px  — hide nav links, mobile padding (24px)
640px  — 1-col crew grid, metrics vertical stack
```

---

## Critical DON'Ts

- Never use `THREE.CapsuleGeometry` (r128 doesn't have it — use Cylinder+Sphere)
- Never use `localStorage` in artifacts
- Never use `blur()` CSS filter on canvas-per-frame (kills performance) — use it only on static elements
- Never autoplay video/audio
- Keep particle count ≤ 3000 total across all systems
- Keep max animation duration ≤ 400ms for interactions (scan-line loop is exempt)
- Never add animated elements that distract from text legibility

---

## CDN Scripts

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap" rel="stylesheet">
```

---

## Customization Checklist

When reusing this pattern for a new team/project:

1. Update `CREW` array (name, initials, role, tags, projects, dossier data)
2. Change `--purple` accent if brand color differs
3. Update nav logo mark initials + text
4. Update hero title + subtitle
5. Update metrics values (always real, never invented)
6. Update capabilities grid (icons, names, descriptions)
7. Update `<title>` tag

The galaxy, neural net, particles, card system, dossier panel, nav, and reveal animations
are fully reusable without modification.
