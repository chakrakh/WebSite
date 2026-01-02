import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8">
          <div>
            <span className="text-2xl font-bold text-white tracking-wider">CHAKRAKH</span>
            <span className="block text-xs text-primary font-mono tracking-[0.2em] mt-1">TECHNOLOGIES</span>
            <p className="mt-4 text-gray-400 text-sm max-w-xs leading-relaxed">
              Breaking Barriers With Technology. Redefining solar energy maintenance for a sustainable future.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">About Us</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Future Projects</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-accent"></span>
                 CHAKRAKHTECHNOLOGIES25@proton.me
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-secondary"></span>
                 Pondicherry – 605008
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Chakrakh Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="text-xs text-gray-700 font-mono border border-gray-800 px-2 py-1 rounded">CIN: U72100PY2025PTC00953</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
