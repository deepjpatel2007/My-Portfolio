'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Code, 
  Terminal, 
  FileCode, 
  FileJson, 
  Binary, 
  Activity, 
  Layers, 
  Wrench, 
  Orbit, 
  Globe, 
  Palette, 
  Server, 
  Eye, 
  Cloud, 
  Box, 
  Network, 
  Cable, 
  Radio, 
  MessageSquare,
  Database,
  Table,
  FileText,
  Users,
  Sparkles,
  Search
} from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';
import { Card } from '@/components/ui/Card';
import { skillCategories } from '@/data/skills';

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

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-4 h-4 text-emerald-400" />,
  Code: <Code className="w-4 h-4 text-emerald-400" />,
  Terminal: <Terminal className="w-4 h-4 text-emerald-400" />,
  FileCode: <FileCode className="w-4 h-4 text-emerald-400" />,
  FileJson: <FileJson className="w-4 h-4 text-emerald-400" />,
  Binary: <Binary className="w-4 h-4 text-emerald-400" />,
  Activity: <Activity className="w-4 h-4 text-emerald-400" />,
  Layers: <Layers className="w-4 h-4 text-emerald-400" />,
  Wrench: <Wrench className="w-4 h-4 text-emerald-400" />,
  Orbit: <Orbit className="w-4 h-4 text-emerald-400" />,
  Globe: <Globe className="w-4 h-4 text-emerald-400" />,
  Palette: <Palette className="w-4 h-4 text-emerald-400" />,
  Server: <Server className="w-4 h-4 text-emerald-400" />,
  Eye: <Eye className="w-4 h-4 text-emerald-400" />,
  Cloud: <Cloud className="w-4 h-4 text-emerald-400" />,
  Box: <Box className="w-4 h-4 text-emerald-400" />,
  Github: <Github className="w-4 h-4 text-emerald-400" />,
  Network: <Network className="w-4 h-4 text-emerald-400" />,
  Cable: <Cable className="w-4 h-4 text-emerald-400" />,
  Radio: <Radio className="w-4 h-4 text-emerald-400" />,
  MessageSquare: <MessageSquare className="w-4 h-4 text-emerald-400" />,
  Database: <Database className="w-4 h-4 text-emerald-400" />,
  Table: <Table className="w-4 h-4 text-emerald-400" />,
  FileText: <FileText className="w-4 h-4 text-emerald-400" />,
  Users: <Users className="w-4 h-4 text-emerald-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-emerald-400" />,
  Search: <Search className="w-4 h-4 text-emerald-400" />
};

export default function SkillsPage() {
  const resumeSkills = [
    {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      description: "Proficient in C, C++, Python, Java, SQL (PostgreSQL, Oracle, MySQL), with experience in Object-Oriented Programming (OOP), data structures, algorithms, and software development principles."
    },
    {
      title: "Web Development",
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      description: "Experience building modern web applications using HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, and responsive design principles."
    },
    {
      title: "Embedded Systems & Hardware",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      description: "Experience developing Arduino-based embedded systems, integrating microcontrollers, sensors, actuators, serial communication, hardware-software integration, debugging, testing, control systems, and prototype development."
    },
    {
      title: "Engineering & Design Software",
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      description: "Proficient with SolidWorks, AutoCAD, MATLAB, Microsoft Excel, Word, PowerPoint, Microsoft 365, and engineering design workflows including CAD modeling and technical documentation."
    },
    {
      title: "Development Tools",
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      description: "Experienced using Git, GitHub, Visual Studio Code, Eclipse, IntelliJ IDEA, and collaborative software development workflows."
    },
    {
      title: "Computer Vision & AI",
      icon: <Eye className="w-5 h-5 text-emerald-400" />,
      description: "Experience with OpenCV, image processing fundamentals, computer vision concepts, and integrating vision-based functionality into engineering projects."
    },
    {
      title: "Data & Analytics",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      description: "Experience using Power BI, Tableau, Excel, and SQL for data analysis, visualization, reporting, and decision support."
    },
    {
      title: "Professional Skills",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      description: "Strong analytical and problem-solving abilities, effective written and verbal communication, teamwork, adaptability, leadership, technical documentation, and a proactive approach to learning and engineering challenges."
    }
  ];

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
          Inventory
        </motion.span>
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          Technical Capabilities
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          A resume-style summary of my engineering tools, programming languages, and professional skills.
        </motion.p>
      </motion.div>

      {/* 2. Categorized Skills Matrix */}
      <motion.div 
        layout
        className="flex flex-col gap-6"
      >
        <AnimatePresence mode="popLayout">
          {resumeSkills.map((cat, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              key={cat.title}
            >
              <Card className="p-6 md:p-8 flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                  {cat.icon}
                </div>
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-l-2 border-emerald-500 pl-3 animate-pulse-subtle">
                    {cat.title}
                  </h2>
                  <p className="text-zinc-300 text-sm font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
