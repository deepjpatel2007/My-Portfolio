'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Orbit } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { projects } from '@/data/projects';
import { Github } from '@/components/ui/BrandIcons';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

type FilterCategory = 'All' | 'Embedded' | 'Software' | 'Robotics';

interface FilterButtonProps {
  category: FilterCategory;
  activeFilter: FilterCategory;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ category, activeFilter, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice) return;
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    coords.current.targetX = e.clientX - rect.left;
    coords.current.targetY = e.clientY - rect.top;
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    coords.current.targetOpacity = 0.7; // ~30% intensity reduction on spotlight hover opacity
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    coords.current.targetOpacity = 0;
  };

  const isActive = activeFilter === category;

  // Reduced intensity styles compared to main CTA button:
  // - Lighter/more transparent background opacity
  // - 20px blur (instead of 28px)
  // - Softer active glows and borders
  const baseStyles = isActive
    ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.45),_inset_0_1px_1px_rgba(255,255,255,0.12),_0_0_8px_rgba(16,185,129,0.08)]'
    : 'border-white/5 bg-zinc-950/25 text-zinc-400 hover:text-zinc-200 hover:border-white/10 hover:bg-zinc-900/35 hover:shadow-[0_4px_16px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.08)]';

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative px-4 py-1.5 rounded-full text-xs font-semibold font-mono transition-all duration-300 border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 overflow-hidden backdrop-blur-md -webkit-backdrop-filter ${baseStyles}`}
      style={{
        backdropFilter: 'blur(20px) saturate(130%) brightness(105%)', // Softer backdrop filter variables
        WebkitBackdropFilter: 'blur(20px) saturate(130%) brightness(105%)',
      }}
    >
      {/* Top Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Active layout indicator */}
      {isActive && (
        <motion.span
          layoutId="active-filter-indicator"
          className="absolute inset-0 bg-emerald-500/[0.06] border border-emerald-500/15 rounded-full"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* Reduced scale spotlight (80px circle vs 110px circle, 0.16 alpha vs 0.22) */}
      {!isTouchDevice && (
        <div
          ref={reflectionRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0"
          style={{
            background: 'radial-gradient(80px circle at var(--glass-x, 0px) var(--glass-y, 0px), rgba(255, 255, 255, 0.16), transparent 80%)',
            willChange: 'transform, opacity',
          }}
        />
      )}

      <span className="relative z-10">{category}</span>
    </button>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  // Filter project lists
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Embedded': return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Software': return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Robotics': return <Orbit className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 flex flex-col gap-12">
      
      {/* 1. Header Area */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col gap-4 border-b border-zinc-900 pb-8"
      >
        <motion.span variants={fadeInUp} className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
          Work Showcase
        </motion.span>
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          Engineering Projects
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          A curated collection of systems I have designed, modeled, programmed, and built.
        </motion.p>
      </motion.div>

      {/* 2. Category Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-2"
      >
        {(['All', 'Embedded', 'Software', 'Robotics'] as FilterCategory[]).map((category) => (
          <FilterButton
            key={category}
            category={category}
            activeFilter={activeFilter}
            onClick={() => setActiveFilter(category)}
          />
        ))}
      </motion.div>

      {/* 3. Projects Grid List */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.slug}
            >
              <Card className="group flex flex-col justify-between h-full overflow-hidden border border-zinc-900 bg-zinc-950/40">
                
                {/* Dynamic Cover Image */}
                <div className="relative w-full h-52 overflow-hidden border-b border-zinc-900/60 bg-zinc-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
                </div>

                {/* Content Block */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase tracking-wider">
                        {getCategoryIcon(project.category)}
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 mt-8">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* View GitHub Repository Action Button */}
                    <div className="border-t border-zinc-900/60 pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block outline-none"
                      >
                        <LiquidGlassButton variant="secondary" className="w-full font-mono text-[10px] tracking-wider">
                          <Github className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                          VIEW REPOSITORY
                        </LiquidGlassButton>
                      </a>
                    </div>
                  </div>
                </div>

              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
