import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  isClaimed: { type: Boolean, default: false },
  claimedByIP: { type: String, default: null }, // Stores IP
  claimedBySession: { type: String, default: null }, // Stores cookie session ID
  claimedAt: { type: Date, default: null },
});

export default mongoose.model("Coupon", couponSchema);
