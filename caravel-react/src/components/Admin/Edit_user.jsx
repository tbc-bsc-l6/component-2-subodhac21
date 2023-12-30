import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../frontend/Loader';

const Edit_user = () => {
    const {id} = useParams();
    const [saveInfo, setSaveInfo] = useState({fullname: ""});
    const [userInfo, setUserInfo] = useState({
        fullname: "",
        email: "",
        usertype: "",
    });
    console.log(id);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_user_admin/"+id).then((response)=>{
            console.log(response);
            setUserInfo(response.data.user);
        });
    },[]);
    const nav = useNavigate();
   

    const changeInfo = (e) =>{
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }
  return (
    
        <>
    <div>
        <div>
            {
                userInfo.fullname === "" ? <div/> :
<div className="bg-grey-lighter min-h-[60vh] flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Edit User</h1>
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
                    
                        
              
                    <button
                    onClick={(e)=>{submitUser(e)}}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-white bg-green-500 hover:bg-green-dark focus:outline-none my-1"
                    >Create User</button>

                   
                </div>

                
            </div>
        </div>}
    </div>
    </div>
</>
  );
}

export default Edit_user
