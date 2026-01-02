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
        {/* Animated Background - Subtle in Light, Visible in Dark */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-pulse animation-delay-2000"></div>
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
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="bg-card p-6 rounded-full border border-border shadow-lg">
              <Rocket className="w-16 h-16 text-primary" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Adventures of Haanth
          </h1>
          
          <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-10 text-lg font-medium">
             <Construction className="w-5 h-5" />
             <span>Under Construction</span>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            We are crafting an immersive experience where you will <span className="text-primary font-semibold">learn to fly</span> and <span className="text-foreground font-semibold">grow to lead</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button disabled className="px-8 py-3 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed">
               Coming Soon
             </button>
             <a href="/" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
               Return Home
             </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default LaunchHaanth;
