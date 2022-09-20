import React from 'react';
import './Sidebar.css';

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

const SideCategories =({activeBtn,setActiveBtn, setToggleMenu, fetchProducts})=> {       

  const scrollTo =()=> {
       window.scrollTo(0, 650);
        }

  return (
    <>
            <div className="side-categorie" > 
                <div className="side-categories-div">
                  
                  {iconsMap.map((Value, i)=>(
                          <div key={i} className={activeBtn === `${Value.title}` ? `isActive side-single-category` : `side-single-category`} onClick={()=>{setActiveBtn(Value.title); scrollTo(); setToggleMenu(false)}}> 
                            <Value.icon className="cat-icon" key={Value.icon}/>
                            <p className="category-text" key={Value.title}>{Value.title}</p>
                           </div>
                    ))}


                </div>
             </div>
    </>
  );
}

export default SideCategories;