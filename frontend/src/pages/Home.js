import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productApi.getAll();
      setProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <section className="bg-gradient-to-br from-eco-green to-green-800 text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Sustainable Commerce <br/>
                <span className="text-green-200">Powered by AI</span>
              </h1>
              <p className="text-xl text-green-50 mb-8 max-w-2xl">
                Automate product catalog tagging, generate B2B procurement proposals, 
                and produce environmental impact reports with Rayeva AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="bg-white text-eco-green px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center">
                  Browse Products
                </Link>
                <Link to="/b2b" className="bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center">
                  B2B Proposals
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-eco-green to-green-600 rounded-2xl transform rotate-3 opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80" 
                  alt="Sustainable commerce" 
                  className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Sustainable Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our curated collection of eco-friendly products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <Link key={product._id} to={`/products/${product._id}`} className="block group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    {product.sustainabilityFilters?.plasticFree && (
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">plastic-free</span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-eco-dark">${product.price}</span>
                    <span className="text-sm text-eco-green font-medium group-hover:underline">View Details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-eco-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-eco-green mb-4">500+</div>
              <div className="text-gray-700 font-medium">Products Tagged by AI</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-eco-green mb-4">100+</div>
              <div className="text-gray-700 font-medium">B2B Proposals Generated</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-eco-green mb-4">50kg</div>
              <div className="text-gray-700 font-medium">Plastic Saved</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-green-800 to-eco-dark text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Go Sustainable?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join businesses and consumers who are making a difference with sustainable commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-white text-eco-dark px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Shop Now
            </Link>
            <Link to="/contact" className="bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
