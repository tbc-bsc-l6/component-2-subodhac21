import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false);
    const localToken = localStorage.getItem("loginItem");
    const [forbiddenPage, setForbiddenPage] = useState(false);
    const deleteUser = (e) =>{
        let id = e.target.dataset.id;
        axios.delete("http://127.0.0.1:8000/api/delete_user_customer/"+id, {headers: {"Authorization": `${localToken}`}}).then((response)=>{
            // console.log(response);
            setStatus(true);
        });
    }
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_users_customer", {headers: {"Authorization": `${localToken}`}}).then((response)=>{
            console.log(response.data.error);
            if(response.data.error === "Unauthorized"){
                setForbiddenPage(true);
                setUsers([]);
            }
            else{
                let arr = response.data.users;
                setUsers(arr);
                setStatus(false);
            }
        })
    },[status]);
    
  return (

    <div>
      
      <h1 className='p-4 font-bold text-[1.6rem] mb-4'>Customers Management</h1>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {forbiddenPage===false ? (users.length === 0 ? <div>No users found</div> : <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N.    
                </th>
                <th scope="col" className="px-6 py-3">
                    Full name
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    User Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Created At
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,i)=>{
                return  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </th>
                <td className="px-6 py-4">
                    {user.fullname}
                </td>
                <td className="px-6 py-4">
                    {user.email}
                </td>
                <td className="px-6 py-4">
                    {user.usertype}
                </td>
                <td className="px-6 py-4">
                    {user.created_at}
                </td>
                <td className="px-6 py-4">
                   
                    <Link data-id={user.id} onClick={(e)=>deleteUser(e)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete User</Link>


                </td>
            </tr>;
            })
           
            }
        </tbody>
    </table>) : (<section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">403</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Forbidden Error</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, you can't access that page. Access to this resource on  the server is denied!! </p>
            <a href="#" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
        </div>   
    </div>
</section>)}
</div>

    </div>
  )
}

export default Customers
