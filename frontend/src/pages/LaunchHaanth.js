import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Construction } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LaunchHaanth = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center relative overflow-hidden px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse animation-delay-4000"></div>
          {/* Grid lines effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <motion.div 
            className="mb-8 inline-block"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="bg-card p-8 rounded-full border border-primary/30 shadow-[0_0_50px_rgba(0,240,255,0.3)] backdrop-blur-md">
              <Rocket className="w-20 h-20 text-primary" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Adventures of Haanth
          </h1>
          
          <div className="flex items-center justify-center space-x-3 text-yellow-400 mb-10 text-xl font-mono tracking-wide">
             <Construction className="w-6 h-6 animate-pulse" />
             <span>// SYSTEM UNDER CONSTRUCTION //</span>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            We are crafting an immersive experience where you will <span className="text-primary font-semibold">learn to fly</span> and <span className="text-accent font-semibold">grow to lead</span>. 
            <br />Stay tuned for the ultimate drone simulation journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button disabled className="px-10 py-4 bg-white/5 text-gray-500 rounded-none border border-white/10 font-bold tracking-wider cursor-not-allowed">
               LAUNCH COMING SOON
             </button>
             <a href="/" className="px-10 py-4 bg-primary text-black rounded-none font-bold tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300">
               RETURN TO BASE
             </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default LaunchHaanth;
