import React from 'react'
import Navbar from '../components/frontend/Navbar'
import Footer from '../components/frontend/Footer'
import { Link, useLocation } from 'react-router-dom'
import Category from '../components/frontend/Category';

const Categories = () => {
   
  let {term} = useLocation();
  const stopSearching = () =>{
    term = null;
  }
  let searchTerm = new URLSearchParams(location.search).get('term');

  return (
    // <div className='font-[poppins] h-screen'>
    // <div>
    //   <Navbar/>
    <Category stopSearching={stopSearching} term = {searchTerm}/>
    //   <Footer/>
    // </div>
    // </div>
  )
}

export default Categories
