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

    // Wave function particles that oscillate like quantum probability clouds
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0,
      amp: 0.5 + Math.random() * 1.5,
      freq: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      hue: 200 + Math.random() * 160,
      entangled: -1 as number,
    }));

    // Create entangled pairs
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
      const t = Date.now() * 0.001;
      ctx!.fillStyle = "rgba(1,1,2,0.03)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.globalCompositeOperation = "lighter";

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const wave = Math.sin(t * p.freq + p.phase);
        const waveY = Math.cos(t * p.freq * 0.7 + p.phase * 1.3);

        // Orbital motion
        p.x += Math.cos(wave) * 0.3 * p.amp;
        p.y += Math.sin(waveY) * 0.3 * p.amp;

        // Entanglement effect
        if (p.entangled >= 0) {
          const ep = particles[p.entangled];
          // Pull toward entangled partner
          const dx = ep.x - p.x;
          const dy = ep.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 20) {
            p.vx += dx * 0.0003;
            p.vy += dy * 0.0003;
          }
        }

        // Damping
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;

        // Boundary wrap with soft bounce
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;

        // Draw probability cloud
        const alpha = (0.15 + 0.1 * Math.abs(wave)) * 0.4;
        const radius = 4 + Math.abs(Math.sin(t * p.freq + p.phase)) * 8;

        // Glow
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 65%, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 70%, 50%, ${alpha * 0.3})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 40%, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx!.fill();

        // Entanglement line
        if (p.entangled >= 0) {
          const ep = particles[p.entangled];
          const lineAlpha = (0.1 + 0.05 * Math.abs(Math.sin(t * 2 + p.phase))) * 0.4;
          ctx!.strokeStyle = `hsla(${p.hue}, 60%, 60%, ${lineAlpha})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(ep.x, ep.y);
          ctx!.stroke();
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
      style={{ zIndex: -1, opacity: 0.25 }}
    />
  );
}
