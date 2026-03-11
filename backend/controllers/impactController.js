const dbService = require('../services/dbService');

async function getImpactReports(req, res) {
  try {
    const reports = await dbService.ImpactReport.find().populate('orderId');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getImpactSummary(req, res) {
  try {
    const reports = await dbService.ImpactReport.find();
    
    const totalPlasticSaved = reports.reduce((sum, r) => sum + r.plasticSavedGrams, 0);
    const totalCarbonAvoided = reports.reduce((sum, r) => sum + r.carbonAvoidedKg, 0);
    
    res.json({
      totalPlasticSavedGrams: totalPlasticSaved,
      totalCarbonAvoidedKg: totalCarbonAvoided,
      totalReports: reports.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getImpactReports, getImpactSummary };
