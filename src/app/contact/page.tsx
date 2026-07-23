'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { Card } from '@/components/ui/Card';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStatus('loading');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout threshold

    try {
      const response = await fetch("https://formsubmit.co/ajax/patel07@uoguelph.ca", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject ? `Portfolio Inquiry: ${formData.subject}` : "New Portfolio Message",
          message: formData.message
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to transmit message. Please try again.');
      }

      const result = await response.json();

      if (result.success === "false" || result.success === false) {
        throw new Error(result.message || 'Failed to transmit message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      clearTimeout(timeoutId);
      setStatus('error');
      if (err.name === 'AbortError') {
        setErrorMsg('Transmission timed out. Please check your internet connection or email directly.');
      } else {
        setErrorMsg(err.message || 'Something went wrong. Please check your network.');
      }
    }
  };

  const contactChannels = [
    {
      name: 'Email Address',
      val: 'patel07@uoguelph.ca',
      href: 'mailto:patel07@uoguelph.ca',
      icon: <Mail className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'LinkedIn Profile',
      val: 'linkedin.com/in/deeppatel2007',
      href: 'https://www.linkedin.com/in/deeppatel2007/',
      icon: <Linkedin className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'GitHub Repository',
      val: 'github.com/deepjpatel2007',
      href: 'https://github.com/deepjpatel2007',
      icon: <Github className="w-5 h-5 text-emerald-400" />
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
          Inquiry
        </motion.span>
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          Contact Me
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          Have a project in mind or an internship opportunity? Drop me a message.
        </motion.p>
      </motion.div>

      {/* 2. Content Grid (Form + Channels) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        
        {/* Left Side: Channels */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="md:col-span-2 flex flex-col gap-4"
        >
          {contactChannels.map((channel, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <a 
                href={channel.href}
                target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-5 flex items-center gap-4 hover:border-emerald-500/20">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950/40 border border-white/5 backdrop-blur-md flex items-center justify-center shrink-0 relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                    {channel.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {channel.name}
                    </span>
                    <span className="text-sm font-semibold text-white mt-0.5 tracking-tight group-hover:text-emerald-300">
                      {channel.val}
                    </span>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="md:col-span-3"
        >
          <Card className="p-6 md:p-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase border-l-2 border-emerald-500 pl-3 mb-6">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-zinc-500 uppercase">
                    Your Name <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    required
                    className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-300 placeholder-zinc-700 text-sm focus:outline-none focus:border-emerald-500/30 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-zinc-500 uppercase">
                    Email Address <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    required
                    className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-300 placeholder-zinc-700 text-sm focus:outline-none focus:border-emerald-500/30 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] font-mono text-zinc-500 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-300 placeholder-zinc-700 text-sm focus:outline-none focus:border-emerald-500/30 transition-all"
                  placeholder="Internship / Project Inquiry"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-zinc-500 uppercase">
                  Message <span className="text-emerald-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  required
                  rows={5}
                  className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-300 placeholder-zinc-700 text-sm focus:outline-none focus:border-emerald-500/30 transition-all resize-none"
                  placeholder="Hey Deep, I'd love to connect regarding..."
                />
              </div>

              {/* Status Feedbacks */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    Message sent successfully! Deep will contact you shortly.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono"
                  >
                    <AlertCircle className="w-4.5 h-4.5" />
                    {errorMsg || 'Something went wrong. Please check your inputs.'}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button styled as a Liquid Glass Button */}
              <LiquidGlassButton
                type="submit"
                variant="primary"
                disabled={status === 'loading'}
                className="w-full font-mono text-xs tracking-wider"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    SEND MESSAGE
                  </>
                )}
              </LiquidGlassButton>

            </form>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
