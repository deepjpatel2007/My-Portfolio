'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { experiences } from '@/data/experience';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function ExperiencePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-12">
      
      {/* 1. Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col gap-4 border-b border-zinc-900 pb-8"
      >
        <motion.span variants={fadeInUp} className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
          Timeline
        </motion.span>
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          Professional Experience
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          Work history, academic appointments, and student team leadership.
        </motion.p>
      </motion.div>

      {/* 2. Timeline Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative pl-6 md:pl-10 before:absolute before:left-2.5 md:before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-900 flex flex-col gap-10"
      >
        {experiences.map((exp) => {
          // Identify work vs academic roles for node icons
          const isAcademic = exp.id.includes('uofg') || exp.id.includes('gryphon');

          return (
            <motion.div 
              key={exp.id}
              variants={fadeInUp}
              className="relative group"
            >
              {/* Node Icon on Timeline Line */}
              <div className="absolute -left-[30px] md:-left-[43px] top-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-all duration-300 z-10 shadow-lg">
                {isAcademic ? (
                  <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                ) : (
                  <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                )}
              </div>

              {/* Experience Card */}
              <Card className="p-6 md:p-8 flex flex-col gap-6">
                
                {/* Role Details */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 border-b border-zinc-900/60 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
                      {isAcademic ? 'Academic & Extracurricular' : 'Industry Internship'}
                    </span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                      {exp.role} <span className="text-zinc-500 font-normal">at</span> <span className="text-emerald-400">{exp.company}</span>
                    </h2>
                  </div>
                  
                  {/* Calendar / Location metadata */}
                  <div className="flex flex-col items-start md:items-end gap-1.5 text-zinc-500 text-xs font-mono shrink-0 md:text-right">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400/80" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400/80" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Performance Bullets */}
                <ul className="flex flex-col gap-2.5 list-disc pl-4 text-zinc-400 text-sm font-light leading-relaxed">
                  {exp.description.map((bullet, index) => (
                    <li key={index} className="marker:text-emerald-500/70">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="flex flex-col gap-2 border-t border-zinc-900/60 pt-4 mt-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Technologies & Hardware Utilized</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {exp.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-zinc-950 border border-zinc-900 text-zinc-300 hover:text-emerald-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </Card>
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  );
}
