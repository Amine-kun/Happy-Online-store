import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';
import {RiSearch2Line} from 'react-icons/ri';
import {AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai';
import {BiMessageSquareAdd} from 'react-icons/bi';
import {useSelector} from 'react-redux';

const Navbar =({toggleBasket ,setToggleBasket, search, setSearch, toggleMenu, setToggleMenu})=> {       

  const navigate=useNavigate();
  const quantity = useSelector(state=>state.cart.quantity);
  const wishListQuantity = useSelector(state=>state.wishlist.quantity);

  const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

  return (
    <div className="navbar-main">
      <div className="navbar-div">

        <div className="sideMenu-icon" onClick={()=>{setToggleMenu(!toggleMenu); setToggleBasket(false)}}>
          <span className="span"></span>
          <span className="span2 span"></span>
          <span className="span"></span>
        </div>

        <p className="logo pointer" onClick={()=>navigate('/')}>HAPPY.</p>

        <div className="wrapper">
          <div className="header-icons">
            <RiSearch2Line className={search ? ` activeBasket pointer searchbtn` : `pointer searchbtn`} onClick={()=>{ setSearch(!search);navigate('/Search')}}/>
              {userInfo && <div className="onUser-features">
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

          {userInfo 
              ? <div className="user-nav">
                  <Link to={`/user/${userInfo._id}`}>
                    <img src={userInfo.userImage} className="userImage"/>
                  </Link>
                </div>
              :<div className="login-btns">
                    <p className="btn pointer" onClick={()=>navigate('/Login')}>Signin</p>
                      <span className="bar"></span>
                    <p className="btn pointer"onClick={()=>navigate('/Signup')}>Signup</p> 
                </div>}

        </div>

      </div>
    </div>
  );
}

export default Navbar;