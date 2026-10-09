import React, { useState } from 'react';
import { Activity, Search, Trash2, Filter, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function ActivityTable({ activities, onDeleteActivity }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('HEPSİ');
  const [selectedScope, setSelectedScope] = useState('HEPSİ');

  if (!activities) return null;

  const categories = ['HEPSİ', ...new Set(activities.map((a) => a.category))];
  const scopes = ['HEPSİ', 'Scope 1', 'Scope 2', 'Scope 3'];

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'HEPSİ' || act.category === selectedCategory;
    const matchesScope = selectedScope === 'HEPSİ' || act.scope === selectedScope;
    return matchesSearch && matchesCategory && matchesScope;
  });

  const getScopeBadge = (scope) => {
    switch (scope) {
      case 'Scope 1':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">Scope 1</span>;
      case 'Scope 2':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Scope 2</span>;
      case 'Scope 3':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">Scope 3</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">{scope}</span>;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Onaylandı') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <CheckCircle2 className="w-3 h-3" /> Onaylandı
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400">
        <Clock className="w-3 h-3" /> İncelemede
      </span>
    );
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-slate-100">Son Emisyon Faaliyet Kayıtları</h2>
          </div>
          <p className="text-xs text-slate-400">REST API (`/activities`) üzerinden çekilen canlı emisyon verileri</p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Aktivite ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-36 sm:w-48"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat} className="bg-slate-900 text-slate-200">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Scope Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg">
            <select
              value={selectedScope}
              onChange={(e) => setSelectedScope(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              {scopes.map((sc, i) => (
                <option key={i} value={sc} className="bg-slate-900 text-slate-200">
                  {sc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-2.5 px-3 rounded-l-lg">Tarih</th>
              <th className="py-2.5 px-3">Faaliyet / Açıklama</th>
              <th className="py-2.5 px-3">Kategori</th>
              <th className="py-2.5 px-3">Kapsam</th>
              <th className="py-2.5 px-3 text-right">Tüketim Miktarı</th>
              <th className="py-2.5 px-3 text-right">CO₂e Karbon Etkisi</th>
              <th className="py-2.5 px-3">Durum</th>
              <th className="py-2.5 px-3 text-center rounded-r-lg">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredActivities.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-slate-400">
                  <AlertCircle className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                  Kayıt bulunamadı.
                </td>
              </tr>
            ) : (
              filteredActivities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">{act.date}</td>
                  <td className="py-3 px-3 font-medium text-slate-200">{act.title}</td>
                  <td className="py-3 px-3 text-slate-300">{act.category}</td>
                  <td className="py-3 px-3">{getScopeBadge(act.scope)}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {act.quantity?.toLocaleString('tr-TR')} <span className="text-[10px] text-slate-500">{act.unit}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    <span className={act.co2e < 0 ? 'text-emerald-400' : 'text-amber-400'}>
                      {act.co2e > 0 ? `+${act.co2e}` : act.co2e} t
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">{getStatusBadge(act.status)}</td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onDeleteActivity(act.id)}
                      className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                      title="Sil (DELETE /activities/:id)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
