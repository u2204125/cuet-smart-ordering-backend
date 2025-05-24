// User schema for MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  role: String, // 'student' or 'vendor'
  cuetEmailVerified: Boolean,
  vendorDetails: Object,
});

module.exports = mongoose.model('User', userSchema);
