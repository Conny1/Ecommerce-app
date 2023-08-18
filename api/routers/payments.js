import express from "express";
import { getmpesaToken } from "../controlers/payment.js";

const router = express.Router();

router.get("/mpesaToken", getmpesaToken);

export default router;
