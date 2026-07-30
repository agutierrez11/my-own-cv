import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MetricChannel {
  name: string;
  labelEs: string;
  labelEn: string;
  color: string;
  hoverColor: string;
  accentClass: string;
  deals: number;
  dealsPct: number;
  ytd: number;
  ytdPct: number;
  descEs: string;
  descEn: string;
}

type TabType = 'deals' | 'ytd';

export function AcquisitionDashboard() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('ytd');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const channels: MetricChannel[] = [
    {
      name: 'Self Generated',
      labelEs: 'Prospección Propia',
      labelEn: 'Outbound Prospecting',
      color: '#10b981',
      hoverColor: '#34d399',
      accentClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      deals: 19,
      dealsPct: 51.4,
      ytd: 50480656.55,
      ytdPct: 72.7,
      descEs: 'Cuentas clave e integraciones técnicas conseguidas por prospección directa (Outbound Hunter).',
      descEn: 'Key enterprise accounts and API integrations acquired through direct outbound hunting.'
    },
    {
      name: 'Online Marketing',
      labelEs: 'Inbound Marketing',
      labelEn: 'Inbound Marketing',
      color: '#3b82f6',
      hoverColor: '#60a5fa',
      accentClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      deals: 13,
      dealsPct: 35.1,
      ytd: 16832883.32,
      ytdPct: 24.2,
      descEs: 'Leads calificados entrantes por canales digitales y campañas inbound de posicionamiento.',
      descEn: 'Inbound qualified leads generated through digital positioning campaigns.'
    },
    {
      name: 'Outbound',
      labelEs: 'Prospección Activa',
      labelEn: 'Targeted Outbound',
      color: '#f59e0b',
      hoverColor: '#fbbf24',
      accentClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      deals: 2,
      dealsPct: 5.4,
      ytd: 1788437.52,
      ytdPct: 2.6,
      descEs: 'Prospección en frío dirigida a verticales e industrias específicas de mediano tamaño.',
      descEn: 'Cold prospecting targeting mid-market specific industry verticals.'
    },
    {
      name: 'Otros & Eventos',
      labelEs: 'Referidos y Expos',
      labelEn: 'Referrals & Expos',
      color: '#8b5cf6',
      hoverColor: '#a78bfa',
      accentClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      deals: 3,
      dealsPct: 8.1,
      ytd: 376498.00,
      ytdPct: 0.5,
      descEs: 'Acuerdos cerrados en eventos comerciales (Exphotel 2022) o mediante referidos internos.',
      descEn: 'Deals closed at trade shows (Exphotel 2022) or through internal referrals.'
    }
  ];

  // Format Helper
  const formatValue = (val: number, type: TabType) => {
    if (type === 'deals') {
      const label = language === 'en' ? (val === 1 ? 'merchant' : 'merchants') : (val === 1 ? 'comercio' : 'comercios');
      return `${val} ${label}`;
    }
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M MXN`;
    }
    return `$${val.toLocaleString(language === 'en' ? 'en-US' : 'es-MX', { maximumFractionDigits: 0 })} MXN`;
  };

  const getActiveValue = (ch: MetricChannel, type: TabType) => {
    if (type === 'deals') return ch.deals;
    return ch.ytd;
  };

  const getActivePct = (ch: MetricChannel, type: TabType) => {
    if (type === 'deals') return ch.dealsPct;
    return ch.ytdPct;
  };

  // Donut SVG Math Parameters
  const size = 180;
  const strokeWidth = 14;
  const r = 60;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let currentOffset = 0;
  const selectedIndex = hoveredIndex !== null ? hoveredIndex : 0;
  const activeChannel = channels[selectedIndex];
  const highlightedValue = getActiveValue(activeChannel, activeTab);
  const highlightedPct = getActivePct(activeChannel, activeTab);

  return (
    <div className="bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 my-6 backdrop-blur-xl relative overflow-hidden text-foreground">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart2 className="w-4 h-4 text-secondary shrink-0" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 font-bold uppercase">
              {language === 'en' ? 'Analytical Audit' : 'Auditoría Analítica'}
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {language === 'en' ? 'Performance by Acquisition Channel' : 'Rendimiento por Canal de Adquisición'}
          </h4>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-200/60 dark:bg-slate-955/80 border border-slate-200 dark:border-slate-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto shrink-0">
          {(['ytd', 'deals'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setHoveredIndex(null);
              }}
              className={`flex-1 sm:flex-initial text-center px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-secondary text-white shadow-md shadow-secondary/15'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'deals' && (language === 'en' ? 'Merchants' : 'Comercios')}
              {tab === 'ytd' && (language === 'en' ? 'Actual TPV (YTD)' : 'TPV Real (YTD)')}
            </button>
          ))}
        </div>
      </div>

      {/* Visual content: Donut left + list right */}
      <div className="grid md:grid-cols-12 gap-6 items-center">
        {/* Left: SVG Donut chart */}
        <div className="md:col-span-5 flex justify-center items-center relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform rotate-[-90deg]">
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth={strokeWidth}
            />

            {channels.map((ch, idx) => {
              const pct = getActivePct(ch, activeTab);
              const strokeLength = (pct / 100) * circumference;
              const offset = currentOffset;
              currentOffset -= strokeLength;

              if (pct <= 0) return null;
              const isHovered = hoveredIndex === idx;

              return (
                <motion.circle
                  key={ch.name}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={ch.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  strokeDashoffset={offset}
                  strokeLinecap={pct > 2 ? 'round' : 'butt'}
                  className="transition-all duration-300 ease-out cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${strokeLength} ${circumference}` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none" style={{ width: size - 40, height: size - 40 }}>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
              {language === 'en' ? activeChannel.labelEn : activeChannel.labelEs}
            </span>
            <motion.span 
              key={`${activeTab}-${selectedIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg font-bold text-slate-900 dark:text-slate-100 my-0.5"
            >
              {highlightedValue >= 1000000 ? `$${(highlightedValue / 1000000).toFixed(1)}M` : highlightedValue.toLocaleString(language === 'en' ? 'en-US' : 'es-MX')}
            </motion.span>
            <span className="text-xs font-semibold text-secondary">
              {highlightedPct.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Right: Channels breakdown list */}
        <div className="md:col-span-7 space-y-3">
          {channels.map((ch, idx) => {
            const pct = getActivePct(ch, activeTab);
            const val = getActiveValue(ch, activeTab);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={ch.name}
                className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'bg-white dark:bg-slate-950/75 border-slate-300 dark:border-slate-700 shadow-md translate-x-1'
                    : 'bg-slate-100/50 dark:bg-slate-955/30 border-slate-200/50 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-750'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {language === 'en' ? ch.labelEn : ch.labelEs}
                    </span>
                  </div>
                  <div className="text-right flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{formatValue(val, activeTab)}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ backgroundColor: `${ch.color}15`, color: ch.color }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden w-full relative">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: ch.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>

                {/* Dynamic desc when active/hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 0.75 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed mt-2 overflow-hidden"
                    >
                      {language === 'en' ? ch.descEn : ch.descEs}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Insight card */}
      <div className="mt-4 p-3 bg-slate-100/80 dark:bg-slate-955/40 border border-slate-200 dark:border-slate-800/60 rounded-xl flex items-start gap-3">
        <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
          {activeTab === 'ytd' && (
            <span>
              <strong>{language === 'en' ? 'Origination Efficiency:' : 'Eficiencia de Originación:'}</strong>{' '}
              {language === 'en'
                ? 'Your outbound prospecting channel (Self Generated) represents 72.7% of total processed portfolio volume ($50.4M MXN), with deals doubling the average value of the inbound channel.'
                : 'Tu canal de prospección propia (Self Generated) representa el 72.7% del volumen total transaccionado del portafolio ($50.4M MXN), con deals que duplican el valor promedio del canal inbound.'}
            </span>
          )}
          {activeTab === 'deals' && (
            <span>
              <strong>{language === 'en' ? 'Account Volume:' : 'Volumen de Cuentas:'}</strong>{' '}
              {language === 'en'
                ? 'Over half of acquired merchants (51.4%) are self-generated, confirming a pure Outbound Hunter profile focused on high-value B2B partnerships.'
                : 'Más de la mitad de tus comercios ganados (51.4%) son auto-generados, confirmando un perfil puramente cazador (Outbound Hunter) enfocado en alianzas B2B de alto valor.'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

