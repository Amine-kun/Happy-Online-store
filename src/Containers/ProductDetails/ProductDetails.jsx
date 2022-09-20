import React, {useState, useEffect} from 'react';
import './ProductDetails.css';
import {useNavigate, useParams} from 'react-router-dom';

import Products from '../../Components/Products/Products';
import Spinner from '../../Components/Spinner/Spinner';
import RequiredLogin from '../../Components/RequiredLogin/RequiredLogin';

import {useSelector} from 'react-redux';
import {addProduct} from '../../Redux/cart';
import {addProductToWishlist} from '../../Redux/wishlist';
import {useDispatch} from 'react-redux';

const colors = ['red','yellow','blue','black','green','grey','purple','orange'];
const sizes = ['S','M','L','XL','XXL','XXXL']

const ProductDetails =()=> {       
      const [color, setColor] = useState('red');
      const [size, setSize] = useState('S');
      const [productDetails, setProductDetails] = useState(null);
      const [related, setRelated] = useState(null);
      const [itemsNumber, setItemsNumber] = useState(1);
      const [quantity, setQuantity] = useState(0);
      const [isLoginRequired, setIsLoginRequired] = useState(false);

      const navigate = useNavigate();
      const {ProductId}= useParams();
      const dispatch = useDispatch(); 
      const currentQuantity = useSelector(state=>state.cart.quantity);

      const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

      useEffect(()=>{
          fetch(`https://happy-store-backend.herokuapp.com/${ProductId}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
            })
            .then(res=>res.json())
            .then((data) =>{
              setProductDetails(data);
              loadRelatedProducts(data.category);
            })
      },[ProductId])

      const addToCart = (cartProduct) =>{
            if (userInfo){
              const {_id, productName, price, productImage, category} = cartProduct;

            fetch('https://happy-store-backend.herokuapp.com/cart',{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: _id,
                productName: productName,
                productImage:productImage,
                price: price,
                quantity:itemsNumber,
                category:category,
                userSavedBy: userInfo._id,
            })
        })
            .then((res)=>res.json())
              .then(()=>{ 
               dispatch(addProduct({quantity}));
              })
            } else {
              setIsLoginRequired(true);
            }
      }

      const addToWishList = (wishlistProduct) =>{
            const {_id, productName, price, productImage, category} = wishlistProduct;

            fetch('https://happy-store-backend.herokuapp.com/wishlist',{
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
              })
      }

       const loadRelatedProducts = (data) =>{
          fetch(`https://happy-store-backend.herokuapp.com/RelatedProducts/${data}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
            })
            .then(res=>res.json())
            .then((data) =>{
              setRelated(data);
            })
      }

       const itemsIncreaser=(operator)=>{
          if (operator === "plus"){
              setItemsNumber(itemsNumber+1);
          } else {
              if(itemsNumber !== 1) setItemsNumber(itemsNumber-1);
          }

      }

      if(!productDetails)  return  <Spinner/>

            return (
              <div className="ProductDetails-main">

              {isLoginRequired && <RequiredLogin setIsLoginRequired={setIsLoginRequired}/>}

                <div className="ProductDetails-div">
                  <div className="image-side">  
                      <img className="ProductDetails-img" src={productDetails.productImage} alt="product-img"/>
                  </div>

                  <div className="details-side">
                    <p className="text-set product-title">{productDetails.productName}</p>
                    <p className="text-set product-category">{productDetails.category}</p>
                    <p className="text-set product-description">{productDetails.description}</p>

                    
                     {productDetails.color && 
                              <>
                                 <p className="text-set">Select a Color:</p>
                                 <div className="product-options-section">
                                     { colors.map((oneColor)=>(
                                         <span className={color === oneColor ? `color-set isActiveColor` : `color-set`} onClick={()=>setColor(`${oneColor}`)} style={{backgroundColor:`${oneColor}`}} key={oneColor}></span>
                                       ))
                                     }
                                 </div>
                              </> }

                     {productDetails.size && 
                                <>
                                   <p className="text-set">Select a Size:</p>
                                      <div className="product-options-section">
                                          { sizes.map((oneSize)=>(
                                              <p className={size === oneSize ? `size-set isActiveSize` : `size-set`} onClick={()=>setSize(`${oneSize}`)} key={oneSize}>{oneSize}</p>
                                            ))
                                          }
                                      </div>
                                </>}

                                <p>
                                  <span className="pointer itemsIncreaser" onClick={()=>itemsIncreaser("minus")}>-</span>
                                    {itemsNumber}
                                    <span className="pointer itemsIncreaser" onClick={()=>itemsIncreaser("plus")}>+</span>
                                </p>
                      <div className="product-btns-div">
                        <button className="cart-btn cmn-btn" onClick={()=>addToCart(productDetails)}>Add To Cart</button>
                        <button className="wishlist-btn cmn-btn" onClick={()=>addToWishList(productDetails)}>Add to WishList</button>
                      </div>
                  </div>
                </div>

                <div className="Seller-About">
                    <p className="text-set">By:</p>
                    <span className="line"></span>
                    <img alt="seller-img" className="seller-img" src={productDetails.productBy.userImage} onClick={()=>navigate(`/user/${productDetails.productBy.userId}`)}/>
                    <p className="seller-name text-set" onClick={()=>navigate(`/user/${productDetails.productBy.userId}`)}>{productDetails.productBy.userName}</p>
                </div>

                <div className="related-products-section">
                  <p className="text-set related">Related Products</p>
                    <span className="line"></span>
                    
                    <div className="product-main">
                          {!related ? <Spinner/>
                                     : related.map((relate) => ( <Products product={relate} key={relate._id}/> ))
                                        }
                      </div>

                </div>
              </div>
            );
}

export default ProductDetails;