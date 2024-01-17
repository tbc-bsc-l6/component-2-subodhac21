import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const CategoryList = () => {
    const [category, setCategory] = useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_categories").then((response)=>{
            setCategory(response.data.allcat);
        })
    },[]);
  return (
    <div>
<div className="relative overflow-x-auto">
    <h4 className='text-[1.4rem] mb-8 font-bold'>Categories List</h4>
    {category.length === 0 ? <div></div> : <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                    Category name
                </th>
                <th scope="col" className="px-6 py-3">
                    Category description
                </th>
                <th scope="col" className="px-6 py-3">
                    Created at
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                category.map((cat, id)=>{
        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
                    {id+1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {cat.name}
                </th>
                <td className="px-6 py-4">
                    {cat.description}
                </td>
                <td className="px-6 py-4">
                    {cat.created_at}
                </td>
                <td className="px-6 py-4">
                    <Link>Edit</Link>
                </td>
            </tr>
                })
            }
        </tbody>
    </table>}
</div>

    </div>
  )
}

export default CategoryList
