import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Add_user = () => {
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState({
        fullname: "",
        email: "",
        usertype: "",
        password: "",
        cpassword: ""
    });

    const changeInfo = (e) =>{
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }
    const submitUser = (e) =>{
        e.preventDefault();
        let userData = userInfo;
        if(userData.fullname != "" && userData.email != "" && userData.usertype != "" && userData.password != "" && userData.cpassword != ""){
            if(userData.password === userData.cpassword){
                axios.post("http://127.0.0.1:8000/api/create_user_admin", userData).then((response)=>{
                    nav("/dashboard/users");
                    // console.log(response);
                });
            }
        }
    }
  return (
    <div>
<div className="bg-grey-lighter min-h-[60vh] flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Create Users</h1>
                    <input 
                    onChange={(e)=>changeInfo(e)}
                    value={userInfo.fullname}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" />

                    <input 
                    value={userInfo.email}
                    onChange={(e)=>changeInfo(e)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <select 
                    value={userInfo.usertype}
                    onChange={(e)=>changeInfo(e)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="usertype"
                        placeholder="Usertype" >
                            <option value="" disabled>Select</option>
                            <option value="admin">admin</option>
                        </select>
                    
                        <input 
                    value={userInfo.password}
                    onChange={(e)=>changeInfo(e)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="password" />

                        
                    <input 
                    value={userInfo.cpassword}
                    onChange={(e)=>changeInfo(e)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="cpassword"
                        placeholder="confirm password" />
                    <button
                    onClick={(e)=>{submitUser(e)}}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-white bg-green-500 hover:bg-green-dark focus:outline-none my-1"
                    >Create User</button>

                   
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Add_user
