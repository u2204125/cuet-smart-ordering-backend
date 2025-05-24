// Order schema for MongoDB
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  vendorId: String,
  items: [
    {
      menuItemId: String,
      quantity: Number,
    },
  ],
  status: String, // Pending, Preparing, Ready, Shipped
  paymentStatus: String, // Pending, Paid
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
