import express from "express"
import cors from "cors"
import {connectDB} from "./config/Db.js"
import foodRouter  from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRoter from "./routes/orderRoute.js";


//app config
const app =express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());


//DB Conn
connectDB();



// api endpoint

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRoter);



app.get("/" ,(req,res) =>{
    res.send("API running");
});


app.listen(port,() =>{
    console.log(`server is running on http://localhost:${port}`);
})

