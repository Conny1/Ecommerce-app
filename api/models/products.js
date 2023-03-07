import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:"miscalenious"
    },
    imgUrl:{
        type:String,
    },
    newPrice:{
        type:Number,
        required:true
    },
    oldPrice:{
        type:Number,
    },
    quantity:{
        type:Number,
        default:1
    },
    
})


export default mongoose.model("products", productSchema)