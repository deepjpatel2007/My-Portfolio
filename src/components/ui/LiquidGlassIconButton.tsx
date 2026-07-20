'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface LiquidGlassIconButtonProps {
  children: React.ReactNode;
  href: string;
  title?: string;
  className?: string;
  maxMovement?: number;
  target?: string;
}

export const LiquidGlassIconButton: React.FC<LiquidGlassIconButtonProps> = ({
  children,
  href,
  title = '',
  className = '',
  maxMovement = 6,
  target = '_blank'
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
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

  const coords = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, opacity: 0, targetOpacity: 0 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    const btn = buttonRef.current;
    const refl = reflectionRef.current;
    if (!btn || !refl) return;

    let frameId: number;

    const updateReflection = () => {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice) return;

    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    coords.current.targetX = relativeX;
    coords.current.targetY = relativeY;

    // Apply magnetic pull
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

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target={target}
      rel="noopener noreferrer"
      title={title}
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
        scale: isPressed ? 0.97 : isHovered ? 1.04 : 1,
        y: isPressed ? 0 : isHovered ? -2 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 18,
      }}
      className={`relative flex items-center justify-center rounded-full bg-[rgba(18,24,26,0.58)] border border-[rgba(255,255,255,0.18)] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),_0_0_12px_rgba(16,185,129,0.2)] transition-colors duration-250 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 overflow-hidden w-10 h-10 md:w-9 md:h-9 touch-target-touchable shrink-0 ${className}`}
    >
      {/* Top Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Surface glare streak */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      {/* Cursor-responsive reflection follower */}
      {!isTouchDevice && (
        <div
          ref={reflectionRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0"
          style={{
            background: 'radial-gradient(40px circle at var(--glass-x, 0px) var(--glass-y, 0px), rgba(255, 255, 255, 0.22), transparent 80%)',
            willChange: 'transform, opacity',
          }}
        />
      )}

      {/* Content Icon */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.a>
  );
};
