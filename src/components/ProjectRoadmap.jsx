'use client';

import { useState } from 'react';

export default function ProjectRoadmap() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      id: 1,
      title: "فاز ۱: پایه‌ریزی و طراحی",
      period: "تیر ۱۴۰۴ - آذر ۱۴۰۴ (۶ ماه)",
      description: "تحلیل دقیق نیاز بازار، طراحی معماری نهایی، انتخاب ابزارها و برنامه‌ریزی مالی",
      tasks: [
        "تحلیل دقیق نیاز بازار",
        "طراحی معماری نهایی", 
        "انتخاب ابزارها",
        "برنامه‌ریزی مالی",
        "جذب تیم هسته"
      ],
      status: "نتیجه کلیدی: سند معماری سیستم",
      icon: "fas fa-drafting-compass"
    },
    {
      id: 2,
      title: "فاز ۲: توسعه MVP",
      period: "دی ۱۴۰۴ - خرداد ۱۴۰۵ (۶ ماه)",
      description: "پیاده‌سازی ماژول PK پایه، توسعه هسته شبیه‌سازی MD، پیاده‌سازی اولیه داکینگ هوشمند",
      tasks: [
        "پیاده‌سازی ماژول PK پایه",
        "توسعه هسته شبیه‌سازی MD",
        "پیاده‌سازی اولیه داکینگ هوشمند",
        "یکپارچه‌سازی اولیه"
      ],
      status: "نتیجه کلیدی: پروتوتایپ کارکردی",
      icon: "fas fa-code"
    },
    {
      id: 3,
      title: "فاز ۳: اعتبارسنجی و بهینه‌سازی", 
      period: "تیر ۱۴۰۵ - آذر ۱۴۰۵ (۶ ماه)",
      description: "تست‌های داخلی، اعتبارسنجی با داده‌های تجربی، اجرای مطالعات موردی و بهینه‌سازی الگوریتم‌ها",
      tasks: [
        "تست‌های داخلی",
        "اعتبارسنجی با داده‌های تجربی/ابزارهای مرجع", 
        "اجرای مطالعات موردی",
        "بهینه‌سازی الگوریتم‌ها و رابط کاربری"
      ],
      status: "نتیجه کلیدی: گزارش‌های اعتبارسنجی",
      icon: "fas fa-flask"
    },
    {
      id: 4,
      title: "فاز ۴: آماده‌سازی بازار",
      period: "دی ۱۴۰۵ - خرداد ۱۴۰۶ (۶ ماه)",
      description: "توسعه نسخه ابری پایه، تکمیل مستندات، راه‌اندازی وبسایت و بازاریابی اولیه",
      tasks: [
        "توسعه نسخه ابری پایه",
        "تکمیل مستندات", 
        "راه‌اندازی وبسایت و بازاریابی اولیه",
        "مذاکره با مشتریان اولیه",
        "برنامه‌ریزی نسخه تجاری کامل"
      ],
      status: "نتیجه کلیدی: محصول تجاری اولیه",
      icon: "fas fa-rocket"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            نقشه راه پروژه (۲۴ ماهه)
          </h2>
          <div className="w-20 h-0.5 bg-gray-900 mx-auto mb-4"></div>
          <p className="text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
            برنامه زمان‌بندی زینوا به صورت فشرده و کارآمد برای یک دوره ۲۴ ماهه طراحی شده است 
            تا با حداکثر کارایی و حداقل ریسک پیش برود
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* خط عمودی */}
          <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>
          
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.id} className="relative">
                {/* شماره فاز در دایره */}
                <div className="flex items-start">
                  <div className={`hidden md:flex absolute right-6 w-10 h-10 ${phase.id === 2 ? 'bg-gray-500' : 'bg-gray-900'} text-white rounded-full transform translate-x-1/2 items-center justify-center text-base font-bold`}>
                    {phase.id === 1 ? '۱' : phase.id === 2 ? '۲' : phase.id === 3 ? '۳' : '۴'}
                  </div>
                  
                  <div className="md:ml-16 w-full pr-10">
                    <div 
                      className={`bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 cursor-pointer ${
                        activePhase === index ? 'shadow-md border-gray-400 bg-white' : ''
                      }`}
                      onClick={() => setActivePhase(activePhase === index ? -1 : index)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                            <i className={`${phase.icon} text-base`}></i>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {phase.title}
                            </h3>
                            <div className="text-sm text-gray-600 font-medium">
                              {phase.period}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-400">
                          <i className={`fas fa-chevron-${activePhase === index ? 'up' : 'down'} text-sm`}></i>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                        {phase.description}
                      </p>
                      
                      <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                        {phase.status}
                      </div>
                      
                      {/* جزئیات تکمیلی */}
                      {activePhase === index && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3 text-sm">فعالیت‌های کلیدی:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {phase.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center text-gray-700">
                                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full ml-2 flex-shrink-0"></div>
                                <span className="text-xs">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* خلاصه برنامه */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-3">
              استراتژی اجرایی ۲۴ ماهه
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm">
              این برنامه فشرده به گونه‌ای طراحی شده تا با بهینه‌سازی فرآیندها، پروژه به سرعت و با موفقیت به مرحله تجاری‌سازی برسد.
              ایجاد نقاط عطف عملیاتی در هر ۶ ماه، امکان جذب سرمایه‌گذاران مرحله‌ای و ارزیابی مستمر پیشرفت را فراهم می‌کند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}