import validator from 'validator'
import  User  from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const createToken = (id)=>{
    return  jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
 // checking user
    if(!user){
        res.json({success:false,message:'user does not exist'})
    }
// matching userpassword with saved password
  const isMatch = await bcrypt.compare(password,user.password);
  if(isMatch){
    const token = createToken(user._id)
    res.json({success:true,token})
  }else{
    res.json({success:false,message:'Invalid credentials'})
  }

  } catch (error) {
    console.log(error)
    res.json({suceess:false,message:'Something went wrong'})
  }

  
}

// Route for user Register

const registerUser = async(req,res)=>{
   try {
    const{name,email,password} = req.body;

    //checking user exist or not
    const exists = await User.findOne({email})
    if(exists){
        return res.json({success:false,message:'User already exist'})
    }

    // validating email and password

    if(!validator.isEmail(email)){
        return res.json({success:false,message:'Please enter a valid email'})
    }
    if(password.length < 8){
        return res.json({success:false,message:'Please enter atleast 8 digit in password '})
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
        name,
        email,
        password:hashPassword
    })

    const user = await newUser.save()// storing in database

    const token = createToken(user._id)

    res.json({success:true,token})

   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
   }
}

// Route for admin login

const adminLogin = async(req,res)=>{
   try {
    
   const {email,password} = req.body
   if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true,token})
   }else{
    res.json({success:false,message:"Invalid credentials"})
   }

   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }  
}

export {loginUser,registerUser,adminLogin}