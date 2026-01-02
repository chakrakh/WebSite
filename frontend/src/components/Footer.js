import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-border pb-8">
          <div>
            <span className="text-xl font-bold tracking-tight">CHAKRAKH</span>
            <span className="block text-xs font-semibold uppercase tracking-wider mt-1 text-muted-foreground">Technologies</span>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Precision. Autonomy. Impact.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Innovations</a></li>
              <li><a href="#team" className="text-muted-foreground hover:text-primary transition-colors">Team</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground flex items-center gap-2">
                 chakrakhtechnologies25@proton.me
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                 Pondicherry – 605008
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Chakrakh Technologies Pvt Ltd.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="text-xs text-muted-foreground border border-border px-2 py-1 rounded">CIN: U72100PY2025PTC00953</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
