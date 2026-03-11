const { generateCategoryAndTags: generateTags } = require('../ai-services/categoryTagGenerator');

async function generateCategoryAndTags(req, res) {
  try {
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    const result = await generateTags(name, description);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { generateCategoryAndTags };
