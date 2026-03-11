import React, { useState } from 'react';
import { b2bApi } from '../services/api';

function B2BProposal() {
  const [formData, setFormData] = useState({
    businessType: '',
    budget: '',
    sustainabilityGoal: ''
  });
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await b2bApi.create({
        businessType: formData.businessType,
        budget: parseFloat(formData.budget),
        sustainabilityGoal: formData.sustainabilityGoal
      });
      setProposal(response.data);
    } catch (error) {
      alert('Failed to generate proposal. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">B2B Proposal Generator</h1>
        <p className="text-gray-600">Generate sustainable procurement proposals with AI</p>
      </div>
      
      {!proposal ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                  required
                >
                  <option value="">Select business type</option>
                  <option value="retail">Retail Store</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="office">Office Space</option>
                  <option value="hotel">Hotel</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Budget ($)</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                  placeholder="Enter budget"
                  required
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 mb-2 font-medium">Sustainability Goal</label>
                <textarea
                  value={formData.sustainabilityGoal}
                  onChange={(e) => setFormData({ ...formData, sustainabilityGoal: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green focus:border-eco-green transition"
                  rows="4"
                  placeholder="Describe your sustainability goals..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-eco-green to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Proposal...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Generate Proposal
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <svg className="w-8 h-8 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Proposal Generated Successfully</h2>
                <p className="text-gray-600">AI has created a sustainable procurement plan for your business</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                Recommended Products
              </h3>
              <div className="space-y-3">
                {proposal.recommendedProducts?.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-2xl">🌿</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.productName}</h4>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-eco-dark">${product.estimatedCost}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 7h3m-3 4h3m-3 4h3m-3 4h3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3m-3-4h-3m3-4h-3"></path></svg>
                Budget Allocation
              </h3>
              <div className="space-y-3">
                {Object.entries(proposal.budgetAllocation || {}).map(([category, percentage]) => (
                  <div key={category} className="flex items-center">
                    <span className="w-32 capitalize text-gray-700 font-medium">{category}</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full mx-4 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-eco-green to-green-600 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="w-12 text-right font-semibold">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                Impact Positioning
              </h3>
              <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                <p className="text-gray-700 leading-relaxed">{proposal.impactPositioning}</p>
              </div>
            </div>
            
            <button
              onClick={() => setProposal(null)}
              className="w-full bg-gradient-to-r from-eco-dark to-green-800 text-white py-4 rounded-xl font-semibold hover:from-green-800 hover:to-green-900 transition shadow-lg hover:shadow-xl"
            >
              Create Another Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default B2BProposal;
