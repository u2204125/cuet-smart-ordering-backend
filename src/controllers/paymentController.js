// Controller placeholder for payment actions
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.initiatePayment = (req, res) => {
  // TODO: Implement payment initiation logic
  res.send('Initiate payment endpoint');
};

exports.paymentCallback = (req, res) => {
  // TODO: Implement payment callback logic
  res.send('Payment callback endpoint');
};

// Payment success callback
exports.paymentSuccess = async (req, res) => {
  try {
    const { tran_id } = req.body; // orderId
    // Find the order
    const order = await Order.findById(tran_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Mark order as Pending and Paid
    order.status = 'Pending';
    order.paymentStatus = 'Paid';
    await order.save();
    // Decrease quantity for each menu item
    for (const item of order.items) {
      await MenuItem.findByIdAndUpdate(item.menuItemId, { $inc: { foodQuantity: -item.quantity } });
    }
    res.redirect('/payment-success'); // Or send a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Payment success handling failed', error: err.message });
  }
};

// Payment failure callback
exports.paymentFail = async (req, res) => {
  try {
    const { tran_id } = req.body;
    await Order.findByIdAndUpdate(tran_id, { status: 'Failed', paymentStatus: 'Failed' });
    res.redirect('/payment-fail'); // Or send a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Payment fail handling failed', error: err.message });
  }
};
