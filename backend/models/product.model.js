import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
     sizes:{
        type:Array,
        required:true
    },
    bestSeller:{
        type:Boolean
    },
    date:{
        type:Number,
        required:true
    }

},
{
    timestamps:true
}
)

export const ProductModel = mongoose.models.ProductModel|| mongoose.model('ProductModel',productSchema)// for multiple models

// 5:40:54