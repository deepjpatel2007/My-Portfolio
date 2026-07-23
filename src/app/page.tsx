'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  FileText, 
  ChevronDown,
  Download
} from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { Card } from '@/components/ui/Card';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';
import { LiquidGlassIconButton } from '@/components/ui/LiquidGlassIconButton';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';

// Fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const textReveal = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export default function Home() {
  // Select featured projects
  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);
  
  // Select latest 2 experiences
  const recentExperiences = experiences.slice(0, 2);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION WITH LAYERED ANIMATED BACKGROUND */}
      <div 
        className="relative z-10 w-full overflow-hidden flex justify-center border-b border-zinc-900/40"
      >
        
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 min-h-[85vh] flex flex-col justify-center pt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
            
            {/* Left info column */}
            <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex flex-col gap-3"
              >
                {/* Top Tagline */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                    Open for Internships
                  </span>
                </motion.div>

                {/* Title */}
                <div className="overflow-hidden py-1">
                  <motion.h1 
                    variants={textReveal}
                    className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white"
                  >
                    Deep Patel
                  </motion.h1>
                </div>

                {/* Sub-headings */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-lg sm:text-2xl md:text-3xl font-medium text-zinc-400"
                >
                  <span>Computer Engineering Student</span>
                </motion.div>
              </motion.div>

              {/* Bio statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light"
              >
                As a Computer Engineering student at the University of Guelph, I design and build software and embedded systems that combine hardware, automation, and modern web technologies to solve practical engineering problems.
              </motion.p>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap items-center gap-3 pt-4"
              >
                <Link href="/projects" className="outline-none">
                  <LiquidGlassButton variant="primary" maxMovement={5} className="group">
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </LiquidGlassButton>
                </Link>

                <a href="/Deep_Patel_Resume.pdf" download="Deep_Patel_Resume.pdf" className="outline-none">
                  <LiquidGlassButton variant="secondary" maxMovement={5}>
                    <Download className="w-4 h-4 text-emerald-400" />
                    Download Resume
                  </LiquidGlassButton>
                </a>

                <a 
                  href="https://drive.google.com/file/d/1FyJ-L8szpSd4iyib2nGLU9SALGVsuPBc/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="outline-none"
                >
                  <LiquidGlassButton variant="secondary" maxMovement={5}>
                    <FileText className="w-4 h-4 text-zinc-400" />
                    View Resume
                  </LiquidGlassButton>
                </a>

                <div className="flex items-center gap-2.5 ml-2 sm:ml-4 border-l border-zinc-900 pl-4 sm:pl-6 py-1.5">
                  <LiquidGlassIconButton 
                    href="https://github.com/deepjpatel2007" 
                    title="GitHub"
                    maxMovement={6}
                  >
                    <Github className="w-4.5 h-4.5" />
                  </LiquidGlassIconButton>
                  <LiquidGlassIconButton 
                    href="https://www.linkedin.com/in/deeppatel2007/" 
                    title="LinkedIn"
                    maxMovement={6}
                  >
                    <Linkedin className="w-4.5 h-4.5" />
                  </LiquidGlassIconButton>
                </div>
              </motion.div>
            </div>

            {/* Right profile picture column (static and stable) */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div 
                className="relative group w-60 h-60 sm:w-68 sm:h-68 md:w-80 md:h-80 shrink-0"
              >
                
                {/* Soft breathing radial glow behind profile picture */}
                <div 
                  className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] animate-profile-glow pointer-events-none" 
                />
                
                {/* Outer decorative ring */}
                <div className="absolute -inset-2.5 rounded-full border border-dashed border-zinc-800/60 group-hover:border-emerald-500/20 group-hover:rotate-12 transition-all duration-1000 ease-out pointer-events-none" />
                
                {/* Main Circular Frame with Double Border */}
                <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:border-emerald-500/40">
                  
                  {/* Inner container to ensure perfect round crop */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950">
                    <img
                      src="/images/profile.jpg"
                      alt="Deep Patel Profile"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] filter saturate-[0.8] group-hover:saturate-100"
                    />
                    {/* Glass highlight glare overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* Subtle vignette/shading shadow */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/20 rounded-full pointer-events-none" />
                  </div>
                  
                </div>
              </div>
            </div>

          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hidden md:flex flex-col items-center gap-2 text-zinc-600 font-mono text-[10px] tracking-widest mt-12 mb-4 pointer-events-none"
          >
            <span>SCROLL DOWN</span>
            <ChevronDown className="w-4 h-4 text-zinc-500 animate-bounce" />
          </motion.div>
        </section>
      </div>

      {/* 2. FEATURED PROJECTS SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 border-t border-zinc-900/60">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Case Studies</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-2">Featured Projects</h2>
            </div>
            <Link 
              href="/projects" 
              className="group flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Explore all engineering work 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredProjects.map((project, idx) => (
              <Card key={project.slug} className="group flex flex-col justify-between h-full overflow-hidden border border-zinc-900 bg-zinc-950/40">
                
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
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-zinc-600 text-xs font-mono">0{idx + 1}</span>
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
                      {project.techStack.slice(0, 5).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-600">
                          +{project.techStack.length - 5} more
                        </span>
                      )}
                    </div>
                    
                    {/* View GitHub Repository Action Button */}
                    <div className="border-t border-zinc-900/60 pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-zinc-950/40 border border-white/5 backdrop-blur-md -webkit-backdrop-filter text-zinc-200 font-semibold hover:border-white/12 hover:bg-zinc-900/55 hover:text-white transition-all duration-300 font-mono text-[10px] tracking-wider cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden relative"
                      >
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                        <Github className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        VIEW REPOSITORY
                      </a>
                    </div>
                  </div>
                </div>

              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE TIMELINE PREVIEW */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 border-t border-zinc-900/60">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Milestones</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-2">Professional Growth</h2>
            </div>
            <Link 
              href="/experience" 
              className="group flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              See complete timeline 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-900">
            {recentExperiences.map((exp) => (
              <div key={exp.id} className="relative pl-12 group">
                {/* Vertical timeline node dot */}
                <div className="absolute left-2.5 top-2.5 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-emerald-500 transition-colors duration-300 z-10" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {exp.role} <span className="text-zinc-500 font-normal">at</span> <span className="text-emerald-400">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{exp.location}</span>
                  <p className="text-zinc-400 text-sm font-light mt-2 max-w-3xl leading-relaxed">
                    {exp.description[0]} {/* Display first highlight point in home preview */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 border-t border-zinc-900/60 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/40 p-8 md:p-16 flex flex-col items-center gap-6"
        >
          {/* Radial gradient background accent for callout */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent -z-10 pointer-events-none" />
          
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Available for Internships</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-xl">
            Let's collaborate on the next engineering breakthrough.
          </h2>
          <p className="text-zinc-400 max-w-md text-sm md:text-base font-light leading-relaxed">
            I am seeking Software Engineering and Embedded Systems internships. Let's discuss how I can contribute to your team.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link href="/contact" className="outline-none">
              <LiquidGlassButton variant="primary">
                Get in Touch
              </LiquidGlassButton>
            </Link>
            <Link href="/about" className="outline-none">
              <LiquidGlassButton variant="secondary">
                Learn More
              </LiquidGlassButton>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
