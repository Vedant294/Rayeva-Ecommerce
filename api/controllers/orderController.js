const dbService = require('../services/dbService');
const { generateImpactReport } = require('../ai-services/impactReporter');

async function createOrder(req, res) {
  try {
    const { products, totalAmount, customerInfo } = req.body;
    
    const order = await dbService.Order.create({
      products,
      totalAmount,
      customerInfo
    });

    const impactData = {
      products: products.map(p => ({
        productId: p.productId,
        quantity: p.quantity
      })),
      totalAmount
    };

    const impactReport = await generateImpactReport(impactData);
    
    const savedImpactReport = await dbService.ImpactReport.create({
      orderId: order._id,
      ...impactReport
    });

    order.impactReportId = savedImpactReport._id;
    await order.save();

    res.status(201).json({ order, impactReport: savedImpactReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await dbService.Order.find().populate('impactReportId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createOrder, getOrders };
