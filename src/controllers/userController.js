// Importing the User model
const User = require('../models/User');

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

// GET /api/users
// Flexible: students see all vendors, admin sees all users, vendors see none
exports.getAllUsers = async (req, res) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized: No user info.' });
    }
    let users;
    if (req.user.role === 'admin') {
      users = await User.find();
    } else if (req.user.role === 'student') {
      users = await User.find({ role: 'vendor' });
    } else {
      // Vendors and others cannot fetch all users
      return res.status(403).json({ message: 'Forbidden: You are not allowed to view users.' });
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};