import React from 'react';
import clinicImage from '../../../assets/images/clinicImage.jpg';

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${clinicImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-md text-center text-white">
        {/* Typewriter animation for the title */}
        <h1 className="text-4xl font-bold mb-4 typewriter-animation">
          Welcome to Capstone Clinic
        </h1>
        <p className="mb-6 text-lg">Providing the best healthcare services for you and your family.</p>
        <a
          href="#services"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Explore Our Services
        </a>
      </div>

      {/* Typewriter Animation Styles */}
      <style jsx>{`
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
        .typewriter-animation {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid white;
          width: 0;
          animation: typewriter 3s steps(30, end) forwards, blink 0.5s step-end infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
