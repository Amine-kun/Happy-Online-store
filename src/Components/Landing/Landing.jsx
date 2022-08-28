import React, {useState, useEffect} from 'react';
import './Landing.css';

import Carousel, { CarouselItem } from "../../Components/Carousel/Carousel";
import {TbTruckDelivery, TbListSearch, TbCheckbox} from 'react-icons/tb';
import Categories from './Categories';
import Products from '../Products/Products';
import Spinner from '../Spinner/Spinner';



 const mockObj = [{
      image:'https://image.posterlounge.com/images/l/1884772.jpg',
      key:'1',
      title:'Winnter 22s',
      desc1:'Discover the latest fashion in the market',
      desc2:'Winter layer season is NOW here. ',
    },{
      image:'https://stylecaster.com/wp-content/uploads/2019/01/minimal-outfits-4.jpg?w=447',
      key:'2',
      title:'Women Styles',
      desc1:'Minimalist outfits are HERE!',
      desc2:'Check out the new Minimalist outfits',
    },{
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV76IsQm7x3-CPtWkVeiAd7Uzk4neoX3pCoQ&usqp=CAU',
      key:'3',
      title:'Winter 22s',
      desc1:'Winter layer season is here. ',
      desc2:'Check out our trendy new winter collection ',
    }]


const Landing =({activeBtn, setActiveBtn})=> {

   const [products, setProducts]=useState(null);
   const [spinner, setSpinner] = useState(true);

       useEffect(()=>{
            setSpinner(true);

              fetch('http://localhost:3001/',{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({
                category: activeBtn
              })
            })
            .then(res=>res.json())
            .then((data) =>{
              setProducts(data);
              setSpinner(false);
            })

   },[activeBtn])


  return (
    <div className="landing-main">

       <Carousel className="carousel">
            {mockObj.map((item)=>(
                <CarouselItem key={item.key}>
              
                <div className="item">
                  <img src={item.image} className="carousel-items" alt="img" key={item.key}/>
                  <div className="elems">
                    <p className="text title">{item.title}</p>
                    <p className="text description">{item.desc1}</p>
                    <p className="text description">{item.desc2}</p>
                    <button className="text shop-btn">
                      Shop Now
                    </button>
                  </div>
                </div>

            </CarouselItem>
              ))}
        </Carousel>

        <Categories activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>

        <div className="product-main">
            {spinner ? <Spinner/>
                       : products.map((product) => ( <Products product={product} key={product._id}/> ))
                          }
        </div>

         <div className='features'>
            <h3>Stay In Trend With HAPPY.</h3>
                  <div className='sub-features-div'>
                          <div className='sub-features'>
                              <TbTruckDelivery  className="icon"/>
                              <h2 className='bold' style={{margin:"0"}}>Latest Styles</h2>
                              <p style={{margin:"0"}}>Our designs follow the latest faashion
                                styles to help you stay updated with new 
                                trends
                              </p>
                              <p className='bold bottom-border__effect' >Read More</p>
                          </div>
                          <div className='sub-features'>
                              <TbListSearch className="icon"/>
                            <h2 className='bold'  style={{margin:"0"}}>Latest Styles</h2>
                                <p  style={{margin:"0"}}>Our designs follow the latest faashion
                                  styles to help you stay updated with new 
                                  trends
                                </p>
                                <p className='bold bottom-border__effect'  >Read More</p>
                          </div>
                          <div className='sub-features'>
                              <TbCheckbox className="icon"/>
                            <h2 className='bold'  style={{margin:"0"}}>Latest Styles</h2>
                                <p  style={{margin:"0"}}>Our designs follow the latest faashion
                                  styles to help you stay updated with new 
                                  trends
                                </p >
                                <p className='bold bottom-border__effect'>Read More</p>
                          </div>
                  </div>
         </div>
         
          <div className='wrap'>
            <div className='news'>
            <div className='sub-features'>
                      <h2 className='bold no-mg'>The Black Beauty</h2>
                                  <p>Our designs follow the latest faashion
                                    styles to help you stay updated with new 
                                    trends
                                  </p>
                                  <button className="text shop-btn">
                                    Discover Now
                                  </button>             
            </div>
            <img className='card-img' alt='pic' src='https://image.posterlounge.com/images/l/1884772.jpg'/>
          </div>
          <div className='news'>
            <div className='sub-features'>
                      <h2 className='bold no-mg'>The Black Beauty</h2>
                                  <p>Our designs follow the latest faashion
                                    styles to help you stay updated with new 
                                    trends
                                  </p>
                                  <button className="text shop-btn" >
                                    Discover Now
                                  </button>             
            </div>
            <img className='card-img' alt='pic' src='https://image.posterlounge.com/images/l/1884772.jpg'/>
          </div> 
         </div>

         <div className="newsletter-section">
           <p className="newsletter-section-headtitle">Reach us for weekly News letter</p>
            <div className="input-news-div">
              <input type="text" placeholder="Enter Your Email." className="input-news"/>
               <button className="btn-news">Submit</button>
            </div>
         </div>

    </div>
  );
}

export default Landing;