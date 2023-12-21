import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/frontend/Navbar'
import Footer from '../components/frontend/Footer'
import SideCart from '../components/frontend/SideCart'

const Layout = () => {
    const [sidebar, setSidebar] = useState(false);
    function setSidebarFunc(){
      setSidebar(!sidebar);
    }
  return (
    <>
    <div className='font-[poppins] h-screen'>

      {sidebar ? <SideCart status={sidebar} setsidebar={setSidebarFunc}/> : ""}
    <Navbar setsidebar={setSidebarFunc}/>
        {<Outlet/>}

    <Footer/>
    </div>
    </>
  )
}

export default Layout
