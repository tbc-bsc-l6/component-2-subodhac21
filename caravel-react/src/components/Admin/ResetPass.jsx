import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const ResetPass = () => {
    const nav = useNavigate();
    const {id} = useParams();
    const [saveInfo, setSaveInfo] = useState({fullname: ""});

    const [userInfo, setUserInfo] = useState({
        oldpassword: "",
        cpassword: "",
        newpassword: "",
    });

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_user_admin/"+id).then((response)=>{
            setSaveInfo(response.data.user);
        });
    },[]);

    const changeInfo = (e) =>{
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }
    const submitUser = (e) =>{
        e.preventDefault();
        let userData = {...userInfo, id: id};
        console.log(userData);
        if(userData.oldpassword != "" && userData.cpassword != "" && userData.newpassword != ""){
            if(userData.oldpassword === userData.cpassword){
                axios.put("http://127.0.0.1:8000/api/reset_user_admin", userData).then((response)=>{
                    if(response.data.status === true)
                        nav("/dashboard/users");
                    });
            }
        }
    }
  return (
    <div>
       <div>
<div className="bg-grey-lighter min-h-[60vh] flex flex-col">
            <h2></h2>
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-2xl text-center">Update Password for email {saveInfo.email} </h1>
                   
                        <input 
                    value={userInfo.oldpassword}
                    onChange={(e)=>changeInfo(e)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="oldpassword"
                        placeholder="old password" />

                        
                    <input 
                    value={userInfo.cpassword}
                    onChange={(e)=>changeInfo(e)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="cpassword"
                        placeholder="confirm password" />

                    <input 
                    value={userInfo.newpassword}
                    onChange={(e)=>changeInfo(e)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="newpassword"
                        placeholder="New password" />
                    <button
                    onClick={(e)=>{submitUser(e)}}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-white bg-green-500 hover:bg-green-dark focus:outline-none my-1"
                    >Update Password</button>

                   
                </div>

                
            </div>
        </div>
    </div>
    </div>
  )
}

export default ResetPass
