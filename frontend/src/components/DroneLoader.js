import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DroneLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete]);

  // Path points for drone to follow
  const pathPoints = [
    { x: 10, y: 50 },
    { x: 25, y: 30 },
    { x: 40, y: 60 },
    { x: 55, y: 25 },
    { x: 70, y: 55 },
    { x: 85, y: 35 },
    { x: 95, y: 50 },
  ];

  const currentPointIndex = Math.min(
    Math.floor((progress / 100) * (pathPoints.length - 1)),
    pathPoints.length - 2
  );
  
  const progressInSegment = ((progress / 100) * (pathPoints.length - 1)) % 1;
  
  const currentX = pathPoints[currentPointIndex].x + 
    (pathPoints[currentPointIndex + 1].x - pathPoints[currentPointIndex].x) * progressInSegment;
  const currentY = pathPoints[currentPointIndex].y + 
    (pathPoints[currentPointIndex + 1].y - pathPoints[currentPointIndex].y) * progressInSegment;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flight Path Container */}
          <div className="relative w-80 h-40 mb-8">
            {/* Path Line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80">
              {/* Dashed path showing route */}
              <path
                d={`M ${pathPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                opacity="0.5"
              />
              
              {/* Completed path */}
              <motion.path
                d={`M ${pathPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.1 }}
              />
              
              {/* Waypoints */}
              {pathPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill={progress >= (index / (pathPoints.length - 1)) * 100 
                      ? "hsl(var(--primary))" 
                      : "hsl(var(--muted-foreground))"}
                    opacity={progress >= (index / (pathPoints.length - 1)) * 100 ? 1 : 0.3}
                  />
                  {index === pathPoints.length - 1 && (
                    <text
                      x={point.x}
                      y={point.y - 6}
                      textAnchor="middle"
                      className="fill-primary text-[6px] font-bold"
                    >
                      GOAL
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* Animated Drone */}
            <motion.div
              className="absolute"
              style={{
                left: `${currentX}%`,
                top: `${currentY}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 64 64" className="drop-shadow-lg">
                {/* Drone Body */}
                <ellipse cx="32" cy="32" rx="8" ry="4" fill="hsl(var(--primary))" />
                
                {/* Arms */}
                <line x1="24" y1="32" x2="12" y2="20" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="40" y1="32" x2="52" y2="20" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="24" y1="32" x2="12" y2="44" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="40" y1="32" x2="52" y2="44" stroke="hsl(var(--foreground))" strokeWidth="2" />
                
                {/* Spinning Propellers */}
                <g className="animate-spin origin-center" style={{ transformOrigin: '12px 20px', animationDuration: '0.08s' }}>
                  <ellipse cx="12" cy="20" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.8" />
                </g>
                <g className="animate-spin origin-center" style={{ transformOrigin: '52px 20px', animationDuration: '0.08s' }}>
                  <ellipse cx="52" cy="20" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.8" />
                </g>
                <g className="animate-spin origin-center" style={{ transformOrigin: '12px 44px', animationDuration: '0.08s' }}>
                  <ellipse cx="12" cy="44" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.8" />
                </g>
                <g className="animate-spin origin-center" style={{ transformOrigin: '52px 44px', animationDuration: '0.08s' }}>
                  <ellipse cx="52" cy="44" rx="8" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.8" />
                </g>
                
                {/* Camera */}
                <circle cx="32" cy="36" r="3" fill="hsl(var(--foreground))" />
                <circle cx="32" cy="36" r="1.5" fill="hsl(var(--primary))" />
              </svg>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-md"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            className="mt-4 text-muted-foreground text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing Flight Systems... {progress}%
          </motion.p>

          {/* Brand */}
          <div className="mt-8 flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">CHAKRAKH</span>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">Technologies</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DroneLoader;
