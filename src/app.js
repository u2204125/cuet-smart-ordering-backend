// Entry point for the backend Express app
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
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
const categoryRoutes = require('./routes/categoryRoutes');
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/auth', authRoutes); // Auth endpoints
app.use('/api/users', userRoutes); // User info endpoints
app.use('/api/vendor', vendorRoutes); // Vendor CRUD endpoints
app.use('/api/categories', categoryRoutes); // Category CRUD endpoints
app.use('/api/student', studentRoutes); // Student CRUD endpoints

app.get('/', (req, res) => {
  res.send('Smart Campus Ordering System Backend');
});

module.exports = app;
