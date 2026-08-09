const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  location: { type: String, required: true },
  service: {
    id: String,
    title: String,
    price: Number
  },
  items: [{
    id: String,
    name: String,
    qty: Number
  }],
  selectedDate: { type: String, required: true },
  notes: { type: String },
  donor: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    flat: String,
    address: { type: String, required: true },
    city: String,
    pincode: String,
    mobile: { type: String, required: true }
  },
  finalPrice: { type: Number },
  orderRef: { type: String },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pickup', pickupSchema);