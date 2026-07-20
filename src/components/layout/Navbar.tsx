'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';
import { LiquidGlassButton } from '../ui/LiquidGlassButton';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Awards', path: '/awards' },
  { name: 'Resume', path: '/resume' },
  { name: 'Contact', path: '/contact' }
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Nav container coordinates tracking refs
  const navRef = useRef<HTMLDivElement>(null);
  const navGlowRef = useRef<HTMLDivElement>(null);
  const navCoords = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, opacity: 0, targetOpacity: 0 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // RequestAnimationFrame loop for smoothing cursor spotlight inside navigation container
  useEffect(() => {
    const navEl = navRef.current;
    const glowEl = navGlowRef.current;
    if (!navEl || !glowEl) return;

    let frameId: number;

    const updateGlow = () => {
      // Easing / spring interpolation
      navCoords.current.currentX += (navCoords.current.targetX - navCoords.current.currentX) * 0.15;
      navCoords.current.currentY += (navCoords.current.targetY - navCoords.current.currentY) * 0.15;
      navCoords.current.opacity += (navCoords.current.targetOpacity - navCoords.current.opacity) * 0.15;

      // Inject coordinates into custom CSS properties directly in DOM
      glowEl.style.setProperty('--glass-x', `${navCoords.current.currentX}px`);
      glowEl.style.setProperty('--glass-y', `${navCoords.current.currentY}px`);
      glowEl.style.opacity = navCoords.current.opacity.toFixed(3);

      frameId = requestAnimationFrame(updateGlow);
    };

    frameId = requestAnimationFrame(updateGlow);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    const navEl = navRef.current;
    if (!navEl) return;
    const rect = navEl.getBoundingClientRect();
    navCoords.current.targetX = e.clientX - rect.left;
    navCoords.current.targetY = e.clientY - rect.top;
  };

  const handleNavMouseEnter = () => {
    if (isTouchDevice) return;
    navCoords.current.targetOpacity = 1;
  };

  const handleNavMouseLeave = () => {
    navCoords.current.targetOpacity = 0;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
          scrolled
            ? 'py-3 bg-[rgba(14,18,20,0.48)] border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.65)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(30px) saturate(150%) brightness(105%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(30px) saturate(150%) brightness(105%)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-lg">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-emerald-500/50">
              <Cpu className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <div className="absolute inset-0 rounded-lg bg-emerald-500/10 opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              DEEP<span className="text-emerald-500">.</span>PATEL
            </span>
          </Link>

          {/* Desktop Navigation Container styled as an Enhanced Liquid-Glass Pill */}
          <nav 
            ref={navRef}
            onMouseMove={handleNavMouseMove}
            onMouseEnter={handleNavMouseEnter}
            onMouseLeave={handleNavMouseLeave}
            className="relative hidden md:flex items-center gap-1 bg-[rgba(14,18,20,0.52)] border border-[rgba(255,255,255,0.18)] rounded-full p-1.5 shadow-[0_12_40px_rgba(0,0,0,0.65),_inset_0_1px_2px_rgba(255,255,255,0.20)] overflow-hidden"
            style={{
              backdropFilter: 'blur(30px) saturate(150%) brightness(108%)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%) brightness(108%)',
            }}
          >
            {/* Top bevel highlight line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Surface glare gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            {/* Specular cursor-responsive reflection highlight */}
            {!isTouchDevice && (
              <div
                ref={navGlowRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0"
                style={{
                  background: 'radial-gradient(110px circle at var(--glass-x, 0px) var(--glass-y, 0px), rgba(255, 255, 255, 0.22), transparent 80%)',
                  willChange: 'transform, opacity',
                }}
              />
            )}

            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  {/* Active capsule styling: a smaller glass capsule floating inside main pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-emerald-500/[0.14] border border-[rgba(0,220,165,0.35)] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.18),_0_0_12px_rgba(0,220,165,0.18)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? 'text-emerald-400 font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side CTA wrapped in our primary LiquidGlassButton */}
          <div className="hidden md:block">
            <Link href="/contact">
              <LiquidGlassButton variant="primary" className="px-4 py-1.5 text-[11px] uppercase tracking-wider font-bold">
                Get in Touch
              </LiquidGlassButton>
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-zinc-900 bg-zinc-950/80 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-28 px-6 flex flex-col justify-between pb-10 no-print"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={`block text-2xl font-semibold tracking-tight py-2 border-b border-zinc-900 ${
                        isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/contact"
                className="w-full text-center py-3 rounded-xl bg-emerald-500 text-zinc-950 font-medium hover:bg-emerald-400 transition-colors"
              >
                Get in Touch
              </Link>
              <div className="flex justify-center gap-6 text-sm text-zinc-500 font-mono">
                <a href="https://github.com/deepjpatel2007" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">GH</a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/deeppatel2007/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">LI</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
