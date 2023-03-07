import express from "express";
import { addTocart, addTowist, getcart, getwish, removeFromcart, removeFromwish } from "../controlers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router()

// getcart
router.get("/cart/:userid", verifyUser,  getcart)

// add to cart
router.put("/addcart/:userid/:prodid",  verifyUser, addTocart)

// remove from cart
router.put("/removecart/:userid/:prodid" , verifyUser, removeFromcart)

// getWishlist
router.get("/wishlist/:userid", verifyUser, getwish)

// add to wishlist
router.put("/wishlist/:userid/:prodid",verifyUser,  addTowist)

// remove from wishlist
router.put("/removewishlist/:userid/:prodid", verifyUser, removeFromwish)


export default router