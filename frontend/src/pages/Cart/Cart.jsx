import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate} from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount,url,getFinalAmount,discount,setDiscount} = useContext(StoreContext);
  
   const [code,setCode]=useState("");
  const navigate = useNavigate();
  

  const addDiscount =() =>{
       if(code === "FREE20"){
            setDiscount(true);
       }
  }
  useEffect(() =>{
    addDiscount();
  },[code])
 
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qunatity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, i) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
         <div className="cart-total">
               <h2>Cart Totals</h2>
                <div>
                   <div className="cart-total-details">
                       <p>SubTotal</p>
                       <p>₹{getTotalCartAmount()}</p>
                   </div>
                   <hr />
                   <div className="cart-total-details">
                          <p>Delivery Fee</p>
                          <p>₹{getTotalCartAmount() ===0 ? 0 :50}</p>
                   </div>
                   <hr />
                   <div className="cart-total-details">
                        <b>Total</b>
                         <b>₹{getFinalAmount(discount)  ===0 ? 0 :getFinalAmount(discount) +50}</b>
                   </div>
                </div>
                <button onClick={() => navigate('/order')}>Proceed to check out</button>
         </div>
         <div className="cart-promocode">
         <div>
                <p>If u have Promocode ,Enter it here</p>
                 <div className="cart-promocode-input">
                    <input  value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="FREE20" />
                     <button type="sumbit">Submit</button>
                 </div>
            </div>
       
    
         </div>
      </div>
    </div>
  );
};

export default Cart;
