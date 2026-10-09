import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

export default function AddActivityModal({ isOpen, onClose, onAddActivity }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Elektrik & Enerji');
  const [scope, setScope] = useState('Scope 2');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kWh');
  const [co2e, setCo2e] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Onaylandı');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !quantity || !co2e) return;

    setSubmitting(true);
    const newActivity = {
      title,
      category,
      scope,
      date,
      quantity: parseFloat(quantity),
      unit,
      co2e: parseFloat(co2e),
      status,
    };

    await onAddActivity(newActivity);
    setSubmitting(false);
    // Reset form
    setTitle('');
    setQuantity('');
    setCo2e('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">Yeni Emisyon Faaliyeti Ekle</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Aktivite / Faaliyet Adı</label>
            <input
              type="text"
              required
              placeholder="Örn: Fabrika B Doğalgaz Tüketimi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Elektrik & Enerji">Elektrik & Enerji</option>
                <option value="Üretim & Fabrika">Üretim & Fabrika</option>
                <option value="Lojistik & Filo">Lojistik & Filo</option>
                <option value="Tedarik Zinciri">Tedarik Zinciri</option>
                <option value="İş Seyahatleri">İş Seyahatleri</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kapsam (Scope)</label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Scope 1">Scope 1 (Doğrudan)</option>
                <option value="Scope 2">Scope 2 (Enerji)</option>
                <option value="Scope 3">Scope 3 (Dolaylı)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Miktar</label>
              <input
                type="number"
                step="any"
                required
                placeholder="1000"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Birim</label>
              <input
                type="text"
                required
                placeholder="kWh / L / km"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Karbon Etkisi (t CO₂e)</label>
              <input
                type="number"
                step="any"
                required
                placeholder="12.5"
                value={co2e}
                onChange={(e) => setCo2e(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tarih</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Onay Durumu</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Onaylandı">Onaylandı</option>
                <option value="İncelemede">İncelemede</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-900/40 transition"
            >
              <Plus className="w-4 h-4" />
              {submitting ? 'Kaydediliyor...' : 'REST API Kaydet'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
