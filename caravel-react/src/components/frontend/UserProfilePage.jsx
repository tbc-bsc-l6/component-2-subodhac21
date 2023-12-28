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
    <>
    <div className='w-100 flex items-center justify-center p-8'>
      <div class="w-2/3">
    <div class="relative right-0">
      <ul
        class="relative flex flex-wrap p-1 list-none rounded-xl bg-blue-gray-50/60"
        data-tabs="tabs"
        role="list"
      >
        <li class="z-30 flex-auto text-center">
          <a
            class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
            data-tab-target=""
            active=""
            role="tab"
            aria-selected="true"
            aria-controls="app"
          >
            <span data-id="1" onClick={(e)=>changeTab(e)} class="ml-1">User Profile</span>
          </a>
        </li>
        <li class="z-30 flex-auto text-center">
          <a
            class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
            data-tab-target=""
            role="tab"
            aria-selected="false"
            aria-controls="message"
          >
            <span data-id="1" onClick={(e)=>changeTab(e)} class="ml-1">Orders</span>
          </a>
        </li>
        <li class="z-30 flex-auto text-center">
          <a
            class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
            data-tab-target=""
            role="tab"
            aria-selected="false"
            aria-controls="settings"
          >
            <span class="ml-1">Wishlists</span>
          </a>
        </li>
      </ul>
      <div data-tab-content="" class="p-5">
        <div class="block opacity-100" id="app" role="tabpanel">
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-blue-gray-500">
          <div className='flex justify-center items-center flex-col p-2 w-[80%]'>

<div onClick={()=>{setEditPage(true)}} className='bg-slate-800 text-white mb-8 flex justify-center items-center'>
  
<img class="rounded-full w-[120px] h-[120px]" src={`http://127.0.0.1:8000/images/${loginData.image}`}/>

</div>


      <div className="bg-white overflow-hidden shadow rounded-lg border md:w-[80%] w-100%">
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
          </p>
        </div>
        <div class="hidden opacity-0" id="message" role="tabpanel">
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-blue-gray-500">
          <table class="table-auto">
            <thead>
                <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
                </tr>
                <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
                </tr>
                <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
                </tr>
            </tbody>
            </table>
          </p>
        </div>
        <div class="hidden opacity-0" id="settings" role="tabpanel">
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-blue-gray-500">
            Comparing yourself to others is the thief of joy.
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
    
    
    </>
  )
}

export default UserProfilePage
