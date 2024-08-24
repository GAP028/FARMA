import React, { useState } from 'react';
import faceMask from '../images/n.jpeg';
import supplement from '../images/supplement.jpeg';
import dethol from '../images/s.jpeg';
import lightAlarm from '../images/u.jpeg';
import thermo from '../images/ther.jpeg';
import be from '../images/be.jpeg';
import today from '../images/today.jpeg';
import digital from '../images/digital.jpeg';
import thermometer from '../images/thermometer.jpeg';
import zz from '../images/zz.jpeg';
import biotech_oxy from '../images/biotech_oxy.jpeg';
import gloves from '../images/gloves.jpeg';
import emergency_box from '../images/emergency_box.jpeg';
import bp_machine from '../images/bp_machine.jpeg';

const products = [
  { src: faceMask, name: 'Face Mask', price: 30, rating: 4, size: 'M', color: 'White', brand: 'Brand A', condition: 'new' },
  { src: supplement, name: 'Supplement', price: 40, rating: 5, size: 'L', color: 'Yellow', brand: 'Brand B', condition: 'new' },
  { src: dethol, name: 'Dethol', price: 50, rating: 3, size: 'S', color: 'Blue', brand: 'Brand C', condition: 'used' },
  { src: lightAlarm, name: 'Light Alarm', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: thermo, name: 'thermo', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: be, name: 'be', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: today, name: 'today', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: digital, name: 'digital', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: thermometer, name: 'thermometer', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: zz, name: 'zz', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: biotech_oxy, name: 'biotech_oxy', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: gloves, name: 'gloves', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: emergency_box, name: 'emergency_box', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
  { src: bp_machine, name: 'blood pressure machine', price: 60, rating: 4, size: 'M', color: 'Red', brand: 'Brand A', condition: 'reconditioned' },
];

const SubMenu = () => {
  const [priceFilter, setPriceFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [conditionFilter, setConditionFilter] = useState([]);

  const handleCheckboxChange = (e, filter, setFilter) => {
    const value = e.target.value;
    setFilter(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const filteredProducts = products.filter(product => {
    return (
      (priceFilter.length === 0 || priceFilter.includes(String(product.price))) &&
      (sizeFilter.length === 0 || sizeFilter.includes(product.size)) &&
      (colorFilter.length === 0 || colorFilter.includes(product.color)) &&
      (brandFilter.length === 0 || brandFilter.includes(product.brand)) &&
      (conditionFilter.length === 0 || conditionFilter.includes(product.condition))
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Face Mask</h2>
      <p className="mb-4">
      Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their.
      </p>
      
      <div className="flex flex-col lg:flex-row mb-4">
        <div className="w-full lg:w-1/4 border p-4">
          <h3 className="text-xl font-semibold mb-2">Filtrer par :</h3>
          <div className="mb-4">
            <h4 className="font-medium">Prix</h4>
            {[10, 15, 20, 30, 40, 50, 60].map(price => (
              <label className="inline-flex items-center" key={price}>
                <input
                  type="checkbox"
                  value={price}
                  checked={priceFilter.includes(price.toString())}
                  onChange={(e) => handleCheckboxChange(e, priceFilter, setPriceFilter)}
                  className="form-checkbox"
                />
                <span className="ml-2">${price}</span>
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Taille</h4>
            {['S', 'M', 'L'].map(size => (
              <label className="inline-flex items-center" key={size}>
                <input
                  type="checkbox"
                  value={size}
                  checked={sizeFilter.includes(size)}
                  onChange={(e) => handleCheckboxChange(e, sizeFilter, setSizeFilter)}
                  className="form-checkbox"
                />
                <span className="ml-2">{size}</span>
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Couleur</h4>
            {['White', 'Yellow', 'Blue', 'Red'].map(color => (
              <label className="inline-flex items-center" key={color}>
                <input
                  type="checkbox"
                  value={color}
                  checked={colorFilter.includes(color)}
                  onChange={(e) => handleCheckboxChange(e, colorFilter, setColorFilter)}
                  className="form-checkbox"
                />
                <span className="ml-2">{color}</span>
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Marque</h4>
            {['Brand A', 'Brand B', 'Brand C'].map(brand => (
              <label className="inline-flex items-center" key={brand}>
                <input
                  type="checkbox"
                  value={brand}
                  checked={brandFilter.includes(brand)}
                  onChange={(e) => handleCheckboxChange(e, brandFilter, setBrandFilter)}
                  className="form-checkbox"
                />
                <span className="ml-2">{brand}</span>
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-medium">État</h4>
            {['new', 'used', 'reconditioned'].map(condition => (
              <label className="inline-flex items-center" key={condition}>
                <input
                  type="checkbox"
                  value={condition}
                  checked={conditionFilter.includes(condition)}
                  onChange={(e) => handleCheckboxChange(e, conditionFilter, setConditionFilter)}
                  className="form-checkbox"
                />
                <span className="ml-2">{condition}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product, index) => (
              <div key={index} className="text-center border p-2">
                <img src={product.src} alt={product.name} className="w-full h-auto mb-2"/>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <div className="flex justify-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${i < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.571L24 9.423l-6 5.847 1.417 8.253L12 18.75l-7.417 3.774L6 15.27 0 9.423l8.332-1.265z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
