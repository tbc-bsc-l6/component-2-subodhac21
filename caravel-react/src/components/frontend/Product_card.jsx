import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { add_cart, add_message } from '../../auth/productSlice';
import { add_cart_item } from '../../auth/productSlice';
import Loader from './Loader';


const Product_card = (props) => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userLogin = useSelector((state)=>{
    return state.authReducer.signin[0];
  })
  const mess = useSelector((state)=>{
    return state.productReducer.message;
  })
  let cartToken = localStorage.getItem('cartItem');
  const addToCart = (e) =>{
    e.preventDefault();
    // setLoading(true);
    // dispatch(add_message({mess: "adding"}));
    if(userLogin.fullname != ""){
        axios.post("http://127.0.0.1:8000/api/add_product_to_cart_named", {pro_id: props.id, quantity: 1, cust_id: userLogin.id, add: "one"}).then((response)=>{
          if(response.data.repeat == true){
            // setLoading(false);
            dispatch(add_message({mess: "already_success"}));
          }
          else{
            // setLoading(false);
            dispatch(add_cart({'items': 1}));
            props.cartCount(1);
            dispatch(add_cart_item({'items':[response.data.result[0]], 'cart': [response.data.cart_pr[0]], 'category': [response.data.cart_pr[0]]}));
            // nav("/cartpage");
            dispatch(add_message({mess: "added_success"}));

          }
        })
    }
    else{
        axios.post("http://127.0.0.1:8000/api/add_product_to_cart_nameless", {pro_id: props.id, quantity: 1, token: cartToken, add: "one"}).then((response)=>{
          if(response.data.repeat == true){
            // setLoading(false);
            dispatch(add_message({mess: "added_success"}));


          }
          else{
            dispatch(add_message({mess: "added_success"}));
            // setLoading(false);
            let token = response.data.token;
            localStorage.setItem('cartItem', token);
            dispatch(add_cart({'items': 1}));
            // dispatch(add_cart_item({'items':[response.data.result[0]]}));
            dispatch(add_cart_item({'items':[response.data.result[0]], 'cart': [response.data.cart_pr[0]], 'category': [response.data.cart_pr[0]]}));
          }
            // setUserInfo();
            // nav("/cartpage");
        })
    }

}
  return (
   <>
    <div className='w-[250px] mb-12'>
      <div className="group relative block overflow-hidden">
  <button
    className="absolute end-4 top-4 z-10 rounded-full bg-white p-1 text-gray-900 transition hover:text-gray-900/75"
  >
    <span className="sr-only">Wishlist</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  </button>

  <Link to={`/product_detail/${props.id}`} ><img
    src={props.image.includes("https") ? `${props.image}` : `http://127.0.0.1:8000/images/${props.image}`}
    alt=""
    className="h-[164px] w-[256px] object-cover transition duration-500 group-hover:scale-105 sm:h-50"
  /></Link>

  <div className="relative border border-gray-100 bg-white p-6">
    <span
      className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"
    >
      New
    </span>
    <span
      className="whitespace-nowrap bg-blue-400 px-3 py-1.5 text-xs font-medium float-right"
    >
      {props.cat_name}
    </span>

    <h3 className="mt-4 text-lg font-medium text-gray-900">{props.name}</h3>

    <p className="mt-1.5 text-sm text-gray-700">Rs: {props.price} /-</p>

    <form className="mt-4">
      <button onClick={(e)=>addToCart(e)}
        className="block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105"
      >
        Add to Cart
      </button>
    </form>
  </div>
</div>

    </div>
    </>
  )
}

export default Product_card
