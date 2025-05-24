const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false;

// Service for SSLCommerz integration
module.exports = {
  initiatePayment: async ({ orderId, amount, userId, vendorId }) => {
    const data = {
      total_amount: amount,
      currency: 'BDT',
      tran_id: orderId.toString(),
      success_url: `${process.env.BASE_URL}/api/payment/success`,
      fail_url: `${process.env.BASE_URL}/api/payment/fail`,
      cancel_url: `${process.env.BASE_URL}/api/payment/cancel`,
      ipn_url: `${process.env.BASE_URL}/api/payment/ipn`,
      cus_name: userId,
      cus_email: 'customer@email.com',
      cus_add1: 'CUET',
      cus_city: 'Chittagong',
      cus_country: 'Bangladesh',
      cus_phone: '01700000000',
      shipping_method: 'NO',
      product_name: 'Food Order',
      product_category: 'Food',
      product_profile: 'general',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    return { GatewayPageURL: apiResponse.GatewayPageURL };
  },
  handleCallback: async (data) => {
    // TODO: Handle payment callback
    return { status: 'success' };
  },
};
