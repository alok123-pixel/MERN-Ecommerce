import express from 'express'
import { addToCart,getUserCart,upDateCart } from '../controllers/cart.controller.js'
import authUser from '../middleware/auth.middleware.js'

const CartRouter = express.Router()

CartRouter.post('/get',authUser,getUserCart)
CartRouter.post('/add',authUser,addToCart)
CartRouter.post('/update',authUser,upDateCart)

export default CartRouter;