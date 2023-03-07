import Products from "../models/products.js"
import { createError } from "../utils/error.js"
import User from "../models/user.js"

// add
export const addProduct = async (req,resp,next)=>{
    try {
        const data = new Products({...req.body})
        const results = await data.save()
        resp.status(200).json(results)        
    } catch (error) {
        next(error)
    }
}
// update
export const updateProduct = async (req,resp,next)=>{
    const id = req.params.prodid
    try {
        const results = await Products.findByIdAndUpdate(id, { $set:req.body },{new:true})
        resp.status(200).json(results)           
    } catch (error) {
        next(error)
    }
}

// delete
export const deleteProduct = async (req,resp,next)=>{
    const id = req.params.prodid
    try {
        const results = await Products.findByIdAndDelete(id)
      
        
        resp.status(200).json(results)           
    } catch (error) {
        next(error)
    }
}

// get one
export const getProduct = async (req,resp,next)=>{
    const id = req.params.prodid
    try {
        const results = await Products.findById(id)
        resp.status(200).json(results)           
    } catch (error) {
        next(error)
    }
}

// getall
export const getallProduct = async (req,resp,next)=>{

    try {
        const results = await Products.find()
        resp.status(200).json(results)           
    } catch (error) {
        next(error)
    }
}

// search
export const searchProduct = async (req,resp,next)=>{
    const query = req.query.name
    try {
        const results = await Products.find({title:{$regex:query,  $options:"i"} } ).limit(40)
        resp.status(200).json(results)           
    } catch (error) {
        next(error)
    }
}

// get cartegory
export const getallOnCartegory = async (req,resp,next)=>{

    try {
        const results = await Products.find({category:req.params.category})
        resp.status(200).json(results)           
    } catch (error) {
        next(error)
    }
}



