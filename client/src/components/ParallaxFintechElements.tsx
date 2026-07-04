import React from 'react';

interface FloatingElementProps {
  scrollY: number;
  speed: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  rotate?: number;
  children: React.ReactNode;
}

function FloatingEl({ scrollY, speed, x, y, size, opacity, rotate = 0, children }: FloatingElementProps) {
  const translateY = scrollY * speed;
  const dynamicRotate = rotate + scrollY * speed * 0.08;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        transform: `translateY(${translateY}px) rotate(${dynamicRotate}deg)`,
        willChange: 'transform',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 12px currentColor)',
      }}
    >
      {children}
    </div>
  );
}

/* ── SVG Fintech Icons ─────────────────────────────── */

const Bitcoin = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#F7931A" fillOpacity="0.12" stroke="#F7931A" strokeWidth="2" strokeOpacity="0.8" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#F7931A" fillOpacity="0.9" fontFamily="serif">₿</text>
  </svg>
);

const Ethereum = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#627EEA" fillOpacity="0.10" stroke="#627EEA" strokeWidth="2" strokeOpacity="0.7" />
    <polygon points="32,10 46,34 32,40 18,34" fill="#627EEA" fillOpacity="0.5" stroke="#627EEA" strokeWidth="1" />
    <polygon points="32,44 46,36 32,56 18,36" fill="#627EEA" fillOpacity="0.7" stroke="#627EEA" strokeWidth="1" />
  </svg>
);

const USDT = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#26A17B" fillOpacity="0.12" stroke="#26A17B" strokeWidth="2" strokeOpacity="0.8" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="800" fill="#26A17B" fillOpacity="0.95" fontFamily="monospace">USDT</text>
  </svg>
);

const USDC = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#2775CA" fillOpacity="0.12" stroke="#2775CA" strokeWidth="2" strokeOpacity="0.8" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="800" fill="#2775CA" fillOpacity="0.95" fontFamily="monospace">USDC</text>
  </svg>
);

const CreditCardIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 90 58" fill="none">
    <rect x="1" y="1" width="88" height="56" rx="7" fill="#1e3a8a" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.8" />
    <rect x="1" y="16" width="88" height="12" fill="#3b82f6" fillOpacity="0.2" />
    <rect x="10" y="33" width="20" height="14" rx="3" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" strokeOpacity="0.7" strokeWidth="1.5" />
    <rect x="38" y="38" width="42" height="3" rx="1.5" fill="#60a5fa" fillOpacity="0.5" />
    <rect x="38" y="44" width="28" height="3" rx="1.5" fill="#60a5fa" fillOpacity="0.35" />
    <circle cx="74" cy="36" r="9" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.5" />
    <circle cx="81" cy="36" r="9" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1.5" />
  </svg>
);

const PaymentTerminal = ({ size }: { size: number }) => (
  <svg width={size * 0.7} height={size} viewBox="0 0 56 80" fill="none">
    <rect x="1" y="1" width="54" height="78" rx="8" fill="#1e1b4b" fillOpacity="0.5" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.8" />
    <rect x="7" y="7" width="42" height="30" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1" />
    <rect x="11" y="11" width="34" height="22" rx="2" fill="#4f46e5" fillOpacity="0.15" />
    <text x="28" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#818cf8" fillOpacity="1" fontFamily="monospace" fontWeight="bold">$1,250</text>
    {[0,1,2].map(col => [0,1,2,3].map(row => (
      <circle key={`${col}-${row}`} cx={15 + col * 13} cy={47 + row * 9} r="3" fill="#6366f1" fillOpacity="0.5" />
    )))}
    <rect x="9" y="69" width="38" height="7" rx="3.5" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeOpacity="0.7" strokeWidth="1.5" />
  </svg>
);

const QRCode = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="3" y="3" width="25" height="25" rx="3" fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.8" />
    <rect x="9" y="9" width="13" height="13" rx="1" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="36" y="3" width="25" height="25" rx="3" fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.8" />
    <rect x="42" y="9" width="13" height="13" rx="1" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="3" y="36" width="25" height="25" rx="3" fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.8" />
    <rect x="9" y="42" width="13" height="13" rx="1" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="36" y="36" width="7" height="7" rx="1" fill="#60a5fa" fillOpacity="0.5" />
    <rect x="45" y="36" width="7" height="7" rx="1" fill="#60a5fa" fillOpacity="0.35" />
    <rect x="54" y="36" width="7" height="7" rx="1" fill="#60a5fa" fillOpacity="0.25" />
    <rect x="36" y="45" width="11" height="7" rx="1" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="49" y="45" width="12" height="7" rx="1" fill="#60a5fa" fillOpacity="0.2" />
    <rect x="36" y="54" width="25" height="7" rx="1" fill="#60a5fa" fillOpacity="0.35" />
  </svg>
);

