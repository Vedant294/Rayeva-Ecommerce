const { generateContent } = require('./geminiService');
const AILog = require('../models/AILog');

async function generateImpactReport(orderData) {
  // Fallback: Generate impact report without AI if API fails
  try {
    const prompt = `
      You are an AI sustainability analyst. Calculate environmental impact for this order:
      
      Order Details: ${JSON.stringify(orderData)}
      
      Calculate and return:
      1. plasticSavedGrams: estimated plastic waste avoided
      2. carbonAvoidedKg: estimated carbon emissions avoided
      3. localSourcingImpact: brief description of local sourcing benefits
      4. impactStatement: human-readable sustainability statement
      
      Return ONLY valid JSON with this exact format:
      {
        "plasticSavedGrams": 450,
        "carbonAvoidedKg": 1.2,
        "localSourcingImpact": "Brief impact description",
        "impactStatement": "This order helped avoid approximately 450 grams of plastic waste."
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
      moduleName: 'Impact Reporter',
      prompt,
      response: parsedResponse
    });

    return parsedResponse;
  } catch (error) {
    // Fallback: Generate deterministic impact report based on order data
    console.log('AI generation failed, using fallback');
    const totalAmount = orderData.totalAmount || 0;
    const numProducts = orderData.products?.length || 1;
    
    // Estimate impact based on order value
    const plasticSavedGrams = Math.round(totalAmount * 15); // ~15g plastic per $1
    const carbonAvoidedKg = parseFloat((totalAmount * 0.5).toFixed(1)); // ~0.5kg CO2 per $1
    
    return {
      plasticSavedGrams,
      carbonAvoidedKg,
      localSourcingImpact: 'Products sourced from local sustainable suppliers',
      impactStatement: `This order helped avoid approximately ${plasticSavedGrams} grams of plastic waste and ${carbonAvoidedKg}kg of carbon emissions.`
    };
  }
}

module.exports = { generateImpactReport };
