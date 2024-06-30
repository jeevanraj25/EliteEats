import mongoose from "mongoose";

export const connectDB = async () =>{
    // # -> %23 
    await mongoose.connect('mongodb+srv://jeevanraj:%235GiYCKa%23nHL6yG@cluster0.3usrw2t.mongodb.net/food-del')
    .then(() => console.log("DB connected "));
}