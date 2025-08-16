'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "زینوا: انقلاب در داروسازی",
      subtitle: "پلتفرم هوشمند ردیابی مسیر دارو",
      description: "راهکار انقلابی برای کاهش ۳۰-۵۰٪ زمان و ۲۰-۴۰٪ هزینه‌های توسعه دارو با هوش مصنوعی پیشرفته",
      bgAnimation: "neural-network",
      theme: "innovation"
    },
    {
      id: 2,
      title: "شبیه‌سازی مولکولی پیشرفته",
      subtitle: "دینامیک مولکولی و داکینگ هوشمند",
      description: "تلفیق مدل‌سازی MD، داکینگ مولکولی و تحلیل‌های فارماکوکینتیکی در یک پلتفرم یکپارچه با دقت بی‌نظیر",
      bgAnimation: "molecular-flow",
      theme: "science"
    },
    {
      id: 3,
      title: "هوش مصنوعی و شبکه‌های عصبی",
      subtitle: "پیش‌بینی دقیق مسیر دارو در بدن",
      description: "استفاده از شبکه‌های عصبی عمیق برای پیش‌بینی عبور از سد خونی-مغزی و اتصال دقیق به گیرنده‌های هدف",
      bgAnimation: "brain-network",
      theme: "ai"
    },
    {
      id: 4,
      title: "تجاری‌سازی و فرصت سرمایه‌گذاری",
      subtitle: "فرصت طلایی در فناوری دارویی",
      description: "بازگشت سرمایه قابل توجه با پتانسیال تأثیرگذاری عمیق بر صنعت داروسازی ایران و منطقه خاورمیانه",
      bgAnimation: "data-flow",
      theme: "business"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {/* Background Animations */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`animated-bg ${slide.bgAnimation} h-full w-full`}></div>
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-20 sm:px-24 lg:px-28 w-full h-full">
          <div className="relative h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="max-w-4xl h-full flex flex-col justify-center mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-green-100 mb-4">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/about"
                      className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-lg border-2 border-white text-center"
                    >
                      بیشتر بدانید
                    </Link>
                    <Link
                      href="/contact"
                      className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 shadow-lg text-center"
                    >
                      تماس با ما
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - RTL Direction */}
      <button
        onClick={nextSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={prevSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}