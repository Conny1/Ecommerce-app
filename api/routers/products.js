import express from "express";
import { addProduct, deleteProduct, getallOnCartegory, getallProduct, getProduct, searchProduct, updateProduct } from "../controlers/products.js";
import { removeFromcart } from "../controlers/user.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router()

// add
router.post("/", verifyAdmin, addProduct )

// update
router.put("/:prodid", verifyAdmin,  updateProduct)

// delete
router.delete("/:prodid", verifyAdmin,  deleteProduct)


// get one
router.get("/:prodid", getProduct )

// getall
router.get("/find/all", getallProduct )

// search
router.get("/search/find", searchProduct )
// get by category
router.get("/category/:category", getallOnCartegory )







export default router