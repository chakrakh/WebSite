import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LaunchHaanth from "./pages/LaunchHaanth";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launch-haanth" element={<LaunchHaanth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
