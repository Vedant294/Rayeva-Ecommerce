const mongoose = require('mongoose');

const b2bProposalSchema = new mongoose.Schema({
  businessType: { type: String, required: true },
  budget: { type: Number, required: true },
  sustainabilityGoal: { type: String, required: true },
  recommendedProducts: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String },
    quantity: { type: Number },
    estimatedCost: { type: Number }
  }],
  budgetAllocation: { type: Object },
  impactPositioning: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('B2BProposal', b2bProposalSchema);
