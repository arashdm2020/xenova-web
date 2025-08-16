# زینوا - پلتفرم هوشمند توسعه دارو

وبسایت رسمی پلتفرم زینوا، یک راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها با استفاده از هوش مصنوعی و شبیه‌سازی پیشرفته.

## ویژگی‌های کلیدی

- **طراحی فارسی**: کاملاً به زبان فارسی با فونت Vazirmatn
- **طراحی ریسپانسیو**: سازگار با تمام اندازه‌های صفحه
- **انیمیشن‌های روان**: استفاده از Tailwind CSS برای انیمیشن‌های زیبا
- **پایگاه داده SQLite**: ذخیره محتوا و پیام‌های کاربران
- **API Routes**: مدیریت داده‌ها و فرم‌ها
- **فرم تماس پیشرفته**: با قابلیت علاقه‌مندی به همکاری

## صفحات

1. **خانه** (`/`) - معرفی پلتفرم و ویژگی‌های کلیدی
2. **درباره ما** (`/about`) - جزئیات فناوری و معماری سیستم
3. **سرمایه‌گذاری** (`/investment`) - اطلاعات مالی و فرصت‌های سرمایه‌گذاری
4. **تماس با ما** (`/contact`) - فرم تماس و اطلاعات ارتباطی

## فناوری‌های استفاده شده

- **Next.js 15** - فریمورک React
- **TypeScript** - برای type safety
- **Tailwind CSS 4** - برای استایل‌دهی
- **Vazirmatn Font** - فونت فارسی
- **Font Awesome** - آیکون‌ها
- **SQLite** - پایگاه داده
- **Better-SQLite3** - درایور پایگاه داده

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn

### مراحل نصب

1. **کلون کردن پروژه**
   ```bash
   git clone <repository-url>
   cd xenova-app
   ```

2. **نصب وابستگی‌ها**
   ```bash
   npm install
   ```

3. **راه‌اندازی پایگاه داده**
   ```bash
   node -e "require('./lib/database.js'); console.log('Database initialized successfully');"
   ```

4. **اجرای سرور توسعه**
   ```bash
   npm run dev
   ```

5. **مشاهده وبسایت**
   
   وبسایت در آدرس `http://localhost:3000` در دسترس خواهد بود.

### اجرای پروداکشن

1. **ساخت پروژه**
   ```bash
   npm run build
   ```

2. **اجرای سرور پروداکشن**
   ```bash
   npm start
   ```

## ساختار پروژه

```
xenova-app/
├── src/
│   ├── app/                    # صفحات و layout
│   │   ├── about/             # صفحه درباره ما
│   │   ├── contact/           # صفحه تماس
│   │   ├── investment/        # صفحه سرمایه‌گذاری
│   │   ├── api/               # API routes
│   │   │   ├── contact/       # API فرم تماس
│   │   │   ├── content/       # API محتوا
│   │   │   └── features/      # API ویژگی‌ها
│   │   ├── globals.css        # استایل‌های سراسری
│   │   ├── layout.tsx         # Layout اصلی
│   │   └── page.tsx           # صفحه اصلی
│   └── components/            # کامپوننت‌های مشترک
│       ├── Header.jsx         # هدر سایت
│       └── Footer.jsx         # فوتر سایت
├── lib/
│   └── database.js            # تنظیمات پایگاه داده
├── public/                    # فایل‌های استاتیک
├── doc/                       # مستندات پروژه
│   ├── Xenova.pdf
│   └── Xenova.txt
├── tailwind.config.js         # تنظیمات Tailwind
├── package.json
└── README.md
```

## API Endpoints

### محتوا
- `GET /api/content` - دریافت محتوای سایت
- `POST /api/content` - افزودن محتوای جدید

### ویژگی‌ها
- `GET /api/features` - دریافت ویژگی‌های محصول

### تماس
- `POST /api/contact` - ارسال پیام تماس
- `GET /api/contact` - دریافت پیام‌ها (برای مدیریت)

## پایگاه داده

پروژه از SQLite استفاده می‌کند با جداول زیر:

- `site_content` - محتوای سایت
- `product_features` - ویژگی‌های محصول
- `contact_messages` - پیام‌های تماس
- `team_members` - اعضای تیم

## تنظیمات

### فونت فارسی
فونت Vazirmatn به صورت خودکار بارگذاری و تنظیم می‌شود.

### رنگ‌بندی
رنگ‌های اصلی پروژه در `tailwind.config.js` تعریف شده‌اند:
- Primary: آبی (#0ea5e9)
- Secondary: خاکستری (#64748b)

### انیمیشن‌ها
انیمیشن‌های سفارشی شامل:
- `fade-in` - محو شدن تدریجی
- `slide-up` - حرکت از پایین به بالا
- `bounce-slow` - پرش آهسته

## مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. برنچ جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## تماس

برای سوالات و پیشنهادات:
- ایمیل: info@xenova.ir
- وبسایت: [xenova.ir](https://xenova.ir)

---

**زینوا - سرمایه‌گذاری در آینده هوشمند طراحی دارو**