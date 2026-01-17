import jwt from 'jsonwebtoken'

const authUser = async(req,res,next)=>{
   
    const{token} = req.headers;
    if(!token){
        return res.json({success:false,message:'Login again'})
    }

try {
      // verifying the user, user has token or not 
  const token_decode = jwt.verify(token,process.env.JWT_SECRET)// decoding the user token
  req.body.userId = token_decode.id
  next()

} catch (error) {
    console.log(error) 
    res.json({success:false,message:error.message})
 }
}

export default authUser;