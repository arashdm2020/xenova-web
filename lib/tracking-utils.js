/**
 * تولید کد پیگیری منحصر به فرد
 * فرمت: XE + 15 رقم تصادفی
 */
function generateTrackingCode() {
  // تولید 15 رقم تصادفی
  const randomDigits = Math.floor(Math.random() * 900000000000000) + 100000000000000;
  return `XE${randomDigits}`;
}

/**
 * بررسی یکتا بودن کد پیگیری
 */
function isTrackingCodeUnique(db, trackingCode) {
  const result = db.prepare('SELECT COUNT(*) as count FROM investment_requests WHERE tracking_code = ?').get(trackingCode);
  return result.count === 0;
}

/**
 * تولید کد پیگیری یکتا
 */
function generateUniqueTrackingCode(db) {
  let trackingCode;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    trackingCode = generateTrackingCode();
    attempts++;
    
    if (attempts > maxAttempts) {
      throw new Error('خطا در تولید کد پیگیری یکتا');
    }
  } while (!isTrackingCodeUnique(db, trackingCode));

  return trackingCode;
}

/**
 * تبدیل وضعیت به متن فارسی
 */
function getStatusText(status) {
  const statusMap = {
    'registered': 'ثبت شده',
    'reviewing': 'در حال بررسی',
    'completed': 'تکمیل شده',
    'contact_scheduled': 'هماهنگ شده برای تماس',
    'rejected': 'رد شده'
  };
  
  return statusMap[status] || status;
}

/**
 * تبدیل وضعیت به کلاس CSS
 */
function getStatusClass(status) {
  const classMap = {
    'registered': 'bg-blue-100 text-blue-800',
    'reviewing': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'contact_scheduled': 'bg-purple-100 text-purple-800',
    'rejected': 'bg-red-100 text-red-800'
  };
  
  return classMap[status] || 'bg-gray-100 text-gray-800';
}

module.exports = {
  generateUniqueTrackingCode,
  getStatusText,
  getStatusClass
}; 