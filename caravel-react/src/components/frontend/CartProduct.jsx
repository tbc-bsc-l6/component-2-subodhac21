import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { add_cart_item, delete_cart_item } from '../../auth/productSlice';
import axios from 'axios';


const CartProduct = ({id,quantity, image, name, description, price, temp_id, category}) => {
    const [quant, setQuant] = useState(quantity);
    const dispatch = useDispatch();
    const userLogin = useSelector((state)=>{
        return state.authReducer.signin[0];
    })
    const remove_item = (e) =>{
        let id = e.currentTarget.dataset.id;
        console.log(id);
        if(userLogin.id != ""){
          dispatch(delete_cart_item({'id': id}));
        axios.delete("http://127.0.0.1:8000/api/delete_cart_pro_byuser/"+id).then((response)=>{
          console.log(response);
            if(response.data.status = true){
            }
        })
        }
        else{
          dispatch(delete_cart_item({'id': id}));
        axios.delete("http://127.0.0.1:8000/api/delete_products_from_token/"+id).then((response)=>{
          console.log(response);
        if(response.data.status = true){
      
          }
        })
        }
      
      }

      const decreaseCartNum = (e)=>{

      }
      
      const increaseCartNum = (e) =>{
      
      }
      
  return (
    <div>
       <div key={id} className="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200 dark:border-gray-500 xl:justify-between border-opacity-40">
              <div className="w-full mb-4 md:mb-0 h-96 md:h-44 md:w-56">
              <img src={`http://127.0.0.1:8000/images/${image}`} alt="" className="object-cover w-full h-full"/>
              </div>
              <div className="w-full px-4 mb-6 md:w-96 xl:mb-0">
              <a className="block mb-5 text-xl font-medium hover:underline dark:text-gray-400" href="#">
              {name}</a>
              <div className="flex flex-wrap">
              <p className="mr-4 text-sm font-medium">
              <span className="dark:text-gray-400">{description}</span>
              </p>
              <p className="text-sm font-medium dark:text-gray-400">
              <span>Category:</span>
              <span className="ml-2 text-gray-400">{category}</span> 
              </p>
              </div>
              </div>
              <div className="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
              <div className="flex items-center">
              <h2 className="mr-4 font-medium dark:text-gray-400">Qty:</h2>
              <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 ">
              <button onClick={()=>decreaseCartNum()} className="py-2 pr-2 border-r border-gray-300 dark:border-gray-600 dark:text-gray-400 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z">
              </path>
              </svg>
              </button>
              <input onClick={()=>increaseCartNum()} type="number" className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400" placeholder={quant} />
              <button className="py-2 pl-2 border-l border-gray-300 dark:border-gray-600 hover:text-gray-700 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
              </path>
              </svg>
              </button>
              </div>
              </div>
              </div>
              <div className="w-full px-4 xl:w-auto">
              <span className="text-xl font-medium text-blue-500 dark:text-blue-400 ">
              <span className="text-sm">Rs. </span>
              <span>{price}</span>
              </span>
              </div>
              <button data-id={temp_id} onClick={(e)=> remove_item(e)} className="absolute top-0 right-0 text-gray-400 lg:mt-6 lg:-mr-4 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
              </svg>
              </button>
              </div>
    </div>
  )
}

export default CartProduct
