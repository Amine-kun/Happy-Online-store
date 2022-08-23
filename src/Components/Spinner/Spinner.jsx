import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import './Spinner.css';
import {ImSpinner8} from 'react-icons/im';

const Login =()=> {       
  return (
    <div className="spinner-main-div">
          <ImSpinner8 className="spinner-main"/>
    </div>
  );
}

export default Login;