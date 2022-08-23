import React, {useState, useEffect} from 'react';
import './WishList.css';

import {addCurrentWishlistProducts} from '../../Redux/wishlist';
import {useDispatch} from 'react-redux';

import Spinner from '../Spinner/Spinner';
import WishListItem from './WishListItem';


const WishList =()=> {    
 const [products, setProducts]=useState(null);
 const [loading, setLoading] = useState(false);
 const [quantity, setQuantity] = useState(); 

 const dispatch = useDispatch(); 

const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

 useEffect(()=>{
  setLoading(true);

    fetch(`http://localhost:3001/wishlist/${userInfo._id}`, {
              method:'get',
              headers:{'Content-Type': 'application/json'},
    })
    .then(res=>res.json())
    .then((data)=>{
      setQuantity(data.length);
      setProducts(data);
      setLoading(false);

      if (quantity !== null){
            let currentQuantity=data.length;
            dispatch(addCurrentWishlistProducts({currentQuantity}));
          }
    })
 },[])   

  return (
    <div className="wishlist-main">
      <div className="wishlist-headline-div">
        <p className="headLine">Your WishList</p>
      </div>
      <span className="line" style={{marginBottom:"20px"}}></span>
      {loading && <Spinner/>}

      <div className="user-items">

            {!loading && products?.map((SingleProduct)=>(
              <WishListItem key={SingleProduct._id} SingleProduct={SingleProduct} setProducts={setProducts} user={userInfo} setLoading={setLoading}/>
              ))}
            {!loading && products?.length === 0  && <p className="text-set">You have no products in your wishlist</p>}
      </div>
    </div>
  );
}

export default WishList;