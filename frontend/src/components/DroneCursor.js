import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DroneCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Only show on desktop
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && isScrolling && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 28,
            opacity: { duration: 0.2 }
          }}
        >
          {/* Drone SVG */}
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 64 64" 
            className="drop-shadow-lg"
          >
            {/* Drone Body */}
            <ellipse cx="32" cy="32" rx="8" ry="4" fill="hsl(var(--primary))" />
            
            {/* Arms */}
            <line x1="24" y1="32" x2="12" y2="20" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="40" y1="32" x2="52" y2="20" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="24" y1="32" x2="12" y2="44" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="40" y1="32" x2="52" y2="44" stroke="hsl(var(--foreground))" strokeWidth="2" />
            
            {/* Propellers with animation */}
            <g className="animate-spin" style={{ transformOrigin: '12px 20px', animationDuration: '0.1s' }}>
              <ellipse cx="12" cy="20" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.7" />
            </g>
            <g className="animate-spin" style={{ transformOrigin: '52px 20px', animationDuration: '0.1s' }}>
              <ellipse cx="52" cy="20" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.7" />
            </g>
            <g className="animate-spin" style={{ transformOrigin: '12px 44px', animationDuration: '0.1s' }}>
              <ellipse cx="12" cy="44" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.7" />
            </g>
            <g className="animate-spin" style={{ transformOrigin: '52px 44px', animationDuration: '0.1s' }}>
              <ellipse cx="52" cy="44" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.7" />
            </g>
            
            {/* Camera/Sensor */}
            <circle cx="32" cy="36" r="3" fill="hsl(var(--foreground))" />
            <circle cx="32" cy="36" r="1.5" fill="hsl(var(--primary))" />
          </svg>
          
          {/* Trail effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 blur-md"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DroneCursor;
