import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { add_cart, add_cart_item, add_message } from '../../auth/productSlice';
import { useNavigate } from 'react-router-dom';

const Product_detail = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [singlePro, setSinglePro] = useState({});
    const [quant, setQuant] = useState(1);
    const [quantMess, setQuantMess] = useState("");
    const {id} = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [token1, setToken] = useState("0");

    const userLogin = useSelector((state)=>{
        return state.authReducer.signin[0];
    })
    console.log(userLogin);
    let cartToken = localStorage.getItem('cartItem');
    useEffect(()=>{
        setToken(cartToken);
    },[])
    useEffect(()=>{
        setUserInfo(userLogin);
    },[])
    const addToCart = (e) =>{
        // dispatch(add_message({mess: "adding"}));
        if(userLogin.fullname != ""){
            axios.post("http://127.0.0.1:8000/api/add_product_to_cart_named", {pro_id: id, quantity: quant, cust_id: userLogin.id, add: quant}).then((response)=>{
                // console.log(response);
                if(response.data.repeat == true){
                    // setLoading(false);
                    dispatch(add_message({mess: "added_success"}));
                  }
                  else{
                    // setLoading(false);
                    dispatch(add_cart({'items': 1}));
                    dispatch(add_cart_item({'items':[response.data.result[0]], 'cart': [response.data.cart_pr[0]], 'category': [response.data.cart_pr[0]]}));
                    nav("/cartpage", {state: "redirect"});
                    dispatch(add_message({mess: "added_success"}));
        
                  }
                })
                
        }
        else{
            axios.post("http://127.0.0.1:8000/api/add_product_to_cart_nameless", {pro_id: id, quantity: quant, token: token1, add: quant}).then((response)=>{
                // setUserInfo();
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
                    nav("/cartpage",{state: "redirect"});

                  }
            })
        }

    }
    const changeQuantPlus = (e) =>{
        if(singlePro.pquant > quant){
            setQuant(quant+1);
            setQuantMess("");
        }
        else{
            setQuantMess("dangermessage2");
        }
    }
    const changeQuantMinus = (e) =>{
        if(quant>1){
            setQuant(quant-1);
            setQuantMess("");
        }
        else{
            setQuantMess("dangermessage1");
        }
    }

    useEffect(()=>{
        // let isMounted = true;
        async function get_single_product_only(){
        //   if(id != null){
            try {
              const response = await axios.post("http://127.0.0.1:8000/api/get_single_product", { id: id, token: cartToken, loginid: userLogin.id }, { headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },});
            //   if (isMounted) {
                // Update state or refs only if the component is still mounted
                if(response.data.result == "token"){
                    setSinglePro({
                        pname: response.data.product.name,
                        pprice: response.data.product.price,
                        pquant: response.data.product.quantity,
                        pdesc: response.data.product.description,
                        pcat: response.data.category.name,
                        pdiscount: response.data.product.discount_id,
                        pimage: response.data.product.image,
                        pcartquant: response.data.cart_pr.quantity,
                        ptemp_id: response.data.cart_pr.id
                        
                      });
                      setQuant(response.data.cart_pr.quantity);
                }
                else if(response.data.result == "user_id"){
                    setSinglePro({
                        pname: response.data.product.name,
                        pprice: response.data.product.price,
                        pquant: response.data.product.quantity,
                        pdesc: response.data.product.description,
                        pcat: response.data.category.name,
                        pdiscount: response.data.product.discount_id,
                        pimage: response.data.product.image,
                        pcartquant: response.data.cart_pr.quantity,
                        ptemp_id: response.data.cart_pr.id
                      });
                      setQuant(response.data.cart_pr.quantity);

                }
                else{
                    setSinglePro({
                        pname: response.data.product.name,
                        pprice: response.data.product.price,
                        pquant: response.data.product.quantity,
                        pdesc: response.data.product.description,
                        pcat: response.data.category.name,
                        pdiscount: response.data.product.discount_id,
                        pimage: response.data.product.image,
                        pcartquant: 1,
                      });

                }
                
            //   }
            } catch (error) {
              console.error("Error fetching product details:", error);
              // Handle error if needed
            }
        //   }
  
        }
        // if(singlePro.id === undefined)
            get_single_product_only();
  
        // return ()=>{
        //   isMounted = false;
        // }
        
      }, [id]);

      console.log(singlePro);
  return (
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800 z-12">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 md:w-1/2 ">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                        <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                            <img src={`http://127.0.0.1:8000/images/${singlePro.pimage}`} alt=""
                                className="object-cover w-full lg:h-full "/>
                        </div>
                        <div className="flex-wrap hidden md:flex ">
                            <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src={`http://127.0.0.1:8000/images/${singlePro.pimage}`} alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div>
                            {/* <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div>
                            <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div>
                            <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                    <div className="lg:pl-20">
                        <div className="mb-8 ">
                            <span className="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>
                            <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                {singlePro.name}</h2>
                            <div className="flex items-center mb-6">
                                <ul className="flex mr-2">
                                    <li>
                                        <Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                                <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                            </div>
                            <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                {singlePro.pdesc}
                            </p>
                            <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                <span>{singlePro.pprice}</span>
                                <span
                                    className="text-base font-normal text-gray-500 line-through dark:text-gray-400">$1500.99</span>
                            </p>
                            <p className="text-green-600 dark:text-green-300 ">{singlePro.pquant} items in stock</p>
                        </div>
                        {/* <div className="flex items-center mb-8">
                            <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                                Colors:</h2>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                                    <div className="w-6 h-6 bg-cyan-300"></div>
                                </button>
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-green-300 "></div>
                                </button>
                                <button
                                    className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-red-200 "></div>
                                </button>
                            </div>
                        </div> */}
                        {/* <div className="flex items-center mb-8">
                            <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                Size:</h2>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                </button>
                            </div>
                        </div> */}
                        <div className="w-32 mb-8 ">
                            <label htmlFor=""
                                className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Quantity</label>
                            <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                <button onClick={(e)=>changeQuantMinus(e)}
                                    className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                    <span className="m-auto text-2xl font-thin">-</span>
                                </button>
                                <input type="number"
                                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                    placeholder={quant} />
                                <button onClick={(e)=>changeQuantPlus(e)}
                                    className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                    <span className="m-auto text-2xl font-thin">+</span>
                                </button>
                            </div>
                           
                        </div>
                        <div className={`${quantMess!="" ? "flex": "hidden"} items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium"></span> {`${quantMess === "dangermessage1" ? "Cart cannot contain less than 1 item" : "Cart cannot contain item more than in stock"}`}
                                </div>
                            </div>
                        <div className="flex flex-wrap items-center -mx-4 ">
                            <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                                <button onClick={(e)=>{addToCart(e)}}
                                    className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                    Add to Cart
                                </button>
                            </div>
                            <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                <button
                                    className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                    Add to wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Product_detail
