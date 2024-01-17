import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../auth/authSlice';
import Home from '../../routes/Home';
import { Navigate } from 'react-router-dom';

const Main_signup = () => {
    //redux dispatch

    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>{
        return state.productReducer.cart_products;
      })
    let isLogin = useSelector((state)=>{
        return state.authReducer.signin[0];
      })

    //router navigate
    const navigate = useNavigate();


    //basic states for data
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [token, setToken] = useState("");
    const [status, setStatus] = useState({
        status: "",
        color: ''
    });


    const submitForm = (e) =>{
        e.preventDefault();
        let cartToken = localStorage.getItem('cartItem');
        
        const userData = {
            fullname : fullname,
            email: email,
            password: password,
            password_confirmation: cpassword,
            token: cartToken != "" ? cartToken : ""
        };
        if(fullname != "" &&  email != "" && password != "" && cpassword != ""){
          
            axios.post("http://127.0.0.1:8000/api/register", userData).then((response) => {
                if(response.data.status != "failed"){
                    dispatch(loginUser({id: response.data.id,fullname: fullname, email: email, token: response.data.api_token, image: response.data.image, type: "customer"}));
                    localStorage.setItem('loginItem', response.data.api_token);
                    localStorage.setItem("cartItem", "");
                    setFullname("");
                    setEmail("");
                    setPassword("");
                    setCpassword("");
                    
                    // navigate("/");
                }
                else{
                    setStatus({status: response.data.message, color: "blue-700"});
                }
                // navigate("/signin");
            });

        }
        else{
            setStatus({status: "Some of the fields are empty", color: "red-700"});
            
          
        }
    }
  return (
    isLogin.token != "" ? <Navigate to="/"/> :<form onSubmit={(e)=>submitForm(e)} className='mt-0 mb-8'>
       
      <div className="bg-grey-lighter min-h-[700px] flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                {status.status != "" ? 
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Holy smokes!  </strong>
  <span className="block sm:inline">{status.status}</span>
</div> : ""
}
        
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(e)=>{setFullname(e.target.value)}}
                        />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={cpassword}
                        onChange={(e)=>{setCpassword(e.target.value)}}
                        />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-[#38c172] text-white hover:bg-[#54e792] focus:outline-none my-1"
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <Link className="no-underline border-b border-blue text-[#38c172]" to="/signin">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
    </form>
  )
}

export default Main_signup;
