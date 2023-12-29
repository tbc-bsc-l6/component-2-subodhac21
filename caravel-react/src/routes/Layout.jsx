import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/frontend/Navbar'
import Footer from '../components/frontend/Footer'
import SideCart from '../components/frontend/SideCart'
import { useSelector } from 'react-redux';
import Loader from '../components/frontend/Loader'

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const mess = useSelector((state)=>{
    return state.productReducer.message;
  });
  useEffect(()=>{
    if(mess == 'adding'){
      setLoading(true);
    }
    else{
      setLoading(false);
    }
  },[mess]);
    const [sidebar, setSidebar] = useState(false);
    function setSidebarFunc(){
      setSidebar(!sidebar);
    }
  return (
    <>
     <div className='font-[poppins] h-screen'>

   {loading==true ? <Loader type="four"/> : <div className='font-[poppins] h-screen'>

      {sidebar ? <SideCart status={sidebar} setsidebar={setSidebarFunc}/> : ""}
    <Navbar setsidebar={setSidebarFunc}/>
        {<Outlet/>}

    <Footer/>
    </div>
}
</div>
    </>
  )
}

export default Layout
