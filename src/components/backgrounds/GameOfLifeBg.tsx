"use client";

import { useEffect, useRef } from "react";

export default function GameOfLifeBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:0.5";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const sz = 10;
    let cols = 0, rows = 0, a: Uint8Array, b: Uint8Array, gen = 0;
    function init() {
      cols = Math.floor(W / sz); rows = Math.floor(H / sz);
      a = new Uint8Array(cols * rows); b = new Uint8Array(cols * rows);
      for (let i = 0; i < a.length; i++) a[i] = Math.random() < 0.22 ? 1 : 0;
      gen = 0;
    }
    init();

    function resize() { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; init(); }
    window.addEventListener("resize", resize);

    function draw() {
      gen++;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            n += a[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
          }
          const i = y * cols + x;
          b[i] = a[i] ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
        }
      }
      [a, b] = [b, a];

      ctx.clearRect(0, 0, W, H);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        if (a[y * cols + x]) {
          const hue = (gen * 0.5 + x * 2 + y * 3) % 360;
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.7)`;
          ctx.shadowBlur = 6; ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.5)`;
          ctx.fillRect(x * sz + 1, y * sz + 1, sz - 2, sz - 2);
        }
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    return () => { canvas.remove(); window.removeEventListener("resize", resize); };
  }, []);

  return <div ref={ref} />;
}
