'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { LiquidGlassButton } from '../ui/LiquidGlassButton';
import { Github, Linkedin } from '../ui/BrandIcons';

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

const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5 relative">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-5 h-[2px] bg-emerald-400 rounded-full block origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="w-5 h-[2px] bg-emerald-400 rounded-full block"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-5 h-[2px] bg-emerald-400 rounded-full block origin-center"
      />
    </div>
  );
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Nav container coordinates tracking refs
  const navRef = useRef<HTMLDivElement>(null);
  const navGlowRef = useRef<HTMLDivElement>(null);
  const navCoords = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, opacity: 0, targetOpacity: 0 });

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile nav on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Trap focus inside open mobile menu
  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return;
    }

    const focusableElements = menuRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

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

          {/* Mobile Navigation Trigger styled as a Liquid Glass button */}
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(18,24,26,0.58)] border border-[rgba(255,255,255,0.18)] shadow-[0_4px_12px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] active:scale-95 active:bg-[rgba(18,24,26,0.72)] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 backdrop-blur-md cursor-pointer select-none relative z-50"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            aria-label="Toggle menu"
          >
            {/* Top rim bevel */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <HamburgerIcon isOpen={isOpen} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Panel (supports scroll in landscape and iOS safe areas) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(10,12,14,0.68)] backdrop-blur-[24px] md:hidden overflow-y-auto flex flex-col no-print overscroll-behavior-y-contain border-b border-emerald-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top) + 6.5rem)',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 2.5rem)',
              paddingLeft: 'calc(env(safe-area-inset-left) + 1.5rem)',
              paddingRight: 'calc(env(safe-area-inset-right) + 1.5rem)',
            }}
          >
            {/* Vignette styling overlay inside panel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-[1]" />
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-[2]" />

            <div className="flex-grow flex flex-col justify-between gap-10 min-h-0 relative z-10">
              <div className="flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex items-center justify-start gap-3.5 w-full min-h-[56px] px-6 rounded-2xl border text-sm font-semibold tracking-wide transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 backdrop-blur-md select-none overflow-hidden active:scale-[0.98] ${
                          isActive
                            ? 'bg-[rgba(16,185,129,0.12)] border-[rgba(0,220,165,0.3)] text-emerald-300 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.15),_0_0_10px_rgba(16,185,129,0.08)]'
                            : 'bg-[rgba(18,24,26,0.38)] border-[rgba(255,255,255,0.08)] text-zinc-400 hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] active:bg-[rgba(18,24,26,0.58)] active:border-[rgba(255,255,255,0.15)]'
                        }`}
                        style={{
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                        }}
                      >
                        {/* Top reflection highlight */}
                        <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/${isActive ? '16' : '8'} to-transparent pointer-events-none`} />

                        {/* Glow indicator on active */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                        )}

                        <span className="relative z-10 flex items-center gap-3">
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 mt-auto"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="relative flex items-center justify-center w-full min-h-[56px] rounded-2xl bg-gradient-to-b from-[rgba(16,185,129,0.25)] to-[rgba(16,185,129,0.08)] border border-[rgba(0,220,165,0.55)] text-emerald-300 font-semibold text-sm tracking-wider uppercase shadow-[0_8px_32px_rgba(0,0,0,0.6),_inset_0_1px_2px_rgba(255,255,255,0.25),_0_0_18px_rgba(0,220,165,0.25)] active:scale-[0.97] active:shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-all duration-300 backdrop-blur-md overflow-hidden"
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Highlight Bevel */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  
                  {/* Internal Glow Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,220,165,0.2)_0%,transparent_70%)] pointer-events-none" />

                  Get in Touch
                </Link>

                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/deepjpatel2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(18,24,26,0.58)] border border-[rgba(255,255,255,0.18)] shadow-[0_4px_12px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 backdrop-blur-md text-zinc-400 hover:text-emerald-400"
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/deeppatel2007/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(18,24,26,0.58)] border border-[rgba(255,255,255,0.18)] shadow-[0_4px_12px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 backdrop-blur-md text-zinc-400 hover:text-emerald-400"
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
