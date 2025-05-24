// MenuItem schema for MongoDB
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  foodImage: { type: String, required: true }, // URL to the item's picture
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  foodQuantity: { type: Number, required: true },
  Description: { type: String },
  additionalNotes: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
