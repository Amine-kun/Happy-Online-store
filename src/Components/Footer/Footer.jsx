import React from 'react';
import './Footer.css';
import {FaLinkedin,FaInstagramSquare, FaFacebookSquare, FaGithubSquare, FaCcPaypal, FaCcMastercard, FaCcVisa} from 'react-icons/fa'

const Footer =()=> {       
  
  return (
    <div className="footer-main">
        <div className="textandlogo">
          <p className="logo bot-logo">HAPPY.</p>
          <p>All Rights Reserved</p>
        </div>

        <div className="icons1">
          <FaLinkedin className="pointer"/>
          <FaGithubSquare className="pointer"/>
          <FaFacebookSquare className="pointer"/>
          <FaInstagramSquare className="pointer"/>
        </div>

        <div className="icons2">
          <FaCcPaypal className="pointer"/>
          <FaCcMastercard className="pointer"/>
          <FaCcVisa className="pointer"/>
        </div>

    </div>
  );
}

export default Footer;