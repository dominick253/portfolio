"use client";

import { useEffect, useRef } from "react";

export default function SortVizBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let animId: number;

    const barCount = Math.min(120, Math.floor(W / 10));
    const arr: number[] = [];
    let i = 0, j = 0;
    let sorting = false;
    let phase = 0;
    let comparisons = 0;

    function resetArray() {
      arr.length = 0;
      for (let k = 0; k < barCount; k++) arr.push(Math.random());
      i = 0; j = 0;
      sorting = false;
      phase = 0;
      comparisons = 0;
    }
    resetArray();

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
    }
    window.addEventListener("resize", resize);

    function bubbleSortStep() {
      if (i >= barCount - 1) {
        i = 0;
        sorting = false;
        return;
      }
      if (j >= barCount - i - 1) {
        j = 0;
        i++;
        return;
      }
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      j++;
    }

    function draw() {
      // Run a few sort steps per frame
      for (let s = 0; s < 8; s++) bubbleSortStep();

      ctx!.fillStyle = "rgba(1,1,2,0.15)";
      ctx!.fillRect(0, 0, W, H);

      const barW = W / barCount;
      const maxH = H * 0.6;
      const offsetY = H * 0.2;

      for (let k = 0; k < arr.length; k++) {
        const h = arr[k] * maxH;
        const x = k * barW;
        const y = H - offsetY - h;

        // Color gradient based on value
        const hue = 200 + arr[k] * 120;
        const isActive = k === j || k === j + 1;

        ctx!.fillStyle = isActive
          ? `hsla(118, 80%, 55%, 0.25)`
          : `hsla(${hue}, 70%, 60%, 0.12)`;
        ctx!.fillRect(x + 0.5, y, barW - 1, h);
      }

      // Reset if done
      if (!sorting && i >= barCount - 1) {
        phase++;
        if (phase > 30) {
          resetArray();
          sorting = true;
        }
      } else {
        phase = 0;
      }

      animId = requestAnimationFrame(draw);
    }

    // Start sorting immediately
    sorting = true;
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
      style={{ zIndex: -1, opacity: 0.2 }}
    />
  );
}
