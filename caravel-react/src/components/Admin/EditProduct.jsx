import axios from 'axios';
import React, { useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_pro, filter_pro } from '../../auth/productSlice';
import Search from './Search';
import { Link, useLocation, useNavigate, Navigate, useParams, redirect } from 'react-router-dom';
import { createSelector, current } from '@reduxjs/toolkit';
import Loader from '../frontend/Loader';



const EditProduct = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  

  const [vars, setVar] = useState({
    pname: "",
    pprice: "",
    pquant: "",
    pdesc: "",
    pcat: "",
    pdiscount: "",
    pimage: null,
  });

  console.log(vars);

  const [image, setImage] = useState(null);
  console.log(image);
  const changeImage = (e) =>{
    setImage(e.target.files[0]);
  }
    useEffect(()=>{
      let isMounted = true;
      async function get_single_product_only(){
        if(id != null){
          try {
            const response = await axios.post("http://127.0.0.1:8000/api/get_single_product", { id: id }, { headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },});
            if (isMounted) {
              // Update state or refs only if the component is still mounted
              setVar({
                pname: response.data.product.name,
                pprice: response.data.product.price,
                pquant: response.data.product.quantity,
                pdesc: response.data.product.description,
                pcat: response.data.product.category_id,
                pdiscount: response.data.product.discount_id,
                pimage: response.data.product.image
              });
            }
          } catch (error) {
            console.error("Error fetching product details:", error);
            // Handle error if needed
          }
        }

      }
      get_single_product_only();

      return ()=>{
        isMounted = false;
      }
      
    }, [id]);
    // const {id} = state;
    // const {state} = props.location;
    // console.log(state);
    // console.log(props);
  const [catmodal, setCatModal] = useState(false);
  const [category, setCategory] = useState([]); 
  const [updateCat, setUpdateCat] = useState(false);
  // const [redirect, setRedirect] = useState(false);

 

  const submitProduct = (e) =>{
    e.preventDefault();
    if(vars.pname != "" && vars.pprice != "" && vars.pquant != "" && vars.pdesc != "" && vars.pcat != "" && vars.pdiscount != ""){
      let userdata = new FormData();
      userdata.append('pname', vars.pname);
      userdata.append('pprice', vars.pprice);
      userdata.append('pquant', vars.pquant);
      userdata.append('pdesc', vars.pdesc);
      userdata.append('pcat', vars.pcat);
      userdata.append('pdiscount', vars.pdiscount);
      userdata.append('pid', id);
      userdata.append('pimage', image ? image : "");
      // console.log(userdata);
      // try{
        axios.post("http://127.0.0.1:8000/api/update_product", userdata, { headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },}).then((response)=>{
          // if(response.data.status===true){
            console.log(response);
                navigate("/dashboard/view_products");
           
        }) 
    }

  }


  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/get_categories").then((response)=>{
      // console.log(response);
      let arrPro = response.data.allcat;
      setCategory(arrPro);
  })
  },[updateCat])
  // const getTotal = useRef(null);
  
  const [total, setTotal] = useState(0);

  const [cats, setCat] = useState({
    cname: "",
    cdesc: ""
  })

  const addCat = (e)=>{
    e.preventDefault();
    let userdata = {
      name: cats.cname,
      description: cats.cdesc
    };
    if(cats.cname != "" && cats.cdesc){
      axios.post("http://127.0.0.1:8000/api/add_category", userdata).then((response)=>{
        // console.log(response);
        setUpdateCat(!updateCat);
        setCatModal(false);
      })
    }
    else{

    }
    
  }
  const changeField = (e) =>{
    if(e.target.name==="pcat" && e.target.value==="new"){
      setCatModal(true);
    }
    else{
      setVar({...vars, [e.target.name]:e.target.value });
      
    }
    
  }



  useEffect(()=>{
    if(!isNaN(vars.pprice) && !isNaN(vars.pquant)){
      setTotal(Number(vars.pprice)* Number(vars.pquant));
    }
  },[vars.pprice, vars.pquant])
  const changeCatValue = (e)=>{
    setCat({...cats, [e.target.name]: e.target.value})
  }
  return (
    id===null ? <Navigate to="/dashboard/view_products"/> : vars.pcat === "" ? <Loader type={'three'}/> : <><div>
    <div className='w-100'>
    <div onClick={()=>setCatModal(false)} className={`${catmodal==false? 'hidden': "block"} w-screen top-0 left-0 fixed h-screen z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}></div>

      {/* Category modal */}
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={` ${catmodal === false ? 'hidden': "block"} overflow-y-auto overflow-x-hidden left-[-0.5%] fixed md:top-[20%] md:left-[35%] md:translate-x-[0%] md:translate-y-[0%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add a Category
                </h3>
                <button onClick={()=>{setCatModal(false)}} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span  className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" onSubmit={(e)=>addCat(e)}>
                    <div>
                        <label htmlFor="cname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                        <input value={cats.cname} onChange={(e)=>changeCatValue(e)} type="text" name="cname" id="cname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="cdesc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Description</label>
                        <textarea value={cats.cdesc} onChange={(e)=>changeCatValue(e)} type="text" name="cdesc" id="cdesc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                  
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            </div>
        </div>
    </div>
</div> 

    <form className="w-full max-w-xxl" onSubmit={(e)=>{submitProduct(e)}}>
      <p className='text-xl font-bold mb-5'>Edit Product</p>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Product Name
      </label>
      <input  value={vars.pname || ""} name='pname' onChange={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Mobile" />
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Product Price
      </label>
      <input  value={vars.pprice || ""} name='pprice' onChange={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" />
    </div>
    <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Product Quantity
      </label>
      <input  value={vars.pquant || ""} name='pquant' onChange={(e)=>{changeField(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6 md:w-100">
    <div className="w- full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Description
      </label>
      <textarea name='pdesc' value={vars.pdesc || ""} onChange={(e)=>{changeField(e)}} rows={5} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
       Upload Image
      </label>
      <input type="file" name='pimage' onInput={(e)=>{changeImage(e)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
      <img className={`${vars.pimage != "" ?"w-12" : "w-32"} h-12 mt-4`} src={`{http://127.0.0.1:8000/images/${vars.pimage}`} alt="No image available" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Total
      </label>
      <input name="ptotal" value={total || ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" readOnly/>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        Category
      </label>
      <div className="relative">
        <select  value={vars.pcat || ""} onChange={(e)=>{changeField(e)}} name='pcat' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" required>
          <option value="" disabled>Select</option>
          <option className='text-[red]' value="new">New Category</option>
          {
              category.map((cat, index)=>{
                return (
                  <option key={index} value={cat['id']}>{cat['name']}</option>
                );
              })
          }
          {/* <option value={1}>Cat 1</option>
          <option value={2}>Cat 2</option>
          <option value={3}>Cat 3</option> */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Discount Offered(in %)
      </label>
      <input  value={vars.pdiscount || ""} onChange={(e)=>{changeField(e)}} name='pdiscount' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="9" />
    </div>
    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-8'>
      <button type='submit' className='border border-black bg-[#14B8A6] hover:opacity-[0.8] hover:transition-all text-white px-8 py-2'>Update</button>
    </div>
  </div>
</form>
    </div>
    </div>
    </>
  )
}

export default EditProduct
