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
  const a = PERM[X] + Y, b = PERM[X + 1] + Y;
  return lerp(v, lerp(u, grad(PERM[a], xf, yf), grad(PERM[b], xf - 1, yf)), lerp(u, grad(PERM[a + 1], xf, yf - 1), grad(PERM[b + 1], xf - 1, yf - 1)));
}
function fbm(x: number, y: number, oct = 4) {
  let val = 0, amp = 1, freq = 1, max = 0;
  for (let i = 0; i < oct; i++) { val += noise2D(x * freq, y * freq) * amp; max += amp; amp *= 0.5; freq *= 2; }
  return val / max;
}

export default function FlowFieldBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.6";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const particles = Array.from({ length: 400 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0, hue: Math.random() * 360,
    }));

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    }
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(1,1,2,0.12)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const scale = 0.003;
        const angle = fbm(p.x * scale, p.y * scale, 3) * Math.PI * 3;
        const speed = 3;
        p.vx += Math.cos(angle) * 0.4 * speed;
        p.vy += Math.sin(angle) * 0.4 * speed;
        p.vx *= 0.9; p.vy *= 0.9;
        p.x += p.vx; p.y += p.vy;
        p.hue += 0.5;
        if (p.hue > 360) p.hue -= 360;

        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
          p.x = Math.random() * W; p.y = Math.random() * H;
          p.vx = 0; p.vy = 0;
        }

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const len = Math.min(30, spd * 5);

        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.4)`;
        ctx.strokeStyle = `hsla(${p.hue}, 100%, 70%, ${Math.min(0.9, 0.3 + spd * 0.2)})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * len, p.y - p.vy * len);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
