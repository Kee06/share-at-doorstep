const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);