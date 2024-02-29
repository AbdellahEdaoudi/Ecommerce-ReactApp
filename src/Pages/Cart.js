import React, { useEffect, useState } from 'react';

export default function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const Cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(Cart);
  }, []);

  const Deletpro = (i) => {
    const updatedCart = [...cart];
    updatedCart.splice(i, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const Deletallcart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const Totalprcart = () => {
    return cart.reduce((total, AllproCart) => total + AllproCart.price, 0).toFixed(2);
  };

  return (
    <div className='bg-sky-50  h-screen '>
      <h1 className="text-4xl font-bold mb-3 text-center pt-2 rounded-lg">Shopping Cart</h1>
      {/*Totalprcart*/}
      <div className="mt-4 flex items-center justify-center space-x-4 ">
        <div className="text-xl font-bold">Total Price: {Totalprcart()} $</div>
        <button onClick={Deletallcart} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Clear Cart
        </button>
      </div>

      <div>
        {/* CART */}
        <div className="mt-2 space-y-2 grid grid-cols-1 md:grid-cols-2  overflow-y-auto max-h-[calc(84vh-100px)] border-2 border-gray-200 rounded-lg">
          {cart.map((item, index) => (
            <div key={index} className="flex bg-white  h-56 space-x-3 pt-6 p-4 border rounded-lg shadow-md ml-1 ">
              <div><img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover mb-2 rounded-lg pb-2" /></div>
              <div>
                <h2 className="font-bold pb-2">{item.title}</h2>
                <p className="text-gray-700 pb-2">{item.description}</p>
                <div className='flex justify-between items-center pb-2'>
                  <p className="font-bold text-green-700">{item.price} $</p>
                  <button onClick={() => Deletpro(index)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*pymntDtl*/}
        <div>

        </div>
      </div>

    </div>
  );
}