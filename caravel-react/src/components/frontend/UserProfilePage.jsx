import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../auth/authSlice';
import { useSelector } from 'react-redux'




const UserProfilePage = () => {
  const [editPage, setEditPage] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const logout = () =>{
   
    localStorage.setItem("loginItem", "");
    dispatch(logoutUser({id: "", fullname: "", email: "", token: "", image: "", type: ""}));

    nav("/");
  }
  let loginData = useSelector((state)=>{
    return state.authReducer.signin[0];
})
  return (
    <div className='flex justify-center items-center flex-col p-10'>

<div onClick={()=>{setEditPage(true)}} className='bg-slate-800 text-white mb-8 flex justify-center items-center'>
  
<img class="rounded-full w-[120px] h-[120px]" src={`http://127.0.0.1:8000/images/${loginData.image}`}/>

</div>


      <div className="bg-white overflow-hidden shadow rounded-lg border md:w-[40%] w-100%">
    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
        </h3>
        <button className='border bg-blue-400 text-white bottom-2 md:p-3 my-4 mx-4 px-6 p-2' type='button' onClick={logout}>Logout</button>
    </div>
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    John Doe
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    johndoe@example.com
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (123) 456-7890
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St<br/>
                     Anytown, USA 12345
                </dd>
            </div>
        </dl>
    </div>
</div>
     
    </div>
  )
}

export default UserProfilePage
