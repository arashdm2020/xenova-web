'use client';

import { useState, useEffect } from 'react';

// تعریف نوع داده‌ها برای JavaScript
const UpdateItem = {
  id: 0,
  version_number: '',
  title: '',
  description: '',
  release_date: ''
};

const UpdatesResponse = {
  success: false,
  data: [],
  pagination: {
    total: 0,
    limit: 0,
    offset: 0,
    hasMore: false
  }
};

export default function UpdatesSection() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/updates?limit=4');
      const result = await response.json();

      if (result.success) {
        setUpdates(result.data);
      } else {
        setError('خطا در دریافت بروزرسانی‌ها');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">بروزرسانی‌های سیستم</h2>
          <p className="text-gray-600">جدیدترین نسخه‌ها و بهبودهای زینوا</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0 bg-gray-50 animate-pulse">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">بروزرسانی‌های سیستم</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">بروزرسانی‌های سیستم</h2>
        <p className="text-gray-600">جدیدترین نسخه‌ها و بهبودهای زینوا</p>
      </div>

        {updates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">در حال حاضر بروزرسانی‌ای برای نمایش وجود ندارد.</p>
          </div>
        ) : (
          <div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {updates.map((item, index) => (
                <div key={item.id} className={`border-b border-gray-100 last:border-b-0 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <span className="text-sm font-mono text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                          {item.version_number}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(item.release_date)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <button 
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
              >
                مشاهده همه بروزرسانی‌ها
                <svg className="w-4 h-4 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
  );
} 