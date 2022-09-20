import React from 'react';
import {useNavigate} from 'react-router-dom';
import './WishList.css';

import {AiOutlineShoppingCart, AiOutlineDelete} from 'react-icons/ai';

import {useSelector} from 'react-redux';
import {addProduct} from '../../Redux/cart';
import {addProductToWishlist} from '../../Redux/wishlist';
import {useDispatch} from 'react-redux';

const WishListItem =({SingleProduct, user ,setLoading, setProducts})=> {    
      const navigate=useNavigate();
      const currentQuantity = useSelector(state=>state.cart.quantity);
      const dispatch = useDispatch(); 

      const deleteItem = (info)=>{
        setLoading(true);

          fetch(`https://happy-store-backend.herokuapp.com/wishlist?itemid=${info.id}&userid=${info.By}`,{
                    method:'delete',
                    headers:{'Content-Type': 'application/json'},
              })
              .then(res=>res.json())
              .then((data)=>{
                setProducts(data);
                setLoading(false);
              })
      }

      const addToCart = (product) =>{
        let quantity = 0;
            const {_id, productName, price, category, productImage} = product;

            fetch('https://happy-store-backend.herokuapp.com/cart',{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: _id,
                productName: productName,
                productImage:productImage,
                price: price,
                quantity: 1,
                category:category,
                userSavedBy: user._id,
            })
        })
            .then((res)=>res.json())
              .then(()=>{ 
               dispatch(addProduct({quantity}));
              })
      }

  return (
           <div className="wishlist-product pointer">

              <img src={SingleProduct.productImage} className="wishlist-product-img" alt="product-pic"/>
              <div className="product-details">
                <p className="text-set product-title">{SingleProduct.productName}</p>
                <p>{SingleProduct.category}</p>
                <p className="text-set price-2">${SingleProduct.price}</p>
                <p style={{color:"grey"}}>{SingleProduct._id}</p>
              </div>
              <div className="product-btns-2">
                  <AiOutlineShoppingCart className="cart-test" onClick={()=>addToCart(SingleProduct)}/>
                  <AiOutlineDelete className="cart-test" onClick={()=>deleteItem(SingleProduct)}/>
                  <button className="buying-btn" onClick={()=>navigate(`/Product/${SingleProduct._id}`)}>Buy Now</button>
              </div>
            </div>
  );
}

export default WishListItem;