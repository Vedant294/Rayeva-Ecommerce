const mongoose = require('mongoose');

const impactReportSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  plasticSavedGrams: { type: Number, required: true },
  carbonAvoidedKg: { type: Number, required: true },
  localSourcingImpact: { type: String },
  impactStatement: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ImpactReport', impactReportSchema);
