const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pickup', pickupSchema);