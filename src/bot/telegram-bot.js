const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs').promises;
const path = require('path');
const Database = require('better-sqlite3');

// تنظیمات ربات
const BOT_TOKEN = '8329442223:AAEnpJuaX4v2jntzQ_9q5Gt6S1Et6B5mxjY';
const ADMIN_CHANNEL = '@xenova_admin';
const ADMIN_IDS = [6030020493]; // ادمین‌های ربات

// ایجاد نمونه ربات
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// مسیر فایل‌ها
const XENOVA_JSON_PATH = path.join(process.cwd(), 'doc', 'xenova.json');
const DB_PATH = path.join(process.cwd(), 'xenova.db');

// وضعیت‌های کاربران
const userStates = new Map();

// کلیدهای دسترسی ادمین
const adminCommands = {
  '/start': 'شروع ربات',
  '/stats': 'آمار بازدید روزانه',
  '/requests': 'درخواست‌های جدید',
  '/edit_request': 'ویرایش وضعیت درخواست',
  '/edit_content': 'ویرایش محتوای xenova.json',
  '/add_news': 'اضافه کردن خبر جدید',
  '/add_team': 'اضافه کردن عضو تیم',
  '/backup': 'پشتیبان‌گیری از دیتابیس',
  '/help': 'راهنمای دستورات'
};

// تابع ارسال پیام به کانال ادمین
async function sendToAdminChannel(message, options = {}) {
  try {
    await bot.sendMessage(ADMIN_CHANNEL, message, {
      parse_mode: 'HTML',
      ...options
    });
  } catch (error) {
    console.error('خطا در ارسال پیام به کانال:', error);
  }
}

