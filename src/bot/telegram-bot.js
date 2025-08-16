const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs').promises;
const path = require('path');
const Database = require('better-sqlite3');

const BOT_TOKEN = '8329442223:AAEnpJuaX4v2jntzQ_9q5Gt6S1Et6B5mxjY';
const ADMIN_CHANNEL = '@xenova_admin';
const ADMIN_IDS = [6030020493];

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// متغیرهای حالت کاربران
const userStates = new Map();

// ایجاد دکمه‌های اصلی
function getMainKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📊 آمار روزانه', callback_data: 'stats' },
          { text: '📋 درخواست‌های جدید', callback_data: 'new_requests' }
        ],
        [
          { text: '📝 تمام درخواست‌ها', callback_data: 'all_requests' },
          { text: '✏️ ویرایش وضعیت', callback_data: 'edit_status' }
        ],
        [
          { text: '📰 مدیریت اخبار', callback_data: 'manage_news' },
          { text: '👥 مدیریت تیم', callback_data: 'manage_team' }
        ],
        [
          { text: '⚙️ تنظیمات xenova.json', callback_data: 'edit_content' },
          { text: '💾 پشتیبان‌گیری', callback_data: 'backup' }
        ],
        [
          { text: '❓ راهنما', callback_data: 'help' }
        ]
      ]
    }
  };
}

// تبدیل وضعیت به متن فارسی
function getStatusText(status) {
  const statusMap = {
    'new': '🆕 جدید',
    'pending': '⏳ در انتظار',
    'contacted': '📞 تماس گرفته شده',
    'reviewing': '🔍 در حال بررسی',
    'approved': '✅ تایید شده',
    'completed': '✅ تکمیل شده',
    'rejected': '❌ رد شده'
  };
  return statusMap[status] || status;
}

// ذخیره فایل xenova.json
async function saveXenovaData(data) {
  try {
    const filePath = path.join(process.cwd(), 'doc', 'xenova.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('خطا در ذخیره xenova.json:', error);
    return false;
  }
}

// دریافت آمار روزانه
async function getDailyStats() {
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const today = new Date().toISOString().split('T')[0];
    
    const contactCount = db.prepare(`
      SELECT COUNT(*) as count FROM contact_submissions 
      WHERE DATE(created_at) = ?
    `).get(today);
    
    const investmentCount = db.prepare(`
      SELECT COUNT(*) as count FROM investment_requests 
      WHERE DATE(created_at) = ?
    `).get(today);
    
    const visitCount = db.prepare(`
      SELECT COUNT(*) as count FROM page_visits 
      WHERE DATE(visited_at) = ?
    `).get(today);
    
    const totalContacts = db.prepare(`
      SELECT COUNT(*) as count FROM contact_submissions
    `).get();
    
    const totalInvestments = db.prepare(`
      SELECT COUNT(*) as count FROM investment_requests
    `).get();
    
    db.close();
    
    return {
      today: {
        contacts: contactCount.count,
        investments: investmentCount.count,
        visits: visitCount.count
      },
      total: {
        contacts: totalContacts.count,
        investments: totalInvestments.count
      }
    };
  } catch (error) {
    console.error('خطا در دریافت آمار:', error);
    return null;
  }
}

// دریافت درخواست‌های جدید
async function getNewRequests() {
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const contacts = db.prepare(`
      SELECT * FROM contact_submissions 
      WHERE status = 'new' 
      ORDER BY created_at DESC 
      LIMIT 10
    `).all();
    
    const investments = db.prepare(`
      SELECT * FROM investment_requests 
      WHERE status = 'pending' 
      ORDER BY created_at DESC 
      LIMIT 10
    `).all();
    
    db.close();
    
    return { contacts, investments };
  } catch (error) {
    console.error('خطا در دریافت درخواست‌ها:', error);
    return { contacts: [], investments: [] };
  }
}

// دریافت تمام درخواست‌ها
async function getAllRequests() {
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const contacts = db.prepare(`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC 
      LIMIT 50
    `).all();
    
    const investments = db.prepare(`
      SELECT * FROM investment_requests 
      ORDER BY created_at DESC 
      LIMIT 50
    `).all();
    
    db.close();
    
    return { contacts, investments };
  } catch (error) {
    console.error('خطا در دریافت درخواست‌ها:', error);
    return { contacts: [], investments: [] };
  }
}

