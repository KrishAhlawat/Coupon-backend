import express from "express";
import Coupon from "../models/coupon.js";
import CouponCounter from "../models/couponCounter.js";
import crypto from "crypto";

const router = express.Router();

// Middleware to get user's IP
const getClientIP = (req) => {
  return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
};

// Middleware to get or set a session cookie
const getSessionID = (req, res) => {
  let sessionID = req.cookies.sessionID;

  if (!sessionID) {
    sessionID = crypto.randomBytes(16).toString("hex");
    res.cookie("sessionID", sessionID, { maxAge: 3600000, httpOnly: true }); // 1 hour
  }

  return sessionID;
};

router.post("/claim", async (req, res) => {
  try {
    const userIP = getClientIP(req);
    const sessionID = getSessionID(req, res);

    // Check if this IP or session has already claimed a coupon in the last hour
    const lastClaim = await Coupon.findOne({
      $or: [{ claimedByIP: userIP }, { claimedBySession: sessionID }],
      claimedAt: { $gt: new Date(Date.now() - 3600000) }, // 1 hour ago
    });

    if (lastClaim) {
      const timeLeft = Math.ceil(
        (lastClaim.claimedAt.getTime() + 3600000 - Date.now()) / 60000
      );
      return res.status(403).json({
        message: `You can claim another coupon in ${timeLeft} minutes.`,
      });
    }

    // Get the coupon counter
    let counter = await CouponCounter.findOne({ name: "couponCounter" });

    if (!counter) {
      return res.status(500).json({ message: "Counter not initialized" });
    }

    // Get all available coupons
    const coupons = await Coupon.find({ isClaimed: false });

    if (coupons.length === 0) {
      return res.status(400).json({ message: "No more coupons available!" });
    }

    // Select next coupon using round-robin
    const nextCoupon = coupons[counter.index % coupons.length];

    if (!nextCoupon) {
      return res.status(400).json({ message: "No valid coupon found!" });
    }
  } catch (error) {
    console.error(error);
  }
});
