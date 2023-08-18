import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import productRouter from "./routers/products.js";
import paymentRouter from "./routers/payments.js";
import mongoose from "mongoose";
import cors from "cors";

const port = process.env.PORT || 4500;
const connectDb = async () => {
  await mongoose.connect(process.env.CONNECT_TO_DB);
  console.log("Connected to MongoDb");
};

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/payment", paymentRouter);

// error handling middleware
app.use((err, req, resp, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";

  return resp.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(port, async () => {
  await connectDb();

  console.log("Connected to backeend");
});
