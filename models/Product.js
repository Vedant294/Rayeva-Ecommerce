const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  tags: [{ type: String }],
  sustainabilityFilters: {
    plasticFree: { type: Boolean, default: false },
    compostable: { type: Boolean, default: false },
    recycled: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false }
  },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
