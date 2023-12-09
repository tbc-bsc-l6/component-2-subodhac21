import React, { useState } from 'react'
import Main_body from '../components/frontend/Main_body'

import Navbar from '../components/frontend/Navbar';
import Footer from '../components/frontend/Footer';
import Newproducts from '../components/frontend/Newproducts';
import TrendProducts from '../components/frontend/TrendProducts';



const Home = () => {
  return (
    <>
    <div className='font-[poppins] h-screen'>
    <Navbar/>
    <Main_body/>
    <Newproducts/>
    <TrendProducts/>

    <Footer/>
    </div>
    </>
  )
}

export default Home