import React,{useState, useEffect} from 'react';//react hooks, useState and useEffect for state and lifecycle
import api from './API'
import './App.css';
import Signin from './components/Signin';

const App = ()=>{
  return(
    <div className="Signin">
      <Signin url={api}/>
    </div>

  )

}

export default App;