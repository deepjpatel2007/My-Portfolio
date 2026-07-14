'use client';

import React from 'react';

export const AmbientOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden blur-[130px] opacity-[0.38] mix-blend-screen pointer-events-none -z-20">
      {/* Orb 1: Emerald (Behind Left Text Region) */}
      <div 
        className="absolute top-[5%] left-[5%] w-[480px] h-[480px] rounded-full bg-emerald-500/25 animate-orb-slow-1"
      />
      {/* Orb 2: Teal (Behind Right Portrait Region) */}
      <div 
        className="absolute top-[25%] right-[10%] w-[520px] h-[520px] rounded-full bg-teal-500/22 animate-orb-slow-2"
      />
      {/* Orb 3: Blue-Gray / Slate (Lower-Middle Depth Glow) */}
      <div 
        className="absolute bottom-[5%] left-[20%] w-[450px] h-[450px] rounded-full bg-zinc-500/18 animate-orb-slow-3"
      />

      <style jsx global>{`
        @keyframes orb-slow-1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(30px, -40px, 0) scale(1.1); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes orb-slow-2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-40px, 20px, 0) scale(0.95); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes orb-slow-3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, 30px, 0) scale(1.05); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        .animate-orb-slow-1 {
          animation: orb-slow-1 28s infinite ease-in-out;
        }
        .animate-orb-slow-2 {
          animation: orb-slow-2 36s infinite ease-in-out;
        }
        .animate-orb-slow-3 {
          animation: orb-slow-3 42s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
