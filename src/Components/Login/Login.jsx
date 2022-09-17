import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css';

import Spinner from '../Spinner/Spinner';

const Login =()=> {       
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [spinner, setSpinner] = useState(false);
  
  const getUser = () => {
      setSpinner(true);

      fetch('https://happy-store-backend.herokuapp.com/login',{
          method:'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            pass: pass
          })
        })
        .then(res=>res.json())
        .then(data =>{
          if (data.name){
            localStorage.setItem('Ecom-user', JSON.stringify(data));
            navigate('/');
          }
          else {
              //err response
              setSpinner(false);
          }
        })
  }

  return (
    <div className="login-main">
      
      <div className="div-set Illustration-div" style={{backgroundColor:"#232323"}}> 
          <p onClick={()=>navigate('/')} className="login-logo">HAPPY.</p>
      </div>

        {spinner 
          ? <div className="div-set login-div" style={{backgroundColor:"#f6f7fb"}}> 
                <Spinner/> 
            </div> 
          : <div className="div-set login-div" style={{backgroundColor:"#f6f7fb"}}>
                <p className="welcome-msg">Welcome to HAPPY.</p>
                <input type="text" name="email" className="input-set" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" name="email" className="input-set" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>

                <div className="login-btns-div">
                    <button className="login-btn signin" onClick={()=>getUser()}>Sign in</button>
                    <button className="login-btn signup" onClick={()=>navigate('/Signup')}>Sign up</button>
                </div>
            </div> }
      
    </div>
  );
}

export default Login;