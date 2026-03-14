const dbService = require('../services/dbService');
const { generateB2BProposal } = require('../ai-services/b2bProposalGenerator');

async function createB2BProposal(req, res) {
  try {
    const { businessType, budget, sustainabilityGoal } = req.body;
    
    const proposalData = await generateB2BProposal(businessType, budget, sustainabilityGoal);
    
    const proposal = await dbService.B2BProposal.create({
      businessType,
      budget,
      sustainabilityGoal,
      ...proposalData
    });
    
    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getB2BProposals(req, res) {
  try {
    const proposals = await dbService.B2BProposal.find();
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createB2BProposal, getB2BProposals };
