import React from 'react';
import { FaBars, FaSearch, FaExchangeAlt, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../images/logo.jpg';

const Header = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="bg-gray-200 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="/help-center" className="text-gray-700">Help Center</a>
            <a href="/todays-deal" className="text-gray-700">Today's Deal</a>
            <a href="/order-tracking" className="text-gray-700">Order Tracking</a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Get Up to 25% Cashback On First Order: GET25OFF</span>
            <a href="/shop" className="bg-blue-500 text-white py-1 px-3 rounded">SHOP NOW</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="EcoMed Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold">EcoMed</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Rechercher..." className="border rounded py-2 px-4" />
          <FaSearch className="text-gray-700" />
        </div>

        {/* User Links */}
        <div className="flex space-x-4">
          <a href="/connexion" className="text-gray-700">Connexion</a>
          <span className="text-gray-700">/</span>
          <a href="/inscription" className="text-gray-700">Inscription</a>
        </div>

        {/* Icons */}
        <div className="flex space-x-4">
          <button onClick={() => { /* Handle exchange */ }}><FaExchangeAlt className="text-gray-700" /></button>
          <button onClick={() => { /* Handle favorites */ }}><FaHeart className="text-gray-700" /></button>
          <button onClick={() => { /* Handle cart */ }}><FaShoppingCart className="text-gray-700" /></button>
          <button onClick={() => { /* Handle profile */ }}><FaUser className="text-gray-700" /></button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-200 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative group">
            <button className="flex items-center text-gray-700"><FaBars /> Acheter par catégorie</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg">
              <button className="block px-4 py-2">Catégorie 1</button>
              <button className="block px-4 py-2">Catégorie 2</button>
              <button className="block px-4 py-2">Catégorie 3</button>
              <button className="block px-4 py-2">Catégorie 4</button>
              <button className="block px-4 py-2">Catégorie 5</button>
            </div>
          </div>
          <nav className="flex space-x-4">
            <a href="/Medical supplies" className="text-gray-700">Medical supplies</a>
            <a href="/Thermometer" className="text-gray-700">Thermometer</a>
            <a href="/todays-deal" className="text-gray-700">Today's Deal</a>
            <a href="/all-brands" className="text-gray-700">Toutes Les Marques</a>
            <a href="/more" className="text-gray-700">Suite</a>
          </nav>
          <div className="flex space-x-4">
            <button className="dropbtn">Langue</button>
            <button className="dropbtn">Monnaie</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
