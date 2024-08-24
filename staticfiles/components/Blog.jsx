import React, { useState } from 'react';
import blogImage1 from '../images/blog1.jpeg';
import blogImage2 from '../images/blog2.jpeg';
import blogImage3 from '../images/blog3.jpeg';
import blogImage5 from '../images/blog5.jpeg';

const blogs = [
  {
    id: 1,
    date: '3 AVRIL, 2023',
    title: 'Turpis at eleifend Aenean porta',
    description: 'Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Nunc urna...',
    image: blogImage1,
    link: '#'
  },
  {
    id: 2,
    date: '1 AVRIL, 2023',
    title: 'Morbi condimentum molestie Nam',
    description: 'Sed mauris Pellentesque elit Aliquam at lacus interdum nascetur elit...',
    image: blogImage2,
    link: '#'
  },
  {
    id: 3,
    date: '18 MARS, 2023',
    title: 'Curabitur at elit Vestibulum',
    description: 'Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet Vestibulum...',
    image: blogImage3,
    link: '#'
  },
  {
    id: 5,
    date: '12 MARS, 2023',
    title: 'Etiam sit amet orci eget',
    description: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient...',
    image: blogImage5,
    link: '#'
  },
];

const BlogCarousel = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent(current === blogs.length - 1 ? 0 : current + 1);
  };

  const handlePrev = () => {
    setCurrent(current === 0 ? blogs.length - 1 : current - 1);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Du Blog</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
              {blogs.map((blog) => (
                <div key={blog.id} className="w-full flex-shrink-0 md:w-1/3 px-4">
                  <div className="relative group">
                    <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover rounded-lg shadow-md" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>&gt;</span>
                    </div>
                  </div>
                  <div className="text-left mt-4">
                    <span className="text-green-600">{blog.date}</span>
                    <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
                    <p className="text-gray-600 mt-2">{blog.description}</p>
                    <a href={blog.link} className="text-blue-500 mt-2 inline-block">LIRE LA SUITE</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            &lt;
          </button>
          <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
