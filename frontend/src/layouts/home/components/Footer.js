import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../../assets/images/apple-icon.png';
import bgImage from '../../../assets/images/bgimage.jpg';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-blue-700 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
          {/* First Column: Clinic Info */}
          <div className="mb-8 flex flex-col items-center md:items-start">
            <img src={logo} alt="Capstone Clinic Logo" className="w-24 h-24 mb-4" />
            <h3 className="text-6xl font-semibold">Capstone Clinic</h3>
            <p className="mt-2 text-gray-200 max-w-xs mx-auto md:mx-0">
              Providing exceptional healthcare services to our community with compassionate care and expertise.
            
            </p>
          </div>

          {/* Second Column: Social Media & Contact */}
          <div className="mb-8 flex flex-col items-center md:items-start">
            <div className="flex justify-center md:justify-start space-x-8 mb-6">
              <a
                href="#"
                className="text-gray-200 hover:text-white transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>

            <div className="flex justify-center md:justify-start space-x-8 mb-6">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt size={20} className="text-gray-200" />
                <p className="text-gray-200">+256 771 234 567</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope size={20} className="text-gray-200" />
                <p className="text-gray-200">info@capstoneclinic.com</p>
              </div>
            </div>

          
            <div className="flex justify-center md:justify-start mb-6">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt size={20} className="text-gray-200" />
                <p className="text-gray-200">123 Health St, Wellness City, 4567</p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start space-x-8">
              <a
                href="#"
                className="text-gray-200 hover:text-white transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-gray-200 text-sm text-center mt-8">
          &copy; {new Date().getFullYear()} Capstone Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
