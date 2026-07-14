import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ExternalLink, 
  Settings, 
  Search, 
  Activity, 
  ShieldCheck, 
  BookOpen 
} from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';
import { projects } from '@/data/projects';
import { Card } from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-12">
      
      {/* 1. Navigation & Breadcrumb */}
      <div>
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          BACK TO ALL PROJECTS
        </Link>
      </div>

      {/* 2. Hero Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-900 pb-8">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase tracking-wider">
            {project.category}
          </span>
          <div className="flex items-center gap-4">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code ↗
            </a>
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2 leading-tight">
          {project.title}
        </h1>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-3xl mt-2">
          {project.description}
        </p>
      </div>

      {/* 3. Specs Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Technologies Used</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.techStack.map(tech => (
              <span key={tech} className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-950 border border-zinc-900 text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-5 flex flex-col justify-center">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">System Classification</span>
          <span className="text-sm font-semibold font-mono text-white mt-1.5 uppercase">
            {project.category} Architecture
          </span>
        </Card>
      </div>

      {/* 4. Problem & Objective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-900/60 pt-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider">
            <Search className="w-4.5 h-4.5 text-emerald-500" />
            The Problem Statement
          </div>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            {project.problem}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider">
            <Activity className="w-4.5 h-4.5 text-emerald-500" />
            Engineering Objectives
          </div>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            {project.objective}
          </p>
        </div>
      </div>

      {/* 5. System Architecture Design */}
      <div className="flex flex-col gap-4 border-t border-zinc-900/60 pt-8">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider">
          <Settings className="w-4.5 h-4.5 text-emerald-500" />
          System Architecture Layout
        </div>
        <pre className="font-mono border border-zinc-900 bg-zinc-950/70 p-6 rounded-2xl overflow-x-auto text-emerald-400 text-[10px] md:text-xs leading-relaxed shadow-inner">
          <code>{project.architecture.trim()}</code>
        </pre>
      </div>

      {/* 6. Engineering Process */}
      <div className="flex flex-col gap-6 border-t border-zinc-900/60 pt-8">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider">
          <BookOpen className="w-4.5 h-4.5 text-emerald-500" />
          Engineering Process & Execution
        </div>
        <div className="flex flex-col gap-4 pl-4 relative before:absolute before:left-[1px] before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-900">
          {project.process.map((step, idx) => (
            <div key={idx} className="relative pl-6">
              <div className="absolute -left-[20px] top-1.5 w-[7px] h-[7px] rounded-full bg-emerald-500" />
              <span className="text-zinc-500 font-mono text-xs">PHASE 0{idx + 1}:</span>
              <p className="text-zinc-300 text-sm font-light mt-0.5 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Challenges & Resolutions */}
      <div className="flex flex-col gap-6 border-t border-zinc-900/60 pt-8">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
          Technical Challenges & Resolutions
        </div>
        <div className="grid grid-cols-1 gap-6">
          {project.challenges.map((challenge, idx) => (
            <Card key={idx} className="p-6 md:p-8 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-xs">C.0{idx + 1}</span>
                {challenge.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm font-light leading-relaxed mt-2 border-t border-zinc-900/60 pt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold">The Obstacle</span>
                  <p className="text-zinc-400">{challenge.description}</p>
                </div>
                <div className="flex flex-col gap-1.5 border-t md:border-t-0 md:border-l border-zinc-900/60 pt-4 md:pt-0 md:pl-4">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">The Resolution</span>
                  <p className="text-zinc-300">{challenge.solution}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 8. Testing, Results & Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-900/60 pt-8">
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Verification & Testing</span>
          <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
            {project.testing}
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Performance Results</span>
          <p className="text-zinc-300 text-xs md:text-sm font-light leading-relaxed">
            {project.results}
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Lessons Learned</span>
          <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
            {project.lessonsLearned}
          </p>
        </div>
      </div>

      {/* 9. Footer Nav */}
      <div className="border-t border-zinc-900 pt-8 text-center">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          View other case studies
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
