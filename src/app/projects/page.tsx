'use client';

import React, { useState } from 'react';
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
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-semibold font-mono transition-colors duration-300 border cursor-pointer outline-none ${
              activeFilter === category
                ? 'border-emerald-500/20 text-emerald-400'
                : 'border-white/5 bg-zinc-950/25 text-zinc-400 hover:text-white hover:border-white/12 backdrop-blur-md'
            }`}
          >
            {activeFilter === category && (
              <motion.span
                layoutId="active-filter-indicator"
                className="absolute inset-0 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),_0_0_8px_rgba(16,185,129,0.12)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
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
