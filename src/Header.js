import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Categ from './Pages/Categ';
import Contact from './Pages/Contacte';
import Cart from './Pages/Cart';
import axios from 'axios';
import { useEffect } from 'react';
import Product from './Pages/ProductId';


export default function Header() {
  const [menu, setMenu] = useState(false);
  const [pro, setPro] = useState([]);
  const [srch, setSrch] = useState("");

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => setPro(res.data.products))
  },[]);


  const Addtocart = (product) => {
    const Stockage = JSON.parse(localStorage.getItem('cart')) || [];
    const AddtoCart = [...Stockage, product];
    localStorage.setItem('cart', JSON.stringify(AddtoCart));
  };

  return (
    <div>
      {/* HEADER */}
      <header className='sticky top-0' >
        <div className='bg-gray-900  md:flex py-3  md:px-10  items-center justify-between shadow-2xl '>
          <div className='flex items-center pl-4  '>
            <img src='Image/Logo App.png' width={"60px"} /><span className=' text-3xl font-mono text-blue-800'><span className='text-blue-200'>Ed</span>Market</span>
          </div>

          <div>
            <ul className={`shadow-2xl absolute md:static md:w-auto w-full 
           text-blue-200 md:flex md:flex-row md:items-center  md:space-x-8   flex flex-col items-center md:space-y-0 space-y-3
            md:py-0 py-7 bg-gray-900 ${menu ? 'block' : 'hidden'}`}>
              <li><Link onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth', }); setSrch(" ") }} to={"/Home"} className='hover:opacity-50  py-1 hover:text-blue-200 duration-200 '><i class='bx bx-home'></i> HOME</Link></li>
              <li><Link onClick={() => { setSrch(" ") }} to={"/Categ"} className='hover:opacity-50  py-1 hover:text-blue-200 duration-200'><i class='bx bxs-category-alt'></i> CATEGORIES</Link></li>
              <li><Link to={"/Cart"} onClick={() => { setSrch(" ") }} className=' hover:opacity-50   py-1 rounded-md hover:text-blue-200 duration-200'><i class='bx bxs-cart'></i> CART</Link></li>
              <li><Link to={"mailto:abdellahedaoudi80@gmail.com"}  onClick={() => { setSrch(" ") }} className=' hover:opacity-50  bg-slate-600 px-2 py-1 rounded-md  duration-200'><i class='bx bx-chat'></i> CONTACT</Link></li>
              <li><input type='search'
                onChange={(e) => {
                  setSrch(e.target.value);
                }}
                class='rounded-full bg-gray-950 focus:outline-none text-gray-300 px-5 py-2 hidden md:block' />
              </li>
              <li><Link onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth', }); }}
                class="hover:text-blue-200 hover:opacity-90 hidden md:block "><i class='bx bxs-up-arrow-circle text-[31px]'></i>
              </Link></li>
            </ul>
            {/* ICON MENU */}
            <div className=' flex items-center  md:hidden absolute  right-3 top-4 space-x-2'>
              <input type='search' onChange={(e) => { setSrch(e.target.value) }}
                class={`rounded-full bg-gray-950 focus:outline-none text-gray-300 w-20 px-2 py-2`} />
              <i onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth', }); }} className='bx bxs-up-arrow-circle text-blue-200 text-3xl'></i>
              <i onClick={() => { setMenu(!menu); }} className='bx bx-menu mr-3 text-blue-200 text-4xl  cursor-grabbing'></i>
            </div>
          </div>

        </div>
        <nav className={`w-full absolute overflow-y-auto bg-sky-50   max-h-[calc(100vh-100px)] shadow-2xl grid md:grid-cols-2 ${srch.trim() !== '' ? '' : 'hidden'} `}>
          {pro.filter((p) => {
            return p.title.toLowerCase().includes(srch.toLowerCase());
          }).map((pr, i) => (
            <div key={i} className=" flex items-center   px-4 py-4 space-x-6">
              <div className=''>
                <Link to={`/product/${pr.id}`}><img onClick={() => { setSrch('') }} src={pr.thumbnail} alt={pr.title} className="w-full h-32 object-cover  mt-1 rounded-lg  " /></Link>
              </div>

              <div className='space-y-2'>
                <h2 className="  font-bold  text-red-500">{pr.title}</h2>
                <h2 className="  font-bold  text-gray-700">{pr.description}</h2>
                <div className="flex justify-between   items-center">
                  <p className=" font-bold text-green-700  ">{pr.price} $</p>
                  <button
                    onClick={() => { Addtocart(pr); window.location.href = "/Cart"; }}
                    className="bg-sky-300 px-2 py-1 font-medium rounded-md hover:bg-green-300">
                    <i className="bx bxs-cart"></i>&nbsp;
                    Add to cart
                  </button>
                </div>

              </div>
            </div>
          ))}
        </nav>
      </header>


      <Routes>
        <Route path={"/"} element={<Home />} ></Route>
        <Route path={"/Home"} element={<Home />} ></Route>
        <Route path="/product/:id" element={<Product />} />
        <Route path={"/Categ"} element={<Categ />} ></Route>
        <Route path={"/Cart"} element={<Cart />} ></Route>
        <Route path={"/Contact"} element={<Contact />}></Route>
      </Routes>



    </div>
  );
}
