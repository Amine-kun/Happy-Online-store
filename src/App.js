import React  from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import Home from './Containers/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';

const App =()=> {
  
  return (
    <Routes>
      <Route path="/*" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
    </Routes>
  );
}

export default App;