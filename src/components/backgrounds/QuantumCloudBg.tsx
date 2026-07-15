"use client";

import { useEffect, useRef } from "react";

export default function QuantumCloudBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.55";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const pts = Array.from({ length: 150 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0,
      amp: 0.5 + Math.random() * 2, freq: 0.3 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2, hue: Math.random() * 360,
      ent: i % 2 === 0 ? i + 1 : i - 1,
    }));

    function resize() { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; }
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const t = Date.now() * 0.001;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const w = Math.sin(t * p.freq + p.phase);
        const wy = Math.cos(t * p.freq * 0.7 + p.phase * 1.3);
        p.x += Math.cos(w) * 0.5 * p.amp;
        p.y += Math.sin(wy) * 0.5 * p.amp;

        if (p.ent >= 0 && p.ent < pts.length) {
          const ep = pts[p.ent];
          const dx = ep.x - p.x, dy = ep.y - p.y;
          if (dx * dx + dy * dy > 900) { p.vx += dx * 0.0005; p.vy += dy * 0.0005; }
        }
        p.vx *= 0.98; p.vy *= 0.98; p.x += p.vx; p.y += p.vy;
        if (p.x < -50) p.x = W + 50; if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50; if (p.y > H + 50) p.y = -50;

        const alpha = 0.3 + 0.2 * Math.abs(w);
        const radius = 6 + Math.abs(Math.sin(t * p.freq + p.phase)) * 12;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`);
        grad.addColorStop(0.3, `hsla(${p.hue + 30}, 100%, 60%, ${alpha * 0.5})`);
        grad.addColorStop(0.7, `hsla(${p.hue + 60}, 100%, 50%, ${alpha * 0.2})`);
        grad.addColorStop(1, `hsla(${p.hue + 90}, 100%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2); ctx.fill();

        if (p.ent >= 0 && p.ent < pts.length) {
          const ep = pts[p.ent];
          ctx.strokeStyle = `hsla(${(p.hue + ep.hue) / 2}, 100%, 60%, ${0.2 + 0.15 * Math.abs(Math.sin(t * 2 + p.phase))})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(ep.x, ep.y); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
