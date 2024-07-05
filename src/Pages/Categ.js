import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

export default function Categ() {
  const [pro, setpro] = useState([]);
  const [cat, setcat] = useState("laptops");
  const filtCat = pro.filter((fpr) => fpr.category === cat);

  const Addtocart = (product) => {
    const Stockage = JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart = [...Stockage, product];
    localStorage.setItem('cart', JSON.stringify(AddtoCart));
  };

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100")
      .then((res) => setpro(res.data.products));
  }, []);

  const categories = [
    'laptops',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'beauty',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories'
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-200 p-5 pb-[124px]">
      <div className="">
        {/* CATEGORIES */}
        <div className="flex flex-row-reverse justify-around mb-8 gap-8">
          <select
            onChange={(e) => setcat(e.target.value)}
            value={cat}
            className="py-3 px-5 bg-white border border-blue-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 capitalize w-full max-w-xs"
          >
            {categories.map((categ, i) => (
              <option key={i} value={categ} className="capitalize">
                {categ}
              </option>
            ))}
          </select>
          <div className="text-center text-xl md:text-2xl font-bold capitalize text-blue-700">{cat}</div>
        </div>
      </div>
      {/* AFFICHAGE */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {filtCat.map((pr, i) => (
          <div key={i} className='bg-white flex flex-col justify-between rounded-3xl p-6 shadow-xl hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition duration-300'>
            <Link to={`/product/${pr.id}`}>
              <img src={pr.thumbnail} alt={pr.title} className='rounded-3xl border-2 ' />
            </Link>
            <div className="text-center">
              <p className='font-semibold text-lg text-gray-800'>{pr.title}</p>
              <p className='font-bold text-xl text-green-600 py-3'>{pr.price}$</p>
            </div>
            <div className='flex justify-between items-center'>
              <Link to={`/product/${pr.id}`} className=' bg-sky-100 border p-2 text-gray-700 hover:bg-sky-300 font-medium duration-200 rounded-md'>View Details</Link>
              <button onClick={() => Addtocart(pr)} className='border p-3 hover:bg-green-300 hover:text-black font-medium text-green-500 duration-200 rounded-full'>
                <BsCartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
