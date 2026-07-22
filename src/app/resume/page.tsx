'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Mail, Phone, Cpu, BookOpen, Briefcase, Code, Award, Users } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { Card } from '@/components/ui/Card';
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';
import { awards } from '@/data/awards';
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

export default function ResumePage() {
  const workExperiences = experiences.filter(exp => !exp.role.includes("Volunteer"));
  const volunteerExperiences = experiences.filter(exp => exp.role.includes("Volunteer"));

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-10">
      
      {/* 1. Header Control Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-900 pb-6 no-print"
      >
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Professional Profile</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Interactive Resume</h1>
        </div>
        
        <div>
          <a
            href="https://drive.google.com/file/d/1G00hPfPIcn2LM42clnbnyFlajpp25BLk/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none"
          >
            <LiquidGlassButton variant="primary">
              <Download className="w-4 h-4" />
              Download PDF Resume
            </LiquidGlassButton>
          </a>
        </div>
      </motion.div>

      {/* 2. Interactive Resume Sheet */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col gap-8 text-zinc-300 print:text-black"
      >
        
        {/* Document Header Card */}
        <motion.div variants={fadeInUp}>
          <Card className="p-8 md:p-10 flex flex-col gap-6 border border-zinc-900 bg-zinc-950/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent" />
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Deep Patel
              </h2>
              <p className="text-sm font-semibold font-mono text-emerald-400">
                Computer Engineering Student | Co-op at University of Guelph
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-900/60 max-w-2xl mx-auto w-full">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500/80" />
                Guelph, ON, Canada
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500/80" />
                +1 (365) 773-4848
              </span>
              <a href="mailto:patel07@uoguelph.ca" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-500/80" />
                patel07@uoguelph.ca
              </a>
            </div>

            <div className="flex justify-center gap-6 text-sm text-zinc-500 font-mono pt-1">
              <a href="https://github.com/deepjpatel2007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Github className="w-4 h-4" />
                github.com/deepjpatel2007
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/deeppatel2007/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Linkedin className="w-4 h-4" />
                linkedin.com/in/deeppatel2007
              </a>
            </div>
          </Card>
        </motion.div>

        {/* 1. TECHNICAL SKILLS */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 flex flex-col gap-6 border border-zinc-900 bg-zinc-950/20">
            <h3 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-b border-zinc-900/60 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Technical Skills
            </h3>
            <div className="flex flex-col gap-3.5 text-sm">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-4 leading-relaxed">
                  <span className="font-bold text-white font-mono text-xs tracking-wide uppercase pt-0.5 md:col-span-1">
                    {cat.title}:
                  </span>
                  <p className="text-zinc-400 font-light md:col-span-3">
                    {cat.items.map(i => i.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 2. EDUCATION */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 flex flex-col gap-5 border border-zinc-900 bg-zinc-950/20">
            <h3 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-b border-zinc-900/60 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Education
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline font-semibold text-white text-sm">
                <span>Bachelor of Engineering, Computer Engineering (Co-op)</span>
                <span className="text-xs font-mono text-zinc-500">Sept 2025 – Present</span>
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                University of Guelph, Guelph, ON
              </div>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5 text-xs font-light text-zinc-400">
                <li className="marker:text-emerald-500/70">GPA: 4.0/4.0</li>
                <li className="marker:text-emerald-500/70">Dean’s Honours List Recipient – Fall 2025 and Winter 2026</li>
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* 3. WORK EXPERIENCE */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 flex flex-col gap-6 border border-zinc-900 bg-zinc-950/20">
            <h3 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-b border-zinc-900/60 pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Work Experience
            </h3>
            <div className="flex flex-col gap-8">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-white text-sm">
                    <span className="font-bold">
                      {exp.role} <span className="font-normal text-zinc-500">at</span> <span className="italic text-emerald-400">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-zinc-500 shrink-0">{exp.period}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">{exp.location}</span>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs font-light text-zinc-400 leading-relaxed mt-1">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="marker:text-emerald-500/70">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 4. ENGINEERING PROJECT EXPERIENCE */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 flex flex-col gap-6 border border-zinc-900 bg-zinc-950/20">
            <h3 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-b border-zinc-900/60 pb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Engineering Project Experience
            </h3>
            <div className="flex flex-col gap-8">
              {projects.filter(proj => !proj.title.includes("CampusBook")).map((proj) => (
                <div key={proj.slug} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-white text-sm">
                    <span className="font-bold">
                      {proj.title}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 shrink-0">Sept 2025 – Present</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">
                      {proj.category} Project
                    </span>
                    <a 
                      href={proj.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      View Repository ↗
                    </a>
                  </div>
                  <p className="text-xs font-light text-zinc-400 leading-relaxed mt-1">
                    {proj.description}
                  </p>
                  <div className="flex gap-1.5 mt-1 items-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Stack:</span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {proj.techStack.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 5. VOLUNTEERING EXPERIENCE */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 flex flex-col gap-6 border border-zinc-900 bg-zinc-950/20">
            <h3 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-b border-zinc-900/60 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Volunteering Experience
            </h3>
            <div className="flex flex-col gap-8">
              {volunteerExperiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-white text-sm">
                    <span className="font-bold">
                      {exp.role} <span className="font-normal text-zinc-500">at</span> <span className="italic text-emerald-400">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-zinc-500 shrink-0">{exp.period}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">{exp.location}</span>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs font-light text-zinc-400 leading-relaxed mt-1">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="marker:text-emerald-500/70">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 6. TRAINING AND CERTIFICATIONS */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 flex flex-col gap-6 border border-zinc-900 bg-zinc-950/20">
            <h3 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-b border-zinc-900/60 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Training & Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.filter(a => a.title.includes("Certificate") || a.title.includes("Certification") || a.title.includes("Credential")).map((cert) => (
                <div key={cert.title} className="flex flex-col gap-1.5 text-xs border-b md:border-b-0 md:border-r border-zinc-900/60 pb-4 md:pb-0 md:pr-4 last:border-0 last:pr-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-white font-mono">{cert.title}</span>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors shrink-0 bg-emerald-500/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10 hover:border-emerald-500/25"
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{cert.issuer} • {cert.date}</span>
                  <p className="text-zinc-400 font-light mt-0.5 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}
