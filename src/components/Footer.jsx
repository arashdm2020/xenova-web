import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* لوگو و توضیح */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
                زینوا
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-6 max-w-md">
              پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده. 
              راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها.
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              لینک‌های سریع
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  خانه
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/investment" className="text-gray-300 hover:text-white transition-colors duration-200">
                  سرمایه‌گذاری
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              تماس با ما
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-envelope text-green-400 ml-2"></i>
                <span className="text-gray-300 text-sm">info@xenova.ir</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-blue-400 ml-2"></i>
                <span className="text-gray-300 text-sm">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-yellow-400 ml-2"></i>
                <span className="text-gray-300 text-sm">تهران، ایران</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © ۱۴۰۴ زینوا. تمامی حقوق محفوظ است.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-telegram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}