const LightningBolt = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <polygon
      points="28,2 10,28 22,28 18,46 38,20 26,20"
      fill="#f59e0b"
      fillOpacity="0.3"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeOpacity="0.9"
      strokeLinejoin="round"
    />
  </svg>
);

const BlockchainNode = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="12" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2" strokeOpacity="0.8" />
    <circle cx="40" cy="10" r="9" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="70" cy="58" r="9" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="10" cy="58" r="9" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="40" y1="28" x2="40" y2="19" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 2" />
    <line x1="51" y1="45" x2="61" y2="53" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 2" />
    <line x1="29" y1="45" x2="19" y2="53" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 2" />
    <text x="40" y="44" dominantBaseline="middle" textAnchor="middle" fontSize="7" fill="#818cf8" fillOpacity="0.9" fontFamily="monospace" fontWeight="bold">CHAIN</text>
  </svg>
);

const NFCRing = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="6" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeOpacity="0.9" strokeWidth="2" />
    <circle cx="32" cy="32" r="14" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 3" />
    <circle cx="32" cy="32" r="22" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
    <circle cx="32" cy="32" r="30" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
    <text x="32" y="58" textAnchor="middle" fontSize="8" fill="#10b981" fillOpacity="0.8" fontFamily="monospace" fontWeight="bold">NFC</text>
  </svg>
);

/* ── Main component — position: fixed to cover full viewport ── */
interface ParallaxFintechElementsProps {
  scrollY: number;
}

export function ParallaxFintechElements({ scrollY }: ParallaxFintechElementsProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* LAYER 1 — Deep, slow (big, ~18% opacity) */}
      <FloatingEl scrollY={scrollY} speed={-0.06} x="3%" y="8%" size={130} opacity={0.18} rotate={-10}>
        <Bitcoin size={130} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={-0.05} x="80%" y="4%" size={110} opacity={0.15} rotate={18}>
        <Ethereum size={110} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.06} x="68%" y="55%" size={100} opacity={0.14} rotate={-5}>
        <QRCode size={100} />
      </FloatingEl>

      {/* LAYER 2 — Mid speed (~20% opacity) */}
      <FloatingEl scrollY={scrollY} speed={-0.15} x="87%" y="22%" size={85} opacity={0.20} rotate={8}>
        <USDT size={85} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.13} x="2%" y="48%" size={100} opacity={0.18} rotate={-12}>
        <CreditCardIcon size={100} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={-0.18} x="52%" y="8%" size={75} opacity={0.17} rotate={12}>
        <USDC size={75} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.14} x="76%" y="38%" size={80} opacity={0.16} rotate={-6}>
        <BlockchainNode size={80} />
      </FloatingEl>

      {/* LAYER 3 — Fast, foreground accent (~22% opacity) */}
      <FloatingEl scrollY={scrollY} speed={-0.28} x="90%" y="65%" size={60} opacity={0.22} rotate={0}>
        <LightningBolt size={60} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.25} x="10%" y="72%" size={70} opacity={0.20} rotate={10}>
        <Bitcoin size={70} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={-0.22} x="38%" y="70%" size={72} opacity={0.18} rotate={-18}>
        <NFCRing size={72} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.18} x="60%" y="80%" size={58} opacity={0.22} rotate={15}>
        <LightningBolt size={58} />
      </FloatingEl>

      {/* LAYER 4 — Terminals */}
      <FloatingEl scrollY={scrollY} speed={-0.12} x="84%" y="12%" size={100} opacity={0.18} rotate={-4}>
        <PaymentTerminal size={100} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.10} x="0%" y="25%" size={88} opacity={0.15} rotate={5}>
        <PaymentTerminal size={88} />
      </FloatingEl>

      {/* Extra scatter */}
      <FloatingEl scrollY={scrollY} speed={-0.08} x="28%" y="88%" size={65} opacity={0.16} rotate={28}>
        <Ethereum size={65} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={0.30} x="46%" y="28%" size={52} opacity={0.20} rotate={-8}>
        <USDT size={52} />
      </FloatingEl>

      <FloatingEl scrollY={scrollY} speed={-0.20} x="20%" y="15%" size={55} opacity={0.15} rotate={20}>
        <BlockchainNode size={55} />
      </FloatingEl>
    </div>
  );
}
