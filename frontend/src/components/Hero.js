import React from 'react';
import { ArrowRight } from 'lucide-react';

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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          CHAKRAKH TECHNOLOGIES
        </h1>
        <p className="text-xl sm:text-2xl text-green-400 font-semibold mb-8">
          Breaking Barriers With Technology
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 mb-10">
          Revolutionizing solar maintenance with AI-powered autonomous UAVs. 
          Saving water, maximizing efficiency, and redefining sustainability.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#product"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-900 bg-white hover:bg-gray-100 md:py-4 md:text-lg transition-all transform hover:scale-105"
          >
            Discover Suryagatra
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 md:py-4 md:text-lg transition-all"
          >
            Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
