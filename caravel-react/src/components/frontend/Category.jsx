import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Product_card from './product_card';
import Loader from './Loader';

const Category = ({term, stopSearching}) => {
  const [sortItem, setSortItem] = useState("");
  const [term1,setTerm] = useState(term);
  const [newPro, setNewPro] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortbtn, setSortBtn] = useState(false);
  const [priceBtn, setPriceBtn] = useState(false);
  const [discountbtn, setDiscountBtm] = useState(false);
  const [datebtn, setDateBtn] = useState(false);
  const [loader, setLoader] = useState(true);
  const [catOption, setCatOption] = useState(null);
  const [priceOption, setPriceOption] = useState([["0", "0"]]);
  const [discountOption, setDiscountOption] = useState([['0', '0']]);
  const [dateOption, setDateOption] = useState([[null]]);
  const changeDate = (e) => {
    if(e.target.checked === true){
      let arr = e.target.value;
      let dateOption1 = [...dateOption];
      dateOption1.push([arr]);
      setDateOption(()=>dateOption1);
    }
    else if(e.target.checked === false){
      
      let arr = e.target.value;
      let dateOption1 = dateOption.filter((p)=>{
        return p[0] != arr;
      })
      
      setDateOption(dateOption1);
    }
  }

  const sortItems = (e) =>{
    setSortItem(e.target.dataset.sort);
    setSortBtn(false);
  }

  const changePrice = (e) => {
    if(e.target.checked === true){
      let arr = e.target.value.split(",");
      let priceOption1 = [...priceOption];
      priceOption1.push(arr);
      setPriceOption(()=>priceOption1);
    }
    else if(e.target.checked === false){
      // let index = priceOption.indexOf(e.target.value);
      let arr = e.target.value.split(",");
      let priceOption1 = priceOption.filter((p)=>{
        return p[1] != arr[1];
      })
      // let priceOption1 = priceOption.splice(index, 1);
      setPriceOption(priceOption1);
    }
  }
  const changeDiscount = (e) => {
    if(e.target.checked === true){
      let arr = e.target.value.split(",");
      let discountOption1 = [...discountOption];
      discountOption1.push(arr);
      setDiscountOption(()=>discountOption1);
    }
    else if(e.target.checked === false){
      // let index = priceOption.indexOf(e.target.value);
      let arr = e.target.value.split(",");
      let discountOption1 = discountOption.filter((p)=>{
        return p[1] != arr[1];
      })
      // let priceOption1 = priceOption.splice(index, 1);
      setDiscountOption(discountOption1);
    }
  }
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/get_categories").then((response)=>{
      let arrPro = response.data.allcat;
      setCategory(arrPro);
  })
  },[])
  const getNewProducts = async() =>{
    axios.get("http://127.0.0.1:8000/api/get_products").then((response)=>{
      setNewPro(response.data.arr);
    })
  }
  useEffect(()=>{
    getNewProducts();
  },[])

  useEffect(()=>{
    if(term1 === ""){
      axios.post("http://127.0.0.1:8000/api/get_filter_products", {catid: catOption, price: priceOption.length>0 ? priceOption: null, discount: discountOption, date: dateOption, sortItem: sortItem}).then((response)=>{
        setNewPro(response.data.result);
        setLoader(false);
      })
    }
    else{
      axios.post("http://127.0.0.1:8000/api/get_searched_product", {term: term1}).then((response)=>{
        setNewPro(response.data.products);
        setTerm("");
        // setLoader(false);
      })
    }
  
  }, [catOption,priceOption.length, discountOption.length, dateOption.length, term, sortItem])
  return (
    <div>
    
<div className="bg-white">
  <div>
    
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
     
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>

      <div className="fixed inset-0 z-40 flex">
       
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

         
        </div>
      </div>
    </div>

    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Filtered Products</h1>

        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <div>
              <button onClick={()=>{setSortBtn(!sortbtn)}} type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                Sort
                <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

           
            <div className={`${sortbtn === true ? "block": "hidden"} absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
               
                <a data-sort="asc" onClick={(e)=>sortItems(e)} href="#" className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Ascending</a>
                <a data-sort="desc" onClick={(e)=>sortItems(e)} href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Descending</a>
                <a data-sort="newest" onClick={(e)=>sortItems(e)} href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Newest</a>
                <a data-sort="oldest" onClick={(e)=>sortItems(e)} href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Oldest</a>

              </div>
            </div>
          </div>

          <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
            <span className="sr-only">View grid</span>
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <span className="sr-only">Filters</span>
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <h2 id="products-heading" className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
              {
                category.map((cat)=>{
                  return  <li>
                    <p className={`${catOption==cat.id ? "text-blue-600": ""} cursor-pointer`} data-id={cat.id} onClick={(e)=>{setCatOption(e.target.dataset.id);}} href="#">{cat.name}</p>
                    </li>;
                })
              }
             
            </ul>

            <div className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                  <span className="font-medium text-gray-900">Price</span>
                  <span className="ml-6 flex items-center">
                    <svg onClick={()=>setPriceBtn(true)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <svg onClick={()=>setPriceBtn(false)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div className={`${priceBtn === true ? "block": "hidden"} pt-6`} id="filter-section-0">
                <div className="space-y-4" onChange={(e)=> changePrice(e)}>

                  <div className="flex items-center">
                    <input  id="filter-color-0" name="color[]" value="10,100" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">10-100</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-1" name="color[]" value="100,500" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">100-500</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-2" name="color[]" value="500,1000" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">500-1000</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-3" name="color[]" value="1000,5000" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">1000-5000</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-4" name="color[]" value="5000,25000" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">5000-25000</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-5" name="color[]" value="25000,200000" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">25000-more</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                  <span className="font-medium text-gray-900">Discount</span>
                  <span className="ml-6 flex items-center">
                    <svg onClick={()=>setDiscountBtm(true)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <svg onClick={()=>setDiscountBtm(false)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div className={`${discountbtn === true ? "block": "hidden"} pt-6`} id="filter-section-1">
                <div className="space-y-4" onChange={(e)=>changeDiscount(e)}>
                  <div className="flex items-center">
                    <input id="filter-category-0" name="category[]" value="0,2" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-category-0" className="ml-3 text-sm text-gray-600">0-2</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-category-1" name="category[]" value="2,6" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-category-1" className="ml-3 text-sm text-gray-600">2-6</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-category-2" name="category[]" value="6,10" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-category-2" className="ml-3 text-sm text-gray-600">6-10</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-category-3" name="category[]" value="10,25" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-category-3" className="ml-3 text-sm text-gray-600">10-25</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-category-4" name="category[]" value="25,100" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-category-4" className="ml-3 text-sm text-gray-600">25-more</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false">
                  <span className="font-medium text-gray-900">Added Date</span>
                  <span className="ml-6 flex items-center">
                    <svg onClick={()=>setDateBtn(true)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <svg onClick={()=>setDateBtn(false)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div className={`${datebtn === true ? "block": "hidden"} pt-6`} id="filter-section-2">
                <div className="space-y-4" onChange={(e)=>changeDate(e)}>
                  <div className="flex items-center">
                    <input id="filter-size-0" name="size[]" value={0} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-size-0" className="ml-3 text-sm text-gray-600">today</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-size-1" name="size[]" value={1} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-size-1" className="ml-3 text-sm text-gray-600">one day ago</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-size-2" name="size[]" value={7} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-size-2" className="ml-3 text-sm text-gray-600">1 week ago</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-size-3" name="size[]" value={30} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-size-3" className="ml-3 text-sm text-gray-600">1 month ago</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-size-4" name="size[]" value={180} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-size-4" className="ml-3 text-sm text-gray-600">6 months ago</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-size-5" name="size[]" value={365} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-size-5" className="ml-3 text-sm text-gray-600">1 year ago</label>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="lg:col-span-3">
          <div className='flex items-center justify-center my-8 text-2xl'>{term1!= "" && term1!= null? <p>Searched Results for {term}</p>: <p> Filters Products</p>}</div>
          
            {/* starts */}
            {
              newPro.length===0 ? <div className='text-2xl flex items-center justify-center'>No results Found</div> :
                // 
            <div className='flex items-center justify-center w-[100%]'>
           
        <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center xl:grid-cols-2 mt-10 w-[78%] sm:w-[85%] m-auto lg:w-[90%] place-items-center'>
          {
            newPro.length > 0 ? newPro.map(({id, category_id, created_at, description, discount_id, image, name, price, cat_name})=>{
                  return <Product_card cat_name={cat_name} key={id} id={id} category_id={category_id} date={created_at} description={description} discount_id={discount_id} image={image} name={name} price={price}/>
            }) : "no product found"
          }
            
    
        </div>
        </div>
}
            {/* your content */}
          </div>
        </div>
      </section>
    </main>
  </div>
</div>

    </div>
  )
}

export default Category
