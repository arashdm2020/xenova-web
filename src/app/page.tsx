'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroCarousel from '../components/HeroCarousel';
import ChatAgent from '../components/ChatAgent';
import NewsSection from '../components/NewsSection';
import UpdatesSection from '../components/UpdatesSection';
import EconomicBenefits from '../components/EconomicBenefits';
import TargetMarkets from '../components/TargetMarkets';
import InvestmentROI from '../components/InvestmentROI';
import TeamSection from '../components/TeamSection';

// تعریف نوع داده برای ویژگی‌های محصول
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/features');
      const data = await response.json();
      if (data.success) {
        setFeatures(data.data);
      }
    } catch (error) {
      console.error('خطا در دریافت ویژگی‌ها:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* بخش هیرو با کاروسل */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroCarousel />
        </div>
      </section>

      {/* بخش اخبار و بروزرسانی‌ها */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <NewsSection />
            <UpdatesSection />
          </div>
        </div>
      </section>

      {/* بخش آمار کلیدی */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* کاهش زمان توسعه - موشک */}
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="text-4xl font-bold text-primary-600 mb-2 animate-pulse">۵۰٪</div>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* موشک */}
                    <div className="relative">
                      <i className="fas fa-rocket text-4xl text-primary-600 transform group-hover:scale-110 transition-transform duration-300 animate-bounce"></i>
                      {/* شعله موشک */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <i className="fas fa-fire text-xl text-orange-500 animate-pulse"></i>
                      </div>
                      {/* مسیر حرکت */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-primary-600 to-transparent opacity-30"></div>
                      {/* ستاره‌های در حال حرکت */}
                      <div className="absolute -top-2 -right-2">
                        <i className="fas fa-star text-yellow-400 text-sm animate-ping"></i>
                      </div>
                      <div className="absolute top-4 -left-1">
                        <i className="fas fa-star text-yellow-300 text-xs animate-ping" style={{ animationDelay: '0.5s' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-600 font-medium">کاهش زمان توسعه</div>
            </div>

            {/* کاهش هزینه‌ها - سکه‌های در حال سقوط */}
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="text-4xl font-bold text-primary-600 mb-2 animate-pulse">۴۰٪</div>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* سکه‌های در حال سقوط */}
                    <div className="space-y-2">
                      <i className="fas fa-coins text-2xl text-yellow-400 animate-bounce" style={{ animationDelay: '0s' }}></i>
                      <i className="fas fa-coins text-xl text-yellow-500 animate-bounce" style={{ animationDelay: '0.2s' }}></i>
                      <i className="fas fa-coins text-lg text-yellow-600 animate-bounce" style={{ animationDelay: '0.4s' }}></i>
                    </div>
                    {/* صندوق پس‌انداز */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <i className="fas fa-piggy-bank text-3xl text-green-600"></i>
                    </div>
                    {/* علامت دلار */}
                    <div className="absolute top-2 right-2">
                      <i className="fas fa-dollar-sign text-green-600 text-sm animate-pulse"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-600 font-medium">کاهش هزینه‌ها</div>
            </div>

            {/* کاهش نرخ شکست - نمودار صعودی */}
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="text-4xl font-bold text-primary-600 mb-2 animate-pulse">۹۰٪</div>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* نمودار صعودی */}
                    <div className="relative">
                      <i className="fas fa-chart-line text-4xl text-green-600 transform group-hover:scale-110 transition-transform duration-300"></i>
                      {/* فلش صعودی */}
                      <div className="absolute -top-2 -right-2">
                        <i className="fas fa-arrow-up text-green-500 text-lg animate-bounce"></i>
                      </div>
                      {/* نقطه‌های موفقیت */}
                      <div className="absolute -top-1 -left-1">
                        <i className="fas fa-circle text-green-400 text-sm animate-ping"></i>
                      </div>
                      <div className="absolute top-2 right-2">
                        <i className="fas fa-circle text-green-400 text-xs animate-ping" style={{ animationDelay: '0.3s' }}></i>
                      </div>
                      {/* علامت تیک موفقیت */}
                      <div className="absolute -bottom-1 -left-1">
                        <i className="fas fa-check-circle text-green-500 text-sm animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-600 font-medium">کاهش نرخ شکست</div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش مزایای اقتصادی */}
      <EconomicBenefits />

      {/* بخش بازارهای هدف */}
      <TargetMarkets />

      {/* بخش ROI و سرمایه‌گذاری */}
      <InvestmentROI />

      {/* بخش تیم */}
      <TeamSection />

      {/* بخش ویژگی‌ها */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ویژگی‌های کلیدی زینوا
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              پلتفرم زینوا با ترکیب فناوری‌های پیشرفته، راهکاری جامع برای چالش‌های صنعت داروسازی ارائه می‌دهد
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-primary-600 text-3xl mb-4">
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* بخش چت با مشاور */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              سوال دارید؟ با هوش مصنوعی ما صحبت کنید
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              درباره زینوا، فناوری‌ها، سرمایه‌گذاری و هر چیز دیگری سوال بپرسید
            </p>
          </div>
          <ChatAgent isEmbedded={true} />
        </div>
      </section>

      {/* بخش فراخوان عمل */}
      <section className="py-20 bg-gradient-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            آماده همکاری با ما هستید؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            با تیم زینوا در تماس باشید و از فرصت‌های سرمایه‌گذاری و همکاری مطلع شوید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/investment"
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 shadow-lg"
            >
              اطلاعات سرمایه‌گذاری
            </Link>
            <Link
              href="/contact"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg border-2 border-white"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}