'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// تعریف نوع داده‌ها برای JavaScript
const NewsDetail = {
  id: 0,
  news_code: '',
  title: '',
  content: '',
  summary: '',
  author: '',
  published_at: '',
  image_url: ''
};

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.code) {
      fetchNewsDetail(params.code as string);
    }
  }, [params.code]);

  const fetchNewsDetail = async (newsCode) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news?code=${newsCode}`);
      const result = await response.json();

      if (result.success) {
        setNews(result.data);
      } else {
        setError(result.error || 'خبری یافت نشد');
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
            <div className="text-center mt-6">
              <Link 
                href="/news"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                بازگشت به لیست اخبار
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ناوبری */}
          <div className="mb-6">
            <Link 
              href="/news"
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              بازگشت به لیست اخبار
            </Link>
          </div>

          {/* محتوای خبر */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {news.image_url && (
              <div className="h-64 md:h-96 bg-gray-200">
                <img 
                  src={news.image_url} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              {/* هدر خبر */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {news.news_code}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(news.published_at)}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {news.title}
                </h1>
                
                {news.summary && (
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    {news.summary}
                  </p>
                )}
                
                <div className="flex items-center text-sm text-gray-500">
                  <span>نویسنده: {news.author}</span>
                </div>
              </div>
              
              {/* محتوای اصلی */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </div>
              </div>
              
              {/* فوتر */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>کد خبر: {news.news_code}</span>
                  <span>تاریخ انتشار: {formatDate(news.published_at)}</span>
                </div>
              </div>
            </div>
          </article>

          {/* دکمه‌های ناوبری */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/news"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              لیست اخبار
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              صفحه اصلی
              <svg className="w-4 h-4 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 