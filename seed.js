import mongoose from "mongoose";
import dotenv from "dotenv";
import Coupon from "../backend/models/coupon.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedCoupons = async () => {
  await Coupon.deleteMany(); // Clear existing coupons

  const coupons = [
    { code: "COUPON1", discount: 10, expiryDate: new Date(2028, 2, 31) },
    { code: "COUPON2", discount: 12, expiryDate: new Date(2028, 4, 31) },
    { code: "COUPON3", discount: 15, expiryDate: new Date(2028, 6, 31) },
    { code: "COUPON4", discount: 20, expiryDate: new Date(2028, 2, 31) },
  ];

  await Coupon.insertMany(coupons);
  console.log("Coupons seeded!");
  process.exit();
};

seedCoupons();
