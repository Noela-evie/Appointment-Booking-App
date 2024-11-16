import React from 'react';
import cardiology from '../../../assets/images/cardiology.jpg';
import pediatrics from '../../../assets/images/pediatrics.jpg';
import generalmedicine from '../../../assets/images/generalmedicine.jpg';
import dermatology from '../../../assets/images/dermatology.jpg';

const Services = () => {
  const services = [
    {
      title: 'General Medicine',
      description: 'Expert care for everyday health concerns, from routine check-ups to urgent medical needs, our dedicated team is here for you 24/7.',
      image: generalmedicine,
    },
    {
      title: 'Pediatrics',
      description: 'Nurturing healthcare for infants, children, and adolescents, providing personalized attention and support for happy, healthy growth.',
      image: pediatrics,
    },
    {
      title: 'Dermatology',
      description: 'Comprehensive skin care solutions, from cosmetic treatments to advanced dermatological surgeries, ensuring radiant, healthy skin for life.',
      image: dermatology,
    },
    {
      title: 'Cardiology',
      description: 'State-of-the-art heart care, combining cutting-edge technology with compassionate expertise for accurate diagnoses and effective treatments.',
      image: cardiology,
    },
  ];

  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
