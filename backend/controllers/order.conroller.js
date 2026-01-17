import OrderModel from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from 'stripe'

// global variables
const currency = 'usd'
const deliveryCharge = 10


// Stripe gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Placing order using cash on delivery

const PlaceOrder = async(req,res)=>{
  
    try {
    
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }
     const newOrder = new OrderModel(orderData)
     await newOrder.save()

     await User.findByIdAndUpdate(userId,{cartData:{}})

     res.json({success:true,message:'Order Placed'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// placing order using stripe

const PlcaeOrderStripe = async(req,res)=>{
   try {
     
     const {userId, items, amount, address} = req.body;
     const {origin} = req.headers

     const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'Stripe',
            payment:false,
            date:Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
              price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge * 100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
              success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
              cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
              line_items,
              mode:'payment',      
        })

        res.json({success:true,session_url:session.url});
     
   } catch (error) {
       console.log(error);
       res.json({success:false,message:error.message})
   }


}

// verify Stipe

const verifyStripe = async(req,res)=>{
   const {orderId,success,userId} = req.body

   try {
      if(success == true){
        await OrderModel.findByIdAndUpdate(orderId,{payment:true});

        await User.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true})
      }else{
        await OrderModel.findByIdAndDelete(orderId)
        res.json({success:false})
      }
   } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
   }
}

// palcing order using razorpay

// const PlaceOerderRazorpay = async(req,res)=>{

// }

// All order for admin Panel

const AllOrder = async(req,res)=>{

    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,error:error.message})
    }

}

// User Order Data  for Frontend

const userOrder = async(req,res)=>{
   try {
     
    const{userId} = req.body

    const orders = await OrderModel.find({userId})
     res.json({success:true,orders})

   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

// update order status from Admin Panel

const updateStatus = async(req,res)=>{
    try {
        const{orderId,status} = req.body

        await OrderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
         console.log(error)
         res.json({success:false,message:error.message})
    }

}

export {verifyStripe,PlaceOrder,PlcaeOrderStripe,AllOrder,userOrder,updateStatus}

// 11:33:09