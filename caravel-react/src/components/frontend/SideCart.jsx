import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { add_cart_item, delete_cart_item } from '../../auth/productSlice';

const SideCart = ({setsidebar, status}) => {
  const nav = useNavigate();  
  const dispatch = useDispatch();
    function changeSidebarstatus(){
        setsidebar();
    }

    const userLogin = useSelector((state)=>{
        return state.authReducer.signin[0];
    })
    const [products, setProducts] = useState([{}]);
    const token = localStorage.getItem("cartItem");
    const cartItems = useSelector((state)=>{
      return state.productReducer.cart_products;
    })
 
    useEffect(()=>{
      if(cartItems.length > 0){
        setProducts(cartItems);
      }
      
        if(userLogin.id != ""){
          axios.post("http://127.0.0.1:8000/api/products_from_cart_by_id", {id: userLogin.id}).then((response)=>{
            // setProducts(response.data.product);
            if(cartItems.length != response.data.product.length){
              dispatch(add_cart_item({'items': response.data.product, 'cart': response.data.cart_pr, 'category': response.data.category}));
            }
          })
        }
        else{
          axios.post("http://127.0.0.1:8000/api/products_from_cart_by_token", {token: token}).then((response)=>{
            // setProducts(response.data.product);
            if(cartItems.length != response.data.product.length){
              dispatch(add_cart_item({'items':response.data.product, 'cart': response.data.cart_pr, 'category': response.data.category}));
            }
          })
        
      }
     
    },[])

    const remove_item = (e) =>{
      let id = e.target.dataset.id;
      if(userLogin.id != ""){
        dispatch(delete_cart_item({'id': id}));
      axios.delete("http://127.0.0.1:8000/api/delete_cart_pro_byuser/"+id).then((response)=>{
          if(response.data.status = true){
          }
      })
      }
      else{
        dispatch(delete_cart_item({'id': id}));
      axios.delete("http://127.0.0.1:8000/api/delete_products_from_token/"+id).then((response)=>{
      if(response.data.status = true){

        }
      })
      }

    }
    const goToCheckout = (e) =>{
      e.preventDefault();
      if(userLogin.id === ""){
        nav("/signin");
      }
    }
let total = 0;

  return (
    <div>
      <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button onClick={()=>changeSidebarstatus()} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                   { cartItems.map((pro)=>{
                    total += pro.price;
                    return (
                        <li key={pro.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src={pro.image.includes("https") ? pro.image : `http://127.0.0.1:8000/images/${pro.image}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                        </div>
  
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{pro.name}</a>
                              </h3>
                              <p className="ml-4">{pro.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{pro.catname
                            }</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {pro.quantity}</p>
  
                            <div className="flex">
                           <button data-id={pro.temp_id} onClick={(e)=> remove_item(e)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                   })
                   
                  }
                    
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs. {total}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              {/* <div className="mt-6">
                <Link onClick={(e)=>{goToCheckout(e);
                changeSidebarstatus();
                }} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
              </div> */}
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                 
                  <Link onClick={()=>changeSidebarstatus()} to="/cartpage" type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Go to Cart Page
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default SideCart
