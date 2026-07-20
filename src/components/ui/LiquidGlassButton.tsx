'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  maxMovement?: number; // Magnetic coefficient
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  maxMovement = 5,
  type = 'button',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Magnetic motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 250, mass: 0.7 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Tracking reflection coordinates
  const coords = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, opacity: 0, targetOpacity: 0 });

  useEffect(() => {
    // Detect mobile touch pointer
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    const btn = buttonRef.current;
    const refl = reflectionRef.current;
    if (!btn || !refl) return;

    let frameId: number;

    const updateReflection = () => {
      // Linear interpolation for smoothing cursor highlight
      coords.current.currentX += (coords.current.targetX - coords.current.currentX) * 0.15;
      coords.current.currentY += (coords.current.targetY - coords.current.currentY) * 0.15;
      coords.current.opacity += (coords.current.targetOpacity - coords.current.opacity) * 0.15;

      refl.style.setProperty('--glass-x', `${coords.current.currentX}px`);
      refl.style.setProperty('--glass-y', `${coords.current.currentY}px`);
      refl.style.opacity = coords.current.opacity.toFixed(3);

      frameId = requestAnimationFrame(updateReflection);
    };

    frameId = requestAnimationFrame(updateReflection);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice) return;

    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    coords.current.targetX = relativeX;
    coords.current.targetY = relativeY;

    // Magnetic pull coordinates
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set((distanceX / (rect.width / 2)) * maxMovement);
    y.set((distanceY / (rect.height / 2)) * maxMovement);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    coords.current.targetOpacity = 1;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    coords.current.targetOpacity = 0;
    x.set(0);
    y.set(0);
  };

  // Glass materials styling matching visual goal parameters
  const baseStyles = variant === 'primary'
    ? 'bg-[rgba(16,185,129,0.16)] text-emerald-300 border-[rgba(0,220,165,0.38)] shadow-[0_8px_32px_rgba(0,0,0,0.55),_inset_0_1px_2px_rgba(255,255,255,0.22),_0_0_12px_rgba(0,220,165,0.15)] hover:bg-[rgba(16,185,129,0.26)] hover:border-[rgba(0,220,165,0.6)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.65),_inset_0_1px_2px_rgba(255,255,255,0.3),_0_0_18px_rgba(0,220,165,0.25)]'
    : 'bg-[rgba(18,24,26,0.58)] text-zinc-100 border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-[rgba(18,24,26,0.68)] hover:border-[rgba(255,255,255,0.26)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.7),_inset_0_1px_2px_rgba(255,255,255,0.2)] hover:text-white';

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        x: springX,
        y: springY,
        backdropFilter: 'blur(28px) saturate(150%) brightness(110%)',
        WebkitBackdropFilter: 'blur(28px) saturate(150%) brightness(110%)',
      }}
      animate={{
        scale: isPressed ? 0.975 : isHovered ? 1.02 : 1,
        y: isPressed ? 0 : isHovered ? -2 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 18,
      }}
      className={`relative inline-flex items-center justify-center rounded-full text-xs font-semibold tracking-wide border px-6 backdrop-blur-[28px] -webkit-backdrop-filter cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 overflow-hidden min-h-[40px] md:min-h-[38px] touch-target-touchable transition-colors duration-250 ${baseStyles} ${className}`}
    >
      {/* Top Edge Curved glass highlight bevel */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      
      {/* Specs / Specular reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      {/* Cursor-responsive radial highlight */}
      {!isTouchDevice && (
        <div
          ref={reflectionRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0"
          style={{
            background: variant === 'primary'
              ? 'radial-gradient(110px circle at var(--glass-x, 0px) var(--glass-y, 0px), rgba(0, 220, 165, 0.35), transparent 80%)'
              : 'radial-gradient(110px circle at var(--glass-x, 0px) var(--glass-y, 0px), rgba(255, 255, 255, 0.22), transparent 80%)',
            willChange: 'transform, opacity',
          }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
