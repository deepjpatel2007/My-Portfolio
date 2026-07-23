'use client';

import React from 'react';
import { Mail, Phone, FileText } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { LiquidGlassIconButton } from '../ui/LiquidGlassIconButton';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0e0e12] border-t border-zinc-800/80 py-16 px-6 mt-auto no-print">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Global Contact Callout */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-zinc-900/60 text-left">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Get in touch</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Want to have a chat? Schedule a call? Work on a project?
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              I'd love to talk to you! Feel free to reach out via any channel.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 shrink-0 text-xs font-mono text-zinc-400 md:text-right md:items-end pt-2">
            <a 
              href="mailto:patel07@uoguelph.ca" 
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-emerald-500/80" />
              patel07@uoguelph.ca
            </a>
            <a 
              href="tel:+13657734848" 
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-500/80" />
              +1 (365) 773-4848
            </a>
            <a 
              href="/resume" 
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-500/80" />
              View & Download Resume
            </a>
            <a 
              href="https://github.com/deepjpatel2007" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Github className="w-4 h-4 text-emerald-500/80" />
              github.com/deepjpatel2007
            </a>
            <a 
              href="https://www.linkedin.com/in/deeppatel2007/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-emerald-500/80" />
              linkedin.com/in/deeppatel2007
            </a>
          </div>
        </div>

        {/* Small Bottom Bar with Icons using Liquid-Glass system */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <LiquidGlassIconButton
              href="https://github.com/deepjpatel2007"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </LiquidGlassIconButton>
            <LiquidGlassIconButton
              href="https://www.linkedin.com/in/deeppatel2007/"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </LiquidGlassIconButton>
            <LiquidGlassIconButton
              href="mailto:patel07@uoguelph.ca"
              title="Email"
              target="_self"
            >
              <Mail className="w-4 h-4" />
            </LiquidGlassIconButton>
            <LiquidGlassIconButton
              href="/resume"
              title="Resume"
              target="_self"
            >
              <FileText className="w-4 h-4" />
            </LiquidGlassIconButton>
          </div>
        </div>

      </div>
    </footer>
  );
};
