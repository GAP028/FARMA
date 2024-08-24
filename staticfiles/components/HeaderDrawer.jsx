
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderDrawer = () => {
  const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
  const [IsSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!IsDrawerOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!IsSubMenuOpen); // false by default
  };

  return (
    <section>
      <header className='bg-green-600 p-4 text-white flex justify-between items-center'>
        <h1 className='text-lg font-bold'>My App</h1>
        <button onClick={toggleDrawer}>☰</button>
      </header>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity ${
          IsDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 z-50 transition-transform transform ${
          IsDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <button onClick={toggleSubMenu} className="w-full text-left">
                Medical Supplies
              </button>
              <ul
                className={`pl-4 mt-2 transition-height overflow-hidden ${
                  IsSubMenuOpen ? 'h-auto' : 'h-0'
                }`}
              >
                <li className="mb-2">
                  <Link to="/submenu" className="text-blue-600" onClick={toggleDrawer}>
                    Surgical Mask
                  </Link>
                </li>
                <li>
                  <a href="#rr" className="text-blue-600">
                    Medkits
                  </a>
                </li>
                <li>
                  <a href="#rr" className="text-blue-600">
                    Wound Care
                  </a>
                </li>
              </ul>
            </li>
            <li className="mb-2">
              <Link to="/facemask" className="text-blue-600">
                Face Mask
              </Link>
            </li>
            <li>
              <Link to="/buffercap" className="text-blue-600">
                Buffer Capsules
              </Link>
            </li>
            <li>
              <Link to="/equipment" className="text-blue-600">
              Equipment
              </Link>
            </li>
            <li>
              <Link to="/ventilator" className="text-blue-600">
              Ventilator
              </Link>
            </li>
            <li>
              <Link to="/handwash" className="text-blue-600">
              Handwash
              </Link>
            </li>
            <li>
              <Link to="/sanitizer" className="text-blue-600">
              Sanitizer
              </Link>
            </li>
            <li>
              <Link to="/bandages" className="text-blue-600">
              Bandages
              </Link>
            </li>
            <li>
            <Link to="/bpmachine" className="text-blue-600">
              BP Machine 
            </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default HeaderDrawer;
