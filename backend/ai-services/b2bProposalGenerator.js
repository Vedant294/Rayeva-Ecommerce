const { generateContent } = require('./geminiService');
const AILog = require('../models/AILog');
const Product = require('../models/Product');

async function generateB2BProposal(businessType, budget, sustainabilityGoal) {
  const prompt = `
    You are an AI procurement assistant for sustainable commerce.
    Generate a sustainable product procurement proposal for:
    
    Business Type: ${businessType}
    Budget: $${budget}
    Sustainability Goal: ${sustainabilityGoal}
    
    Return a JSON with:
    1. recommendedProducts: array of products with name, quantity, estimatedCost
    2. budgetAllocation: object showing percentage allocation
    3. impactPositioning: summary of sustainability impact
    
    Return ONLY valid JSON with this exact format:
    {
      "recommendedProducts": [
        {"productName": "Product Name", "quantity": 10, "estimatedCost": 100}
      ],
      "budgetAllocation": {"category1": 30, "category2": 40},
      "impactPositioning": "Brief impact summary"
    }
  `;

  const response = await generateContent(prompt);
  
  let parsedResponse;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsedResponse = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in response');
    }
  } catch (parseError) {
    throw new Error('Failed to parse AI response as JSON');
  }

  await AILog.create({
    moduleName: 'B2B Proposal Generator',
    prompt,
    response: parsedResponse
  });

  return parsedResponse;
}

module.exports = { generateB2BProposal };
