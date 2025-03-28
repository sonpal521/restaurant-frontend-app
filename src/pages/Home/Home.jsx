import React, { useState } from 'react'
// import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

function Home() {

  const [category , setCategory] = useState("All")
  return (
    <div>
        <Hero/>
        <ExploreMenu category={category}  setCategory={setCategory}/>
        <FoodDisplay category={category} setCategory={setCategory} />
    </div>
  )
}

export default Home
