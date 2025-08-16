import { Metadata } from 'next';
import Link from 'next/link';
import RiskManagement from '../../components/RiskManagement';
import InvestmentROI from '../../components/InvestmentROI';

export const metadata: Metadata = {
  title: 'سرمایه‌گذاری - زینوا',
  description: 'اطلاعات کامل سرمایه‌گذاری در پلتفرم زینوا، برآورد هزینه‌ها، بازگشت سرمایه و فرصت‌های همکاری',
  keywords: 'زینوا, توسعه دارو, هوش مصنوعی, دارو, شبیه‌سازی مولکولی',
  openGraph: {
    title: 'زینوا - پلتفرم هوشمند توسعه دارو',
    description: 'راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها',
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'زینوا - پلتفرم هوشمند توسعه دارو',
    description: 'راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها',
  },
};

export default function Investment() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* بخش هیرو */}
      <section className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              فرصت سرمایه‌گذاری در زینوا
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto mb-8">
              سرمایه‌گذاری در آینده هوشمند طراحی دارو
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-5xl font-bold mb-4 text-yellow-300">۱۳.۵ میلیارد تومان</div>
              <p className="text-yellow-100 text-lg">
                برای توسعه پلتفرم MVP در بازه زمانی ۲۴ ماهه
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* بخش مزایای سرمایه‌گذاری */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              چرا در زینوا سرمایه‌گذاری کنیم؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              فرصت‌های منحصر به فرد در صنعت داروسازی هوشمند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">بازار بزرگ</h3>
              <p className="text-gray-600">بازار جهانی ۲۵۰ میلیارد دلاری داروسازی</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">فناوری پیشرفته</h3>
              <p className="text-gray-600">ترکیب منحصر به فرد AI، MD و PK</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-users text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">تیم متخصص</h3>
              <p className="text-gray-600">تیم با تجربه در حوزه‌های مختلف</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-globe text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">پتانسیل صادراتی</h3>
              <p className="text-gray-600">قابلیت عرضه به بازارهای جهانی</p>
            </div>
          </div>
        </div>
      </section>

      {/* بخش مدل درآمدی */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              مدل درآمدی زینوا
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              منابع درآمدی متنوع و پایدار
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center">
                  <i className="fas fa-key text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">فروش لایسنس</h3>
              <p className="text-gray-600 text-center mb-4">نسخه محلی/ابری برای شرکت‌های دارویی</p>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">۶۰٪</div>
                <div className="text-sm text-gray-500">درآمد کل</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
                  <i className="fas fa-cogs text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">خدمات تحلیلی</h3>
              <p className="text-gray-600 text-center mb-4">ارائه تحلیل‌های تخصصی برای پروژه‌های خاص</p>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">۲۵٪</div>
                <div className="text-sm text-gray-500">درآمد کل</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto flex items-center justify-center">
                  <i className="fas fa-sync text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">اشتراک سالانه</h3>
              <p className="text-gray-600 text-center mb-4">به‌روزرسانی‌ها و پشتیبانی مستمر</p>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">۱۵٪</div>
                <div className="text-sm text-gray-500">درآمد کل</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش برآورد هزینه‌ها */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              برآورد هزینه‌ها
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              تفکیک شفاف هزینه‌های پروژه بر اساس نرخ میانگین دلار ۸۵,۰۰۰ تومان
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="w-16 px-3 py-4 text-center text-sm font-semibold">ردیف</th>
                    <th className="w-48 px-4 py-4 text-right text-sm font-semibold">عنوان هزینه</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold">جزئیات</th>
                    <th className="w-40 px-4 py-4 text-center text-sm font-semibold">هزینه برآوردی (تومان)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-green-50 hover:bg-green-100 transition-colors duration-200">
                    <td className="px-3 py-4 text-center text-sm font-bold text-green-700">۱</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-green-700">نیروی انسانی</td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600">تیم هسته فنی و متخصصان مشاور</td>
                    <td className="px-4 py-4 text-center text-sm font-bold text-green-600">۶۸۰,۰۰۰,۰۰۰</td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                    <td className="px-3 py-4 text-center text-sm font-bold text-blue-700">۲</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-blue-700">تجهیزات سخت‌افزاری</td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600">سرورها، GPU ها و زیرساخت شبکه</td>
                    <td className="px-4 py-4 text-center text-sm font-bold text-blue-600">۹,۵۰۰,۰۰۰,۰۰۰</td>
                  </tr>
                  <tr className="bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
                    <td className="px-3 py-4 text-center text-sm font-bold text-purple-700">۳</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-purple-700">نرم‌افزار و مجوزها</td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600">نرم‌افزارهای تجاری و متن‌باز</td>
                    <td className="px-4 py-4 text-center text-sm font-bold text-purple-600">۱,۱۰۰,۰۰۰,۰۰۰</td>
                  </tr>
                  <tr className="bg-yellow-50 hover:bg-yellow-100 transition-colors duration-200">
                    <td className="px-3 py-4 text-center text-sm font-bold text-yellow-700">۴</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-yellow-700">سایر هزینه‌های عملیاتی</td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600">فضای کار، اعتبارسنجی و بازاریابی</td>
                    <td className="px-4 py-4 text-center text-sm font-bold text-yellow-600">۲,۲۲۰,۰۰۰,۰۰۰</td>
                  </tr>
                </tbody>
                <tfoot className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                                         <td colSpan={3} className="px-4 py-4 text-right text-lg font-bold">جمع کل</td>
                    <td className="px-4 py-4 text-center text-xl font-bold">۱۳,۵۰۰,۰۰۰,۰۰۰</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="bg-gray-50 p-6 border-t">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">توضیحات:</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• این برآورد بر اساس نیازهای فنی پروژه و شرایط بازار ایران در زمان تدوین ارائه شده است</li>
                <li>• هزینه‌ها شامل مالیات بر ارزش افزوده نمی‌باشد</li>
                <li>• امکان مدیریت هزینه‌ها از طریق استفاده بیشتر از منابع متن‌باز وجود دارد</li>
                <li>• نرخ ارز محاسبه شده: ۸۵,۰۰۰ تومان</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* بخش زمان‌بندی پروژه */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              زمان‌بندی پروژه
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              برنامه فشرده ۲۴ ماهه برای توسعه و عرضه محصول
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <div className="text-blue-600 text-2xl mb-3">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">فصل ۱: پایه‌ریزی</h3>
              <p className="text-sm text-gray-600 mb-3">تیر - آذر ۱۴۰۴ (۶ ماه)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• تحلیل نیاز بازار</li>
                <li>• طراحی معماری نهایی</li>
                <li>• جذب تیم هسته</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
              <div className="text-green-600 text-2xl mb-3">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">فصل ۲: توسعه MVP</h3>
              <p className="text-sm text-gray-600 mb-3">دی ۱۴۰۴ - خرداد ۱۴۰۵ (۶ ماه)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• پیاده‌سازی ماژول PK</li>
                <li>• توسعه هسته MD</li>
                <li>• داکینگ هوشمند</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
              <div className="text-yellow-600 text-2xl mb-3">
                <i className="fas fa-check-double"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">فصل ۳: اعتبارسنجی</h3>
              <p className="text-sm text-gray-600 mb-3">تیر - آذر ۱۴۰۵ (۶ ماه)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• تست‌های داخلی</li>
                <li>• اعتبارسنجی تجربی</li>
                <li>• بهینه‌سازی الگوریتم‌ها</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
              <div className="text-purple-600 text-2xl mb-3">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">فصل ۴: آماده‌سازی بازار</h3>
              <p className="text-sm text-gray-600 mb-3">دی ۱۴۰۵ - خرداد ۱۴۰۶ (۶ ماه)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• توسعه نسخه ابری</li>
                <li>• تکمیل مستندات</li>
                <li>• بازاریابی اولیه</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* بخش مدیریت ریسک کامل */}
      <RiskManagement />

      {/* بخش هزینه‌های کلیدی و پیش‌بینی بازگشت سرمایه */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              هزینه‌های کلیدی و پیش‌بینی بازگشت سرمایه
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              برآورد دقیق هزینه‌ها و پیش‌بینی بازگشت سرمایه در بازه زمانی ۵ ساله
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* بخش هزینه‌های کلیدی */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                هزینه‌های کلیدی
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-code text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">توسعه MVP</h4>
                      <p className="text-sm text-gray-600">حداقل محصول قابل ارائه</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">۳۰۰,۰۰۰</div>
                    <div className="text-sm text-gray-500">دلار</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-chart-line text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">بازاریابی و فروش سالانه</h4>
                      <p className="text-sm text-gray-600">هزینه‌های تبلیغات و فروش</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">۲۵۰,۰۰۰</div>
                    <div className="text-sm text-gray-500">دلار</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-cogs text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">پشتیبانی عملیاتی</h4>
                      <p className="text-sm text-gray-600">نگهداری و پشتیبانی سیستم</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">۱۵۰,۰۰۰</div>
                    <div className="text-sm text-gray-500">دلار</div>
                  </div>
                </div>
              </div>
            </div>

            {/* بخش پیش‌بینی بازگشت سرمایه */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                پیش‌بینی بازگشت سرمایه
              </h3>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-balance-scale text-white text-xl"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">نقطه سر به سر</h4>
                  <p className="text-sm text-gray-600 mb-3">زمان رسیدن به سوددهی</p>
                  <div className="text-2xl font-bold text-yellow-600">پایان سال سوم</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-arrow-up text-white text-xl"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">بازگشت سرمایه اولیه</h4>
                  <p className="text-sm text-gray-600 mb-3">شروع سوددهی</p>
                  <div className="text-2xl font-bold text-blue-600">سال چهارم</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-pie text-white text-xl"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">بازگشت سرمایه خالص سال پنجم</h4>
                  <p className="text-sm text-gray-600 mb-3">سود خالص</p>
                  <div className="text-2xl font-bold text-green-600">۱۲۰٪</div>
                </div>
              </div>
            </div>
          </div>

          {/* خلاصه مالی */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              خلاصه مالی پروژه
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">۷۰۰,۰۰۰ دلار</div>
                <div className="text-gray-600">کل سرمایه‌گذاری اولیه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">۵ سال</div>
                <div className="text-gray-600">دوره بازگشت سرمایه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">۱۲۰٪</div>
                <div className="text-gray-600">بازگشت سرمایه سال پنجم</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش ROI و سرمایه‌گذاری */}
      <InvestmentROI />

      {/* بخش فراخوان عمل */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            آماده همکاری با ما هستید؟
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            با تیم زینوا در تماس باشید و از فرصت‌های سرمایه‌گذاری و همکاری مطلع شوید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors duration-200 shadow-lg"
            >
              تماس با ما
            </Link>
            <Link
              href="/about"
              className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200 shadow-lg border-2 border-white"
            >
              بیشتر بدانید
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}