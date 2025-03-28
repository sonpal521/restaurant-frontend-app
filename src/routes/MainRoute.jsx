import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder'
import Verify from '../pages/Verify/Verify'
import MyOrders from '../pages/MyOrders/MyOrders'

function MainRoute() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />

       

      </Routes>
    </div>
  )
}

export default MainRoute
