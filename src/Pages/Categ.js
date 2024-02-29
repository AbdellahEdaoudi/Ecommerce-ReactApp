import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categ() {
  const [pro, setpro] = useState([]);
  const [cat, setcat] = useState("smartphones");
  const filtCat = pro.filter((fpr) => {
    return fpr.category == cat
  });

  const Addtocart = (product) => {
    const Stockage = JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart = [...Stockage, product];
    localStorage.setItem('cart', JSON.stringify(AddtoCart));
  };

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100")
      .then((res) => { setpro(res.data.products) })
  }, [])


  return (
    <div className="  pb-[28.5px] h-screen bg-cyan-950 ">
      <div>


        {/* CATEGORIES */}
        <nav className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 pt-2">
          {['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration', 'furniture',
            'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches',
            'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle',
            'lighting'].map((categ, i) => (
              <button key={i} onClick={(e) => { setcat(e.target.value); }} value={categ}
                className='py-2 bg-gray-400 hover:opacity-80 font-medium rounded-md capitalize'>
                {categ}
              </button>
            ))}
        </nav>
      </div>
      {/* AFFICHAGE */}
      <p className="text-center text-2xl  font-medium  capitalize text-sky-100 py-5 " >{cat}</p>
      <div className="  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5   px-3 space-x-2  gap-2">
        {filtCat.map((pr, i) => {
          return (
            <div key={i} className=" p-4 rounded-lg shadow-2xl  space-y-5 text-center bg-white">
              <Link to={`/product/${pr.id}`}><img src={pr.thumbnail} alt={pr.title} className="w-full h-32 object-cover  mt-1 rounded-lg cursor-pointer hover:shadow-2xl" /></Link>
              <h2 className=" cursor-pointer font-bold h-9">{pr.title}</h2>
              <div className="flex justify-between   items-center">
                <p className=" font-bold  ">{pr.price} $</p>
                <button
                  onClick={() => Addtocart(pr)} className="bg-sky-300 px-2 py-1 font-medium rounded-md hover:bg-green-300">
                  <i className="bx bxs-cart"></i>&nbsp;
                  Add to cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>

  );
}

