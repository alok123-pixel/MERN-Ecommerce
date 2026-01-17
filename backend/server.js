import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connetCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import CartRouter from './routes/cart.route.js'
import orderRouter from './routes/order.route.js'


// App config
const app = express()
const port = process.env.PORT || 4000
connectDB();
connetCloudinary()

// middlewares
app.use(express.json())
app.use(cors())



// api endPoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',CartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('Server is ready');
})

app.listen(port,()=>{
    console.log('server is started in ' + port)
})

// 5:32:51