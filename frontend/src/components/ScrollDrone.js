import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useAnimation } from 'framer-motion';

const ScrollDrone = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    const observer = new ResizeObserver(() => {
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // Animation Transforms
  const centerX = windowSize.width / 2;
  const rightX = windowSize.width - 60; 

  const startY = windowSize.height * 0.85;
  const topY = windowSize.height * 0.15;
  const endY = windowSize.height * 0.9;

  const xRange = useTransform(
    scrollY,
    [0, windowSize.height / 2], 
    [centerX - 30, rightX]
  );

  const yRange = useTransform(
    scrollY,
    [0, windowSize.height / 2, docHeight],
    [startY, topY, endY] 
  );

  const scaleRange = useTransform(
    scrollY,
    [0, windowSize.height / 2],
    [1.5, 0.8] 
  );
  
  const x = useSpring(xRange, { stiffness: 80, damping: 25 });
  const y = useSpring(yRange, { stiffness: 80, damping: 25 });
  const scale = useSpring(scaleRange, { stiffness: 80, damping: 25 });

  const pathOpacity = useTransform(scrollY, [windowSize.height * 0.4, windowSize.height * 0.8], [0, 0.4]);
  const pathLength = useTransform(scrollY, [windowSize.height, docHeight], [0, 1]);

  // --- Interaction & Color Logic ---
  const controls = useAnimation();
  const [showTooltip, setShowTooltip] = useState(true);
  const [droneColor, setDroneColor] = useState('#3b82f6'); // Default Blue

  // Color Changing Effect
  useEffect(() => {
    const colors = [
      '#ef4444', // Red
      '#f97316', // Orange
      '#eab308', // Yellow
      '#22c55e', // Green
      '#06b6d4', // Cyan
      '#3b82f6', // Blue
      '#8b5cf6', // Violet
      '#ec4899', // Pink
      '#14b8a6'  // Teal
    ];

    let timeoutId;
    
    const changeColor = () => {
       const randomColor = colors[Math.floor(Math.random() * colors.length)];
       setDroneColor(randomColor);
       
       const nextInterval = Math.floor(Math.random() * 2000) + 3000;
       timeoutId = setTimeout(changeColor, nextInterval);
    };

    timeoutId = setTimeout(changeColor, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Default Hover Animation
  const startHover = async () => {
    await controls.start({
      y: [0, -8, 0],
      x: [-4, 4, -4],
      rotateZ: [-2, 2, -2],
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }
    });
  };

  useEffect(() => {
    startHover();
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleDroneClick = async () => {
    setShowTooltip(false);
    
    const maneuvers = [
      { rotateZ: 360, transition: { duration: 0.8, ease: "backOut" } },
      { rotateX: 360, transition: { duration: 0.8, ease: "backOut" } },
      { rotateY: 360, transition: { duration: 0.8, ease: "backOut" } },
      { x: -100, rotateZ: -15, transition: { duration: 0.2, yoyo: 1 } },
      { x: 100, rotateZ: 15, transition: { duration: 0.2, yoyo: 1 } },
      { y: 50, transition: { type: "spring", stiffness: 300, damping: 10 } },
      { scale: 1.5, transition: { duration: 0.3, yoyo: 1 } },
      { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
      { x: [0, 30, 0, -30, 0], y: [0, -30, -60, -30, 0], transition: { duration: 0.8 } },
      { opacity: [1, 0, 1, 0, 1], x: [0, 10, -10, 0], transition: { duration: 0.3 } }
    ];

    const randomManeuver = maneuvers[Math.floor(Math.random() * maneuvers.length)];
    controls.stop();
    await controls.start(randomManeuver);
    startHover();
  };

  if (windowSize.width < 768) return null;

  return (
    <>
      {/* Side Path */}
      <motion.div 
        className="fixed right-[60px] top-[15vh] w-0.5 z-40"
        style={{ height: '75vh', opacity: pathOpacity }}
      >
        <div className="absolute top-0 left-0 w-full h-full border-r-2 border-dashed border-muted-foreground/30" />
        <motion.div 
            className="absolute top-0 left-0 w-full shadow-[0_0_10px_var(--primary)]"
            style={{ 
              height: '100%', 
              originY: 0, 
              scaleY: pathLength,
              backgroundColor: droneColor 
            }}
            animate={{ backgroundColor: droneColor }}
            transition={{ duration: 1 }}
        />
      </motion.div>

      {/* Drone Container */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-auto cursor-pointer"
        style={{ x, y, scale }}
        onClick={handleDroneClick}
        whileHover={{ scale: 1.1 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
            
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-primary/20 shadow-sm pointer-events-none"
                style={{ color: droneColor }}
            >
                Tap me for a surprise!
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-background/80 border-r border-b border-primary/20 rotate-45" />
            </motion.div>

            {/* Detailed Tech Drone SVG */}
            <motion.div animate={controls}>
                <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-xl filter drop-shadow-primary/40">
                    <defs>
                         {/* Glow Filter */}
                         <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        
                        {/* Glossy Reflection Gradient (Top to Bottom) */}
                        <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                            <stop offset="20%" stopColor="white" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="white" stopOpacity="0" />
                            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
                        </linearGradient>

                        {/* Glass Dome Gradient */}
                        <radialGradient id="glassDome" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Rear Arms */}
                    <path d="M35 50 L15 30" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
                    <path d="M65 50 L85 30" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Front Arms */}
                    <path d="M35 50 L15 70" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
                    <path d="M65 50 L85 70" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />

                    {/* === Main Body Chassis === */}
                    {/* Base Color Layer */}
                    <motion.path 
                      d="M40 35 L60 35 L65 50 L60 65 L40 65 L35 50 Z" 
                      stroke="hsl(var(--foreground))" 
                      strokeWidth="1"
                      animate={{ fill: droneColor }}
                      transition={{ duration: 1 }}
                    />
                    
                    {/* Gloss Overlay Layer */}
                    <path 
                      d="M40 35 L60 35 L65 50 L60 65 L40 65 L35 50 Z" 
                      fill="url(#glossHighlight)"
                      style={{ mixBlendMode: 'soft-light' }}
                    />
                    
                    {/* Sharp Specular Highlight (Top Edge) */}
                    <path 
                      d="M42 37 L58 37 L59 39 L41 39 Z"
                      fill="white"
                      opacity="0.6"
                      filter="blur(0.5px)"
                    />

                    {/* === Center Dome/Core === */}
                    <motion.circle 
                      cx="50" cy="50" r="8" 
                      animate={{ fill: droneColor }}
                      transition={{ duration: 1 }}
                    />
                    {/* Dome Gloss Reflection */}
                    <circle cx="50" cy="50" r="8" fill="url(#glassDome)" opacity="0.6" />
                    
                    {/* Propeller Motors & Blades */}
                    <g transform="translate(15, 30)">
                        <circle r="4" fill="hsl(var(--foreground))" />
                        {/* Motor Gloss */}
                        <circle r="3" fill="url(#glassDome)" opacity="0.5" />
                        <g className="animate-[spin_0.08s_linear_infinite]">
                             <ellipse cx="0" cy="0" rx="14" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                             <ellipse cx="0" cy="0" rx="2" ry="14" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                        </g>
                    </g>
                    <g transform="translate(85, 30)">
                        <circle r="4" fill="hsl(var(--foreground))" />
                        <circle r="3" fill="url(#glassDome)" opacity="0.5" />
                         <g className="animate-[spin_0.08s_linear_infinite]">
                             <ellipse cx="0" cy="0" rx="14" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                             <ellipse cx="0" cy="0" rx="2" ry="14" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                        </g>
                    </g>
                    <g transform="translate(15, 70)">
                        <circle r="4" fill="hsl(var(--foreground))" />
                        <circle r="3" fill="url(#glassDome)" opacity="0.5" />
                         <g className="animate-[spin_0.08s_linear_infinite]">
                             <ellipse cx="0" cy="0" rx="14" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                             <ellipse cx="0" cy="0" rx="2" ry="14" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                        </g>
                    </g>
                    <g transform="translate(85, 70)">
                        <circle r="4" fill="hsl(var(--foreground))" />
                        <circle r="3" fill="url(#glassDome)" opacity="0.5" />
                         <g className="animate-[spin_0.08s_linear_infinite]">
                             <ellipse cx="0" cy="0" rx="14" ry="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                             <ellipse cx="0" cy="0" rx="2" ry="14" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                        </g>
                    </g>

                    {/* Center Light / Eye */}
                    <motion.circle 
                        cx="50" cy="50" r="3" 
                        filter="url(#glow)"
                        fill="white"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    
                    {/* Navigation Lights - synced to drone color for full effect */}
                    {/* Added white core for glass look */}
                    <g filter="url(#glow)">
                      <motion.circle cx="15" cy="30" r="1.5" animate={{ fill: droneColor }} transition={{ duration: 1 }} />
                      <circle cx="15" cy="30" r="0.5" fill="white" />
                      
                      <motion.circle cx="85" cy="30" r="1.5" animate={{ fill: droneColor }} transition={{ duration: 1 }} />
                      <circle cx="85" cy="30" r="0.5" fill="white" />

                      <motion.circle cx="15" cy="70" r="1.5" animate={{ fill: droneColor }} transition={{ duration: 1 }} />
                      <circle cx="15" cy="70" r="0.5" fill="white" />

                      <motion.circle cx="85" cy="70" r="1.5" animate={{ fill: droneColor }} transition={{ duration: 1 }} />
                      <circle cx="85" cy="70" r="0.5" fill="white" />
                    </g>
                </svg>
            </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollDrone;
