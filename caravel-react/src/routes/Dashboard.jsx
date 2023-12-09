import React from 'react'
import Dashboard1 from '../components/Admin/Dashboard'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminLoginpage from '../components/Admin/AdminLoginpage'

const Dashboard = () => {
  const loginInfo = useSelector((state)=>{
    return state.authReducer.signin[1];
  })

  return (
    <>
    {loginInfo.token != "" ?  <div>

      
<Dashboard1 outlet={
    <>
<Outlet/></>}/>

</div> : <AdminLoginpage/>  }
   
   
    </>
  )
}

export default Dashboard
