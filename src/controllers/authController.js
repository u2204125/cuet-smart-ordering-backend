const User = require('../models/User');

// POST /api/users/register
// Expects: { uid, email, role, displayName, ... }
exports.registerUser = async (req, res) => {
  try {
    const { uid, email, role, displayName } = req.body;
    if (!uid || !email || !role) {
      return res.status(400).json({ message: 'uid, email, and role are required.' });
    }
    // Check if user already exists
    let user = await User.findOne({ uid });
    if (user) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    user = new User({ uid, email, role, displayName });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/users/:uid
// Retrieves user data by Firebase UID
exports.getUserByUid = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(400).json({ message: 'uid parameter is required.' });
    }
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
