import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./index.css"

import LoginPopup from './components/LoginPopup/LoginPopup'
import MainRoute from './routes/MainRoute'
import Footer from './components/Footer/Footer'



function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>

    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
    <div className='app'>
    
    <MainRoute />
     
    </div>
     <Footer/>
    </>
  )
}

export default App
