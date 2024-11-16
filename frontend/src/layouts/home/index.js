import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';



const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
        <Hero />

      {/* About Us Section */}
        <About />

      {/* Services Section */}
         <Services />

         {/* Testimonials Section */}
         <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
