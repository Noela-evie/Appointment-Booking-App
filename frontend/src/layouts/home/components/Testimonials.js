import React from 'react';
import austin from '../../../assets/images/austin.jpg';
import becca from '../../../assets/images/becca.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Musazira Austin',
      feedback: 'Amazing service and professional staff!',
      image: austin,
    },
    {
      name: 'Birungi Becca',
      feedback: 'I felt very comfortable and cared for during my treatment.',
      image: becca,
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimony, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src={testimony.image}
                alt={testimony.name}
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />
              <p className="italic text-gray-600 mb-4">&ldquo;{testimony.feedback}&rdquo;</p>
              <h3 className="font-bold">{testimony.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
