import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';

export default function Home() {
  const [pro, setPro] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => setPro(res.data.products))
  }, []);

  const Addtocart = (product) => {
    const Stockage = JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart = [...Stockage, product];
    localStorage.setItem('cart', JSON.stringify(AddtoCart));
  };

  return (
    <div className="bg-yellow-300/90">
      {/* NAV DE IPHONE 15 PRO MAX  */}
      <nav className='sm:flex sm:pl-5 bg-gray-900 shadow-md pb-1'>
        <div className='md:w-1/2 md:pl-[70px] pt-5 md:pt-[60px] w-full text-gray-200 space-y-5'>
          <p className='flex items-center justify-center text-4xl md:text-5xl font-bold text-cyan-50'>IPhone 15 Pro Max</p>
          <div className='flex items-center justify-center'>
            <p className='md:text-base text-xs text-justify text-gray-400 font-sans w-[340px] md:w-full'>
              &nbsp; &nbsp;The iPhone 15 Pro Max is the large format version of the iPhones. It features a 6.7-inch OLED display with 
              a dynamic punch-hole for the FaceID sensor and front camera as well as a dynamic refresh rate of 120 Hz to 1 Hz.
              It also includes a new titanium chassis, an Apple A17 Pro SoC engraved in 3 nm and a triple 48+12+12 megapixel
              photo sensor with a 5x telephoto lens and an ultra wide-angle.
            </p>
          </div>
          <div className='space-x-5 flex items-center justify-center'>
            <button className='px-4 py-2 border rounded-lg hover:opacity-90 text-white'>
              <Link target='_blank' to={"https://www.apple.com/ma/iphone-15-pro/specs/"}>Read more</Link>
            </button>
            <button className='px-4 py-2 border rounded-lg font-medium hover:opacity-70 bg-white text-black'>Buying</button>
          </div>
        </div>
        {/* IMG NAV */}
        <div className='w-full md:w-1/2 flex items-center justify-center'>
          <img className='sm:w-[300px] md:w-[420px] w-72' src='Image/15promax.png' alt="iPhone 15 Pro Max" />
        </div>
      </nav>

      {/* All PRODUITS */}
      <div className="px-4 ">
        <h1 className="text-4xl pb-8 font-bold text-center  py-4 rounded-lg">All Products</h1>
        {/* AFFICHAGE */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 b  ">
        {pro.map((pr, i) => (
          <div key={i} className='border  hover:border-blue-400 hover:border-2 bg-gray-100 flex flex-col justify-between rounded-3xl p-6 drop-shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition duration-300'>
            <Link to={`/product/${pr.id}`}>
              <img src={pr.thumbnail} alt={pr.title} className='rounded-3xl border-2 ' />
            </Link>
            <div className="text-center">
              <p className='font-semibold text-lg text-gray-800'>{pr.title}</p>
              <p className='font-bold text-xl text-green-600 py-3'>{pr.price}$</p>
            </div>
            <div className='flex justify-between items-center'>
              <Link to={`/product/${pr.id}`} className='  border-2 bg-sky-100 p-2  text-gray-700 hover:bg-sky-300 font-medium duration-200 rounded-md'>View Details</Link>
              <button onClick={() => Addtocart(pr)} className='border p-3 hover:bg-green-300 hover:text-black font-medium text-green-500 duration-200 rounded-full'>
                <BsCartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
