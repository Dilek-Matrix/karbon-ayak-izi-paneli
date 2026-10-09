import React from 'react';
import { Lightbulb, ArrowRight, Zap, Leaf } from 'lucide-react';

export default function TipsSection({ tips }) {
  if (!tips || tips.length === 0) return null;

  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'Çok Yüksek':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">Çok Yüksek Etki</span>;
      case 'Yüksek':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">Yüksek Etki</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">Orta Etki</span>;
    }
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-slate-100">Yapay Zekâ Destekli Emisyon Azaltım Önerileri</h2>
        </div>
      </div>
      <p className="text-xs text-slate-400 mb-4">Veri analizlerine dayalı verimlilik ve karbonsuzlaşma fırsatları</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip) => (
          <div key={tip.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                {getImpactBadge(tip.impact)}
                <span className="text-[11px] font-mono font-bold text-emerald-400">
                  {tip.potentialSaving}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-100 mb-1">{tip.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{tip.description}</p>
            </div>

            <button className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition">
              Aksiyon Planını İncele <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
