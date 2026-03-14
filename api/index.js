require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const b2bRoutes = require('./routes/b2bRoutes');
const impactRoutes = require('./routes/impactRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? /https:\/\/(.+)\.vercel\.app$/  // Allow all Vercel domains dynamically
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Database connection flag
let dbConnected = false;

// Database connection logic
async function connectDB() {
  if (!dbConnected && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      });
      dbConnected = true;
      console.log('Connected to MongoDB');
      try {
        const { seedDatabase } = require('./services/dbService');
        await seedDatabase();
      } catch (seedErr) {
        console.log('Seed completed or already exists:', seedErr.message);
      }
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      dbConnected = false;
    }
  }
}

// Connection middleware - runs on every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Rayeva AI Sustainable Commerce Platform API', status: 'ok' });
});

// API Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/b2b', b2bRoutes);
app.use('/impact', impactRoutes);
app.use('/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless function
module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    app(req, res, () => resolve());
  });
};
