const TELEGRAM_BOT_TOKEN = "8424414707:AAE8l6_6krko6LapUOAU5U8LhSzjP_TRT20";
const TELEGRAM_USER_ID = "8083574070";

export interface AnalyticsEvent {
  type: 'page_view' | 'button_click' | 'form_submit' | 'telegram_click' | 'discord_click' | 'video_watch' | 'session_start' | 'session_end';
  page?: string;
  buttonName?: string;
  formName?: string;
  duration?: number;
  details?: string;
  userAgent?: string;
  referrer?: string;
}

export async function sendTelegramNotification(message: string): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_USER_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram notification:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

export function formatAnalyticsMessage(event: AnalyticsEvent): string {
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'America/New_York',
    dateStyle: 'short',
    timeStyle: 'short'
  });

  switch (event.type) {
    case 'session_start':
      return `🎯 *New Visitor!*\n\n` +
        `📅 Time: ${timestamp}\n` +
        `🌐 Page: ${event.page || 'Unknown'}\n` +
        `📱 Source: ${event.referrer || 'Direct'}\n` +
        `💻 Device: ${event.userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop'}`;

    case 'page_view':
      return `👀 *Page View*\n\n` +
        `📄 Page: ${event.page}\n` +
        `⏰ ${timestamp}`;

    case 'button_click':
      return `🖱️ *Button Clicked!*\n\n` +
        `🎯 Button: ${event.buttonName}\n` +
        `📄 Page: ${event.page}\n` +
        `⏰ ${timestamp}`;

    case 'telegram_click':
      return `📱 *TELEGRAM CONTACT ATTEMPT!*\n\n` +
        `✨ User clicked "Message on Telegram"\n` +
        `📄 From page: ${event.page}\n` +
        `⏰ ${timestamp}\n\n` +
        `🔥 *ACTION NEEDED* - Check your Telegram!`;

    case 'discord_click':
      return `💬 *DISCORD CONTACT ATTEMPT!*\n\n` +
        `✨ User clicked "Join Discord"\n` +
        `📄 From page: ${event.page}\n` +
        `⏰ ${timestamp}\n\n` +
        `🔥 *ACTION NEEDED* - Check your Discord!`;

    case 'form_submit':
      return `📝 *Form Submitted!*\n\n` +
        `📋 Form: ${event.formName}\n` +
        `📄 Page: ${event.page}\n` +
        `📝 Details: ${event.details || 'N/A'}\n` +
        `⏰ ${timestamp}`;

    case 'video_watch':
      return `▶️ *Video Engagement*\n\n` +
        `🎬 Video: ${event.details}\n` +
        `⏱️ Duration: ${event.duration ? `${Math.floor(event.duration / 60)}m ${event.duration % 60}s` : 'N/A'}\n` +
        `⏰ ${timestamp}`;

    case 'session_end':
      return `👋 *Session Ended*\n\n` +
        `⏱️ Duration: ${event.duration ? `${Math.floor(event.duration / 60)}m ${event.duration % 60}s` : 'N/A'}\n` +
        `📄 Last page: ${event.page}\n` +
        `⏰ ${timestamp}`;

    default:
      return `📊 *Analytics Event*\n\n` +
        `Type: ${event.type}\n` +
        `⏰ ${timestamp}`;
  }
}

export async function trackAndNotify(event: AnalyticsEvent): Promise<void> {
  const message = formatAnalyticsMessage(event);
  await sendTelegramNotification(message);
}

export async function sendDailySummary(stats: {
  totalVisitors: number;
  newVisitors: number;
  pageViews: number;
  avgDuration: number;
  telegramClicks: number;
  discordClicks: number;
  topPages: Array<{ page: string; views: number }>;
}): Promise<void> {
  const message = `📊 *Daily Analytics Summary*\n\n` +
    `👥 Total Visitors: ${stats.totalVisitors}\n` +
    `🆕 New Visitors: ${stats.newVisitors}\n` +
    `👀 Page Views: ${stats.pageViews}\n` +
    `⏱️ Avg Time: ${Math.floor(stats.avgDuration / 60)}m ${stats.avgDuration % 60}s\n` +
    `📱 Telegram Clicks: ${stats.telegramClicks}\n` +
    `💬 Discord Clicks: ${stats.discordClicks}\n\n` +
    `🔥 *Top Pages:*\n` +
    stats.topPages.slice(0, 5).map((p, i) => `${i + 1}. ${p.page} (${p.views} views)`).join('\n');

  await sendTelegramNotification(message);
}
