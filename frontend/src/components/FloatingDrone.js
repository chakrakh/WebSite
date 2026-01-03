import React from 'react';
import { motion } from 'framer-motion';

const FloatingDrone = ({ className = "", size = "md" }) => {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 },
    xl: { width: 120, height: 120 },
  };

  const { width, height } = sizes[size] || sizes.md;

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 64 64" 
        className="drop-shadow-xl"
      >
        {/* Drone Body */}
        <motion.ellipse 
          cx="32" 
          cy="32" 
          rx="10" 
          ry="5" 
          fill="hsl(var(--primary))"
          animate={{ ry: [5, 4.5, 5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Arms */}
        <line x1="22" y1="32" x2="8" y2="18" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="32" x2="56" y2="18" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="32" x2="8" y2="46" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="32" x2="56" y2="46" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Motor housings */}
        <circle cx="8" cy="18" r="3.5" fill="hsl(var(--foreground))" />
        <circle cx="56" cy="18" r="3.5" fill="hsl(var(--foreground))" />
        <circle cx="8" cy="46" r="3.5" fill="hsl(var(--foreground))" />
        <circle cx="56" cy="46" r="3.5" fill="hsl(var(--foreground))" />
        
        {/* Spinning Propellers */}
        <motion.ellipse 
          cx="8" cy="18" rx="9" ry="2" 
          fill="hsl(var(--muted-foreground))" 
          opacity="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '8px 18px' }}
        />
        <motion.ellipse 
          cx="56" cy="18" rx="9" ry="2" 
          fill="hsl(var(--muted-foreground))" 
          opacity="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '56px 18px' }}
        />
        <motion.ellipse 
          cx="8" cy="46" rx="9" ry="2" 
          fill="hsl(var(--muted-foreground))" 
          opacity="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '8px 46px' }}
        />
        <motion.ellipse 
          cx="56" cy="46" rx="9" ry="2" 
          fill="hsl(var(--muted-foreground))" 
          opacity="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '56px 46px' }}
        />
        
        {/* Camera/Gimbal */}
        <rect x="28" y="35" width="8" height="5" rx="1" fill="hsl(var(--foreground))" />
        <motion.circle 
          cx="32" cy="37.5" r="2" 
          fill="hsl(var(--primary))"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Status LEDs */}
        <motion.circle 
          cx="8" cy="18" r="1.5" 
          fill="#22c55e"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.circle 
          cx="56" cy="18" r="1.5" 
          fill="#22c55e"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
        />
        <motion.circle 
          cx="8" cy="46" r="1.5" 
          fill="#ef4444"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />
        <motion.circle 
          cx="56" cy="46" r="1.5" 
          fill="#ef4444"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
        />
      </svg>
      
      {/* Shadow on ground */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-foreground/10 rounded-full blur-sm"
        animate={{ 
          scale: [1, 0.9, 1],
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default FloatingDrone;
