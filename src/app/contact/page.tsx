'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company_position: '',
    mobile_phone: '',
    message: '',
    investment_amount_range: '',
    investment_type: '',
    contact_preference: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message);
        setTrackingCode(data.data.tracking_code);
        setFormData({
          full_name: '',
          email: '',
          company_position: '',
          mobile_phone: '',
          message: '',
          investment_amount_range: '',
          investment_type: '',
          contact_preference: 'phone'
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'خطا در ارسال درخواست');
        if (data.tracking_code) {
          setTrackingCode(data.tracking_code);
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* بخش هیرو */}
      <section className="bg-gradient-investment py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              درخواست اطلاعات سرمایه‌گذاری
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              برای دریافت پروپوزال کامل یا درخواست جلسه، فرم زیر را پر کنید
            </p>
          </div>
        </div>
      </section>

      {/* بخش فرم درخواست */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* فرم اصلی */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                درخواست اطلاعات سرمایه‌گذاری
              </h2>
              <p className="text-lg text-gray-600">
                برای دریافت پروپوزال کامل یا درخواست جلسه، فرم زیر را پر کنید
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">درخواست شما با موفقیت ثبت شد!</h3>
                  <p className="text-green-700">{statusMessage}</p>
                </div>
                
                {trackingCode && (
                  <div className="bg-white p-6 rounded-lg border border-green-300 mb-6">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">کد پیگیری شما</h4>
                      <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="font-mono text-2xl font-bold text-green-600 tracking-wider">{trackingCode}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={`/tracking?code=${trackingCode}`}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                      >
                        <i className="fas fa-search ml-2"></i>
                        پیگیری وضعیت
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(trackingCode);
                          alert('کد پیگیری در کلیپ‌بورد کپی شد!');
                        }}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center font-medium"
                      >
                        <i className="fas fa-copy ml-2"></i>
                        کپی کد
                      </button>
                    </div>
                  </div>
                )}

                {/* راهنماهای کاربر */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <i className="fas fa-info-circle ml-2"></i>
                    راهنمای پیگیری درخواست
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">1</span>
                        </div>
                        <div className="mr-3">
                          <p className="text-blue-800 font-medium">کد پیگیری را ذخیره کنید</p>
                          <p className="text-blue-700 text-sm">این کد را در جای امنی نگهداری کنید</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">2</span>
                        </div>
                        <div className="mr-3">
                          <p className="text-blue-800 font-medium">وضعیت را پیگیری کنید</p>
                          <p className="text-blue-700 text-sm">از طریق دکمه "پیگیری وضعیت" یا منوی "پیگیری درخواست"</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">3</span>
                        </div>
                        <div className="mr-3">
                          <p className="text-blue-800 font-medium">منتظر تماس باشید</p>
                          <p className="text-blue-700 text-sm">تیم ما در اسرع وقت با شما تماس خواهد گرفت</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">4</span>
                        </div>
                        <div className="mr-3">
                          <p className="text-blue-800 font-medium">سوالات بیشتر؟</p>
                          <p className="text-blue-700 text-sm">از چت هوش مصنوعی یا تماس مستقیم استفاده کنید</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* دکمه‌های عملیات */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setTrackingCode('');
                      setFormData({
                        full_name: '',
                        email: '',
                        company_position: '',
                        mobile_phone: '',
                        message: '',
                        investment_amount_range: '',
                        investment_type: '',
                        contact_preference: 'phone'
                      });
                    }}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center font-medium"
                  >
                    <i className="fas fa-plus ml-2"></i>
                    درخواست جدید
                  </button>
                  <a
                    href="/chat"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    <i className="fas fa-robot ml-2"></i>
                    چت با هوش مصنوعی
                  </a>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <i className="fas fa-exclamation-circle text-red-600 ml-2"></i>
                  <p className="text-red-700">{statusMessage}</p>
                </div>
              </div>
            )}

            {submitStatus !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ردیف اول - نام و ایمیل */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-800"
                      placeholder="نام و نام خانوادگی خود را وارد کنید"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-800"
                      placeholder="example@domain.com"
                    />
                  </div>
                </div>

                {/* ردیف دوم - شرکت/سمت و شماره موبایل */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company_position" className="block text-sm font-medium text-gray-700 mb-2">
                      نام شرکت / سمت
                    </label>
                    <input
                      type="text"
                      id="company_position"
                      name="company_position"
                      value={formData.company_position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-800"
                      placeholder="نام سازمان یا سمت خود را وارد کنید"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile_phone" className="block text-sm font-medium text-gray-700 mb-2">
                      شماره موبایل *
                    </label>
                    <input
                      type="tel"
                      id="mobile_phone"
                      name="mobile_phone"
                      value={formData.mobile_phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-800"
                      placeholder="09123456789"
                      dir="ltr"
                    />
                  </div>
                </div>



                {/* ردیف چهارم - پیام */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    پیام شما
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                    placeholder="توضیحات یا درخواست خود را بنویسید"
                  />
                </div>

                {/* ردیف پنجم - ترجیح تماس */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ترجیح تماس
                  </label>
                  <div className="flex space-x-6 space-x-reverse">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact_preference"
                        value="phone"
                        checked={formData.contact_preference === 'phone'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="mr-2 text-sm text-gray-700">تلفن</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact_preference"
                        value="email"
                        checked={formData.contact_preference === 'email'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="mr-2 text-sm text-gray-700">ایمیل</span>
                    </label>
                  </div>
                </div>

                {/* دکمه ارسال */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                        در حال ارسال...
                      </div>
                    ) : (
                      'ارسال درخواست'
                    )}
                  </button>
                </div>
              </form>
            )}

            {submitStatus !== 'success' && (
              <>
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    با ارسال این فرم، شما با 
                    <a href="#" className="text-blue-600 hover:text-blue-700 mx-1">قوانین حریم خصوصی</a>
                    ما موافقت می‌کنید.
                  </p>
                </div>

                {/* سیستم پیگیری درخواست */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-info-circle text-blue-600 text-xl ml-3"></i>
                    <h3 className="text-lg font-semibold text-blue-900">سیستم پیگیری درخواست</h3>
                  </div>
                  <div className="space-y-2 text-blue-800">
                    <p>• هر شماره موبایل تنها یک بار می‌تواند درخواست ارسال کند.</p>
                    <p>• پس از ثبت درخواست، یک شماره پیگیری به شما اختصاص داده می‌شود.</p>
                  </div>
                </div>

                {/* راه‌های جایگزین */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-2">یا از طریق ایمیل:</p>
                  <a href="mailto:support@xenova.ir" className="text-blue-600 hover:text-blue-700 font-medium">
                    support@xenova.ir
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* بخش نقشه (اختیاری) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              موقعیت دفتر مرکزی
            </h2>
            <p className="text-lg text-gray-600">
              برای ملاقات حضوری، از آدرس زیر بازدید فرمایید
            </p>
          </div>
          
          <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <i className="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
              <p className="text-gray-600">نقشه در اینجا نمایش داده خواهد شد</p>
              <p className="text-sm text-gray-500 mt-2">
                تهران، خیابان ولیعصر، پلاک ۱۲۳۴
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}