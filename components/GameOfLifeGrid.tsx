"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const CELL_WIDTH = 18;
const CELL_HEIGHT = 24;

const PATTERNS = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  lwss: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
  ],
  pulsar: [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  ],
};

export const GameOfLifeGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  // Refs for mutable state in the animation loop
  const stateRef = useRef({
    cols: 0,
    rows: 0,
    grid: [] as number[],
    lastTime: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FPS = 8;
    const INTERVAL = 1000 / FPS;
    let animationId: number;

    const placePattern = (
      grid: number[],
      pattern: number[][],
      offsetX: number,
      offsetY: number,
      cols: number
    ) => {
      pattern.forEach((row, y) => {
        row.forEach((active, x) => {
          const idx = (offsetY + y) * cols + (offsetX + x);
          if (idx >= 0 && idx < grid.length) {
            grid[idx] = active;
          }
        });
      });
    };

    const initGrid = (width: number, height: number, restart = false) => {
      const { cols, rows, grid } = stateRef.current;

      const newCols = Math.ceil(width / CELL_WIDTH);
      const newRows = Math.ceil(height / CELL_HEIGHT);

      if (!restart && newCols === cols && newRows === rows) return;

      const newGrid = new Array(newCols * newRows).fill(0);

      // Randomly place patterns - FOCUSED ON TOP AREA
      // The user wants them in the "high central" zones
      const numPatterns = Math.floor(Math.max(5, (newCols * newRows) / 150)); // More patterns
      const patterns = Object.values(PATTERNS);

      for (let i = 0; i < numPatterns; i++) {
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];

        // Focus x around center, but allow full width
        // Focus y on top 30%
        const x = Math.floor(Math.random() * (newCols - 5));
        const y = Math.floor(Math.random() * (newRows * 0.3)); // Top 30%

        placePattern(newGrid, pattern, x, y, newCols);
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

      // Theme Colors - INCREASED VISIBILITY
      const isDark = theme === "dark" || theme === "system";
      ctx.fillStyle = isDark
        ? "rgba(200, 200, 255, 0.06)"
        : "rgba(0, 0, 50, 0.05)";

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[j * cols + i]) {
            ctx.fillRect(
              i * CELL_WIDTH + 1,
              j * CELL_HEIGHT + 1,
              CELL_WIDTH - 2,
              CELL_HEIGHT - 2
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
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const newCols = Math.ceil(rect.width / CELL_WIDTH);
      const newRows = Math.ceil(rect.height / CELL_HEIGHT);
      console.log("Game of Life: Canvas initialized", {
        width: rect.width,
        height: rect.height,
        cols: newCols,
        rows: newRows,
      });

      initGrid(rect.width, rect.height, true);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  // Interaction Handler (Mouse & Touch)
  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const col = Math.floor(x / CELL_WIDTH);
    const row = Math.floor(y / CELL_HEIGHT);
    const { cols, grid } = stateRef.current;

    const idx = row * cols + col;
    // Log interaction
    // console.log("Interaction at:", { col, row });

    if (idx >= 0 && idx < grid.length) {
      // revive cell if dead, keep alive if alive (drawing mode)
      stateRef.current.grid[idx] = 1;

      // Add neighbors for better feedback
      const neighbors = [idx - 1, idx + 1, idx - cols, idx + cols];
      neighbors.forEach((n) => {
        if (n >= 0 && n < grid.length && Math.random() > 0.5) {
          stateRef.current.grid[n] = 1;
        }
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) {
      // Left click held down
      handleInteraction(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleInteraction(e.clientX, e.clientY);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleClick} // Instant feedback on press
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) =>
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
      }
      className="fixed inset-0 top-16 w-full h-[calc(100vh-64px)] z-0 cursor-crosshair opacity-60"
    />
  );
};
