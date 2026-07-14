'use client';

import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GlobalInteractiveBackground } from '../ui/GlobalInteractiveBackground';

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Set global document variables for viewport-relative coordinates
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Global Minimal Interactive Background */}
      <GlobalInteractiveBackground />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Page content wrapper: position relative; z-index 1 */}
      <div className="relative z-[1] flex-grow flex flex-col">
        {/* Main Content Area */}
        <main className="flex-grow flex flex-col pt-24 pb-16 md:pt-32">
          {children}
        </main>

        {/* Page Footer */}
        <Footer />
      </div>
    </div>
  );
};
