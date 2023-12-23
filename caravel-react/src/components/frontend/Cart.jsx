import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_cart_item, delete_cart_item } from '../../auth/productSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CartProduct from './CartProduct';


function makeObjectsUnique(arr, property) {
  const uniqueValues = new Set();
  return arr.filter(obj => {
    if (!uniqueValues.has(obj[property])) {
      uniqueValues.add(obj[property]);
      return true;
    }
    return false;
  });
}

function setProductsForCart(newPro, cartPro, categories){
            let cartTotal = [];
            newPro.forEach((pro, i)=>{
                let id = pro['id'];
                let image = pro['image'];
                let quantity = cartPro[i]['quantity'];
                let temp_id = cartPro[i]['id'];
                let name = pro['name'];
                let description = pro['description'];
                let discount = pro['discount_id'];
                let price = pro['price'];
                let category_id = pro['category_id'];
                let catname = categories[i]['name']
                let proQuant = pro['quantity'];
                cartTotal.push({
                    id: id,
                    image: image,
                    quantity: quantity,
                    name: name,
                    description: description,
                    discount: discount,
                    price: price,
                    category_id: category_id,
                    catname: catname,
                    temp_id:temp_id,
                    proQuant: proQuant
                });                
            })
            let setArr = [...cartTotal]
            console.log(setArr);
            return setArr;
}

const Cart = () => {
  const [deleteStatus, setDeletedStatus] = useState("");
  // const [cartInfo, setCartInfo] = useState([]);\
  const [cartList, setCartList] = useState([]);
  const cartInfo = (quant, id) =>{
    // console.log(quant,id);
    let arr = [ {quant: quant, id: id}, ...cartList];
    setCartList((prev)=>makeObjectsUnique(arr, "id"));
  }

  // console.log(cartList);
  function setDeletedStatusFunc(){
    setDeletedStatus(true);
  }
  const location = useLocation();
  // console.log(location.state);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state)=>{
    return state.authReducer.signin[0];
})
const [products, setProducts] = useState([{}]);
const token = localStorage.getItem("cartItem");

useEffect(()=>{
  // if(cartItems.length > 0 && location.state != "redirect"){
  //   setProducts(cartItems);
  // }
  // else{
  
  if(userLogin.id != ""){
    axios.post("http://127.0.0.1:8000/api/products_from_cart_by_id", {id: userLogin.id}).then((response)=>{
      console.log(response);
      setDeletedStatus("");
      setProducts(setProductsForCart(response.data.product, response.data.cart_pr, response.data.category));
      // if(cartItems.length != response.data.product.length){
        // dispatch(add_cart_item({'items': response.data.product, 'cart': response.data.cart_pr, 'category': response.data.category}));
      // }
      // setProducts(response.data.product);
    })
  }
  else if(token != ""){
    axios.post("http://127.0.0.1:8000/api/products_from_cart_by_token", {token: token}).then((response)=>{
      console.log(response);
      setDeletedStatus("");
      setProducts(setProductsForCart(response.data.product, response.data.cart_pr, response.data.category));

      // console.log(response.data.product.length);
      // setProducts(response.data.product);
      // if(cartItems.length != response.data.product.length){
        // dispatch(add_cart_item({'items': response.data.product, 'cart': response.data.cart_pr, 'category': response.data.category}));
      // }

    })
  // }
}
},[deleteStatus])


const cartItems = useSelector((state)=>{
  return state.productReducer.cart_products;
})

let total = 0;

const goToCheckout = (e) =>{
  e.preventDefault();
  if(userLogin.id != ""){
    nav("/signin");
  }
  else{
    cartList.forEach(({quant, id})=>{
      console.log(quant,id);
      axios.put("http://127.0.0.1:8000/api/update_tempcart_by_id", {quant: quant, id: id}).then((response)=>{
        console.log(response);
      });
    })
  }
}



  return (
    <>
     <section className="items-center py-24 bg-gray-50 font-poppins dark:bg-gray-700">
<div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 lg:px-6">
<h2 className="mb-10 text-4xl font-bold text-center dark:text-gray-400">Your Cart</h2>
<div className="px-6 mb-10 lg:px-0">

  {products.map((product)=>{
  total += product.price * product.quantity;
  // setCartInfo([...cartInfo, {id: product.temp_id, quant: product.quantity}]);
      return (
             <CartProduct cartInfo={cartInfo} proQuant={product.proQuant} status={setDeletedStatusFunc} category={product.catname} quantity={product.quantity} id={product.id} image={product.image} name={product.name} description={product.description} price={product.price} temp_id={product.temp_id} />
      );
  })}
</div>
<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs. {total}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link onClick={(e)=>goToCheckout(e)} className="md:w-[20%] w-[50%] flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
              </div>
              </div>
</div>
</section>
    </>
  )
}

export default Cart
