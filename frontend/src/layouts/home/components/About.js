import React from 'react';
import staff from '../../../assets/images/staff.jpg';

const About = () => {
  return (
    <section id="about" className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">About Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-full md:w-1/2">
            <img
              src={staff}
              alt="About Us"
              className="w-full rounded-lg shadow-lg object-cover"
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">
                Dedicated to your health and well-being for over 20 years.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 text-left">
            <p className="text-gray-700 mb-4">
              Established over 20 years ago, our hospital has been at the forefront of delivering exceptional healthcare services to the community. From humble beginnings, we have grown into a state-of-the-art facility offering a wide range of medical specialties, cutting-edge technology, and personalized patient care.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is to provide accessible, compassionate, and high-quality medical care that meets the needs of our diverse community. We are committed to fostering a culture of innovation and excellence, driven by a passion for improving lives.
            </p>
            <p className="text-gray-700 mb-4">
              Vision: To be recognized as a leading healthcare provider known for integrity, innovation, and exceptional patient outcomes.
            </p>
            <p className="text-gray-700">
              Over the years, we have achieved numerous milestones, including:
              <ul className="list-disc list-inside ml-4">
                <li>Winning multiple awards for patient satisfaction and medical excellence.</li>
                <li>Expanding to offer over 30 specialized departments and services.</li>
                <li>Partnering with renowned healthcare institutions worldwide.</li>
                <li>Serving over 500,000 patients annually with care and dedication.</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
