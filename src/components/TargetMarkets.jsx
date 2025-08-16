'use client';
import { useState, useEffect } from 'react';

export default function TargetMarkets() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/xenova-data');
        const result = await response.json();
        setData(result.target_markets);
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
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            بازارهای هدف زینوا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            پلتفرم زینوا برای طیف گسترده‌ای از مشتریان در صنعت داروسازی طراحی شده است
          </p>
        </div>

        {/* بازارهای اصلی */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            بازارهای اصلی
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {data.primary_markets.map((market, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 mx-auto">
                  <i className="fas fa-building text-white text-2xl"></i>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {market.name}
                </h4>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {market.description}
                </p>

                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">استراتژی کاهش ریسک:</h5>
                  <p className="text-green-700 text-sm">{market.risk_mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* بازارهای ثانویه */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            بازارهای ثانویه
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.secondary_markets.map((market, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mr-4">
                    <i className="fas fa-flask text-white text-lg"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {market.name}
                  </h4>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {market.description}
                </p>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">استراتژی کاهش ریسک:</h5>
                  <p className="text-blue-700 text-sm">{market.risk_mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* بخش آمار بازار */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              پتانسیل بازار
            </h3>
            <p className="text-gray-600">
              آمار و ارقام بازار هدف زینوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">۵+</div>
              <div className="text-gray-600 font-medium">بازار هدف</div>
              <div className="text-sm text-gray-500 mt-2">بخش‌های مختلف</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">۱۰۰+</div>
              <div className="text-gray-600 font-medium">شرکت بالقوه</div>
              <div className="text-sm text-gray-500 mt-2">در ایران</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">۵۰+</div>
              <div className="text-gray-600 font-medium">مرکز تحقیقاتی</div>
              <div className="text-sm text-gray-500 mt-2">دانشگاهی</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">۲۰+</div>
              <div className="text-gray-600 font-medium">کشور منطقه‌ای</div>
              <div className="text-sm text-gray-500 mt-2">پتانسیل صادرات</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 