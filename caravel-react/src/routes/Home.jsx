import React, { useState } from 'react'
import Main_body from '../components/frontend/Main_body'

import Navbar from '../components/frontend/Navbar';
import Footer from '../components/frontend/Footer';
import Newproducts from '../components/frontend/Newproducts';
import TrendProducts from '../components/frontend/TrendProducts';
import SideCart from '../components/frontend/SideCart';



const Home = ({cartCount}) => {
  const [sidebar, setSidebar] = useState(false);
  function setSidebarFunc(){
    setSidebar(!sidebar);
  }
  return (
    <>
    {/* <div className='font-[poppins] h-screen'>

      {sidebar ? <SideCart status={sidebar} setsidebar={setSidebarFunc}/> : ""}
    <Navbar setsidebar={setSidebarFunc}/> */}
    <Main_body/>
    <Newproducts cartCount={cartCount}/>
    {/* <TrendProducts/> */}

    {/* <Footer/> */}
    {/* </div> */}
    </>
  )
}

export default Home