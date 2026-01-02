import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Product from '../components/Product';
import Team from '../components/Team';
import Roadmap from '../components/Roadmap';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Product />
      <Team />
      <Roadmap />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
