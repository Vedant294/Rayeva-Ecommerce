import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi, aiApi } from '../services/api';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    tags: '',
    imageUrl: ''
  });
  const [aiTags, setAiTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerateTags = async () => {
    if (!formData.name || !formData.description) {
      alert('Please enter product name and description');
      return;
    }
    
    setLoading(true);
    try {
      const response = await aiApi.generateTags({
        name: formData.name,
        description: formData.description
      });
      setAiTags(response.data);
      setFormData(prev => ({
        ...prev,
        category: response.data.primary_category,
        subcategory: response.data.subcategory,
        tags: response.data.seo_tags.join(', '),
        imageUrl: ''
      }));
    } catch (error) {
      alert('Failed to generate tags. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        sustainabilityFilters: {
          plasticFree: false,
          compostable: false,
          recycled: false,
          vegan: false
        }
      };
      
      await productApi.create(productData);
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      alert('Failed to add product. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600">Use AI to automatically generate tags and categories</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                placeholder="Enter product name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Product Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                rows="4"
                placeholder="Enter product description"
              />
            </div>
            
            <button
              onClick={handleGenerateTags}
              disabled={loading}
              className="w-full bg-gradient-to-r from-eco-green to-green-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Tags...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Generate AI Tags & Category
                </>
              )}
            </button>
            
            {aiTags && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  AI Generated Tags:
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 block text-xs">Category</span>
                    <span className="font-medium text-gray-900">{aiTags.primary_category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Subcategory</span>
                    <span className="font-medium text-gray-900">{aiTags.subcategory}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block text-xs">SEO Tags</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aiTags.seo_tags.map((tag, i) => (
                        <span key={i} className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block text-xs">Sustainability Filters</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aiTags.sustainability_filters.map((filter, i) => (
                        <span key={i} className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">{filter}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-gray-50">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                    placeholder="Auto-generated"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Subcategory</label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                    placeholder="Auto-generated"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                  placeholder="eco friendly, plastic free, ..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-eco-dark to-green-800 text-white py-4 rounded-xl font-semibold hover:from-green-800 hover:to-green-900 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
