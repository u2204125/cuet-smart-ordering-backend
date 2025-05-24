// Middleware for authentication (Firebase token verification)
module.exports = function (req, res, next) {
  // For now, mock user for testing (replace with real Firebase verification in production)
  // Example: req.user = { uid: 'admin-uid', role: 'admin' };
  if (req.headers['x-mock-user']) {
    try {
      req.user = JSON.parse(req.headers['x-mock-user']);
    } catch {
      return res.status(400).json({ message: 'Invalid mock user header' });
    }
  }
  next();
};
