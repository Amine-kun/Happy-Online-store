import React, {useState, useEffect} from 'react';
import './Basket.css';

import {addCurrentCartProducts} from '../../Redux/cart';
import {useDispatch} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import BasketItem from './BasketItem';
import Spinner from '../Spinner/Spinner';

const Basket =( {toggleBasket ,setToggleBasket} )=> {       
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const [quantity, setQuantity] = useState();
  const [stripeToken, setStripeToken] = useState(null);

  const dispatch = useDispatch();
  const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

  const KEY = process.env.REACT_APP_STRIPE;

  useEffect(()=>{
        setSpinner(true);

      fetch(`https://happy-store-backend.herokuapp.com/cart/${userInfo._id}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
        })
        .then(res=>res.json())
        .then((data)=>{
          setQuantity(data.length);
          setItems(data);
          setSpinner(false);
          countTotal(data);

          if (quantity !== null){
            let currentQuantity=data.length;
            dispatch(addCurrentCartProducts({currentQuantity}));
          }
        })

  },[toggleBasket])

    const countTotal = (data) =>{
          let totalPrice=[];

               if(data.length === 1) {
                  setTotal(data[0].price*data[0].quantity);       
                } else if(data.length === 0){
                  setTotal(0)
                }else {
                  for(let i=0; i < data.length; i++){
                         totalPrice.push(data[i].price*data[i].quantity);
                       }
                       
                 const calculateTotal = totalPrice.reduce((pre, curr)=>{
                                              return pre+curr
                                            })
                  setTotal(calculateTotal); 
                } 
  }

       const onToken = (token) => {
          setStripeToken(token);
      }

    useEffect(()=>{

          const stripeRequest = ()=>{
                    fetch('https://happy-store-backend.herokuapp.com/checkout',{
                        method:'post',
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify({
                          tokenId: stripeToken.id,
                          amount: total,

                          userId: userInfo._id,
                          userName: userInfo.name,
                          userEmail: userInfo.email,
                          orders:items,
                    })
                    })
                    .then(res=>res.json())
                    .then((data)=>{
                        console.log("success");
                    })
          };

          stripeToken && stripeRequest();

    },[stripeToken])

  return (
    <div className={toggleBasket ? `Basket-main Basket-active` : `Basket-main` }>
      <div className="basket-header" onClick={()=>setToggleBasket(!toggleBasket)}>
        <p className="cancel-icon">+</p>
      </div>

      {spinner ? <Spinner/>
               : <div className="items-div">
                    {items.length === 0 ? <p>you have no items in the cart.</p> : items.map((item)=>(<BasketItem countTotal={countTotal} setItems={setItems} items={item} setSpinner={setSpinner} key={item.productName}/>))}
                  </div>}

      <div className="checkout-section">
        <p className="basket-text">ORDER SUMMARY</p>
          <span className="line"></span>
        <p className="basket-text checkout-details">Total: {total && <span className="price-cart">${total}</span>}</p>
        <StripeCheckout
            name="Happy-shop"
            billingAddress
            shippingAddress
            description={`Your total is $${total}`}
            token={onToken}
            stripeKey={KEY}
            amount={total*100}
        >
               <button className="checkout-btn">Check Out</button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default Basket;