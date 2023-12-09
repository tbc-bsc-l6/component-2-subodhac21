import React from 'react'
import Product_card from './product_card'

const Newproducts = () => {
  return (<>
    <h1 className='text-center text-[30px] mt-10'>New Arrivals</h1>
    <div className='flex items-center justify-center w-[100%]'>
    <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center xl:grid-cols-4 mt-10 w-[78%] sm:w-[85%] m-auto lg:w-[90%] place-items-center'>
        <Product_card/>
        <Product_card/>
        <Product_card/>
        <Product_card/>
        <Product_card/>
        <Product_card/>
        <Product_card/>
        <Product_card/>

    </div>
    </div>
    </>
  )
}

export default Newproducts
