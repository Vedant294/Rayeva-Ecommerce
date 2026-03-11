import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi } from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productApi.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading product...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="inline-flex items-center text-eco-green hover:text-green-700 mb-6 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Products
      </Link>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-96 lg:h-auto relative">
            <img 
              src={product.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.sustainabilityFilters?.plasticFree && (
                <span className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">plastic-free</span>
              )}
              {product.sustainabilityFilters?.compostable && (
                <span className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">compostable</span>
              )}
              {product.sustainabilityFilters?.recycled && (
                <span className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">recycled</span>
              )}
              {product.sustainabilityFilters?.vegan && (
                <span className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">vegan</span>
              )}
            </div>
          </div>
          
          <div className="p-8 lg:p-12">
            <div className="mb-2">
              <span className="text-eco-green font-semibold tracking-wide uppercase text-sm">{product.category}</span>
              {product.subcategory && <span className="text-gray-400 mx-2">/</span>}
              {product.subcategory && <span className="text-gray-600 font-medium">{product.subcategory}</span>}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="text-4xl font-bold text-eco-dark mb-6">${product.price}</div>
            
            <div className="prose text-gray-700 mb-8">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sustainability Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sustainabilityFilters?.plasticFree && (
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      Plastic Free
                    </span>
                  )}
                  {product.sustainabilityFilters?.compostable && (
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                      Compostable
                    </span>
                  )}
                  {product.sustainabilityFilters?.recycled && (
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      Recycled
                    </span>
                  )}
                  {product.sustainabilityFilters?.vegan && (
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                      Vegan
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">SEO Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-eco-green text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Add to Cart - ${product.price}
              </button>
              <button className="px-6 py-4 rounded-xl border-2 border-eco-green text-eco-green font-semibold hover:bg-green-50 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
