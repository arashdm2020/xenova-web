import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'doc', 'xenova.json');
    const xenovaData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    return NextResponse.json({
      success: true,
      data: xenovaData
    });
  } catch (error) {
    console.error('خطا در خواندن فایل xenova.json:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'خطا در بارگذاری داده‌ها' 
      },
      { status: 500 }
    );
  }
} 