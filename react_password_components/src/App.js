import React from 'react';//react hooks, useState and useEffect for state and lifecycle
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './API'
import './App.css';
import Signin from './components/Signin';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


const baseurl = 'https://mastervault-backend.onrender.com'


function Layout ({children}) {
    return (
        <div className='main'>
            {children}
        </div>
    )
}


const App = () => {
    return(
    <BrowserRouter>
      <Routes>

        <Route path='/Dashboard' element={<Layout><Dashboard url={baseurl} /></Layout>} />
        <Route path='/login' element={<Layout><Login url={baseurl} /></Layout>} />
        <Route path='/' element={<Layout><Signin url={api} /></Layout>} />
       
      </Routes>
    </BrowserRouter>
    )
}

export default App;
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
