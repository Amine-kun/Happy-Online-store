import React from 'react';
import './Sidebar.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {RiSearch2Line} from 'react-icons/ri';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {AiOutlineHeart} from 'react-icons/ai';
import {BiMessageSquareAdd} from 'react-icons/bi';

import SideCategories from './SideCategories';


const Sidebar =({toggleMenu, setToggleMenu, toggleBasket, setToggleBasket, search, setSearch, activeBtn,setActiveBtn, fetchProducts})=> {
  
    const navigate = useNavigate();   
    const quantity = useSelector(state=>state.cart.quantity);
    const wishListQuantity = useSelector(state=>state.wishlist.quantity);
    
    const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

    const LogOut = () =>{
        localStorage.clear();
        navigate('/');
    }    

  return (
    <div className={toggleMenu ? ` sidebar-main active-sidebar` : `sidebar-main`}>
        <div className="basket-header" onClick={()=> setToggleMenu(!toggleMenu)}>
          <p className="cancel-icon">+</p>
        </div>

            <span className="line"></span>

        <div className="header-icons-sidebare">
            <RiSearch2Line className={search ? ` activeBasket pointer searchbtn` : `pointer searchbtn`} onClick={()=>{ setSearch(!search);navigate('/Search'); setToggleMenu(false)}}/>
                {userInfo && <div className="onUser-features" style={{gap:"52px"}}>
                               <div className="cart">
                                      <AiOutlineHeart className="pointer" onClick={()=>{navigate('/WishList'); setToggleMenu(false)}}/>
                                       {wishListQuantity !== 0 && <p className="cart-items">{wishListQuantity}</p>}
                                  </div>
                                <div className="cart">
                                  <AiOutlineShoppingCart className="pointer" onClick={()=>{setToggleBasket(!toggleBasket); setToggleMenu(false)}}/>
                                    <p className="cart-items">{quantity}</p>
                                </div>
                                <BiMessageSquareAdd className="pointer" onClick={()=>{navigate('/Upload'); setToggleMenu(false)}}/>
                          </div>}
        </div>

            <span className="line"></span>

        <SideCategories activeBtn={activeBtn} setActiveBtn={setActiveBtn} setToggleMenu={setToggleMenu} fetchProducts={fetchProducts}/>

            {userInfo && <button className="logout-btn" onClick={()=>{LogOut(); setToggleMenu(false)}}>Singout</button>}


    </div>
  );
}

export default Sidebar;