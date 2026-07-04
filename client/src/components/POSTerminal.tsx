import React, { useEffect, useState } from 'react';

interface POSTerminalProps {
  amount?: number;
  currency?: string;
  status?: 'idle' | 'processing' | 'success';
}

export function POSTerminal({
  amount = 2500,
  currency = 'MXN',
  status = 'idle',
}: POSTerminalProps) {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (status === 'processing') {
      setIsProcessing(true);
      let current = 0;
      const interval = setInterval(() => {
        current += Math.random() * 500;
        if (current >= amount) {
          setDisplayAmount(amount);
          clearInterval(interval);
          setTimeout(() => setIsProcessing(false), 1000);
        } else {
          setDisplayAmount(Math.floor(current));
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status, amount]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">
        {/* Screen */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl p-6 mb-6 border border-slate-700 min-h-32 flex flex-col justify-between">
          <div className="text-slate-400 text-sm label-sm">PROCESANDO TRANSACCIÓN</div>

          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-400 mono mb-2">
              {currency} {displayAmount.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">
              {isProcessing ? 'Procesando...' : 'Completado'}
            </div>
          </div>

          {/* LED Indicators */}
          <div className="flex gap-2 justify-center">
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                isProcessing
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-indigo-400 animate-pulse-glow'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                isProcessing ? 'bg-slate-600' : 'bg-indigo-400'
              }`}
            />
            <div className="w-3 h-3 rounded-full bg-slate-600" />
          </div>
        </div>

        {/* Card Reader Slot */}
        <div className="bg-slate-950 rounded-lg h-12 mb-6 border-2 border-slate-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700 to-transparent animate-shimmer" />
          <div className="text-xs text-slate-500 font-mono">CHIP READER</div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors text-lg"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Function Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors text-sm">
            CANCELAR
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-colors text-sm">
            CONFIRMAR
          </button>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="mt-8 h-24 bg-gradient-to-t from-indigo-500/20 to-transparent blur-3xl rounded-full" />
    </div>
  );
}

export default POSTerminal;
