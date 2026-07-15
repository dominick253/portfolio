"use client";

import { useEffect, useRef } from "react";

// Minimal 2D value noise — cheap
const P = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = Date.now() & 0x7fffffff;
  for (let i = 255; i > 0; i--) { s = (s * 16807) & 0x7fffffff; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];
})();

function lerp(a: number, b: number, t: number) { return a + t * (b - a); }
function n2D(x: number, y: number) {
  const ix = Math.floor(x) & 255, iy = Math.floor(y) & 255;
  const fx = x - Math.floor(x), fy = y - Math.floor(y);
  const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
  const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
  const a = P[ix] + iy, b = P[ix + 1] + iy;
  return lerp(lerp(P[a] / 128 - 1, P[b] / 128 - 1, ux), lerp(P[a + 1] / 128 - 1, P[b + 1] / 128 - 1, ux), uy);
}
function fbm2(x: number, y: number) {
  return n2D(x, y) * 0.5 + n2D(x * 2, y * 2) * 0.25 + n2D(x * 4, y * 4) * 0.125;
}

export default function FlowFieldBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.3";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    // Cache noise field on grid for performance
    const gridRes = 40;
    let gridW = 0, gridH = 0;
    let noiseGrid: Float32Array = new Float32Array(0);
    let gridX = 0, gridY = 0;

    function buildGrid() {
      gridW = Math.ceil(W / gridRes) + 2;
      gridH = Math.ceil(H / gridRes) + 2;
      noiseGrid = new Float32Array(gridW * gridH);
      gridX = Math.random() * 1000;
      gridY = Math.random() * 1000;
      for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
          const px = (x - 1) * gridRes, py = (y - 1) * gridRes;
          noiseGrid[y * gridW + x] = fbm2((px + gridX) * 0.003, (py + gridY) * 0.003) * Math.PI * 4;
        }
      }
    }

    // Particles as simple objects
    const particleCount = 200;
    const xs = new Float32Array(particleCount);
    const ys = new Float32Array(particleCount);
    const hs = new Float32Array(particleCount); // hue
    const ls = new Float32Array(particleCount); // life (for breathing)

    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        xs[i] = Math.random() * W;
        ys[i] = Math.random() * H;
        hs[i] = Math.random() * 360;
        ls[i] = Math.random();
      }
    }

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      buildGrid();
      initParticles();
    }
    window.addEventListener("resize", resize);
    resize();

    // Pre-create an offscreen canvas for noise grid rendering
    // to avoid per-frame allocations

    function draw() {
      // Trail fade — single fill is fast
      ctx.fillStyle = "rgba(1,1,2,0.06)";
      ctx.fillRect(0, 0, W, H);

      const speed = 0.6;
      const dt = 0.016;

      for (let i = 0; i < particleCount; i++) {
        // Lookup noise from grid
        const gx = Math.floor((xs[i] + gridX * 0.003) / gridRes);
        const gy = Math.floor((ys[i] + gridY * 0.003) / gridRes);
        const gi = gy * gridW + gx;
        const angle = gi >= 0 && gi < noiseGrid.length ? noiseGrid[gi] : 0;

        xs[i] += Math.cos(angle) * speed;
        ys[i] += Math.sin(angle) * speed;
        hs[i] += 0.03; if (hs[i] > 360) hs[i] -= 360;
        ls[i] += 0.01;

        // Wrap
        if (xs[i] < -5 || xs[i] > W + 5 || ys[i] < -5 || ys[i] > H + 5) {
          xs[i] = Math.random() * W;
          ys[i] = Math.random() * H;
        }

        // Draw as tiny dot — no shadow, no arc overhead
        const bright = 0.5 + Math.sin(ls[i] * Math.PI * 2) * 0.2;
        ctx.fillStyle = `hsla(${hs[i]}, 80%, ${60 + bright * 20}%, 0.03)`;
        ctx.globalCompositeOperation = "lighter";
        ctx.fillRect(xs[i] - 0.5, ys[i] - 0.5, 1.5, 1.5);
        ctx.globalCompositeOperation = "source-over";
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
