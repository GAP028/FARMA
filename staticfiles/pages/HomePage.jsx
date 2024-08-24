import React from 'react';
import banner1 from '../images/slider/cms-banner-2.jpeg';
import banner2 from '../images/slider/cms1.jpeg';
import banner3 from '../images/slider/cms3.jpeg';
import banner4 from '../images/slider/sample2.jpeg';
import banner5 from '../images/slider/subbanner1.jpeg';
import faceMask from '../images/n.jpeg';
import supplement from '../images/supplement.jpeg';
import dethol from '../images/s.jpeg';
import lightAlarm from '../images/u.jpeg';
import bp_machine from '../images/bp_machine.jpeg';
import Testimonials from '../components/Testimonials';
import Brands from '../components/Brands';
import Blog from '../components/Blog';

const sliderItems = [
  { id: 1, discount: '30%', title: 'Mechanic MC24S Microscope', price: '$149.00', description: 'Starting At Only', image: banner1, link: '#' },
  { id: 2, discount: '20%', title: 'Nourishing Vitamins And Minerals', price: '', description: 'UP TO 20% OFF', image: banner2, link: '#' },
  { id: 3, discount: '20%', title: 'Blood Pressure Monitor', price: '', description: 'UP TO 20% OFF', image: banner3, link: '#' },
  { id: 4, discount: '25%', title: 'Strong Effect Pro Bottle', price: '', description: 'UP TO 25% OFF', image: banner4, link: '#' },
  { id: 5, discount: '30%', title: 'Surgical Face Masks', price: '', description: 'UP TO 30% OFF', image: banner5, link: '#' }
];

const products = [
  { id: 1, title: 'Inlife Heart Care Supplement Vegetarian', price: '47,00 $', image: faceMask, rating: 4, discount: null, newPrice: null, isNew: false },
  { id: 2, title: 'Oxin Nutrition Omega 3 Triple Strength Capsule', price: '58,00 $', newPrice: '51,04 $', discount: '-12%', image: supplement, rating: 4, isNew: true },
  { id: 3, title: 'Dettol Germ Protection Handwash Liquid', price: '58,00 $', newPrice: null, discount: null, image: dethol, rating: 4, isNew: true },
  { id: 4, title: 'TV Night Light Alarm Clock for Patient Desk', price: '69,00 $', newPrice: '64,17 $', discount: '-7%', image: lightAlarm, rating: 5, isNew: false },
  { id: 5, title: 'Blood Pressure Machine', price: '69,00 $', newPrice: '64,17 $', discount: '-4%', image: bp_machine, rating: 5, isNew: false }
];

const Home = () => {
  return (
    <div>
      {/* Slider Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap justify-center">
            {sliderItems.map((item) => (
              <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4">
                <div className="relative group">
                  <img src={item.image} alt={item.title} className="w-full h-60 object-cover rounded-lg shadow-md" />
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-xs p-1 rounded-br-lg">{item.discount}</div>
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="text-yellow-400">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Produits Présentés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="relative group">
                <img src={product.image} alt={product.title} className="w-full h-60 object-cover rounded-lg shadow-md" />
                {product.discount && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-xs p-1 rounded-br-lg">
                    {product.discount}
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-0 left-8 bg-green-600 text-white text-xs p-1 rounded-br-lg">
                    NEUF
                  </div>
                )}
                <div className="text-left mt-4">
                  <h3 className="text-xl font-bold mt-2">{product.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    {product.newPrice ? (
                      <div className="text-lg text-green-600">
                        {product.newPrice}
                        <span className="line-through text-gray-500 text-sm ml-2">{product.price}</span>
                      </div>
                    ) : (
                      <div className="text-lg text-green-600">{product.price}</div>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-yellow-500 ${i < product.rating ? 'fas fa-star' : 'far fa-star'}`}></span>
                    ))}
                  </div>
                  <a href={product.link} className="text-blue-500 mt-2 inline-block">SHOP NOW</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Brands />
      <Blog />
    </div>
  );
};

export default Home;





