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
            data[idx] = 0; data[idx + 1] = 0; data[idx + 2] = 5; data[idx + 3] = 255;
          } else {
            const t = iter / maxIter;
            const r = Math.floor(94 * t * 0.5);
            const g = Math.floor(106 * t * 0.3);
            const b = Math.floor(210 * t * 0.6);
            data[idx] = Math.min(255, r);
            data[idx + 1] = Math.min(255, g);
            data[idx + 2] = Math.min(255, b);
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
      style={{ zIndex: -1, opacity: 0.18 }}
    />
  );
}
