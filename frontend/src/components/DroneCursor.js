import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DroneCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks(prev => [...prev, newClick]);
      
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.body.style.cursor = 'auto';
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      document.body.style.cursor = window.innerWidth < 768 ? 'auto' : 'none';
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        @media (max-width: 767px) {
          * { cursor: auto !important; }
        }
      `}</style>
      
      {/* Click Effects */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="fixed pointer-events-none z-[9998]"
            style={{ left: click.x, top: click.y }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Ripple rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  border: `2px solid ${i === 0 ? '#3b82f6' : i === 1 ? '#60a5fa' : '#93c5fd'}`,
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  width: 0, 
                  height: 0, 
                  x: '-50%', 
                  y: '-50%',
                  opacity: 0.8 
                }}
                animate={{ 
                  width: 60 + i * 30, 
                  height: 60 + i * 30, 
                  x: '-50%', 
                  y: '-50%',
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.08,
                  ease: "easeOut" 
                }}
              />
            ))}
            
            {/* Center dot */}
            <motion.div
              className="absolute rounded-full bg-primary"
              style={{ left: '50%', top: '50%' }}
              initial={{ width: 8, height: 8, x: '-50%', y: '-50%', opacity: 1 }}
              animate={{ width: 20, height: 20, x: '-50%', y: '-50%', opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Simple Elegant Cursor */}
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          animate={{ 
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, // Increased for responsiveness
            damping: 28,
            mass: 0.5
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="w-4 h-4 rounded-full border-2 border-slate-800 dark:border-white"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Center dot - Orbiting */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-4 h-4"
            style={{ x: '-50%', y: '-50%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default DroneCursor;
