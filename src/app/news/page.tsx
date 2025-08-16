'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// تعریف interface برای نوع داده‌های خبر
interface NewsItem {
  id: number;
  news_code: string;
  title: string;
  summary: string;
  author: string;
  published_at: string;
  image_url?: string;
}

interface NewsResponse {
  success: boolean;
  data: NewsItem[];
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 9;

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      const response = await fetch(`/api/news?limit=${limit}&offset=${offset}`);
      const result = await response.json();

      if (result.success) {
        if (page === 1) {
          setNews(result.data);
        } else {
          setNews(prev => [...prev, ...result.data]);
        }
        setHasMore(result.pagination?.hasMore || false);
      } else {
        setError('خطا در دریافت اخبار');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* هدر صفحه */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">اخبار و رویدادها</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              جدیدترین اخبار، رویدادها و پیشرفت‌های پروژه زینوا را دنبال کنید
            </p>
          </div>

          {/* نمایش خطا */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {/* لیست اخبار */}
          {news.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">در حال حاضر خبری برای نمایش وجود ندارد.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {news.map((item) => (
                <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {item.image_url && (
                    <div className="h-48 bg-gray-200">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.news_code}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(item.published_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        نویسنده: {item.author}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(item.published_at)}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href={`/news/${item.news_code}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                      >
                        ادامه مطلب
                        <svg className="w-4 h-4 mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* دکمه بارگذاری بیشتر */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    در حال بارگذاری...
                  </>
                ) : (
                  <>
                    بارگذاری اخبار بیشتر
                    <svg className="w-5 h-5 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* پیام پایان */}
          {!hasMore && news.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">تمام اخبار نمایش داده شدند.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 