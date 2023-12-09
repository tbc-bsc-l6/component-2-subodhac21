import React, { useEffect, useState } from 'react'
import Main_signup from '../components/frontend/Main_signup'
import Navbar from '../components/frontend/Navbar';
import Footer from '../components/frontend/Footer';
import Loader from '../components/frontend/Loader';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
//   const navigate = useNavigate();
// const [isLogin, setIsLogin] = useState(false);

// useEffect(()=>{

//   if(loginData.token != ""){
//         setIsLogin(true);
//         navigate("/");
//   }
// },[]);
  return (
    // isLogin === true ? <Loader/> :
    <div className='font-[poppins] h-screen'>
    <Navbar/>
    <Main_signup/>
    <Footer/>
    </div>
  )
}

export default SignUp
