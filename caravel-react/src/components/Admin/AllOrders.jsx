import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const AllOrders = () => {
    const [changeHtml, setChangeHtml] = useState([]);
    const [itemPro, setItemPro] = useState([]);
    const [masterPro, setMasterPro] = useState([]);
    const [statusDrop, setStatusDrop] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_orders_all_admin/").then((response)=>{
            setItemPro(response.data.orders);
            setMasterPro(response.data.orderItem);
            setRender(false);
        });
    },[render]);

    const changeStatus = (e) =>{
        e.preventDefault();
        let id = e.target.dataset.id;
        setChangeHtml([id, !changeHtml[1]]);
    }

    const changeStatusDrop = (e) =>{
        setStatusDrop([e.target.id, true, e.target.value]);
        axios.put("http://127.0.0.1:8000/api/change_order_status/", {id: e.target.dataset.id, value: e.target.value}).then((response)=>{
            setRender(true);
            setChangeHtml([]);

        })
    }
    console.log(statusDrop);
    // console.log(changeHtml);
  return (

    <div>
        <div className="flex mb-4 text-2xl">
            <h1>All orders</h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {itemPro.length === 0 ? <div></div> :
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                    Order Code
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
                    User Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
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
                <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                        {id+1}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {itemPro[id].order_Main.order_no}
                    </th>
                    <td className="px-6 py-4">
                        {itemPro[id].products.name}
                    </td>
                    <td className="px-6 py-4">
                        <img className='w-16 h-16' src={`http://127.0.0.1:8000/images/${itemPro[id].products.image}`} alt="Not available" />
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].products.quantity}
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].products.price}
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].products.category_id}
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].products.discount_id}
                    </td>
                    <td className="px-6 py-4">
                        {itemPro[id].order_Main.user_id}
                    </td>
                    {
                        changeHtml[0]==itemPro[id].order_Main.id && changeHtml[1]===true ? 
                        <>
                        <div className='my-4 w-[100px]'>
                            <select data-id={itemPro[id].order_Main.id} onChange={(e)=>changeStatusDrop(e)} name="" id={id} value={statusDrop[0] == id ? statusDrop[2]:  itemPro[id].order_Main.status}  className="block border border-grey-light w-full p-2 rounded mb-4">
                                <option value="" disabled>Select</option>
                                <option value="New">New</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Paid">Paid</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Deactivated">Deactivated</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                            {/* <button className='px-4 py-2 rounded-md bg-green-600 text-white'>Apply</button> */}
                        </div> 
                        </>
                        : <td className="px-6 py-4">
                        {itemPro[id].order_Main.status}
                    </td>}
                    <td className="px-6 py-4">
                        <Link data-id={itemPro[id].order_Main.id} onClick={(e)=>changeStatus(e)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Change Status</Link>
                    </td>
                </tr>
                            );
                        })
                    }
        </tbody>
    </table>}
</div>
    </div>
  )
}

export default AllOrders
