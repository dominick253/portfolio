"use client";

import { useEffect, useRef } from "react";

/* Perlin noise - exact copy from algo-vis-showcase */
const Noise = (() => {
  function shuffle(seed: number) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let s = seed || Date.now() ^ 0x5bd1e995;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807 + 0) & 0x7fffffff;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    return p;
  }
  const perm = shuffle(0);
  const perm128 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm128[i] = perm[i & 255];
  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
  function grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    return (h === 0 ? x + y : h === 1 ? -x + y : h === 2 ? x - y : -x - y);
  }
  function noise2D(x: number, y: number) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = fade(xf), v = fade(yf);
    const a = perm128[X] + Y, b = perm128[X + 1] + Y;
    return lerp(v,
      lerp(u, grad(perm128[a], xf, yf), grad(perm128[b], xf - 1, yf)),
      lerp(u, grad(perm128[a + 1], xf, yf - 1), grad(perm128[b + 1], xf - 1, yf - 1))
    );
  }
  function fbm(x: number, y: number, octaves = 4) {
    let val = 0, amp = 1, freq = 1, max = 0;
    for (let i = 0; i < octaves; i++) {
      val += noise2D(x * freq, y * freq) * amp;
      max += amp;
      amp *= 0.5;
      freq *= 2;
    }
    return val / max;
  }
  return { noise2D, fbm, perm128 };
})();

export default function FlowFieldBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.4";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    let particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const nParticles = 900;

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      particles = Array.from({ length: nParticles }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: 0, vy: 0, life: Math.random()
      }));
    }
    window.addEventListener("resize", resize);
    resize();

    function draw() {
      const speed = 0.8;
      for (const p of particles) {
        const scale = 0.004;
        const angle = Noise.fbm(p.x * scale, p.y * scale, 3) * Math.PI * 4;
        p.vx += Math.cos(angle) * 0.15 * speed;
        p.vy += Math.sin(angle) * 0.15 * speed;
        p.vx *= 0.95; p.vy *= 0.95;
        p.x += p.vx; p.y += p.vy;
        p.life += 0.001 * speed;
        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
          p.x = Math.random() * W; p.y = Math.random() * H;
          p.vx = 0; p.vy = 0;
        }
      }

      // Trail fade - subtler for longer visible traces
      ctx.fillStyle = "rgba(5,6,8,0.06)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const scale = 0.006;
        const hue = (Noise.fbm(p.x * scale, p.y * scale, 2) * 0.5 + 0.5) * 240 + 180;
        const alpha = 0.3 + Math.abs(Math.sin(p.life * Math.PI * 2)) * 0.3;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const len = Math.min(60, spd * 12);
        ctx.strokeStyle = `hsla(${hue % 360}, 80%, 60%, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * len, p.y - p.vy * len);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
