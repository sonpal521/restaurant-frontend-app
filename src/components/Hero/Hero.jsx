import React from 'react'
import './Hero.css';

function Hero() {
  return (
    <div className='hero' id='hero'>
      <div className="hero-contents">
        <h2>Order your favourite food here</h2>
        <p>Chose from a diverse menu featuring a delectable array of 
           dishes crafted with teh finest ingredients and culinary expertise. Our 
           mission is to satisfy your cravings and elevate 

        </p>
       <a href="#explore-menu">
       <button className='hero-btn'>View Menu</button>
       </a>
       
      </div>
    </div>
  )
}

export default Hero
