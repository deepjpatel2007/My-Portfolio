'use client';

import React, { useEffect, useRef, useState } from 'react';

export const GlobalInteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Shared cursor tracking reference
  const cursor = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: 0
  });

  // Smoothed cursor tracking values
  const currentX = useRef(0);
  const currentY = useRef(0);
  const spotlightOpacity = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile touch-only screens using pointers query
    const touchMedia = window.matchMedia('(pointer: coarse)');
    setIsMobile(touchMedia.matches);

    // Detect reduced motion
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionMedia.matches);

    const handleMediaChange = () => {
      setIsMobile(touchMedia.matches);
      setPrefersReducedMotion(motionMedia.matches);
    };

    touchMedia.addEventListener('change', handleMediaChange);
    motionMedia.addEventListener('change', handleMediaChange);

    return () => {
      touchMedia.removeEventListener('change', handleMediaChange);
      motionMedia.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const dotSpacing = 42;
    const interactionRadius = 200;
    const maxDisplacement = 1.6;

    // Cache static grid drawing
    const drawStaticGrid = (w: number, h: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(120, 140, 145, 0.22)';
      const cols = Math.ceil(w / dotSpacing) + 1;
      const rows = Math.ceil(h / dotSpacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.beginPath();
          ctx.arc(i * dotSpacing, j * dotSpacing, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // High-DPI canvas resizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // Instantly redraw static background on orientation changes or resize
      if (isMobile || prefersReducedMotion) {
        drawStaticGrid(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse boundaries relative to viewport
    const handleMouseMove = (e: MouseEvent) => {
      cursor.current.targetX = e.clientX;
      cursor.current.targetY = e.clientY;
      cursor.current.active = 1;
    };

    const handleMouseLeave = () => {
      cursor.current.active = 0;
    };

    const handleMouseEnter = () => {
      cursor.current.active = 1;
    };

    // Event listeners are only bound if mouse interactions are supported
    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    const render = () => {
      if (!ctx || !canvas) return;

      // Skip updates when the tab is hidden
      if (document.hidden) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      // Draw static grid once and exit loop on mobile/reduced motion
      if (isMobile || prefersReducedMotion) {
        drawStaticGrid(width, height);
        animationFrameId.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Spring coordinate smoothing
      currentX.current += (cursor.current.targetX - currentX.current) * 0.08;
      currentY.current += (cursor.current.targetY - currentY.current) * 0.08;
      spotlightOpacity.current += (cursor.current.active - spotlightOpacity.current) * 0.08;

      // Update cursor spotlight position and opacity directly in the DOM
      const spotlight = spotlightRef.current;
      if (spotlight) {
        spotlight.style.transform = `translate3d(${currentX.current - 275}px, ${currentY.current - 275}px, 0)`;
        spotlight.style.opacity = spotlightOpacity.current.toFixed(3);
      }

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      const cX = currentX.current;
      const cY = currentY.current;
      const cActive = cursor.current.active;

      // Draw interactive dots
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const origX = i * dotSpacing;
          const origY = j * dotSpacing;

          const dx = origX - cX;
          const dy = origY - cY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let renderX = origX;
          let renderY = origY;
          let dotColor = 'rgba(120, 140, 145, 0.22)';
          let dotSize = 0.7;

          if (cActive > 0 && dist < interactionRadius) {
            const factor = 1 - dist / interactionRadius;
            
            // Subtle displacement away from cursor (max 1.6px)
            const angle = Math.atan2(dy, dx);
            const displacement = factor * maxDisplacement;
            
            renderX = origX + Math.cos(angle) * displacement;
            renderY = origY + Math.sin(angle) * displacement;

            // Blend color to the vibrant emerald-teal active color (rgba(0, 220, 165, 0.65))
            const opacity = 0.22 + factor * (0.65 - 0.22);
            const r = Math.round(120 + factor * (0 - 120));
            const g = Math.round(140 + factor * (220 - 140));
            const b = Math.round(145 + factor * (165 - 145));
            dotColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            dotSize = 0.7 + factor * 0.1;
          }

          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(renderX, renderY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    // visibility change observer to pause loop
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        if (!animationFrameId.current && !isMobile && !prefersReducedMotion) {
          animationFrameId.current = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Global touch tracking for mobile touch glow spotlight
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      document.documentElement.style.setProperty('--touch-x', `${touch.clientX}px`);
      document.documentElement.style.setProperty('--touch-y', `${touch.clientY}px`);
      document.documentElement.style.setProperty('--touch-active', '1');
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--touch-x', `${touch.clientX}px`);
        document.documentElement.style.setProperty('--touch-y', `${touch.clientY}px`);
      });
    };

    const handleTouchEnd = () => {
      document.documentElement.style.setProperty('--touch-active', '0');
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // Initial render
    if (isMobile || prefersReducedMotion) {
      drawStaticGrid(width, height);
    } else {
      animationFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#030303] overflow-hidden select-none pointer-events-none z-[0]"
    >
      {/* 1. Ambient Tint Corner Glows (z-index: 1, 9% opacity for visible depth) */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div 
          className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vh] rounded-full bg-emerald-500/[0.09] blur-[140px] pointer-events-none" 
          style={{
            animation: prefersReducedMotion ? 'none' : 'ambient-slow-1 50s infinite ease-in-out',
          }}
        />
        <div 
          className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vh] rounded-full bg-slate-600/[0.09] blur-[140px] pointer-events-none" 
          style={{
            animation: prefersReducedMotion ? 'none' : 'ambient-slow-2 60s infinite ease-in-out',
          }}
        />
      </div>

      {/* 2. Interactive Dot Grid Canvas (z-index: 2) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-[2]" />

      {/* 3. Soft Cursor Spotlight Radial Glow (z-index: 3, diameter 550px, center opacity 0.18, mid opacity 0.08) */}
      {!isMobile && !prefersReducedMotion && (
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none mix-blend-screen z-[3] opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(0, 220, 165, 0.18) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 70%)',
            willChange: 'transform, opacity',
          }}
        />
      )}

      {/* 4. Soft Touch Spotlight Radial Glow (z-index: 3, diameter 420px [360-460px range], opacity governed by CSS var transition) */}
      <div
        className="mobile-touch-glow fixed inset-0 pointer-events-none mix-blend-screen z-[3] opacity-0"
        style={{
          background: 'radial-gradient(210px circle at var(--touch-x, -999px) var(--touch-y, -999px), rgba(0, 220, 165, 0.12) 0%, rgba(16, 185, 129, 0.04) 45%, transparent 70%)',
          willChange: 'opacity',
        }}
      />

      <style jsx global>{`
        .mobile-touch-glow {
          opacity: var(--touch-active, 0);
          transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes ambient-slow-1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(30px, 20px, 0) scale(1.04); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes ambient-slow-2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-20px, -30px, 0) scale(0.96); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
};
