import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../auth/authSlice';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom';


const UserProfilePage = () => {
const [tab, setTab] = useState("1");
const [itemPro, setItemPro] = useState([]);
    const [masterPro, setMasterPro] = useState([]);
  const [editPage, setEditPage] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  let loginData = useSelector((state)=>{
    return state.authReducer.signin[0];
  })
 
  const logout = () =>{
    localStorage.setItem("loginItem", "");
    dispatch(logoutUser({id: "", fullname: "", email: "", token: "", image: "", type: ""}));
    nav("/");
  }
 

useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/get_total_orders/"+loginData.id).then((response)=>{
        setItemPro(response.data.orders);
        // setMasterPro(response.data.orderItem);
        console.log(response);
      });
},[]) 

const changeTab = (e) =>{
    setTab(e.target.dataset.id);
}
  return (
    <>
    <div className='w-100 flex items-center justify-center p-8'>
      <div className="w-2/3">
    <div className="relative right-0">
      <ul
        className="relative flex flex-wrap p-1 list-none rounded-xl bg-blue-gray-50/60"
        data-tabs="tabs"
        role="list"
      >
        <li className="z-30 flex-auto text-center">
          <a
            className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
            data-tab-target=""
            active=""
            role="tab"
            aria-selected="true"
            aria-controls="app"
          >
            <span data-id="1" onClick={(e)=>changeTab(e)} className={`${tab==="1"? "font-bold text-blue-400" : "none"} ml-1`}>User Profile</span>
          </a>
        </li>
        <li className="z-30 flex-auto text-center">
          <a
            className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
            data-tab-target=""
            role="tab"
            aria-selected="false"
            aria-controls="message"
          >
            <span data-id="2" onClick={(e)=>changeTab(e)} className={`${tab==="2"? "font-bold text-blue-400" : "none"} ml-1`}>Orders</span>
          </a>
        </li>
        <li className="z-30 flex-auto text-center">
          <a
            className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
            data-tab-target=""
            role="tab"
            aria-selected="false"
            aria-controls="settings"
          >
            <span data-id="3" onClick={(e)=>changeTab(e)} className={`${tab==="3"? "font-bold text-blue-400" : "none"} ml-1`}>Wishlists</span>
          </a>
        </li>
      </ul>
      <div data-tab-content="" className="p-5">
        <div className={`${tab==="1" ? "block" :"hidden"} opacity-100`} id="app" role="tabpanel">
          {/* <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-blue-gray-500"> */}
          <div className='flex justify-center items-center flex-col p-2 w-[80%]'>

<div onClick={()=>{setEditPage(true)}} className='bg-slate-800 text-white mb-8 flex justify-center items-center'>
  
<img className="rounded-full w-[120px] h-[120px]" src={`http://127.0.0.1:8000/assets/${loginData.image}`}/>

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
        </div>
        <div className={`${tab==="2" ? "block": "hidden"} opacity-100`} id="message" role="tabpanel">
          

<div className="relative overflow-x-auto">
          <h4 className="font-bold p-4 text-xl mb-8">Orders</h4>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    order no
                </th>
                <th scope="col" className="px-6 py-3">
                    address
                </th>
                <th scope="col" className="px-6 py-3">
                delivery_date
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th>
                  Remarks
                </th>
            </tr>
        </thead>
        <tbody>
          {
           itemPro.map((pro, id)=>{
            
            return (
                <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                        <Link className="underline text-blue-500" to={"/orderpage/"+itemPro[id].id} >{id+1}</Link>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {itemPro[id].order_no}
                    </th>
                    <td className="px-6 py-4">
                        {itemPro[id].address}
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].delivery_date}
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].status}
                    </td>
                    <td>
                      {itemPro[id].remarks}
                    </td>
            </tr>)
           
})}

        </tbody>
    </table>
</div>

        </div>
        <div className={`${tab==="3" ? "block" :"hidden"} opacity-100`} id="settings" role="tabpanel">
          
        </div>
      </div>
    </div>
  </div>
  </div>
    
    
    </>
  )
}

export default UserProfilePage
