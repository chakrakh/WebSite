import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {/* Drone Flying In Animation */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          
          {/* Drone animation */}
          <motion.div
            initial={{ 
              x: '-100vw', 
              y: '20vh',
              rotate: -15,
              scale: 2
            }}
            animate={{ 
              x: '100vw',
              y: '-20vh',
              rotate: 15,
              scale: 0.5
            }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative"
          >
            <svg width="120" height="120" viewBox="0 0 64 64" className="drop-shadow-2xl">
              {/* Drone Body */}
              <ellipse cx="32" cy="32" rx="10" ry="5" fill="hsl(var(--primary))" />
              
              {/* Arms */}
              <line x1="22" y1="32" x2="8" y2="18" stroke="hsl(var(--foreground))" strokeWidth="3" />
              <line x1="42" y1="32" x2="56" y2="18" stroke="hsl(var(--foreground))" strokeWidth="3" />
              <line x1="22" y1="32" x2="8" y2="46" stroke="hsl(var(--foreground))" strokeWidth="3" />
              <line x1="42" y1="32" x2="56" y2="46" stroke="hsl(var(--foreground))" strokeWidth="3" />
              
              {/* Motor housings */}
              <circle cx="8" cy="18" r="4" fill="hsl(var(--foreground))" />
              <circle cx="56" cy="18" r="4" fill="hsl(var(--foreground))" />
              <circle cx="8" cy="46" r="4" fill="hsl(var(--foreground))" />
              <circle cx="56" cy="46" r="4" fill="hsl(var(--foreground))" />
              
              {/* Spinning Propellers */}
              <g className="animate-spin" style={{ transformOrigin: '8px 18px', animationDuration: '0.05s' }}>
                <ellipse cx="8" cy="18" rx="10" ry="3" fill="hsl(var(--muted-foreground))" opacity="0.6" />
              </g>
              <g className="animate-spin" style={{ transformOrigin: '56px 18px', animationDuration: '0.05s' }}>
                <ellipse cx="56" cy="18" rx="10" ry="3" fill="hsl(var(--muted-foreground))" opacity="0.6" />
              </g>
              <g className="animate-spin" style={{ transformOrigin: '8px 46px', animationDuration: '0.05s' }}>
                <ellipse cx="8" cy="46" rx="10" ry="3" fill="hsl(var(--muted-foreground))" opacity="0.6" />
              </g>
              <g className="animate-spin" style={{ transformOrigin: '56px 46px', animationDuration: '0.05s' }}>
                <ellipse cx="56" cy="46" rx="10" ry="3" fill="hsl(var(--muted-foreground))" opacity="0.6" />
              </g>
              
              {/* Camera/Gimbal */}
              <rect x="28" y="35" width="8" height="6" rx="1" fill="hsl(var(--foreground))" />
              <circle cx="32" cy="38" r="2" fill="hsl(var(--primary))" />
              
              {/* LED lights */}
              <circle cx="8" cy="18" r="1.5" fill="#22c55e" className="animate-pulse" />
              <circle cx="56" cy="18" r="1.5" fill="#22c55e" className="animate-pulse" />
              <circle cx="8" cy="46" r="1.5" fill="#ef4444" className="animate-pulse" />
              <circle cx="56" cy="46" r="1.5" fill="#ef4444" className="animate-pulse" />
            </svg>
            
            {/* Motion blur / trail effect */}
            <motion.div
              className="absolute top-1/2 right-full w-32 h-4 -translate-y-1/2"
              style={{
                background: 'linear-gradient(to left, hsl(var(--primary) / 0.4), transparent)',
                filter: 'blur(8px)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
