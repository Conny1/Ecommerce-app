import { createError } from "./error.js"
import jwt  from "jsonwebtoken"

export  const verifyToken =(req,resp,next)=>{
    const authToken = req.headers.authorization
    if(!authToken) return next( createError(401,"TOKEN REQUIRED" ) )
    const token = authToken.split(" ")[1]
    // console.log(token)
    jwt.verify(token, process.env.TOKEN_KEY, (err, user)=>{
        if(err) return next(createError(401, "INVALID TOKEN"))
        req.user = user
        next()
    })
}

export const verifyUser = (req,resp,next)=>{
    verifyToken(req,resp,()=>{
        
        if( req.user.id === req.params.userid || req.user.isAdmin ){
            next()
        }else{
            return next(createError(401, "Not authorised to do this action"))
        }
    })
}

export const verifyAdmin = (req,resp,next)=>{
    
    verifyToken(req,resp,()=>{
    
        if( req.user.isAdmin ){
            next()
        }else{
            return next(createError(401, "Not authorised to do this action"))
        }
    })
}