// به‌روزرسانی وضعیت درخواست
async function updateRequestStatus(type, id, status) {
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const table = type === 'contact' ? 'contact_submissions' : 'investment_requests';
    
    const result = db.prepare(`
      UPDATE ${table} 
      SET status = ? 
      WHERE id = ?
    `).run(status, id);
    
    db.close();
    
    return result.changes > 0;
  } catch (error) {
    console.error('خطا در به‌روزرسانی وضعیت:', error);
    return false;
  }
}

// ایجاد دکمه‌های اصلی
function getMainKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📊 آمار روزانه', callback_data: 'stats' },
          { text: '📋 درخواست‌های جدید', callback_data: 'new_requests' }
        ],
        [
          { text: '📝 تمام درخواست‌ها', callback_data: 'all_requests' },
          { text: '✏️ ویرایش وضعیت', callback_data: 'edit_status' }
        ],
        [
          { text: '📰 مدیریت اخبار', callback_data: 'manage_news' },
          { text: '👥 مدیریت تیم', callback_data: 'manage_team' }
        ],
        [
          { text: '⚙️ تنظیمات xenova.json', callback_data: 'edit_content' },
          { text: '💾 پشتیبان‌گیری', callback_data: 'backup' }
        ],
        [
          { text: '❓ راهنما', callback_data: 'help' }
        ]
      ]
    }
  };
}

// ایجاد دکمه‌های مدیریت درخواست‌ها
function getRequestsKeyboard(requests, type) {
  const buttons = [];
  
  requests.forEach((req, index) => {
    const status = req.status === 'new' || req.status === 'pending' ? '⏳' : '✅';
    const name = req.full_name.substring(0, 20);
    buttons.push([{
      text: `${status} ${name} (${req.id})`,
      callback_data: `view_${type}_${req.id}`
    }]);
  });
  
  buttons.push([
    { text: '🔙 بازگشت', callback_data: 'main_menu' }
  ]);
  
  return {
    reply_markup: {
      inline_keyboard: buttons
    }
  };
}

// ایجاد دکمه‌های وضعیت
function getStatusKeyboard(type, id) {
  const statuses = type === 'contact' ? 
    ['new', 'contacted', 'completed', 'rejected'] : 
    ['pending', 'reviewing', 'approved', 'rejected'];
  
  const buttons = statuses.map(status => [{
    text: getStatusText(status),
    callback_data: `set_status_${type}_${id}_${status}`
  }]);
  
  buttons.push([
    { text: '🔙 بازگشت', callback_data: 'all_requests' }
  ]);
  
  return {
    reply_markup: {
      inline_keyboard: buttons
    }
  };
}

// تبدیل وضعیت به متن فارسی
function getStatusText(status) {
  const statusMap = {
    'new': '🆕 جدید',
    'pending': '⏳ در انتظار',
    'contacted': '📞 تماس گرفته شده',
    'reviewing': '🔍 در حال بررسی',
    'approved': '✅ تایید شده',
    'completed': '✅ تکمیل شده',
    'rejected': '❌ رد شده'
  };
  return statusMap[status] || status;
}

// دستور /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  if (!ADMIN_IDS.includes(chatId)) {
    return bot.sendMessage(chatId, '❌ شما مجاز به استفاده از این ربات نیستید.');
  }
  
  const welcomeMessage = `
🤖 ربات مدیریت زینوا

سلام! به ربات مدیریت سایت زینوا خوش آمدید.

📋 امکانات موجود:
• 📊 مشاهده آمار بازدید و درخواست‌ها
• 📝 مدیریت درخواست‌های تماس و سرمایه‌گذاری
• ✏️ ویرایش وضعیت درخواست‌ها
• 📰 مدیریت اخبار و محتوا
• 👥 مدیریت اعضای تیم
• ⚙️ تنظیمات xenova.json
• 💾 پشتیبان‌گیری

برای شروع، یکی از گزینه‌های زیر را انتخاب کنید:
  `;
  
  bot.sendMessage(chatId, welcomeMessage, getMainKeyboard());
});

