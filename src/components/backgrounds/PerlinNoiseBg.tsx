"use client";

import { useEffect, useRef } from "react";

const PERM = new Uint8Array(512);
{
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = Date.now() ^ 0x5bd1e995;
  for (let i = 255; i > 0; i--) { s = (s * 16807 + 0) & 0x7fffffff; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}
function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number) { const h = hash & 3; return h === 0 ? x + y : h === 1 ? -x + y : h === 2 ? x - y : -x - y; }
function noise2D(x: number, y: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const u = fade(xf), v = fade(yf);
  const a = PERM[X] + Y, b = PERM[X+1] + Y;
  return lerp(v, lerp(u, grad(PERM[a], xf, yf), grad(PERM[b], xf-1, yf)), lerp(u, grad(PERM[a+1], xf, yf-1), grad(PERM[b+1], xf-1, yf-1)));
}
function fbm(x: number, y: number, oct=4) {
  let val = 0, amp = 1, freq = 1, max = 0;
  for (let i = 0; i < oct; i++) { val += noise2D(x*freq, y*freq)*amp; max += amp; amp*=0.5; freq*=2; }
  return val/max;
}

export default function FlowFieldBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.35";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const particles = Array.from({ length: 600 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      hue: Math.random() * 360,
    }));

    function resize() { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; }
    window.addEventListener("resize", resize);

    function draw() {
      // Very subtle trail fade — builds up flow traces over time
      ctx.fillStyle = "rgba(1,1,2,0.03)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const scale = 0.0025;
        const angle = fbm(p.x * scale, p.y * scale, 3) * Math.PI * 4;
        const speed = 0.5;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        p.x += dx;
        p.y += dy;
        p.hue += 0.05;
        if (p.hue > 360) p.hue -= 360;

        if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }

        // Draw as a dot with glow — accumulates into flow traces
        const alpha = 0.04;
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
