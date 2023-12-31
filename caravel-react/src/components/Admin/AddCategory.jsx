import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddCategory = () => {
    const nav = useNavigate();
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
            nav("/dashboard/categorylist");
          })
        }
        else{
    
        }
        
      }
      const changeCatValue = (e)=>{
        setCat({...cats, [e.target.name]: e.target.value})
      }
  return (
    <div>
       
      <form class="w-full max-w-sm">
      <div className="flex justify-center items-center mb-8 text-2xl">
            <h2>Add Category</h2>
        </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Category Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input value={cats.cname} onChange={(e)=>changeCatValue(e)} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" name='cname' />
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Category Description
      </label>
    </div>
    <div class="md:w-2/3">
      <textarea name='cdesc' value={cats.cdesc} onChange={(e)=>changeCatValue(e)} cols="30" rows="8" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" >
        </textarea>
    </div>
  </div>
  
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button onClick={(e)=>{addCat(e)}} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Add Category
      </button>
    </div>
  </div>
</form>
    </div>
  )
}

export default AddCategory
