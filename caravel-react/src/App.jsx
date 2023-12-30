import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from "./routes/Home";
import ContactUs from "./routes/ContactUs";
// import Cart from "./routes/Cart";
import UserProfile from "./routes/UserProfile";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { loginUser } from './auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import  axios  from 'axios';
import AboutUs from './routes/AboutUs';
import FPass from './routes/FPass';
import Loader from './components/frontend/Loader';
import PageNotFound from './routes/PageNotFound';
import Dashboard from './routes/Dashboard';
import AdminPage from './components/Admin/AdminPage';
import Products from './components/Admin/Products';
import AdminLoginpage from './components/Admin/AdminLoginpage';
import ViewProduct from './components/Admin/ViewProduct';
import EditProduct from './components/Admin/EditProduct';
import Product_detail from './components/frontend/Product_detail';
import Detail from './routes/Detail';
import CartPage from './routes/CartPage';
import Layout from './routes/Layout';
import OrderPage from './components/frontend/OrderPage';
import Categories from './routes/Categories';
import Users from './components/Admin/Users';
import Add_user from './components/Admin/add_user';
import Edit_user from './components/Admin/Edit_user';


const App = () => {
 
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  // console.log(isLogin);
  let tokenInfilestorage = localStorage.getItem("loginItem");
  const loginData = useSelector((state)=>{
    return state.authReducer.signin[0];
  })
  
  useEffect(()=>{
    if(tokenInfilestorage != ""){
  let url = "http://127.0.0.1:8000/api/authme";
      let token = tokenInfilestorage;
      let userData= {
        "token": token
      };
      try{
        const data = axios.post(url, userData, { headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },}).then((response) => {
          // console.log(response.data.user[0].fullname);
          if(response.data.status==='true'){
            if(response.data.type==='customer'){
              dispatch(loginUser({id: response.data.id, fullname: response.data.fullname, email: response.data.email, token: token, image: response.data.image, type: "customer"}));
              setIsLogin(true); 
            }
            else if(response.data.type==='admin' || response.data.type === "superadmin")
              dispatch(loginUser({id: response.data.id, fullname: response.data.fullname, email: response.data.email, token: token, image: response.data.image, type: "admin"}));
          }
          setLoading(false);
          
        }); 

      }catch(e){

        console.log(e);
      }
    
    }
      else{
        dispatch(loginUser({fullname: "", email: "", token: "", image: "", type: ""}));
        setLoading(false);
        setIsLogin(false); 

    
      }
  },[]);
  return (
    <>
    {
      loading === true ? <Loader/> :
    <Routes>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/> }/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        {/* <Route path='/products' element={<Products/>}/> */}

        <Route path='/signup' element={<SignUp/>} />
        <Route path='/cartpage' element={<CartPage/>} />

        {/* <Route path='/cart' element={<Cart/>}/> */}
        <Route path='/signin' element={<SignIn isLogin={isLogin}/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>

        <Route path='/user-profile' element={<UserProfile/>}></Route>
        <Route path='/fpass' element={<FPass/>}></Route>
        <Route path='/product_detail/:id' element={<Detail/>}></Route>
        <Route path='/orderpage/:id' element={<OrderPage/>}/>
        <Route path='/categories' element={<Categories/>}/>
      </Route>
     

      <Route path='/dashboard' element={<Dashboard/>}>
        <Route index element={<AdminPage/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='view_products' element={<ViewProduct/>}/>
        <Route path='edit_product/:id' element={<EditProduct/>}/>
        <Route path='users' element={<Users/>}/>
        <Route path='add_user' element={<Add_user/>}/>
        <Route path='edit_user/:id' element={<Edit_user/>}/>

      </Route>
      <Route path='adminloginpage' element={<AdminLoginpage/>}/>
    </Routes>
}
    
    </>
  )
}

export default App;