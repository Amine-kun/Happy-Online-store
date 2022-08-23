import React from 'react';

import {IoMdWatch} from 'react-icons/io';
import {GiArmoredPants, GiRunningShoe, GiShirt} from 'react-icons/gi';
import {FaHatCowboySide, FaTshirt} from 'react-icons/fa';
import {FiSmartphone} from 'react-icons/fi';
import {AiFillPlusCircle} from 'react-icons/ai'

const iconsMap =[
{
  title:"Shirts",
  icon:FaTshirt
},
{
  title:"Hoodies",
  icon:GiShirt
},
{
  title:"Pants",
  icon:GiArmoredPants
},
{
  title:"Shoes",
  icon:GiRunningShoe
},
{
  title:"Accessories",
  icon:IoMdWatch
},
{
  title:"Hats",
  icon:FaHatCowboySide
},
{
  title:"Tech",
  icon:FiSmartphone
},
{
  title:"Others",
  icon:AiFillPlusCircle
}  ];


const Categories =({activeBtn,setActiveBtn, fetchProducts})=> {       


  return (
    <>
            <div className="category-section" > 
              <p className="categories-word"> Categories </p>
                <span className="line"></span>
                <div className="categories-div">
                  
                  {iconsMap.map((Value, i)=>(
                          <div  className={activeBtn === `${Value.title}` ? `isActive single-category` : `single-category`} onClick={()=>{setActiveBtn(Value.title)}} key={i}> 
                                <Value.icon className="cat-icon" key={Value.icon}/>
                                <p className="category-text" key={Value.title}>{Value.title}</p>
                          </div>
                    ))}

                </div>
             </div>
    </>
  );
}

export default Categories;