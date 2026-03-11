const Product = require('../models/Product');
const Order = require('../models/Order');
const B2BProposal = require('../models/B2BProposal');
const ImpactReport = require('../models/ImpactReport');
const AILog = require('../models/AILog');

const seedData = [
  {
    name: 'Bamboo Toothbrush',
    description: 'Eco-friendly bamboo toothbrush with biodegradable handle and soft bristles. Sustainable oral care for a plastic-free future.',
    price: 8.99,
    category: 'Personal Care',
    subcategory: 'Oral Hygiene',
    tags: ['bamboo toothbrush', 'eco friendly', 'plastic free', 'biodegradable', 'sustainable', 'organic'],
    sustainabilityFilters: { plasticFree: true, compostable: true, vegan: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/113ef8f95-00c1-4547-92ea-fc33a8be035c8901.png'
  },
  {
    name: 'Reusable Cotton Tote Bag',
    description: 'Organic cotton reusable shopping bag, durable and washable. Perfect for groceries and daily errands while reducing plastic waste.',
    price: 15.99,
    category: 'Accessories',
    subcategory: 'Shopping Bags',
    tags: ['reusable bag', 'organic cotton', 'eco friendly', 'sustainable shopping', 'canvas bag'],
    sustainabilityFilters: { recycled: true, vegan: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/113ef8f95-00c1-4547-92ea-fc33a8be035c9217.png'
  },
  {
    name: 'Compostable Food Containers',
    description: 'Plant-based compostable food storage containers, microwave safe. Sustainable alternative to plastic containers.',
    price: 24.99,
    category: 'Kitchen',
    subcategory: 'Food Storage',
    tags: ['compostable', 'plant based', 'food storage', 'eco friendly', 'biodegradable', 'bpa free'],
    sustainabilityFilters: { compostable: true, plasticFree: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/013ef8f95-00c1-4547-92ea-fc33a8be035c9340.png'
  },
  {
    name: 'Recycled Notebook',
    description: 'Notebook made from 100% recycled paper with soy-based ink. Perfect for notes, journaling, and sketching.',
    price: 12.99,
    category: 'Stationery',
    subcategory: 'Notebooks',
    tags: ['recycled paper', 'soy ink', 'eco friendly notebook', 'sustainable stationery', 'journal'],
    sustainabilityFilters: { recycled: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/313ef8f95-00c1-4547-92ea-fc33a8be035c7437.png'
  },
  {
    name: 'Ceramic Coffee Mug',
    description: 'Handcrafted ceramic coffee mug, dishwasher and microwave safe. Sustainable alternative to disposable cups.',
    price: 18.99,
    category: 'Kitchen',
    subcategory: 'Drinkware',
    tags: ['ceramic mug', 'handmade', 'sustainable drinkware', 'reusable', 'eco friendly'],
    sustainabilityFilters: { recycled: true, plasticFree: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/913ef8f95-00c1-4547-92ea-fc33a8be035c8147.png'
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'GOTS certified organic cotton t-shirt, breathable and durable. Sustainable fashion without compromising quality.',
    price: 29.99,
    category: 'Apparel',
    subcategory: 'T-Shirts',
    tags: ['organic cotton', 'gots certified', 'sustainable fashion', 'breathable', 'soft'],
    sustainabilityFilters: { vegan: true, recycled: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/113ef8f95-00c1-4547-92ea-fc33a8be035c1597.png'
  },
  {
    name: 'Solar Powered Charger',
    description: 'Portable solar powered phone charger, eco-friendly energy solution for outdoor activities.',
    price: 49.99,
    category: 'Electronics',
    subcategory: 'Chargers',
    tags: ['solar charger', 'renewable energy', 'portable', 'eco friendly', 'sustainable tech'],
    sustainabilityFilters: { recycled: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/513ef8f95-00c1-4547-92ea-fc33a8be035c7870.png'
  },
  {
    name: 'Bamboo Cutting Board',
    description: 'Sustainable bamboo cutting board, naturally antibacterial and durable. Kitchen essential for eco-conscious cooks.',
    price: 22.99,
    category: 'Kitchen',
    subcategory: 'Cookware',
    tags: ['bamboo cutting board', 'sustainable kitchen', 'antibacterial', 'durable', 'eco friendly'],
    sustainabilityFilters: { compostable: true, plasticFree: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/313ef8f95-00c1-4547-92ea-fc33a8be035c8872.png'
  },
  {
    name: 'Hemp Rope Basket',
    description: 'Handwoven hemp rope basket, durable and naturally antimicrobial. Perfect for storage and organization.',
    price: 34.99,
    category: 'Home Decor',
    subcategory: 'Storage',
    tags: ['hemp basket', 'handwoven', 'natural fiber', 'sustainable home', 'eco friendly'],
    sustainabilityFilters: { compostable: true, vegan: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/813ef8f95-00c1-4547-92ea-fc33a8be035c4041.png'
  },
  {
    name: 'Beeswax Food Wraps',
    description: 'Reusable beeswax food wraps, natural alternative to plastic wrap for food storage.',
    price: 14.99,
    category: 'Kitchen',
    subcategory: 'Food Storage',
    tags: ['beeswax wraps', 'reusable', 'natural wax', 'eco friendly', 'food wrap'],
    sustainabilityFilters: { compostable: true, plasticFree: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/313ef8f95-00c1-4547-92ea-fc33a8be035c9610.png'
  },
  {
    name: 'Recycled Glass Bottle',
    description: 'Hand-blown recycled glass water bottle, sustainable and stylish. Keeps drinks cold for 24 hours.',
    price: 27.99,
    category: 'Drinkware',
    subcategory: 'Bottles',
    tags: ['recycled glass', 'hand-blown', 'water bottle', 'eco friendly', 'sustainable'],
    sustainabilityFilters: { recycled: true, plasticFree: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/213ef8f95-00c1-4547-92ea-fc33a8be035c9005.png'
  },
  {
    name: 'Wooden Hair Brush',
    description: 'Sustainable wooden hair brush with natural boar bristles. Plastic-free hair care solution.',
    price: 16.99,
    category: 'Personal Care',
    subcategory: 'Hair Care',
    tags: ['wooden brush', 'boar bristles', 'plastic free', 'sustainable hair care', 'natural'],
    sustainabilityFilters: { compostable: true, vegan: true },
    imageUrl: 'https://image.qwenlm.ai/public_source/de887bbf-173d-4cdd-8767-6642a0199eec/813ef8f95-00c1-4547-92ea-fc33a8be035c6605.png'
  }
];

async function seedDatabase() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(seedData);
    console.log('Database seeded with sample products');
  }
}

module.exports = {
  Product,
  Order,
  B2BProposal,
  ImpactReport,
  AILog,
  seedDatabase
};
