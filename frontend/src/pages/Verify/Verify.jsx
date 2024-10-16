import React, { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success =searchParams.get("success");
    const orderId =searchParams.get("orderId");
    const {url} =useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifypayment = async () =>{
        console.log(url);
        try{
            const response = await axios.post(`${url}/api/order/verify`,{success,orderId});
            // console.log(response.data);
            if(response.data.success){
                navigate("/myorders");
            }else{
                navigate("/home");
            }
        }catch(error){
            console.log(error);
            alert("error")
        }
        
    }
     
    useEffect(()=>{
        verifypayment();
    },[])

  return (
    <div className='verify'>
          <div className='spinner'>

          </div>
    </div>
  )
}

export default Verify