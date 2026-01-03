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
      
      // Remove click after animation
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
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
      {/* Hide default cursor globally */}
      <style>{`
        * { cursor: none !important; }
        @media (max-width: 767px) {
          * { cursor: auto !important; }
        }
      `}</style>
      
      {/* Click Explosions */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="fixed pointer-events-none z-[9998]"
            style={{ left: click.x, top: click.y }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Explosion rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  borderColor: i === 0 ? 'hsl(var(--primary))' : i === 1 ? '#f97316' : '#fbbf24',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  width: 0, 
                  height: 0, 
                  x: '-50%', 
                  y: '-50%',
                  opacity: 1 
                }}
                animate={{ 
                  width: 80 + i * 40, 
                  height: 80 + i * 40, 
                  x: '-50%', 
                  y: '-50%',
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
              />
            ))}
            
            {/* Spark particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? 'hsl(var(--primary))' : '#f97316',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  x: '-50%', 
                  y: '-50%',
                  scale: 1,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.cos(i * 45 * Math.PI / 180) * 60 - 4,
                  y: Math.sin(i * 45 * Math.PI / 180) * 60 - 4,
                  scale: 0,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut" 
                }}
              />
            ))}
            
            {/* Center flash */}
            <motion.div
              className="absolute rounded-full bg-white"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ 
                width: 20, 
                height: 20, 
                x: '-50%', 
                y: '-50%',
                opacity: 1 
              }}
              animate={{ 
                width: 40, 
                height: 40, 
                x: '-50%', 
                y: '-50%',
                opacity: 0 
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Rocket Drone Cursor */}
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          animate={{ 
            x: mousePosition.x - 12,
            y: mousePosition.y - 20,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 800, 
            damping: 35,
            mass: 0.5
          }}
        >
          {/* Vertical Rocket Drone SVG */}
          <svg 
            width="24" 
            height="40" 
            viewBox="0 0 24 40" 
            className="drop-shadow-lg"
          >
            {/* Rocket body */}
            <defs>
              <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Nose cone */}
            <path 
              d="M 12 0 Q 6 8 6 12 L 18 12 Q 18 8 12 0" 
              fill="url(#rocketGradient)"
            />
            
            {/* Main body */}
            <rect x="6" y="12" width="12" height="16" rx="1" fill="url(#rocketGradient)" />
            
            {/* Window/sensor */}
            <circle cx="12" cy="16" r="3" fill="hsl(var(--background))" opacity="0.8" />
            <circle cx="12" cy="16" r="2" fill="hsl(var(--primary))" opacity="0.6" />
            
            {/* Fins */}
            <path d="M 6 24 L 2 32 L 6 28 Z" fill="hsl(var(--foreground))" opacity="0.8" />
            <path d="M 18 24 L 22 32 L 18 28 Z" fill="hsl(var(--foreground))" opacity="0.8" />
            
            {/* Engine nozzle */}
            <path d="M 8 28 L 6 32 L 18 32 L 16 28 Z" fill="hsl(var(--foreground))" />
            
            {/* Animated flame */}
            <motion.path
              d="M 9 32 Q 12 38 12 40 Q 12 38 15 32"
              fill="url(#flameGradient)"
              animate={{
                d: [
                  "M 9 32 Q 12 36 12 38 Q 12 36 15 32",
                  "M 9 32 Q 12 40 12 44 Q 12 40 15 32",
                  "M 9 32 Q 12 36 12 38 Q 12 36 15 32",
                ]
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner flame */}
            <motion.path
              d="M 10 32 Q 12 35 12 36 Q 12 35 14 32"
              fill="#fef3c7"
              animate={{
                d: [
                  "M 10 32 Q 12 34 12 35 Q 12 34 14 32",
                  "M 10 32 Q 12 38 12 40 Q 12 38 14 32",
                  "M 10 32 Q 12 34 12 35 Q 12 34 14 32",
                ]
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* LED lights */}
            <motion.circle 
              cx="8" cy="20" r="1" 
              fill="#22c55e"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.circle 
              cx="16" cy="20" r="1" 
              fill="#ef4444"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
            />
          </svg>
          
          {/* Glow effect under rocket */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default DroneCursor;
