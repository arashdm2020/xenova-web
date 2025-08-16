import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// تابع پاسخ محلی بر اساس کلمات کلیدی
function generateLocalResponse(message, xenovaData) {
  const lowerMessage = message.toLowerCase();
  
  // سلام و خوشامدگویی
  if (lowerMessage.includes('سلام') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('درود')) {
    return 'سلام! من هوش مصنوعی زینوا هستم. چطور می‌تونم کمکتون کنم؟ می‌تونید درباره پلتفرم زینوا، فناوری‌ها، هزینه‌ها، زمان‌بندی و هر چیز دیگه‌ای سوال بپرسید.\n\n🔹 سوالات پیشنهادی:\n• زینوا چیست؟\n• هزینه پروژه چقدر است؟\n• زمان‌بندی پروژه\n• مزایای زینوا\n• تیم توسعه';
  }
  
  // زینوا چیست
  if (lowerMessage.includes('زینوا چیست') || lowerMessage.includes('زینوا چی') || lowerMessage.includes('xenova')) {
    return `زینوا یک پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده است.

${xenovaData.project_summary?.abstract || 'این پلتفرم با یکپارچه‌سازی مدل‌سازی دینامیک مولکولی (MD)، داکینگ مولکولی هوشمند و تحلیل‌های فارماکوکینتیکی (PK)، مسیر کامل یک دارو را از لحظه ورود به بدن تا اتصال به گیرنده هدف، شبیه‌سازی و تحلیل می‌کند.'}

مزایای کلیدی:
• کاهش ۳۰-۵۰٪ زمان توسعه دارو
• کاهش ۲۰-۴۰٪ هزینه‌های پیش‌بالینی
• افزایش نرخ موفقیت داروها`;
  }
  
  // هزینه و قیمت
  if (lowerMessage.includes('هزینه') || lowerMessage.includes('قیمت') || lowerMessage.includes('سرمایه')) {
    const totalCost = xenovaData.cost_estimation?.total || '۱۳.۵ میلیارد تومان';
    return `هزینه کل پروژه زینوا ${totalCost} برآورد شده است.

تفکیک هزینه‌ها:
• نیروی انسانی: ۶۸۰ میلیون تومان
• تجهیزات سخت‌افزاری: ۹.۵ میلیارد تومان  
• نرم‌افزار و مجوزها: ۱.۱ میلیارد تومان
• سایر هزینه‌های عملیاتی: ۲.۲ میلیارد تومان

این سرمایه‌گذاری در مدت ۲۴ ماه انجام خواهد شد.`;
  }
  
  // زمان‌بندی
  if (lowerMessage.includes('زمان') || lowerMessage.includes('مدت') || lowerMessage.includes('چقدر طول')) {
    return `برنامه زمان‌بندی زینوا ۲۴ ماهه و در ۴ فاز تنظیم شده:

📅 **فاز ۱: پایه‌ریزی و طراحی** (۶ ماه)
تیر ۱۴۰۴ - آذر ۱۴۰۴

📅 **فاز ۲: توسعه MVP** (۶ ماه) - مرحله فعلی
دی ۱۴۰۴ - خرداد ۱۴۰۵

📅 **فاز ۳: اعتبارسنجی و بهینه‌سازی** (۶ ماه)
تیر ۱۴۰۵ - آذر ۱۴۰۵

📅 **فاز ۴: آماده‌سازی بازار** (۶ ماه)
دی ۱۴۰۵ - خرداد ۱۴۰۶

در حال حاضر در فاز دوم قرار داریم و MVP آماده شده است.`;
  }
  
  // تیم توسعه
  if (lowerMessage.includes('تیم') || lowerMessage.includes('سازنده') || lowerMessage.includes('توسعه‌دهنده')) {
    const advisors = xenovaData.development_team?.advisors || [];
    let teamInfo = 'تیم زینوا شامل متخصصان با تجربه است:\n\n';
    
    advisors.forEach(advisor => {
      teamInfo += `👨‍💻 **${advisor.name}**\n`;
      teamInfo += `نقش: ${advisor.role}\n`;
      teamInfo += `تجربه: ${advisor.experience}\n\n`;
    });
    
    return teamInfo;
  }
  
  // مزایا و ویژگی‌ها
  if (lowerMessage.includes('مزایا') || lowerMessage.includes('ویژگی') || lowerMessage.includes('فایده')) {
    return `مزایای کلیدی زینوا:

🎯 **کاهش زمان و هزینه:**
• ۳۰-۵۰٪ کاهش زمان غربالگری اولیه
• ۲۰-۴۰٪ کاهش هزینه‌های پیش‌بالینی

🔬 **فناوری پیشرفته:**
• یکپارچه‌سازی MD، داکینگ و تحلیل PK
• استفاده از هوش مصنوعی برای دقت بیشتر
• شبیه‌سازی کامل مسیر دارو در بدن

💡 **نوآوری:**
• پیش‌بینی عبور از سد خونی-مغزی
• محاسبه انرژی‌های اتصال دارو-گیرنده
• شناسایی زودهنگام ترکیبات ناموفق`;
  }
  
  // اخبار و بروزرسانی‌ها
  if (lowerMessage.includes('خبر') || lowerMessage.includes('اخبار') || lowerMessage.includes('جدید') || lowerMessage.includes('آخرین')) {
    const news = getLatestNews();
    const updates = getLatestUpdates();
    
    let response = '📰 **آخرین اخبار و بروزرسانی‌های زینوا:**\n\n';
    
    if (news.length > 0) {
      response += '📋 **اخبار اخیر:**\n';
      news.forEach((item, index) => {
        const date = new Date(item.published_at).toLocaleDateString('fa-IR');
        response += `${index + 1}. **${item.news_code}** - ${item.title}\n`;
        response += `   📅 ${date}\n`;
        if (item.summary) {
          response += `   📝 ${item.summary}\n`;
        }
        response += '\n';
      });
    }
    
    if (updates.length > 0) {
      response += '🔄 **بروزرسانی‌های سیستم:**\n';
      updates.forEach((item, index) => {
        const date = new Date(item.release_date).toLocaleDateString('fa-IR');
        response += `${index + 1}. **${item.version_number}** - ${item.title}\n`;
        response += `   📅 ${date}\n`;
        response += `   📝 ${item.description}\n\n`;
      });
    }
    
    if (news.length === 0 && updates.length === 0) {
      response = 'در حال حاضر خبر یا بروزرسانی جدیدی برای نمایش وجود ندارد.';
    }
    
    return response;
  }
  
  // پاسخ عمومی برای سوالات ناشناخته
  return `متأسفانه نتوانستم سوال شما را به طور دقیق تشخیص دهم. 

من فقط درباره پروژه زینوا اطلاعات دارم. لطفاً یکی از موضوعات زیر را انتخاب کنید:

🔍 **موضوعات قابل پاسخ:**
• معرفی زینوا و اهداف پروژه
• هزینه‌ها و سرمایه‌گذاری مورد نیاز
• زمان‌بندی و مراحل توسعه
• مزایا و ویژگی‌های فنی
• تیم توسعه و متخصصان
• اخبار و بروزرسانی‌های اخیر

💡 **مثال سوالات:**
"زینوا چیست؟" یا "هزینه پروژه چقدر است؟" یا "اخبار اخیر زینوا چیست؟"`;  // اگر هیچ کلمه کلیدی پیدا نشد
}

