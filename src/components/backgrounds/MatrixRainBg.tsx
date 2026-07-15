"use client";

import { useEffect, useRef } from "react";

export default function MatrixRainBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let animId: number;

    const chars = "ｲﾘﾆｵﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵ01<>{}[]/\\✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦";
    const fs = 14;
    let drops: number[] = [];

    function initDrops() {
      const cols = Math.floor(W / fs);
      drops = Array.from({ length: cols }, () => -Math.random() * 60 | 0);
    }
    initDrops();

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
      initDrops();
    }
    window.addEventListener("resize", resize);

    const rainbow = Array.from({ length: 360 }, (hue) => `hsl(${hue}, 100%, 60%)`);

    function draw() {
      ctx!.fillStyle = "rgba(1,1,2,0.05)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.font = `bold ${fs}px monospace`;

      if (Math.random() < 0.12) {
        drops[Math.random() * drops.length | 0] = -1;
      }
      for (let i = 0; i < drops.length; i++) {
        drops[i]++;
        if (drops[i] * fs > H + 40) {
          drops[i] = Math.random() > 0.975 ? -Math.random() * 10 | 0 : -1;
        }
        const x = i * fs, y = drops[i] * fs;
        if (y < -fs || y > H + fs) continue;
        const ch = chars[Math.random() * chars.length | 0];
        if (Math.random() > 0.92) {
          ctx!.fillStyle = "#ffffff";
          ctx!.shadowBlur = 12; ctx!.shadowColor = rainbow[i % 360];
        } else {
          ctx!.fillStyle = rainbow[i % 360];
          ctx!.shadowBlur = 4; ctx!.shadowColor = rainbow[i % 360];
        }
        ctx!.fillText(ch, x, y);
      }
      ctx!.shadowBlur = 0;
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
      style={{ zIndex: -1, opacity: 0.6 }}
    />
  );
}
