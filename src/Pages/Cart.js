import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const deleteProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className='bg-gray-100 min-h-screen py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
        {/* Total Price and Clear Cart Button */}
        <div className="mt-8 flex items-center justify-between mb-5">
          <div className="text-xl font-bold">Total Price: {totalPrice()} $</div>
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Clear Cart
          </button>
        </div>
        {/* Cart Items */}
        <div className="grid gap-4 md:grid-cols-2">
          {cart.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-4">
                  <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-green-700 font-bold">{item.price} $</p>
                  </div>
                </div>
                <button onClick={() => deleteProduct(index)} className="text-red-500 hover:text-red-600 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Payment Details */}
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg hidden">
          {/* Payment details content can be added here */}
        </div>
      </div>
    </div>
  );
}