// پردازش callback queries
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  if (!ADMIN_IDS.includes(chatId)) {
    return bot.answerCallbackQuery(query.id, { text: '❌ شما مجاز نیستید.' });
  }
  
  try {
    switch (data) {
      case 'stats':
        await handleStats(chatId, query.id);
        break;
      case 'new_requests':
        await handleNewRequests(chatId, query.id);
        break;
      case 'all_requests':
        await handleAllRequests(chatId, query.id);
        break;
      case 'edit_status':
        await handleEditStatus(chatId, query.id);
        break;
      case 'manage_news':
        await handleManageNews(chatId, query.id);
        break;
      case 'manage_team':
        await handleManageTeam(chatId, query.id);
        break;
      case 'edit_content':
        await handleEditContent(chatId, query.id);
        break;
      case 'backup':
        await handleBackup(chatId, query.id);
        break;
      case 'help':
        await handleHelp(chatId, query.id);
        break;
      case 'main_menu':
        await handleMainMenu(chatId, query.id);
        break;
      default:
        if (data.startsWith('view_')) {
          await handleViewRequest(chatId, query.id, data);
        } else if (data.startsWith('set_status_')) {
          await handleSetStatus(chatId, query.id, data);
        } else {
          bot.answerCallbackQuery(query.id, { text: '❌ دستور نامعتبر' });
        }
    }
  } catch (error) {
    console.error('خطا در پردازش callback:', error);
    bot.answerCallbackQuery(query.id, { text: '❌ خطا در پردازش درخواست' });
  }
});

// مدیریت آمار
async function handleStats(chatId, queryId) {
  const stats = await getDailyStats();
  
  if (!stats) {
    bot.answerCallbackQuery(queryId, { text: '❌ خطا در دریافت آمار' });
    return;
  }
  
  const message = `
📊 آمار روزانه زینوا

📅 امروز:
• 📞 درخواست‌های تماس: ${stats.today.contacts}
• 💰 درخواست‌های سرمایه‌گذاری: ${stats.today.investments}
• 👁️ بازدیدها: ${stats.today.visits}

📈 کل:
• 📞 کل درخواست‌های تماس: ${stats.total.contacts}
• 💰 کل درخواست‌های سرمایه‌گذاری: ${stats.total.investments}
  `;
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: getMainKeyboard().reply_markup
  });
}

// مدیریت درخواست‌های جدید
async function handleNewRequests(chatId, queryId) {
  const requests = await getNewRequests();
  
  if (requests.contacts.length === 0 && requests.investments.length === 0) {
    bot.answerCallbackQuery(queryId, { text: '✅ هیچ درخواست جدیدی وجود ندارد' });
    return;
  }
  
  let message = '📋 درخواست‌های جدید:\n\n';
  
  if (requests.contacts.length > 0) {
    message += '📞 درخواست‌های تماس:\n';
    requests.contacts.forEach(req => {
      message += `• ${req.full_name} (${req.id}) - ${req.created_at}\n`;
    });
    message += '\n';
  }
  
  if (requests.investments.length > 0) {
    message += '💰 درخواست‌های سرمایه‌گذاری:\n';
    requests.investments.forEach(req => {
      message += `• ${req.full_name} (${req.id}) - ${req.created_at}\n`;
    });
  }
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📝 مشاهده تمام درخواست‌ها', callback_data: 'all_requests' },
          { text: '✏️ ویرایش وضعیت', callback_data: 'edit_status' }
        ],
        [
          { text: '🔙 بازگشت', callback_data: 'main_menu' }
        ]
      ]
    }
  };
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: keyboard.reply_markup
  });
}

// مدیریت تمام درخواست‌ها
async function handleAllRequests(chatId, queryId) {
  const requests = await getAllRequests();
  
  if (requests.contacts.length === 0 && requests.investments.length === 0) {
    bot.answerCallbackQuery(queryId, { text: '✅ هیچ درخواستی وجود ندارد' });
    return;
  }
  
  let message = '📝 تمام درخواست‌ها:\n\n';
  
  if (requests.contacts.length > 0) {
    message += `📞 درخواست‌های تماس (${requests.contacts.length}):\n`;
    requests.contacts.slice(0, 10).forEach(req => {
      const status = getStatusText(req.status);
      message += `• ${req.full_name} (${req.id}) - ${status}\n`;
    });
    if (requests.contacts.length > 10) {
      message += `... و ${requests.contacts.length - 10} مورد دیگر\n`;
    }
    message += '\n';
  }
  
  if (requests.investments.length > 0) {
    message += `💰 درخواست‌های سرمایه‌گذاری (${requests.investments.length}):\n`;
    requests.investments.slice(0, 10).forEach(req => {
      const status = getStatusText(req.status);
      message += `• ${req.full_name} (${req.id}) - ${status}\n`;
    });
    if (requests.investments.length > 10) {
      message += `... و ${requests.investments.length - 10} مورد دیگر\n`;
    }
  }
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📞 درخواست‌های تماس', callback_data: 'view_contacts' },
          { text: '💰 درخواست‌های سرمایه‌گذاری', callback_data: 'view_investments' }
        ],
        [
          { text: '🔙 بازگشت', callback_data: 'main_menu' }
        ]
      ]
    }
  };
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: keyboard.reply_markup
  });
}

