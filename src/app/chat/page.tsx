import { Metadata } from 'next';
import ChatAgent from '../../components/ChatAgent';

export const metadata: Metadata = {
  title: 'چت با هوش مصنوعی زینوا - پلتفرم هوشمند توسعه دارو',
  description: 'با هوش مصنوعی زینوا گفتگو کنید و درباره پلتفرم هوشمند ردیابی مسیر دارو، فناوری‌ها، قیمت‌گذاری و سرمایه‌گذاری سوال بپرسید',
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* افزایش عرض از max-w-6xl به max-w-7xl */}
        {/* Header */}
        <div className="text-center mb-6"> {/* کاهش فاصله از mb-8 به mb-6 */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"> {/* کاهش فاصله */}
            هوش مصنوعی زینوا
          </h1>
          <div className="w-20 h-0.5 bg-gray-900 mx-auto mb-3"></div> {/* کاهش فاصله */}
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            با هوش مصنوعی ما درباره پلتفرم زینوا، فناوری‌های پیشرفته، 
            سرمایه‌گذاری و تمام جنبه‌های پروژه گفتگو کنید
          </p>
        </div>

        {/* Chat Component */}
        <ChatAgent isEmbedded={false} />

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"> {/* کاهش فاصله از mt-8 به mt-6 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-brain text-green-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              هوش مصنوعی پیشرفته
            </h3>
            <p className="text-gray-600 text-sm">
              هوش مصنوعی ما بر اساس داده‌های کامل پروژه زینوا آموزش دیده و پاسخ‌های دقیق ارائه می‌دهد
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-clock text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              پاسخ‌گویی فوری
            </h3>
            <p className="text-gray-600 text-sm">
              سوالات خود را مطرح کنید و در کمتر از چند ثانیه پاسخ جامع و مفصل دریافت کنید
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              اطلاعات معتبر
            </h3>
            <p className="text-gray-600 text-sm">
              تمام اطلاعات بر اساس مستندات رسمی و به‌روز پروژه زینوا ارائه می‌شود
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            سوالات پرتکرار
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">زینوا چیست؟</h4>
                <p className="text-gray-600 text-sm">
                  پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">مزایای اصلی زینوا</h4>
                <p className="text-gray-600 text-sm">
                  کاهش ۳۰-۵۰٪ زمان و ۲۰-۴۰٪ هزینه‌های توسعه دارو
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">مدت زمان پروژه</h4>
                <p className="text-gray-600 text-sm">
                  برنامه‌ریزی ۲۴ ماهه فشرده برای توسعه MVP
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">هزینه کل پروژه</h4>
                <p className="text-gray-600 text-sm">
                  ۱۳.۵ میلیارد تومان شامل تجهیزات، نیروی انسانی و عملیات
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}