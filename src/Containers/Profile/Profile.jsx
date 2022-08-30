import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Profile.css';

import Products from '../../Components/Products/Products';
import Spinner from '../../Components/Spinner/Spinner';
import Contact from '../../Components/Contact/Contact';
import Feedbacks from '../../Components/Feedbacks/Feedbacks';


const Profile =()=> {      

    const [user, setUser]=useState(null);
    const [currentTab, setCurrentTab]=useState("Products");
    const {userId} = useParams();

    const [userProducts, setUserProducts]=useState(null);
    const [userFeedbacks, setUserFeedbacks]=useState(null);
    const [userContacts, setUserContacts]=useState(null);

    const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

    const loadUserData =(userId, path)=>{
        fetch(`http://localhost:3001/user/${path}/${userId}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
            })
            .then(res=>res.json())
            .then((data) =>{

              if (path === 'Products'){
                setUserProducts(data);
              } else if (path === 'Feedbacks') {
               setUserFeedbacks(data);
              } else if(path === 'Contact'){
                setUserContacts(data);
              }
            })
            .catch(err=>console.log("cant get user products"));
    }      

    useEffect(()=>{
      fetch(`http://localhost:3001/user/${userId}`,{
              method:'get',
              headers:{'Content-Type': 'application/json'},
            })
            .then(res=>res.json())
            .then((data) =>{
              setUser(data);
            })
            .catch(err=>console.log("err at fetching user"));

      loadUserData(userId, currentTab);

    },[userId])

    useEffect(()=>{
      if (currentTab !== 'Products') 
            loadUserData(userId, currentTab);
    }, [currentTab])

if (!user) return <Spinner/>

  return (
    <div className="profile-main">
      <div className="user-info">
        <img src="http://localhost:3000/assets/noxus.jpg" className="cover" alt="cover"/>
        <img src={user.userImage} className="user-pp" alt="userpp"/>
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
       {currentTab === "Products"  && 
         <div className="user-items">
            {!userProducts ? <Spinner/>
                            : userProducts.map((userProduct)=>(
                                    <Products product={userProduct} key={userProduct._id}/>
                              ))}
          </div>}

        {currentTab === "Feedbacks"  && 
         <div className="user-feedbacks">
            {!userFeedbacks ? <Spinner/>
                            : userFeedbacks.map((userFeedback)=>(
                                    <Feedbacks feedback={userFeedback} key={userFeedback._id}/>
                              ))}
          </div>}

        {currentTab === "Contact"  && 
         <div className="user-contacts">
            {!userContacts ? <Spinner/>
                            : userContacts.map((userContact)=>(
                                    <Contact contact={userContact} key={userContact._id}/>
                              ))}
          </div>}

    </div>
  );
}

export default Profile;