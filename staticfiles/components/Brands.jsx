import React from 'react';
import a from '../images/a.jpeg'
import b from '../images/b.jpeg'
import c from '../images/c.jpeg'
import d from '../images/d.jpeg'
import e from '../images/e.jpeg'
import f from '../images/f.jpeg'
import g from '../images/g.jpeg'
import h from '../images/h.jpeg'
import i from '../images/i.jpeg'
import j from '../images/j.jpeg'

const brands = [
    { src: a,  alt: 'AXS Health' },
    { src: b,  alt: 'BioZen Medical' },
    { src: c,  alt: 'Consure Medical' },
    { src: d,  alt: 'Healthcare' },
    { src: e,  alt: 'LifeOmic' },
    { src: f,  alt: 'Matrix Medical Network' },
    { src: g,  alt: 'Medical-X' },
    { src: h,  alt: 'PageMed' },
    { src: i,  alt: 'Primacy Medical Centre' },
    { src: j,  alt: 'Stomach Care' },
];



const BrandsGrid = () => {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Magasiner Par Marques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <img src={brand.src} alt={brand.alt} className="brand-logo" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default BrandsGrid;