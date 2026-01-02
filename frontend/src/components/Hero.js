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
          className="w-full h-full object-cover opacity-60"
        />
        {/* Futuristic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,rgba(0,0,0,0.8)_100%)]"></div>
        
        {/* Grid lines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 inline-block"
        >
           <span className="py-1 px-3 border border-primary/50 rounded text-primary text-xs font-mono tracking-[0.3em] uppercase bg-primary/10 backdrop-blur-sm">
             System Online
           </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          CHAKRAKH <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">TECHNOLOGIES</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-accent font-medium mb-8 font-mono"
        >
          &lt; Redefining the Drone Ecosystem /&gt;
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 mb-10 leading-relaxed"
        >
          From autonomous solar maintenance to immersive educational simulations. We are architecting the future of aerospace robotics.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white rounded-none border border-primary bg-transparent transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative">Explore Innovations</span>
          </a>
          
          <a
            href="/launch-haanth"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-black bg-accent rounded-none transition-all duration-300 hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]"
          >
            <Play className="mr-2 h-5 w-5 fill-current" /> 
            <span className="relative">Launch Haanth</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
