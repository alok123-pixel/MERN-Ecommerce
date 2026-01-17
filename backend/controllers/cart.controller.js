// add product to user cart

import User from "../models/user.model.js"

const addToCart = async(req,res)=>{
   
    try {
       
        const{userId, itemId, size} = req.body

        const userData = await User.findById(userId);
        const cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
      
        await User.findByIdAndUpdate(userId,{cartData})

        res.json({suceess:true,message:'Added to cart'})
        
    } catch (error) {
         console.log(error)
         res.json({success:false,message:error.message}) 
    }


}


// Update cart

const upDateCart = async(req,res)=>{
   
   try {
     
    const {userId, itemId, size, quantity} = req.body
    const userData = await User.findById(userId)
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity

    await User.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:'Cart Updated'})


   } catch (error) {
     
    console.log(error)
    res.json({success:false,message:error.message})
   }

}


// get user Cart

const getUserCart = async(req,res)=>{
  
    try {
        
    const {userId} = req.body
    const userData = await User.findById(userId)
    const cartData = await userData.cartData;

    res.json({success:true,cartData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {addToCart,upDateCart,getUserCart}
