import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Construction } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LaunchHaanth = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center relative overflow-hidden px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="bg-blue-800/50 p-6 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <Rocket className="w-16 h-16 text-blue-400" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Adventures of Haanth
          </h1>
          
          <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-8 text-xl font-medium">
             <Construction className="w-6 h-6" />
             <span>Page Under Development</span>
          </div>

          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            We are crafting an immersive experience where you will learn to fly and grow to lead. 
            Stay tuned for the ultimate drone simulation journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button disabled className="px-8 py-4 bg-gray-700 text-gray-400 rounded-full font-semibold cursor-not-allowed border border-gray-600">
               Launch Coming Soon
             </button>
             <a href="/" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
               Back to Home
             </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default LaunchHaanth;
