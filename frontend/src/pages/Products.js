import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    plasticFree: false,
    compostable: false,
    recycled: false,
    vegan: false
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productApi.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    if (filters.plasticFree && !product.sustainabilityFilters?.plasticFree) return false;
    if (filters.compostable && !product.sustainabilityFilters?.compostable) return false;
    if (filters.recycled && !product.sustainabilityFilters?.recycled) return false;
    if (filters.vegan && !product.sustainabilityFilters?.vegan) return false;
    return true;
  });

  if (loading) return <div className="text-center py-12">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sustainable Products</h1>
        <p className="text-gray-600">Discover our collection of eco-friendly products</p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-4">
        {['plasticFree', 'compostable', 'recycled', 'vegan'].map((filter) => (
          <label key={filter} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[filter]}
              onChange={(e) => setFilters({ ...filters, [filter]: e.target.checked })}
              className="rounded text-eco-green focus:ring-eco-green border-gray-300"
            />
            <span className="capitalize text-gray-700">{filter.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {product.sustainabilityFilters?.plasticFree && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">plastic-free</span>
                  )}
                  {product.sustainabilityFilters?.compostable && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">compostable</span>
                  )}
                  {product.sustainabilityFilters?.recycled && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">recycled</span>
                  )}
                  {product.sustainabilityFilters?.vegan && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">vegan</span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-eco-green transition-colors">{product.name}</h3>
                  <span className="text-xl font-bold text-eco-dark">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                  <span className="text-sm text-eco-green font-medium group-hover:underline">View Details →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

export default Products;
