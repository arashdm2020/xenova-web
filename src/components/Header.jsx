'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'خانه', href: '/' },
    { name: 'زینوا', href: '/about' },
    { name: 'اخبار', href: '/news' },
    { name: 'سرمایه‌گذاری', href: '/investment' },
    { name: 'چت با هوش مصنوعی', href: '/chat' },
    { name: 'تماس با ما', href: '/contact' },
    { name: 'پیگیری درخواست', href: '/tracking' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* لوگو */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
                زینوا
              </div>
            </Link>
          </div>

          {/* منوی دسکتاپ */}
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-4 space-x-reverse">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* دکمه منوی موبایل */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">باز کردن منوی اصلی</span>
              {!isMenuOpen ? (
                <i className="fas fa-bars h-6 w-6"></i>
              ) : (
                <i className="fas fa-times h-6 w-6"></i>
              )}
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}