---
name: senior-3d-visuals
description: Use when adding 3D visual elements like globes, orbiting objects, maps, particle systems, or any WebGL/Canvas based graphics. Focuses on buttery-smooth 60fps performance, zero jank, and production-ready 3D that works on mobile. NOT for simple CSS animations or SVG — those belong in visual-scroll-design.
---

# Senior 3D Visuals — Performance-First 3D Design

## Filosofía
El 3D en web debe ser un acento, no la experiencia completa. Cada polígono, shader y draw call debe justificarse. Si no corre a 60fps en un dispositivo medio, no se incluye.

## Stack técnico recomendado
| Propósito | Librería | Por qué |
|-----------|----------|---------|
| 3D pesado (globo, mapa, modelos) | `@react-three/fiber` + `@react-three/drei` | React glue, gestión de ciclo de vida, Drei tiene helpers perf-zero |
| Canvas 2D para partículas | Canvas API nativo + `requestAnimationFrame` | Sin overhead de librerías, control total de draw calls |
| Animaciones 3D reactivas | `@react-spring/three` o `motion` con `useFrame` | Spring evita animaciones bloqueantes, `useFrame` corre en el loop de R3F |
| Carga de texturas | `@react-three/drei` `useTexture`, `useGLTF` | Maneja caching, mipmaps, compresión |

## Reglas de rendimiento (no negociables)

### 1. Frame budget
- **60fps = 16.6ms por frame**. 3D debe usar ≤10ms, dejando margen para React.
- Usar `useFrame` con delta clamping: `useFrame((_, delta) => { delta = Math.min(delta, 0.05); ... })`
- No actualizar estado React dentro de `useFrame`. Usar refs para mutaciones visuales.

### 2. Geometría y draw calls
- **Mantener draw calls < 50** en dispositivo medio (GPU integrada).
- **Usar `InstancedMesh`** para objetos repetidos (estrellas, partículas, edificios).
- **Combinar geometrías** estáticas con `mergeBufferGeometries` (three/examples).
- **Evitar `map` en JSX dentro de R3F**. Pre-renderizar con `useMemo`.

```tsx
// MAL — recrea geometría en cada render
<group> {items.map(i => <mesh><boxGeometry /><mesh/>)} </group>

// BIEN — instanciado
const mesh = useRef<InstancedMesh>(null!);
useEffect(() => {
  const dummy = new THREE.Object3D();
  items.forEach((item, i) => { dummy.position.set(...); dummy.updateMatrix(); mesh.current.setMatrixAt(i, dummy.matrix); });
  mesh.current.instanceMatrix.needsUpdate = true;
}, []);
```

### 3. Shaders y materiales
- **Preferir `MeshStandardMaterial`** sobre custom ShaderMaterial a menos que sea estrictamente necesario.
- Custom shaders solo cuando se necesita: glow, atmosphere, wireframe animado.
- Usar `onBeforeCompile` para modificar shaders nativos sin reescribirlos.

### 4. Cámara y frustum
- `frustumCulled={true}` (default en R3F) — Three.js no dibuja lo que no ve la cámara.
- Para muchos objetos, implementar `LOD` (Level of Detail) con `drei <LOD>`.
- En escenas estáticas, usar `OrbitControls` con `enableDamping={false}`.

### 5. Texturas
- **Formato**: WebP con fallback JPEG. Mínimo 512×512, máximo 2048×2048.
- **Compresión**: Usar `KTX2` con Basis Universal para texturas GPU-compressed.
- **Mipmaps**: Generar siempre. Tres.js los genera por defecto, pero verificar.
- **Evitar texturas repetidas** con patrones grandes; usar tile + offset si es necesario.

### 6. Memoria
- **`dispose()`** de geometrías, texturas y materiales al desmontar.
- R3F hace dispose automático al desmontar un mesh, pero verificar con `useEffect` cleanup.
- No almacenar referencias a objetos Three.js en estado React.

---

## Patrón: Globo terráqueo con órbita (producción)

### Estructura

```
components/visuals/
├── Globe.tsx              # Globo rotante con textura
├── Atmosphere.tsx         # Brillo atmosférico con custom shader
├── OrbitingPath.tsx       # Línea de órbita punteada animada
├── OrbitingObject.tsx     # Avión/marcador que orbita
├── GlobeScene.tsx         # Contenedor Canvas R3F + Suspense + controles
└── useGlobeAnimation.ts   # Hook para rotación y órbita en useFrame
```

