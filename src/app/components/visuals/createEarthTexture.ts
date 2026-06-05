// 2D Perlin-inspired noise for terrain generation
class Noise {
  private perm: number[];

  constructor(seed = 42) {
    this.perm = [];
    const p = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor((seed + i * 31) % (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = [...p, ...p];
  }

  private fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  private lerp(a: number, b: number, t: number) { return a + t * (b - a); }
  private grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise2D(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);
    const aa = this.perm[this.perm[X] + Y];
    const ab = this.perm[this.perm[X] + Y + 1];
    const ba = this.perm[this.perm[X + 1] + Y];
    const bb = this.perm[this.perm[X + 1] + Y + 1];
    return this.lerp(
      this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
      this.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
      v
    );
  }

  fbm(x: number, y: number, octaves = 6) {
    let value = 0, amplitude = 1, frequency = 1, maxVal = 0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, y * frequency);
      maxVal += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / maxVal;
  }
}

function latLonToUV(lat: number, lon: number) {
  return { u: (lon + 180) / 360, v: (90 - lat) / 180 };
}

export function createEarthTexture(width = 2048, height = 1024): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const noise = new Noise(137);
  const noise2 = new Noise(42);

  const oceanPalette = [
    [0.04, 0.12, 0.28],  // deep ocean
    [0.06, 0.18, 0.35],
    [0.08, 0.22, 0.42],
    [0.10, 0.28, 0.48],
    [0.12, 0.32, 0.50],  // shallow
  ];

  const landPalette = [
    [0.15, 0.35, 0.10],  // dark green
    [0.20, 0.42, 0.12],
    [0.30, 0.50, 0.15],
    [0.40, 0.55, 0.18],  // mid green
    [0.50, 0.60, 0.20],
    [0.60, 0.65, 0.25],  // light green
    [0.55, 0.50, 0.20],  // brown
    [0.60, 0.55, 0.25],
    [0.65, 0.55, 0.30],
    [0.70, 0.60, 0.35],  // desert
    [0.75, 0.70, 0.55],
    [0.85, 0.80, 0.70],  // sand
    [0.90, 0.88, 0.85],  // ice
    [0.95, 0.93, 0.90],
  ];

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const u = px / width;
      const v = py / height;
      // Equirectangular to spherical coords
      const lon = u * 360 - 180;
      const lat = 90 - v * 180;
      const theta = lon * Math.PI / 180;
      const phi = lat * Math.PI / 180;

      // 3D position on sphere for better noise
      const nx = Math.cos(phi) * Math.cos(theta);
      const ny = Math.sin(phi);
      const nz = Math.cos(phi) * Math.sin(theta);

      // Multi-octave noise for land
      const n1 = noise.fbm(nx * 1.5 + 0.5, ny * 1.5 + nz * 1.5 + 0.5, 6);
      const n2 = noise2.fbm(nx * 3 + 2, ny * 3 + nz * 3 + 1, 4);
      const elevation = n1 * 0.7 + n2 * 0.3;

      // Bias toward ocean (more realistic distribution)
      const landThreshold = 0.42;
      const isLand = elevation > landThreshold;
      const elevNorm = (elevation - landThreshold) / (1 - landThreshold);

      let r: number, g: number, b: number;

      if (isLand) {
        // Land
        const idx = Math.min(Math.floor(elevNorm * landPalette.length), landPalette.length - 1);
        const next = Math.min(idx + 1, landPalette.length - 1);
        const t = (elevNorm * landPalette.length) % 1;
        const c1 = landPalette[idx];
        const c2 = landPalette[next];
        r = c1[0] + (c2[0] - c1[0]) * t;
        g = c1[1] + (c2[1] - c1[1]) * t;
        b = c1[2] + (c2[2] - c1[2]) * t;

        // Latitude-based desert band
        const latFactor = Math.abs(lat) / 90;
        if (latFactor > 0.2 && latFactor < 0.45 && elevNorm < 0.4) {
          const desertMix = (0.45 - Math.abs(latFactor - 0.325)) / 0.25;
          r = r * (1 - desertMix * 0.5) + 0.65 * desertMix * 0.5;
          g = g * (1 - desertMix * 0.5) + 0.55 * desertMix * 0.5;
          b = b * (1 - desertMix * 0.5) + 0.30 * desertMix * 0.5;
        }

        // Snow at poles and high elevation
        const snowLine = 0.55 + (1 - Math.abs(lat) / 90) * 0.3;
        if (elevNorm > snowLine || Math.abs(lat) > 75) {
          const snow = Math.min(1, (elevNorm - snowLine) / 0.2 + (Math.abs(lat) > 78 ? 0.5 : 0));
          r = r * (1 - snow) + 0.95 * snow;
          g = g * (1 - snow) + 0.93 * snow;
          b = b * (1 - snow) + 0.90 * snow;
        }
      } else {
        // Ocean
        const depth = (landThreshold - elevation) / landThreshold;
        const idx = Math.min(Math.floor(depth * oceanPalette.length), oceanPalette.length - 1);
        const next = Math.min(idx + 1, oceanPalette.length - 1);
        const t = (depth * oceanPalette.length) % 1;
        const c1 = oceanPalette[idx];
        const c2 = oceanPalette[next];
        r = c1[0] + (c2[0] - c1[0]) * t;
        g = c1[1] + (c2[1] - c1[1]) * t;
        b = c1[2] + (c2[2] - c1[2]) * t;

        // Shallow water near coasts
        if (elevation > landThreshold - 0.08) {
          const shallow = (elevation - (landThreshold - 0.08)) / 0.08;
          r = r * (1 - shallow * 0.3) + 0.15 * shallow * 0.3;
          g = g * (1 - shallow * 0.3) + 0.40 * shallow * 0.3;
          b = b * (1 - shallow * 0.3) + 0.55 * shallow * 0.3;
        }
      }

      const idx = (py * width + px) * 4;
      data[idx] = Math.min(255, Math.max(0, Math.round(r * 255)));
      data[idx + 1] = Math.min(255, Math.max(0, Math.round(g * 255)));
      data[idx + 2] = Math.min(255, Math.max(0, Math.round(b * 255)));
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Add subtle cloud layer
  const cloudCanvas = document.createElement("canvas");
  cloudCanvas.width = width;
  cloudCanvas.height = height;
  const cloudCtx = cloudCanvas.getContext("2d")!;
  const cloudData = cloudCtx.createImageData(width, height);
  const cData = cloudData.data;
  const cloudNoise = new Noise(99);

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const u = px / width;
      const v = py / height;
      const lon = u * 360 - 180;
      const lat = 90 - v * 180;
      const theta = lon * Math.PI / 180;
      const phi = lat * Math.PI / 180;
      const nx = Math.cos(phi) * Math.cos(theta);
      const ny = Math.sin(phi);
      const nz = Math.cos(phi) * Math.sin(theta);

      const cloud = cloudNoise.fbm(nx * 2 + 10, ny * 2 + nz * 2 + 10, 5);
      const cloudVal = Math.max(0, (cloud - 0.45) * 3);
      const alpha = cloudVal * 0.35;

      const idx2 = (py * width + px) * 4;
      cData[idx2] = 255;
      cData[idx2 + 1] = 255;
      cData[idx2 + 2] = 255;
      cData[idx2 + 3] = Math.min(255, Math.round(alpha * 255));
    }
  }
  cloudCtx.putImageData(cloudData, 0, 0);

  // Composite clouds onto main texture
  ctx.drawImage(cloudCanvas, 0, 0);

  return canvas;
}

