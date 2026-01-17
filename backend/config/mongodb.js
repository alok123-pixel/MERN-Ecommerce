import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.set('bufferCommands', false);
        mongoose.set('bufferMaxEntries', 0);
        mongoose.connection.on('connected',()=>{
            console.log('DB connection ho gaya');
        })
        mongoose.connection.on('error', (err) => {
            console.log('DB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('DB disconnected');
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
    } catch (error) {
        console.log('DB connection failed:', error)
        process.exit(1); // Exit if DB connection fails
    }
}

export default connectDB