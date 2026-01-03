import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DroneCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Only show on desktop
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        document.body.style.cursor = 'auto';
      } else {
        document.body.style.cursor = 'none';
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Add global style to hide cursor on all elements */}
      <style>{`
        * { cursor: none !important; }
        @media (max-width: 767px) {
          * { cursor: auto !important; }
        }
      `}</style>
      
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          animate={{ 
            x: mousePosition.x - 16,
            y: mousePosition.y - 8,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 800, 
            damping: 35,
            mass: 0.5
          }}
        >
          {/* Fixed Wing Drone SVG */}
          <svg 
            width="32" 
            height="16" 
            viewBox="0 0 64 32" 
            className="drop-shadow-md"
          >
            {/* Fuselage */}
            <ellipse cx="32" cy="16" rx="20" ry="5" fill="hsl(var(--primary))" />
            
            {/* Nose cone */}
            <path d="M 52 16 Q 64 16 52 12 L 52 20 Q 64 16 52 16" fill="hsl(var(--primary))" />
            
            {/* Cockpit */}
            <ellipse cx="38" cy="14" rx="6" ry="3" fill="hsl(var(--primary))" opacity="0.8" />
            <ellipse cx="38" cy="14" rx="4" ry="2" fill="hsl(var(--background))" opacity="0.6" />
            
            {/* Main Wings */}
            <path d="M 24 16 L 8 8 L 8 10 L 22 16 L 8 22 L 8 24 L 24 16" fill="hsl(var(--foreground))" opacity="0.9" />
            <path d="M 40 16 L 56 8 L 56 10 L 42 16 L 56 22 L 56 24 L 40 16" fill="hsl(var(--foreground))" opacity="0.9" />
            
            {/* Tail */}
            <path d="M 12 16 L 4 12 L 4 14 L 10 16 L 4 18 L 4 20 L 12 16" fill="hsl(var(--foreground))" opacity="0.7" />
            
            {/* Vertical Stabilizer */}
            <path d="M 14 16 L 14 8 L 18 8 L 18 16" fill="hsl(var(--foreground))" opacity="0.8" />
            
            {/* Engine glow */}
            <circle cx="12" cy="16" r="2" fill="hsl(var(--primary))" opacity="0.6" />
          </svg>
        </motion.div>
      )}
    </>
  );
};

export default DroneCursor;
