import React from 'react'
import Product_card from './product_card';
import { useEffect, useState } from 'react'
import  axios  from 'axios'


const Newproducts = () => {
  const [newPro, setNewPro] = useState([]);
  const getNewProducts = async() =>{
    axios.get("http://127.0.0.1:8000/api/get_products").then((response)=>{
      console.log(response);
      setNewPro(response.data.arr);
    })
  }
  console.log(newPro);
  useEffect(()=>{
    getNewProducts();
  },[])
  return (<>
    <h1 className='text-center text-[30px] mt-10'>New Arrivals</h1>
    <div className='flex items-center justify-center w-[100%]'>
    <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center xl:grid-cols-4 mt-10 w-[78%] sm:w-[85%] m-auto lg:w-[90%] place-items-center'>
      {
        newPro.map(({id, category_id, created_at, description, discount_id, image, name, price})=>{
            // console.log(id, description, name, image);
            return <Product_card key={id} id={id} category_id={category_id} date={created_at} description={description} discount_id={discount_id} image={image} name={name} price={price}/>
        })
      }
        

    </div>
    </div>
    </>
  )
}

export default Newproducts
