import React, {useState, useEffect} from 'react';
import './Search.css';
import {useNavigate} from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import Products from '../Products/Products';

const Search =({search, setSearch})=> {       
    const [spinner, setSpinner]=useState(false);
    const [searchTerm, setSearchTerm]=useState('');
    const [items, setItems]=useState(null);

    const navigate=useNavigate();

    const searchFunction = ()=>{
      setSpinner(true);

      if (searchTerm){
        fetch('https://happy-store-backend.herokuapp.com/search',{
          method:'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            searchTerm: searchTerm,
          })
        })
        .then(res=>res.json())
        .then(data =>{
          setItems(data);
          setSpinner(false);
        })
      } else {
        setSpinner(false);
      }
    }

    
  return (
    <div className="search-div-main">
      <div className="search">
        <input type="search" placeholder="Search" className="search-input" onFocus={()=>navigate('/Search')} onChange={(e)=>setSearchTerm(e.target.value)}/>
        <button onClick={()=>searchFunction()} className="search-btn">Search</button>
      </div>

          {spinner && <Spinner/>}
          
          <div className="product-main"> 
              {items !== null && items.map((item)=> <Products product={item} key={item._id}/> )}

              {items === null && !spinner && searchTerm === '' && (<p className="search-div">Make a search</p>) }

              {items?.length === 0 && !spinner && (
              <p className="search-div">No products found</p>
             )}
          </div>

    </div>
  );
}

export default Search;