import React, {useState, useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import './Home.css';

import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Basket from '../../Components/Basket/Basket';
import Search from '../../Components/Search/Search';
import WishList from '../../Components/WishList/WishList';
import Landing from '../../Components/Landing/Landing';
import Upload from '../../Components/Upload/Upload';
import Footer from '../../Components/Footer/Footer';

import Profile from '../Profile/Profile';
import ProductDetails from '../ProductDetails/ProductDetails';

  

const Home =()=> {       

    const [toggleBasket, setToggleBasket] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [search, setSearch] = useState(false);
    const [activeBtn, setActiveBtn] = useState('Shirts');

    const location = useLocation();
    const currentPath= location.pathname;

    const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

      useEffect(()=>{
              if(currentPath !== '/Search'){
                setSearch(false);
              } else if (currentPath === '/Search'){
                setSearch(true);
              }
      },[currentPath])

  return (
    <div className="main">
      <Navbar toggleBasket={toggleBasket} setToggleBasket={setToggleBasket} search={search} setSearch={setSearch} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      
      {userInfo?._id && <Basket toggleBasket={toggleBasket} setToggleBasket={setToggleBasket}/>}

      <Sidebar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleBasket={toggleBasket} setToggleBasket={setToggleBasket} search={search} setSearch={setSearch} activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>


        <Routes>
             <Route path="/" element={<Landing activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>}/>
             <Route path="/Search" element={<Search search={search} setSearch={setSearch} />}/>
             <Route path="/WishList" element={<WishList/>}/>
             <Route path="/Upload" element={<Upload/>}/>
             <Route path="/user/:userId" element={<Profile/>}/>
             <Route path="/Product/:ProductId" element={<ProductDetails/>}/>    
        </Routes>

          <Footer/>
    </div>
  );
}

export default Home;