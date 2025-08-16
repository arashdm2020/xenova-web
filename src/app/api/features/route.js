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
    const db = getDatabase();
    
    const stmt = db.prepare('SELECT * FROM product_features ORDER BY order_index ASC');
    const features = stmt.all();
    
    db.close();

    return NextResponse.json({ success: true, data: features });
  } catch (error) {
    console.error('خطا در دریافت ویژگی‌ها:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت ویژگی‌ها' },
      { status: 500 }
    );
  }
}