import { NextResponse } from 'next/server';
const Database = require('better-sqlite3');
const path = require('path');

// اتصال به پایگاه داده
function getDatabase() {
  const dbPath = path.join(process.cwd(), 'xenova.db');
  return new Database(dbPath);
}

export async function POST(request) {
  try {
    const { page_type, user_agent, ip_address } = await request.json();
    
    const db = getDatabase();
    
    // ثبت بازدید
    const result = db.prepare(`
      INSERT INTO page_visits (page_type, user_agent, ip_address, visited_at)
      VALUES (?, ?, ?, DATETIME('now'))
    `).run(page_type, user_agent, ip_address);
    
    db.close();
    
    // اطلاع‌رسانی به ربات تلگرام (فقط برای بازدیدهای مهم)
    if (page_type === 'contact' || page_type === 'investment') {
      try {
        const { notifyNewVisit } = await import('../../../bot/telegram-bot.js');
        await notifyNewVisit({ page_type, user_agent, ip_address });
      } catch (botError) {
        console.error('خطا در اطلاع‌رسانی ربات:', botError);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'بازدید ثبت شد',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('خطا در ثبت بازدید:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در ثبت بازدید' },
      { status: 500 }
    );
  }
} 