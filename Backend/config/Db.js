import mongoose from "mongoose";

export const connectDB = async () =>{
    // # -> %23 
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected "));
}