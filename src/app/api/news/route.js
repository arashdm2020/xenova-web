import { NextResponse } from 'next/server';
const Database = require('better-sqlite3');
const path = require('path');

// اتصال به پایگاه داده
function getDatabase() {
  const dbPath = path.join(process.cwd(), 'xenova.db');
  return new Database(dbPath);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || 6; // تعداد اخبار پیش‌فرض
    const offset = searchParams.get('offset') || 0;
    const newsCode = searchParams.get('code'); // برای دریافت خبر خاص

    const db = getDatabase();
    
    let result;
    
    if (newsCode) {
      // دریافت خبر خاص بر اساس کد
      result = db.prepare(`
        SELECT * FROM news 
        WHERE news_code = ? AND status = 'published'
        ORDER BY published_at DESC
      `).get(newsCode);
      
      db.close();
      
      if (!result) {
        return NextResponse.json(
          { success: false, error: 'خبری با این کد یافت نشد' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: result
      });
    } else {
      // دریافت لیست اخبار
      result = db.prepare(`
        SELECT id, news_code, title, summary, author, published_at, image_url
        FROM news 
        WHERE status = 'published'
        ORDER BY published_at DESC
        LIMIT ? OFFSET ?
      `).all(parseInt(limit), parseInt(offset));
      
      // تعداد کل اخبار
      const totalCount = db.prepare(`
        SELECT COUNT(*) as count FROM news WHERE status = 'published'
      `).get().count;
      
      db.close();
      
      return NextResponse.json({
        success: true,
        data: result,
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + parseInt(limit) < totalCount
        }
      });
    }

  } catch (error) {
    console.error('خطا در دریافت اخبار:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت اخبار' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, summary, image_url, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'عنوان و محتوا الزامی است' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // تولید کد خبر منحصر به فرد
    const timestamp = Date.now();
    const newsCode = `XN-${timestamp.toString().slice(-6)}`;
    
    const insertNews = db.prepare(`
      INSERT INTO news (news_code, title, content, summary, image_url, author, status)
      VALUES (?, ?, ?, ?, ?, ?, 'published')
    `);
    
    const result = insertNews.run(newsCode, title, content, summary || null, image_url || null, author || 'تیم زینوا');
    
    db.close();
    
    return NextResponse.json({
      success: true,
      message: 'خبر با موفقیت اضافه شد',
      data: {
        id: result.lastInsertRowid,
        news_code: newsCode
      }
    });

  } catch (error) {
    console.error('خطا در افزودن خبر:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در افزودن خبر' },
      { status: 500 }
    );
  }
} 