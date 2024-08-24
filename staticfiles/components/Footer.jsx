import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white-800 p-8 mt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-lg font-bold mb-4 text-black">Contactez-nous</h3>
                <p className="text-gray-500">Medipine - Medical Store
                507-Union Trade Centre 
                123456 France</p>
                <p className= "text-teal-600 font-bold">(+91) 9876-543-210</p>
                <p className="text-gray-500">sales@yourcompany.com
                </p>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4  text-black">Nos Produits</h3>
                <ul className="text-gray-500">
                    <li>Promotions</li>
                    <li> Nouveaux Produits</li>
                    <li>Meilleurs Ventes </li>
                    <li>Contactez-Nous</li>
                    <li>Plan du Site</li>
                    <li>Magasins</li>
                    {/* Add more products as needed */}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4  text-black">Notre Société</h3>
                <ul className="text-gray-500">
                    <li>Delivery</li>
                    <li>Legal Notice</li>
                    <li>Terms and conditions of use</li>
                    <li>About Us </li>
                    <li>My Account</li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4">S'inscrire à la Newsletter</h3>
                <p>Subscribe to our latest newsletter to get news about special discounts.</p>
                <form>
                    <input
                    type="email"
                    className="w-full p-2 mb-2 text-black"
                    placeholder="Your email address"
                    />
                    <button>S'abboner</button>
                    <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mr-2"
                    />
                    <label htmlFor="terms">
                    I agree to the terms and conditions and the privacy policy <a href="#" className="underline"></a>
                    </label>
                    </div>
                    <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                    S'inscrire
                    </button>
                </form>
            </div>
        </div>
      <div className="bg-black text-center mt-8">
        <p className='text-white p-6'>&copy; Ce site utilise des cookies. En continuant à utiliser ce site, vous acceptez notre utilisation des cookies. <a href="#" className="underline"> Politique de confidentialité</a></p>

        </div>
    </footer>
    
  )
}

export default Footer