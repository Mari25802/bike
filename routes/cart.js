const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Cart = require("../models/Cart"); // add this
const ObjectId = mongoose.Types.ObjectId;


router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all cart items for this user and populate bike details
    const cartItems = await Cart.find({ userId }).populate('bikeId');

    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { bikeId } = req.body;
  const userId = req.user.id;

  if (!bikeId) return res.status(400).json({ message: "Bike ID required" });

  try {
    const newCartItem = new Cart({
      userId:new ObjectId(userId),
      bikeId: new ObjectId(bikeId),
    });
    await newCartItem.save();
    res.status(201).json({ message: "Bike added to cart" });
  } catch (err) {
    console.error("Error saving cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
