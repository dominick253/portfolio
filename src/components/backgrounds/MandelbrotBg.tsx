"use client";

import { useEffect, useRef } from "react";

export default function MandelbrotBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.45";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    let scanLine = 0;
    let zoom = 1.0, ox = -0.5, oy = 0;
    let time = 0;
    let scanDir = 1;

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      // Reset scan on resize
      scanLine = 0;
    }
    window.addEventListener("resize", resize);

    // Pre-allocate image data
    let imgData: ImageData | null = null;

    function renderScan() {
      time += 0.001;
      const driftX = Math.sin(time * 0.01) * 0.015;
      const driftY = Math.cos(time * 0.015) * 0.015;
      const cx = ox + driftX, cy = oy + driftY;
      const maxIter = 30;

      const w = Math.floor(W), h = Math.floor(H);

      // First frame: create imageData
      if (!imgData || imgData.width !== w || imgData.height !== h) {
        imgData = ctx.createImageData(w, h);
        // Initialize to black
        for (let i = 0; i < imgData.data.length; i += 4) {
          imgData.data[i] = 0;
          imgData.data[i + 1] = 0;
          imgData.data[i + 2] = 0;
          imgData.data[i + 3] = 255;
        }
        scanLine = 0;
      }

      const d = imgData.data;
      const batchSize = 4; // rows per frame

      // Render a batch of scan lines
      for (let b = 0; b < batchSize; b++) {
        const py = scanLine;
        if (py < 0 || py >= h) break;

        for (let px = 0; px < w; px++) {
          const x0 = cx + (px / w - 0.5) * 3.0 / zoom;
          const y0 = cy + (py / h - 0.5) * 3.0 / zoom * (h / w);
          let x = 0, y = 0, iter = 0;
          while (x * x + y * y < 4 && iter < maxIter) {
            const xt = x * x - y * y + x0;
            y = 2 * x * y + y0; x = xt; iter++;
          }
          const idx = (py * w + px) * 4;
          if (iter === maxIter) {
            d[idx] = 5; d[idx + 1] = 0; d[idx + 2] = 15; d[idx + 3] = 255;
          } else {
            const t = iter / maxIter;
            const hue = (iter * 30 + t * 60) % 360;
            const s = 1, l = 0.3 + t * 0.4;
            const c2 = (1 - Math.abs(2 * l - 1)) * s;
            const x2 = c2 * (1 - Math.abs((hue / 60) % 2 - 1));
            const m2 = l - c2 / 2;
            let r = 0, g = 0, b = 0;
            if (hue < 60) { r = c2; g = x2; }
            else if (hue < 120) { r = x2; g = c2; }
            else if (hue < 180) { g = c2; b = x2; }
            else if (hue < 240) { g = x2; b = c2; }
            else if (hue < 300) { r = x2; b = c2; }
            else { r = c2; b = x2; }
            d[idx] = Math.min(255, Math.floor((r + m2) * 255));
            d[idx + 1] = Math.min(255, Math.floor((g + m2) * 255));
            d[idx + 2] = Math.min(255, Math.floor((b + m2) * 255));
            d[idx + 3] = 255;
          }
        }
        scanLine += scanDir;
      }

      ctx.putImageData(imgData, 0, 0);

      // If scan complete, pause, reverse direction and keep drifting
      if (scanLine >= h || scanLine < 0) {
        scanDir *= -1;
        scanLine += scanDir;
      }

      requestAnimationFrame(renderScan);
    }

    renderScan();

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
