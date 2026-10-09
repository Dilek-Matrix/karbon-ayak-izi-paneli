import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

export default function CategoryPieChart({ data }) {
  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className="font-bold text-slate-100">{item.category}</span>
          </div>
          <div className="text-slate-300">
            Miktar: <span className="font-mono font-bold text-emerald-400">{item.value} t CO₂e</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Oran: <span className="font-bold text-slate-200">%{item.percentage}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-slate-100">Kategori Bazlı Dağılım</h2>
          </div>
        </div>
        <p className="text-xs text-slate-400">Emisyon kaynaklarının yüzdesel payı</p>
      </div>

      <div className="h-52 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-slate-800/80">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-300 font-medium">{item.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 text-[11px]">{item.value} t</span>
              <span className="font-bold text-slate-200 text-xs w-10 text-right">%{item.percentage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
