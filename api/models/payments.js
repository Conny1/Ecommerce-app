import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  productId: {
    required: true,
    type: String,
  },
  paymentMethod: {
    required: true,
    type: String,
  },
  success: {
    required: true,
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("payments", paymentSchema);
