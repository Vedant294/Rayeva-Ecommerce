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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Rayeva AI Sustainable Commerce Platform API' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/b2b', b2bRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

const { connectDB, seedDatabase } = require('./services/dbService');

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
  })
  .then(() => {
    console.log('Database seeding completed');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Connection/seed error:', err);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
