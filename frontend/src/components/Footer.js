import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-700 pb-8">
          <div>
            <span className="text-2xl font-bold text-white">CHAKRAKH</span>
            <span className="block text-sm text-green-400 font-semibold mt-1">TECHNOLOGIES</span>
            <p className="mt-4 text-gray-400 text-sm max-w-xs">
              Breaking Barriers With Technology. Redefining solar energy maintenance for a sustainable future.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Future Projects</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">CHAKRAKHTECHNOLOGIES25@proton.me</li>
              <li className="text-gray-400">Pondicherry – 605008</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Chakrakh Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="text-xs text-gray-600">CIN: U72100PY2025PTC00953</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
