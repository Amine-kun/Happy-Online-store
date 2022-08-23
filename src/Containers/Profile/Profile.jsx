import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Profile.css';

import Products from '../../Components/Products/Products';
import Spinner from '../../Components/Spinner/Spinner';

const Profile =()=> {      

    const [user, setUser]=useState(null);
    const [userProducts, setUserProducts]=useState(null);
    const [currentTab, setCurrentTab]=useState("Products");
    const {userId} = useParams();

    const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

    const loadUserProducts =()=>{
        fetch(`http://localhost:3001/user/Products/${userId}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
            })
            .then(res=>res.json())
            .then((data) =>{
              setUserProducts(data);
            })
            .catch(err=>console.log("cant get user products"));
    }       

    useEffect(()=>{
      console.log(userId)
      fetch(`http://localhost:3001/user/${userId}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
            })
            .then(res=>res.json())
            .then((data) =>{
              setUser(data);
            })
            .catch(err=>console.log("err at fetching user"));

      loadUserProducts(userId);

    },[userId])

if (!user) return <Spinner/>

  return (
    <div className="profile-main">
      <div className="user-info">
        <img src="http://localhost:3000/assets/noxus.jpg" className="cover"/>
        <img src={user.userImage} className="user-pp"/>
          <div className="user-more-info">
              <p className="username">{user.name}</p>
              <p className="Boldtext">{user.country}</p>
              <p className="text-set">{user.about}</p>
          </div>
      </div>
      <div className="profile-header">
        <p className={currentTab === "Products" ? "text-set btns btnsActive" : "text-set btns"} onClick={()=>setCurrentTab("Products")}>Products</p> 
        <p className={currentTab === "Feedbacks" ? "text-set btns btnsActive" : "text-set btns"} onClick={()=>setCurrentTab("Feedbacks")}>Feedbacks</p>
        <p className={currentTab === "Contact" ? "text-set btns btnsActive" : "text-set btns"} onClick={()=>setCurrentTab("Contact")}>Contact</p>
      </div>
      <div className="user-items">
        {!userProducts ? <Spinner/>
                        : userProducts.map((userProduct)=>(
                                <Products product={userProduct} key={userProduct._id}/>
                          ))}
      </div>
    </div>
  );
}

export default Profile;