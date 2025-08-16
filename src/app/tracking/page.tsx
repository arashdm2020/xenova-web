'use client';

import { useState, useEffect } from 'react';

interface TrackingData {
  id: number;
  tracking_code: string;
  full_name: string;
  email: string;
  mobile_phone: string;
  company_position: string;
  message: string;
  contact_preference: string;
  status: string;
  status_text: string;
  status_class: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // بررسی کد پیگیری در URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    if (codeFromUrl) {
      setTrackingCode(codeFromUrl);
      // اگر کد در URL وجود دارد، بلافاصله پیگیری کن
      handleTrackingWithCode(codeFromUrl);
    }
  }, []);

  const handleTrackingWithCode = async (code: string) => {
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await fetch(`/api/tracking?code=${encodeURIComponent(code.trim())}`);
      const result = await response.json();

      if (result.success) {
        setTrackingData(result.data);
      } else {
        setError(result.error || 'خطا در پیگیری وضعیت');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      setError('لطفاً کد پیگیری را وارد کنید');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await fetch(`/api/tracking?code=${encodeURIComponent(trackingCode.trim())}`);
      const result = await response.json();

      if (result.success) {
        setTrackingData(result.data);
      } else {
        setError(result.error || 'خطا در پیگیری وضعیت');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">پیگیری وضعیت درخواست</h1>
            <p className="text-gray-600">کد پیگیری خود را وارد کنید تا از وضعیت درخواست خود مطلع شوید</p>
          </div>

          {/* فرم پیگیری */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleTracking} className="flex gap-4">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="کد پیگیری خود را وارد کنید (مثال: XE123456789012345)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'در حال بررسی...' : 'پیگیری'}
              </button>
            </form>
          </div>

          {/* نمایش خطا */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* نمایش اطلاعات درخواست */}
          {trackingData && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">اطلاعات درخواست</h2>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">کد پیگیری:</span>
                  <span className="font-mono text-lg font-bold text-blue-600 text-gray-900">{trackingData.tracking_code}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* اطلاعات شخصی */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات شخصی</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">نام و نام خانوادگی:</span>
                      <span className="mr-2 font-medium text-gray-900">{trackingData.full_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">سمت در شرکت:</span>
                      <span className="mr-2 font-medium text-gray-900">{trackingData.company_position || 'ثبت نشده'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">ایمیل:</span>
                      <span className="mr-2 font-medium text-gray-900">{trackingData.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">شماره همراه:</span>
                      <span className="mr-2 font-medium text-gray-900">{trackingData.mobile_phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">ترجیح تماس:</span>
                      <span className="mr-2 font-medium text-gray-900">
                        {trackingData.contact_preference === 'phone' ? 'تلفن' : 'ایمیل'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* وضعیت درخواست */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">وضعیت درخواست</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">وضعیت:</span>
                      <span className={`mr-2 px-3 py-1 rounded-full text-sm font-medium ${trackingData.status_class}`}>
                        {trackingData.status_text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* پیام */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">پیام شما</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{trackingData.message}</p>
                </div>
              </div>

              {/* یادداشت ادمین */}
              {trackingData.admin_notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">یادداشت تیم پشتیبانی</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                    <p className="text-gray-900 whitespace-pre-wrap">{trackingData.admin_notes}</p>
                  </div>
                </div>
              )}

              {/* تاریخ‌ها */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <span>تاریخ ثبت:</span>
                    <span className="mr-2 font-medium">{formatDate(trackingData.created_at)}</span>
                  </div>
                  <div>
                    <span>آخرین به‌روزرسانی:</span>
                    <span className="mr-2 font-medium">{formatDate(trackingData.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 