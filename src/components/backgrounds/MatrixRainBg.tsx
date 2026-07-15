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

    const chars = "ｲﾘﾆｵﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵ01<>{}[]/\\";
    const fs = 10;
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

    function draw() {
      ctx!.fillStyle = "rgba(1,1,2,0.12)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.font = `${fs}px monospace`;

      if (Math.random() < 0.08) {
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
        if (Math.random() > 0.88) {
          ctx!.fillStyle = "rgba(140,212,26,0.6)";
          ctx!.shadowBlur = 4; ctx!.shadowColor = "rgba(118,185,0,0.3)";
        } else {
          const green = 80 + Math.random() * 60 | 0;
          ctx!.fillStyle = `rgba(20,${green},30,0.25)`;
          ctx!.shadowBlur = 0;
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
      style={{ zIndex: -1, opacity: 0.25 }}
    />
  );
}
