const Database = require('better-sqlite3');
const path = require('path');

// ایجاد اتصال به پایگاه داده
const dbPath = path.join(process.cwd(), 'xenova.db');
const db = new Database(dbPath);

// ایجاد جداول
function initializeDatabase() {
  // جدول محتوای سایت
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول اعضای تیم
  db.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      bio TEXT,
      image_url TEXT,
      linkedin_url TEXT,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول درخواست‌های اطلاعات سرمایه‌گذاری
  db.exec(`
    CREATE TABLE IF NOT EXISTS investment_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_code TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company_position TEXT,
      mobile_phone TEXT NOT NULL,
      message TEXT,
      investment_amount_range TEXT,
      investment_type TEXT,
      contact_preference TEXT DEFAULT 'phone',
      status TEXT DEFAULT 'registered',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول ویژگی‌های محصول
  db.exec(`
    CREATE TABLE IF NOT EXISTS product_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول اخبار
  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      news_code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT,
      image_url TEXT,
      author TEXT DEFAULT 'تیم زینوا',
      status TEXT DEFAULT 'published',
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول بروزرسانی‌های سیستم
  db.exec(`
    CREATE TABLE IF NOT EXISTS updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version_number TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      release_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'released',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // درج داده‌های اولیه
  insertInitialData();
}

function insertInitialData() {
  // بررسی وجود داده‌های اولیه
  const existingContent = db.prepare('SELECT COUNT(*) as count FROM site_content').get();
  
  if (existingContent.count === 0) {
    // درج محتوای اولیه
    const insertContent = db.prepare(`
      INSERT INTO site_content (section, title, content, order_index) 
      VALUES (?, ?, ?, ?)
    `);

    // محتوای صفحه اصلی
    insertContent.run('homepage', 'عنوان اصلی', 'زینوا: پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده', 1);
    insertContent.run('homepage', 'توضیح کوتاه', 'راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها با استفاده از هوش مصنوعی و شبیه‌سازی پیشرفته', 2);
    
    // ویژگی‌های محصول
    const insertFeature = db.prepare(`
      INSERT INTO product_features (title, description, icon, order_index) 
      VALUES (?, ?, ?, ?)
    `);

    insertFeature.run(
      'کاهش هزینه و زمان',
      'کاهش ۳۰ تا ۵۰ درصدی زمان و ۲۰ تا ۴۰ درصدی هزینه‌های غربالگری اولیه داروها',
      'fas fa-chart-line',
      1
    );

    insertFeature.run(
      'شبیه‌سازی دقیق',
      'شبیه‌سازی مسیر کامل دارو از لحظه ورود به بدن تا اتصال به گیرنده هدف',
      'fas fa-microscope',
      2
    );

    insertFeature.run(
      'هوش مصنوعی پیشرفته',
      'استفاده از الگوریتم‌های یادگیری ماشین برای پیش‌بینی دقیق‌تر نتایج',
      'fas fa-brain',
      3
    );

    insertFeature.run(
      'یکپارچگی بی‌نظیر',
      'تلفیق مدل‌سازی دینامیک مولکولی، داکینگ هوشمند و تحلیل‌های فارماکوکینتیکی',
      'fas fa-puzzle-piece',
      4
    );

    // درج اخبار اولیه
    const insertNews = db.prepare(`
      INSERT INTO news (news_code, title, content, summary, author, published_at) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertNews.run(
      'XN-001',
      'شروع رسمی پروژه زینوا: پلتفرم هوشمند ردیابی مسیر دارو',
      'تیم زینوا با افتخار اعلام می‌کند که پروژه توسعه پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده به طور رسمی آغاز شده است. این پروژه انقلابی که با هدف کاهش ۳۰ تا ۵۰ درصدی زمان و ۲۰ تا ۴۰ درصدی هزینه‌های غربالگری اولیه داروها طراحی شده، گامی مهم در جهت تحول صنعت داروسازی ایران محسوب می‌شود.\n\nپلتفرم زینوا با یکپارچه‌سازی مدل‌سازی دینامیک مولکولی (MD)، داکینگ مولکولی هوشمند و تحلیل‌های فارماکوکینتیکی (PK)، قادر خواهد بود مسیر کامل یک دارو را از لحظه ورود به بدن تا اتصال به گیرنده هدف، شبیه‌سازی و تحلیل کند.\n\nاین پروژه با سرمایه‌گذاری ۱۳.۵ میلیارد تومانی و برنامه زمان‌بندی ۲۴ ماهه، بر پایه یک زیرساخت فنی قدرتمند بنا شده و تیم متخصصی از پژوهشگران و مهندسان نرم‌افزار در حال کار بر روی آن هستند.',
      'آغاز رسمی پروژه زینوا با هدف تحول صنعت داروسازی ایران',
      'تیم زینوا',
      '2025-03-21 10:00:00'
    );

    insertNews.run(
      'XN-002',
      'تکمیل فاز اول پروژه: پایه‌ریزی و طراحی معماری سیستم',
      'تیم توسعه زینوا با موفقیت فاز اول پروژه را به پایان رساند. در این فاز که از فروردین تا خرداد ۱۴۰۴ به طول انجامید، تحلیل دقیق نیاز بازار، طراحی معماری نهایی، انتخاب ابزارها و برنامه‌ریزی مالی انجام شد.\n\nدر این مرحله، تیم هسته فنی تشکیل شد و متخصصان در حوزه‌های مختلف از جمله دینامیک مولکولی، داکینگ مولکولی، هوش مصنوعی و توسعه نرم‌افزار به پروژه پیوستند. همچنین زیرساخت‌های فنی مورد نیاز شامل سرورهای پردازشی قدرتمند و کارت‌های گرافیک NVIDIA انتخاب و تهیه شد.\n\nاین موفقیت، پایه محکمی برای فاز دوم پروژه که شامل توسعه MVP است، فراهم کرده است.',
      'تکمیل موفقیت‌آمیز فاز اول پروژه زینوا',
      'تیم زینوا',
      '2025-06-15 14:30:00'
    );

    insertNews.run(
      'XN-003',
      'توسعه MVP زینوا: پیاده‌سازی ماژول‌های اصلی',
      'تیم زینوا در حال حاضر در فاز دوم پروژه قرار دارد و پیشرفت قابل توجهی در توسعه محصول حداقلی قابل عرضه (MVP) داشته است. در این مرحله، ماژول‌های اصلی پلتفرم شامل تحلیل‌های فارماکوکینتیکی پایه، هسته شبیه‌سازی دینامیک مولکولی و داکینگ هوشمند اولیه پیاده‌سازی شده‌اند.\n\nیکی از دستاوردهای مهم این فاز، یکپارچه‌سازی موفق ماژول‌های PK، MD و داکینگ در یک چارچوب نرم‌افزاری واحد است. این یکپارچگی بی‌نظیر، امکان شبیه‌سازی مسیر کامل حرکت دارو از ورود به بدن تا اتصال به گیرنده هدف را فراهم می‌کند.\n\nتیم توسعه همچنین موفق به تولید گزارش‌های بصری و نمودارهای غلظت-زمان شده است که به کاربران امکان درک بهتر نتایج شبیه‌سازی‌ها را می‌دهد.',
      'پیشرفت قابل توجه در توسعه MVP زینوا',
      'تیم زینوا',
      '2025-07-10 09:15:00'
    );

    insertNews.run(
      'XN-004',
      'اعتبارسنجی اولیه: مقایسه نتایج با داده‌های تجربی',
      'تیم زینوا شروع به اعتبارسنجی نتایج پلتفرم با داده‌های تجربی کرده است. در این مرحله، نتایج شبیه‌سازی‌های انجام شده با داده‌های واقعی مقایسه می‌شود تا دقت و اعتبار مدل‌های استفاده شده تأیید شود.\n\nاین فرآیند اعتبارسنجی شامل مقایسه با ابزارهای مرجع صنعتی و اجرای مطالعات موردی روی داروهای تأییدشده با مسیرهای شناخته‌شده است. نتایج اولیه نشان‌دهنده دقت بالای الگوریتم‌های توسعه یافته است.\n\nهمچنین، تیم در حال بهینه‌سازی الگوریتم‌های هوش مصنوعی برای بهبود دقت پیش‌بینی‌ها و کاهش زمان محاسبات است. این بهینه‌سازی‌ها منجر به بهبود قابل توجه در عملکرد کلی پلتفرم خواهد شد.',
      'شروع فرآیند اعتبارسنجی نتایج زینوا',
      'تیم زینوا',
      '2025-08-05 16:45:00'
    );

    insertNews.run(
      'XN-005',
      'آماده‌سازی برای ورود به بازار: توسعه نسخه ابری',
      'تیم زینوا در حال آماده‌سازی پلتفرم برای ورود به بازار است. در این مرحله، توسعه نسخه ابری پایه، تکمیل مستندات و راه‌اندازی وبسایت در دستور کار قرار دارد.\n\nیکی از دستاوردهای مهم این فاز، توسعه رابط کاربری کاربرپسند است که به کاربران امکان استفاده آسان از قابلیت‌های پیشرفته پلتفرم را می‌دهد. همچنین، سیستم مدیریت کاربران و احراز هویت امن پیاده‌سازی شده است.\n\nتیم همچنین در حال مذاکره با مشتریان اولیه و شرکت‌های دارویی برای ارائه نسخه آزمایشی پلتفرم است. این مذاکرات نشان‌دهنده علاقه قابل توجه صنعت به فناوری‌های نوین در حوزه داروسازی است.',
      'آماده‌سازی زینوا برای ورود به بازار',
      'تیم زینوا',
      '2025-08-20 11:20:00'
    );

    // درج بروزرسانی‌های اولیه سیستم
    const insertUpdate = db.prepare(`
      INSERT INTO updates (version_number, title, description, release_date) 
      VALUES (?, ?, ?, ?)
    `);

    insertUpdate.run(
      'v1.0.0',
      'نسخه اولیه MVP',
      'پیاده‌سازی ماژول‌های اصلی PK، MD و داکینگ هوشمند. یکپارچه‌سازی اولیه سیستم و تولید گزارش‌های بصری پایه.',
      '2025-03-21 10:00:00'
    );

    insertUpdate.run(
      'v1.1.0',
      'بهبود الگوریتم‌های داکینگ',
      'بهینه‌سازی الگوریتم‌های هوش مصنوعی برای دقت بیشتر در پیش‌بینی اتصال دارو-گیرنده. بهبود سرعت محاسبات تا ۳۰٪.',
      '2025-04-15 14:30:00'
    );

    insertUpdate.run(
      'v1.2.0',
      'اضافه شدن ماژول ADME',
      'پیاده‌سازی کامل ماژول تحلیل ADME برای پیش‌بینی جذب، توزیع، متابولیسم و دفع داروها.',
      '2025-05-20 09:15:00'
    );

    insertUpdate.run(
      'v1.3.0',
      'بهبود رابط کاربری',
      'طراحی مجدد رابط کاربری با تمرکز بر تجربه کاربری بهتر. اضافه شدن داشبورد تحلیلی و نمودارهای تعاملی.',
      '2025-06-10 16:45:00'
    );

    insertUpdate.run(
      'v1.4.0',
      'پشتیبانی از GPU',
      'بهینه‌سازی محاسبات برای استفاده از کارت‌های گرافیک NVIDIA. افزایش سرعت شبیه‌سازی‌ها تا ۱۰ برابر.',
      '2025-07-05 11:20:00'
    );

    insertUpdate.run(
      'v1.5.0',
      'بانک داده مولکولی',
      'ایجاد بانک داده اختصاصی از مسیرهای حرکتی و انرژی‌های اتصال داروها. پشتیبانی از بیش از ۱۰۰۰ ترکیب دارویی.',
      '2025-08-01 13:00:00'
    );

    insertUpdate.run(
      'v2.0.0',
      'نسخه تجاری',
      'انتشار نسخه تجاری کامل با تمام قابلیت‌ها. پشتیبانی از API، سیستم احراز هویت و مدیریت کاربران.',
      '2025-07-15 10:30:00'
    );

    insertUpdate.run(
      'v2.1.0',
      'بهبود دقت پیش‌بینی',
      'اعتبارسنجی و بهبود مدل‌های یادگیری ماشین. افزایش دقت پیش‌بینی‌ها تا ۹۵٪ در مقایسه با داده‌های تجربی.',
      '2025-08-10 15:45:00'
    );
  }
}

// راه‌اندازی پایگاه داده
initializeDatabase();

module.exports = db;