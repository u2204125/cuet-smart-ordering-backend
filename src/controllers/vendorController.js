const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { itemPicUrl, itemName, quantity, price, category } = req.body;
    const vendorId = req.user && req.user.uid;
    if (!itemPicUrl || !itemName || !quantity || !price || !category || !vendorId) {
      return res.status(400).json({ message: 'itemPicUrl, itemName, quantity, price, category, and vendorId are required.' });
    }
    const menuItem = new MenuItem({ itemPicUrl, itemName, quantity, price, category, vendorId });
    await menuItem.save();
    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all menu items for a vendor
exports.getVendorMenuItems = async (req, res) => {
  try {
    const vendorId = req.user && req.user.uid;
    const menuItems = await MenuItem.find({ vendorId }).populate('category');
    res.status(200).json({ menuItems });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.user && req.user.uid;
    const update = { ...req.body, updatedAt: Date.now() };
    const menuItem = await MenuItem.findOneAndUpdate({ _id: id, vendorId }, update, { new: true });
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found or not authorized.' });
    }
    res.status(200).json({ message: 'Menu item updated successfully', menuItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.user && req.user.uid;
    const menuItem = await MenuItem.findOneAndDelete({ _id: id, vendorId });
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found or not authorized.' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
