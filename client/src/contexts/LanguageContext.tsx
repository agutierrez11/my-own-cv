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
    'hero.tagline': 'FINTECH & ACQUIRING • MX / LATAM',
    'hero.statRank': 'Top Performer Nacional',
    'hero.statDeal': 'TPV Prom. / Deal (MXN)',
    'hero.statQuota': 'Cumplimiento Cuota',

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

    // Section headers
    'section.experience.label': 'EXPERIENCIA PROFESIONAL',
    'section.experience.title': 'Trayectoria Clave',
    'section.network.label': 'CAPITAL DE RELACIONES (BYOD)',
    'section.network.title': 'Red Activa de Contactos en LATAM',
    'section.network.subtitle': 'Mi portafolio de contactos no es una base de datos estática en frío. Es un ecosistema vivo de relaciones directas y canales de comunicación ya abiertos con tomadores de decisión clave.',
    'section.projects.label': 'PROYECTOS & CAPACIDADES',
    'section.projects.title': 'Proyectos y capacidades que convierten insight comercial en ejecución fintech',
    'section.certs.label': 'EDUCACIÓN CONTINUA',
    'section.certs.title': 'Certificaciones & Especializaciones',
    'section.certs.subtitle': 'Programas de desarrollo profesional y especializaciones con validez oficial del sector.',

    // Contact section
    'contact.label': 'PANEL DE CONTACTO · MX / LATAM',
    'contact.title': 'Disponibilidad inmediata para incorporarse a nuevos retos profesionales en fintech, partnerships y GTM en México y LATAM',
    'contact.availability.label': 'DISPONIBILIDAD ACTUAL',
    'contact.direct.label': 'CONTACTO DIRECTO',
    'contact.focus.label': 'ENFOQUE DE CONVERSACIÓN',
    'contact.cta.whatsapp': 'Iniciar conversación',
    'contact.cta.linkedin': 'Ver perfil LinkedIn',
    'contact.open': 'ABIERTO',

    // Availability items
    'contact.avail.commercial': 'Roles Comerciales',
    'contact.avail.alliances': 'Alianzas Estratégicas',
    'contact.avail.special': 'Proyectos Especiales',

    // Contact items
    'contact.item.email.label': 'EMAIL',
    'contact.item.phone.label': 'TELÉFONO',
    'contact.item.linkedin.label': 'LINKEDIN',
    'contact.item.location.label': 'UBICACIÓN',
    'contact.item.location.value': 'Cancún, Quintana Roo, México',

    // Focus areas
    'contact.focus.acquiring.title': 'Merchant Acquiring',
    'contact.focus.acquiring.desc': 'Ciclos outbound, retención de portafolio y expansión B2B en verticales de alto volumen.',
    'contact.focus.api.title': 'Integraciones API / ISV',
    'contact.focus.api.desc': 'Partnerships técnicos con ERP, POS y plataformas de pagos en México y LATAM.',
    'contact.focus.alliances.title': 'Alianzas Estratégicas & GTM',
    'contact.focus.alliances.desc': 'Estructuración de alianzas comerciales, go-to-market y desarrollo de canales regionales.',
    'contact.focus.salesops.title': 'Sales Ops & Automatización',
    'contact.focus.salesops.desc': 'Diseño de flujos de prospección, CRM, reportería y herramientas SalesTech propias.',

    // Network widget
    'network.direct': 'Conexiones Directas',
    'network.direct.desc': 'Contactos de primer grado en LinkedIn. Acceso inmediato sin intermediarios ni filtros para campañas comerciales.',
    'network.decision': 'Tomadores de Decisión',
    'network.decision.desc': '1,115 perfiles directivos C-Level (CEOs, CFOs, Fundadores) y 852 directores y gerentes de sector en la región.',
    'network.chats': 'Chats Activos',
    'network.chats.desc': 'Contactos con historial de mensajería bidireccional activa. Relaciones precalentadas listas para prospección.',
    'network.warmth': 'MAPA DE CALIDEZ',
    'network.insight': '💡 Velocidad de ataque: El contacto directo elimina el tiempo de espera por solicitudes de conexión en LinkedIn, acelerando los ciclos de cierre de cuentas clave (ABM).',
    'network.tab.structure': 'Estructura',
    'network.tab.clevel': 'Chats C-Level',
    'network.tab.sectors': 'Sectores Clave',
    'network.tab.velocity': 'Velocidad',

    // Certifications
    'cert.keymodules': 'Módulos clave:',
    'cert.verify': 'Verificar Credencial',
    'cert.view': 'Ver Documento',

    // Footer
    'footer.nav.experience': 'Trayectoria',
    'footer.nav.network': 'Red Activa',
    'footer.nav.projects': 'Proyectos',
    'footer.nav.contact': 'Contacto',
    'footer.visits': 'Visitas',

    // Fiserv
    'fiserv.role': 'Business Advisor',
    'fiserv.desc': 'Retención de portafolio, reactivación automatizada y dashboards comerciales para adquirencia a gran escala.',
    'fiserv.merchants': 'Merchants',
    'fiserv.opp': 'Opp/Mes',
    'fiserv.f1.title': 'POWER BI DIAGNOSTIC',
    'fiserv.f1.desc': 'Modelo MoM de comportamiento transaccional para 80+ merchants asignados.',
    'fiserv.f2.title': 'SALES AUTOMATION',
    'fiserv.f2.desc': 'Workflow Power Automate + Excel + Outlook para campañas de reactivación.',
    'fiserv.f3.title': 'SALESFORCE REPORTING',
    'fiserv.f3.desc': 'Dashboards custom de pipeline health, conversión y KPIs MoM.',
    'fiserv.f4.title': 'PARTNERSHIP PIPELINE',
    'fiserv.f4.desc': '+15 oportunidades enterprise mensuales desde alianza bancaria asignada.',

    // Clip
    'clip.role': 'Asesor Comercial',
    'clip.desc': 'Ventas enterprise, integraciones API/ISV y desarrollo de partnerships comerciales.',
    'clip.tpv': 'TPV Procesado',
    'clip.deals': 'Deals Activos',
    'clip.viewPhoto': 'Ver foto',
    'clip.f1.title': 'OUTBOUND HUNTER',
    'clip.f1.desc': 'Cerró 15 tratos auto-generados que aportaron $52M MXN (75.3% del volumen total de la cartera de $69M MXN).',
    'clip.f2.title': 'API & ISV INTEGRATIONS',
    'clip.f2.desc': 'Bistrosoft (restaurantes), Profitroom (hospitalidad), Odoo ERP.',
    'clip.f3.title': 'TECH PROSPECTING',
    'clip.f3.desc': 'Sales Navigator, Apollo, scraping workflows para calificación de decisores.',
    'clip.f4.title': 'TOP PERFORMER & CUOTAS',
    'clip.f4.desc': 'Reconocido en el podio nacional de Top Performers de Clip (3er lugar general) tras alcanzar el 109% de cumplimiento de cuota de TPV.',

    // JTI
    'jti.desc': 'Expansión territorial, cuentas clave y crecimiento de share.',
    'jti.active': 'Base Activa',
    'jti.hotels': 'Hoteles',
    'jti.f1.title': 'KEY ACCOUNT MANAGEMENT',
    'jti.f1.desc': 'Gestión comercial de cadenas hoteleras clave y canal HORECA.',
    'jti.f2.title': 'TERRITORIAL EXPANSION',
    'jti.f2.desc': 'Desarrollo de territorio en Aguascalientes y Cancún con incremento de cuota de mercado.',

    // LATAM Community
    'latam.role': 'Co-Founder',
    'latam.desc': 'Comunidad, curaduría sectorial y conexión regional en pagos digitales.',
    'latam.professionals': 'Profesionales',
    'latam.coverage': 'Cobertura',
    'latam.community': 'Comunidad',
    'latam.f1.title': 'COBERTURA LATAM',
    'latam.f1.desc': 'Miembros de MX, CO, PE, BR y más mercados de la región.',
    'latam.f2.title': 'NETWORKING & EVENTOS',
    'latam.f2.desc': 'Encuentros ejecutivos y canales de mensajería directa entre líderes del sector.',

    // Project cards
    'project.nerv.status': 'MVP • EN DESARROLLO',
    'project.nerv.desc': 'Herramienta propietaria de prospección outbound que mapea y segmenta más de 1,000 fintechs y actores de pagos en LATAM, con IA generativa para battlecards y detección de oportunidades comerciales.',
    'project.treasurebox.desc': 'Colección curada de herramientas de ventas y marketing. Incluye calculadoras de conversión y Sales Wizard.',
    'project.latamcommerce.label': 'COMUNIDAD ACTIVA',
    'project.latamcommerce.desc': 'Comunidad cofundada de 500+ profesionales en pagos, acquiring y eCommerce. LinkedIn + WhatsApp.',
    'project.cta.demo': 'Ver Demo',
    'project.cta.site': 'Ir al Sitio',
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
    'hero.tagline': 'FINTECH & ACQUIRING • MX / LATAM',
    'hero.statRank': 'Nationwide Executive',
    'hero.statDeal': 'Avg Deal TPV (MXN)',
    'hero.statQuota': 'Quota Attainment',

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

    // Section headers
    'section.experience.label': 'PROFESSIONAL EXPERIENCE',
    'section.experience.title': 'Key Track Record',
    'section.network.label': 'RELATIONSHIP CAPITAL (BYOD)',
    'section.network.title': 'Active Contact Network in LATAM',
    'section.network.subtitle': 'My contact portfolio is not a cold static database. It is a live ecosystem of direct relationships and already-open communication channels with key decision-makers.',
    'section.projects.label': 'PROJECTS & CAPABILITIES',
    'section.projects.title': 'Projects and capabilities that convert commercial insight into fintech execution',
    'section.certs.label': 'CONTINUING EDUCATION',
    'section.certs.title': 'Certifications & Specializations',
    'section.certs.subtitle': 'Professional development programs and specializations with official industry recognition.',

    // Contact section
    'contact.label': 'CONTACT PANEL · MX / LATAM',
    'contact.title': 'Immediately available to join new professional challenges in fintech, partnerships and GTM across Mexico and LATAM',
    'contact.availability.label': 'CURRENT AVAILABILITY',
    'contact.direct.label': 'DIRECT CONTACT',
    'contact.focus.label': 'CONVERSATION FOCUS',
    'contact.cta.whatsapp': 'Start a conversation',
    'contact.cta.linkedin': 'View LinkedIn profile',
    'contact.open': 'OPEN',

    // Availability items
    'contact.avail.commercial': 'Commercial Roles',
    'contact.avail.alliances': 'Strategic Alliances',
    'contact.avail.special': 'Special Projects',

    // Contact items
    'contact.item.email.label': 'EMAIL',
    'contact.item.phone.label': 'PHONE',
    'contact.item.linkedin.label': 'LINKEDIN',
    'contact.item.location.label': 'LOCATION',
    'contact.item.location.value': 'Cancún, Quintana Roo, Mexico',

    // Focus areas
    'contact.focus.acquiring.title': 'Merchant Acquiring',
    'contact.focus.acquiring.desc': 'Outbound cycles, portfolio retention, and B2B expansion in high-volume verticals.',
    'contact.focus.api.title': 'API / ISV Integrations',
    'contact.focus.api.desc': 'Technical partnerships with ERP, POS, and payment platforms across Mexico and LATAM.',
    'contact.focus.alliances.title': 'Strategic Alliances & GTM',
    'contact.focus.alliances.desc': 'Structuring commercial alliances, go-to-market strategies, and regional channel development.',
    'contact.focus.salesops.title': 'Sales Ops & Automation',
    'contact.focus.salesops.desc': 'Designing prospecting workflows, CRM automation, reporting, and proprietary SalesTech tools.',

    // Network widget
    'network.direct': 'Direct Connections',
    'network.direct.desc': 'First-degree LinkedIn contacts. Immediate access without intermediaries or filters for commercial campaigns.',
    'network.decision': 'Decision Makers',
    'network.decision.desc': '1,115 C-Level executive profiles (CEOs, CFOs, Founders) and 852 sector directors and managers across the region.',
    'network.chats': 'Active Chats',
    'network.chats.desc': 'Contacts with active two-way messaging history. Warmed relationships ready for prospecting.',
    'network.warmth': 'WARMTH MAP',
    'network.insight': '💡 Attack speed: Direct contact eliminates LinkedIn connection request wait times, accelerating closing cycles for key accounts (ABM).',
    'network.tab.structure': 'Structure',
    'network.tab.clevel': 'C-Level Chats',
    'network.tab.sectors': 'Key Sectors',
    'network.tab.velocity': 'Velocity',

    // Certifications
    'cert.keymodules': 'Key modules:',
    'cert.verify': 'Verify Credential',
    'cert.view': 'View Document',

    // Footer
    'footer.nav.experience': 'Experience',
    'footer.nav.network': 'Active Network',
    'footer.nav.projects': 'Projects',
    'footer.nav.contact': 'Contact',
    'footer.visits': 'Visits',

    // Fiserv
    'fiserv.role': 'Business Advisor',
    'fiserv.desc': 'Portfolio retention, automated reactivation, and commercial dashboards for large-scale merchant acquiring.',
    'fiserv.merchants': 'Merchants',
    'fiserv.opp': 'Opp/Month',
    'fiserv.f1.title': 'POWER BI DIAGNOSTICS',
    'fiserv.f1.desc': 'MoM transactional behavior model for 80+ assigned merchants.',
    'fiserv.f2.title': 'SALES AUTOMATION',
    'fiserv.f2.desc': 'Power Automate + Excel + Outlook workflow for reactivation campaigns.',
    'fiserv.f3.title': 'SALESFORCE REPORTING',
    'fiserv.f3.desc': 'Custom pipeline health, conversion, and MoM KPI dashboards.',
    'fiserv.f4.title': 'PARTNERSHIP PIPELINE',
    'fiserv.f4.desc': '+15 monthly enterprise opportunities from assigned banking alliance.',

    // Clip
    'clip.role': 'Commercial Executive',
    'clip.desc': 'Enterprise sales, API/ISV integrations, and commercial partnership development.',
    'clip.tpv': 'Processed TPV',
    'clip.deals': 'Active Deals',
    'clip.viewPhoto': 'View photo',
    'clip.f1.title': 'OUTBOUND HUNTER',
    'clip.f1.desc': 'Closed 15 self-generated deals contributing $52M MXN (75.3% of total $69M MXN portfolio volume).',
    'clip.f2.title': 'API & ISV INTEGRATIONS',
    'clip.f2.desc': 'Bistrosoft (restaurants), Profitroom (hospitality), Odoo ERP integrations.',
    'clip.f3.title': 'TECH PROSPECTING',
    'clip.f3.desc': 'Sales Navigator, Apollo, scraping workflows for decision-maker qualification.',
    'clip.f4.title': 'TOP PERFORMER & TARGETS',
    'clip.f4.desc': 'Recognized on Clip National Podium (3rd place overall) achieving 109% TPV quota compliance.',

    // JTI
    'jti.desc': 'Territorial expansion, key accounts, and market share growth.',
    'jti.active': 'Active Base',
    'jti.hotels': 'Hotels',
    'jti.f1.title': 'KEY ACCOUNT MANAGEMENT',
    'jti.f1.desc': 'Commercial management of key hotel chains and HORECA channel.',
    'jti.f2.title': 'TERRITORIAL EXPANSION',
    'jti.f2.desc': 'Territory development in Aguascalientes and Cancun with market share growth.',

    // LATAM Community
    'latam.role': 'Co-Founder',
    'latam.desc': 'Community building, sector curation, and regional networking in digital payments.',
    'latam.professionals': 'Professionals',
    'latam.coverage': 'Coverage',
    'latam.community': 'Community',
    'latam.f1.title': 'LATAM COVERAGE',
    'latam.f1.desc': 'Members across MX, CO, PE, BR and top regional payment markets.',
    'latam.f2.title': 'NETWORKING & EVENTS',
    'latam.f2.desc': 'Executive meetups and direct messaging channels among industry leaders.',

    // Project cards
    'project.nerv.status': 'MVP • IN DEVELOPMENT',
    'project.nerv.desc': 'Proprietary outbound prospecting tool that maps and segments over 1,000 fintechs and payment actors in LATAM, with generative AI for battlecards and commercial opportunity detection.',
    'project.treasurebox.desc': 'Curated collection of sales and marketing tools. Includes conversion calculators and Sales Wizard.',
    'project.latamcommerce.label': 'ACTIVE COMMUNITY',
    'project.latamcommerce.desc': 'Co-founded community of 500+ professionals in payments, acquiring, and eCommerce. LinkedIn + WhatsApp.',
    'project.cta.demo': 'View Demo',
    'project.cta.site': 'Visit Site',
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
