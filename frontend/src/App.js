import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import B2BProposal from './pages/B2BProposal';
import ImpactDashboard from './pages/ImpactDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import DataViewer from './pages/DataViewer';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-eco-green to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-eco-dark font-bold text-xl tracking-tight">Rayeva AI</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link to="/add-product" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                Add Product
              </Link>
              <Link to="/b2b" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                B2B Proposals
              </Link>
              <Link to="/impact" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                Impact
              </Link>
              <Link to="/data" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                Data Viewer
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-eco-green transition px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-eco-beige">
      <Navbar />
      <main className="pt-4 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/b2b" element={<B2BProposal />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="/data" element={<DataViewer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-eco-green to-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-eco-dark font-semibold">Rayeva AI</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 Rayeva AI Sustainable Commerce Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
