import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const [pr, setPr] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((res) => setPr(res.data));
  }, [id]);
  
  const Addtocart = (product) => {
    const Stockage = JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart = [...Stockage, product];
    localStorage.setItem('cart', JSON.stringify(AddtoCart));
  };

  return (
    <div className="bg-gray-100 pt-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:space-x-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={pr.thumbnail} alt={pr.title} className="w-96 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="w-full lg:w-1/2 space-y-1 px-6 lg:px-10 py-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800">{pr.title}</h2>
          <p className="text-gray-600">{pr.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-green-600">{pr.price} $</p>
            <button onClick={() => Addtocart(pr)} className="bg-green-500 text-white px-6 py-2 font-medium rounded-md hover:bg-green-600 transition duration-300">
              <i className="bx bxs-cart"></i>&nbsp;Add to cart
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-1 border-2">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Images</h1>
          <div className="flex flex-wrap gap-4">
            {pr.images && pr.images.map((img, i) => (
              <img key={i} src={img} className="w-24 h-24 object-cover rounded-lg shadow-md" alt={`product-${i}`} />
            ))}
          </div>
        </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-6 lg:px-10 space-y-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Reviews</h1>
          {pr.reviews && pr.reviews.map((review, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
              <p className="font-bold text-gray-800">{review.reviewerName}</p>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
