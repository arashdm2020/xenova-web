import { NextResponse } from 'next/server';

const Database = require('better-sqlite3');
const path = require('path');
const { generateUniqueTrackingCode } = require('../../../../lib/tracking-utils');

// اتصال به پایگاه داده
function getDatabase() {
  const dbPath = path.join(process.cwd(), 'xenova.db');
  return new Database(dbPath);
}

export async function POST(request) {
  try {
    const db = getDatabase();
    const body = await request.json();
    const { 
      full_name, 
      email, 
      company_position, 
      mobile_phone, 
      message, 
      contact_preference = 'phone'
    } = body;

    // اعتبارسنجی داده‌ها
    if (!full_name || !email || !mobile_phone) {
      return NextResponse.json(
        { success: false, error: 'لطفاً فیلدهای ضروری (نام، ایمیل و شماره موبایل) را پر کنید' },
        { status: 400 }
      );
    }

    // بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'فرمت ایمیل صحیح نیست' },
        { status: 400 }
      );
    }

    // بررسی فرمت شماره موبایل
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!phoneRegex.test(mobile_phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'شماره موبایل صحیح نیست' },
        { status: 400 }
      );
    }

    // بررسی وجود درخواست قبلی با همین ایمیل یا شماره موبایل
    const existingEmailRequest = db.prepare(`
      SELECT id, tracking_code, status, created_at FROM investment_requests 
      WHERE email = ? ORDER BY created_at DESC LIMIT 1
    `).get(email);

    if (existingEmailRequest) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'شما قبلاً با این ایمیل درخواست اطلاعات سرمایه‌گذاری ثبت کرده‌اید.',
          tracking_code: existingEmailRequest.tracking_code,
          status: existingEmailRequest.status
        },
        { status: 409 }
      );
    }

    const existingPhoneRequest = db.prepare(`
      SELECT id, tracking_code, status, created_at FROM investment_requests 
      WHERE mobile_phone = ? ORDER BY created_at DESC LIMIT 1
    `).get(mobile_phone);

    if (existingPhoneRequest) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'شما قبلاً با این شماره موبایل درخواست اطلاعات سرمایه‌گذاری ثبت کرده‌اید.',
          tracking_code: existingPhoneRequest.tracking_code,
          status: existingPhoneRequest.status
        },
        { status: 409 }
      );
    }

    // تولید کد پیگیری یکتا
    const trackingCode = generateUniqueTrackingCode(db);
    
    // درج درخواست در پایگاه داده
    const stmt = db.prepare(`
      INSERT INTO investment_requests (
        tracking_code, full_name, email, company_position, mobile_phone, message, 
        contact_preference, status
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'registered')
    `);
    
    const result = stmt.run(
      trackingCode, 
      full_name, 
      email, 
      company_position || null, 
      mobile_phone, 
      message || null,
      contact_preference
    );
    db.close();

    // اطلاع‌رسانی به ربات تلگرام
    try {
      const { notifyNewForm } = await import('../../../bot/telegram-bot.js');
      await notifyNewForm({
        full_name,
        email,
        company_position,
        mobile_phone,
        message,
        investment_amount_range: null,
        investment_type: null,
        contact_preference
      }, 'investment');
    } catch (botError) {
      console.error('خطا در اطلاع‌رسانی ربات:', botError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'درخواست اطلاعات سرمایه‌گذاری شما با موفقیت ثبت شد. کد پیگیری شما: ' + trackingCode,
      data: { 
        id: result.lastInsertRowid,
        tracking_code: trackingCode
      } 
    });
  } catch (error) {
    console.error('خطا در ارسال پیام:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = 'SELECT * FROM investment_requests';
    let params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    const requests = stmt.all(...params);
    
    db.close();

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error('خطا در دریافت درخواست‌ها:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت درخواست‌ها' },
      { status: 500 }
    );
  }
}