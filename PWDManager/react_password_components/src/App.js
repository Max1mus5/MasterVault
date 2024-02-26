import React,{useState, useEffect} from 'react';//react hooks, useState and useEffect for state and lifecycle
import api from './API'
import './App.css';
import Signin from './components/Signin';
import Login from './components/Login';
/* 
<div className="Signin">
      <Signin url={api}/>
      </div>
    */
const App = ()=>{
  return(
    <div className='Login'>
      <Login url={api}/>
    </div> 
  )

}

export default App;