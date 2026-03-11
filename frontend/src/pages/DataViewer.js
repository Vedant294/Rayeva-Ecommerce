import React, { useState, useEffect } from 'react';
import { productApi, orderApi, b2bApi, impactApi } from '../services/api';

function DataViewer() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [b2bProposals, setB2bProposals] = useState([]);
  const [impactReports, setImpactReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const response = await productApi.getAll();
        setProducts(response.data);
      } else if (activeTab === 'orders') {
        const response = await orderApi.getAll();
        setOrders(response.data);
      } else if (activeTab === 'b2b') {
        const response = await b2bApi.getAll();
        setB2bProposals(response.data);
      } else if (activeTab === 'impact') {
        const response = await impactApi.getAll();
        setImpactReports(response.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (data, columns) => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead className="bg-eco-green text-white">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4 text-left font-semibold">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {columns.map((col, j) => (
                <td key={j} className="px-6 py-4 text-gray-700">
                  {col.render ? col.render(row[col.field], row) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <div className="text-center py-12">Loading data...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Database Viewer</h1>
        <p className="text-gray-600">View all stored data from the system</p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          {['products', 'orders', 'b2b', 'impact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeTab === tab
                  ? 'bg-eco-green text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {activeTab === 'products' && (
          <>
            <h2 className="text-xl font-bold mb-4">Products ({products.length})</h2>
            {renderTable(products, [
              { label: 'Name', field: 'name' },
              { label: 'Category', field: 'category' },
              { label: 'Price', field: 'price', render: (v) => `$${v}` },
              { label: 'Plastic-Free', field: 'sustainabilityFilters', render: (v) => v?.plasticFree ? '✅' : '❌' },
              { label: 'Compostable', field: 'sustainabilityFilters', render: (v) => v?.compostable ? '✅' : '❌' }
            ])}
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <h2 className="text-xl font-bold mb-4">Orders ({orders.length})</h2>
            {renderTable(orders, [
              { label: 'ID', field: '_id', render: (v) => v?.slice(-6) },
              { label: 'Total', field: 'totalAmount', render: (v) => `$${v}` },
              { label: 'Customer', field: 'customerInfo', render: (v) => v?.name },
              { label: 'Date', field: 'createdAt', render: (v) => new Date(v).toLocaleDateString() }
            ])}
          </>
        )}

        {activeTab === 'b2b' && (
          <>
            <h2 className="text-xl font-bold mb-4">B2B Proposals ({b2bProposals.length})</h2>
            {renderTable(b2bProposals, [
              { label: 'ID', field: '_id', render: (v) => v?.slice(-6) },
              { label: 'Business', field: 'businessType' },
              { label: 'Budget', field: 'budget', render: (v) => `$${v}` },
              { label: 'Goal', field: 'sustainabilityGoal', render: (v) => v?.substring(0, 30) + '...' }
            ])}
          </>
        )}

        {activeTab === 'impact' && (
          <>
            <h2 className="text-xl font-bold mb-4">Impact Reports ({impactReports.length})</h2>
            {renderTable(impactReports, [
              { label: 'ID', field: '_id', render: (v) => v?.slice(-6) },
              { label: 'Plastic Saved', field: 'plasticSavedGrams', render: (v) => `${v}g` },
              { label: 'Carbon Avoided', field: 'carbonAvoidedKg', render: (v) => `${v}kg` },
              { label: 'Date', field: 'createdAt', render: (v) => new Date(v).toLocaleDateString() }
            ])}
          </>
        )}
      </div>
    </div>
  );
}

export default DataViewer;
