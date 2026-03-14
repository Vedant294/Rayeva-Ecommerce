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

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://rayeva-ved3.vercel.app',
        /https:\/\/(.+)\.vercel\.app$/  // Allow all Vercel preview/prod domains
      ]
    : 'http://localhost:3000'
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Rayeva AI Sustainable Commerce Platform API', status: 'ok' });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/b2b', b2bRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

let dbConnected = false;

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

// Export for Vercel serverless function
module.exports = async (req, res) => {
  try {
    await connectDB();
    app(req, res);
  } catch (error) {
    console.error('Request error:', error);
    res.status(500).json({ error: error.message });
  }
};
