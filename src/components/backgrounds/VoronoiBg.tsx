"use client";

import { useEffect, useRef } from "react";

export default function VoronoiBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.55";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const seeds = Array.from({ length: Math.min(20, Math.floor((W * H) / 15000)) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      hue: Math.random() * 360,
    }));

    function resize() { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; }
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const s of seeds) {
        s.x += s.vx * 0.08; s.y += s.vy * 0.08;
        s.hue += 0.03; if (s.hue > 360) s.hue -= 360;
        if (s.x < 5 || s.x > W - 5) s.vx *= -1;
        if (s.y < 5 || s.y > H - 5) s.vy *= -1;
        s.x = Math.max(5, Math.min(W - 5, s.x));
        s.y = Math.max(5, Math.min(H - 5, s.y));
      }

      const res = 4, rw = Math.floor(W / res), rh = Math.floor(H / res);
      const img = ctx.createImageData(rw, rh);
      const d = img.data;

      for (let y = 0; y < rh; y++) {
        const py = y * res + res / 2;
        for (let x = 0; x < rw; x++) {
          const px = x * res + res / 2;
          let minD = Infinity, minI = 0, secondD = Infinity;
          for (let i = 0; i < seeds.length; i++) {
            const dx = seeds[i].x - px, dy = seeds[i].y - py;
            const dist = dx * dx + dy * dy;
            if (dist < minD) { secondD = minD; minD = dist; minI = i; } else if (dist < secondD) { secondD = dist; }
          }
          const edgeDist = Math.sqrt(secondD) - Math.sqrt(minD);
          const pi = (y * rw + x) * 4;
          const seed = seeds[minI];
          const h = (seed.hue + Math.sqrt(minD) * 0.03) % 360;
          const c = 0.7, x2 = c * (1 - Math.abs((h / 60) % 2 - 1)), m = 5;
          let r: number, g: number, b: number;
          if (h < 60) { r = m + (c + x2) * 220; g = m + x2 * 220; b = m; }
          else if (h < 120) { r = m + x2 * 220; g = m + (c + x2) * 220; b = m; }
          else if (h < 180) { r = m; g = m + (c + x2) * 220; b = m + x2 * 220; }
          else if (h < 240) { r = m; g = m + x2 * 220; b = m + (c + x2) * 220; }
          else if (h < 300) { r = m + x2 * 220; g = m; b = m + (c + x2) * 220; }
          else { r = m + (c + x2) * 220; g = m; b = m + x2 * 220; }
          if (edgeDist < res * 2 && edgeDist > 0) {
            d[pi] = Math.floor(r * 0.25); d[pi + 1] = Math.floor(g * 0.25); d[pi + 2] = Math.floor(b * 0.25);
          } else {
            d[pi] = Math.min(255, r + 5); d[pi + 1] = Math.min(255, g + 5); d[pi + 2] = Math.min(255, b + 5);
          }
          d[pi + 3] = 255;
        }
      }

      const temp = document.createElement("canvas");
      temp.width = rw; temp.height = rh;
      temp.getContext("2d")!.putImageData(img, 0, 0);
      ctx.drawImage(temp, 0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      for (const s of seeds) { ctx.beginPath(); ctx.arc(s.x, s.y, 2, 0, Math.PI * 2); ctx.fill(); }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
