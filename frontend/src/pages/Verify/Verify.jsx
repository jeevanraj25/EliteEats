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
        try{
            const response = await axios.post(url+"/api/order/verify",{success,orderId});
            if(response.data.success){
                navigate("/myorders");
            }else{
                navigate("/home");
            }
        }catch(error){
            console.log(error);
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