// مشاهده جزئیات درخواست
async function handleViewRequest(chatId, queryId, data) {
  const [, type, id] = data.split('_');
  
  try {
    const dbPath = path.join(process.cwd(), 'xenova.db');
    const db = new Database(dbPath);
    
    const table = type === 'contact' ? 'contact_submissions' : 'investment_requests';
    const request = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    
    db.close();
    
    if (!request) {
      bot.answerCallbackQuery(queryId, { text: '❌ درخواست یافت نشد' });
      return;
    }
    
    const message = `
📋 جزئیات درخواست ${type === 'contact' ? 'تماس' : 'سرمایه‌گذاری'}

🆔 شناسه: ${request.id}
👤 نام: ${request.full_name}
📧 ایمیل: ${request.email}
🏢 موقعیت: ${request.company_position || 'نامشخص'}
📱 تلفن: ${request.mobile_phone || 'نامشخص'}
💬 پیام: ${request.message || 'نامشخص'}
📅 تاریخ: ${request.created_at}
📊 وضعیت: ${getStatusText(request.status)}

${type === 'investment' ? `
💰 نوع سرمایه‌گذاری: ${request.investment_type || 'نامشخص'}
💵 مبلغ: ${request.investment_amount_range || 'نامشخص'}
` : ''}
    `;
    
    const keyboard = getStatusKeyboard(type, id);
    
    bot.editMessageText(message, {
      chat_id: chatId,
      message_id: queryId,
      reply_markup: keyboard.reply_markup
    });
    
  } catch (error) {
    console.error('خطا در مشاهده درخواست:', error);
    bot.answerCallbackQuery(queryId, { text: '❌ خطا در دریافت اطلاعات' });
  }
}

// تنظیم وضعیت درخواست
async function handleSetStatus(chatId, queryId, data) {
  const [, , type, id, status] = data.split('_');
  
  const success = await updateRequestStatus(type, id, status);
  
  if (success) {
    bot.answerCallbackQuery(queryId, { 
      text: `✅ وضعیت به ${getStatusText(status)} تغییر یافت` 
    });
    
    // بازگشت به لیست درخواست‌ها
    await handleAllRequests(chatId, queryId);
  } else {
    bot.answerCallbackQuery(queryId, { text: '❌ خطا در تغییر وضعیت' });
  }
}

// مدیریت اخبار
async function handleManageNews(chatId, queryId) {
  const message = `
📰 مدیریت اخبار

برای مدیریت اخبار، یکی از گزینه‌های زیر را انتخاب کنید:
  `;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '➕ اضافه کردن خبر', callback_data: 'add_news' },
          { text: '📝 ویرایش اخبار', callback_data: 'edit_news' }
        ],
        [
          { text: '🔙 بازگشت', callback_data: 'main_menu' }
        ]
      ]
    }
  };
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: keyboard.reply_markup
  });
}

// مدیریت تیم
async function handleManageTeam(chatId, queryId) {
  const message = `
👥 مدیریت تیم

برای مدیریت اعضای تیم، یکی از گزینه‌های زیر را انتخاب کنید:
  `;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '➕ اضافه کردن عضو', callback_data: 'add_team' },
          { text: '📝 ویرایش اعضا', callback_data: 'edit_team' }
        ],
        [
          { text: '🔙 بازگشت', callback_data: 'main_menu' }
        ]
      ]
    }
  };
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: keyboard.reply_markup
  });
}

// ویرایش محتوا
async function handleEditContent(chatId, queryId) {
  const xenovaData = await readXenovaData();
  
  if (!xenovaData) {
    bot.answerCallbackQuery(queryId, { text: '❌ خطا در خواندن فایل xenova.json' });
    return;
  }
  
  const message = `
⚙️ تنظیمات xenova.json

📊 اطلاعات فعلی:
• سرمایه‌گذاری: ${xenovaData.capital_request?.amount || 'نامشخص'}
• تیم: ${xenovaData.development_team?.total_advisors || 0} عضو
• اخبار: ${xenovaData.news?.length || 0} خبر

برای ویرایش، یکی از گزینه‌های زیر را انتخاب کنید:
  `;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '💰 ویرایش سرمایه‌گذاری', callback_data: 'edit_investment' },
          { text: '👥 ویرایش تیم', callback_data: 'edit_team_data' }
        ],
        [
          { text: '📰 ویرایش اخبار', callback_data: 'edit_news_data' },
          { text: '📊 ویرایش آمار', callback_data: 'edit_stats' }
        ],
        [
          { text: '🔙 بازگشت', callback_data: 'main_menu' }
        ]
      ]
    }
  };
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: keyboard.reply_markup
  });
}

