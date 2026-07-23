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
  const categories = [
    {
      title: "Programming Languages",
      items: [
        { name: "C", description: "Low-level programming, memory management, and foundational systems development.", icon: "Code" },
        { name: "C++", description: "Object-oriented programming, data structures, and engineering-focused application development.", icon: "Code" },
        { name: "Python", description: "Scripting, automation, data processing, and computer vision development.", icon: "FileCode" },
        { name: "Java", description: "Object-oriented application development and coursework-based software projects.", icon: "Terminal" },
        { name: "SQL", description: "Querying and managing relational databases using PostgreSQL, Oracle, and MySQL.", icon: "Database" },
        { name: "Object-Oriented Programming", description: "Applying encapsulation, inheritance, polymorphism, and modular program design.", icon: "Code" }
      ]
    },
    {
      title: "Development Tools",
      items: [
        { name: "Git", description: "Version control, branching, commits, and source-code management.", icon: "Terminal" },
        { name: "GitHub", description: "Repository hosting, project documentation, collaboration, and deployment workflows.", icon: "Github" },
        { name: "Visual Studio Code", description: "Primary development environment for web, Python, and embedded project work.", icon: "Terminal" },
        { name: "Eclipse", description: "Java development, debugging, and coursework-based application development.", icon: "Terminal" },
        { name: "IntelliJ IDEA", description: "Java development, project organization, and object-oriented programming workflows.", icon: "Terminal" }
      ]
    },
    {
      title: "Engineering & Design Software",
      items: [
        { name: "SolidWorks", description: "3D CAD modelling, part design, assemblies, and engineering prototypes.", icon: "Layers" },
        { name: "AutoCAD", description: "Technical drafting, design documentation, and engineering drawings.", icon: "FileText" },
        { name: "MATLAB", description: "Engineering calculations, numerical analysis, and technical coursework.", icon: "Activity" },
        { name: "Microsoft Excel", description: "Data analysis, reporting, formulas, automation, and structured technical workbooks.", icon: "Table" },
        { name: "Microsoft Word", description: "Technical reports, documentation, and professional written communication.", icon: "FileText" },
        { name: "Microsoft PowerPoint", description: "Engineering presentations, project summaries, and technical communication.", icon: "MessageSquare" },
        { name: "Microsoft 365", description: "Collaboration and productivity using Microsoft’s workplace tools.", icon: "Layers" }
      ]
    },
    {
      title: "Technical Skills",
      items: [
        { name: "Arduino Systems", description: "Developing microcontroller-based prototypes using sensors, actuators, and programmed logic.", icon: "Cpu" },
        { name: "Embedded Programming", description: "Writing and testing code that controls hardware behaviour and system responses.", icon: "Cpu" },
        { name: "Hardware Integration", description: "Connecting and coordinating electronic components within complete prototypes.", icon: "Layers" },
        { name: "Sensor Integration", description: "Reading, processing, and using sensor data in Arduino-based systems.", icon: "Activity" },
        { name: "OpenCV", description: "Computer vision fundamentals, image processing, and vision-based programming.", icon: "Eye" },
        { name: "Debugging", description: "Identifying and resolving software, hardware, and integration issues systematically.", icon: "Search" },
        { name: "Testing", description: "Validating functionality, checking system behaviour, and improving reliability through iteration.", icon: "Search" },
        { name: "Data Analysis", description: "Organizing, interpreting, and presenting technical and project-related data.", icon: "Database" },
        { name: "Control Systems", description: "Implementing programmed responses based on sensor readings and system conditions.", icon: "Orbit" },
        { name: "CAD Modeling", description: "Creating and refining engineering components and prototype designs.", icon: "Layers" }
      ]
    },
    {
      title: "Professional Skills",
      items: [
        { name: "Problem Solving", description: "Breaking complex challenges into manageable steps and developing practical solutions.", icon: "Sparkles" },
        { name: "Communication", description: "Explaining technical ideas clearly through written, verbal, and visual communication.", icon: "MessageSquare" },
        { name: "Teamwork", description: "Collaborating effectively on engineering projects, competitions, and shared deliverables.", icon: "Users" },
        { name: "Adaptability", description: "Learning unfamiliar tools and adjusting to new technical requirements.", icon: "Orbit" },
        { name: "Leadership", description: "Supporting team organization, decision-making, and project progress.", icon: "Users" },
        { name: "Proactive Attitude", description: "Taking initiative, identifying next steps, and continuously improving project work.", icon: "Sparkles" }
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 flex flex-col gap-12">
      
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
          A categorized inventory of my technical skills, tools, and methodologies.
        </motion.p>
      </motion.div>

      {/* 2. Categorized Skills Matrix */}
      <motion.div 
        layout
        className="flex flex-col gap-12"
      >
        <AnimatePresence mode="popLayout">
          {categories.map((cat) => (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={cat.title} 
              className="flex flex-col gap-6"
            >
              <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-l-2 border-emerald-500 pl-3">
                {cat.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((skill) => (
                  <Card key={skill.name} className="p-5 flex items-start gap-4 hover:border-emerald-500/30 transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0">
                      {iconMap[skill.icon] || <Cpu className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-sm font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-zinc-400 text-xs font-light leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
