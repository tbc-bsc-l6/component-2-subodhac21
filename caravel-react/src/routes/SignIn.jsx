import React, { useEffect, useState } from 'react'
import Navbar from '../components/frontend/Navbar';
import Login from "../components/frontend/Login"
import Footer from '../components/frontend/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/frontend/Loader';


const SignIn = ({isLogin}) => {
const navigate = useNavigate();
// const [isLogin, setIsLogin] = useState(false);
// const [login, setLogin] = useState(false);
// let isLogin = useSelector((state)=>{
//   return state.signin;
// })
if(isLogin.token === true){
  navigate("/");
}
 
// useEffect(()=>{

//  if(isLogin === true){
//   navigate("/");
//  }
// },[isLogin]);
  return (
    // isLogin === true ? <Loader/> :
     <div className='font-[poppins] h-screen'>
    <Navbar/>
    <Login/>
    <Footer/>
    </div>
  )
}

export default SignIn