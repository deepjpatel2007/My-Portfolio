'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award as AwardIcon, Calendar, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
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
      staggerChildren: 0.08
    }
  }
};

export default function AwardsPage() {
  const honoursList = awards.filter(a => a.category === 'honour');
  const certificationsList = awards.filter(a => a.category === 'certification');

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
          Distinctions
        </motion.span>
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          Awards & Recognition
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          Academic achievement, engineering competitions, and professional certifications.
        </motion.p>
      </motion.div>

      {/* 2. Honours & Exhibition Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-l-2 border-emerald-500 pl-3">
          <Trophy className="w-5 h-5 text-emerald-400" />
          Academic & Exhibition Honours
        </h2>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {honoursList.map((award, idx) => {
            const isTrophy = award.title.includes('1st Place') || award.title.includes('Fastest') || award.title.includes("Dean's");
            return (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[220px]">
                  <div className="flex flex-col gap-4">
                    
                    {/* Badge & Date Headers */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        {isTrophy ? (
                          <Trophy className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AwardIcon className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <span className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                        <Calendar className="w-3.5 h-3.5" />
                        {award.date}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                        {award.title}
                      </h3>
                      <p className="text-zinc-500 font-mono text-[10px]">
                        ISSUED BY: {award.issuer.toUpperCase()}
                      </p>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed mt-2">
                        {award.description}
                      </p>
                    </div>
                  </div>

                  {(award.credentialUrl || award.credentials) && (
                    <div className="border-t border-zinc-900/60 pt-4 mt-6 flex flex-wrap gap-2.5">
                      {award.credentials ? (
                        award.credentials.map((cred, cIdx) => (
                          <a
                            key={cIdx}
                            href={cred.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="outline-none"
                          >
                            <LiquidGlassButton variant="secondary" className="font-mono text-[10px] tracking-wider">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              {cred.label}
                            </LiquidGlassButton>
                          </a>
                        ))
                      ) : (
                        <a
                          href={award.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="outline-none"
                        >
                          <LiquidGlassButton variant="secondary" className="font-mono text-[10px] tracking-wider">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            VIEW CREDENTIAL
                          </LiquidGlassButton>
                        </a>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 3. Professional Certifications Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-l-2 border-emerald-500 pl-3">
          <AwardIcon className="w-5 h-5 text-emerald-400" />
          Professional Certifications
        </h2>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certificationsList.map((award, idx) => {
            return (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[220px]">
                  <div className="flex flex-col gap-4">
                    
                    {/* Badge & Date Headers */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <AwardIcon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                        <Calendar className="w-3.5 h-3.5" />
                        {award.date}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                        {award.title}
                      </h3>
                      <p className="text-zinc-500 font-mono text-[10px]">
                        ISSUED BY: {award.issuer.toUpperCase()}
                      </p>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed mt-2">
                        {award.description}
                      </p>
                    </div>
                  </div>

                  {(award.credentialUrl || award.credentials) && (
                    <div className="border-t border-zinc-900/60 pt-4 mt-6 flex flex-wrap gap-2.5">
                      {award.credentials ? (
                        award.credentials.map((cred, cIdx) => (
                          <a
                            key={cIdx}
                            href={cred.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="outline-none"
                          >
                            <LiquidGlassButton variant="secondary" className="font-mono text-[10px] tracking-wider">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              {cred.label}
                            </LiquidGlassButton>
                          </a>
                        ))
                      ) : (
                        <a
                          href={award.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="outline-none"
                        >
                          <LiquidGlassButton variant="secondary" className="font-mono text-[10px] tracking-wider">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            VIEW CREDENTIAL
                          </LiquidGlassButton>
                        </a>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}
