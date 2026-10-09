import React from 'react';
import { Target, CheckCircle, Clock, Calendar, ShieldCheck } from 'lucide-react';

export default function GoalsProgress({ goals }) {
  if (!goals || goals.length === 0) return null;

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-slate-100">Sürdürülebilirlik Hedefleri</h2>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
            2026-2030 Stratejisi
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-4">Şirket genelinde devam eden emisyon azaltım projeleri</p>

        <div className="space-y-3">
          {goals.map((goal) => (
            <div key={goal.id} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 hover:border-slate-700 transition">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{goal.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" /> {goal.targetDate}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">-{goal.savedCO2e} t CO₂e Tasarruf</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-800 text-slate-300 whitespace-nowrap">
                  {goal.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>İlerleme Oranı</span>
                  <span className="font-bold text-emerald-400">%{goal.progress}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
