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

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Short delay to show loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <DroneLoader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      <DroneCursor />
      <ScrollDrone />
      <Router>
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
