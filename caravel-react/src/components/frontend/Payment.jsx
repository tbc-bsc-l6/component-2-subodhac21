import React,{useState} from 'react'
import Paypal from './Paypal';

const Payment = ({totalprice, id}) => {
    const [checkout, setCheckout] = useState(false);
// console.log(totalprice);
  return (
    checkout ? <Paypal price={totalprice} id={id}/> : 
    <div className=''>
        <button className='mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-80 2xl:w-full text-base font-medium leading-4 text-gray-800' onClick={()=>{
            setCheckout(true);
        }}>Goto Payment</button>
    </div>) ;
}

export default Payment
