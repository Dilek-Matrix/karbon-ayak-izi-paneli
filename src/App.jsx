import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import EmissionsTrendChart from './components/EmissionsTrendChart';
import CategoryPieChart from './components/CategoryPieChart';
import DepartmentBarChart from './components/DepartmentBarChart';
import ActivityTable from './components/ActivityTable';
import AddActivityModal from './components/AddActivityModal';
import GoalsProgress from './components/GoalsProgress';
import TipsSection from './components/TipsSection';

import {
  getOverview,
  getMonthlyEmissions,
  getEmissionsByCategory,
  getDepartmentEmissions,
  getReductionGoals,
  getActivities,
  addActivity,
  deleteActivity,
  getTips,
} from './services/api';

export default function App() {
  const [overview, setOverview] = useState(null);
  const [monthlyEmissions, setMonthlyEmissions] = useState([]);
  const [emissionsByCategory, setEmissionsByCategory] = useState([]);
  const [departmentEmissions, setDepartmentEmissions] = useState([]);
  const [reductionGoals, setReductionGoals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tips, setTips] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        overviewRes,
        monthlyRes,
        categoryRes,
        deptRes,
        goalsRes,
        activitiesRes,
        tipsRes,
      ] = await Promise.all([
        getOverview(),
        getMonthlyEmissions(),
        getEmissionsByCategory(),
        getDepartmentEmissions(),
        getReductionGoals(),
        getActivities(),
        getTips(),
      ]);

      setOverview(overviewRes.data);
      setMonthlyEmissions(monthlyRes.data);
      setEmissionsByCategory(categoryRes.data);
      setDepartmentEmissions(deptRes.data);
      setReductionGoals(goalsRes.data);
      setActivities(activitiesRes.data);
      setTips(tipsRes.data);
    } catch (err) {
      console.error('REST API verileri çekilirken hata oluştu:', err);
      setError('json-server REST API servisine bağlanılamadı. Lütfen sunucunun (http://localhost:3001) çalıştığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAddActivity = async (newActivity) => {
    try {
      await addActivity(newActivity);
      // Re-fetch activities
      const res = await getActivities();
      setActivities(res.data);
    } catch (err) {
      console.error('Aktivite eklenirken hata:', err);
      alert('Aktivite eklenemedi!');
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm('Bu emisyon kaydını silmek istediğinize emin misiniz?')) return;
    try {
      await deleteActivity(id);
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Aktivite silinirken hata:', err);
      alert('Aktivite silinemedi!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-12">
      {/* Navbar Header */}
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        onRefresh={fetchAllData}
        loading={loading}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Error Alert */}
        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchAllData}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 font-bold rounded"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Loading Spinner Skeleton */}
        {loading && !overview ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">REST API Verileri Yükleniyor (json-server)...</p>
          </div>
        ) : (
          <>
            {/* Top Stat Cards */}
            <StatCards overview={overview} />

            {/* Grid 1: Trend Chart & Category Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <EmissionsTrendChart data={monthlyEmissions} />
              </div>
              <div className="lg:col-span-1">
                <CategoryPieChart data={emissionsByCategory} />
              </div>
            </div>

            {/* Grid 2: Department Bar & Sustainability Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <DepartmentBarChart data={departmentEmissions} />
              </div>
              <div className="lg:col-span-1">
                <GoalsProgress goals={reductionGoals} />
              </div>
            </div>

            {/* Tips Section */}
            <div className="mb-6">
              <TipsSection tips={tips} />
            </div>

            {/* Activities Data Table */}
            <div className="mb-6">
              <ActivityTable
                activities={activities}
                onDeleteActivity={handleDeleteActivity}
              />
            </div>
          </>
        )}

      </main>

      {/* Modal Form */}
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddActivity={handleAddActivity}
      />
    </div>
  );
}
