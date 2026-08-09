const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Clothes', 'Food', 'Toys', 'Books', 'Household', 'Other'],
    },
    description: { type: String, trim: true },
    images: [{ type: String }], // will hold image URLs later (Cloudinary/local)
    condition: {
      type: String,
      enum: ['New', 'Good', 'Fair', 'Used'],
      default: 'Good',
    },
    quantity: { type: Number, default: 1, min: 1 },
    status: {
      type: String,
      enum: ['Pending', 'Scheduled', 'Picked Up', 'Delivered'],
      default: 'Pending',
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // will connect once Member 1's User model exists
    },
  },
  { timestamps: true } // gives you createdAt & updatedAt automatically
);

module.exports = mongoose.model('Donation', donationSchema);