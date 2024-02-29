import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function App(){ 
  const [pro, setPro] = useState([]);
  const [menu,setMenu] = useState(false);
  

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => setPro(res.data.products))
  },[]);

  return (
    <div>

     <header className='sticky top-0'>
            <div className='bg-gray-900  md:flex py-3  md:px-10  items-center justify-between shadow-2xl '>
              <div className='flex items-center pl-4 '>
               <img src='Image/Logo App.png' width={"60px"} /><span className=' text-3xl font-mono text-blue-800'><span className='text-blue-200'>Ed</span>Market</span>
              </div>

              <div>
                <ul className={`shadow-2xl absolute md:static md:w-auto w-full
                 text-blue-200 md:flex md:flex-row md:items-center  md:space-x-8   flex flex-col items-center md:space-y-0 space-y-3
                  md:py-0 py-7 bg-gray-900 ${menu ? 'block' : 'hidden'}`}>
                  <li><Link   className='hover:opacity-50 hover:text-blue-200 duration-200 '><i class='bx bx-home'></i> HOME</Link></li>
                  <li><Link  className='hover:opacity-50 hover:text-blue-200 duration-200'
                  onClick={()=>{window.scrollTo({top: 500,behavior: 'smooth',});}}><i class='bx bxl-product-hunt'></i> ALL PRODUCTS</Link></li>
                  <li><Link  className='hover:opacity-50 hover:text-blue-200 duration-200'><i class='bx bxs-category-alt'></i> CATEGORIES</Link></li>
                  <li><Link  className='bg-gray-800 hover:opacity-90 px-3 py-1 rounded-md hover:text-blue-200 duration-200'><i class='bx bxs-cart'></i> CART (9)</Link></li> 
                  <li><input type='search' class='rounded-full bg-gray-950 focus:outline-none text-gray-300 px-5 py-2' /></li>
                  <li><Link onClick={()=>{window.scrollTo({top: 0,behavior: 'smooth',});}}
                    class="hover:text-blue-200 hover:opacity-90"><i class='bx bxs-up-arrow-circle text-[31px]'></i>
                  </Link></li>
                </ul>
                      {/* ICON MENU */}
              <div className=' flex items-center  md:hidden absolute  right-3 top-4 space-x-2'> 
                    <i onClick={()=>{window.scrollTo({top: 0,behavior: 'smooth',});}} className='bx bxs-up-arrow-circle text-blue-200 text-3xl'></i>
                    <i onClick={()=>{setMenu(!menu);}} className='bx bx-menu mr-3 text-blue-200 text-4xl  cursor-grabbing'></i>
              </div>
              </div>
              
            </div>
     </header>   
      {/* NAV DE IPHONE 15 PRO MAX  */}
      <nav className=' md:flex bg-gray-900  shadow-md pb-16'>
        <div className='md:w-1/2 md:pl-[70px]  pt-5 md:pt-[80px] text-center w-full text-gray-200 space-y-6 '>
          <p className='text-4xl md:text-5xl font-bold'>IPhone 15 Pro Max</p>

          <div className='flex items-center justify-center'>
          <p className='md:text-base text-xs text-justify  text-gray-400 font-medium  w-[340px]  md:w-full   '>
          &nbsp; &nbsp;The iPhone 15 Pro Max is the large format version of the iPhones. It features a 6.7-inch OLED display with a dynamic punch-hole for the FaceID sensor and front camera as well as a dynamic refresh rate of 120 Hz to 1 Hz. It also includes a new titanium chassis, an Apple A17 Pro SoC engraved in 3 nm and a triple 48+12+12 megapixel photo sensor with a 5x telephoto lens and an ultra wide-angle. Finally, it integrates a new programmable action button in place of the usual ringer/silent switch and includes Wi-Fi 6E.
          </p>
          </div>

          <p className='space-x-5'>
            <button className='px-3 py-2 border rounded-lg hover:opacity-90 '><Link target='_blank' to={"https://www.apple.com/ma/iphone-15-pro/specs/"} className='hover:text-gray-200'>Read more</Link></button>
            <button className='px-3 py-2 border rounded-lg font-medium hover:opacity-90 bg-white text-black'><i class='bx bxs-cart'></i> Add to cart</button>
          </p>
        </div>
        {/* IMG NAV */}
        <div className=' w-full  md:w-1/2 flex items-center justify-center'>
          <img className='md:w-[420px] w-72' src='Image/15promax.png' />
        </div>
      </nav>

      {/* All PRODUITS */}
     <div className="px-8 py-8 bg-amber-200">
      <h1 className="text-4xl font-bold mb-6 text-center">All Products</h1><br/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pro.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-2xl space-y-7 text-center">
            <img src={product.thumbnail} alt={product.title}
              className="w-full h-52 object-cover  mt-1 rounded-lg cursor-pointer hover:shadow-2xl"
            />
            <h2 className=" cursor-pointer  text-lg font-bold">{product.title}</h2>
            {/* <h4 className=" text-gray-600 h-24 ">{product.description}</h4> */}
        <div className="flex justify-between   items-center">
          <p className="text--500 font-bold text-xl ">{product.price} $</p>
          <button className="bg-green-200 px-4 py-2 rounded-md hover:bg-green-300">
            <i className="bx bxs-cart"></i>&nbsp;
            Add to cart
          </button>
        </div>
          </div>
        ))}
      </div>
    </div> 
    
    </div>
    
  );
};

