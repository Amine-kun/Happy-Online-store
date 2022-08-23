import React, {useState, useEffect} from 'react';
import './Basket.css';

const BasketItem =({items, setSpinner, setItems, countTotal})=> {       

     const deleteItem=(info)=>{
          setSpinner(true);

          fetch(`http://localhost:3001/cart?itemid=${info.id}&userid=${info.By}`,{
                    method:'delete',
                    headers:{'Content-Type': 'application/json'},
              })
              .then(res=>res.json())
              .then((data)=>{
                setItems(data);
                setSpinner(false);
                countTotal(data);
              })
  }

  return (
    <div className="basket-item-main">
      <img src={items.productImage} alt="product-img" className="product-img"/>
        <div className="product-about">
            <p className="p-details p-title">{items.productName}</p>
            <p className="p-details p-sub-title">{items.category}</p>
            <p className="p-details p-price">${items.price}</p>
        </div>
        <div className="product-about">
          <p className="p-details p-items-n">
                    Q: {items.quantity}
          </p>
        </div>
        <div className="options-section">
          <p className="delete-icon" onClick={()=>deleteItem(items)}>+</p>
        </div>
    </div>
  );
}

export default BasketItem;