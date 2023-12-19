import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../auth/authSlice';
import Loader from './Loader';
import Modal from './Modal';

const Login = () => {
  const [load1,setLoad] = useState();
  const [logindetail, setLoginDetail] = useState({
    password: "",
    email: "",
  });
  let isLogin = useSelector((state)=>{
    return state.authReducer.signin[0];
  })
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [status, setStatus] = useState({
    status: "",
    color: ''
});


  const submitForm = (e) =>{
    e.preventDefault();
    setLoad(true);
    if(logindetail.email != "" && logindetail.password != ""){
      let userData = {
        email: logindetail.email,
        password: logindetail.password
      }
      axios.post("http://127.0.0.1:8000/api/login", userData).then((response) => {
        
        // setLoginDetail({
        //   email: "", 
        //   password: ""
        // });
        if(response.data.status==="true"){
          // setStatus({status: response.data.message, color: "blue-700"});
          console.log(response.data);
          dispatch(loginUser({id: response.data.id, fullname: response.data.fullname, email: logindetail.email, token: response.data.api_token, image: response.data.image, type: "customer"}));
          localStorage.setItem('loginItem', response.data.api_token);
          navigate("/");
        }
        else{
          setLoad(false);
        }
        
    });
    }
  }
  const changeInput = (e) =>{
    setLoginDetail({
      ...logindetail, [e.target.name]:e.target.value
    });
  }

  return (
    
    isLogin.token != "" ? <Navigate to="/"/> : <div className='w-[100%] -z-20 mt-16 mb-16'>
      <div className="md:w-[40%] w-[100%] -z-20 mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 -z-20">
      <p className={`w-[100%] mx-auto text-center text-lg mb-4 text-${status.color} `} >{status.status}</p>
      <h1 className='text-lg text-center bg-black rounded-lg text-[red]'>{load1 === false ? "Invalid Credentials": ""}</h1>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={(e)=>submitForm(e)} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={(e)=>changeInput(e)} value={logindetail.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value={logindetail.password} onChange={(e)=>changeInput(e)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <Link to="/fpass" className="text-sm font-medium text-[#2563eb] hover:underline dark:text-[#2563eb]">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-white bg-[#2563eb] hover:bg-[#4f7cdd] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="/signup" className="font-medium text-[#2563eb] hover:underline dark:text-[#2563eb]">Sign up</Link>
                  </p>
              </form>
          </div>
    </div>
    
    {load1 && <><Loader type={"two"}/></> }
    </div>
  )
}

export default Login
