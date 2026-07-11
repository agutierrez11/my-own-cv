import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface MetricChannel {
  name: string;
  label: string;
  color: string;
  hoverColor: string;
  accentClass: string;
  deals: number;
  dealsPct: number;
  signed: number;
  signedPct: number;
  ytd: number;
  ytdPct: number;
  desc: string;
}

type TabType = 'deals' | 'signed' | 'ytd';

export function AcquisitionDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('ytd');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const channels: MetricChannel[] = [
    {
      name: 'Self Generated',
      label: 'Prospección Propia',
      color: '#10b981', // Emerald-500
      hoverColor: '#34d399', // Emerald-400
      accentClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      deals: 19,
      dealsPct: 51.4,
      signed: 92399452.05,
      signedPct: 70.7,
      ytd: 50480656.55,
      ytdPct: 72.7,
      desc: 'Cuentas clave e integraciones técnicas conseguidas por prospección directa (Outbound Hunter).'
    },
    {
      name: 'Online Marketing',
      label: 'Inbound Marketing',
      color: '#3b82f6', // Blue-500
      hoverColor: '#60a5fa', // Blue-400
      accentClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      deals: 13,
      dealsPct: 35.1,
      signed: 37743835.62,
      signedPct: 28.9,
      ytd: 16832883.32,
      ytdPct: 24.2,
      desc: 'Leads calificados entrantes por canales digitales y campañas inbound de posicionamiento.'
    },
    {
      name: 'Outbound',
      label: 'Prospección Activa',
      color: '#f59e0b', // Amber-500
      hoverColor: '#fbbf24', // Amber-400
      accentClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      deals: 2,
      dealsPct: 5.4,
      signed: 144657.53,
      signedPct: 0.1,
      ytd: 1788437.52,
      ytdPct: 2.6,
      desc: 'Prospección en frío dirigida a verticales e industrias específicas de mediano tamaño.'
    },
    {
      name: 'Otros & Eventos',
      label: 'Referidos y Expos',
      color: '#8b5cf6', // Violet-500
      hoverColor: '#a78bfa', // Violet-400
      accentClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      deals: 3,
      dealsPct: 8.1,
      signed: 393698.63,
      signedPct: 0.3,
      ytd: 376498.00,
      ytdPct: 0.5,
      desc: 'Acuerdos cerrados en eventos comerciales (Exphotel 2022) o mediante referidos internos.'
    }
  ];

  // Totals calculations
  const totalDeals = 37;
  const totalSigned = 130681643.84;
  const totalYTD = 69478475.39;

  // Format Helper
  const formatValue = (val: number, type: TabType) => {
    if (type === 'deals') {
      return `${val} ${val === 1 ? 'comercio' : 'comercios'}`;
    }
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M MXN`;
    }
    return `$${val.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN`;
  };

  const getActiveValue = (ch: MetricChannel, type: TabType) => {
    if (type === 'deals') return ch.deals;
    if (type === 'signed') return ch.signed;
    return ch.ytd;
  };

  const getActivePct = (ch: MetricChannel, type: TabType) => {
    if (type === 'deals') return ch.dealsPct;
    if (type === 'signed') return ch.signedPct;
    return ch.ytdPct;
  };

  // Donut SVG Math Parameters
  const size = 180;
  const strokeWidth = 14;
  const r = 60;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  // Calculate accumulated offsets
  let currentOffset = 0;

  // Active highlighted channel inside donut center text
  const selectedIndex = hoveredIndex !== null ? hoveredIndex : 0;
  const activeChannel = channels[selectedIndex];
  const highlightedValue = getActiveValue(activeChannel, activeTab);
  const highlightedPct = getActivePct(activeChannel, activeTab);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 my-6 backdrop-blur-xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart2 className="w-4 h-4 text-secondary shrink-0" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">Auditoría Analítica</span>
          </div>
          <h4 className="text-base font-bold text-slate-100">Rendimiento por Canal de Adquisición</h4>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-950/80 border border-slate-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto shrink-0">
          {(['ytd', 'signed', 'deals'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setHoveredIndex(null);
              }}
              className={`flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-secondary text-white shadow-md shadow-secondary/15'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'deals' && 'Comercios'}
              {tab === 'signed' && 'TPV Firmado'}
              {tab === 'ytd' && 'TPV Real (YTD)'}
            </button>
          ))}
        </div>
      </div>

      {/* Visual content: Donut left + list right */}
      <div className="grid md:grid-cols-12 gap-6 items-center">
        {/* Left: SVG Donut chart */}
        <div className="md:col-span-5 flex justify-center items-center relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform rotate-[-90deg]">
            {/* Background track circle */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#1e293b" // slate-800
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {channels.map((ch, idx) => {
              const pct = getActivePct(ch, activeTab);
              const strokeLength = (pct / 100) * circumference;
              const offset = currentOffset;
              currentOffset -= strokeLength;

              // Do not render empty segments
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

          {/* Center text (inside donut) */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none" style={{ width: size - 40, height: size - 40 }}>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {activeChannel.label}
            </span>
            <motion.span 
              key={`${activeTab}-${selectedIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg font-bold text-slate-100 my-0.5"
            >
              {highlightedValue >= 1000000 ? `$${(highlightedValue / 1000000).toFixed(1)}M` : highlightedValue.toLocaleString('es-MX')}
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
                    ? 'bg-slate-950/75 border-slate-750 shadow-md translate-x-1'
                    : 'bg-slate-950/30 border-slate-800/40 hover:border-slate-800'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                    <span className="text-xs font-bold text-slate-200">{ch.label}</span>
                  </div>
                  <div className="text-right flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-slate-100">{formatValue(val, activeTab)}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ backgroundColor: `${ch.color}15`, color: ch.color }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden w-full relative">
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
                      animate={{ height: 'auto', opacity: 0.7 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[10px] text-slate-300 leading-relaxed mt-2 overflow-hidden"
                    >
                      {ch.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Insight card */}
      <div className="mt-4 p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl flex items-start gap-3">
        <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-[10px] text-slate-400 leading-relaxed">
          {activeTab === 'ytd' && (
            <span>
              <strong>Eficiencia de Originación:</strong> Tu canal de prospección propia (<strong>Self Generated</strong>) representa el <strong>72.7%</strong> del volumen total transaccionado del portafolio ($50.4M MXN), con deals que duplican el valor promedio del canal inbound.
            </span>
          )}
          {activeTab === 'signed' && (
            <span>
              <strong>Volumen Firmado:</strong> El <strong>70.7%</strong> del compromiso de TPV mensual cerrado ($92.4M MXN) fue gestionado a través de prospección autónoma directa, demostrando gran tracción en captación corporativa.
            </span>
          )}
          {activeTab === 'deals' && (
            <span>
              <strong>Volumen de Cuentas:</strong> Más de la mitad de tus comercios ganados (<strong>51.4%</strong>) son auto-generados, confirmando un perfil puramente cazador (*Outbound Hunter*) enfocado en alianzas B2B de alto valor.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
