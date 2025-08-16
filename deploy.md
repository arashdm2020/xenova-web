# راهنمای راه‌اندازی پروژه زینوا روی سرور Ubuntu

این راهنما شامل تمام مراحل نصب و راه‌اندازی پروژه زینوا روی سرور Ubuntu است.

## پیش‌نیازها

### 1. نصب Node.js و npm

```bash
# به‌روزرسانی سیستم
sudo apt update && sudo apt upgrade -y

# نصب curl (در صورت عدم وجود)
sudo apt install curl -y

# نصب Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# بررسی نسخه‌های نصب شده
node --version
npm --version
```

### 2. نصب Git

```bash
# نصب Git
sudo apt install git -y

# تنظیم Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. نصب PM2 (Process Manager)

```bash
# نصب PM2 به صورت global
sudo npm install -g pm2

# بررسی نصب
pm2 --version
```

### 4. نصب Nginx (Web Server)

```bash
# نصب Nginx
sudo apt install nginx -y

# شروع سرویس Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# بررسی وضعیت
sudo systemctl status nginx
```

### 5. نصب UFW Firewall

```bash
# نصب و فعال‌سازی firewall
sudo apt install ufw -y
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# بررسی وضعیت
sudo ufw status
```

## راه‌اندازی پروژه

### 1. کلون کردن پروژه

```bash
# ایجاد دایرکتوری پروژه
mkdir -p /var/www
cd /var/www

# کلون کردن پروژه از GitHub
git clone https://github.com/arashdm2020/xenova-web.git
cd xenova-web
```

### 2. نصب وابستگی‌ها

```bash
# نصب وابستگی‌ها
npm install

# نصب وابستگی‌های production
npm ci --only=production
```

### 3. تنظیم متغیرهای محیطی

```bash
# ایجاد فایل .env.local
cat > .env.local << EOF
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Database
DATABASE_URL=./xenova.db

# Next.js
NODE_ENV=production
PORT=3000
EOF
```

### 4. راه‌اندازی پایگاه داده

```bash
# راه‌اندازی پایگاه داده SQLite
node -e "require('./lib/database.js'); console.log('Database initialized successfully');"
```

### 5. ساخت پروژه

```bash
# ساخت پروژه برای production
npm run build
```

### 6. راه‌اندازی با PM2

```bash
# ایجاد فایل ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'xenova-app',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/xenova-web',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# شروع اپلیکیشن با PM2
pm2 start ecosystem.config.js

# ذخیره تنظیمات PM2
pm2 save

# تنظیم PM2 برای شروع خودکار
pm2 startup
```

## تنظیم Nginx

### 1. ایجاد فایل تنظیمات Nginx

```bash
# ایجاد فایل تنظیمات
sudo nano /etc/nginx/sites-available/xenova-web
```

محتوای فایل:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS (اختیاری)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # تنظیمات برای فایل‌های استاتیک
    location /_next/static {
        alias /var/www/xenova-web/.next/static;
        expires 365d;
        access_log off;
    }

    # تنظیمات برای فایل‌های public
    location /public {
        alias /var/www/xenova-web/public;
        expires 30d;
        access_log off;
    }

    # تنظیمات امنیتی
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### 2. فعال‌سازی سایت

```bash
# فعال‌سازی سایت
sudo ln -s /etc/nginx/sites-available/xenova-web /etc/nginx/sites-enabled/

# حذف سایت پیش‌فرض (اختیاری)
sudo rm /etc/nginx/sites-enabled/default

# تست تنظیمات Nginx
sudo nginx -t

# راه‌اندازی مجدد Nginx
sudo systemctl restart nginx
```

## تنظیم SSL (HTTPS) - اختیاری

### 1. نصب Certbot

```bash
# نصب Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### 2. دریافت گواهی SSL

```bash
# دریافت گواهی SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# تنظیم تمدید خودکار
sudo crontab -e
# اضافه کردن خط زیر:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## مدیریت پروژه

### دستورات مفید PM2

```bash
# مشاهده وضعیت اپلیکیشن‌ها
pm2 status

# مشاهده لاگ‌ها
pm2 logs xenova-app

# راه‌اندازی مجدد اپلیکیشن
pm2 restart xenova-app

# توقف اپلیکیشن
pm2 stop xenova-app

# حذف اپلیکیشن
pm2 delete xenova-app
```

### به‌روزرسانی پروژه

```bash
# رفتن به دایرکتوری پروژه
cd /var/www/xenova-web

