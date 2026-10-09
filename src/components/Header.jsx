import React from 'react';
import { Leaf, PlusCircle, Download, RefreshCw, Server, Database } from 'lucide-react';

export default function Header({ onOpenModal, onRefresh, loading, isDemoMode }) {
  const handleExportReport = () => {
    alert("ESG Sürdürülebilirlik & Karbon Ayak İzi Raporu (PDF/CSV) indiriliyor...");
  };

  return (
    <header className="glass-panel sticky top-0 z-30 px-6 py-4 border-b border-slate-800 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shadow-lg shadow-emerald-950/20">
            <Leaf className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">EcoPulse</h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                Sürdürülebilirlik V2.4
              </span>
            </div>
            <p className="text-xs text-slate-400">Kurumsal Karbon Ayak İzi & ESG Takip Paneli</p>
          </div>
        </div>

        {/* API Status Badge & Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {isDemoMode ? (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 shadow-sm"
              title="Yerel REST API (localhost:3001) bağlantısı kurulamadı. Statik veri modunda çalışılıyor."
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 font-medium">Durum:</span>
              <span className="text-amber-400 font-semibold tracking-wide">Demo Modu (Statik Veri)</span>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300"
              title="Yerel REST API (localhost:3001) servisine bağlı."
            >
              <Server className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>REST API:</span>
              <span className="text-emerald-400 font-mono font-medium">localhost:3001</span>
            </div>
          )}

          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
            title="Verileri Yenile"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Yenile</span>
          </button>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">ESG Raporu</span>
          </button>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Kayıt Ekle</span>
          </button>
        </div>

      </div>
    </header>
  );
}

