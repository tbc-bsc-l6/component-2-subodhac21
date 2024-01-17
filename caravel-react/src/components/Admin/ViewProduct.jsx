import axios from 'axios';
import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_pro, delete_pro, filter_pro } from '../../auth/productSlice';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { memoize } from 'proxy-memoize';
import { useCallback } from 'react';

const ViewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dropDown, setDropDown] = useState(false);
    const [svalue, setsValue] = useState("");
    const [filter, setFilter] = useState("");
    const callSearchValue = (value) =>{
       setsValue(value);
    }
    const deleteProduct = (e)=>{
        e.preventDefault();
        let id = e.target.dataset.id;
        axios.delete("http://127.0.0.1:8000/api/delete_product/"+id).then((response)=>{
            // console.log(response);
            dispatch(delete_pro({id: id}));
        })
    }

    const selectTodoDescriptionsProxy = memoize(state =>
        state.productReducer.products.filter((pro)=>{
            if(svalue === ""){
                return pro;
            }
            else{
                let discount = `${pro.discount_id}`
                return pro.name.toLowerCase().includes(svalue.toLowerCase()) || pro.cat_name.toLowerCase().includes(svalue.toLowerCase()) || discount.includes(svalue);
            }
        })
    
    )

      const { itemPro } = useSelector(useCallback(memoize(state => ({
        itemPro: selectTodoDescriptionsProxy(state),
        
      })), [svalue]));


    //   itemPro = itemPro.map((item)=>{
    //     item
    //   })

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_products").then((response)=>{
            console.log(response);
            dispatch(add_pro(response.data.arr));
            
        })
    },[]);  

    // const editPro = (e) =>{
    //     navigate("/dashboard/edit_product", {state: {id: e.target.dataset.id}});
    // }

    const dropdown = () =>{
        setDropDown(!dropDown);
    }

    const filterAsc = () =>{
        setFilter("asc");
        setDropDown(false);
    }
    const filterDesc = () =>{
        setFilter("desc");
        setDropDown(false);

    }
  return (
    <div>
        <div className='flex md:flex-row flex-col items-baseline justify-between w-full mb-6'>

      <h1 className='text-xl font-weight mb-0'>View products</h1>
      <div className='flex md:flex-row flex-col md:mt-0 mt-4 items-baseline justify-between gap-5'>

<button onClick={(e)=>{dropdown(e)}} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Filter <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdownDelay" className={`z-10 ${dropDown===true ? "block" : "hidden"} absolute mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
      <li>
        <a onClick={()=>{filterAsc()}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ascending</a>
      </li>
      <li>
        <a onClick={()=>{filterDesc()}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Descending</a>
      </li>
    </ul>
</div>

      <Search callSearchValue={callSearchValue}/>
      </div>
        </div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Discount
                </th>
                <th scope="col" className="px-6 py-3">
                    Added Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           <tr className={itemPro.length === 0 ? 'block': 'hidden'}><td>No Searches Found</td></tr>
    {
        
        itemPro.map((pro, id)=>{
            
            return (
                <tr key={pro.nanoid} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                        {id+1}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {pro.name}
                    </th>
                    <td className="px-6 py-4">
                        <img className='w-16 h-16' src={pro.image.includes('https') ? pro.image : `http://127.0.0.1:8000/images/${pro.image}`} alt="Not available" />
                    </td>
                    <td className="px-6 py-4">
                        {pro.quantity}
                    </td>
                    <td className="px-6 py-4">
                        {pro.price}
                    </td>
                    <td className="px-6 py-4">
                        {pro.cat_name}
                    </td>
                    <td className="px-6 py-4">
                        {pro.discount_id}
                    </td>
                    <td className="px-6 py-4">
                        {pro.created_at.substring(0, 10)}
                    </td>
                    <td className="px-6 py-4">
                        <Link data-id={pro.id} to={`/dashboard/edit_product/${pro.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                        <br/>
                        <Link data-id={pro.id} onClick={(e)=>{deleteProduct(e)}} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</Link>
                    </td>
                </tr>
                            );
                        })
                    }
        </tbody>
    </table>
</div>

    </div>
  )
}

export default ViewProduct
