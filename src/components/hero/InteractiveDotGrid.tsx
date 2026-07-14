'use client';

import React, { useEffect, useRef } from 'react';

interface InteractiveDotGridProps {
  cursorRef: React.MutableRefObject<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: number;
  }>;
}

export const InteractiveDotGrid: React.FC<InteractiveDotGridProps> = ({ cursorRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Current smoothed cursor coordinates for spring interpolation
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Grid configuration balanced for premium look (30% reduction from test levels)
    const dotSpacing = 36;
    const cursorRadius = 190; // Balanced interaction radius
    const maxDisplacement = 4.0; // pixels
    const maxLineDistance = 42; // only connect adjacent nodes

    const render = () => {
      if (!ctx || !canvas) return;

      // Handle Page Visibility API: pause rendering if tab is hidden
      if (document.hidden) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Interpolate cursor coordinates (spring-like easing)
      currentX.current += (cursorRef.current.targetX - currentX.current) * 0.08;
      currentY.current += (cursorRef.current.targetY - currentY.current) * 0.08;

      const cursorActive = cursorRef.current.active;
      const cX = currentX.current;
      const cY = currentY.current;

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      // Temporary array to store calculated dots in active proximity for drawing lines
      const activeDots: { rx: number; ry: number; ox: number; oy: number; d: number }[] = [];

      // If reduced motion is active, render a static grid for battery/performance savings
      if (prefersReducedMotion) {
        ctx.fillStyle = 'rgba(63, 63, 70, 0.16)'; // default opacity
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * dotSpacing;
            const y = j * dotSpacing;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        return;
      }

      // Loop through columns and rows to draw dots
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const origX = i * dotSpacing;
          const origY = j * dotSpacing;

          // Distance from dot center to mouse cursor
          const dx = origX - cX;
          const dy = origY - cY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let renderX = origX;
          let renderY = origY;
          let dotColor = 'rgba(63, 63, 70, 0.15)'; // default faint gray
          let dotSize = 1.1;

          if (cursorActive > 0 && dist < cursorRadius) {
            const factor = 1 - dist / cursorRadius; // 1 at cursor, 0 at outer edge
            
            // Push dot gently away from cursor
            const angle = Math.atan2(dy, dx);
            const displacement = factor * maxDisplacement;
            
            renderX = origX + Math.cos(angle) * displacement;
            renderY = origY + Math.sin(angle) * displacement;

            // Blend color to a soft emerald green (balanced center to 0.45 opacity)
            const opacity = 0.15 + factor * (0.45 - 0.15);
            dotColor = `rgba(16, 185, 129, ${opacity})`;
            dotSize = 1.0 + factor * (1.3 - 1.0); // radius scales up to 1.3px

            // Store dot coordinates for connection line checks
            activeDots.push({ rx: renderX, ry: renderY, ox: origX, oy: origY, d: dist });
          }

          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(renderX, renderY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw faint connection lines between nearby active dots immediately under the cursor
      const len = activeDots.length;
      for (let m = 0; m < len; m++) {
        const d1 = activeDots[m];
        // Only connect dots that are extremely close to the cursor spotlight (d < 95px)
        if (d1.d > 95) continue;

        for (let n = m + 1; n < len; n++) {
          const d2 = activeDots[n];
          if (d2.d > 95) continue;

          // Spatial distance between the two dots
          const ndx = d1.rx - d2.rx;
          const ndy = d1.ry - d2.ry;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

          // Connect only if they are adjacent grid points
          if (ndist < maxLineDistance) {
            const avgDist = (d1.d + d2.d) / 2;
            const lineFactor = 1 - avgDist / 95; // connection fades toward edge of 95px spotlight radius
            
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineFactor * 0.12})`; // balanced connection line opacity
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(d1.rx, d1.ry);
            ctx.lineTo(d2.rx, d2.ry);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cursorRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
};
