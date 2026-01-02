import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LaunchHaanth from './pages/LaunchHaanth';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launch-haanth" element={<LaunchHaanth />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
