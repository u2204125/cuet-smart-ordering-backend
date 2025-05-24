const User = require('../models/User');

// POST /api/users/register
// Expects: { email, role, displayName, ... }
exports.registerUser = async (req, res) => {
  try {
    const { email, role, displayName } = req.body;
    if (!email || !role) {
      return res.status(400).json({ message: 'email and role are required.' });
    }
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    user = new User({ email, role, displayName });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/users/:email
// Retrieves user data by email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: 'email parameter is required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
