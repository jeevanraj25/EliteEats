import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updatestatus, userOrders, verifyOrder } from "../controllers/orderController.js";


const orderRoter =express.Router();

orderRoter.post("/place",authMiddleware,placeOrder);
orderRoter.post("/verify",verifyOrder);
orderRoter.post("/userorders",authMiddleware,userOrders);
orderRoter.get("/list",listOrders);
orderRoter.post("/status",updatestatus)


export  default orderRoter;