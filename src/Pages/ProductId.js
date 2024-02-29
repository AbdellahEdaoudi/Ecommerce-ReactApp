import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const [pr,setPr]=useState({});
  const {id}=useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((res) => setPr(res.data))
  }, [id]);
  
  const Addtocart=(product)=>{
    const Stockage=JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart=[...Stockage, product];
    localStorage.setItem('cart',JSON.stringify(AddtoCart));
  };


  return (
    <div className="bg-sky-100 h-screen pt-8 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center md:h-96 md:w-full  object-cover rounded-lg ">
          <img src={pr.thumbnail} alt={pr.title} className="w-80 md:w-full md:h-full object-cover rounded-lg" />
        </div>
        <div className="space-y-4 w-full px-10 md:w-96">
          <h2 className="text-2xl font-bold">{pr.title}</h2>
          <p className="text-gray-600">{pr.description}</p>
          <div className="flex justify-between items-center">
            <p className="font-bold text-green-600">{pr.price} $</p>
            <button onClick={()=>Addtocart(pr)}
            className="bg-sky-300 px-4 py-2 font-medium rounded-md hover:bg-green-300">
              <i className="bx bxs-cart"></i>&nbsp;Add to cart
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">Product Images</h1>
            <div className="grid grid-cols-3 gap-2">
              {pr.images && pr.images.map((img, i) => (
                <img key={i} src={img} className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
