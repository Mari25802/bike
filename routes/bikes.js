const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

// POST: Add a new bike
router.post('/', async (req, res) => {
  try {
    const newBike = new Bike(req.body);
    const savedBike = await newBike.save();
    res.status(201).json({ message: "Bike added successfully", bike: savedBike });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add bike", error: err.message });
  }
});

// GET: Fetch all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bikes", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.json(bike);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
