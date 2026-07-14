'use client';

import React, { useRef, useEffect, useState } from 'react';
import { AmbientOrbs } from './AmbientOrbs';
import { InteractiveDotGrid } from './InteractiveDotGrid';
import { CursorSpotlight } from './CursorSpotlight';

// Set to true for interactive engineering diagnostic mode
const DEBUG_INTERACTIONS = true;

export const InteractiveHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Debug element refs to update layout at 60 FPS without React re-renders
  const debugPointerRef = useRef<HTMLSpanElement>(null);
  const debugCoordsRef = useRef<HTMLSpanElement>(null);
  const debugSizeRef = useRef<HTMLSpanElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Shared cursor coordinate ref to avoid triggering React re-renders on mousemove
  const cursorRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: 0 // 1 when mouse is inside, 0 when outside
  });

  useEffect(() => {
    // Detect reduced motion preferences
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    media.addEventListener('change', handleMediaChange);

    // Global cursor tracking relative to the hero section bounding box
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      
      // Check if cursor coordinates lie inside the hero container bounds
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        cursorRef.current.active = 1;
        
        // Compute relative coordinates
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        
        cursorRef.current.targetX = relX;
        cursorRef.current.targetY = relY;

        if (DEBUG_INTERACTIONS && debugCoordsRef.current && debugPointerRef.current) {
          debugPointerRef.current.textContent = 'INSIDE HERO';
          debugPointerRef.current.className = 'text-emerald-400 font-bold';
          debugCoordsRef.current.textContent = `X: ${Math.round(relX)}, Y: ${Math.round(relY)}`;
        }
      } else {
        cursorRef.current.active = 0;
        
        if (DEBUG_INTERACTIONS && debugCoordsRef.current && debugPointerRef.current) {
          debugPointerRef.current.textContent = 'OUTSIDE HERO';
          debugPointerRef.current.className = 'text-zinc-500';
          debugCoordsRef.current.textContent = 'X: 0, Y: 0';
        }
      }
    };

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      if (DEBUG_INTERACTIONS && debugSizeRef.current) {
        debugSizeRef.current.textContent = `${container.clientWidth}px x ${container.clientHeight}px (DPR: ${window.devicePixelRatio || 1})`;
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Initial dimensions check
    handleResize();

    return () => {
      media.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-[#030303] overflow-hidden select-none pointer-events-none z-0"
    >
      {/* Layer 1: Drifting Ambient Orbs (z-index: z-1) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <AmbientOrbs />
      </div>

      {/* Layer 2: Interactive Dot Grid Canvas (z-index: z-2) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <InteractiveDotGrid cursorRef={cursorRef} />
      </div>

      {/* Layer 3: Faint Animated Noise Grain Film (z-index: z-3) */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        <div className="absolute -inset-[200px] bg-noise bg-[size:150px_150px] opacity-[0.015] animate-noise-shift" />
      </div>

      {/* Layer 4: Cursor Spotlight Radial Glow (z-index: z-4) */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        <CursorSpotlight cursorRef={cursorRef} />
      </div>

      {/* Vignette: Soft shading around edges to establish frame depth (z-index: z-5) */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,_transparent_55%,_#030303_100%)] opacity-[0.55] pointer-events-none" />

      {/* Development Debug Overlay */}
      {DEBUG_INTERACTIONS && (
        <div 
          className="absolute top-20 left-4 z-[999] p-3.5 bg-zinc-950/95 border border-emerald-500/25 rounded-xl text-[10px] font-mono text-emerald-400 pointer-events-none flex flex-col gap-1.5 shadow-[0_12px_45px_rgba(0,0,0,0.8)] backdrop-blur-md"
          style={{ minWidth: '220px' }}
        >
          <div className="font-bold text-white border-b border-emerald-500/20 pb-1.5 mb-1 flex items-center justify-between">
            <span>HERO DEBUG MATRIX</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>Pointer: <span ref={debugPointerRef} className="text-zinc-500">OUTSIDE HERO</span></div>
          <div>Coords: <span ref={debugCoordsRef} className="text-zinc-400">X: 0, Y: 0</span></div>
          <div>Canvas Size: <span ref={debugSizeRef} className="text-zinc-400">0 x 0</span></div>
          <div>Reduced Motion: <span className="text-zinc-400">{prefersReducedMotion ? 'Active (Disabled animations)' : 'Inactive (Smooth mode)'}</span></div>
          <div>Canvas Loop: <span className="text-emerald-300 font-bold">ACTIVE (60 FPS)</span></div>
        </div>
      )}

      <style jsx global>{`
        @keyframes noise-shift-kf {
          0% { transform: translate3d(0, 0, 0); }
          10% { transform: translate3d(-10px, -10px, 0); }
          20% { transform: translate3d(9px, -18px, 0); }
          30% { transform: translate3d(-9px, 9px, 0); }
          40% { transform: translate3d(18px, 18px, 0); }
          50% { transform: translate3d(-18px, 9px, 0); }
          60% { transform: translate3d(9px, -9px, 0); }
          70% { transform: translate3d(-9px, 18px, 0); }
          80% { transform: translate3d(18px, -18px, 0); }
          90% { transform: translate3d(-18px, -9px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        
        .animate-noise-shift {
          animation: noise-shift-kf 0.12s steps(6) infinite;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};
