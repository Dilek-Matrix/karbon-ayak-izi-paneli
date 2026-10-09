import React from 'react';
import { TrendingDown, Factory, Zap, Globe, TreePine, Target } from 'lucide-react';

export default function StatCards({ overview }) {
  if (!overview) return null;

  const cards = [
    {
      title: "Toplam Karbon Ayak İzi",
      value: overview.totalEmissions?.toLocaleString('tr-TR'),
      unit: "t CO₂e",
      change: `${overview.reductionPercentage}%`,
      changeType: "positive", // decrease in carbon is positive for climate!
      changeLabel: "geçen aya göre",
      icon: TrendingDown,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Scope 1 (Doğrudan Emisyon)",
      value: overview.scope1?.toLocaleString('tr-TR'),
      unit: "t CO₂e",
      subtitle: "Fabrika yakıtları & araç filosu",
      icon: Factory,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      title: "Scope 2 (Enerji Emisyonu)",
      value: overview.scope2?.toLocaleString('tr-TR'),
      unit: "t CO₂e",
      subtitle: "Satın alınan şebeke elektriği",
      icon: Zap,
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      title: "Scope 3 (Dolaylı Emisyon)",
      value: overview.scope3?.toLocaleString('tr-TR'),
      unit: "t CO₂e",
      subtitle: "Tedarik zinciri & seyahatler",
      icon: Globe,
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    {
      title: "Net-Sıfır Hedef İlerlemesi",
      value: `%${overview.netZeroProgress}`,
      unit: "",
      progressBar: overview.netZeroProgress,
      subtitle: "2030 Hedefi: 0 t CO₂e",
      icon: Target,
      iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    },
    {
      title: "Telafi Ağaç Eşdeğeri",
      value: overview.treesEquivalent?.toLocaleString('tr-TR'),
      unit: "ağaç",
      subtitle: "Yıllık emisyonu dengelemek için",
      icon: TreePine,
      iconBg: "bg-green-500/10 text-green-400 border-green-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 truncate">{card.title}</span>
                <div className={`p-2 rounded-lg border ${card.iconBg}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-slate-100">{card.value}</span>
                {card.unit && <span className="text-xs text-slate-400 font-medium">{card.unit}</span>}
              </div>
            </div>

            <div className="mt-3">
              {card.change && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="inline-flex items-center font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {card.change}
                  </span>
                  <span className="text-slate-400">{card.changeLabel}</span>
                </div>
              )}

              {card.progressBar !== undefined && (
                <div className="w-full bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${card.progressBar}%` }}
                  ></div>
                </div>
              )}

              {card.subtitle && (
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{card.subtitle}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
