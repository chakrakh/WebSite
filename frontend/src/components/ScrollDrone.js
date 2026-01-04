import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

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
  // Phase 1: Hero Section (0 to windowHeight)
  // Drone moves from Bottom-Center to Right-Side-Top
  
  // X Position: 50% (Center) -> 95% (Right)
  // We use pixels for precision. Center = width/2. Right = width - 50.
  const centerX = windowSize.width / 2;
  const rightX = windowSize.width - 60; // 60px padding from right

  // Y Position: 90vh (Bottom) -> 15vh (Top)
  const bottomY = windowSize.height * 0.9;
  const topY = windowSize.height * 0.15;
  const endY = windowSize.height * 0.9; // Bottom of screen for end of scroll

  const xRange = useTransform(
    scrollY,
    [0, windowSize.height / 2], // Trigger earlier
    [centerX - 30, rightX] // -30 to center the 60px width drone
  );

  const yRange = useTransform(
    scrollY,
    [0, windowSize.height / 2, docHeight],
    [bottomY, topY, endY] // Start at Hero Bottom -> Go to Side Top -> Scroll down to Side Bottom
  );

  const scaleRange = useTransform(
    scrollY,
    [0, windowSize.height / 2],
    [1.5, 0.8] // Big in Hero, smaller in side scroll
  );
  
  const rotateRange = useTransform(
      scrollY,
      [0, windowSize.height / 2],
      [0, 90] // Rotate to face down? No, user didn't ask. 
      // User said "move to right side... moving while going down". 
      // Default orientation is fine.
  );

  // Smooth out the movement
  const x = useSpring(xRange, { stiffness: 100, damping: 20 });
  const y = useSpring(yRange, { stiffness: 100, damping: 20 });
  const scale = useSpring(scaleRange, { stiffness: 100, damping: 20 });

  // Bounce animation for Hero Mode only
  // We can't easily mix useSpring with keyframes in the same style prop for layout.
  // Instead we'll use a child element for the bounce that fades out.
  const bounceOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  
  // Path Opacity (Visible only after leaving hero)
  const pathOpacity = useTransform(scrollY, [windowSize.height * 0.4, windowSize.height * 0.8], [0, 0.5]);
  const pathLength = useTransform(scrollY, [windowSize.height, docHeight], [0, 1]);

  if (windowSize.width < 768) return null; // Hide on mobile for now

  return (
    <>
      {/* Side Path */}
      <motion.div 
        className="fixed right-[60px] top-[15vh] w-0.5 bg-border z-40"
        style={{ 
            height: '75vh', 
            opacity: pathOpacity 
        }}
      >
          {/* Progress fill */}
          <motion.div 
            className="absolute top-0 left-0 w-full bg-primary"
            style={{ 
                height: '100%', 
                originY: 0,
                scaleY: pathLength
            }} 
          />
      </motion.div>

      {/* Drone Container */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ x, y, scale }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
             {/* Bouncing Text in Hero */}
            <motion.div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-primary"
                style={{ opacity: bounceOpacity }}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                SCROLL DOWN
            </motion.div>

            {/* Drone SVG */}
            <motion.div
                animate={scrollY.get() < 100 ? { y: [0, -15, 0] } : { y: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="60" height="60" viewBox="0 0 64 64" className="drop-shadow-lg filter drop-shadow-primary/50">
                    {/* Drone Body */}
                    <ellipse cx="32" cy="32" rx="10" ry="5" fill="hsl(var(--primary))" />
                    
                    {/* Arms */}
                    <line x1="22" y1="32" x2="10" y2="20" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="42" y1="32" x2="54" y2="20" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="22" y1="32" x2="10" y2="44" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="42" y1="32" x2="54" y2="44" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Spinning Propellers */}
                    <g className="animate-[spin_0.1s_linear_infinite] origin-[10px_20px]">
                        <ellipse cx="10" cy="20" rx="10" ry="2.5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                    </g>
                     <g className="animate-[spin_0.1s_linear_infinite] origin-[54px_20px]">
                        <ellipse cx="54" cy="20" rx="10" ry="2.5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                    </g>
                     <g className="animate-[spin_0.1s_linear_infinite] origin-[10px_44px]">
                        <ellipse cx="10" cy="44" rx="10" ry="2.5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                    </g>
                     <g className="animate-[spin_0.1s_linear_infinite] origin-[54px_44px]">
                        <ellipse cx="54" cy="44" rx="10" ry="2.5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                    </g>
                    
                    {/* Camera/Sensor */}
                    <circle cx="32" cy="32" r="3" fill="hsl(var(--background))" />
                    <motion.circle 
                        cx="32" cy="32" r="1.5" 
                        fill="#ef4444"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    
                     {/* Lights */}
                    <circle cx="10" cy="20" r="1.5" fill="#22c55e" />
                    <circle cx="54" cy="20" r="1.5" fill="#22c55e" />
                    <circle cx="10" cy="44" r="1.5" fill="#ef4444" />
                    <circle cx="54" cy="44" r="1.5" fill="#ef4444" />
                </svg>
            </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollDrone;
