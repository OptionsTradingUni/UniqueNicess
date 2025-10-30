export async function trackEvent(data: {
  eventType: string;
  sessionId: string;
  page?: string;
  buttonName?: string;
  formName?: string;
  details?: string;
  duration?: number;
}): Promise<void> {
  try {
    await fetch('/api/track-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

export function trackPageView(page: string): void {
  trackEvent({
    eventType: 'page_view',
    sessionId: getSessionId(),
    page,
  });
}

export function trackButtonClick(buttonName: string, page: string): void {
  trackEvent({
    eventType: 'button_click',
    sessionId: getSessionId(),
    page,
    buttonName,
  });
}

export function trackTelegramClick(page: string): void {
  trackEvent({
    eventType: 'telegram_click',
    sessionId: getSessionId(),
    page,
    buttonName: 'Telegram Contact',
  });
}

export function trackDiscordClick(page: string): void {
  trackEvent({
    eventType: 'discord_click',
    sessionId: getSessionId(),
    page,
    buttonName: 'Discord Contact',
  });
}

export function trackFormSubmit(formName: string, page: string, details?: string): void {
  trackEvent({
    eventType: 'form_submit',
    sessionId: getSessionId(),
    page,
    formName,
    details,
  });
}
