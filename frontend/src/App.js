import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LaunchHaanth from './pages/LaunchHaanth';
import { ThemeProvider } from './components/ThemeContext';
import DroneCursor from './components/DroneCursor';
import DroneLoader from './components/DroneLoader';
import ScrollDrone from './components/ScrollDrone';
import PageTransition from './components/PageTransition';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [droneColor, setDroneColor] = useState('#3b82f6');

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  // Global Color Cycling for Drone Sync
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

  return (
    <ThemeProvider>
      <DroneLoader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      <DroneCursor droneColor={droneColor} />
      <Router>
        <ScrollDrone droneColor={droneColor} />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launch-haanth" element={<LaunchHaanth />} />
          </Routes>
        </PageTransition>
      </Router>
    </ThemeProvider>
  );
}

export default App;
