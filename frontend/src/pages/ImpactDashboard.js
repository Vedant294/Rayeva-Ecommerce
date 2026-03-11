import React, { useState, useEffect } from 'react';
import { impactApi } from '../services/api';

function ImpactDashboard() {
  const [summary, setSummary] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImpactData();
  }, []);

  const loadImpactData = async () => {
    try {
      const [summaryRes, reportsRes] = await Promise.all([
        impactApi.getSummary(),
        impactApi.getAll()
      ]);
      setSummary(summaryRes.data);
      setReports(reportsRes.data);
    } catch (error) {
      console.error('Error loading impact data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading impact data...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Environmental Impact Dashboard</h1>
        <p className="text-gray-600">Track the environmental impact of your sustainable commerce</p>
      </div>
      
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl font-bold mb-2">
              {summary.totalPlasticSavedGrams}g
            </div>
            <div className="text-green-100 font-medium">Plastic Saved</div>
            <div className="mt-4 text-sm text-green-100">
              ≈ {summary.totalPlasticSavedGrams / 1000}kg of plastic waste avoided
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl font-bold mb-2">
              {summary.totalCarbonAvoidedKg.toFixed(1)}kg
            </div>
            <div className="text-green-100 font-medium">Carbon Avoided</div>
            <div className="mt-4 text-sm text-green-100">
              ≈ {summary.totalCarbonAvoidedKg * 2.2}lbs of CO₂ prevented
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-700 to-green-800 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl font-bold mb-2">
              {summary.totalReports}
            </div>
            <div className="text-green-100 font-medium">Orders Tracked</div>
            <div className="mt-4 text-sm text-green-100">
              Each order contributes to a greener future
            </div>
          </div>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact Reports</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report._id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-eco-green">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-gray-500">Order #{report.orderId?._id?.slice(-6)}</span>
                <p className="text-gray-700 mt-2 leading-relaxed">{report.impactStatement}</p>
              </div>
              <div className="text-right">
                <div className="text-eco-green font-bold text-lg">+{report.plasticSavedGrams}g plastic</div>
                <div className="text-eco-green font-bold text-lg">-{report.carbonAvoidedKg}kg CO₂</div>
              </div>
            </div>
            {report.localSourcingImpact && (
              <div className="text-sm text-gray-600 italic bg-gray-50 px-4 py-2 rounded-lg">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {report.localSourcingImpact}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {reports.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-700">No impact reports yet</h3>
          <p className="text-gray-500 mt-2">Complete an order to see your impact</p>
        </div>
      )}
    </div>
  );
}

export default ImpactDashboard;
