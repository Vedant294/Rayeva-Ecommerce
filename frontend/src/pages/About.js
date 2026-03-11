import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">About Rayeva AI</h1>
        <p className="text-xl text-gray-600 mt-2">Sustainable Commerce Powered by Artificial Intelligence</p>
      </div>
      
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Rayeva AI is a sustainable commerce platform that leverages artificial intelligence 
          to make eco-friendly products more discoverable and accessible. Our mission is to 
          accelerate the transition to sustainable consumption through intelligent automation.
        </p>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-green-100 leading-relaxed">
            We believe that sustainable commerce should be accessible, transparent, and automated. 
            By combining AI technology with environmental consciousness, we help businesses and 
            consumers make choices that benefit both the planet and the economy.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-6">Our Approach</h2>
        <p className="text-gray-700 mb-6">
          We combine AI technology with sustainable commerce principles to create a platform 
          that benefits both businesses and the environment. Our AI-powered tools help:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { icon: '🏷️', title: 'Auto Tagging', desc: 'Automatically tag and categorize sustainable products' },
            { icon: '💼', title: 'B2B Proposals', desc: 'Generate procurement proposals aligned with sustainability goals' },
            { icon: '📊', title: 'Impact Tracking', desc: 'Calculate and report environmental impact metrics' },
            { icon: '🔍', title: 'Discoverability', desc: 'Make sustainable products more discoverable through SEO' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-start">
              <div className="text-3xl mr-4">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-6">Sustainable Sourcing Standards</h2>
        <p className="text-gray-700 mb-6">
          We prioritize products that meet rigorous sustainability standards including:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { title: 'Plastic-Free', desc: 'Products that avoid single-use plastics and packaging', color: 'bg-green-50 border-green-200' },
            { title: 'Compostable', desc: 'Biodegradable products that return to soil naturally', color: 'bg-green-50 border-green-200' },
            { title: 'Recycled', desc: 'Products made from recycled and upcycled materials', color: 'bg-green-50 border-green-200' },
            { title: 'Vegan', desc: 'Animal-friendly products and ingredients', color: 'bg-green-50 border-green-200' }
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-xl border ${item.color}`}>
              <h3 className="font-semibold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-6">AI-Powered Commerce</h2>
        <p className="text-gray-700 mb-6">
          Our AI models analyze product information to generate accurate sustainability 
          classifications, helping consumers make informed choices while reducing the 
          environmental footprint of commerce.
        </p>
        
        <div className="bg-eco-beige p-8 rounded-2xl">
          <h3 className="font-semibold text-gray-900 mb-4">Why Choose Rayeva AI?</h3>
          <ul className="space-y-3">
            {[
              'Automated product categorization with 95%+ accuracy',
              'Real-time environmental impact tracking',
              'B2B procurement optimization for sustainability goals',
              'Transparent and verifiable sustainability claims',
              'Seamless integration with existing e-commerce platforms'
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-5 h-5 text-eco-green mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
