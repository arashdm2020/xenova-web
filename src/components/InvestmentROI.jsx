'use client';
import { useState, useEffect } from 'react';

export default function InvestmentROI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/xenova-data');
        const result = await response.json();
        if (result.success && result.data) {
          setData({
            cost_estimation: result.data.cost_estimation,
            return_on_investment: result.data.return_on_investment,
            capital_request: result.data.capital_request
          });
        }
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
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            بازگشت سرمایه و سرمایه‌گذاری
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تحلیل دقیق هزینه‌ها و پیش‌بینی بازگشت سرمایه در پروژه زینوا
          </p>
        </div>

        {/* درخواست سرمایه */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 lg:p-12 mb-8 md:mb-16">
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {data.capital_request.title}
            </h3>
            <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-emerald-600 mb-4 break-words">
              {data.capital_request.amount}
            </div>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6">
              مدت زمان: {data.capital_request.duration}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {data.capital_request.description}
            </p>
          </div>

          {/* تفکیک هزینه‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.cost_estimation.costs.map((cost, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 mx-auto">
                  <i className="fas fa-coins text-white"></i>
                </div>
                <h4 className="font-bold text-emerald-800 mb-2">{cost.category}</h4>
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  {cost.estimated_cost}
                </div>
                <p className="text-emerald-700 text-sm">{cost.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* پیش‌بینی درآمد */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 lg:p-12 mb-8 md:mb-16">
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              پیش‌بینی درآمد
            </h3>
            <p className="text-gray-600">
              تحلیل درآمد و رشد بازار در سال‌های آینده
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="text-4xl font-bold text-blue-600 mb-4">سال اول</div>
              <div className="text-2xl font-bold text-blue-800 mb-4">۱ میلیون دلار</div>
              <p className="text-blue-700 leading-relaxed">
                {data.return_on_investment.revenue_forecast.year_one}
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="text-4xl font-bold text-green-600 mb-4">سال سوم</div>
              <div className="text-2xl font-bold text-green-800 mb-4">۳ میلیون دلار</div>
              <p className="text-green-700 leading-relaxed">
                {data.return_on_investment.revenue_forecast.year_three}
              </p>
            </div>
          </div>
        </div>

        {/* تحلیل ROI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* هزینه‌های کلیدی */}
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              هزینه‌های کلیدی
            </h3>
            <div className="space-y-6">
              {Object.entries(data.return_on_investment.key_costs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600 font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* پیش‌بینی ROI */}
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              پیش‌بینی بازگشت سرمایه
            </h3>
            <div className="space-y-6">
              {Object.entries(data.return_on_investment.roi_projections).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <div className="text-lg font-bold text-emerald-800 mb-2">{key}:</div>
                  <div className="text-emerald-600 font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* پتانسیل سرمایه‌گذاری */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              پتانسیل سرمایه‌گذاری
            </h3>
            <p className="text-gray-600">
              عوامل جذابیت سرمایه‌گذاری در زینوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {data.return_on_investment.investment_attraction.market_growth_rate}
              </div>
              <p className="text-purple-700">نرخ رشد بازار</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {data.return_on_investment.investment_attraction.exit_potential}
              </div>
              <p className="text-orange-700">پتانسیل خروج</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 