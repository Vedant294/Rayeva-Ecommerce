const dbService = require('../services/dbService');

async function getAllProducts(req, res) {
  try {
    const products = await dbService.Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await dbService.Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, category, subcategory, tags, sustainabilityFilters, imageUrl } = req.body;
    const product = await dbService.Product.create({
      name, description, price, category, subcategory, tags, sustainabilityFilters, imageUrl
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getAllProducts, getProductById, createProduct };
