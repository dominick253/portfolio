"use client";

import { useEffect, useRef } from "react";

export default function MatrixRainBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.6";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const chars = "ｲﾘﾆｵﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵ01<>{}[]/\\✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦";
    const fs = 14;
    let drops: number[] = [];
    function initDrops() { drops = Array.from({ length: Math.floor(W / fs) }, () => -Math.random() * 60 | 0); }
    initDrops();

    function resize() { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; initDrops(); }
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(1,1,2,0.06)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `bold ${fs}px monospace`;

      if (Math.random() < 0.12) drops[Math.random() * drops.length | 0] = -1;
      for (let i = 0; i < drops.length; i++) {
        drops[i]++;
        if (drops[i] * fs > H + 40) drops[i] = Math.random() > 0.97 ? -Math.random() * 10 | 0 : -1;
        const x = i * fs, y = drops[i] * fs;
        if (y < -fs || y > H + fs) continue;
        const ch = chars[Math.random() * chars.length | 0];
        if (Math.random() > 0.9) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 12; ctx.shadowColor = `hsl(${(i * 7) % 360}, 100%, 60%)`;
        } else {
          ctx.fillStyle = `hsl(${(i * 7) % 360}, 100%, 60%)`;
          ctx.shadowBlur = 3; ctx.shadowColor = `hsl(${(i * 7) % 360}, 100%, 60%)`;
        }
        ctx.fillText(ch, x, y);
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
