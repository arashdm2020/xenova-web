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
    const limit = searchParams.get('limit') || 8; // تعداد بروزرسانی‌ها پیش‌فرض
    const offset = searchParams.get('offset') || 0;
    const versionNumber = searchParams.get('version'); // برای دریافت بروزرسانی خاص

    const db = getDatabase();
    
    let result;
    
    if (versionNumber) {
      // دریافت بروزرسانی خاص بر اساس شماره نسخه
      result = db.prepare(`
        SELECT * FROM updates 
        WHERE version_number = ? AND status = 'released'
        ORDER BY release_date DESC
      `).get(versionNumber);
      
      db.close();
      
      if (!result) {
        return NextResponse.json(
          { success: false, error: 'بروزرسانی با این شماره نسخه یافت نشد' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: result
      });
    } else {
      // دریافت لیست بروزرسانی‌ها
      result = db.prepare(`
        SELECT id, version_number, title, description, release_date
        FROM updates 
        WHERE status = 'released'
        ORDER BY release_date DESC
        LIMIT ? OFFSET ?
      `).all(parseInt(limit), parseInt(offset));
      
      // تعداد کل بروزرسانی‌ها
      const totalCount = db.prepare(`
        SELECT COUNT(*) as count FROM updates WHERE status = 'released'
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
    console.error('خطا در دریافت بروزرسانی‌ها:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت بروزرسانی‌ها' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { version_number, title, description } = body;

    if (!version_number || !title || !description) {
      return NextResponse.json(
        { success: false, error: 'شماره نسخه، عنوان و توضیحات الزامی است' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const insertUpdate = db.prepare(`
      INSERT INTO updates (version_number, title, description, status)
      VALUES (?, ?, ?, 'released')
    `);
    
    const result = insertUpdate.run(version_number, title, description);
    
    db.close();
    
    return NextResponse.json({
      success: true,
      message: 'بروزرسانی با موفقیت اضافه شد',
      data: {
        id: result.lastInsertRowid,
        version_number: version_number
      }
    });

  } catch (error) {
    console.error('خطا در افزودن بروزرسانی:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در افزودن بروزرسانی' },
      { status: 500 }
    );
  }
} 