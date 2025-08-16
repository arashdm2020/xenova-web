'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatAgent({ isEmbedded = false }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'سلام! من هوش مصنوعی زینوا هستم. درباره پلتفرم هوشمند ردیابی مسیر دارو سوال بپرسید.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    // فقط داخل chat container اسکرول کند، نه کل صفحه
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest('.overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // فقط زمانی اسکرول کن که پیام جدید اضافه شده باشد
    const timer = setTimeout(() => {
      if (messages.length > 1) {
        scrollToBottom();
      }
    }, 100); // کمی تاخیر برای اطمینان از رندر شدن پیام

    return () => clearTimeout(timer);
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content
        }),
      });

      const data = await response.json();

      if (data.success) {
        // تعیین نمادهای منبع
        let sourceIndicator = '';
        if (data.source === 'openai') {
          sourceIndicator = ' 🔴'; // دایره قرمز برای GPT
        } else if (data.source === 'local_fallback') {
          sourceIndicator = ' 🔵'; // دایره آبی برای JSON محلی
        } else if (data.source === 'combined') {
          sourceIndicator = ' 🔵🔴'; // هر دو دایره برای ترکیبی
        }
        
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.message + sourceIndicator,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'خطا در دریافت پاسخ');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'متأسفم، خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'سلام! من هوش مصنوعی زینوا هستم. درباره پلتفرم هوشمند ردیابی مسیر دارو سوال بپرسید.',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const containerClasses = isEmbedded 
    ? "bg-white rounded-xl shadow-lg border border-gray-200" 
    : "bg-white rounded-xl shadow-2xl border border-gray-200";

    const heightClasses = isEmbedded 
    ? "h-[500px]"
    : "h-[800px]"; // افزایش ارتفاع از 700px به 800px

  return (
    <div className={`${containerClasses} flex flex-col ${heightClasses} max-w-6xl mx-auto`}> {/* افزایش عرض از max-w-4xl به max-w-6xl */}
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <i className="fas fa-robot text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg">هوش مصنوعی زینوا</h3>
              <p className="text-gray-300 text-sm">پلتفرم هوشمند ردیابی مسیر دارو</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
            title="پاک کردن چت"
          >
            <i className="fas fa-trash text-sm"></i>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg`}>
              {message.type === 'bot' && (
                <div className="flex items-end space-x-2 space-x-reverse mb-1">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-white text-xs"></i>
                  </div>
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.type === 'user'
                    ? 'bg-gray-900 text-white ml-12'
                    : 'bg-white text-gray-800 mr-10 border border-gray-200'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex items-end justify-end space-x-2 space-x-reverse mt-1">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-white text-xs"></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="flex items-end space-x-2 space-x-reverse mb-1">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white text-xs"></i>
                </div>
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 mr-10 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-500 mr-2">در حال تایپ...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-xl">
        {/* Textarea - Full width on mobile */}
        <div className="mb-3 md:mb-0">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="سوال خود را درباره زینوا بپرسید..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm text-gray-800"
            rows={3}
            style={{ minHeight: '80px', maxHeight: '120px' }}
            disabled={isLoading}
          />
        </div>
        
        {/* Send Button - Full width on mobile, normal on desktop */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-6">
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center h-[50px] md:h-[44px] w-full md:w-auto ${
              !inputMessage.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <i className="fas fa-spinner animate-spin text-sm"></i>
            ) : (
              <>
                <i className="fas fa-paper-plane text-sm ml-1"></i>
                <span className="text-sm">ارسال</span>
              </>
            )}
          </button>
        </div>
        
        {/* Quick Questions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'زینوا چیست؟',
            'مزایای زینوا',
            'هزینه پروژه',
            'زمان‌بندی پروژه',
            'تیم توسعه'
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="px-3 py-2 md:py-1 text-xs md:text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 border border-gray-200"
              disabled={isLoading}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}