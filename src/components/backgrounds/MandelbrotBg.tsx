"use client";

import { useEffect, useRef } from "react";

export default function MandelbrotBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    let animId: number;

    // Initial zoom/pan settings
    let zoom = 1.0;
    let offsetX = -0.5;
    let offsetY = 0.0;
    const targetZoom = 1.0;
    const targetOffsetX = -0.5;
    const targetOffsetY = 0.0;
    let time = 0;

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      ctx!.scale(dpr, dpr);
    }
    window.addEventListener("resize", resize);

    function drawMandelbrot(cx: number, cy: number, w: number, h: number, zoomLevel: number) {
      const maxIter = 40;
      const imageData = ctx!.createImageData(w, h);
      const data = imageData.data;

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const x0 = cx + (px / w - 0.5) * 3.0 / zoomLevel;
          const y0 = cy + (py / h - 0.5) * 3.0 / zoomLevel * (h / w);

          let x = 0, y = 0;
          let iter = 0;
          while (x * x + y * y < 4 && iter < maxIter) {
            const xt = x * x - y * y + x0;
            y = 2 * x * y + y0;
            x = xt;
            iter++;
          }

          const idx = (py * w + px) * 4;
          if (iter === maxIter) {
            data[idx] = 5; data[idx + 1] = 0; data[idx + 2] = 15; data[idx + 3] = 255;
          } else {
            const t = iter / maxIter;
            // Map iteration count to color cycling
            const hue = (iter * 30 + t * 60) % 360;
            const sat = 100;
            const lit = 40 + t * 40;
            // HSL to RGB
            const s = sat / 100;
            const l = lit / 100;
            const c2 = (1 - Math.abs(2 * l - 1)) * s;
            const x2 = c2 * (1 - Math.abs((hue / 60) % 2 - 1));
            const m2 = l - c2 / 2;
            let r = 0, g = 0, b = 0;
            if (hue < 60) { r = c2; g = x2; b = 0; }
            else if (hue < 120) { r = x2; g = c2; b = 0; }
            else if (hue < 180) { r = 0; g = c2; b = x2; }
            else if (hue < 240) { r = 0; g = x2; b = c2; }
            else if (hue < 300) { r = x2; g = 0; b = c2; }
            else { r = c2; g = 0; b = x2; }
            data[idx] = Math.min(255, Math.floor((r + m2) * 255));
            data[idx + 1] = Math.min(255, Math.floor((g + m2) * 255));
            data[idx + 2] = Math.min(255, Math.floor((b + m2) * 255));
            data[idx + 3] = 255;
          }
        }
      }

      ctx!.putImageData(imageData, 0, 0);
    }

    function draw() {
      time += 0.001;
      // Very slow drift
      const driftX = Math.sin(time * 0.01) * 0.02;
      const driftY = Math.cos(time * 0.015) * 0.02;

      drawMandelbrot(
        offsetX + driftX,
        offsetY + driftY,
        Math.floor(W),
        Math.floor(H),
        zoom
      );

      animId = requestAnimationFrame(draw);
    }

    // Initial render, then animate with slow drift
    drawMandelbrot(offsetX, offsetY, Math.floor(W), Math.floor(H), zoom);

    // Start slow animation after a brief pause
    const pauseTimeout = setTimeout(() => {
      animId = requestAnimationFrame(draw);
    }, 2000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(pauseTimeout);
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