export function createBumpMap(width = 1024, height = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const noise = new Noise(137);

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const u = px / width;
      const v = py / height;
      const lon = u * 360 - 180;
      const lat = 90 - v * 180;
      const theta = lon * Math.PI / 180;
      const phi = lat * Math.PI / 180;
      const nx = Math.cos(phi) * Math.cos(theta);
      const ny = Math.sin(phi);
      const nz = Math.cos(phi) * Math.sin(theta);

      const elev = noise.fbm(nx * 1.5 + 0.5, ny * 1.5 + nz * 1.5 + 0.5, 6);
      const val = Math.min(1, Math.max(0, (elev - 0.35) * 2)) * 255;

      const idx = (py * width + px) * 4;
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function createSpecularMap(width = 1024, height = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const noise = new Noise(137);

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const u = px / width;
      const v = py / height;
      const lon = u * 360 - 180;
      const lat = 90 - v * 180;
      const theta = lon * Math.PI / 180;
      const phi = lat * Math.PI / 180;
      const nx = Math.cos(phi) * Math.cos(theta);
      const ny = Math.sin(phi);
      const nz = Math.cos(phi) * Math.sin(theta);

      const elev = noise.fbm(nx * 1.5 + 0.5, ny * 1.5 + nz * 1.5 + 0.5, 6);
      // Oceans are shiny, land is not
      const isOcean = elev < 0.42;
      const specVal = isOcean ? 200 + Math.random() * 55 : 10;

      const idx = (py * width + px) * 4;
      data[idx] = specVal;
      data[idx + 1] = specVal;
      data[idx + 2] = specVal;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
