import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
    className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
      isScrolled
        ? 'bg-white text-blue-600 shadow-lg'
        : 'bg-gray-800/30 text-white shadow-md'
    }`}
  >
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="font-bold text-2xl">
          <a href="#home" className="hover:text-blue-700">Capstone clinic</a>
        </div>
        <nav className="space-x-6 font-bold">
          <a href="#home" className="hover:text-black">Home</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#services" className="hover:text-black">Services</a>
          <a href="#contact" className="hover:text-black">Contact</a>
          <a
            href="/auth/login"
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              isScrolled
                ? 'bg-blue-700 text-white hover:bg-blue-500'
                : 'bg-blue-700 text-white hover:bg-blue-300'
            }`}
          >
            Login
          </a>
        </nav>
        <a
          href="/auth/login"
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${
            isScrolled ? 'bg-blue-700 text-white hover:bg-white hover:text-blue-700' : 'bg-white text-blue-700 hover:bg-blue-700 hover:text-white'
          }`}
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
};

export default Navbar;
