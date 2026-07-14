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
          Bridging the physical and digital worlds through low-level firmware engineering and modern software applications.
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
            Hi, I'm <strong className="text-white font-medium">Deep Patel</strong>, a Computer Engineering student at the <strong className="text-white font-medium">University of Guelph</strong> with a passion for designing software and embedded systems that solve real-world problems.
          </p>
          <p>
            I enjoy building projects that combine hardware and software, from Arduino-based autonomous systems to full-stack web applications. Through my coursework, engineering design projects, competitions, and personal development, I've gained experience developing solutions using <strong className="text-emerald-400 font-medium">C/C++, Java, JavaScript, React, TypeScript, SQL, and Arduino</strong> while strengthening my skills in software development, system design, debugging, and problem-solving.
          </p>
          <p>
            My interests span software engineering, embedded systems, automation, robotics, and artificial intelligence. I enjoy taking an idea from concept to implementation, whether that involves programming microcontrollers, designing application logic, integrating sensors, or creating intuitive user interfaces. I believe the most rewarding engineering projects are those that have a practical impact and improve the way people interact with technology.
          </p>
          <p>
            Outside the classroom, I continuously expand my technical skills by building personal projects, participating in engineering competitions, contributing to GitHub, and exploring new technologies. I enjoy learning modern development practices and challenging myself with increasingly complex projects that strengthen both my software and hardware engineering abilities.
          </p>
          <p>
            I am currently seeking internship opportunities in <strong className="text-emerald-400 font-medium">Software Engineering, Embedded Systems, Automation, and Full-Stack Development</strong>, where I can contribute to meaningful projects, collaborate with experienced engineers, and continue growing as a developer.
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
                  <p className="text-xs text-zinc-500 font-mono">Dean's Honours List Recipient</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-4 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Core Focus Areas:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {["Embedded C/C++", "RTOS Architecture", "PCB Route & Schematics", "Robotics (SLAM)", "Full-Stack Web", "CAN Bus / Telemetry"].map(tag => (
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
