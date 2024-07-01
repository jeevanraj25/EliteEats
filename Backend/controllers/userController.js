import userModel from "../models/userModel.js";
import bcrypt from  "bcryptjs";
import jwt from "jsonwebtoken"
import validator from "validator"




//create token

const createToken = (id) =>{
    
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}



//login user

const loginUser = async (req,res) =>{
       
    const {email,password} = req.body;
    try {
        const user =await userModel.findOne({email});
        
        if(!user){
            return res.json({success:false,msg:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,msg:"password is in valid"});
        }
        
        const token =createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
           console.log(error);
           res.json({success:false,msg:"Error"});
    }
     
}


// Register user

const registerUser =async (req,res) => {
    
    const {name,email,password} =req.body;
    try {
        // checking if user already exits
        const exits = await userModel.findOne({email});
        if(exits){
            return res.json({success:false,msg:"user already exits"});
        }
         
        // validting email and password
        if(!validator.isEmail(email)){
            return res.json({success:false,msg:"Enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,msg:"Enter a strong password"});
        }

        const salt =await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
        });

        const user= await newUser.save();
        const token= createToken(user._id);
        res.json({success:true,token});
  
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"});
    }

}


export {loginUser,registerUser};