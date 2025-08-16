import { Metadata } from 'next';
import Link from 'next/link';
import TechnicalInfrastructure from '../../components/TechnicalInfrastructure';
import TargetMarkets from '../../components/TargetMarkets';
import TeamSection from '../../components/TeamSection';

export const metadata: Metadata = {
  title: 'درباره زینوا - پلتفرم هوشمند توسعه دارو',
  description: 'معرفی کامل پلتفرم زینوا، فناوری‌ها، تیم توسعه و چشم‌انداز آینده',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* بخش هیرو */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              درباره زینوا
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده
            </p>
          </div>
        </div>
      </section>

      {/* بخش معرفی */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                زینوا چیست؟
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                زینوا یک پلتفرم نرم‌افزاری پیشرفته است که با تلفیق مدل‌سازی دینامیک مولکولی (MD)، 
                داکینگ مولکولی هوشمند و تحلیل‌های فارماکوکینتیکی (PK)، مسیر کامل یک دارو را از 
                لحظه ورود به بدن تا اتصال به گیرنده هدف، شبیه‌سازی و تحلیل می‌کند.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                این پلتفرم با استفاده از هوش مصنوعی و الگوریتم‌های پیشرفته، قادر به کاهش ۳۰ تا ۵۰ 
                درصدی زمان و ۲۰ تا ۴۰ درصدی هزینه‌های غربالگری اولیه داروها است.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">۳۰-۵۰٪</div>
                  <div className="text-sm text-gray-600">کاهش زمان توسعه</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">۲۰-۴۰٪</div>
                  <div className="text-sm text-gray-600">کاهش هزینه‌ها</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">چالش‌های صنعت داروسازی</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                    <i className="fas fa-exclamation text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">هزینه‌های سرسام‌آور</h4>
                    <p className="text-gray-600 text-sm">میلیاردها دلار برای هر دارو</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                    <i className="fas fa-clock text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">زمان‌بر بودن</h4>
                    <p className="text-gray-600 text-sm">۱۰-۱۵ سال برای توسعه</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">نرخ شکست بالا</h4>
                    <p className="text-gray-600 text-sm">بیش از ۹۰٪ در مراحل پیش‌بالینی</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش فناوری‌ها */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              فناوری‌های پیشرفته زینوا
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ترکیب منحصر به فرد فناوری‌های نوین برای شبیه‌سازی دقیق مسیر دارو
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 mx-auto">
                <i className="fas fa-atom text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                مدل‌سازی دینامیک مولکولی (MD)
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                شبیه‌سازی حرکت اتم‌ها و مولکول‌ها در طول زمان برای درک رفتار دارو در محیط زیستی
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 mx-auto">
                <i className="fas fa-puzzle-piece text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                داکینگ مولکولی هوشمند
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                پیش‌بینی نحوه اتصال دارو به گیرنده هدف با استفاده از الگوریتم‌های هوش مصنوعی
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mb-6 mx-auto">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                تحلیل‌های فارماکوکینتیکی (PK)
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                بررسی جذب، توزیع، متابولیسم و دفع دارو در بدن برای بهینه‌سازی دوز
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* بخش زیرساخت فنی */}
      <TechnicalInfrastructure />

      {/* بخش بازارهای هدف */}
      <TargetMarkets />

      {/* بخش تیم توسعه */}
      <TeamSection />

      {/* بخش چشم‌انداز */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              چشم‌انداز آینده
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نقشه راه توسعه و گسترش پلتفرم زینوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">۲۰۲۵</div>
              <h3 className="font-bold text-gray-900 mb-2">توسعه MVP</h3>
              <p className="text-gray-600 text-sm">تکمیل نسخه اولیه پلتفرم</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">۲۰۲۶</div>
              <h3 className="font-bold text-gray-900 mb-2">اعتبارسنجی</h3>
              <p className="text-gray-600 text-sm">تست و بهینه‌سازی</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">۲۰۲۷</div>
              <h3 className="font-bold text-gray-900 mb-2">ورود به بازار</h3>
              <p className="text-gray-600 text-sm">عرضه تجاری</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">۲۰۲۸</div>
              <h3 className="font-bold text-gray-900 mb-2">گسترش جهانی</h3>
              <p className="text-gray-600 text-sm">صادرات و همکاری‌های بین‌المللی</p>
            </div>
          </div>
        </div>
      </section>

      {/* بخش فراخوان عمل */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            آماده همکاری با زینوا هستید؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            با تیم زینوا در تماس باشید و از فرصت‌های همکاری و سرمایه‌گذاری مطلع شوید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              تماس با ما
            </Link>
            <Link
              href="/investment"
              className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 shadow-lg border-2 border-white"
            >
              سرمایه‌گذاری
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}