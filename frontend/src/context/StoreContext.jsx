import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
     
    const [cartItems,setCartItems] =useState({});
    const url = "http://localhost:3000";
    const [token,setToken] =useState("");
    const [food_list,setFoodList] =useState([]); 
    const [discount,setDiscount] = useState(false);


    const  addToCart = async (itemId) =>{
        if(!cartItems[itemId]){ // if the user adding firsttime we are creating it  
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }else{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    
    const removeFromCart =  async(itemId) =>{     // we are removing from the cart
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    
    const getTotalCartAmount = () =>{
        let totalAmount =0;

        for(const item in cartItems){
             
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                 totalAmount += itemInfo.price * cartItems[item]
            }
            
        }
      
        
    
        return totalAmount;
    }

    const getFinalAmount = (discount) => {
        let totalAmount = getTotalCartAmount();
        if(discount == true){
            let discountAmount = (totalAmount * 0.2);
        
            totalAmount -= discountAmount;
         }
       
        return  Math.round(totalAmount);
    };

     
    const fetchFoodList = async () => {
        const response  = await axios.get(url+"/api/food/list");
        //  console.log(response.data.data);
        setFoodList(response.data.data);

    }
     
    const loadCartData = async (token) => {
        const response  =await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

   
    useEffect(() =>{
        
        async function loadData() {
            await fetchFoodList();
            // console.log("hello");
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        } 
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        getFinalAmount,
        discount,
        setDiscount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
