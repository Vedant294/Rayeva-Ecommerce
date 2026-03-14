// Fallback: No API required - generates relevant tags based on product input

async function generateContent(prompt) {
  // Extract product name and description from prompt
  const nameMatch = prompt.match(/Product Name:\s*(.+?)(?=\n|$)/i);
  const descMatch = prompt.match(/Product Description:\s*(.+?)(?=\n\n|$)/is);
  
  const productName = nameMatch ? nameMatch[1].trim() : '';
  const productDesc = descMatch ? descMatch[1].trim() : '';
  
  // Generate relevant tags based on product content
  const lowerName = productName.toLowerCase();
  const lowerDesc = productDesc.toLowerCase();
  
  // Determine category based on keywords
  let category = 'General';
  let subcategory = 'General';
  
  if (lowerName.includes('tooth') || lowerName.includes('brush') || lowerName.includes('oral') || lowerName.includes('hair')) {
    category = 'Personal Care';
    subcategory = lowerName.includes('tooth') ? 'Oral Hygiene' : lowerName.includes('hair') ? 'Hair Care' : 'Oral Hygiene';
  } else if (lowerName.includes('bag') || lowerName.includes('tote') || lowerName.includes('basket')) {
    category = 'Accessories';
    subcategory = lowerName.includes('bag') ? 'Shopping Bags' : 'Storage';
  } else if (lowerName.includes('container') || lowerName.includes('food') || lowerName.includes('bowl') || lowerName.includes('wrap')) {
    category = 'Kitchen';
    subcategory = lowerName.includes('container') ? 'Food Storage' : lowerName.includes('wrap') ? 'Food Storage' : 'Cookware';
  } else if (lowerName.includes('notebook') || lowerName.includes('paper') || lowerName.includes('journal') || lowerName.includes('pen')) {
    category = 'Stationery';
    subcategory = lowerName.includes('notebook') ? 'Notebooks' : 'Writing Tools';
  } else if (lowerName.includes('mug') || lowerName.includes('cup') || lowerName.includes('bottle') || lowerName.includes('drink')) {
    category = 'Drinkware';
    subcategory = lowerName.includes('mug') ? 'Drinkware' : lowerName.includes('bottle') ? 'Bottles' : 'Drinkware';
  } else if (lowerName.includes('shirt') || lowerName.includes('t-shirt') || lowerName.includes('tshirt') || lowerName.includes('apparel')) {
    category = 'Apparel';
    subcategory = lowerName.includes('shirt') ? 'T-Shirts' : 'Apparel';
  } else if (lowerName.includes('solar') || lowerName.includes('charger') || lowerName.includes('battery') || lowerName.includes('electronic')) {
    category = 'Electronics';
    subcategory = lowerName.includes('solar') ? 'Chargers' : 'Electronics';
  } else if (lowerName.includes('cutting') || lowerName.includes('board') || lowerName.includes('knife') || lowerName.includes('kitchen')) {
    category = 'Kitchen';
    subcategory = lowerName.includes('cutting') ? 'Cookware' : 'Kitchen Tools';
  } else if (lowerName.includes('jacket') || lowerName.includes('coat') || lowerName.includes('clothing')) {
    category = 'Apparel';
    subcategory = lowerName.includes('jacket') ? 'Outerwear' : 'Apparel';
  }
  
  // Generate sustainability filters based on keywords
  const filters = [];
  if (lowerName.includes('bamboo') || lowerName.includes('wood') || lowerName.includes('natural') || lowerName.includes('plant') || lowerName.includes('cotton') || lowerName.includes('hemp') || lowerName.includes('jute')) {
    filters.push('plastic-free');
    filters.push('compostable');
  }
  if (lowerName.includes('recycled') || lowerName.includes('reused') || lowerName.includes('reusable')) {
    filters.push('recycled');
  }
  if (lowerName.includes('vegan') || lowerName.includes('plant') || lowerName.includes('cotton') || lowerName.includes('hemp')) {
    filters.push('vegan');
  }
  if (lowerName.includes('beeswax') || lowerName.includes('wax')) {
    filters.push('compostable');
  }
  if (filters.length === 0) {
    filters.push('plastic-free');
  }
  
  // Generate SEO tags
  const tags = [];
  const keywords = [
    productName, 
    'eco friendly', 
    'sustainable', 
    'environmental',
    'green',
    'organic',
    'natural',
    'reusable',
    'biodegradable'
  ];
  
  // Add specific keywords based on product type
  if (lowerName.includes('bamboo')) tags.push('bamboo');
  if (lowerName.includes('cotton')) tags.push('organic cotton');
  if (lowerName.includes('recycled')) tags.push('recycled');
  if (lowerName.includes('reusable')) tags.push('reusable');
  if (lowerName.includes('solar')) tags.push('solar');
  if (lowerName.includes('ceramic')) tags.push('ceramic');
  if (lowerName.includes('handmade')) tags.push('handmade');
  
  // Add generic tags
  tags.push('eco friendly');
  tags.push('sustainable');
  tags.push('plastic free');
  tags.push('biodegradable');
  tags.push('green living');
  
  // Remove duplicates and limit to 10
  const uniqueTags = [...new Set(tags)].slice(0, 10);
  
  return JSON.stringify({
    primary_category: category,
    subcategory: subcategory,
    seo_tags: uniqueTags,
    sustainability_filters: filters
  });
}

module.exports = { generateContent };
