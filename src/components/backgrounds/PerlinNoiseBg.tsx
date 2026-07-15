"use client";

import { useEffect, useRef } from "react";

/* Perlin noise permutation table (seeded at module load) */
const PERM = new Uint8Array(512);
{
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = Date.now() ^ 0x5bd1e995;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807 + 0) & 0x7fffffff;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number) {
  const h = hash & 3;
  return h === 0 ? x + y : h === 1 ? -x + y : h === 2 ? x - y : -x - y;
}
function noise2D(x: number, y: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const u = fade(xf), v = fade(yf);
  const a = PERM[X] + Y, b = PERM[X + 1] + Y;
  return lerp(v,
    lerp(u, grad(PERM[a], xf, yf), grad(PERM[b], xf - 1, yf)),
    lerp(u, grad(PERM[a + 1], xf, yf - 1), grad(PERM[b + 1], xf - 1, yf - 1))
  );
}
function fbm(x: number, y: number, oct = 4) {
  let val = 0, amp = 1, freq = 1, max = 0;
  for (let i = 0; i < oct; i++) { val += noise2D(x * freq, y * freq) * amp; max += amp; amp *= 0.5; freq *= 2; }
  return val / max;
}

export default function PerlinNoiseBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const particles = Array.from({ length: 800 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0, life: Math.random(),
    }));

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
    }
    window.addEventListener("resize", resize);

    function draw() {
      ctx!.fillStyle = "rgba(1,1,2,0.06)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const scale = 0.003;
        const angle = fbm(p.x * scale, p.y * scale, 3) * Math.PI * 4;
        const speed = 1.2;
        p.vx += Math.cos(angle) * 0.12 * speed;
        p.vy += Math.sin(angle) * 0.12 * speed;
        p.vx *= 0.95; p.vy *= 0.95;
        p.x += p.vx; p.y += p.vy;
        p.life += 0.002 * speed;

        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
          p.x = Math.random() * W; p.y = Math.random() * H;
          p.vx = 0; p.vy = 0;
        }

        const hue = 220 + (fbm(p.x * 0.004, p.y * 0.004, 2) * 0.5 + 0.5) * 60;
        const alpha = (0.2 + Math.abs(Math.sin(p.life * Math.PI * 2)) * 0.2) * 0.5;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const len = Math.min(6, spd * 3);

        ctx!.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(p.x - p.vx * len * 2, p.y - p.vy * len * 2);
        ctx!.stroke();
      }

      ctx!.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1, opacity: 0.35 }}
    />
  );
}
