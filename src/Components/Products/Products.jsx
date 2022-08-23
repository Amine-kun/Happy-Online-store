import React, {useState} from 'react';
import './Products.css';
import {useNavigate} from 'react-router-dom';

import {useSelector} from 'react-redux';
import {addProduct} from '../../Redux/cart';
import {addProductToWishlist} from '../../Redux/wishlist';
import {useDispatch} from 'react-redux';


import {AiOutlineHeart, AiOutlineDelete, AiOutlineShoppingCart} from 'react-icons/ai';


const Products =({product})=> {     
        const dispatch = useDispatch();  
        const navigate=useNavigate();
        const currentQuantity = useSelector(state=>state.cart.quantity);
        
        const [activeBtn, setActiveBtn] = useState('');
        const [hoveredProduct, setHoveredProduct] = useState(false);
        const [quantity, setQuantity] = useState(0);

        const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

        const addToCart = (cartProduct) =>{
            const {_id, productName, price, productImage, category} = cartProduct;

            fetch('http://localhost:3001/cart',{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: _id,
                productName: productName,
                productImage:productImage,
                price: price,
                quantity:1,
                category:category,
                userSavedBy: userInfo._id,
            })
        })
            .then((res)=>res.json())
              .then(()=>{ 
               dispatch(addProduct({quantity}));
              })
      }

      const addToWishList = (wishlistProduct) =>{
            const {_id, productName, price, productImage, category} = wishlistProduct;

            fetch('http://localhost:3001/wishlist',{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({
                _id: _id,
                 productName: productName,
                productImage:productImage,
                price: price,
                category:category,
                userSavedBy: userInfo._id,
            })
        })
            .then((res)=>res.json())
              .then(()=>{ 
               dispatch(addProductToWishlist({quantity}));
               console.log("added")
              })
      }

      const deleteItem=(selectedProduct)=>{
 
          fetch(`http://localhost:3001/product/${selectedProduct._id}`,{
                    method:'delete',
                    headers:{'Content-Type': 'application/json'},
              })
              .then(res=>res.json())
              .then((data)=>{
                window.location.reload();
                              })
  }


  return (
    <>
        <div className="product-div"
                      onMouseEnter={()=>setHoveredProduct(true)}
                      onMouseLeave={()=>setHoveredProduct(false)}
                      onClick={()=>navigate(`/Product/${product?._id}`)}>
                            <img src={product?.productImage} className="product" key={Math.random()}/>
                              {hoveredProduct && (
                                              <div className="up-product">
                                                <p className="title-product">{product?.productName}</p>
                                                <div className="details">
                                                    <p className="price">${product?.price}</p>
                                                  <div className="product-btns">
                                                      <button className="buy-btn" >Buy Now</button>
                                                      
                                                        {userInfo?._id &&
                                                          <>
                                                            <AiOutlineHeart className="f-btn" key={Math.random()} onClick={(e)=>{e.stopPropagation(); addToWishList(product)}}/>
                                                            <AiOutlineShoppingCart className="f-btn" key={Math.random()} onClick={(e)=>{e.stopPropagation(); addToCart(product)}}/>
                                                            {userInfo?._id === product.productBy.userId && <AiOutlineDelete onClick={(e)=>{e.stopPropagation(); deleteItem(product)}} className="f-btn"/>}
                                                          </>
                                                        }

                                                  </div>
                                                </div>
                                              </div>)
                              }
                          </div>
    </>
  );
}

export default Products;