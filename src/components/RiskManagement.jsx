'use client';
import { useState, useEffect } from 'react';

export default function RiskManagement() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('market');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/xenova-data');
        const result = await response.json();
        setData(result.risk_management);
      } catch (error) {
        console.error('خطا در بارگذاری داده‌ها:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!data) return null;

  const tabs = [
    { id: 'market', name: 'ریسک‌های بازار', icon: 'fas fa-chart-line' },
    { id: 'technical', name: 'ریسک‌های فنی', icon: 'fas fa-cogs' },
    { id: 'financial', name: 'ریسک‌های مالی', icon: 'fas fa-coins' }
  ];

  const getRiskData = () => {
    switch (activeTab) {
      case 'market':
        return data.market_risks;
      case 'technical':
        return data.technical_risks;
      case 'financial':
        return data.financial_risks;
      default:
        return data.market_risks;
    }
  };

  const getRiskColor = (probability) => {
    switch (probability) {
      case 'بالا':
        return 'text-red-600 bg-red-50';
      case 'متوسط':
        return 'text-yellow-600 bg-yellow-50';
      case 'کم':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            مدیریت ریسک
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.goal}
          </p>
        </div>

        {/* تب‌های ریسک */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* محتوای ریسک‌ها */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {getRiskData().map((risk, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {risk.risk}
                </h3>
                <div className="flex space-x-2 space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.probability)}`}>
                    احتمال: {risk.probability}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.impact)}`}>
                    تأثیر: {risk.impact}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">استراتژی‌های کاهش ریسک:</h4>
                <ul className="space-y-3">
                  {risk.mitigation_strategies.map((strategy, strategyIndex) => (
                    <li key={strategyIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600 leading-relaxed">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* رویکرد کلی کاهش ریسک */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              رویکرد کلی کاهش ریسک
            </h3>
            <p className="text-gray-600">
              اصول اساسی مدیریت ریسک در پروژه زینوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.overall_risk_reduction_approach.core_principles.map((principle, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4 mx-auto">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <p className="text-gray-800 font-medium">{principle}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-3">نظارت بر ریسک</h4>
              <p className="text-blue-700">{data.overall_risk_reduction_approach.risk_monitoring}</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h4 className="font-bold text-green-800 mb-3">برنامه‌ریزی احتمالی</h4>
              <p className="text-green-700">{data.overall_risk_reduction_approach.contingency_planning}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 