// تابع خواندن اخبار از دیتابیس
function getLatestNews() {
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const news = db.prepare(`
      SELECT news_code, title, summary, published_at 
      FROM news 
      WHERE status = 'published' 
      ORDER BY published_at DESC 
      LIMIT 5
    `).all();
    
    db.close();
    return news;
  } catch (error) {
    console.error('خطا در خواندن اخبار:', error);
    return [];
  }
}

// تابع خواندن بروزرسانی‌ها از دیتابیس
function getLatestUpdates() {
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const updates = db.prepare(`
      SELECT version_number, title, description, release_date 
      FROM updates 
      WHERE status = 'released' 
      ORDER BY release_date DESC 
      LIMIT 5
    `).all();
    
    db.close();
    return updates;
  } catch (error) {
    console.error('خطا در خواندن بروزرسانی‌ها:', error);
    return [];
  }
}

export async function POST(request) {
  let message = '';
  let xenovaData = null;
  
  try {
    const requestData = await request.json();
    message = requestData.message;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'پیام نمی‌تواند خالی باشد' },
        { status: 400 }
      );
    }

    // خواندن فایل xenova.json
    const filePath = path.join(process.cwd(), 'doc', 'xenova.json');
    xenovaData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // بررسی API key
    console.log('API key length:', OPENAI_API_KEY ? OPENAI_API_KEY.length : 0);
    console.log('API key starts with:', OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 10) : 'null');
    
    if (!OPENAI_API_KEY || OPENAI_API_KEY.length < 50) {
      console.error('Invalid API key - length:', OPENAI_API_KEY ? OPENAI_API_KEY.length : 0);
      throw new Error('API key issue');
    }

    // خواندن اخبار و بروزرسانی‌ها از دیتابیس
    const latestNews = getLatestNews();
    const latestUpdates = getLatestUpdates();
    
    // ایجاد context برای ChatGPT
    const systemPrompt = `شما یک هوش مصنوعی متخصص پروژه زینوا هستید. زینوا یک پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده است.

شما باید بر اساس دانش و اطلاعات موجود در فایل xenova.json پاسخ دهید، اما:

قوانین مهم:
1. هرگز محتوای فایل را مستقیماً کپی نکنید
2. هرگز نگویید "بر اساس فایل xenova.json" یا "طبق فایل"
3. اطلاعات را به صورت طبیعی و استنباطی ارائه دهید
4. پاسخ‌های دقیق، مفصل و کاربردی ارائه دهید
5. در صورت امکان، از اعداد و آمارهای موجود استفاده کنید
6. اگر اطلاعات کافی برای پاسخ دقیق ندارید، صادقانه اعلام کنید
7. همه پاسخ‌ها باید به زبان فارسی باشند
8. فقط درباره پروژه زینوا صحبت کنید

نام شما: هوش مصنوعی زینوا
شخصیت: حرفه‌ای، دانشمند، مفید و صمیمی

اطلاعات کلیدی زینوا:
- پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو
- کاهش ۳۰-۵۰٪ زمان توسعه دارو
- کاهش ۲۰-۴۰٪ هزینه‌های پیش‌بالینی
- یکپارچه‌سازی MD، داکینگ مولکولی و تحلیل PK
- هزینه کل: ۱۳.۵ میلیارد تومان
- زمان‌بندی: ۲۴ ماه
- تیم متخصص با تجربه در حوزه‌های مختلف

${latestNews.length > 0 ? `\nاخبار اخیر زینوا:
${latestNews.map((item, index) => `${index + 1}. ${item.news_code} - ${item.title} (${new Date(item.published_at).toLocaleDateString('fa-IR')})`).join('\n')}` : ''}

${latestUpdates.length > 0 ? `\nبروزرسانی‌های اخیر سیستم:
${latestUpdates.map((item, index) => `${index + 1}. ${item.version_number} - ${item.title} (${new Date(item.release_date).toLocaleDateString('fa-IR')})`).join('\n')}` : ''}`;

    // ارسال درخواست به OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'خطا در ارتباط با سرویس هوش مصنوعی' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: 'پاسخی از سرویس هوش مصنوعی دریافت نشد' },
        { status: 500 }
      );
    }

    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString(),
      source: 'openai'
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // سیستم پاسخ محلی بر اساس کلمات کلیدی
    const localResponse = generateLocalResponse(message, xenovaData);
    
    const fallbackResponse = localResponse || `متأسفانه در حال حاضر مشکلی در اتصال به سرویس هوش مصنوعی وجود دارد. 

اما می‌توانم به صورت خلاصه بگویم که زینوا یک پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو است که:

• کاهش ۳۰-۵۰٪ زمان توسعه دارو
• کاهش ۲۰-۴۰٪ هزینه‌های پیش‌بالینی  
• یکپارچه‌سازی مدل‌سازی MD، داکینگ مولکولی و تحلیل PK
• استفاده از هوش مصنوعی برای بهبود دقت پیش‌بینی‌ها

برای اطلاعات کامل، لطفاً دوباره تلاش کنید یا با تیم ما تماس بگیرید.`;

    return NextResponse.json({
      success: true,
      message: fallbackResponse,
      timestamp: new Date().toISOString(),
      source: 'local_fallback'
    });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'این endpoint فقط درخواست‌های POST را پشتیبانی می‌کند' },
    { status: 405 }
  );
}