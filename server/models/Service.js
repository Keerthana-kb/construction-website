const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
  category: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Service', ServiceSchema);