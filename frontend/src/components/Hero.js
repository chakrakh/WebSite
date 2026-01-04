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

      {/* Drone has been moved to Global ScrollDrone component */}
    </div>
  );
};

export default Hero;
