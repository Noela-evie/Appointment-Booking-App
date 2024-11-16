import React from 'react';
import img from '../../../assets/images/bg-sign-in-basic.jpg';

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative py-16 text-white"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative container mx-auto flex justify-center items-center">
        <form className="w-full max-w-lg p-8 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg text-gray-200">
          <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>

          {/* Name Input */}
          <div className="relative mb-6">
            <input
              type="text"
              className="peer w-full border border-gray-300 p-4 rounded-lg bg-transparent text-white placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="absolute left-4 top-3 text-gray-300 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-blue-400">
              Your Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <input
              type="email"
              className="peer w-full border border-gray-300 p-4 rounded-lg bg-transparent text-white placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="absolute left-4 top-3 text-gray-300 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-blue-400">
              Your Email
            </label>
          </div>

          {/* Message Input */}
          <div className="relative mb-6">
            <textarea
              rows="4"
              className="peer w-full border border-gray-300 p-4 rounded-lg bg-transparent text-white placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <label className="absolute left-4 top-3 text-gray-300 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-blue-400">
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
