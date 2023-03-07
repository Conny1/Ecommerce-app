import express from "express";
import { google, login, signup } from "../controlers/auth.js";


const router = express.Router()

router.post("/login", login)

router.post("/signup", signup)

router.post("/google", google)


export default router