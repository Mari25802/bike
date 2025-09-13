const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
    price: { type: String, required: true },
  condition: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bike', bikeSchema);
