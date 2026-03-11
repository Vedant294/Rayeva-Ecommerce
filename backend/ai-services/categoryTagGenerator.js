const { generateContent } = require('./geminiService');
const AILog = require('../models/AILog');

async function generateCategoryAndTags(productName, productDescription) {
  const prompt = `
    You are an AI assistant for a sustainable commerce platform. 
    Analyze the following product and generate:
    1. Primary category (e.g., Personal Care, Kitchen, Accessories, Stationery)
    2. Subcategory (specific category)
    3. 5-10 SEO tags
    4. Sustainability filters (plastic-free, compostable, recycled, vegan)
    
    Product Name: ${productName}
    Product Description: ${productDescription}
    
    Return ONLY valid JSON with this exact format:
    {
      "primary_category": "Category Name",
      "subcategory": "Subcategory Name",
      "seo_tags": ["tag1", "tag2", "tag3"],
      "sustainability_filters": ["filter1", "filter2"]
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
    moduleName: 'Category & Tag Generator',
    prompt,
    response: parsedResponse
  });

  return parsedResponse;
}

module.exports = { generateCategoryAndTags };
