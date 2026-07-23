'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-16">
      
      {/* 1. Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col gap-4 border-b border-zinc-900 pb-8"
      >
        <motion.span variants={fadeInUp} className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
          Profile
        </motion.span>
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          About Me
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          Bridging the physical and digital worlds through embedded systems programming and software engineering.
        </motion.p>
      </motion.div>

      {/* 2. Core Bio Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
      >
        {/* Left Side: Long-form bio */}
        <motion.div variants={fadeInUp} className="md:col-span-2 flex flex-col gap-6 text-zinc-400 text-sm md:text-base font-light leading-relaxed">
          <p>
            I am a Computer Engineering student at the <strong className="text-white font-medium">University of Guelph</strong>. I focus on bridging hardware and software, designing applications and embedded systems that work reliably and solve practical engineering problems.
          </p>
          <p>
            My path into engineering began with a curiosity about how devices function behind their enclosures. Prototyping simple circuits and writing my first scripts to blink LEDs opened up a world of hardware-software integration. That curiosity evolved into a formal study of computer engineering, learning how low-level drivers, data structures, and algorithms work together.
          </p>
          <p>
            Today, I enjoy building modular software systems and interactive robotics projects. Whether I am writing non-blocking microcontroller firmware in C/C++, building object-oriented applications in Java, or developing responsive full-stack interfaces with React and TypeScript, I emphasize clean architecture, thorough debugging, and system optimization.
          </p>
          <p>
            I am currently seeking <strong className="text-emerald-400 font-medium">Software Engineering, Embedded Systems, and Automation</strong> internship opportunities. I am eager to apply my technical skills to production codebases, collaborate with multidisciplinary engineering teams, and contribute to building systems at scale.
          </p>
        </motion.div>

        {/* Right Side: Quick info card */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
          {/* Profile Photo Card */}
          <Card className="p-2 overflow-hidden bg-zinc-950/60 border border-zinc-900 shadow-2xl rounded-2xl relative group">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-950">
              <img
                src="/images/profile.jpg"
                alt="Deep Patel"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[0.85] group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Card>

          <Card className="p-6 flex flex-col gap-6">
            <h2 className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">
              Academic Background
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <BookOpen className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white">University of Guelph</h3>
                  <p className="text-xs text-zinc-500 font-mono">B.Eng. in Computer Engineering</p>
                  <p className="text-xs text-zinc-500 font-mono">Sept 2025 - Present</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Academic Highlights</h3>
                  <p className="text-xs text-zinc-500 font-mono">GPA: 4.0/4.0</p>
                  <p className="text-xs text-zinc-500 font-mono">Dean's Honours List Recipient – Fall 2025 and Winter 2026</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-4 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Core Focus Areas:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {["Embedded C/C++", "Software Engineering", "Hardware-Software Integration", "Robotics & Automation", "Full-Stack Web", "Circuit Prototyping"].map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* 3. Action Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white tracking-tight">Want to review my coursework and files?</h3>
          <p className="text-zinc-400 text-xs md:text-sm font-light">My resume contains a complete breakdown of my academic qualifications.</p>
        </div>
        <Link
          href="/resume"
          className="px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors shrink-0"
        >
          View Interactive Resume
        </Link>
      </motion.div>

    </div>
  );
}
