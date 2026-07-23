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
          A categorized inventory of my technical skills, tools, and methodologies.
        </motion.p>
      </motion.div>

      {/* 2. Categorized Skills Matrix */}
      <motion.div 
        layout
        className="flex flex-col gap-6"
      >
        <Card className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-6 divide-y divide-zinc-900/60">
            {skillCategories.map((cat, idx) => (
              <div 
                key={cat.title} 
                className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-baseline ${idx > 0 ? 'pt-6' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0">
                    {iconMap[cat.items[0]?.icon] || <Code className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    {cat.title}
                  </h2>
                </div>
                <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed md:col-span-3">
                  {cat.items.map(i => i.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

    </div>
  );
}
