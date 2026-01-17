import express from 'express'
import { PlaceOrder,PlcaeOrderStripe,AllOrder,userOrder,updateStatus, verifyStripe } from '../controllers/order.conroller.js';
import adminAuth from '../middleware/adminauth.middleware.js';
import authUser from '../middleware/auth.middleware.js';

const orderRouter = express.Router();

// Admin Features

orderRouter.post('/list',adminAuth,AllOrder)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Feature

orderRouter.post('/place',authUser,PlaceOrder)
orderRouter.post('/stripe',authUser,PlcaeOrderStripe)

// User Feature 

orderRouter.post('/userorders',authUser,userOrder)

// verify Payment

orderRouter.post('/verifyStripe',authUser,verifyStripe)


export default orderRouter

// 13:21:25  deploying