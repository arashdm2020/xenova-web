import { NextResponse } from 'next/server';
const Database = require('better-sqlite3');
const path = require('path');
const { getStatusText, getStatusClass } = require('../../../../lib/tracking-utils.js');

// اتصال به پایگاه داده
function getDatabase() {
  const dbPath = path.join(process.cwd(), 'xenova.db');
  return new Database(dbPath);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingCode = searchParams.get('code');

    if (!trackingCode) {
      return NextResponse.json(
        { success: false, error: 'کد پیگیری الزامی است' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // جستجوی درخواست بر اساس کد پیگیری
    const result = db.prepare(`
      SELECT * FROM investment_requests 
      WHERE tracking_code = ?
    `).get(trackingCode);

    db.close();

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'درخواستی با این کد پیگیری یافت نشد' },
        { status: 404 }
      );
    }

    // تبدیل وضعیت به متن فارسی
    const statusText = getStatusText(result.status);
    const statusClass = getStatusClass(result.status);

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        status_text: statusText,
        status_class: statusClass
      }
    });

  } catch (error) {
    console.error('خطا در پیگیری وضعیت:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در پیگیری وضعیت' },
      { status: 500 }
    );
  }
} 