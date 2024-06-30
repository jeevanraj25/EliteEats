import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
      
    const [currState,setCurrState] =useState("Login");
    const {url,token,setToken} = useContext(StoreContext); 



    const [data,setData] =useState({
      name:"",
      email:"",
      password:""
    });


    const onchangeHandler = (event) =>{
       const name = event.target.name;
       const value =event.target.value;

       setData(data => ({...data,[name]:value}));
    }

   //   useEffect(() =>{
   //     console.log(data);
   //   },[data])

   const onlogin = async (event) =>{
      
      event.preventDefault();
      let newUrl = url;
      if(currState === "Login"){
         newUrl += "/api/user/login";
      }else{
         newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false);
      }else{
         alert(response.data.msg);
      }
   }

  return (
    <div className='login-popup'>
       <form onSubmit={onlogin} action="" className="login-popup-container">
         <div className="login-popup-title">
             <h2>{currState}</h2>
             <img onClick={() =>setShowLogin(false)} src={assets.cross_icon} alt="" />
         </div>
         <div className="login-popup-inputs">
            {currState === "Login" ?<></> : <input name="name" type="text" onChange={onchangeHandler}  value={data.name} placeholder='Your name' required/>}
         
            <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Your email' required/>
            <input name='password' onChange={onchangeHandler} value={data.password} type="password" placeholder='password' required/>
         </div>
         <button type='submit'>{currState === "Sign Up" ? "create account" : "Login"}</button>
         <div className="login-popup-condition">
            <input type="checkbox"  required/>
            <p>by continuing, i agree to the terms of use & privary policy. </p>
         </div>
         {
            currState === "Login" ? 
            <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p> :
            <p>Already have an account ? <span onClick={() => setCurrState("Login")} >Login here</span></p>
         }  
       </form>
    </div>
  )
}

export default LoginPopup