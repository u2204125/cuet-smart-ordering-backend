const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const Order = require('../models/Order');
const sslCommerzService = require('../services/sslCommerzService');

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

// Student purchases one or multiple items (creates an order and initiates payment)
exports.purchaseItems = async (req, res) => {
  try {
    const { items, vendorId } = req.body;
    const userId = req.user && req.user.uid;
    if (!items || !Array.isArray(items) || items.length === 0 || !vendorId || !userId) {
      return res.status(400).json({ message: 'items (array), vendorId, and userId are required.' });
    }
    // Calculate total price
    let totalAmount = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
      }
      totalAmount += menuItem.price * item.quantity;
    }
    // Create order (status: Pending)
    const order = new Order({
      items,
      userId,
      vendorId,
      status: 'Pending',
      totalAmount
    });
    await order.save();
    // Initiate SSLCommerz payment
    const paymentData = await sslCommerzService.initiatePayment({
      orderId: order._id,
      amount: totalAmount,
      userId,
      vendorId
    });
    res.status(201).json({
      message: 'Order created, payment initiated',
      orderId: order._id,
      paymentUrl: paymentData.GatewayPageURL
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
