'use client';
import { useState, useEffect } from 'react';

export default function TechnicalInfrastructure() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/xenova-data');
        const result = await response.json();
        setData(result.required_equipment);
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
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            زیرساخت فنی زینوا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ستون فقرات قدرتمند پلتفرم زینوا برای پردازش محاسبات پیچیده
          </p>
        </div>

        {/* تجهیزات سخت‌افزاری */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            تجهیزات سخت‌افزاری
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.equipment.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mr-4">
                    <i className="fas fa-server text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {item.type}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.purpose}</p>
                  </div>
                </div>

                {item.specifications && (
                  <div className="space-y-4">
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* نرم‌افزار و ابزارها */}
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              نرم‌افزار و ابزارها
            </h3>
            <p className="text-gray-600">
              پشته فناوری پیشرفته زینوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 mx-auto">
                <i className="fab fa-ubuntu text-white"></i>
              </div>
              <h4 className="font-bold text-blue-800 mb-2">سیستم عامل</h4>
              <p className="text-blue-700 text-sm">{data.software.operating_system}</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 mx-auto">
                <i className="fab fa-python text-white"></i>
              </div>
              <h4 className="font-bold text-green-800 mb-2">محیط توسعه</h4>
              <p className="text-green-700 text-sm">{data.software.development_environment}</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mb-4 mx-auto">
                <i className="fab fa-docker text-white"></i>
              </div>
              <h4 className="font-bold text-purple-800 mb-2">ابزارهای مدیریت</h4>
              <p className="text-purple-700 text-sm">{data.software.management_tools}</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-key text-white"></i>
              </div>
              <h4 className="font-bold text-orange-800 mb-2">مجوزهای اختیاری</h4>
              <p className="text-orange-700 text-sm">{data.software.optional_licenses}</p>
            </div>
          </div>
        </div>

        {/* آمار عملکرد */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="text-4xl font-bold text-purple-600 mb-2">۳</div>
            <div className="text-gray-600 font-medium">سرور پردازشی</div>
            <div className="text-sm text-gray-500 mt-2">Intel Xeon Gold</div>
          </div>
          
          <div className="text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="text-4xl font-bold text-indigo-600 mb-2">۶</div>
            <div className="text-gray-600 font-medium">کارت گرافیک</div>
            <div className="text-sm text-gray-500 mt-2">NVIDIA RTX 6000</div>
          </div>
          
          <div className="text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">۲۵۶GB</div>
            <div className="text-gray-600 font-medium">RAM کل</div>
            <div className="text-sm text-gray-500 mt-2">DDR4 ECC</div>
          </div>
          
          <div className="text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="text-4xl font-bold text-green-600 mb-2">۱۰x</div>
            <div className="text-gray-600 font-medium">شتاب محاسباتی</div>
            <div className="text-sm text-gray-500 mt-2">با CUDA</div>
          </div>
        </div>
      </div>
    </section>
  );
} 