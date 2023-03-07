import User from "../models/user.js"
import bcrypt from "bcryptjs"
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken";




export const signup= async (req,resp,next)=>{
    const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const data = new User({
            name:req.body.name,
            email:req.body.email,
            password:hash
        })
        const user = await data.save()
        const tokens = jwt.sign({id:user.id, isAdmin:user.isAdmin},process.env.TOKEN_KEY ) 
        const { password, ...others } = user._doc
        resp.status(200).json({...others , tokens})
      
    } catch (error) {
        next(error)
    }
}
export const login= async (req,resp,next)=>{
    try {
        
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError(401, "User does Not exist"))
        const isCorrect = bcrypt.compareSync(req.body.password, user.password); // true or false
        if(!isCorrect) return next(createError(401,"Invalid email or password" ))
        const tokens = jwt.sign({id:user.id, isAdmin:user.isAdmin}, process.env.TOKEN_KEY ) 
        const { password, ...others } = user._doc
        resp.status(200).json({...others , tokens})
        
 
    } catch (error) {
        next(error)
    }
}

export const google= async(req,resp,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const tokens = jwt.sign({id:user.id, isAdmin:user.isAdmin},process.env.TOKEN_KEY ) 
            const { password, ...others } = user._doc
            resp.status(200).json({...others, tokens})
        }else{
            const data = new User({...req.body, googleAuth:true})
            const results = await data.save()
            const tokens = jwt.sign({id:results.id, isAdmin:results.isAdmin},process.env.TOKEN_KEY ) 
            const { password, ...others } = results._doc
            resp.status(200).json({...others, tokens})
        }
        
    } catch (error) {
        next(error)
        
    }
}