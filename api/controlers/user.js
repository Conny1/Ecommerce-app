import User from "../models/user.js"
import Product from "../models/products.js"
import { createError } from "../utils/error.js"


export const addTocart= async(req,resp,next)=>{
    const userid = req.params.userid
    const prodid = req.params.prodid
    try {
        const user = await User.findById(userid)
        const search =  user.cartProduct.filter((item)=>{
            return item === prodid
        })
        
        if(search.length > 0) return next(createError(402, "Item exists in cart"))
        const result = await User.findByIdAndUpdate(userid, { $addToSet:{cartProduct:prodid}}, {new:true})
        const product = await Product.findByIdAndUpdate(prodid, { $inc:{quantity:-1}})
        resp.status(200).json(result)
    } catch (error) {
        next(error)
    }

}

export const removeFromcart= async(req,resp,next)=>{
    const userid = req.params.userid
    const prodid = req.params.prodid
    try {
        const result = await User.findByIdAndUpdate(userid, { $pull:{cartProduct:prodid}}, {new:true})
        const product = await Product.findByIdAndUpdate(prodid, { $inc:{quantity:1}, incart:false}, {new:true})
        resp.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const getcart= async(req,resp,next)=>{
    const userid = req.params.userid
    try {
        const result = await User.findById(userid)

        const crtproduct = await Promise.all(
            result.cartProduct.map((item)=>{
                return Product.findById(item)
            })
        )
        resp.status(200).json(crtproduct)
    } catch (error) {
        next(error)
    }
}


// wishlist
export const addTowist= async(req,resp,next)=>{
    const userid = req.params.userid
    const prodid = req.params.prodid
    try {
        const user = await User.findById(userid)
        const search =  user.wishList.filter((item)=>{
            return item === prodid
        })
        
        if(search.length > 0) return next(createError(402, "Item exists in wish list"))
        const result = await User.findByIdAndUpdate(userid, { $addToSet:{wishList:prodid}}, {new:true})
        resp.status(200).json(result)
    } catch (error) {
        next(error)
    }

}

export const removeFromwish= async(req,resp,next)=>{
    const userid = req.params.userid
    const prodid = req.params.prodid
    try {
        const result = await User.findByIdAndUpdate(userid, { $pull:{wishList:prodid}}, {new:true})
        resp.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const getwish= async(req,resp,next)=>{
    const userid = req.params.userid
    try {
        const result = await User.findById(userid)

        const wish = await Promise.all(
            result.wishList.map((item)=>{
                return Product.findById(item)
            })
        )
        resp.status(200).json(wish)
    } catch (error) {
        next(error)
    }
}