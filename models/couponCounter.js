import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  index: { type: Number, default: 0 }, // Tracks which coupon to assign next
});

export default mongoose.model("CouponCounter", counterSchema);