// تابع خواندن فایل xenova.json
async function readXenovaData() {
  try {
    const data = await fs.readFile(XENOVA_JSON_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('خطا در خواندن xenova.json:', error);
    return null;
  }
}

// تابع ذخیره فایل xenova.json
async function saveXenovaData(data) {
  try {
    await fs.writeFile(XENOVA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('خطا در ذخیره xenova.json:', error);
    return false;
  }
}

// تابع دریافت آمار بازدید روزانه
function getDailyStats() {
  try {
    const db = new Database(DB_PATH);
    const today = new Date().toISOString().split('T')[0];
    
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_visits,
        COUNT(DISTINCT ip_address) as unique_visitors,
        COUNT(CASE WHEN page_type = 'contact' THEN 1 END) as contact_visits,
        COUNT(CASE WHEN page_type = 'investment' THEN 1 END) as investment_visits
      FROM page_visits 
      WHERE DATE(visited_at) = ?
    `).get(today);
    
    db.close();
    return stats;
  } catch (error) {
    console.error('خطا در دریافت آمار:', error);
    return null;
  }
}

// تابع دریافت درخواست‌های جدید
function getNewRequests() {
  try {
    const db = new Database(DB_PATH);
    const requests = db.prepare(`
      SELECT * FROM contact_submissions 
      WHERE status = 'new' 
      ORDER BY created_at DESC 
      LIMIT 10
    `).all();
    
    db.close();
    return requests;
  } catch (error) {
    console.error('خطا در دریافت درخواست‌ها:', error);
    return [];
  }
}

// تابع ویرایش وضعیت درخواست
function updateRequestStatus(requestId, status) {
  try {
    const db = new Database(DB_PATH);
    const result = db.prepare(`
      UPDATE contact_submissions 
      SET status = ?, updated_at = DATETIME('now') 
      WHERE id = ?
    `).run(status, requestId);
    
    db.close();
    return result.changes > 0;
  } catch (error) {
    console.error('خطا در ویرایش وضعیت:', error);
    return false;
  }
}

// تابع اضافه کردن خبر جدید
async function addNews(newsData) {
  try {
    const xenovaData = await readXenovaData();
    if (!xenovaData || !xenovaData.news) return false;
    
    const newNews = {
      id: Date.now(),
      news_code: `news_${Date.now()}`,
      title: newsData.title,
      content: newsData.content,
      summary: newsData.summary,
      author: newsData.author,
      published_at: new Date().toISOString(),
      image_url: newsData.image_url || ''
    };
    
    xenovaData.news.unshift(newNews);
    return await saveXenovaData(xenovaData);
  } catch (error) {
    console.error('خطا در اضافه کردن خبر:', error);
    return false;
  }
}

// تابع اضافه کردن عضو تیم
async function addTeamMember(memberData) {
  try {
    const xenovaData = await readXenovaData();
    if (!xenovaData || !xenovaData.development_team) return false;
    
    const newMember = {
      name: memberData.name,
      role: memberData.role,
      photo: memberData.photo || '',
      skills: memberData.skills || [],
      experience: memberData.experience || ''
    };
    
    xenovaData.development_team.advisors.push(newMember);
    xenovaData.development_team.total_advisors = xenovaData.development_team.advisors.length;
    
    return await saveXenovaData(xenovaData);
  } catch (error) {
    console.error('خطا در اضافه کردن عضو تیم:', error);
    return false;
  }
}

// تابع پشتیبان‌گیری
async function createBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(process.cwd(), 'backups', `backup_${timestamp}.json`);
    
    // ایجاد پوشه backups اگر وجود ندارد
    await fs.mkdir(path.join(process.cwd(), 'backups'), { recursive: true });
    
    const xenovaData = await readXenovaData();
    await fs.writeFile(backupPath, JSON.stringify(xenovaData, null, 2));
    
    return backupPath;
  } catch (error) {
    console.error('خطا در پشتیبان‌گیری:', error);
    return null;
  }
}

// دستور شروع
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  const welcomeMessage = `
🤖 <b>ربات مدیریت زینوا</b>

سلام! به ربات مدیریت سایت زینوا خوش آمدید.

📋 <b>دستورات موجود:</b>
${Object.entries(adminCommands).map(([cmd, desc]) => `${cmd} - ${desc}`).join('\n')}

برای شروع، یکی از دستورات بالا را انتخاب کنید.
  `;
  
  await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'HTML' });
});

// دستور آمار
bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  const stats = getDailyStats();
  if (!stats) {
    await bot.sendMessage(chatId, '❌ خطا در دریافت آمار');
    return;
  }
  
  const statsMessage = `
📊 <b>آمار بازدید امروز</b>

👥 کل بازدید: ${stats.total_visits}
👤 بازدیدکنندگان منحصر: ${stats.unique_visitors}
📞 بازدید صفحه تماس: ${stats.contact_visits}
💰 بازدید صفحه سرمایه‌گذاری: ${stats.investment_visits}

📅 تاریخ: ${new Date().toLocaleDateString('fa-IR')}
  `;
  
  await bot.sendMessage(chatId, statsMessage, { parse_mode: 'HTML' });
});

// دستور درخواست‌های جدید
bot.onText(/\/requests/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  const requests = getNewRequests();
  if (requests.length === 0) {
    await bot.sendMessage(chatId, '✅ هیچ درخواست جدیدی وجود ندارد.');
    return;
  }
  
  let requestsMessage = `📋 <b>درخواست‌های جدید (${requests.length})</b>\n\n`;
  
  requests.forEach((request, index) => {
    requestsMessage += `
🔸 <b>درخواست ${index + 1}</b>
👤 نام: ${request.full_name}
📧 ایمیل: ${request.email}
📱 تلفن: ${request.mobile_phone}
🏢 موقعیت: ${request.company_position}
💬 پیام: ${request.message.substring(0, 100)}...
📅 تاریخ: ${new Date(request.created_at).toLocaleDateString('fa-IR')}
🆔 ID: ${request.id}

برای ویرایش وضعیت: /edit_request ${request.id}
    `;
  });
  
  await bot.sendMessage(chatId, requestsMessage, { parse_mode: 'HTML' });
});

// دستور ویرایش وضعیت درخواست
bot.onText(/\/edit_request (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const requestId = match[1];
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  userStates.set(userId, {
    action: 'edit_request_status',
    requestId: requestId
  });
  
  const statusOptions = `
📝 <b>ویرایش وضعیت درخواست ${requestId}</b>

لطفاً وضعیت جدید را انتخاب کنید:

1️⃣ جدید (new)
2️⃣ در حال بررسی (reviewing)
3️⃣ پاسخ داده شده (responded)
4️⃣ تکمیل شده (completed)
5️⃣ لغو شده (cancelled)

پاسخ خود را با شماره ارسال کنید.
  `;
  
  await bot.sendMessage(chatId, statusOptions, { parse_mode: 'HTML' });
});

// دستور اضافه کردن خبر
bot.onText(/\/add_news/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  userStates.set(userId, {
    action: 'add_news',
    step: 'title'
  });
  
  await bot.sendMessage(chatId, '📰 لطفاً عنوان خبر را وارد کنید:');
});

// دستور اضافه کردن عضو تیم
bot.onText(/\/add_team/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  userStates.set(userId, {
    action: 'add_team',
    step: 'name'
  });
  
  await bot.sendMessage(chatId, '👤 لطفاً نام عضو تیم را وارد کنید:');
});

// دستور پشتیبان‌گیری
bot.onText(/\/backup/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  await bot.sendMessage(chatId, '🔄 در حال ایجاد پشتیبان...');
  
  const backupPath = await createBackup();
  if (backupPath) {
    await bot.sendMessage(chatId, `✅ پشتیبان با موفقیت ایجاد شد:\n${backupPath}`);
  } else {
    await bot.sendMessage(chatId, '❌ خطا در ایجاد پشتیبان');
  }
});

// دستور راهنما
bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!ADMIN_IDS.includes(userId)) {
    await bot.sendMessage(chatId, '❌ شما دسترسی ادمین ندارید.');
    return;
  }
  
  const helpMessage = `
📖 <b>راهنمای ربات مدیریت زینوا</b>

🤖 <b>دستورات اصلی:</b>
${Object.entries(adminCommands).map(([cmd, desc]) => `${cmd} - ${desc}`).join('\n')}

📝 <b>نحوه استفاده:</b>
• برای مشاهده آمار: /stats
• برای درخواست‌های جدید: /requests
• برای ویرایش وضعیت: /edit_request [ID]
• برای اضافه کردن خبر: /add_news
• برای اضافه کردن عضو تیم: /add_team

⚠️ <b>نکات مهم:</b>
• فقط ادمین‌ها می‌توانند از ربات استفاده کنند
• تمام تغییرات در xenova.json ذخیره می‌شود
• پشتیبان‌گیری منظم انجام دهید
  `;
  
  await bot.sendMessage(chatId, helpMessage, { parse_mode: 'HTML' });
});

// پردازش پیام‌های متنی
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;
  
  if (!ADMIN_IDS.includes(userId)) {
    return;
  }
  
  const userState = userStates.get(userId);
  if (!userState) return;
  
  try {
    switch (userState.action) {
      case 'edit_request_status':
        await handleEditRequestStatus(chatId, userId, text, userState);
        break;
      case 'add_news':
        await handleAddNews(chatId, userId, text, userState);
        break;
      case 'add_team':
        await handleAddTeam(chatId, userId, text, userState);
        break;
    }
  } catch (error) {
    console.error('خطا در پردازش پیام:', error);
    await bot.sendMessage(chatId, '❌ خطا در پردازش درخواست');
    userStates.delete(userId);
  }
});

// تابع پردازش ویرایش وضعیت درخواست
async function handleEditRequestStatus(chatId, userId, text, userState) {
  const statusMap = {
    '1': 'new',
    '2': 'reviewing', 
    '3': 'responded',
    '4': 'completed',
    '5': 'cancelled'
  };
  
  const status = statusMap[text];
  if (!status) {
    await bot.sendMessage(chatId, '❌ لطفاً عدد 1 تا 5 را وارد کنید.');
    return;
  }
  
  const success = updateRequestStatus(userState.requestId, status);
  if (success) {
    await bot.sendMessage(chatId, `✅ وضعیت درخواست ${userState.requestId} به "${status}" تغییر یافت.`);
    
    // اطلاع‌رسانی به کانال
    await sendToAdminChannel(`
🔄 <b>تغییر وضعیت درخواست</b>

🆔 درخواست: ${userState.requestId}
📊 وضعیت جدید: ${status}
👤 ادمین: ${userId}
⏰ زمان: ${new Date().toLocaleString('fa-IR')}
    `);
  } else {
    await bot.sendMessage(chatId, '❌ خطا در تغییر وضعیت');
  }
  
  userStates.delete(userId);
}

// تابع پردازش اضافه کردن خبر
async function handleAddNews(chatId, userId, text, userState) {
  switch (userState.step) {
    case 'title':
      userState.newsData = { title: text };
      userState.step = 'content';
      await bot.sendMessage(chatId, '📝 لطفاً محتوای خبر را وارد کنید:');
      break;
      
    case 'content':
      userState.newsData.content = text;
      userState.step = 'summary';
      await bot.sendMessage(chatId, '📋 لطفاً خلاصه خبر را وارد کنید:');
      break;
      
    case 'summary':
      userState.newsData.summary = text;
      userState.step = 'author';
      await bot.sendMessage(chatId, '✍️ لطفاً نام نویسنده را وارد کنید:');
      break;
      
    case 'author':
      userState.newsData.author = text;
      userState.step = 'image_url';
      await bot.sendMessage(chatId, '🖼️ لطفاً آدرس تصویر را وارد کنید (اختیاری):');
      break;
      
    case 'image_url':
      userState.newsData.image_url = text || '';
      
      const success = await addNews(userState.newsData);
      if (success) {
        await bot.sendMessage(chatId, '✅ خبر با موفقیت اضافه شد!');
        
        // اطلاع‌رسانی به کانال
        await sendToAdminChannel(`
📰 <b>خبر جدید اضافه شد</b>

📝 عنوان: ${userState.newsData.title}
✍️ نویسنده: ${userState.newsData.author}
👤 ادمین: ${userId}
⏰ زمان: ${new Date().toLocaleString('fa-IR')}
        `);
      } else {
        await bot.sendMessage(chatId, '❌ خطا در اضافه کردن خبر');
      }
      
      userStates.delete(userId);
      break;
  }
}

// تابع پردازش اضافه کردن عضو تیم
async function handleAddTeam(chatId, userId, text, userState) {
  switch (userState.step) {
    case 'name':
      userState.memberData = { name: text };
      userState.step = 'role';
      await bot.sendMessage(chatId, '💼 لطفاً نقش عضو تیم را وارد کنید:');
      break;
      
    case 'role':
      userState.memberData.role = text;
      userState.step = 'skills';
      await bot.sendMessage(chatId, '🛠️ لطفاً مهارت‌ها را با کاما جدا کنید:');
      break;
      
    case 'skills':
      userState.memberData.skills = text.split(',').map(s => s.trim());
      userState.step = 'experience';
      await bot.sendMessage(chatId, '📚 لطفاً تجربیات را وارد کنید:');
      break;
      
    case 'experience':
      userState.memberData.experience = text;
      userState.step = 'photo';
      await bot.sendMessage(chatId, '🖼️ لطفاً آدرس عکس را وارد کنید (اختیاری):');
      break;
      
    case 'photo':
      userState.memberData.photo = text || '';
      
      const success = await addTeamMember(userState.memberData);
      if (success) {
        await bot.sendMessage(chatId, '✅ عضو تیم با موفقیت اضافه شد!');
        
        // اطلاع‌رسانی به کانال
        await sendToAdminChannel(`
👥 <b>عضو جدید تیم اضافه شد</b>

👤 نام: ${userState.memberData.name}
💼 نقش: ${userState.memberData.role}
🛠️ مهارت‌ها: ${userState.memberData.skills.join(', ')}
👨‍💼 ادمین: ${userId}
⏰ زمان: ${new Date().toLocaleString('fa-IR')}
        `);
      } else {
        await bot.sendMessage(chatId, '❌ خطا در اضافه کردن عضو تیم');
      }
      
      userStates.delete(userId);
      break;
  }
}

// تابع اطلاع‌رسانی فرم جدید
async function notifyNewForm(formData, formType) {
  const message = `
📝 <b>فرم جدید دریافت شد</b>

📋 نوع: ${formType === 'contact' ? 'تماس' : 'سرمایه‌گذاری'}
👤 نام: ${formData.full_name}
📧 ایمیل: ${formData.email}
📱 تلفن: ${formData.mobile_phone}
🏢 موقعیت: ${formData.company_position || 'نامشخص'}
💬 پیام: ${formData.message.substring(0, 200)}...
💰 مبلغ سرمایه‌گذاری: ${formData.investment_amount_range || 'نامشخص'}
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
  `;
  
  await sendToAdminChannel(message);
}

// تابع اطلاع‌رسانی بازدید جدید
async function notifyNewVisit(visitData) {
  const message = `
👁️ <b>بازدید جدید</b>

🌐 صفحه: ${visitData.page_type}
📱 دستگاه: ${visitData.user_agent.includes('Mobile') ? 'موبایل' : 'دسکتاپ'}
🌍 IP: ${visitData.ip_address}
⏰ زمان: ${new Date().toLocaleString('fa-IR')}
  `;
  
  await sendToAdminChannel(message);
}

// راه‌اندازی ربات
console.log('🤖 ربات تلگرام زینوا در حال راه‌اندازی...');

// مدیریت خطاها
bot.on('error', (error) => {
  console.error('خطا در ربات تلگرام:', error);
});

bot.on('polling_error', (error) => {
  console.error('خطا در polling ربات:', error);
});

module.exports = {
  bot,
  notifyNewForm,
  notifyNewVisit,
  sendToAdminChannel
}; 