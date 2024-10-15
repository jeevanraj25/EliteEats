import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();

// console.log(process.env);
const apiKey = process.env.STRIPE_API_KEY;
// console.log(apiKey);


if (!apiKey) {
    console.error('Stripe API key is missing. Please check your .env file.');
    process.exit(1);
}



const stripe = new Stripe(apiKey);


// const stripe = new Stripe(process.env.STRIPE_API_KEY);


// placing an order for fronted
const placeOrder = async (req,res) =>{

    const fronted_url = "http://localhost:5173/"
    

  

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        
        const line_items =req.body.items.map((item) => ({
            price_data:{
                currency :"inr",
                product_data :{
                    name:item.name
                },
                unit_amount:item.price * 200
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency :"inr",
                product_data :{
                    name:"Delivary charges"
                },
                unit_amount:200 * 100
            },
            quantity:1
        })


        const session = await stripe.checkout.sessions.create({
             line_items:line_items,
             mode:"payment",
             success_url:`${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
             cancel_url:`${fronted_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        
        console.log(session);
        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"});
    }

}

const verifyOrder =async (req,res) =>{
      const {orderId,success} =req.body;
      try {
        
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,msg:"paid"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,msg:"un paid"});
        }
      } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"});
      }
}

// user orders
const userOrders = async (req,res) =>{
     try {
        const orders =await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
     } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"});
     }
}

// listing orders for admin 

const listOrders = async (req,res) =>{
    
    try {
        const orders =await orderModel.find({});
        // console.log(orders);
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"});
    }
}

// update status

const updatestatus = async (req,res) =>{
       
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,msg:"updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"});
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updatestatus};