### Implementación clave

```tsx
// Globe.tsx — Globo con textura de alta resolución
function Globe({ radius = 2, earthMap, bumpMap, specMap }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    meshRef.current.rotation.y += delta * 0.1; // rotación lenta constante
  });

  return (
    <mesh ref={meshRef} frustumCulled>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhongMaterial
        map={earthMap}
        bumpMap={bumpMap}
        bumpScale={0.02}
        specularMap={specMap}
        specular={new THREE.Color("#333")}
      />
    </mesh>
  );
}
```

```tsx
// Atmosphere.tsx — Custom shader para glow atmosférico
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }
`;

function Atmosphere({ radius = 2.15 }) {
  return (
    <mesh frustumCulled>
      <sphereGeometry args={[radius, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
      />
    </mesh>
  );
}
```

```tsx
// OrbitingPath.tsx — Línea de órbita animada con puntos
function OrbitingPath({ radius = 3.5, color = "#38bdf8", segments = 80 }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const tilt = 0.3; // inclinación de la órbita
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.cos(tilt);
      const y = radius * Math.sin(theta) * Math.sin(tilt);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, segments]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={Float32Array.from(points.flatMap(p => [p.x, p.y, p.z]))}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}
```

```tsx
// OrbitingObject.tsx — Avión/marcador que orbita con trail
function OrbitingObject({ pathRadius = 3.5, speed = 0.15, color = "#38bdf8" }) {
  const groupRef = useRef<THREE.Group>(null!);
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    delta = Math.min(delta, 0.05);
    angleRef.current += delta * speed;
    const tilt = 0.3;
    const a = angleRef.current;
    const x = pathRadius * Math.cos(a);
    const z = pathRadius * Math.sin(a) * Math.cos(tilt);
    const y = pathRadius * Math.sin(a) * Math.sin(tilt);
    groupRef.current.position.set(x, y, z);
    // mirar hacia la dirección del movimiento
    groupRef.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={2} distance={1} />
    </group>
  );
}
```

```tsx
// GlobeScene.tsx — Contenedor principal con Suspense y loading
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import { Suspense } from "react";

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="flex items-center justify-center h-full text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
      {progress < 100 ? `CARGANDO GLOBO ${Math.round(progress)}%` : "LISTO"}
    </div>
  );
}

export function GlobeScene({ className = "" }) {
  return (
    <div className={`relative ${className}`} style={{ minHeight: 400 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[0.5, 1]} // ← clave: baja resolución en móvil, máxima en desktop
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }} // baja calidad si fps caen
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 3, 5]} intensity={1.2} />
          {/* Scene components here */}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Optimizaciones clave del patrón globo

| Técnica | Impacto | Implementación |
|---------|---------|----------------|
| `dpr={[0.5, 1]}` | -50% píxeles en móvil | Canvas prop |
| `frustumCulled` en cada mesh | No dibuja fuera de cámara | Default, verificar |
| `useMemo` en geometrías | Sin recalculos | Envolver `Float32Array` |
| Delta clamping en `useFrame` | Sin spikes de frame | `Math.min(delta, 0.05)` |
| `powerPreference: "high-performance"` | Prioriza GPU dedicada | gl config |
| `performance={{ min: 0.5 }}` | Auto-downgrade si baja fps | R3F built-in |
| Textura 1024×1024 WebP | Balance calidad/performance | Compresión |
| Sin estado React en useFrame | Sin re-renders | refs en vez de state |

---

## Checklist de calidad 3D

- [ ] ¿Corre a 60fps en Chrome DevTools CPU throttling 4x?
- [ ] ¿DPR adaptativo (`[0.5, 1]`)?
- [ ] ¿Delta clamped en useFrame?
- [ ] ¿Sin setState dentro de useFrame?
- [ ] ¿Geometrías precomputadas con useMemo?
- [ ] ¿Texturas en WebP ≤ 2048×2048?
- [ ] ¿frustumCulled activo?
- [ ] ¿Dispose en cleanup?
- [ ] ¿Suspense boundary para loading?
- [ ] ¿Fallback UI mientras carga texturas?
- [ ] ¿En móvil no se traba el scroll?
- [ ] ¿Bundle de Three.js tree-shaked (solo lo que se usa)?
