const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

// Controller placeholder for student actions
exports.placeOrder = (req, res) => {
  // TODO: Implement order placement logic
  res.send('Place order endpoint');
};

exports.getOrderHistory = (req, res) => {
  // TODO: Implement order history logic
  res.send('Order history endpoint');
};

// Get all menu items (for students, with filters)
exports.getAllMenuItems = async (req, res) => {
  try {
    const { vendorId, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (vendorId) filter.vendorId = vendorId;
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    const menuItems = await MenuItem.find(filter).populate('category');
    res.status(200).json({ menuItems });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Student purchases one or multiple items (creates an order)
exports.purchaseItems = async (req, res) => {
  // TODO: Implement order creation logic
  res.status(201).json({ message: 'Order placed successfully (mock)' });
};
