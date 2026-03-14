const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const b2bRoutes = require('./routes/b2bRoutes');
const impactRoutes = require('./routes/impactRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Rayeva AI Sustainable Commerce Platform API' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/b2b', b2bRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/ai', aiRoutes);

let dbConnected = false;

async function connectDB() {
  if (!dbConnected && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      dbConnected = true;
      console.log('Connected to MongoDB');
      const { seedDatabase } = require('./services/dbService');
      await seedDatabase();
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
}

module.exports = async (req, res) => {
  await connectDB();
  return new Promise((resolve, reject) => {
    app(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve();
      }
    });
  });
};
