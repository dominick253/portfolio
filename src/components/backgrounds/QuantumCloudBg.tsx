"use client";

import { useEffect, useRef } from "react";

export default function QuantumCloudBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let animId: number;

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0,
      amp: 0.5 + Math.random() * 2,
      freq: 0.3 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() * 360,
      entangled: -1 as number,
    }));

    for (let i = 0; i < particles.length; i += 2) {
      if (i + 1 < particles.length) {
        particles[i].entangled = i + 1;
        particles[i + 1].entangled = i;
      }
    }

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
    }
    window.addEventListener("resize", resize);

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.globalCompositeOperation = "lighter";

      const t = Date.now() * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const wave = Math.sin(t * p.freq + p.phase);
        const waveY = Math.cos(t * p.freq * 0.7 + p.phase * 1.3);

        p.x += Math.cos(wave) * 0.5 * p.amp;
        p.y += Math.sin(waveY) * 0.5 * p.amp;

        if (p.entangled >= 0) {
          const ep = particles[p.entangled];
          const dx = ep.x - p.x;
          const dy = ep.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 30) {
            p.vx += dx * 0.0005;
            p.vy += dy * 0.0005;
          }
        }

        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;

        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;

        // Big colorful glow
        const alpha = 0.3 + 0.2 * Math.abs(wave);
        const radius = 6 + Math.abs(Math.sin(t * p.freq + p.phase)) * 12;

        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(0.3, `hsla(${p.hue + 30}, 100%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(0.7, `hsla(${p.hue + 60}, 100%, 50%, ${alpha * 0.2})`);
        gradient.addColorStop(1, `hsla(${p.hue + 90}, 100%, 40%, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx!.fill();

        // Entanglement lines
        if (p.entangled >= 0) {
          const ep = particles[p.entangled];
          const lineAlpha = 0.2 + 0.15 * Math.abs(Math.sin(t * 2 + p.phase));
          ctx!.strokeStyle = `hsla(${(p.hue + ep.hue) / 2}, 100%, 60%, ${lineAlpha})`;
          ctx!.lineWidth = 1.5;
          ctx!.setLineDash([4, 6]);
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(ep.x, ep.y);
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
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
      style={{ zIndex: -1, opacity: 0.55 }}
    />
  );
}
