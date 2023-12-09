import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const Modal = ({hide}) => {
   
  return (
    <>
    <div className={`${hide} rounded-lg bg-white fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-100 z-30 flex justify-center items-center`}>
     
        <div className="bg-gray-50 px-4 py-3 sm:flex md:p-6 md:px-18 sm:flex-row justify-between gap-8 sm:px-6 shadow-xl rounded-lg">
            <input type="text" className='border-[#1da1f2] border-2 p-2' placeholder='Search anything'/>
          <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"><FontAwesomeIcon className='text-[1.6rem]' icon={faMagnifyingGlass} /></button>
        </div>
      

    </div>
    </>
  )
}

export default Modal
