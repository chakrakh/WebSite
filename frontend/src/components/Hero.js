import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1753781467329-416d05e7e477"
          alt="Solar Farm Drone"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4"
        >
          CHAKRAKH TECHNOLOGIES
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-green-400 font-semibold mb-8"
        >
          Redefining the Drone Ecosystem
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 mb-10"
        >
          From autonomous solar maintenance to immersive educational simulations, we are building the future of drone technology for everyone.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-900 bg-white hover:bg-gray-100 md:py-4 md:text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Innovations
          </a>
          <a
            href="/launch-haanth"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-500 text-base font-medium rounded-full text-white bg-green-500/20 hover:bg-green-500 hover:text-white md:py-4 md:text-lg transition-all transform hover:scale-105 backdrop-blur-sm"
          >
            <Play className="mr-2 h-5 w-5 fill-current" /> Launch Haanth
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
