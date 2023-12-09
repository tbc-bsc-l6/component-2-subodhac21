import React from 'react'
import Navbar from '../components/frontend/Navbar';
import Footer from '../components/frontend/Footer';
import UserProfilePage from '../components/frontend/UserProfilePage';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const UserProfile = () => {
  let isLogin = useSelector((state)=>{
    return state.authReducer.signin;
  })
  return (
    isLogin.token === ""? <Navigate to="/" />:
    <div className='font-[poppins] h-screen'>
    <Navbar/>
    <UserProfilePage/>
    <Footer/>
    </div>
  )
}

export default UserProfile