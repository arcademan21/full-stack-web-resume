"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

export const GameOfLifeLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Animation Loop State
  const stateRef = useRef({
    cols: 0,
    rows: 0,
    grid: [] as number[],
    lastTime: 0,
  });

  // Handle Visibility Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for transition to finish before unmounting
      setTimeout(() => setShouldRender(false), 500);
    }, 500 + 1000); // 500ms delay requested + 1s buffer for initial load perception

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldRender) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FPS = 15; // Faster for loader
    const INTERVAL = 1000 / FPS;
    let animationId: number;

    const initGrid = (width: number, height: number) => {
      const newCols = Math.ceil(width / CELL_WIDTH);
      const newRows = Math.ceil(height / CELL_HEIGHT);
      const newGrid = new Array(newCols * newRows).fill(0);

      // Chaotically fill grid for loader effect (50% fill)
      for (let i = 0; i < newGrid.length; i++) {
        newGrid[i] = Math.random() > 0.6 ? 1 : 0;
      }

      stateRef.current = {
        cols: newCols,
        rows: newRows,
        grid: newGrid,
        lastTime: 0,
      };
    };

    const countNeighbors = (
      grid: number[],
      x: number,
      y: number,
      cols: number,
      rows: number
    ) => {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const col = (x + i + cols) % cols;
          const row = (y + j + rows) % rows;
          sum += grid[row * cols + col];
        }
      }
      sum -= grid[y * cols + x];
      return sum;
    };

    const update = () => {
      const { cols, rows, grid } = stateRef.current;
      const nextGrid = new Int8Array(grid.length);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          const state = grid[idx];
          const neighbors = countNeighbors(grid, x, y, cols, rows);

          if (state === 0 && neighbors === 3) {
            nextGrid[idx] = 1;
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            nextGrid[idx] = 0;
          } else {
            nextGrid[idx] = state;
          }
        }
      }
      stateRef.current.grid = Array.from(nextGrid);
    };

    const draw = () => {
      const { cols, rows, grid } = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === "dark" || theme === "system";
      // Loader colors: slightly more visible than background
      ctx.fillStyle = isDark
        ? "rgba(63, 128, 255, 0.2)"
        : "rgba(63, 128, 255, 0.2)";

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[j * cols + i]) {
            ctx.fillRect(
              i * CELL_WIDTH,
              j * CELL_HEIGHT,
              CELL_WIDTH - 1,
              CELL_HEIGHT - 1
            );
          }
        }
      }
    };

    const loop = (currentTime: number) => {
      animationId = requestAnimationFrame(loop);
      if (currentTime - stateRef.current.lastTime < INTERVAL) return;
      stateRef.current.lastTime = currentTime;
      update();
      draw();
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initGrid(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        isExiting ? "opacity-0" : "opacity-100"
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center gap-4"></div>
    </div>
  );
};
