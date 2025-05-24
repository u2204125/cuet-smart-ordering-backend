require('dotenv').config();

// MongoDB, Firebase Admin, and SSLCommerz config placeholder
module.exports = {
  mongoURI: `mongodb+srv://gulliboy:${encodeURIComponent(process.env.MONGO_PASS)}@cuet-smart-ordering.antz86j.mongodb.net/?retryWrites=true&w=majority&appName=cuet-smart-ordering`,
  // firebaseAdminConfig: {...},
  // sslCommerz: {...}
};
