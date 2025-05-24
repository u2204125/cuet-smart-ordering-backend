// Service for SSLCommerz integration (placeholder)
module.exports = {
  initiatePayment: async (order) => {
    // TODO: Integrate with SSLCommerz API
    return { paymentUrl: 'https://sandbox.sslcommerz.com/payment' };
  },
  handleCallback: async (data) => {
    // TODO: Handle payment callback
    return { status: 'success' };
  },
};
