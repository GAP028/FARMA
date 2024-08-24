import React from 'react';
import client1 from '../images/client1.webp'; //image path
import client2 from '../images/client2.webp'; 
import client3 from '../images/client3.webp'; 

const testimonials = [
  {
    name: 'Luies Charls',
    position: 'Helper',
    testimonial: 'Galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    image: client1,
  },
  {
    name: 'Jecob Goeckno',
    position: 'Unit Manager',
    testimonial: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    image: client2,
  },
  {
    name: 'Mr. Danial Smith',
    position: 'Sales Person',
    testimonial: 'Publishing printer took a galley. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    image: client3,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div className="text-left">
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
