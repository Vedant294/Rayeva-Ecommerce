require('dotenv').config();
const mongoose = require('mongoose');
const dbService = require('./services/dbService');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing products first
    await dbService.Product.deleteMany({});
    console.log('Cleared existing products');
    
    await dbService.seedDatabase();
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
