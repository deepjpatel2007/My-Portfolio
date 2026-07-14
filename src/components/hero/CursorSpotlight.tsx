'use client';

import React, { useEffect, useRef } from 'react';

interface CursorSpotlightProps {
  cursorRef: React.MutableRefObject<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: number;
  }>;
}

export const CursorSpotlight: React.FC<CursorSpotlightProps> = ({ cursorRef }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // Smoothed values for spotlight positions and opacity
    let currentX = 0;
    let currentY = 0;
    let currentOpacity = 0;
    let animationFrameId: number;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is requested, hide the cursor spotlight follower
    if (prefersReducedMotion) {
      el.style.display = 'none';
      return;
    }

    const updatePosition = () => {
      // Interpolate coordinates (spring-like lerp)
      currentX += (cursorRef.current.targetX - currentX) * 0.07;
      currentY += (cursorRef.current.targetY - currentY) * 0.07;

      // Interpolate opacity (smooth fade in/out)
      currentOpacity += (cursorRef.current.active - currentOpacity) * 0.08;

      // Translate by cursor coordinates, offsetting by half spotlight diameter (600px / 2 = 300px)
      el.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      el.style.opacity = currentOpacity.toFixed(3);

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [cursorRef]);

  return (
    <div
      ref={spotlightRef}
      className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen z-0"
      style={{
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(20, 184, 166, 0.035) 45%, transparent 75%)',
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    />
  );
};