// پشتیبان‌گیری
async function handleBackup(chatId, queryId) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(process.cwd(), `backup-${timestamp}.json`);
    
    const xenovaData = await readXenovaData();
    await fs.writeFile(backupPath, JSON.stringify(xenovaData, null, 2));
    
    bot.answerCallbackQuery(queryId, { 
      text: `✅ پشتیبان‌گیری انجام شد: backup-${timestamp}.json` 
    });
    
  } catch (error) {
    console.error('خطا در پشتیبان‌گیری:', error);
    bot.answerCallbackQuery(queryId, { text: '❌ خطا در پشتیبان‌گیری' });
  }
}

// راهنما
async function handleHelp(chatId, queryId) {
  const message = `
📖 راهنمای ربات مدیریت زینوا

🤖 امکانات اصلی:
• 📊 آمار روزانه - مشاهده آمار بازدید و درخواست‌ها
• 📋 درخواست‌های جدید - مشاهده درخواست‌های جدید
• 📝 تمام درخواست‌ها - مدیریت کامل درخواست‌ها
• ✏️ ویرایش وضعیت - تغییر وضعیت درخواست‌ها
• 📰 مدیریت اخبار - اضافه و ویرایش اخبار
• 👥 مدیریت تیم - مدیریت اعضای تیم
• ⚙️ تنظیمات xenova.json - ویرایش محتوای اصلی
• 💾 پشتیبان‌گیری - ایجاد نسخه پشتیبان

📝 نحوه استفاده:
• روی دکمه‌ها کلیک کنید
• وضعیت درخواست‌ها را تغییر دهید
• محتوای سایت را ویرایش کنید
• از داده‌ها پشتیبان‌گیری کنید

⚠️ نکات مهم:
• فقط ادمین‌ها می‌توانند از ربات استفاده کنند
• تمام تغییرات در xenova.json ذخیره می‌شود
• پشتیبان‌گیری منظم انجام دهید
  `;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔙 بازگشت', callback_data: 'main_menu' }
        ]
      ]
    }
  };
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: keyboard.reply_markup
  });
}

// بازگشت به منوی اصلی
async function handleMainMenu(chatId, queryId) {
  const message = `
🤖 ربات مدیریت زینوا

برای شروع، یکی از گزینه‌های زیر را انتخاب کنید:
  `;
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: queryId,
    reply_markup: getMainKeyboard().reply_markup
  });
}

// سایر توابع placeholder
async function handleEditStatus(chatId, queryId) {
  await handleAllRequests(chatId, queryId);
}

// اطلاع‌رسانی فرم جدید
async function notifyNewForm(formData, type) {
  try {
    const message = `
📋 درخواست جدید ${type === 'contact' ? 'تماس' : 'سرمایه‌گذاری'}

👤 نام: ${formData.full_name}
📧 ایمیل: ${formData.email}
🏢 موقعیت: ${formData.company_position || 'نامشخص'}
📱 تلفن: ${formData.mobile_phone || 'نامشخص'}
💬 پیام: ${formData.message || 'نامشخص'}
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
    `;
    
    await bot.sendMessage(ADMIN_CHANNEL, message);
  } catch (error) {
    console.error('خطا در اطلاع‌رسانی فرم:', error);
  }
}

// اطلاع‌رسانی بازدید جدید
async function notifyNewVisit(visitData) {
  try {
    const message = `
👁️ بازدید جدید

📄 صفحه: ${visitData.page_type}
🌐 IP: ${visitData.ip_address || 'نامشخص'}
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
    `;
    
    await bot.sendMessage(ADMIN_CHANNEL, message);
  } catch (error) {
    console.error('خطا در اطلاع‌رسانی بازدید:', error);
  }
}

// ارسال پیام به کانال ادمین
async function sendToAdminChannel(message) {
  try {
    await bot.sendMessage(ADMIN_CHANNEL, message);
  } catch (error) {
    console.error('خطا در ارسال پیام به کانال:', error);
  }
}

console.log('🤖 ربات تلگرام زینوا فعال است');

module.exports = {
  bot,
  notifyNewForm,
  notifyNewVisit,
  sendToAdminChannel
}; 