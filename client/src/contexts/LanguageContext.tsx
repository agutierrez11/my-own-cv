import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header & Navigation
    'nav.role': 'Middle Market & Fintech Enterprise Specialist',
    'nav.experience': 'Experiencia',
    'nav.metrics': 'Métricas & TPV',
    'nav.integrations': 'Integraciones API',
    'nav.sectors': 'Sectores',
    'nav.contact': 'Contacto',
    'nav.downloadCV': 'Descargar CV PDF',
    
    // Hero Section
    'hero.badge': 'Ex-Clip Middle Market Executive • Top 12% Nacional',
    'hero.title1': 'Estrategia Comercial &',
    'hero.title2': 'Escalamiento Fintech',
    'hero.subtitle': 'Especialista en adquisición de cuentas de alto valor, integraciones de pasarela de pagos vía API/ISV y maximización de TPV con bajo churn.',
    'hero.ctaPrimary': 'Ver Dashboard de Métricas',
    'hero.ctaSecondary': 'Contactar vía LinkedIn',

    // Key Stats
    'stat.topRank': 'Top 12% Nacional',
    'stat.topRankDesc': '#22 de 184 Ejecutivos Middle Market (H1 2022)',
    'stat.quota': '+280%',
    'stat.quotaDesc': 'Superación mensual constante vs Meta $1M MXN',
    'stat.avgDeal': '$555k MXN',
    'stat.avgDealDesc': 'TPV Promedio por Deal (+60% media segmento)',
    'stat.enterpriseVolume': '$34.5M+ MXN',
    'stat.enterpriseVolumeDesc': 'Procesado YTD en Cuentas Clave Outbound (Turismo de Lujo)',

    // Experience Section
    'exp.title': 'Trayectoria & Ejecución en Clip',
    'exp.subtitle': 'Resultados auditados en el segmento Middle Market y cuentas Enterprise.',
    'exp.bullet1.title': 'Top Performer & Cumplimiento Sobresaliente',
    'exp.bullet1.desc': 'Posicionado en el Top 12% nacional (Lugar #22 de 184 ejecutivos) en H1 2022, superando las cuotas de volumen mensual asignadas por más del 280% de forma consistente ($2.8M a $5.8M MXN promedio frente a la meta de $1M).',
    'exp.bullet2.title': 'Eficiencia de Cartera (High Value)',
    'exp.bullet2.desc': 'Diseñé y ejecuté una estrategia comercial enfocada en cuentas medianas de alto potencial, logrando un TPV promedio por deal de $555k MXN (60% superior a la media del segmento), maximizando el volumen procesado con una fracción del costo operativo de integración y soporte.',
    'exp.bullet3.title': 'Cierre de Cuentas Enterprise (Outbound)',
    'exp.bullet3.desc': 'Cerré de manera autónoma las cuentas de mayor volumen de la cartera en el sector turismo de lujo, destacando The Yacht Experiences ($14.5M MXN YTD) y Jetpack Adventures ($20.0M MXN YTD) mediante prospección activa en frío.',
    'exp.bullet4.title': 'Integraciones Tecnológicas & APIs',
    'exp.bullet4.desc': 'Lideré negociaciones comerciales complejas e integraciones de pasarela de pagos vía API/ISV con sistemas clave (Bistrosoft, Profitroom, Odoo ERP), incrementando la retención de clientes a largo plazo con una tasa de churn cercana a cero.',

    // Dashboard UI
    'dash.title': 'Dashboard Operativo & Análisis de Adquisición',
    'dash.subtitle': 'Visualización limpia y estructurada del volumen procesado por ejecutivo y sector.',
    'dash.kpiTPV': 'TPV Promedio por Deal',
    'dash.kpiVolume': 'Volumen Mensual Promedio',
    'dash.kpiQuota': 'Cumplimiento Promedio de Meta',
    'dash.kpiRetention': 'Retención de Cuentas API',
  },
  en: {
    // Header & Navigation
    'nav.role': 'Middle Market & Fintech Enterprise Specialist',
    'nav.experience': 'Experience',
    'nav.metrics': 'Metrics & TPV',
    'nav.integrations': 'API Integrations',
    'nav.sectors': 'Sectors',
    'nav.contact': 'Contact',
    'nav.downloadCV': 'Download Resume PDF',

    // Hero Section
    'hero.badge': 'Ex-Clip Middle Market Executive • Top 12% Nationwide',
    'hero.title1': 'Commercial Strategy &',
    'hero.title2': 'Fintech Scalability',
    'hero.subtitle': 'Specialized in high-value account acquisition, API/ISV payment gateway integrations, and TPV maximization with near-zero churn.',
    'hero.ctaPrimary': 'View Metrics Dashboard',
    'hero.ctaSecondary': 'Connect on LinkedIn',

    // Key Stats
    'stat.topRank': 'Top 12% Nationwide',
    'stat.topRankDesc': 'Rank #22 out of 184 Middle Market Executives (H1 2022)',
    'stat.quota': '+280%',
    'stat.quotaDesc': 'Monthly quota attainment vs $1M MXN target',
    'stat.avgDeal': '$555k MXN',
    'stat.avgDealDesc': 'Average TPV per Deal (+60% segment avg)',
    'stat.enterpriseVolume': '$34.5M+ MXN',
    'stat.enterpriseVolumeDesc': 'YTD Processed Volume in Outbound Enterprise Accounts',

    // Experience Section
    'exp.title': 'Track Record & Execution at Clip',
    'exp.subtitle': 'Audited performance across Middle Market & Enterprise accounts.',
    'exp.bullet1.title': 'Top Performer & Outstanding Attainment',
    'exp.bullet1.desc': 'Ranked in the Top 12% nationwide (#22 out of 184 executives) in H1 2022, consistently exceeding assigned monthly volume quotas by over 280% ($2.8M to $5.8M MXN average vs $1M target).',
    'exp.bullet2.title': 'Portfolio Efficiency (High-Value Accounts)',
    'exp.bullet2.desc': 'Designed and executed a commercial strategy focused on high-potential mid-market accounts, achieving an average TPV of $555k MXN per deal (60% above segment average), maximizing volume while minimizing onboarding and support costs.',
    'exp.bullet3.title': 'Enterprise Outbound Deal Closing',
    'exp.bullet3.desc': 'Independently acquired the highest-volume accounts in the luxury tourism sector, including The Yacht Experiences ($14.5M MXN YTD) and Jetpack Adventures ($20.0M MXN YTD) through cold outbound prospecting.',
    'exp.bullet4.title': 'Tech & API Gateway Integrations',
    'exp.bullet4.desc': 'Led complex commercial negotiations and payment gateway integrations via API/ISV with key platforms (Bistrosoft, Profitroom, Odoo ERP), driving long-term customer retention with near-zero churn.',

    // Dashboard UI
    'dash.title': 'Operational Dashboard & Acquisition Analysis',
    'dash.subtitle': 'Clean, structured visualization of processed volume by executive and sector.',
    'dash.kpiTPV': 'Avg TPV per Deal',
    'dash.kpiVolume': 'Avg Monthly Volume',
    'dash.kpiQuota': 'Avg Quota Attainment',
    'dash.kpiRetention': 'API Account Retention',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
