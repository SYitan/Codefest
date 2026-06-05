export function createEarthTexture(width = 1024, height = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Ocean gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#1a3a6b");
  grad.addColorStop(0.3, "#1e5080");
  grad.addColorStop(0.5, "#1565a0");
  grad.addColorStop(0.7, "#1e5080");
  grad.addColorStop(1, "#1a3a6b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Land masses (simplified perlin-like using overlapping circles)
  const continents = [
    // North America
    { x: 0.18, y: 0.25, rx: 0.08, ry: 0.10, color: "#2d5a27" },
    { x: 0.20, y: 0.30, rx: 0.10, ry: 0.08, color: "#3a6b33" },
    { x: 0.15, y: 0.22, rx: 0.05, ry: 0.06, color: "#4a7a40" },
    // South America
    { x: 0.28, y: 0.55, rx: 0.04, ry: 0.10, color: "#2d6b28" },
    { x: 0.27, y: 0.50, rx: 0.05, ry: 0.05, color: "#3a7a33" },
    { x: 0.29, y: 0.62, rx: 0.03, ry: 0.06, color: "#4a8a40" },
    // Europe
    { x: 0.48, y: 0.22, rx: 0.04, ry: 0.04, color: "#4a7a3a" },
    { x: 0.50, y: 0.25, rx: 0.05, ry: 0.03, color: "#5a8a44" },
    // Africa
    { x: 0.50, y: 0.42, rx: 0.05, ry: 0.10, color: "#5a7a30" },
    { x: 0.48, y: 0.48, rx: 0.06, ry: 0.06, color: "#6a8a38" },
    { x: 0.52, y: 0.38, rx: 0.04, ry: 0.05, color: "#4a6b28" },
    // Asia
    { x: 0.60, y: 0.20, rx: 0.08, ry: 0.07, color: "#4a7a35" },
    { x: 0.65, y: 0.25, rx: 0.10, ry: 0.06, color: "#5a8a3d" },
    { x: 0.70, y: 0.30, rx: 0.06, ry: 0.08, color: "#3a6b28" },
    { x: 0.75, y: 0.22, rx: 0.06, ry: 0.04, color: "#4a7a30" },
    // Australia
    { x: 0.88, y: 0.52, rx: 0.04, ry: 0.03, color: "#6a8a3a" },
    // Greenland
    { x: 0.32, y: 0.12, rx: 0.04, ry: 0.03, color: "#8a9a7a" },
    // Antarctica
    { x: 0.50, y: 0.95, rx: 0.20, ry: 0.04, color: "#c8d8e0" },
    { x: 0.50, y: 0.05, rx: 0.15, ry: 0.03, color: "#b8c8d0" },
  ];

  for (const c of continents) {
    ctx.beginPath();
    ctx.ellipse(c.x * width, c.y * height, c.rx * width, c.ry * height, 0, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();

    // Add some noise variation
    for (let i = 0; i < 5; i++) {
      const nx = c.x + (Math.random() - 0.5) * c.rx * 1.5;
      const ny = c.y + (Math.random() - 0.5) * c.ry * 1.5;
      const nr = (0.3 + Math.random() * 0.5) * Math.min(c.rx, c.ry);
      ctx.beginPath();
      ctx.ellipse(nx * width, ny * height, nr * width, nr * height * 0.8, Math.random() * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${100 + Math.random() * 30}, ${30 + Math.random() * 20}%, ${25 + Math.random() * 15}%)`;
      ctx.fill();
    }
  }

  // Atmosphere falloff at edges
  const vignette = ctx.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, height * 0.6);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.3)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  return canvas;
}
