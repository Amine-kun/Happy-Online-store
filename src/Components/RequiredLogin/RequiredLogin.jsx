import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './RequiredLogin.css';


const RequiredLogin =({setIsLoginRequired})=> {     
          const navigate=useNavigate();
          const location = useLocation();
          const currentPath = location.pathname;

  return (
    <div className="RequiredLogin-main">
      <div className="RequiredLogin-div"> 
        <p>You should Login/Signup to continue</p>
        <span className="line"></span>
        <button className="btn-set btn-1" onClick={()=>navigate('/Login')}>Signin</button>
          or
        <button className="btn-set btn-2" onClick={()=>navigate('/Signup')}>Signup</button>
        <div className="back-div">
          {currentPath !== '/Upload' ? <p onClick={()=>setIsLoginRequired(false)} className="text-set pointer">Back</p> : <p onClick={()=>navigate('/')} className="text-set pointer">Back</p>}
        </div> 
      </div>
        
    </div>
  );
}

export default RequiredLogin;