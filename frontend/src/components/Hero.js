import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1753781467329-416d05e7e477"
          alt="Solar Farm Drone"
          className="w-full h-full object-cover opacity-80 dark:opacity-40 transition-opacity duration-500"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-bold text-foreground tracking-tight mb-6"
        >
          Precision in <span className="text-primary">Flight</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-muted-foreground font-medium mb-8 max-w-3xl mx-auto"
        >
          Redefining solar maintenance and aviation education through autonomous systems.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/25"
          >
            Our Technology
            <motion.span
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </a>
          
          <a
            href="/launch-haanth"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg text-foreground bg-secondary hover:bg-secondary/80 transition-all duration-300 border border-border"
          >
            <Play className="mr-2 h-4 w-4 fill-current" /> 
            Launch Haanth
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator - Quadcopter moving up and down */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="40" height="40" viewBox="0 0 64 64" className="drop-shadow-lg">
          {/* Drone Body */}
          <ellipse cx="32" cy="32" rx="8" ry="4" fill="hsl(var(--primary))" />
          
          {/* Arms */}
          <line x1="24" y1="32" x2="14" y2="22" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="32" x2="50" y2="22" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="32" x2="14" y2="42" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="32" x2="50" y2="42" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          
          {/* Motor housings */}
          <circle cx="14" cy="22" r="3" fill="hsl(var(--foreground))" />
          <circle cx="50" cy="22" r="3" fill="hsl(var(--foreground))" />
          <circle cx="14" cy="42" r="3" fill="hsl(var(--foreground))" />
          <circle cx="50" cy="42" r="3" fill="hsl(var(--foreground))" />
          
          {/* Spinning Propellers */}
          <motion.ellipse 
            cx="14" cy="22" rx="8" ry="2" 
            fill="hsl(var(--muted-foreground))" 
            opacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '14px 22px' }}
          />
          <motion.ellipse 
            cx="50" cy="22" rx="8" ry="2" 
            fill="hsl(var(--muted-foreground))" 
            opacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 22px' }}
          />
          <motion.ellipse 
            cx="14" cy="42" rx="8" ry="2" 
            fill="hsl(var(--muted-foreground))" 
            opacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '14px 42px' }}
          />
          <motion.ellipse 
            cx="50" cy="42" rx="8" ry="2" 
            fill="hsl(var(--muted-foreground))" 
            opacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 42px' }}
          />
          
          {/* Camera */}
          <rect x="29" y="34" width="6" height="4" rx="1" fill="hsl(var(--foreground))" />
          <motion.circle 
            cx="32" cy="36" r="1.5" 
            fill="hsl(var(--primary))"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* LEDs */}
          <motion.circle 
            cx="14" cy="22" r="1.5" 
            fill="#22c55e"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.circle 
            cx="50" cy="22" r="1.5" 
            fill="#22c55e"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
          />
          <motion.circle 
            cx="14" cy="42" r="1.5" 
            fill="#ef4444"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle 
            cx="50" cy="42" r="1.5" 
            fill="#ef4444"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.45 }}
          />
        </svg>
        
        {/* Scroll text */}
        <motion.p 
          className="text-xs text-muted-foreground text-center mt-2 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll Down
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
