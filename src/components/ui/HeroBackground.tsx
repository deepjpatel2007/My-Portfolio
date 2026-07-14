'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const HeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion values for the spring-smoothed mouse tracking (parallax)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking coordinates with natural lag/inertia
  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized relative position (-0.5 to 0.5)
      const relativeX = (e.clientX - left) / width - 0.5;
      const relativeY = (e.clientY - top) / height - 0.5;

      // Map to subtle translation ranges (-20px to 20px)
      mouseX.set(relativeX * 40);
      mouseY.set(relativeY * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#030303] select-none pointer-events-none -z-30"
    >
      {/* LAYER 1: Solid Dark Base Background */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* LAYER 2: Subtle Vector Engineering Grid */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>

      {/* LAYER 3 & 4: Slowly Drifting Blurred Aurora Blobs (emerald/teal) */}
      <div className="absolute inset-0 blur-[130px] opacity-[0.25] mix-blend-screen">
        {/* Blob 1: Emerald Left Top */}
        <div 
          className="absolute -top-[10%] -left-[5%] w-[450px] h-[450px] rounded-full bg-emerald-500/30 animate-slow-blob-1"
        />
        {/* Blob 2: Teal Right Bottom */}
        <div 
          className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-teal-500/25 animate-slow-blob-2"
        />
        {/* Blob 3: Center Ambient Accent */}
        <div 
          className="absolute top-[35%] left-[30%] w-[350px] h-[350px] rounded-full bg-emerald-600/20 animate-slow-blob-3"
        />
      </div>

      {/* LAYER 5: Animated Micro Film Grain Noise Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[200px] bg-noise bg-[size:150px_150px] opacity-[0.012] animate-noise" />
      </div>

      {/* LAYER 6: Mouse Responsive Radial Hover Light (Subtle Parallax) */}
      <motion.div 
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute inset-0 bg-[radial-gradient(400px_circle_at_center,_rgba(16,_185,_129,_0.045),_transparent_70%)] mix-blend-screen"
      />

      {/* VIGNETTE SHADER: Smoothly fades edges into black layout grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#030303_100%)] opacity-[0.95]" />

      <style jsx global>{`
        /* Looping animations for the drift blobs (transforms only, no repaint) */
        @keyframes slow-blob-1 {
          0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(40px, 30px, 0) scale(1.08) rotate(180deg); }
          100% { transform: translate3d(0, 0, 0) scale(1) rotate(360deg); }
        }
        @keyframes slow-blob-2 {
          0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(-30px, -40px, 0) scale(0.92) rotate(-180deg); }
          100% { transform: translate3d(0, 0, 0) scale(1) rotate(-360deg); }
        }
        @keyframes slow-blob-3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, -20px, 0) scale(1.15); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes noise-shift {
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

        .animate-slow-blob-1 {
          animation: slow-blob-1 35s infinite ease-in-out;
        }
        .animate-slow-blob-2 {
          animation: slow-blob-2 45s infinite ease-in-out;
        }
        .animate-slow-blob-3 {
          animation: slow-blob-3 40s infinite ease-in-out;
        }
        .animate-noise {
          animation: noise-shift 0.12s steps(6) infinite;
        }
        
        /* Base64 Noise Background Pattern */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};
