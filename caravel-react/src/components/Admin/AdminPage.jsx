import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
const AdminPage = () => {
  let loginData = useSelector((state)=>{
    return state.authReducer.signin[1];
  })
  return (
    <>
   <div>
    <h1 className='max-w-[1000px] mx-auto text-[1.3rem] text-center mb-12 text-blue-700'>Hello {loginData.type}</h1>
    <h1 className='max-w-[1000px] mx-auto text-[2rem] text-center leading-7'>This is the page where you will find all the products and add it and delete it</h1>
   </div>
    </>
  )
}

export default AdminPage