# دریافت تغییرات جدید
git pull origin main

# نصب وابستگی‌های جدید
npm install

# ساخت مجدد پروژه
npm run build

# راه‌اندازی مجدد با PM2
pm2 restart xenova-app
```

## نظارت و نگهداری

### 1. نظارت بر منابع سیستم

```bash
# نصب htop برای نظارت
sudo apt install htop -y

# اجرای htop
htop
```

### 2. نظارت بر لاگ‌ها

```bash
# لاگ‌های Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# لاگ‌های PM2
pm2 logs xenova-app
```

### 3. پشتیبان‌گیری

```bash
# ایجاد اسکریپت پشتیبان‌گیری
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/xenova"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# پشتیبان‌گیری از کد
tar -czf $BACKUP_DIR/xenova-code-$DATE.tar.gz /var/www/xenova-web

# پشتیبان‌گیری از پایگاه داده
cp /var/www/xenova-web/xenova.db $BACKUP_DIR/xenova-db-$DATE.db

# حذف فایل‌های قدیمی (بیش از 7 روز)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.db" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

# اعطای مجوز اجرا
chmod +x backup.sh

# اضافه کردن به crontab برای پشتیبان‌گیری روزانه
crontab -e
# اضافه کردن خط زیر:
# 0 2 * * * /var/www/xenova-web/backup.sh
```

## عیب‌یابی

### مشکلات رایج

1. **خطای Port در حال استفاده:**
   ```bash
   # بررسی پورت‌های در حال استفاده
   sudo netstat -tulpn | grep :3000
   
   # کشتن پروسه
   sudo kill -9 PID
   ```

2. **خطای مجوز فایل:**
   ```bash
   # تنظیم مجوزهای صحیح
   sudo chown -R www-data:www-data /var/www/xenova-web
   sudo chmod -R 755 /var/www/xenova-web
   ```

3. **خطای پایگاه داده:**
   ```bash
   # بررسی مجوزهای فایل پایگاه داده
   sudo chmod 666 /var/www/xenova-web/xenova.db
   ```

## نکات امنیتی

1. **تغییر پورت SSH:**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # تغییر Port 22 به Port 2222
   sudo systemctl restart ssh
   ```

2. **غیرفعال‌سازی ورود با رمز عبور:**
   ```bash
   # تنظیم کلید SSH و غیرفعال‌سازی ورود با رمز عبور
   sudo nano /etc/ssh/sshd_config
   # PasswordAuthentication no
   ```

3. **نظارت بر امنیت:**
   ```bash
   # نصب fail2ban
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

## 8. راه‌اندازی ربات تلگرام

ربات تلگرام به صورت خودکار با سرور راه‌اندازی می‌شود. برای تست:

```bash
# بررسی لاگ‌های ربات
pm2 logs xenova-app | grep "ربات"

# تست ربات در تلگرام
# به ربات پیام /start ارسال کنید
```

### 🤖 **دستورات ربات:**

- `/start` - شروع ربات
- `/stats` - آمار بازدید روزانه  
- `/requests` - درخواست‌های جدید
- `/edit_request [ID]` - ویرایش وضعیت درخواست
- `/add_news` - اضافه کردن خبر جدید
- `/add_team` - اضافه کردن عضو تیم
- `/backup` - پشتیبان‌گیری
- `/help` - راهنمای دستورات

### 📱 **کانال ادمین:**
کانال [@xenova_admin](https://t.me/xenova_admin) برای اطلاع‌رسانی‌های خودکار

## نتیجه

پس از اتمام تمام مراحل بالا، وبسایت زینوا روی سرور Ubuntu شما قابل دسترسی خواهد بود:

- **HTTP:** http://your-domain.com
- **HTTPS:** https://your-domain.com (در صورت تنظیم SSL)
- **🤖 ربات تلگرام:** فعال و آماده استفاده

### بررسی نهایی

```bash
# بررسی وضعیت سرویس‌ها
sudo systemctl status nginx
pm2 status
sudo ufw status

# تست اتصال
curl -I http://localhost:3000

# بررسی ربات تلگرام
pm2 logs xenova-app | grep "ربات"
```

---

**نکته:** حتماً `your-domain.com` را با دامنه واقعی خود جایگزین کنید و API key های مورد نیاز را در فایل `.env.local` قرار دهید. 