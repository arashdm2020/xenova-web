'use client';
import { useState, useEffect } from 'react';

export default function EconomicBenefits() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/xenova-data');
        const result = await response.json();
        setData(result.economic_and_time_efficiency);
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

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.key_benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 mx-auto">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {benefit.aspect}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-center">
                {benefit.details}
              </p>

              <div className="mt-6 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* بخش آمار کلیدی */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              آمار کلیدی صرفه‌جویی
            </h3>
            <p className="text-gray-600">
              مزایای اقتصادی قابل اندازه‌گیری زینوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">۴۰٪</div>
              <div className="text-gray-600 font-medium">کاهش هزینه‌های پیش‌بالینی</div>
              <div className="text-sm text-gray-500 mt-2">صرفه‌جویی سالانه</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">۵۰٪</div>
              <div className="text-gray-600 font-medium">کاهش زمان توسعه</div>
              <div className="text-sm text-gray-500 mt-2">تسریع چرخه</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">۱۰۰٪</div>
              <div className="text-gray-600 font-medium">خودکفایی فناورانه</div>
              <div className="text-sm text-gray-500 mt-2">استقلال کامل</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 