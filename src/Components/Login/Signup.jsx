import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css';
import './Signup.css';

import Spinner from '../Spinner/Spinner';

const Login =()=> {       
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [pass, setPass] = useState('');
  const [about, setAbout] = useState('');

  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const submitUser = () => {
      setSpinner(true);

      const data = new FormData();

        data.append('file', image);

        data.set("name", name);
        data.set("email", email);
        data.set("pass", pass);
        data.set("location", location);
        data.set("about", about);

      fetch('https://happy-store-backend.herokuapp.com/register',{
          method:'post',
          body: data,
        })
        .then(res=>res.json())
        .then(data =>{
          if (data !== "cant login"){
            setSpinner(false);
            setSuccess(true);
            setTimeout(()=>{navigate('/Login')},2000)
          }
          else {
              //err response
              setSpinner(false);
              setError(true);
              setTimeout(()=>{setError(false)},2000)
          }
        })
  }

  return (
    <div className="login-main">
      
      <div className="div-set Illustration-div" style={{backgroundColor:"#232323"}}> 
          <p onClick={()=>navigate('/')} className="login-logo">Signup.</p>
      </div>

        {spinner &&
           <div className="div-set login-div" style={{backgroundColor:"#f6f7fb"}}> 
                <Spinner/> 
            </div> }

        {!spinner && !error && !success 
                && <div className="div-set login-div" style={{backgroundColor:"#f6f7fb"}}>
                    <p className="welcome-msg">Welcome to HAPPY.</p>

                    <input type="file" name="image" className="input-set" placeholder="Your profile picture" onChange={(e)=>setImage(e.target.files[0])}/>
                    <input type="text" name="name" className="input-set" placeholder="Username" onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" name="email" className="input-set" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" name="password" className="input-set" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
                    <input type="text" name="adress" className="input-set" placeholder="Country" onChange={(e)=>setLocation(e.target.value)}/>
                    <input type="text" name="about" className="input-set" placeholder="About" onChange={(e)=>setAbout(e.target.value)}/>

                    <div className="login-btns-div">
                        <button className="login-btn signin" onClick={()=>submitUser()}>Register</button>
                        <button className="login-btn signup" onClick={()=> navigate('/Login')}>Back</button>
                    </div>
                  </div>
        }

        {error && 
           <div className="div-set login-div" style={{backgroundColor:"#f6f7fb"}}>
                    <p className="err-msg">Email already used</p>
                  </div>

        }

        {success && 
           <div className="div-set login-div" style={{backgroundColor:"#f6f7fb"}}>
                    <p className="success-msg">Account successfully created!!</p>
                  </div>

        }
      
    </div>
  );
}

export default Login;