import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_users_admin").then((response)=>{
            console.log(response);
            let arr = response.data.users;
            setUsers(arr);
        })
    },[]);
    
  return (

    <div>
      
      <h1 className='p-4 font-bold text-[1.6rem] mb-4'>Users Management</h1>
      <Link to="/dashboard/add_user">
      <p className='p-4 text-[1.6rem] mb-4 underline text-green-700'>Add Users</p></Link>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {users.length === 0 ? <div>No users found</div> : <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    <Link to={`/dashboard/edit_user/${user.id}`}  href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                    <br/>
                    <Link to={`reset_user/${user.id}`} href="#" className="font-medium text-green-600 dark:text-red-500 hover:underline">Reset Password</Link>
                    <br/>
                    <Link to={`delete_user/${user.id}`} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete User</Link>


                </td>
            </tr>;
            })
           
            }
        </tbody>
    </table>}
</div>

    </div>
  )
}

export default Users
