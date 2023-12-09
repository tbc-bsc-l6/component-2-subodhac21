import React from 'react'
import {useState, useEffect} from "react";
import fashion from "../../assets/images/fashion.png";
import fashion2 from "../../assets/images/fashion2.png";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Main_body = () => {
  // let obj = [{
  //   title: "Stylish Clothes",
  //   para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus neque in culpa eum rem asperiores",
  //   image: fashion
  // },
  // {
  //   title: "Cool clothing Habits",
  //   para: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita itaque in incidunt odit error eius.",
  //   image: fashion2
  
  // }
  // ]
  // const [hover, setHover] = useState(false);
  // const [imgLen, setImgLen] = useState(0);
  // const [class1, setClass1] = useState("");
 

  // const increaseImage = () =>{
  //   if(imgLen === obj.length-1){
  //     setTimeout(()=>{
  //       setImgLen(0);
  //       setClass1('animate-pulse');
  //     },400)
  //   }
  //   else{
  //     setTimeout(()=>{
  //       setImgLen(imgLen+1);
  //     },400)

  //   }
  // }
  // const decreaseImage = () =>{
  //   if(imgLen === 0){
  //     setTimeout(()=>{
  //       setImgLen(obj.length-1);
  //     },400)

  //   }
  //   else{
  //     setTimeout(()=>{
  //       setImgLen(imgLen-1);
  //     },400)

  //   }
  // }

  return (<>
   
<div
  className="md:h-[90vh]  h-[85vh] bg-hero-pattern bg-cover bg-center bg-no-repeat -z-99999"
>
  {/* <div
    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div> */}

  <div
    className=" mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl flex flex-col items-center justify-center text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Your Ultimate Online 

        <strong className="block font-extrabold text-rose-700">
        Supermarket Experience.
        </strong>
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl/relaxed">
      Discover quality products, unbeatable deals, and unparalleled convenience at our virtual supermarket.
      </p>

      <div className=" mt-8 flex flex-wrap gap-4 text-center z-999">
        <Link
          to="/signup"
          className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        >
          Get Started
        </Link>

        <Link
          to="/about-us"
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</div>

  </>);
}

export default Main_body