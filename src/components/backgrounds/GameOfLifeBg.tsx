"use client";

import { useEffect, useRef } from "react";

export default function GameOfLifeBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let animId: number;

    const cellSize = 10;
    let cols = 0, rows = 0;
    let a: Uint8Array, b: Uint8Array;
    let gen = 0;

    function initGrid() {
      cols = Math.floor(W / cellSize);
      rows = Math.floor(H / cellSize);
      a = new Uint8Array(cols * rows);
      b = new Uint8Array(cols * rows);
      for (let i = 0; i < a.length; i++) {
        a[i] = Math.random() < 0.22 ? 1 : 0;
      }
      gen = 0;
    }
    initGrid();

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
      initGrid();
    }
    window.addEventListener("resize", resize);

    function step() {
      gen++;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              n += a[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
            }
          const i = y * cols + x;
          b[i] = a[i] ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
        }
      }
      [a, b] = [b, a];
    }

    function draw() {
      step();
      ctx!.clearRect(0, 0, W, H);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (a[y * cols + x]) {
            const hue = (gen * 0.5 + x * 2 + y * 3) % 360;
            const brightness = 0.6 + (gen % 30) / 100;
            ctx!.fillStyle = `hsla(${hue}, 90%, ${brightness * 70}%, 0.7)`;
            ctx!.shadowBlur = 6;
            ctx!.shadowColor = `hsla(${hue}, 90%, 60%, 0.5)`;
            ctx!.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }
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
      style={{ zIndex: -1, opacity: 0.5 }}
    />
  );
}
