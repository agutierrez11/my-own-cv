// Telemetria en Tiempo Real para CV Digital Antonio Gutierrez
const BOT_TOKEN = '8618367908:AAH1wQ9dPcCCMHciOHR89iAGd-XQg3NjyAo';
const CHAT_ID = '1373770013';
const TELEGRAM_API = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';

async function sendTelegramAlert(text: string) {
  try {
    const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isDev && !text.includes('CRASH')) {
      console.log('[TELEMETRY DEV LOG]:\n' + text);
      return;
    }

    await fetch(TELEGRAM_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.warn('[Telemetry] Failed to dispatch alert:', err);
  }
}

export async function trackPageView() {
  if (typeof window === 'undefined') return;

  const sessionKey = 'cv_visit_reported';
  if (sessionStorage.getItem(sessionKey)) {
    return; // Ya se reporto esta sesion
  }

  sessionStorage.setItem(sessionKey, '1');

  const referrer = document.referrer || '';
  const currentHost = window.location.hostname;
  const screen = window.screen.width + 'x' + window.screen.height;
  const path = window.location.pathname + window.location.search + window.location.hash;
  const userAgent = navigator.userAgent;

  // Deteccion de canal inteligente
  let canal = 'Acceso Web / Directo';
  if (referrer.includes('linkedin.com') || referrer.includes('lnkd.in')) {
    canal = 'ENLACE DE LINKEDIN 💼';
  } else if (currentHost.includes('github.io')) {
    canal = 'GITHUB PAGES (Enlace de CV en LinkedIn) 💼';
  } else if (currentHost.includes('pages.dev')) {
    canal = 'CLOUDFLARE PAGES (.dev) 🌐';
  } else if (referrer.includes('google.')) {
    canal = 'BUSQUEDA GOOGLE 🔍';
  } else if (referrer.includes('bing.')) {
    canal = 'BUSQUEDA BING 🔍';
  } else if (referrer.includes('oraclecloud.com')) {
    canal = 'ORACLE CLOUD RECRUITING 🏢';
  }

  let browser = 'Navegador Web';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  let os = 'Desktop';
  if (/Android/i.test(userAgent)) os = 'Android 📱';
  else if (/iPhone|iPad/i.test(userAgent)) os = 'iOS 📱';
  else if (/Windows/i.test(userAgent)) os = 'Windows PC 💻';
  else if (/Mac/i.test(userAgent)) os = 'Mac 💻';
  else if (/Linux/i.test(userAgent)) os = 'Linux 💻';

  let locationStr = 'Obteniendo ubicacion...';
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const geo = await res.json();
      const city = geo.city || 'Ciudad Desconocida';
      const country = geo.country || 'Pais Desconocido';
      const flag = geo.country_code ? '[' + geo.country_code + ']' : '';
      const org = geo.connection && geo.connection.isp ? '(' + geo.connection.isp + ')' : '';
      locationStr = city + ', ' + country + ' ' + flag + ' ' + org;
    }
  } catch {
    locationStr = 'Ubicacion reservada';
  }

  const alertMessage = 
    '👤 <b>NUEVA VISITA EN CV DIGITAL (ANTONIO GUTIÉRREZ)</b>\n' +
    '───────────────────────\n' +
    '🎯 <b>Canal detectado:</b> <b>' + canal + '</b>\n' +
    '📍 <b>Ubicación:</b> ' + locationStr + '\n' +
    '🔗 <b>Referer:</b> <code>' + (referrer || 'Directo / PDF / Sin referer') + '</code>\n' +
    '📄 <b>Ruta:</b> <code>' + path + '</code>\n' +
    '💻 <b>Dispositivo:</b> ' + os + ' · ' + browser + ' (' + screen + ')\n' +
    '⏰ <b>Hora:</b> ' + new Date().toLocaleTimeString() + '\n' +
    '───────────────────────';

  sendTelegramAlert(alertMessage);
}

// Monitor de crashes
export function trackCrash(error: Error | string, errorInfo?: string) {
  const errorMsg = typeof error === 'string' ? error : error.message;
  const stack = typeof error === 'object' && error.stack ? error.stack.slice(0, 700) : 'Sin stack';
  const path = typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/';

  const alertMessage = 
    '🚨 <b>CRASH EN CV DIGITAL</b>\n' +
    '───────────────────────\n' +
    '📍 <b>URL:</b> <code>' + path + '</code>\n' +
    '💥 <b>Mensaje:</b> <code>' + errorMsg + '</code>\n' +
    (errorInfo ? 'ℹ️ <b>Contexto:</b> ' + errorInfo + '\n' : '') +
    '📜 <b>Stack:</b>\n<pre>' + stack + '</pre>\n' +
    '───────────────────────';

  sendTelegramAlert(alertMessage);
}

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('chrome-extension://')) return;
    trackCrash(event.error || event.message, 'Archivo: ' + event.filename + ':' + event.lineno);
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackCrash(event.reason && event.reason.message ? event.reason.message : String(event.reason), 'Unhandled Promise Rejection');
  });
}
