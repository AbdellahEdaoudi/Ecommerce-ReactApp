import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Home(){ 

  const [pro, setPro] = useState([]);
  
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => setPro(res.data.products))
  },[]);

  const Addtocart=(product)=>{
    const Stockage=JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart=[...Stockage, product];
    localStorage.setItem('cart',JSON.stringify(AddtoCart));
  };

  return (
    <div>
      {/* NAV DE IPHONE 15 PRO MAX  */}
      <nav className='sm:flex sm:pl-5 bg-gray-900  shadow-md pb-1'>
        <div className='md:w-1/2 md:pl-[70px]  pt-5 md:pt-[60px]  w-full text-gray-200 space-y-5 '>
          <p className='flex items-center justify-center text-4xl  md:text-5xl font-bold text-cyan-50'>IPhone 15 Pro Max</p>

          <div className='flex items-center justify-center'>
          <p className='md:text-base text-xs  text-justify text-gray-400 font-sans  w-[340px]  md:w-full   '>
          &nbsp; &nbsp;The iPhone 15 Pro Max is the large format version of the iPhones. It features a 6.7-inch OLED display with 
          a dynamic punch-hole for the FaceID sensor and front camera as well as a dynamic refresh rate of 120 Hz to 1 Hz.
           It also includes a new titanium chassis, an Apple A17 Pro SoC engraved in 3 nm and a triple 48+12+12 megapixel
            photo sensor with a 5x telephoto lens and an ultra wide-angle.
          </p>
          </div>

          <p className='space-x-5 flex items-center justify-center'>
            <button className='px-3 py-2 border rounded-lg hover:opacity-90 '><Link target='_blank' to={"https://www.apple.com/ma/iphone-15-pro/specs/"} className='hover:text-gray-200'>Read more</Link></button>
            <button className='px-3 py-2 border rounded-lg font-medium hover:opacity-70 bg-white text-black'>Buying</button>
          </p>
        </div>
        {/* IMG NAV */}
        <div className=' w-full  md:w-1/2 flex items-center justify-center'>
          <img className='sm:w-[300px] md:w-[420px] w-72' src='Image/15promax.png' />
        </div>
      </nav>
      <div>
        {/* All PRODUITS */}
    <div className=" px-4 py-4 bg-yellow-300">
      <h1 className="text-4xl font-bold mb-3 text-center text--200  pt-4 rounded-lg">All Products</h1><br/>
      <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {pro.map((pr,i) => (
          <div  key={i}  className=" cursor-pointer p-4 rounded-lg hover:-m-px shadow-2xl  space-y-5 text-center  bg-white">
          <Link to={`/product/${pr.id}`}><img  src={pr.thumbnail}  className="w-full h-32 object-cover  mt-1 rounded-lg  "/></Link>
          <h2 className="  font-bold h-9">{pr.title}</h2>
          <div className="flex justify-between   items-center">
                    <p className=" font-bold  ">{pr.price} $</p>
                    <button
                     onClick={()=>Addtocart(pr)}
                     className="bg-sky-300 px-2 py-1 font-medium rounded-md hover:bg-green-300">
                      <i className="bx bxs-cart"></i>&nbsp;
                      Add to cart
                    </button>
                  </div>
        </div>
        ))}
      </div>
    </div> 
      </div>
    </div>
    
  );
  
};
