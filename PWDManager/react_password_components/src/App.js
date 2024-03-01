import React,{useState, useEffect} from 'react';//react hooks, useState and useEffect for state and lifecycle
import api from './API'
import './App.css';
import Signin from './components/Signin';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
/* 
 

      <div className='Dashboard'>
    <Dashboard url={baseurl}/>
 </div>
   

      <div className="Signin">
        <Signin url={api}/>
    </div>  

   
     <div className='Login'>
      <Login url={baseurl}/>
    </div> 
     



    */
const App = ()=>{
  const baseurl = 'http://127.0.0.1:8080'
  return(
   
    <div className='Dashboard'>
    <Dashboard url={baseurl}/>
 </div>
   
    
  
  )

}

export default App;