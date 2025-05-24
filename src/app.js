// Entry point for the backend Express app
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/auth', authRoutes); // Auth endpoints
app.use('/api/users', userRoutes); // User info endpoints
app.use('/api/vendor', vendorRoutes); // Vendor CRUD endpoints
app.use('/api/payment', paymentRoutes); // Payment processing endpoints

app.get('/', (req, res) => {
  res.send('Smart Campus Ordering System Backend');
});

module.exports = app;
