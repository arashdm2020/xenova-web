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
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    let query = 'SELECT * FROM site_content';
    let params = [];

    if (section) {
      query += ' WHERE section = ?';
      params.push(section);
    }

    query += ' ORDER BY order_index ASC';

    const stmt = db.prepare(query);
    const content = stmt.all(...params);
    
    db.close();

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('خطا در دریافت محتوا:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت محتوا' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const db = getDatabase();
    const body = await request.json();
    const { section, title, content, order_index = 0 } = body;

    if (!section || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'اطلاعات ناکافی' },
        { status: 400 }
      );
    }

    const stmt = db.prepare(`
      INSERT INTO site_content (section, title, content, order_index) 
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(section, title, content, order_index);
    db.close();

    return NextResponse.json({ 
      success: true, 
      data: { id: result.lastInsertRowid } 
    });
  } catch (error) {
    console.error('خطا در ذخیره محتوا:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در ذخیره محتوا' },
      { status: 500 }
    );
  }
}